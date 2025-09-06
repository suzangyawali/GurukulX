import { useEffect } from "react";
import {
  HiCheckCircle,
  HiCreditCard,
  HiEnvelope,
  HiExclamationTriangle,
  HiKey,
  HiPencilSquare,
  HiShieldCheck,
  HiUser,
  HiXCircle
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";
import { cancelCourseBundle } from "../../Redux/razorpaySlice";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);

  // function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
  };

  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiUser className="text-lg" />
              User Profile
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{userData?.fullName}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Manage your account settings, subscription, and personal information
            </p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="min-h-[60vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-6 text-center">
                <div className="relative inline-block">
                  <img
                    className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-xl object-cover"
                    src={userData?.avatar?.secure_url || "/api/placeholder/150/150"}
                    alt="user profile image"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full border-2 border-slate-800 flex items-center justify-center">
                    <HiCheckCircle className="text-white text-sm" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-4 capitalize">
                  {userData?.fullName}
                </h2>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${userData?.subscription?.status === "active" ? "bg-green-400" : "bg-gray-400"}`}></div>
                  <p className="text-gray-400 text-sm">
                    {userData?.subscription?.status === "active" ? "Premium Member" : "Free Member"}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Account Information */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                  <HiUser className="text-lg" />
                  Account Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <HiEnvelope className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Email Address</p>
                      <p className="text-white font-semibold">{userData?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <HiShieldCheck className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Account Role</p>
                      <p className="text-white font-semibold capitalize">{userData?.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      userData?.subscription?.status === "active" 
                        ? "bg-gradient-to-r from-green-500 to-green-600" 
                        : "bg-gradient-to-r from-gray-500 to-gray-600"
                    }`}>
                      <HiCreditCard className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Subscription Status</p>
                      <div className="flex items-center gap-2">
                        <p className={`font-semibold ${
                          userData?.subscription?.status === "active" 
                            ? "text-green-400" 
                            : "text-gray-400"
                        }`}>
                          {userData?.subscription?.status === "active" ? "Active Premium" : "Free Plan"}
                        </p>
                        {userData?.subscription?.status === "active" && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-6">Account Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to={userData?.email === "test@gmail.com" ? "/denied" : "/changepassword"}
                    className="group"
                  >
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <HiKey className="text-lg" />
                      Change Password
                    </button>
                  </Link>

                  <Link
                    to={userData?.email === "test@gmail.com" ? "/denied" : "/user/editprofile"}
                    className="group"
                  >
                    <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <HiPencilSquare className="text-lg" />
                      Edit Profile
                    </button>
                  </Link>
                </div>

                {userData?.subscription?.status === "active" && (
                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <HiExclamationTriangle className="text-red-400 text-lg" />
                        <h4 className="text-red-400 font-semibold">Cancel Subscription</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Canceling your subscription will remove access to premium features at the end of your billing cycle.
                      </p>
                    </div>
                    
                    <button
                      onClick={handleCourseCancelSubscription}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <HiXCircle className="text-lg" />
                      Cancel Premium Subscription
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
