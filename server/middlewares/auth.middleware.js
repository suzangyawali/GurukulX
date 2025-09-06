import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
});

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  console.log('🔍 Checking subscription for user:', req.user.id);
  console.log('📊 JWT token subscription data:', req.user.subscription);
  
  // If user is admin, allow access
  if (req.user.role === "ADMIN") {
    console.log('✅ Admin user - allowing access');
    return next();
  }

  // For non-admin users, fetch fresh user data from database to get current subscription status
  const user = await User.findById(req.user.id).select('subscription');
  
  if (!user) {
    console.log('❌ User not found in database');
    return next(new AppError("User not found", 404));
  }

  console.log('💾 Database subscription data:', user.subscription);

  // Check if user has an active subscription
  if (user.subscription?.status !== "active") {
    console.log('❌ Subscription not active - denying access');
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  console.log('✅ Active subscription found - allowing access');
  next();
});
