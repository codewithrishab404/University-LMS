import Sidebar from "../../components/Sidebar";

const Syllabus = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="instructor" />
      <div style={{ padding: 20 }}>
        <h2>Syllabus</h2>
        <textarea rows="8" cols="40" placeholder="Enter syllabus here" />
        <br />
        <button>Save</button>
      </div>
    </div>
  );
};

export default Syllabus;
