import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiArrowRight,
  HiCamera,
  HiCheckCircle,
  HiEnvelope,
  HiExclamationTriangle,
  HiLockClosed,
  HiUser,
  HiUserCircle,
  HiUserPlus
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { createAccount } from "../Redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setImagePreview] = useState("");

  // for user input
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to create account
  const createNewAccount = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    // checking the name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // email validation using regex
    if (
      !signupData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("Invalid email id");
      return;
    }

    // password validation using regex
    if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // calling create account action
    const res = await dispatch(createAccount(formData));

    // redirect to login page if true
    if (res.payload.success) navigate("/login");

    // clearing the signup inputs
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setImagePreview("");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <HiUserPlus className="text-lg" />
              Create Account
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GurukulX</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Start your learning journey today. Create your account and unlock access to thousands of courses 
              taught by industry experts.
            </p>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            
            <form onSubmit={createNewAccount} className="space-y-8">
              
              {/* Profile Picture Section */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center justify-center gap-2">
                  <HiCamera className="text-lg" />
                  Profile Picture
                </h2>
                
                <div className="relative inline-block">
                  <label className="cursor-pointer group" htmlFor="image_uploads">
                    <div className="relative">
                      {previewImage ? (
                        <img
                          className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-xl object-cover group-hover:opacity-80 transition-opacity duration-300"
                          src={previewImage}
                          alt="profile preview"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-600 flex items-center justify-center bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors duration-300">
                          <HiUserCircle className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Camera overlay */}
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <HiCamera className="text-white text-2xl" />
                      </div>
                    </div>
                  </label>
                  
                  <input
                    onChange={getImage}
                    className="hidden"
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                  />
                  
                  {/* Upload hint */}
                  <p className="text-gray-400 text-sm mt-3">
                    Click to upload your profile picture
                  </p>
                  <p className="text-gray-500 text-xs">
                    Optional - You can add this later
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <HiUser className="text-lg" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="fullName">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter your full name"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={signupData.fullName}
                        onChange={handleUserInput}
                      />
                      <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Name should be at least 5 characters long
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={signupData.email}
                        onChange={handleUserInput}
                      />
                      <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      We'll use this for account verification and updates
                    </p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Create a strong password"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                        value={signupData.password}
                        onChange={handleUserInput}
                      />
                      <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      8+ characters with uppercase, lowercase, number and symbol
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
                  Create Account
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      Sign In
                      <HiArrowRight className="text-sm" />
                    </Link>
                  </p>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiExclamationTriangle className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">Account Creation Guidelines</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use a valid email address for account verification</li>
                      <li>• Choose a strong password to secure your account</li>
                      <li>• Profile picture is optional but recommended</li>
                      <li>• You'll get instant access to free courses after registration</li>
                    </ul>
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

export default Signup;
