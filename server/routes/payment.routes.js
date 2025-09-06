import { Router } from 'express';
import {
  allPayments,
  buySubscription,
  cancelSubscription,
  getDashboardMetrics,
  getRazorpayApiKey,
  verifySubscription,
} from '../controllers/payment.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const router = Router();
// Route for subscribing to a service.
// POST /subscribe
// Middleware: Ensures the user is logged in before allowing them to subscribe.
router.route('/subscribe').post(isLoggedIn, buySubscription);

// Route for verifying the subscription payment.
// POST /verify
// Middleware: Ensures the user is logged in before verifying the subscription.
router.route('/verify').post(isLoggedIn, verifySubscription);

// Route for unsubscribing or canceling a subscription.
// POST /unsubscribe
// Middleware: Ensures the user is logged in and is a valid subscriber before canceling the subscription.
router
  .route('/unsubscribe')
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);
  
// Route for fetching the Razorpay API key.
// GET /razorpay-key
// Access: Public (Razorpay public key is safe to expose)
router.route('/razorpay-key').get(getRazorpayApiKey);


// Route for fetching all payment records (admin-only).
// GET /
// Middleware: Ensures the user is logged in and has the 'ADMIN' role.
router.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), allPayments);//details

// Route for fetching dashboard metrics based on actual payment data (admin-only).
// GET /dashboard-metrics
// Middleware: Ensures the user is logged in and has the 'ADMIN' role.
router.route('/dashboard-metrics').get(isLoggedIn, authorizeRoles('ADMIN'), getDashboardMetrics);

export default router;
