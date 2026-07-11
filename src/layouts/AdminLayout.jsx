import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function AdminLayout({ children }) {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Navbar />

                <main style={{ padding: "20px" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;