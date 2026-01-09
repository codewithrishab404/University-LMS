import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import Orb from "../home/Orb";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔐 Backend validates & sets HttpOnly cookie
      await api.post(
        "/student/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ redirect ONLY on success
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* ORB BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[900px] h-[900px] max-w-[90vw] max-h-[90vw]">
          <Orb hoverIntensity={0.6} rotateOnHover hue={0} />
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-lg"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white text-center">
              Student Login
            </h2>
            <p className="text-gray-400 text-center mt-2">
              Login to access your dashboard
            </p>

            {error && (
              <div className="mt-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <input
                type="email"
                placeholder="student@example.com"
                required
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-white font-semibold disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link to="/student/register" className="text-indigo-400">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
