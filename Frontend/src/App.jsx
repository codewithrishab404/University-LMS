import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/home/Home";
import StudentLogin from "./pages/auth/StudentLogin";
import StudentRegister from "./pages/auth/StudentRegister";
import InstructorLogin from "./pages/auth/InstructorLogin";
import InstructorRegister from "./pages/auth/InstructorRegister";
import StudentDashboard from "./pages/student/StudentDashboard";

// Instructor Layout + Pages
import InstructorLayout from "./pages/instructor/InstructorLayout";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorAddCourse from "./pages/instructor/InstructorAddCourse";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/student/login"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/student/register"
          element={
            <PublicRoute>
              <StudentRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/instructor/login"
          element={
            <PublicRoute>
              <InstructorLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/instructor/register"
          element={
            <PublicRoute>
              <InstructorRegister />
            </PublicRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Instructor (LAYOUT ROUTE) */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute role="instructor">
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="add-course" element={<InstructorAddCourse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
