import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
  dashboardMetrics: {
    totalPurchases: 0,
    totalRevenue: 0,
    activeSubscribers: 0,
  },
};

// function to get the api key
export const getRazorPayId = createAsyncThunk("/razorPayId/get", async () => {
  try {
    const res = await axiosInstance.get("/payments/razorpay-key");
    return res.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

// function to purchase the course bundle
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      return res.data;
    } catch (error) {
      console.log("Subscription error:", error.response?.data);
      
      // Handle JWT expiry specifically
      if (error?.response?.data?.message === "jwt expired" || 
          error?.response?.data?.message === "jwt malformed" ||
          error?.response?.data?.message?.includes("Unauthorized")) {
        
        toast.error("Your session has expired. Please login again.");
        
        // Clear localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        
        // Redirect to login page
        window.location.href = "/login";
        
        return;
      }
      
      // Handle other errors
      const errorMessage = error?.response?.data?.message || "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  }
);

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk(
  "/verifyPayment",
  async (paymentDetail, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: paymentDetail.razorpay_payment_id,
        razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
        razorpay_signature: paymentDetail.razorpay_signature,
      });
      
      // If payment verification returns updated user data, update auth state
      if (res?.data?.user?.subscription) {
        const { updateUserSubscription } = await import('../Redux/authSlice.js');
        dispatch(updateUserSubscription(res.data.user.subscription));
      }
      
      return res?.data;
    } catch (error) {
      console.log("Payment verification error:", error.response?.data);
      
      // Handle JWT expiry specifically
      if (error?.response?.data?.message === "jwt expired" || 
          error?.response?.data?.message === "jwt malformed" ||
          error?.response?.data?.message?.includes("Unauthorized")) {
        
        toast.error("Your session has expired. Please login again.");
        
        // Clear localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        
        // Redirect to login page
        window.location.href = "/login";
        
        return;
      }
      
      // Handle other errors
      const errorMessage = error?.response?.data?.message || "Payment verification failed";
      toast.error(errorMessage);
      throw error;
    }
  }
);

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk("paymentrecord", async () => {
  try {
    const res = axiosInstance.get("/payments?count=100");
    toast.promise(res, {
      loading: "Getting the payments record...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to get payment records",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error("Operation failed");
  }
});

// function to cancel the course bundle subscription
export const cancelCourseBundle = createAsyncThunk(
  "/cancelCourse",
  async () => {
    try {
      const res = axiosInstance.post("/payments/unsubscribe");
      toast.promise(res, {
        loading: "Unsubscribing the bundle...",
        success: "Bundle unsubscibed successfully",
        error: "Failed to unsubscibe the bundle",
      });
      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get dashboard metrics based on actual payment data
export const getDashboardMetrics = createAsyncThunk(
  "payment/getDashboardMetrics",
  async () => {
    try {
      const res = await axiosInstance.get("/payments/dashboard-metrics");
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch dashboard metrics");
      throw error;
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.rejected, () => {
        toast.error("Failed to get razor pay id");
      })
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      })
      .addCase(getDashboardMetrics.fulfilled, (state, action) => {
        state.dashboardMetrics = action?.payload?.metrics;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;
