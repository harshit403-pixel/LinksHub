import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/ui/DashboardNavbar";


function DashboardLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
