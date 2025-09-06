import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:4000/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

// Global response interceptor for JWT expiry
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check for JWT expiry errors
    if (error?.response?.data?.message === "jwt expired" || 
        error?.response?.data?.message === "jwt malformed") {
      
      toast.error("Your session has expired. Please login again.");
      
      // Clear localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("data");
      localStorage.removeItem("role");
      
      // Redirect to login page
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
