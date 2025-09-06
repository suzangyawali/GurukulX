import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireSubscription = () => {
  const { isLoggedIn, role, data } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin users have access to everything
  if (role === "ADMIN") {
    return <Outlet />;
  }

  // Check if user has active subscription
  const hasActiveSubscription = data?.subscription?.status === "active";

  if (!hasActiveSubscription) {
    return <Navigate to="/denied" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireSubscription;
