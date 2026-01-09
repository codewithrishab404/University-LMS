import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import Orb from "../home/Orb";

const InstructorLogin = () => {
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
      // 🔐 Login (backend sets cookie)
      await api.post(
        "/instructor/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ Redirect ONLY on success
      navigate("/instructor/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Orb */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[900px] h-[900px] max-w-[90vw] max-h-[90vw]">
          <Orb hoverIntensity={0.6} rotateOnHover hue={0} />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center">
            Instructor Login
          </h2>

          {error && (
            <div className="mt-4 text-red-400 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            <Link to="/instructor/register" className="text-indigo-400">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
