import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
    HiAcademicCap,
    HiArrowRight,
    HiCheckCircle,
    HiClock,
    HiCurrencyRupee,
    HiGift,
    HiLockClosed,
    HiShieldCheck,
    HiSparkles,
    HiStar,
    HiTrophy
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";
import {
    getRazorPayId,
    purchaseCourseBundle,
    verifyUserPayment,
} from "../../Redux/razorpaySlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorPayKey = useSelector((state) => state.razorpay.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );
  const userData = useSelector((state) => state.auth.data);
  const { isPaymentVerified } = useSelector((state) => state.razorpay);

  // for storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (!razorPayKey || !subscription_id) {
      return;
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "GurukulX Pvt. Ltd.",
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // If payment is verified successfully, refresh user data to get updated subscription
        if (res?.payload?.success) {
          await dispatch(getUserData());
          toast.success("Subscription activated! You can now access all courses.");
        }

        // redirecting the user according to the verification status
        !isPaymentVerified
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    (async () => {
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle());
    })();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-900/80 to-orange-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiTrophy className="text-lg" />
              Pro Bundle Subscription
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Unlimited Learning</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get instant access to our entire course library with expert-led content, 
              premium features, and continuous updates.
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Features Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* What's Included */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HiGift className="text-yellow-400" />
                  What's Included in Pro Bundle
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <HiAcademicCap className="text-blue-400 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">All Courses Access</h3>
                      <p className="text-gray-300 text-sm">Access to our complete library of courses from industry experts</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <HiSparkles className="text-green-400 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">New Releases</h3>
                      <p className="text-gray-300 text-sm">Get instant access to all newly launched courses</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <HiClock className="text-purple-400 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">1 Year Duration</h3>
                      <p className="text-gray-300 text-sm">Full access for 12 months with automatic renewal option</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <HiShieldCheck className="text-yellow-400 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Premium Support</h3>
                      <p className="text-gray-300 text-sm">Priority customer support and community access</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Course Benefits */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HiStar className="text-yellow-400" />
                  Why Choose Pro Bundle?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                    <span className="text-gray-300">Learn from top industry subject matter experts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                    <span className="text-gray-300">High-quality video content with practical projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                    <span className="text-gray-300">Downloadable resources and course materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                    <span className="text-gray-300">Mobile app access for learning on-the-go</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                    <span className="text-gray-300">Certificates of completion for all courses</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Checkout Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                
                <form onSubmit={handleSubscription}>
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-center">
                      <h3 className="text-2xl font-bold text-black mb-2">Pro Bundle</h3>
                      <p className="text-black/80 text-sm">Complete Learning Package</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      
                      {/* Pricing */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-4xl font-bold text-yellow-400 mb-2">
                          <HiCurrencyRupee className="text-3xl" />
                          <span>499</span>
                        </div>
                        <p className="text-gray-400 text-sm">per month</p>
                        <p className="text-yellow-300 text-xs mt-1">Save 60% compared to individual courses</p>
                      </div>

                      {/* Duration */}
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                          <HiClock className="text-lg" />
                          <span className="font-semibold">12 Month Access</span>
                        </div>
                        <p className="text-gray-300 text-sm">Full access to all current and future courses</p>
                      </div>

                      {/* Security & Guarantee */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <HiShieldCheck className="flex-shrink-0" />
                          <span>100% refund at cancellation</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <HiLockClosed className="flex-shrink-0" />
                          <span>Secure payment with Razorpay</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <HiCheckCircle className="flex-shrink-0" />
                          <span>Instant activation after payment</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <HiShieldCheck className="text-lg" />
                        Subscribe Now
                        <HiArrowRight className="text-lg" />
                      </button>

                      {/* Terms */}
                      <p className="text-gray-500 text-xs text-center">
                        * Terms & Conditions Applied. 
                        By purchasing, you agree to our subscription terms.
                      </p>

                    </div>

                  </div>
                </form>

              </div>
            </div>

          </div>

          {/* Trust Indicators */}
          <div className="mt-12 bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Trusted by Thousands of Learners</h3>
              <p className="text-gray-400">Join our community of successful professionals</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">10,000+</div>
                <div className="text-gray-300 text-sm">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">500+</div>
                <div className="text-gray-300 text-sm">Expert Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">95%</div>
                <div className="text-gray-300 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
