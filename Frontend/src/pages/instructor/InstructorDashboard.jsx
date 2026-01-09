import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const InstructorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/instructor/me", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        // 🔥 Not logged in → redirect
        navigate("/instructor/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!profile) return null;

  return (
    <div className="p-10 text-black">
      <h1 className="text-3xl font-bold">Welcome, {profile.name}</h1>

      <p className="mt-2 text-black-400">Email: {profile.email}</p>

      <p className="mt-1 text-black-400">Salary: ₹{profile.salary}</p>
    </div>
  );
};

export default InstructorDashboard;
