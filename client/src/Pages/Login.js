import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiArrowRight,
  HiArrowRightOnRectangle,
  HiEnvelope,
  HiExclamationTriangle,
  HiKey,
  HiLockClosed,
  HiShieldCheck,
  HiUser
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { clearAuthState, login } from "../Redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // function to handle the user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    // calling login action
    const res = await dispatch(login(loginData));

    // redirect to home page if login is successful
    if (res?.payload?.success) {
      navigate("/");
    } else {
      // Ensure auth state is cleared on failed login
      dispatch(clearAuthState());
    }

    // clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiArrowRightOnRectangle className="text-lg" />
              Sign In
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GurukulX</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Continue your learning journey. Sign in to access your courses, track progress, 
              and unlock new opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            
            <form onSubmit={handleLogin} className="space-y-8">
              
              {/* Form Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                  <HiArrowRightOnRectangle className="text-2xl text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sign In to Your Account</h2>
                <p className="text-gray-400">Enter your credentials to access your dashboard</p>
              </div>

              {/* Login Credentials */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <HiUser className="text-lg" />
                  Account Credentials
                </h3>
                
                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={loginData.email}
                        onChange={handleUserInput}
                      />
                      <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={loginData.password}
                        onChange={handleUserInput}
                      />
                      <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                  <HiShieldCheck className="text-lg" />
                  Quick Access
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  For testing purposes, you can use these demo accounts:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLoginData({ email: "user@test.com", password: "Testuser123" })
                    }
                    className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-xl py-3 px-4 text-blue-300 transition-all duration-300 hover:scale-105"
                  >
                    <HiUser className="text-lg" />
                    <span className="font-semibold">Guest Login</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() =>
                      setLoginData({ email: "lmsadmin@example.com", password: "LMSAdmin1234" })
                    }
                    className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-xl py-3 px-4 text-purple-300 transition-all duration-300 hover:scale-105"
                  >
                    <HiShieldCheck className="text-lg" />
                    <span className="font-semibold">Admin Login</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-6 border-t border-slate-700/50">
                <button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  type="submit"
                >
                  <HiArrowRightOnRectangle className="text-lg" />
                  Sign In
                </button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Link 
                    to="/forgetpassword" 
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1 text-sm"
                  >
                    <HiKey className="text-sm" />
                    Forgot Password?
                  </Link>
                </div>

                {/* Signup Link */}
                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <Link 
                      to="/signup" 
                      className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      Create Account
                      <HiArrowRight className="text-sm" />
                    </Link>
                  </p>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiExclamationTriangle className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">Demo Account Information</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-blue-300">Guest Login:</span> Access student features and course content</li>
                      <li>• <span className="text-purple-300">Admin Login:</span> Access admin dashboard and management features</li>
                      <li>• All demo data is reset periodically for testing purposes</li>
                    </ul>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
