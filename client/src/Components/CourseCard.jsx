import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="group cursor-pointer">
      <div
        onClick={() => navigate("/course/description", { state: { ...data } })}
        className="bg-gradient-to-br from-slate-800/90 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 flex flex-col h-full"
      >
        {/* Image section with overlay */}
        <div className="relative overflow-hidden">
          <img
            className="h-48 sm:h-52 w-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={data?.thumbnail?.secure_url}
            alt="course thumbnail"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Course category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {data?.category}
            </span>
          </div>
          
          {/* Lectures count badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-slate-600/50">
              {data?.numberOfLectures} Lectures
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
            {data?.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base line-clamp-3 mb-4 flex-grow leading-relaxed">
            {data?.description}
          </p>
          
          {/* Instructor info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              {data?.createdBy?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium text-sm">Instructor</p>
              <p className="text-yellow-400 text-xs font-semibold">{data?.createdBy}</p>
            </div>
          </div>
          
          {/* Course stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-slate-700/20 rounded-lg border border-slate-600/20">
              <p className="text-yellow-400 text-xs font-semibold">Lectures</p>
              <p className="text-white font-bold">{data?.numberOfLectures}</p>
            </div>
            <div className="text-center p-2 bg-slate-700/20 rounded-lg border border-slate-600/20">
              <p className="text-yellow-400 text-xs font-semibold">Level</p>
              <p className="text-white font-bold">{data?.category === 'Programming' ? 'Intermediate' : data?.category === 'Design' ? 'Beginner' : 'All Levels'}</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-3 mt-auto">
            {/* Action button */}
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View Course
            </button>
            
            {/* Features */}
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                Expert Content
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                Quality Education
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
