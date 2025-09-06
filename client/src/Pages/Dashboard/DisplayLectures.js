import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/lectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // to play the video accordingly
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Redirect if no course details (direct URL access)
  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses", { replace: true });
      return;
    }
  }, [courseDetails, navigate]);

  // function to handle lecture delete
  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  // fetching the course lecture data
  useEffect(() => {
    if (courseDetails?._id) {
      (async () => {
        await dispatch(getCourseLecture(courseDetails._id));
      })();
    }
  }, [courseDetails, dispatch]);

  // Show loading if no course details
  if (!courseDetails) {
    return (
      <Layout>
        <div className="min-h-[90vh] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 lg:gap-10 items-center justify-center min-h-[90vh] py-6 lg:py-10 text-white mx-4 lg:mx-[5%]">
        {/* displaying the course name */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {courseDetails?.title}
          </h1>
          <p className="text-gray-400 text-sm lg:text-base">Course Lectures</p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center gap-6 lg:gap-10 w-full max-w-7xl">
          {/* left section for playing the video and displaying course details */}
          <div className="space-y-4 lg:space-y-6 w-full xl:w-[600px] bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 lg:p-6 rounded-2xl shadow-2xl border border-slate-700/50">
            {lectures && lectures.length > 0 ? (
              <>
                <div className="relative group">
                  {/* Responsive Video Container */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                    <video
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
                      src={lectures[currentVideoIndex]?.lecture?.secure_url}
                      controls
                      disablePictureInPicture
                      controlsList="nodownload"
                      playsInline
                      preload="metadata"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    ></video>
                    {/* Overlay with pointer-events-none to ensure video controls are always clickable */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" style={{ pointerEvents: 'none' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-lg lg:text-xl font-bold text-yellow-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    {lectures[currentVideoIndex]?.title}
                  </h2>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm lg:text-base text-gray-200 leading-relaxed">
                      <span className="text-yellow-400 font-semibold">Description: </span>
                      {lectures[currentVideoIndex]?.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      Lecture {currentVideoIndex + 1} of {lectures.length}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No lectures available yet</p>
              </div>
            )}
          </div>

          {/* right section for displaying all the lectures of the course */}
          <div className="w-full xl:w-[500px] bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-4 lg:p-6 rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Lectures
                </h3>
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                  {lectures?.length || 0}
                </span>
              </div>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg"
                >
                  + Add Lecture
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[400px] lg:max-h-[500px] overflow-y-auto custom-scrollbar">
              {lectures && lectures.length > 0 ? (
                lectures.map((element, index) => (
                  <div
                    key={element._id}
                    className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer border ${
                      currentVideoIndex === index
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-lg'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 border-slate-600/50 hover:border-slate-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            currentVideoIndex === index 
                              ? 'bg-yellow-500 text-black' 
                              : 'bg-slate-600 text-gray-300'
                          }`}>
                            Lecture {index + 1}
                          </span>
                          {currentVideoIndex === index && (
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                              Now Playing
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-white text-sm lg:text-base line-clamp-2 mb-2">
                          {element?.title}
                        </h4>
                        <p className="text-gray-400 text-xs lg:text-sm line-clamp-2">
                          {element?.description}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setCurrentVideoIndex(index);
                            setIsVideoPlaying(false); // reset play state on video change
                          }}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md ${
                            currentVideoIndex === index && isVideoPlaying
                              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
                          }`}
                        >
                          {currentVideoIndex === index && isVideoPlaying ? 'Playing' : 'Watch'}
                        </button>
                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              handleLectureDelete(courseDetails?._id, element?._id)
                            }
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 py-1 rounded-lg font-semibold text-xs transition-all duration-200 shadow-md"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No lectures available</p>
                  {role === "ADMIN" && (
                    <p className="text-sm text-gray-500 mt-2">Click "Add Lecture" to get started</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DisplayLectures;
