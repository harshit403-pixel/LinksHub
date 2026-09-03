import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/ui/DashboardNavbar";

function DashboardLayout() {
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        theme-bg
        theme-text
        transition-colors
        duration-250
      "
    >
      <DashboardNavbar />

      <main
        className="
          mx-auto
          mt-17
          max-w-7xl
          px-4
          py-5
          sm:px-6
          sm:py-6
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;