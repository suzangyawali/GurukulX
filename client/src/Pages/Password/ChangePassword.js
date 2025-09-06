import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiArrowLeft,
    HiCheckCircle,
    HiExclamationTriangle,
    HiEye,
    HiEyeSlash,
    HiKey,
    HiLockClosed,
    HiShieldCheck
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { changePassword } from "../../Redux/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });

  // function to handle input box change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  // function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    // validating the password using regex
    if (
      !userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      toast.error(
        "Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(changePassword(userPassword));

    // clearing the input fields
    setUserPassword({
      oldPassword: "",
      newPassword: "",
    });

    // redirecting to profile page if password changed
    if (res.payload.success) navigate("/user/profile");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiKey className="text-lg" />
              Change Password
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Update Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Password</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Keep your account secure by regularly updating your password. 
              Enter your current password and choose a new strong password.
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="min-h-[60vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Form Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                  <HiKey className="text-2xl text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Change Your Password</h2>
                <p className="text-gray-400">Update your account security credentials</p>
              </div>

              {/* Password Fields */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <HiShieldCheck className="text-lg" />
                  Security Update
                </h3>
                
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="oldPassword">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPasswords.oldPassword ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter your current password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={userPassword.oldPassword}
                        onChange={handlePasswordChange}
                      />
                      <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('oldPassword')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPasswords.oldPassword ? <HiEyeSlash /> : <HiEye />}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Enter your existing password for verification
                    </p>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="newPassword">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPasswords.newPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={userPassword.newPassword}
                        onChange={handlePasswordChange}
                      />
                      <HiKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('newPassword')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPasswords.newPassword ? <HiEyeSlash /> : <HiEye />}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      6+ characters with uppercase, lowercase, number and symbol
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-6 border-t border-slate-700/50">
                <button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  type="submit"
                >
                  <HiCheckCircle className="text-lg" />
                  Update Password
                </button>

                {/* Back to Profile */}
                <div className="text-center">
                  <Link 
                    to="/user/profile" 
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <HiArrowLeft className="text-sm" />
                    Back to Profile
                  </Link>
                </div>
              </div>

              {/* Security Guidelines */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiShieldCheck className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">Password Security Guidelines</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use a combination of letters, numbers, and symbols</li>
                      <li>• Make it at least 6 characters long</li>
                      <li>• Include both uppercase and lowercase letters</li>
                      <li>• Avoid using personal information or common words</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiExclamationTriangle className="text-orange-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-orange-400 font-semibold text-sm mb-1">Important Notice</h4>
                    <p className="text-gray-300 text-sm">
                      After changing your password, you may need to log in again on other devices. 
                      Make sure to remember or securely store your new password.
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

export default ChangePassword;
