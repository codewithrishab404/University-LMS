const DashboardCards = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <p className="text-gray-400 text-sm">Total Courses</p>
      <p className="text-3xl font-bold">{summary.total_courses}</p>
    </div>

    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <p className="text-gray-400 text-sm">Total Students</p>
      <p className="text-3xl font-bold">{summary.total_students}</p>
    </div>
  </div>
);
export default DashboardCards;
