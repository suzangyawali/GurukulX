import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, data } = useSelector((state) => state.auth);

  // Check if this is a subscription-related denial
  const isSubscriptionDenial = location.pathname?.includes("displaylectures") || 
                               location.state?.from?.pathname?.includes("displaylectures");
  
  const needsSubscription = isLoggedIn && data?.subscription?.status !== "active";

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        403
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        {isSubscriptionDenial && needsSubscription ? "Subscription Required" : "Access Denied"}
      </div>
      
      {isSubscriptionDenial && needsSubscription && (
        <div className="mt-8 text-center text-white max-w-md">
          <p className="text-lg mb-4">
            You need an active subscription to access course lectures.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition-all duration-300 mr-4"
          >
            Browse Courses
          </button>
        </div>
      )}

      <button className="mt-5">
        <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current cursor-pointer"
          >
            Go Back
          </span>
        </span>
      </button>
    </main>
  );
};

export default Denied;
