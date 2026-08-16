import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PartnerRegister from "../pages/partners/PartnerRegister";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import CreateOrder from "../pages/orders/CreateOrder";
import Services from "../pages/services/Services";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/partners/register" element={<PartnerRegister />} />

            {/* Admin routes (Dashboard as default localhost root /) */}
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/create" element={<CreateOrder />} />
                <Route path="/services" element={<Services />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;