const CoursesTable = ({ courses }) => (
  <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
    <h2 className="text-xl font-semibold mb-4">My Courses</h2>

    {courses.length === 0 ? (
      <p className="text-gray-400">No courses yet</p>
    ) : (
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="text-left py-2">Title</th>
            <th>Year</th>
            <th>Students</th>
            <th>Fees</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.course_id} className="border-b border-gray-800">
              <td className="py-2">{c.title}</td>
              <td className="text-center">{c.year}</td>
              <td className="text-center">{c.students_count}</td>
              <td className="text-center">₹{c.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
