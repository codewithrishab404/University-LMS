import Sidebar from "../../components/Sidebar";

const Courses = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="instructor" />
      <div style={{ padding: 20 }}>
        <h2>Courses Taught</h2>
        <ul>
          <li>Computer Networks</li>
          <li>Database Systems</li>
        </ul>
      </div>
    </div>
  );
};

export default Courses;
