import { useEffect } from "react";
import {
    HiAcademicCap,
    HiDevicePhoneMobile,
    HiFlag,
    HiRocketLaunch,
    HiTrophy,
    HiVideoCamera
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
    // scroll to the top on page render
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero section with course title */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Course Details
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 leading-tight">
              {state?.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Master new skills with this comprehensive course designed by industry experts
            </p>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="min-h-[50vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left section - Course media and key details */}
            <div className="space-y-6">
              {/* Course thumbnail */}
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={state?.thumbnail?.secure_url}
                    alt="course thumbnail"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Play overlay for visual appeal */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-slate-800">▶</span>
                  </div>
                </div>
              </div>

              {/* Course stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{state?.numberOfLectures}</div>
                  <div className="text-sm text-gray-400">Total Lectures</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 rounded-xl border border-slate-700/50 text-center">
                  <div className="text-2xl font-bold text-yellow-400">∞</div>
                  <div className="text-sm text-gray-400">Lifetime Access</div>
                </div>
              </div>

              {/* Instructor info */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Meet Your Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {state?.createdBy?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{state?.createdBy}</p>
                    <p className="text-gray-400 text-sm">Expert Instructor</p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="space-y-4">
                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() =>
                      navigate("/course/displaylectures", {
                        state: { ...state },
                      })
                    }
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>
                      <HiAcademicCap className="text-lg" />
                    </span>
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>
                      <HiRocketLaunch className="text-lg" />
                    </span>
                    Subscribe to Course
                  </button>
                )}
                
                {/* Additional info */}
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    Expert Content
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    Self-Paced
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    All Devices
                  </span>
                </div>
              </div>
            </div>

            {/* Right section - Course description and details */}
            <div className="space-y-6">
              {/* Course category badge */}
              <div className="inline-flex items-center gap-2">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  {state?.category}
                </span>
              </div>

              {/* Course description */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50">
                <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Course Description
                </h2>
                <div className="prose prose-gray prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-base">
                    {state?.description}
                  </p>
                </div>
              </div>

              {/* What you'll learn section */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  What You'll Learn
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-300">Master {state?.category} fundamentals and advanced concepts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-300">Gain practical, hands-on experience with {state?.numberOfLectures} lectures</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-300">Build real-world projects and applications</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-300">Learn from expert instructor {state?.createdBy}</span>
                  </div>
                </div>
              </div>

              {/* Course features */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Course Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/20 rounded-lg">
                    <div className="text-lg text-yellow-400 mb-1 flex justify-center">
                      <HiVideoCamera />
                    </div>
                    <div className="text-sm text-gray-300">HD Video Content</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/20 rounded-lg">
                    <div className="text-lg text-yellow-400 mb-1 flex justify-center">
                      <HiDevicePhoneMobile />
                    </div>
                    <div className="text-sm text-gray-300">Mobile Access</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/20 rounded-lg">
                    <div className="text-lg text-yellow-400 mb-1 flex justify-center">
                      <HiFlag />
                    </div>
                    <div className="text-sm text-gray-300">Self-Paced</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/20 rounded-lg">
                    <div className="text-lg text-yellow-400 mb-1 flex justify-center">
                      <HiTrophy />
                    </div>
                    <div className="text-sm text-gray-300">Expert Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDescription;
