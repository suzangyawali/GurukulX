import { useEffect } from "react";
import {
  HiBookOpen,
  HiChartBar,
  HiHome,
  HiInformationCircle,
  HiKey,
  HiLogout,
  HiPhone,
  HiSparkles,
  HiUser
} from "react-icons/hi";
import { HiBars3, HiXCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { clearAuthState, logout } from "../Redux/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking user logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for dispaying the options, according to user role
  const role = useSelector((state) => state?.auth?.role);

  // Validate auth state consistency on component mount and state changes
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedData = localStorage.getItem("data");
    const storedRole = localStorage.getItem("role");

    // If Redux state and localStorage are inconsistent, clear everything
    if (isLoggedIn !== storedIsLoggedIn || 
        (isLoggedIn && (!storedData || storedData === "undefined")) ||
        (isLoggedIn && !storedRole)) {
      dispatch(clearAuthState());
    }
  }, [isLoggedIn, dispatch]);

  // function to hide the drawer on close button click
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    // collapsing the drawer-side width to zero
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  // function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();

    // calling logout action
    const res = await dispatch(logout());

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
      {/* Enhanced navigation drawer */}
      <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            {/* Enhanced hamburger menu button */}
            <div 
              onClick={changeWidth}
              className="group m-4 p-2 bg-gradient-to-br from-slate-800/80 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <HiBars3
                size={"24px"}
                className="text-white group-hover:text-yellow-400 transition-colors duration-300"
              />
            </div>
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          
          {/* Enhanced sidebar menu */}
          <div className="menu p-0 w-72 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-lg text-white relative shadow-2xl border-r border-slate-700/50">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={hideDrawer}
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-200 group"
              >
                <HiXCircle 
                  size={20} 
                  className="text-gray-400 group-hover:text-white transition-colors duration-200" 
                />
              </button>
            </div>

            {/* Enhanced GurukulX Logo Section */}
            <div className="px-2 pb-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative group">
                    <img 
                      src="/favicon/Navigation.jpeg" 
                      alt="GurukulX Logo" 
                      className="w-16 h-16 rounded-xl shadow-lg object-cover transform transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/25 to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                      GurukulX
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">Learning Management System</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="px-4 space-y-2 flex-1">
              {/* Home */}
              <Link to={"/"} onClick={hideDrawer}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group">
                  <HiHome className="text-lg text-blue-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  <span className="font-medium group-hover:text-yellow-400 transition-colors duration-200">Home</span>
                </div>
              </Link>

              {/* Admin Dashboard - if user is admin */}
              {isLoggedIn && role === "ADMIN" && (
                <Link to={"/admin/dashboard"} onClick={hideDrawer}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group">
                    <HiChartBar className="text-lg text-purple-400 group-hover:text-yellow-400 transition-colors duration-200" />
                    <span className="font-medium group-hover:text-yellow-400 transition-colors duration-200">Admin Dashboard</span>
                  </div>
                </Link>
              )}

              {/* All Courses */}
              <Link to={"/courses"} onClick={hideDrawer}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group">
                  <HiBookOpen className="text-lg text-green-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  <span className="font-medium group-hover:text-yellow-400 transition-colors duration-200">All Courses</span>
                </div>
              </Link>

              {/* Contact Us */}
              <Link to={"/contact"} onClick={hideDrawer}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group">
                  <HiPhone className="text-lg text-teal-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  <span className="font-medium group-hover:text-yellow-400 transition-colors duration-200">Contact Us</span>
                </div>
              </Link>

              {/* About Us */}
              <Link to={"/about"} onClick={hideDrawer}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group">
                  <HiInformationCircle className="text-lg text-cyan-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  <span className="font-medium group-hover:text-yellow-400 transition-colors duration-200">About Us</span>
                </div>
              </Link>
            </div>

            {/* Enhanced Bottom Section */}
            <div className="p-4 border-t border-slate-700/50 border">
              {/* If user is not logged in */}
              {!isLoggedIn && (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <Link to={"/login"} onClick={hideDrawer} >
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <HiKey className="text-lg" />
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"} onClick={hideDrawer}>
                    <button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 flex items-center justify-center gap-2">
                      <HiSparkles className="text-lg" />
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}

              {/* If user is logged in */}
              {isLoggedIn && (
                <div className="space-y-3">
                  <Link to={"/user/profile"} onClick={hideDrawer}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <HiUser className="text-lg" />
                      Profile
                    </button>
                  </Link>
                  <button 
                    onClick={(e) => {
                      handleLogout(e);
                      hideDrawer();
                    }}
                    className="w-full bg-slate-700/50 hover:bg-red-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-red-500/50 flex items-center justify-center gap-2"
                  >
                    <HiLogout className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {children}

      {/* adding the footer content */}
      <Footer />
    </div>
  );
};

export default Layout;
