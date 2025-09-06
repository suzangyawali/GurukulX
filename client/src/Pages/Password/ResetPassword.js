import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiArrowLeft,
    HiCheckCircle,
    HiEye,
    HiEyeSlash,
    HiKey,
    HiLockClosed,
    HiShieldCheck
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { resetPassword } from "../../Redux/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    cnfPassword: "",
    resetToken: useParams().resetToken,
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    cnfPassword: false,
  });

  // function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check the empty field
    if (!data.password || !data.cnfPassword || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    // password validation using regex
    if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // matching the password
    if (data.password !== data.cnfPassword) {
      toast.error("Both password should be same");
      return;
    }

    // calling the api to reset password
    const res = await dispatch(resetPassword(data));

    // redirecting to the login page
    if (res.payload.success) {
      navigate("/login");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
              <HiShieldCheck className="text-lg" />
              Reset Password
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Password</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Almost there! Create a new secure password for your account. 
              Make sure it's strong and unique.
            </p>
          </div>
        </div>
      </div>

      {/* Reset Password Form */}
      <div className="min-h-[60vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Form Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                  <HiKey className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Reset Your Password</h2>
                <p className="text-gray-400">Enter your new password below</p>
              </div>

              {/* Password Fields */}
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <HiShieldCheck className="text-lg" />
                  New Credentials
                </h3>
                
                <div className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPasswords.password ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter your new password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                        value={data.password}
                        onChange={handleUserInput}
                      />
                      <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('password')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPasswords.password ? <HiEyeSlash /> : <HiEye />}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      8+ characters with uppercase, lowercase, number and symbol
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="cnfPassword">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPasswords.cnfPassword ? "text" : "password"}
                        name="cnfPassword"
                        id="cnfPassword"
                        placeholder="Confirm your new password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                        value={data.cnfPassword}
                        onChange={handleUserInput}
                      />
                      <HiShieldCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('cnfPassword')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPasswords.cnfPassword ? <HiEyeSlash /> : <HiEye />}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Re-enter your password to confirm
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-6 border-t border-slate-700/50">
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  type="submit"
                >
                  <HiCheckCircle className="text-lg" />
                  Reset Password
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <HiArrowLeft className="text-sm" />
                    Back to Login
                  </Link>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiShieldCheck className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">Password Requirements</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Minimum 8 characters long</li>
                      <li>• At least one uppercase letter (A-Z)</li>
                      <li>• At least one lowercase letter (a-z)</li>
                      <li>• At least one number (0-9)</li>
                      <li>• At least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Notice */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-400 font-semibold text-sm mb-1">Almost Done!</h4>
                    <p className="text-gray-300 text-sm">
                      After resetting your password, you'll be redirected to the login page. 
                      Use your new password to access your account.
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

export default ResetPassword;
