import {
  HiAcademicCap,
  HiBookOpen,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiCurrencyDollar,
  HiDevicePhoneMobile,
  HiFlag,
  HiLightBulb,
  HiRocketLaunch,
  HiSparkles,
  HiStar,
  HiTrophy
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import Layout from "../Layout/Layout";

const Homepage = () => {
  return (
    <Layout>
      {/* Top Header with Logo - keeping existing style */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-6 text-white bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm border-b border-slate-700/50">
        <div className="flex items-center group cursor-pointer mb-4 sm:mb-0 ml-6 sm:ml-8 lg:ml-12">
          <div className="relative">
            <img 
              src="/favicon/Header.jpeg" 
              alt="GurukulX Logo" 
              className="w-11 h-12 sm:w-16 sm:h-16 mr-2 sm:mr-4 rounded-2xl shadow-xl object-cover transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GurukulX</span>
            <div className="text-xs text-gray-400 font-medium tracking-wide hidden sm:block">Learning Management System</div>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
            <span className="text-xs sm:text-sm text-yellow-200 font-medium">Premium Education Platform</span>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/60"></div>
        
        {/* Main hero content */}
        <div className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-4 sm:mx-8 lg:mx-16 max-w-7xl xl:mx-auto">
            
            {/* Left section - platform details */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Transform Your Future
              </div>

              {/* Main headline */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Find out best{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Online Courses
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  We have a large library of courses taught by highly skilled and
                  qualified faculties at a very affordable cost.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  Expert Instructors
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Affordable Pricing
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Lifetime Access
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={"/courses"}>
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-2">
                    <HiRocketLaunch className="text-lg" />
                    Explore Courses
                  </button>
                </Link>
                <Link to={"/contact"}>
                  <button className="bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 w-full sm:w-auto flex items-center justify-center gap-2">
                    <HiChatBubbleLeftRight className="text-lg" />
                    Contact Us
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 border-t border-slate-700/50">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">1000+</div>
                    <div className="text-gray-400 text-sm">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">50+</div>
                    <div className="text-gray-400 text-sm">Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">98%</div>
                    <div className="text-gray-400 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section - enhanced image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Main image */}
                <div className="relative">
                  <img 
                    src={homePageMainImage} 
                    alt="learning platform" 
                    className="w-full max-w-md lg:max-w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-lg animate-bounce flex items-center gap-1">
                    <HiCheckCircle className="text-base" />
                    Quality Education
                  </div>
                  
                  <div className="absolute bottom-8 right-4 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-lg animate-pulse flex items-center gap-1">
                    <HiBookOpen className="text-base" />
                    Expert Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Why Choose GurukulX
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Learn from the Best
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our comprehensive learning platform
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiAcademicCap className="text-black text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                  Expert Instructors
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Learn from industry professionals with years of real-world experience and proven track records.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiLightBulb className="text-white text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                  Interactive Learning
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Engage with hands-on projects, quizzes, and practical exercises designed to reinforce your learning.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiDevicePhoneMobile className="text-white text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  Learn Anywhere
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Access your courses from any device, anytime, anywhere. Perfect for busy professionals and students.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiTrophy className="text-white text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                  Certification
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Earn industry-recognized certificates upon completion to showcase your new skills to employers.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiCurrencyDollar className="text-white text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                  Affordable Pricing
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Quality education shouldn't break the bank. Get premium content at prices everyone can afford.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiStar className="text-white text-xl font-bold" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                  24/7 Support
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get help whenever you need it. Our dedicated support team is always ready to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800/50 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Start Today
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Join thousands of successful students who have already started their learning journey with GurukulX. 
              Your future self will thank you for taking this step today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/courses"}>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <HiFlag className="text-lg" />
                Start Learning Now
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 flex items-center justify-center gap-2">
                <HiSparkles className="text-lg" />
                Create Free Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
