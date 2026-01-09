import InstructorSidebar from "../../components/InstructorSidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div className="pt-16">
      <InstructorSidebar />

      {/* Main Content */}
      <main
        className="
          ml-64 p-8 min-h-[calc(100vh-4rem)]
          bg-white text-gray-900
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
