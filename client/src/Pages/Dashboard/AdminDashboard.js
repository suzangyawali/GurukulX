import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { HiBookOpen, HiChartBar, HiEye, HiPlus } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal";
import Layout from "../../Layout/Layout";
import { deleteCourse, getAllCourses } from "../../Redux/courseSlice";
import { getDashboardMetrics, getPaymentRecord } from "../../Redux/razorpaySlice";
import { getStatsData } from "../../Redux/statSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal state for course deletion
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    courseId: null,
    courseTitle: "",
    isLoading: false
  });

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );
  const { allPayments, finalMonths, monthlySalesRecord, dashboardMetrics } = useSelector(
    (state) => state.razorpay
  );

  // Generate sales data from actual payments
  const generateSalesData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Create array of last 12 months
    const months = [];
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      months.push(monthKey);
    }
    
    // Calculate revenue from actual payments
    let totalRevenue = 0;
    const salesData = [];
    
    if (allPayments && allPayments.items && allPayments.items.length > 0) {
      // Process actual payments (both test and live from Razorpay)
      const paymentsByMonth = {};
      
      allPayments.items.forEach(payment => {
        const paymentDate = new Date(payment.createdAt);
        const monthKey = `${monthNames[paymentDate.getMonth()]} ${paymentDate.getFullYear()}`;
        
        // Each subscription is 499 INR
        paymentsByMonth[monthKey] = (paymentsByMonth[monthKey] || 0) + 499;
        totalRevenue += 499;
      });
      
      months.forEach(month => {
        salesData.push(paymentsByMonth[month] || 0);
      });
    } else if (allPayments && allPayments.count > 0) {
      // We have payments but no items array, calculate based on count
      totalRevenue = allPayments.count * 499;
      // Show revenue in current month
      months.forEach((_, index) => {
        salesData.push(index === months.length - 1 ? totalRevenue : 0);
      });
    } else {
      // No payments yet, show empty chart
      months.forEach(() => {
        salesData.push(0);
      });
      totalRevenue = 0;
    }
    
    return {
      labels: months,
      data: salesData,
      totalRevenue
    };
  };

  const salesInfo = generateSalesData();  const userData = {
    labels: ["Total Signups", "Current Subscribers"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount || 0, dashboardMetrics?.activeSubscribers || subscribedUsersCount || 0],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: finalMonths && Object.keys(finalMonths).length > 0 
      ? Object.keys(finalMonths)
      : salesInfo.labels,
    datasets: [
      {
        label: "Revenue (INR)",
        data: monthlySalesRecord && monthlySalesRecord.length > 0 
          ? monthlySalesRecord 
          : salesInfo.data,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `Revenue: ₹${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white',
            callback: function(value) {
              return '₹' + value.toLocaleString();
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  };

  // getting the courses data from redux toolkit store
  const myCourses = useSelector((state) => state.course.coursesData);

  // function to open delete confirmation modal
  const openDeleteModal = (courseId, courseTitle) => {
    setDeleteModal({
      isOpen: true,
      courseId,
      courseTitle,
      isLoading: false
    });
  };

  // function to close delete modal
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      courseId: null,
      courseTitle: "",
      isLoading: false
    });
  };

  // function to handle the course delete
  const handleCourseDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isLoading: true }));
    
    try {
      const res = await dispatch(deleteCourse(deleteModal.courseId));

      // fetching the new updated data for the course
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setDeleteModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    (async () => {
      console.log("🔍 Fetching dashboard data...");
      
      const coursesResult = await dispatch(getAllCourses());
      const statsResult = await dispatch(getStatsData());
      const paymentsResult = await dispatch(getPaymentRecord());
      const metricsResult = await dispatch(getDashboardMetrics());
      
      console.log("📊 Dashboard Data Results:", {
        courses: coursesResult,
        stats: statsResult,
        payments: paymentsResult,
        metrics: metricsResult
      });
    })();
  }, [dispatch]);

  // Debug current data state
  console.log("📈 Current Redux State:", {
    finalMonths,
    monthlySalesRecord,
    allPayments,
    dashboardMetrics
  });

  return (
    <Layout>
      <div className="min-h-[90vh] pt-8 flex flex-col gap-8 text-white px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Administrator Panel
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Monitor your platform performance and manage courses efficiently
          </p>
        </div>

        {/* Enhanced analytics cards and charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
          {/* User analytics section */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
            <div className="space-y-6">
              <div className="text-center space-y-2 ">
                <h2 className="text-xl font-bold text-yellow-400">User Analytics</h2>
                <p className="text-gray-400 text-sm">Platform user growth and engagement</p>
              </div>
              
              {/* Pie chart */}
              <div className="w-64 h-64 mx-auto">
                <Pie data={userData} />
              </div>

              {/* User stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Signups</p>
                      <h3 className="text-2xl font-bold text-white">{allUsersCount || 0}</h3>
                      <p className="text-xs text-gray-500 mt-1">Registered Users</p>
                    </div>
                    <FaUsers className="text-yellow-500 text-3xl" />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Active Subscribers</p>
                      <h3 className="text-2xl font-bold text-white">{dashboardMetrics?.activeSubscribers || subscribedUsersCount || 0}</h3>
                      <p className="text-xs text-gray-500 mt-1">Premium Members</p>
                    </div>
                    <FaUsers className="text-green-500 text-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales analytics section */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-yellow-400">Revenue Analytics</h2>
                <p className="text-gray-400 text-sm">Monthly sales performance and revenue</p>
                {(!monthlySalesRecord || monthlySalesRecord.length === 0) && (
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></span>
                    Showing actual payment data - {allPayments ? allPayments.count : 0} transactions
                  </div>
                )}
              </div>
              
              {/* Bar chart */}
              <div className="h-64 relative w-full">
                <Bar 
                  className="absolute bottom-0 h-64 w-full" 
                  data={salesData} 
                  options={salesData.options}
                />
              </div>

              {/* Revenue stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Payments</p>
                      <h3 className="text-2xl font-bold text-white">
                        {allPayments ? allPayments.count : 0}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">Razorpay Transactions</p>
                    </div>
                    <FcSalesPerformance className="text-3xl" />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-white">
                        ₹{(allPayments ? allPayments.count * 499 : 0).toLocaleString()}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">From Subscriptions</p>
                    </div>
                    <GiMoneyStack className="text-green-500 text-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRUD courses section */}
        <div className="mx-[5%] w-[90%] self-center flex flex-col gap-8 mb-10">
          {/* Header section with improved styling */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Courses Overview
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">
                  Manage your courses, lectures, and content efficiently
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    {myCourses?.length || 0} Total Courses
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    Active Management
                  </span>
                </div>
              </div>

              {/* Enhanced action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    navigate("/course/create", {
                      state: {
                        initialCourseData: {
                          newCourse: true,
                          title: "",
                          category: "",
                          createdBy: "",
                          description: "",
                          thumbnail: undefined,
                          previewImage: "",
                        },
                      },
                    });
                  }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <HiPlus className="text-lg" />
                  Create New Course
                </button>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 flex items-center gap-2"
                >
                  <HiEye className="text-lg" />
                  View Public Courses
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced courses table */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Table header with filters/search could be added here */}
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-400">Course Management</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <HiChartBar className="text-lg" />
                  <span>Quick Actions Available</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/60">
                  <tr>
                    <th className="text-yellow-400 px-4 py-4 text-left font-semibold border-b border-slate-700/50 w-16">#</th>
                    <th className="text-yellow-400 px-4 py-4 text-left font-semibold border-b border-slate-700/50 min-w-[200px]">Course Details</th>
                    <th className="text-yellow-400 px-4 py-4 text-left font-semibold border-b border-slate-700/50 w-32">Category</th>
                    <th className="text-yellow-400 px-4 py-4 text-left font-semibold border-b border-slate-700/50 w-32">Instructor</th>
                    <th className="text-yellow-400 px-4 py-4 text-center font-semibold border-b border-slate-700/50 w-24">Lectures</th>
                    <th className="text-yellow-400 px-4 py-4 text-center font-semibold border-b border-slate-700/50 w-40">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700/50">
                  {myCourses && myCourses.length > 0 ? (
                    myCourses.map((element, index) => (
                      <tr key={element?._id} className="hover:bg-slate-700/20 transition-colors duration-200">
                        <td className="px-4 py-4 text-gray-300 font-medium">
                          {index + 1}
                        </td>
                        
                        {/* Course details cell with thumbnail and info */}
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700/50">
                              {element?.thumbnail?.secure_url ? (
                                <img
                                  src={element.thumbnail.secure_url}
                                  alt={element.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  <HiBookOpen />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-1">
                                {element?.title}
                              </h4>
                              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                                {element?.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            {element?.category}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                              {element?.createdBy?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="text-gray-300 text-sm font-medium truncate">
                              {element?.createdBy}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-lg">
                            <span className="text-white font-bold text-sm">{element?.numberOfLectures}</span>
                            <span className="text-gray-400 text-xs">lectures</span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit course button */}
                            <button
                              onClick={() =>
                                navigate("/course/create", {
                                  state: {
                                    initialCourseData: {
                                      newCourse: false,
                                      ...element,
                                    },
                                  },
                                })
                              }
                              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 p-2 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="Edit Course"
                            >
                              <MdOutlineModeEdit className="text-white text-sm" />
                            </button>

                            {/* Manage lectures button */}
                            <button
                              onClick={() =>
                                navigate("/course/displaylectures", {
                                  state: { ...element },
                                })
                              }
                              className="bg-green-600 hover:bg-green-700 transition-all duration-200 p-2 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="Manage Lectures"
                            >
                              <BsCollectionPlayFill className="text-white text-sm" />
                            </button>

                            {/* Delete course button */}
                            <button
                              onClick={() => openDeleteModal(element._id, element.title)}
                              className="bg-red-600 hover:bg-red-700 transition-all duration-200 p-2 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="Delete Course"
                            >
                              <BsTrash className="text-white text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-12 text-center">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                            <HiBookOpen className="text-2xl text-yellow-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">No Courses Yet</h3>
                          <p className="text-gray-400 text-sm">Create your first course to get started</p>
                          <button
                            onClick={() => {
                              navigate("/course/create", {
                                state: {
                                  initialCourseData: {
                                    newCourse: true,
                                    title: "",
                                    category: "",
                                    createdBy: "",
                                    description: "",
                                    thumbnail: undefined,
                                    previewImage: "",
                                  },
                                },
                              });
                            }}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            Create First Course
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Course Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleCourseDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${deleteModal.courseTitle}"? This action cannot be undone and will permanently remove all course content, lectures, and student progress.`}
        type="danger"
        confirmText="Delete Course"
        cancelText="Cancel"
        isLoading={deleteModal.isLoading}
      />
    </Layout>
  );
};

export default AdminDashboard;
