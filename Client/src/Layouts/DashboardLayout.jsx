import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;