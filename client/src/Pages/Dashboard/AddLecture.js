import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiAcademicCap,
    HiArrowLeft,
    HiCheckCircle,
    HiCloudArrowUp,
    HiDocumentText,
    HiPlayCircle,
    HiPlus,
    HiSparkles,
    HiVideoCamera
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { addCourseLecture } from "../../Redux/lectureSlice";

const AddLectures = () => {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  // function to handle the input box change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // function to get video and its link from the input
  const getVideo = (event) => {
    const video = event.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({ ...userInput, videoSrc: source, lecture: video });
  };

  // function to handle the form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty fields
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const res = await dispatch(addCourseLecture(userInput));
    if (res?.payload?.success) {
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  };

  // redirecting the user if no user details
  useEffect(() => {
    if (!courseDetails) {
      navigate(-1);
    }
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900/80 to-indigo-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
              <HiPlayCircle className="text-lg" />
              Add New Lecture
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Lecture</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Add engaging video content to <span className="text-purple-300 font-semibold">{courseDetails?.title}</span>. 
              Share your knowledge and help students achieve their goals.
            </p>
          </div>
        </div>
      </div>

      {/* Add Lecture Form */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
            >
              <HiArrowLeft className="text-lg" />
              Back to Course
            </button>
          </div>

          {/* Course Info Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full">
                <HiAcademicCap className="text-purple-400 text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{courseDetails?.title}</h2>
                <p className="text-gray-400 text-sm">Adding lecture to this course</p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <HiPlus className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">New Lecture Details</h3>
                  <p className="text-purple-100 text-sm">Fill in the information for your new lecture</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleFormSubmit} className="p-8">
              
              <div className="space-y-8">
                
                {/* Video Upload Section */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <HiVideoCamera className="text-purple-400" />
                    Lecture Video
                  </h4>
                  
                  <div className="relative">
                    {userInput.videoSrc ? (
                      <div className="relative group">
                        {/* Responsive Video Container */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                          <video
                            src={userInput.videoSrc}
                            muted
                            controls
                            controlsList="nodownload nofullscreen"
                            disablePictureInPicture
                            playsInline
                            preload="metadata"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl border-2 border-slate-600/50"
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          />
                        </div>
                        <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center gap-1 text-white text-sm font-medium">
                            <HiCheckCircle className="text-sm" />
                            Video Selected
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <label
                          htmlFor="lecture"
                          className="block w-full h-64 border-2 border-dashed border-slate-600/50 rounded-xl bg-slate-700/30 hover:bg-slate-600/30 transition-colors duration-300 cursor-pointer group"
                        >
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              <HiCloudArrowUp className="mx-auto text-5xl mb-4" />
                              <h4 className="font-semibold text-xl mb-2">Upload Lecture Video</h4>
                              <p className="text-sm mb-1">Click to browse or drag and drop</p>
                              <p className="text-xs">MP4, WebM up to 500MB</p>
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          name="lecture"
                          id="lecture"
                          onChange={getVideo}
                          accept="video/mp4,video/x-m4v,video/*"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-xs mt-2">
                    Upload a high-quality video that clearly explains the lecture content
                  </p>
                </div>

                {/* Lecture Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Lecture Title */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
                      Lecture Title *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={userInput.title}
                        onChange={handleInputChange}
                        placeholder="Enter an engaging lecture title"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                        required
                      />
                      <HiPlayCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Make it descriptive and compelling to capture student interest
                    </p>
                  </div>

                  {/* Lecture Description */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="description">
                      Lecture Description *
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        id="description"
                        rows="5"
                        value={userInput.description}
                        onChange={handleInputChange}
                        placeholder="Describe what students will learn in this lecture, key concepts covered, and learning outcomes..."
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
                        required
                      />
                      <HiDocumentText className="absolute left-4 top-4 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Provide a clear overview of the lecture content and objectives
                    </p>
                  </div>

                </div>

              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <HiSparkles className="text-lg" />
                  Add Lecture to Course
                </button>
              </div>

            </form>

          </div>

          {/* Best Practices Section */}
          <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <HiSparkles className="text-yellow-400" />
              Best Practices for Effective Lectures
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Clear Structure</h4>
                  <p className="text-gray-400 text-xs">Start with objectives, cover content, end with summary</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Engaging Delivery</h4>
                  <p className="text-gray-400 text-xs">Use examples, analogies, and interactive elements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Quality Production</h4>
                  <p className="text-gray-400 text-xs">Ensure good audio, lighting, and video quality</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AddLectures;
