import Sidebar from "../../components/Sidebar";

const Grades = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="student" />
      <div style={{ padding: 20 }}>
        <h2>Grades</h2>
        <ul>
          <li>DBMS - A</li>
          <li>OS - B+</li>
        </ul>
      </div>
    </div>
  );
};

export default Grades;
