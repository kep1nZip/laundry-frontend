import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import PartnerRegister from "../pages/partners/PartnerRegister";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Services from "../pages/services/Services";

function AppRoutes() {
    return (
        <Routes>
            {/* Standalone routes (tanpa layout Admin) */}
            <Route path="/login" element={<Login />} />
            <Route path="/partners/register" element={<PartnerRegister />} />

            {/* Admin routes (menggunakan AdminLayout) */}
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/services" element={<Services />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;