import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiChatBubbleLeftRight,
    HiCheckCircle,
    HiClock,
    HiEnvelope,
    HiGlobeAlt,
    HiMapPin,
    HiPaperAirplane,
    HiPhone,
    HiUser
} from "react-icons/hi2";
import axiosInstance from "../Helper/axiosInstance";
import Layout from "../Layout/Layout";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // function to handle the input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // function to send form data to backend
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for empty fields
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    // email validation using regex
    if (
      !userInput.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("Invalid email id");
      return;
    }

    try {
      const res = axiosInstance.post("/contact", { ...userInput });
      toast.promise(res, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const response = await res;

      // clearing the input fields after successfull submission of form
      if (response?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed...");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiChatBubbleLeftRight className="text-lg" />
              Get In Touch
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GurukulX</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our courses? Need support? Want to partner with us? 
              We'd love to hear from you and help you on your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                    <HiEnvelope className="text-2xl text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you soon</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={userInput.name}
                        onChange={handleInputChange}
                      />
                      <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={userInput.email}
                        onChange={handleInputChange}
                      />
                      <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="message">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 resize-none h-32"
                        name="message"
                        id="message"
                        placeholder="Tell us how we can help you..."
                        value={userInput.message}
                        onChange={handleInputChange}
                      />
                      <HiChatBubbleLeftRight className="absolute left-4 top-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <HiPaperAirplane className="text-lg" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information & Map */}
            <div className="order-1 lg:order-2 space-y-8">
              
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                  <HiMapPin className="text-xl" />
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <HiMapPin className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Our Location</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Andhra University South Campus<br />
                        Andhra University, Visakhapatnam<br />
                        Andhra Pradesh - 530003, India
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <HiEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email Us</h4>
                      <p className="text-gray-300 text-sm">support@gurukulx.com</p>
                      <p className="text-gray-300 text-sm">admissions@gurukulx.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <HiPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Call Us</h4>
                      <p className="text-gray-300 text-sm">+91 891-123-4567</p>
                      <p className="text-gray-300 text-sm">+91 891-765-4321</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <HiClock className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                      <p className="text-gray-300 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-300 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <HiGlobeAlt className="text-lg" />
                  Find Us on Map
                </h3>
                
                <div className="relative rounded-xl overflow-hidden">
                  {/* Responsive iframe container */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.6776837856453!2d83.32427451484328!3d17.724259187769556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a394342df902d1d%3A0xe264f2ceedd9e7db!2sAndhra%20University%20South%20Campus%2C%20Andhra%20University%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530003!5e0!3m2!1sen!2sin!4v1694021234567!5m2!1sen!2sin"
                      className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        border: 0,
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    ></iframe>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    <HiCheckCircle className="text-green-400 flex-shrink-0" />
                    Located in the heart of Visakhapatnam's educational district
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
