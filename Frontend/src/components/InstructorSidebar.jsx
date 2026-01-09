import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const sidebarVariants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const itemHover = {
  x: 6,
  transition: { type: "spring", stiffness: 300 },
};

const InstructorSidebar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/instructor/logout");
    } finally {
      navigate("/instructor/login");
    }
  };

  const linkClass = ({ isActive }) =>
    `
    group relative flex items-center gap-4 px-6 py-3 rounded-xl
    transition-all duration-300
    ${isActive ? "text-white bg-white/5" : "text-gray-300 hover:text-white"}
  `;

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="
        fixed left-0 top-16
        w-72
        h-[calc(100vh-4rem)]
        bg-[#0b1c2d]               /* ROYAL NAVY BLUE */
        backdrop-blur-xl
        border-r border-white/10
        p-6
        z-40
        shadow-[0_0_50px_rgba(59,130,246,0.15)]
      "
    >
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Instructor
        </h2>
        <p className="text-xs text-blue-400 mt-1">Control Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {[
          { to: "/instructor/dashboard", label: "Dashboard", icon: "📊" },
          { to: "/instructor/courses", label: "Courses", icon: "📚" },
          { to: "/instructor/add-course", label: "Add Course", icon: "➕" },
        ].map((item) => (
          <motion.div key={item.to} whileHover={itemHover}>
            <NavLink to={item.to} className={linkClass}>
              {/* HALF BORDER (LEFT SIDE ONLY) */}
              <span
                className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-1/2 w-1
                  bg-gradient-to-b from-blue-400 to-cyan-400
                  opacity-0
                  group-hover:opacity-100
                  transition-all duration-300
                "
              />

              {/* ACTIVE STATE BORDER */}
              <span
                className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-1/2 w-1
                  bg-gradient-to-b from-blue-400 to-cyan-400
                  opacity-0
                  group-[.active]:opacity-100
                "
              />

              <span className="text-lg">{item.icon}</span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Logout */}
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(239,68,68,0.6)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className="
          absolute bottom-6 left-6 right-6
          py-3 rounded-xl
          text-sm font-semibold text-white
          bg-gradient-to-r from-red-600 to-pink-600
          shadow-lg
        "
      >
        Logout
      </motion.button>
    </motion.aside>
  );
};

export default InstructorSidebar;
