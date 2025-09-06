import crypto from 'crypto';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Payment from '../models/Payment.model.js';
import User from '../models/user.model.js';
import { razorpay } from '../server.js';
import AppError from '../utils/AppError.js';

/**
 * @ACTIVATE_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/subscribe
 * @ACCESS Private (Logged in user only)
 */
export const buySubscription = asyncHandler(async (req, res, next) => {
  // Extracting ID from request obj
  const { id } = req.user;

  // Finding the user based on the ID
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('Unauthorized, please login'));
  }

  // Checking the user role
  if (user.role === 'ADMIN') {
    return next(new AppError('Admin cannot purchase a subscription', 400));
  }

  // Check if user already has an active subscription
  if (user.subscription && user.subscription.status === 'active') {
    return next(new AppError('You already have an active subscription', 400));
  }

  // Creating a subscription using razorpay that we imported from the server
  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID, // The unique plan ID
    customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
    total_count: 12, // 12 means it will charge every month for a 1-year sub.
  });

  // Adding the ID and the status to the user account
  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  // Saving the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: 'subscribed successfully',
    subscription_id: subscription.id,
  });
});

/**
 * @VERIFY_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/verify
 * @ACCESS Private (Logged in user only)
 */
export const verifySubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  // Finding the user
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if required payment data is provided
  if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
    return next(new AppError('Missing payment verification data', 400));
  }

  // Use the subscription ID from the payment response (razorpay_subscription_id)
  // This is the correct subscription ID for verification
  const subscriptionId = razorpay_subscription_id;

  // Generating a signature with SHA256 for verification purposes
  // Here we use razorpay_subscription_id from the payment response
  // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
  // At the end convert it to Hex value
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest('hex');

  // Check if generated signature and signature received from the frontend is the same or not
  if (generatedSignature !== razorpay_signature) {
    return next(new AppError('Payment not verified, please try again.', 400));
  }

  // If they match create payment and store it in the DB
  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  });

  // Update the user subscription with the new subscription details
  user.subscription.id = razorpay_subscription_id;
  user.subscription.status = 'active';

  // Save the user in the DB with any changes
  await user.save();

  // Generate new JWT token with updated subscription status
  const token = await user.generateJWTToken();

  // Set the new token as httpOnly cookie
  res.cookie('token', token, {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  // Exclude sensitive data before sending response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      subscription: user.subscription
    }
  });
});

/**
 * @CANCEL_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/unsubscribe
 * @ACCESS Private (Logged in user only)
 */
export const cancelSubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  // Finding the user
  const user = await User.findById(id);

  // Checking the user role
  if (user.role === 'ADMIN') {
    return next(
      new AppError('Admin does not need to cannot cancel subscription', 400)
    );
  }

  // Finding subscription ID from subscription
  const subscriptionId = user.subscription.id;

  // Creating a subscription using razorpay that we imported from the server
  try {
    const subscription = await razorpay.subscriptions.cancel(
      subscriptionId // subscription id
    );

    // Adding the subscription status to the user account
    user.subscription.status = subscription.status;

    // Saving the user object
    await user.save();
  } catch (error) {
    // Returning error if any, and this error is from razorpay so we have statusCode and message built in
    return next(new AppError(error.error.description, error.statusCode));
  }

  // Finding the payment using the subscription ID
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  // Getting the time from the date of successful payment (in milliseconds)
  const timeSinceSubscribed = Date.now() - payment.createdAt;

  // refund period which in our case is 14 days
  const refundPeriod = 14 * 24 * 60 * 60 * 1000;

  // Check if refund period has expired or not
  if (refundPeriod <= timeSinceSubscribed) {
    return next(
      new AppError(
        'Refund period is over, so there will not be any refunds provided.',
        400
      )
    );
  }

  // If refund period is valid then refund the full amount that the user has paid
  await razorpay.payments.refund(payment.razorpay_payment_id, {
    speed: 'optimum', // This is required
  });

  user.subscription.id = undefined; // Remove the subscription ID from user DB
  user.subscription.status = undefined; // Change the subscription Status in user DB

  await user.save();
  
  // Use deleteOne instead of remove (deprecated)
  await Payment.deleteOne({ _id: payment._id });

  // Send the response
  res.status(200).json({
    success: true,
    message: 'Subscription canceled successfully',
  });
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @POST {{URL}}/api/v1/payments/razorpay-key
 * @ACCESS Public
 */
export const getRazorpayApiKey = asyncHandler(async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    message: 'Razorpay API key',
    key: process.env.RAZORPAY_KEY_ID,
  });
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @GET {{URL}}/api/v1/payments
 * @ACCESS Private (ADMIN only)
 */
export const allPayments = asyncHandler(async (req, res, _next) => {
  const { count, skip } = req.query;

  // Get actual payment records from our database (real transactions)
  const actualPayments = await Payment.countDocuments();
  
  // Get all payment records with details
  const allPaymentRecords = await Payment.find({})
    .sort({ createdAt: -1 })
    .limit(parseInt(count) || 100)
    .skip(parseInt(skip) || 0);

  // Find all subscriptions from razorpay (for additional data if needed)
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 100,
    skip: skip ? skip : 0,
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  // Calculate revenue based on actual payments (₹499 per payment)
  const subscriptionAmount = 499; // Fixed subscription amount
  const actualRevenue = actualPayments * subscriptionAmount;

  // Get monthly revenue breakdown from our Payment collection
  const monthlyPaymentCounts = await Payment.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        paymentCount: { $sum: 1 }
      }
    }
  ]);

  // Map the aggregated data to month names and calculate revenue
  monthlyPaymentCounts.forEach((item) => {
    const monthIndex = item._id - 1; // MongoDB months are 1-indexed
    if (monthIndex >= 0 && monthIndex < 12) {
      finalMonths[monthNames[monthIndex]] = item.paymentCount * subscriptionAmount;
    }
  });

  // Use actual payments count instead of Razorpay API data
  const monthlySalesRecord = Object.values(finalMonths);

  res.status(200).json({
    success: true,
    message: 'All payments with actual revenue data',
    allPayments: {
      count: actualPayments, // Actual payment records count
      items: allPaymentRecords, // Our actual payment records
      razorpayData: allPayments.items.slice(0, 10), // Keep some Razorpay data for reference
    },
    finalMonths,
    monthlySalesRecord,
    actualRevenue, // Include actual revenue separately
  });
});

// New endpoint for accurate dashboard metrics based on actual payments
export const getDashboardMetrics = asyncHandler(async (req, res, _next) => {
  try {
    // Get actual payments count from our database
    const totalPurchases = await Payment.countDocuments();

    // Calculate total revenue (₹499 per subscription)
    const subscriptionAmount = 499;
    const totalRevenue = totalPurchases * subscriptionAmount;

    // Get count of unique users who made payments (actual subscribers)
    const uniqueSubscriptions = await Payment.distinct('razorpay_subscription_id');
    const activeSubscribers = uniqueSubscriptions.length;

    res.status(200).json({
      success: true,
      message: 'Dashboard metrics based on actual payment data',
      metrics: {
        totalPurchases,
        totalRevenue,
        activeSubscribers,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard metrics',
      error: error.message
    });
  }
});
