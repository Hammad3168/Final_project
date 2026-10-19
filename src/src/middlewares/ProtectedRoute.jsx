import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  if (token && !user) {
    return (
      <div className="text-center py-5" style={{ marginTop: "100px" }}>
        Verifying Security Rights...
      </div>
    );
  }

  useEffect(() => {
    if (!token || !user) {
      toast.error("Please login to access this page!");
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      toast.error("You are not authorized to view this page!");
    }
  }, [token, user, allowedRoles]);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
