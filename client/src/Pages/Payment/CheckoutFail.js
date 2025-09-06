import {
    HiArrowLeft,
    HiArrowPath,
    HiChatBubbleLeftRight,
    HiCreditCard,
    HiExclamationTriangle,
    HiQuestionMarkCircle,
    HiShieldCheck,
    HiXCircle
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";

const CheckoutFail = () => {
  return (
    <Layout>
      {/* Error Hero Section */}
      <div className="bg-gradient-to-br from-red-900/80 to-red-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium border border-red-500/30">
              <HiXCircle className="text-lg" />
              Payment Failed
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Unsuccessful</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't worry! Payment issues happen. Let's get this sorted out quickly 
              so you can start your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Fail Content */}
      <div className="min-h-[60vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Error Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8 mb-8">
            
            {/* Error Icon and Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
                <HiXCircle className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Payment Failed</h2>
              <p className="text-xl text-gray-300 mb-6">
                Oops! Something went wrong with your payment
              </p>
              
              {/* Error Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl px-6 py-3">
                <HiExclamationTriangle className="text-red-400 text-xl" />
                <span className="text-red-300 font-semibold">Transaction Unsuccessful</span>
              </div>
            </div>

            {/* Common Issues */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <HiQuestionMarkCircle className="text-lg" />
                Common Reasons for Payment Failure
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <HiCreditCard className="text-red-400 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Card Issues</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Insufficient balance</li>
                        <li>• Expired card</li>
                        <li>• Incorrect card details</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <HiShieldCheck className="text-orange-400 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Bank Security</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Transaction blocked by bank</li>
                        <li>• Daily limit exceeded</li>
                        <li>• Network timeout</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              
              {/* Primary CTA */}
              <Link
                to="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <HiArrowPath className="text-lg" />
                Try Payment Again
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                <HiChatBubbleLeftRight className="text-lg" />
                Contact Support
              </Link>

            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-gray-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
              >
                <HiArrowLeft className="text-sm" />
                Back to Homepage
              </Link>
            </div>

          </div>

          {/* Help Information */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Quick Solutions */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="text-blue-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Quick Solutions</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Check your card details and try again</li>
                    <li>• Ensure sufficient balance in your account</li>
                    <li>• Try using a different payment method</li>
                    <li>• Contact your bank if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-start gap-3">
                <HiChatBubbleLeftRight className="text-green-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>Email:</strong> support@gurukulx.com</li>
                    <li>• <strong>Phone:</strong> +91-9999999999</li>
                    <li>• <strong>Live Chat:</strong> Available 24/7</li>
                    <li>• <strong>Response Time:</strong> Within 2 hours</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-start gap-3">
              <HiShieldCheck className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Your Security is Our Priority</h3>
                <p className="text-gray-300 text-sm">
                  No amount has been deducted from your account. Our payment system uses bank-grade 
                  encryption and is PCI DSS compliant. If you see any unauthorized charges, please 
                  contact us immediately.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CheckoutFail;
