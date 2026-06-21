import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/ui/DashboardNavbar";


function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;