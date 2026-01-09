import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const ProtectedRoute = ({ children, role }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (role === "student") {
          await api.get("/student/me", { withCredentials: true });
        } else if (role === "instructor") {
          await api.get("/instructor/me", { withCredentials: true });
        }
        setIsAllowed(true);
      } catch (err) {
        setIsAllowed(false);
      }
    };

    checkAuth();
  }, [role]);

  if (isAllowed === null) {
    return <div className="p-10">Checking authentication...</div>;
  }

  if (!isAllowed) {
    return <Navigate to={`/${role}/login`} replace />;
  }

  return children;
};

export default ProtectedRoute;
