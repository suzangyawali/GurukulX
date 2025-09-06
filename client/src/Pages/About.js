import {
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiCurrencyDollar,
  HiGlobeAlt,
  HiRocketLaunch
} from "react-icons/hi2";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import apj from "../Assets/Images/QuotesPersonalityImage/apj.png";
import billGates from "../Assets/Images/QuotesPersonalityImage/billGates.png";
import einstein from "../Assets/Images/QuotesPersonalityImage/einstein.png";
import nelsonMandela from "../Assets/Images/QuotesPersonalityImage/nelsonMandela.png";
import steveJobs from "../Assets/Images/QuotesPersonalityImage/steveJobs.png";
import Layout from "../Layout/Layout";

const About = () => {
  const personalities = [
    {
      id: 1,
      name: "Nelson Mandela",
      image: nelsonMandela,
      quote: "Education is the most powerful tool you can use to change the world.",
      role: "Former President of South Africa"
    },
    {
      id: 2,
      name: "A. P. J. Abdul Kalam",
      image: apj,
      quote: "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.",
      role: "Former President of India"
    },
    {
      id: 3,
      name: "Albert Einstein",
      image: einstein,
      quote: "Education is not the learning of facts, but the training of the mind to think.",
      role: "Theoretical Physicist"
    },
    {
      id: 4,
      name: "Steve Jobs",
      image: steveJobs,
      quote: "Innovation distinguishes between a leader and a follower.",
      role: "Co-founder of Apple Inc."
    },
    {
      id: 5,
      name: "Bill Gates",
      image: billGates,
      quote: "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important.",
      role: "Co-founder of Microsoft"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              About GurukulX
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 leading-tight">
              Empowering Minds Through Education
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Transforming lives through accessible, quality education for everyone, everywhere
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-[50vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Our Mission
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
                  Affordable and Quality Education
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Our goal is to provide affordable and quality education to the world. We are creating a platform that bridges the gap between aspiring teachers and eager students.
                </p>
                <p className="text-base sm:text-lg">
                  We believe in empowering individuals to share their creativity, skills, and knowledge with each other, fostering growth and contributing to the wellness of mankind.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <HiCheckCircle className="text-white text-sm font-bold" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Quality Content</h3>
                      <p className="text-gray-400 text-xs">Expert-curated courses</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <HiCurrencyDollar className="text-white text-sm font-bold" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Affordable Access</h3>
                      <p className="text-gray-400 text-xs">Education for everyone</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">∞</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Lifetime Learning</h3>
                      <p className="text-gray-400 text-xs">Unlimited access</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <HiGlobeAlt className="text-white text-sm font-bold" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Global Community</h3>
                      <p className="text-gray-400 text-xs">Worldwide learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  className="relative w-full h-auto object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  src={aboutMainImage}
                  alt="Education empowerment"
                />
              </div>
            </div>
          </div>

          {/* Inspirational Quotes Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                Words of Wisdom
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
                Inspiration from Great Minds
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Learn from the thoughts and experiences of visionaries who have shaped our world through education and innovation
              </p>
            </div>

            {/* Quotes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {personalities.map((person, index) => (
                <div
                  key={person.id}
                  className="group bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                >
                  {/* Quote Icon */}
                  <div className="text-yellow-400/30 text-4xl font-serif mb-4">"</div>
                  
                  {/* Quote Text */}
                  <blockquote className="text-gray-300 text-base leading-relaxed mb-6 line-clamp-4">
                    {person.quote}
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-full object-cover border-2 border-gradient-to-r from-yellow-500 to-orange-500 group-hover:scale-110 transition-transform duration-300"
                        src={person.image}
                        alt={person.name}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 group-hover:animate-pulse"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors duration-300">
                        {person.name}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 p-8 lg:p-12 text-center shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  Join Our Community
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Start Your Learning Journey Today
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Join thousands of learners who have transformed their lives through our platform. 
                  Begin your educational journey with industry experts and unlock your potential.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => window.location.href = '/courses'}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <HiRocketLaunch className="text-lg" />
                  Explore Courses
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 flex items-center gap-2"
                >
                  <HiChatBubbleLeftRight className="text-lg" />
                  Contact Us
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">10,000+</div>
                  <div className="text-gray-400 text-sm">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">50+</div>
                  <div className="text-gray-400 text-sm">Expert Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">100+</div>
                  <div className="text-gray-400 text-sm">Quality Courses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
