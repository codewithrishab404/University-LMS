import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    api
      .get("/instructor/my-courses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    await api.delete(`/instructor/courses/${id}`, {
      withCredentials: true,
    });

    setCourses((prev) => prev.filter((c) => c.course_id !== id));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setUpdateError("");

    try {
      await api.put(
        `/instructor/courses/${editing.course_id}`,
        {
          title: editing.title,
          year: Number(editing.year),
          duration: Number(editing.duration),
          syllabus: editing.syllabus,
          fees: Number(editing.fees),
          dept_id: Number(editing.dept_id),
        },
        { withCredentials: true }
      );

      setCourses((prev) =>
        prev.map((c) => (c.course_id === editing.course_id ? editing : c))
      );

      setEditing(null);
    } catch (err) {
      setUpdateError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <motion.div
            key={c.course_id}
            whileHover={{ y: -4 }}
            className="border rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-600">Year: {c.year}</p>
            <p className="text-gray-600">Fees: ₹{c.fees}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(c)}
                className="flex-1 border border-indigo-500 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(c.course_id)}
                className="flex-1 border border-red-500 text-red-600 py-2 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= UPDATE MODAL ================= */}
      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Update Course</h2>

              {updateError && (
                <p className="text-sm text-red-600 mb-3">{updateError}</p>
              )}

              {/* TITLE */}
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full border px-3 py-2 rounded mb-3"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
              />

              {/* YEAR */}
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded mb-3"
                value={editing.year}
                onChange={(e) =>
                  setEditing({ ...editing, year: e.target.value })
                }
              />

              {/* DURATION */}
              <label className="block text-sm font-medium mb-1">
                Duration (months)
              </label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded mb-3"
                value={editing.duration}
                onChange={(e) =>
                  setEditing({ ...editing, duration: e.target.value })
                }
              />

              {/* FEES */}
              <label className="block text-sm font-medium mb-1">Fees</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded mb-3"
                value={editing.fees}
                onChange={(e) =>
                  setEditing({ ...editing, fees: e.target.value })
                }
              />

              {/* DEPT */}
              <label className="block text-sm font-medium mb-1">
                Department ID
              </label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded mb-3"
                value={editing.dept_id}
                onChange={(e) =>
                  setEditing({ ...editing, dept_id: e.target.value })
                }
              />

              {/* SYLLABUS */}
              <label className="block text-sm font-medium mb-1">Syllabus</label>
              <textarea
                className="w-full border px-3 py-2 rounded mb-4"
                value={editing.syllabus}
                onChange={(e) =>
                  setEditing({ ...editing, syllabus: e.target.value })
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructorCourses;
