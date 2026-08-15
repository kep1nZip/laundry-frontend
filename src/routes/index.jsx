import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PartnerRegister from "../pages/partners/PartnerRegister";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Services from "../pages/services/Services";

function AppRoutes() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/partners/register" element={<PartnerRegister />} />

            {/* Admin routes */}
            <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/services" element={<Services />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;