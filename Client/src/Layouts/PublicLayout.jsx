import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
}

export default PublicLayout;