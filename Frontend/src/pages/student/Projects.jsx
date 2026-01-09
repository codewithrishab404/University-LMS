import Sidebar from "../../components/Sidebar";

const Projects = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="student" />
      <div style={{ padding: 20 }}>
        <h2>Final Projects</h2>
        <ul>
          <li>DBMS Mini Project</li>
          <li>OS Case Study</li>
        </ul>
      </div>
    </div>
  );
};

export default Projects;
