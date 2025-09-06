import { useEffect } from "react";
import {
    HiAcademicCap,
    HiArrowRight,
    HiCheckCircle,
    HiGift,
    HiSparkles,
    HiStar,
    HiTrophy
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Refresh user data to ensure subscription status is updated
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Layout>
      {/* Success Hero Section */}
      <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
              <HiCheckCircle className="text-lg" />
              Payment Successful
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Pro Bundle!</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              🎉 Congratulations! You've successfully unlocked access to our entire course library. 
              Your learning journey just got supercharged!
            </p>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Success Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8 mb-8">
            
            {/* Success Icon and Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 animate-pulse">
                <HiCheckCircle className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-xl text-gray-300 mb-6">
                You're now part of our exclusive Pro Bundle community
              </p>
              
              {/* Success Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl px-6 py-3">
                <HiTrophy className="text-green-400 text-xl" />
                <span className="text-green-300 font-semibold">Pro Member Activated</span>
                <HiSparkles className="text-green-400 text-xl" />
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              
              {/* Benefit 1 */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-4">
                  <HiAcademicCap className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Unlimited Access</h3>
                <p className="text-gray-300 text-sm">
                  Access to all existing and future courses in our library
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-4">
                  <HiStar className="text-purple-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Content</h3>
                <p className="text-gray-300 text-sm">
                  Learn from top industry subject matter experts
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mb-4">
                  <HiGift className="text-yellow-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Premium Support</h3>
                <p className="text-gray-300 text-sm">
                  Priority support and exclusive community access
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              {/* Primary CTA */}
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <HiAcademicCap className="text-lg" />
                Start Learning Now
                <HiArrowRight className="text-lg" />
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                Go to Dashboard
              </Link>

            </div>

          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Next Steps */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-start gap-3">
                <HiSparkles className="text-green-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">What's Next?</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Browse our complete course catalog</li>
                    <li>• Set up your learning goals and preferences</li>
                    <li>• Join our exclusive Pro member community</li>
                    <li>• Download our mobile app for learning on-the-go</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-blue-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Subscription</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>Plan:</strong> Pro Bundle Monthly</li>
                    <li>• <strong>Access:</strong> Unlimited Courses</li>
                    <li>• <strong>Billing:</strong> ₹499/month</li>
                    <li>• <strong>Cancellation:</strong> 100% refund guarantee</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Need help getting started? <Link to="/contact" className="text-green-400 hover:text-green-300 underline">Contact our support team</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;
