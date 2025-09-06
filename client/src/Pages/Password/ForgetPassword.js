import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiArrowLeft,
    HiCheckCircle,
    HiEnvelope,
    HiExclamationTriangle,
    HiInformationCircle,
    HiKey,
    HiPaperAirplane
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { forgetPassword } from "../../Redux/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  // function to handle submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty field
    if (!email) {
      toast.error("All fields are mandatory");
      return;
    }

    // email validation using regex
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email id");
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(forgetPassword(email));

    // clearing the input fields
    setEmail("");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiKey className="text-lg" />
              Reset Password
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Forgot Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Password?</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              No worries! Enter your email address and we'll send you a verification link 
              to reset your password securely.
            </p>
          </div>
        </div>
      </div>

      {/* Forget Password Form */}
      <div className="min-h-[60vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Form Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                  <HiKey className="text-2xl text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Reset Your Password</h2>
                <p className="text-gray-400">We'll help you get back into your account</p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiInformationCircle className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">How it works:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Enter your registered email address below</li>
                      <li>• We'll send you a secure verification link</li>
                      <li>• Click the link to create a new password</li>
                      <li>• Access your account with your new credentials</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <HiEnvelope className="text-lg" />
                  Email Address
                </h3>
                
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                    Registered Email Address *
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your registered email address"
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    This should be the email you used to create your account
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-6 border-t border-slate-700/50">
                <button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  type="submit"
                >
                  <HiPaperAirplane className="text-lg" />
                  Send Verification Link
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <HiArrowLeft className="text-sm" />
                    Back to Login
                  </Link>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-400 font-semibold text-sm mb-1">Security Notice</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• The verification link will expire in 1 hour for security</li>
                      <li>• If you don't receive the email, check your spam folder</li>
                      <li>• You can request a new link if the current one expires</li>
                      <li>• For security, we never store your actual password</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional Help */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiExclamationTriangle className="text-orange-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-orange-400 font-semibold text-sm mb-1">Need More Help?</h4>
                    <p className="text-gray-300 text-sm">
                      If you're still having trouble accessing your account, please contact our support team at{" "}
                      <span className="text-yellow-400 font-semibold">support@gurukulx.com</span> for assistance.
                    </p>
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

export default ForgetPassword;
