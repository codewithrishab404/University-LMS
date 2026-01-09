import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { motion } from "framer-motion";

const InstructorAddCourse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    year: "",
    duration: "",
    syllabus: "",
    fees: "",
    dept_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post(
        "/instructor/create/courses",
        {
          title: form.title,
          year: Number(form.year),
          duration: Number(form.duration),
          syllabus: form.syllabus,
          fees: Number(form.fees),
          dept_id: Number(form.dept_id),
        },
        { withCredentials: true }
      );

      navigate("/instructor/courses");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Add New Course
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl bg-white rounded-2xl shadow-lg border p-8 space-y-6"
      >
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (months)
            </label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Syllabus
          </label>
          <textarea
            name="syllabus"
            rows={4}
            value={form.syllabus}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 resize-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees (₹)
            </label>
            <input
              name="fees"
              type="number"
              value={form.fees}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department ID
            </label>
            <input
              name="dept_id"
              type="number"
              value={form.dept_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Course"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default InstructorAddCourse;
