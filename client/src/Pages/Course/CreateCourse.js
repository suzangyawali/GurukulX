import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    HiAcademicCap,
    HiArrowLeft,
    HiCheckCircle,
    HiDocumentText,
    HiPhoto,
    HiPlus,
    HiSparkles,
    HiTag,
    HiUser
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { createNewCourse, updateCourse } from "../../Redux/courseSlice";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const { initialCourseData } = useLocation().state;

  // for toggling disable of image input box
  const [isDisabled, setIsDisabled] = useState(!initialCourseData?.newCourse);

  // for storing the user input
  const [userInput, setUserInput] = useState({
    title: initialCourseData?.title,
    category: initialCourseData?.category,
    createdBy: initialCourseData?.createdBy,
    description: initialCourseData?.description,
    thumbnail: null,
    previewImage: initialCourseData?.thumbnail?.secure_url,
  });

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];
    console.log(uploadedImage);

    // if image exists then getting the url link of it
    if (uploadedImage) {
      // setUserInput({ ...userInput, thumbnail: uploadedImage });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let res = undefined;

    // for creating a new course
    if (initialCourseData.newCourse) {
      //   checking for the empty fields
      console.log(userInput);
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description ||
        !userInput.thumbnail
      ) {
        toast.error("All fields are mandatory");
        return;
      }

      // calling the api
      res = await dispatch(createNewCourse(userInput));
    }
    // for updating an existing course
    else {
      //   checking for the empty fields
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description
      ) {
        toast.error("All fields are mandatory");
        return;
      }

      const data = { ...userInput, id: initialCourseData._id };
      // calling the api
      res = await dispatch(updateCourse(data));
    }

    // clearing the input fields
    if (res?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: undefined,
        previewImage: "",
      });

      setIsDisabled(false);

      // redirecting the user to admin dashboard
      navigate("/admin/dashboard");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/80 to-purple-800/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
              <HiAcademicCap className="text-lg" />
              {!initialCourseData.newCourse ? "Update Course" : "Create Course"}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {!initialCourseData.newCourse ? "Update Your" : "Create New"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Course</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {!initialCourseData.newCourse 
                ? "Update your course details and make it even better for your students."
                : "Share your knowledge with the world. Create engaging content that transforms lives."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Course Creation Form */}
      <div className="min-h-[70vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
            >
              <HiArrowLeft className="text-lg" />
              Back to Dashboard
            </Link>
          </div>

          {/* Main Form Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  {!initialCourseData.newCourse ? <HiCheckCircle className="text-2xl text-white" /> : <HiPlus className="text-2xl text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {!initialCourseData.newCourse ? "Update Course Details" : "Course Creation"}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {!initialCourseData.newCourse ? "Modify existing course information" : "Fill in the details to create your new course"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleFormSubmit} className="p-8">
              
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Left Column - Course Media */}
                <div className="space-y-6">
                  
                  {/* Thumbnail Upload */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <HiPhoto className="text-blue-400" />
                      Course Thumbnail
                    </h3>
                    
                    <div
                      onClick={() =>
                        !initialCourseData.newCourse
                          ? toast.error("Cannot update thumbnail image")
                          : ""
                      }
                      className="relative"
                    >
                      <label className="cursor-pointer block" htmlFor="image_uploads">
                        {userInput.previewImage ? (
                          <div className="relative group">
                            <img
                              className="w-full h-64 object-cover rounded-xl border-2 border-slate-600/50"
                              src={userInput.previewImage}
                              alt="Course thumbnail preview"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-center text-white">
                                <HiPhoto className="mx-auto text-3xl mb-2" />
                                <p className="text-sm font-medium">
                                  {!initialCourseData.newCourse ? "Cannot update image" : "Click to change image"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-64 border-2 border-dashed border-slate-600/50 rounded-xl flex items-center justify-center bg-slate-700/30 hover:bg-slate-600/30 transition-colors duration-300 group">
                            <div className="text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              <HiPhoto className="mx-auto text-4xl mb-3" />
                              <h4 className="font-semibold text-lg mb-2">Upload Course Thumbnail</h4>
                              <p className="text-sm">Click to browse or drag and drop</p>
                              <p className="text-xs mt-1">JPG, PNG up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </label>
                      
                      <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png"
                        disabled={isDisabled}
                      />
                    </div>
                    
                    <p className="text-gray-400 text-xs mt-2">
                      Choose an engaging thumbnail that represents your course content
                    </p>
                  </div>

                  {/* Course Title */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
                      Course Title *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter an engaging course title"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        value={userInput.title}
                        onChange={handleUserInput}
                      />
                      <HiAcademicCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Make it clear and compelling to attract students
                    </p>
                  </div>

                </div>

                {/* Right Column - Course Details */}
                <div className="space-y-6">
                  
                  {/* Instructor Name */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="createdBy">
                      Instructor Name *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="createdBy"
                        id="createdBy"
                        placeholder="Enter the instructor name"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        value={userInput.createdBy}
                        onChange={handleUserInput}
                      />
                      <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      The name that will appear as the course creator
                    </p>
                  </div>

                  {/* Course Category */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="category">
                      Course Category *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="category"
                        id="category"
                        placeholder="e.g., Web Development, Data Science"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        value={userInput.category}
                        onChange={handleUserInput}
                      />
                      <HiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Help students find your course by selecting the right category
                    </p>
                  </div>

                  {/* Course Description */}
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="description">
                      Course Description *
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        name="description"
                        id="description"
                        rows="6"
                        placeholder="Describe what students will learn, course objectives, and key takeaways..."
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                        value={userInput.description}
                        onChange={handleUserInput}
                      />
                      <HiDocumentText className="absolute left-4 top-4 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      Provide a detailed description to help students understand what they'll gain
                    </p>
                  </div>

                </div>

              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {!initialCourseData.newCourse ? (
                    <>
                      <HiCheckCircle className="text-lg" />
                      Update Course
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-lg" />
                      Create Course
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <HiSparkles className="text-yellow-400" />
              Tips for Creating Great Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Clear Learning Objectives</h4>
                  <p className="text-gray-400 text-xs">Define what students will achieve</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Engaging Content</h4>
                  <p className="text-gray-400 text-xs">Mix theory with practical examples</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiCheckCircle className="text-green-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Professional Presentation</h4>
                  <p className="text-gray-400 text-xs">Use high-quality images and descriptions</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateCourse;
