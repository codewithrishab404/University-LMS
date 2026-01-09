import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import Orb from "../home/Orb";

const InstructorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Register instructor
      await api.post("/instructor/register", {
        name,
        email,
        password,
        dob,
        salary: Number(salary),
      });

      // 2️⃣ Login (sets cookie)
      await api.post("/instructor/login", {
        email,
        password,
      });

      // 3️⃣ Redirect (cookie already set)
      navigate("/instructor/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Orb */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[900px] h-[900px] max-w-[90vw] max-h-[90vw]">
          <Orb hoverIntensity={0.6} rotateOnHover hue={0} />
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white text-center">
              Instructor Registration
            </h2>
            <p className="text-gray-400 text-center mt-2">
              Create your instructor account
            </p>

            {error && (
              <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
            )}

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              <input
                type="text"
                required
                placeholder="Dr. John Smith"
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                required
                placeholder="instructor@example.com"
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
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

              <input
                type="date"
                required
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />

              <input
                type="number"
                required
                min="0"
                placeholder="50000"
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 shadow-lg disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/instructor/login" className="text-indigo-400">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorRegister;
