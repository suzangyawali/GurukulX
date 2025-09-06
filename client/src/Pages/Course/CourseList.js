import { useEffect } from "react";
import { HiBookOpen } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
    })();
  }, [dispatch]);

  return (
    <Layout>
      {/* Hero section with better introduction */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Premium Learning Experience
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Explore Courses by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Industry Experts
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master new skills with our comprehensive courses designed by professionals. 
              Join thousands of students already learning with GurukulX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {coursesData?.length || 0} Courses Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Expert Instructors
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Lifetime Access
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* courses container for displaying the cards */}
      <div className="min-h-[50vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {coursesData && coursesData.length > 0 ? (
              coursesData.map((element) => {
                return <CourseCard key={element._id} data={element} />;
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                    <HiBookOpen className="text-2xl text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Loading Courses...</h3>
                  <p className="text-gray-400">Please wait while we fetch the latest courses for you.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
