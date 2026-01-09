import Sidebar from "../../components/Sidebar";

const Students = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="instructor" />
      <div style={{ padding: 20 }}>
        <h2>Enrolled Students</h2>
        <ul>
          <li>Rahul</li>
          <li>Ankita</li>
        </ul>
      </div>
    </div>
  );
};

export default Students;
