import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import {
  HiAcademicCap,
  HiHeart,
  HiLocationMarker,
  HiMail,
  HiPhone
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <>
      {/* Enhanced modern footer */}
      <footer className="bg-gradient-to-br from-slate-900/95 to-slate-800/90 text-white border-t border-slate-700/50">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src="/favicon/Header.jpeg" 
                    alt="GurukulX Logo" 
                    className="w-12 h-12 rounded-xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/25 to-orange-500/15"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    GurukulX
                  </h3>
                  <p className="text-xs text-gray-400">Learning Management System</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering minds through quality education. Join thousands of learners 
                transforming their careers with our comprehensive learning platform.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HiAcademicCap className="text-yellow-400" />
                <span>Quality Education for Everyone</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-yellow-400">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Home
                </Link>
                <Link to="/courses" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  All Courses
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  About Us
                </Link>
                <Link to="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-yellow-400">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <HiMail className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">support@gurukulx.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <HiPhone className="text-green-400 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <HiLocationMarker className="text-red-400 flex-shrink-0" />
                  <span className="text-sm">Global Online Platform</span>
                </div>
              </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-yellow-400">Stay Connected</h4>
              
              {/* Social media links */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">Follow us on social media for updates</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-slate-700/50 hover:bg-blue-600/50 rounded-lg transition-all duration-300 transform hover:scale-110 group border border-slate-600/50 hover:border-blue-500/50"
                    aria-label="Facebook"
                  >
                    <BsFacebook className="text-lg group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-slate-700/50 hover:bg-pink-600/50 rounded-lg transition-all duration-300 transform hover:scale-110 group border border-slate-600/50 hover:border-pink-500/50"
                    aria-label="Instagram"
                  >
                    <BsInstagram className="text-lg group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-slate-700/50 hover:bg-sky-600/50 rounded-lg transition-all duration-300 transform hover:scale-110 group border border-slate-600/50 hover:border-sky-500/50"
                    aria-label="Twitter"
                  >
                    <BsTwitter className="text-lg group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-slate-700/50 hover:bg-blue-700/50 rounded-lg transition-all duration-300 transform hover:scale-110 group border border-slate-600/50 hover:border-blue-600/50"
                    aria-label="LinkedIn"
                  >
                    <BsLinkedin className="text-lg group-hover:text-white transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-slate-700/50 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {year} GurukulX. All Rights Reserved.</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Made with</span>
                <HiHeart className="text-red-400 animate-pulse" />
                <span>for better education</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
