import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axios";

/* =====================
   Animations
===================== */
const navItemVariants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
};

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      relative px-1 py-1 text-sm font-medium
      transition-all duration-300
      ${isActive ? "text-white" : "text-gray-300 hover:text-white"}

      after:absolute after:left-0 after:-bottom-1
      after:h-0.5 after:w-0
      after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500
      after:transition-all after:duration-300
      hover:after:w-full
      ${isActive ? "after:w-full" : ""}
      `
    }
  >
    {children}
  </NavLink>
);

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔐 Cookie-based auth check (INSTRUCTOR)
  useEffect(() => {
    api
      .get("/instructor/me", { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setAuthLoading(false));
  }, []);

  // 🚫 Prevent flicker
  if (authLoading) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* University Name */}
          <Link
            to="/"
            className="
              text-2xl font-bold text-white tracking-wide
              hover:text-indigo-400 transition
            "
          >
            Calcutta University
          </Link>

          {/* NAV LINKS */}
          <motion.div
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            initial="initial"
            animate="animate"
            className="flex items-center gap-6"
          >
            {/* 🔓 LOGGED OUT ONLY */}
            {!isAuthenticated && (
              <>
                <motion.div variants={navItemVariants}>
                  <NavItem to="/">Home</NavItem>
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <NavItem to="/student/login">Student Login</NavItem>
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <NavItem to="/instructor/login">Instructor Login</NavItem>
                </motion.div>
              </>
            )}

            {/* 🔐 LOGGED IN → NAVBAR SHOWS NOTHING EXTRA */}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
