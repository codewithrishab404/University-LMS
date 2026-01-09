// src/components/PublicRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const PublicRoute = ({ children }) => {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/instructor/me", { withCredentials: true });
        setRedirectPath("/instructor/dashboard");
      } catch {
        try {
          await api.get("/student/me", { withCredentials: true });
          setRedirectPath("/student/dashboard");
        } catch {
          setRedirectPath(false);
        }
      }
    };
    checkAuth();
  }, []);

  if (redirectPath === null) {
    return <div className="p-10">Checking session...</div>;
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
