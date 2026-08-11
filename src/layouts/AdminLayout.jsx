import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import "../styles/components/AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-layout__content">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default AdminLayout;