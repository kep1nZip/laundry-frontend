import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import FloatingAddButton from "../components/ui/FloatingAddButton";
import "../styles/components/AdminLayout.css";

// Exact routes where the FAB should be displayed
const FAB_ALLOWED_PATHS = ["/", "/dashboard", "/orders", "/services", "/profile"];

function AdminLayout({ children }) {
  const location = useLocation();
  const showFab = FAB_ALLOWED_PATHS.includes(location.pathname);

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-layout__content">
        {children || <Outlet />}
      </main>
      {showFab && <FloatingAddButton />}
    </div>
  );
}

export default AdminLayout;