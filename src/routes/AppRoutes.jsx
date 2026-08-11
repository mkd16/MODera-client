import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, ProtectedLogin } from "./Auth";
import Login from "../pages/LoginRegister";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import { Profile } from "../pages/Profile";
import OTPVerification from "../pages/OTPverification";
import Channel from "../pages/Channel";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route element={<ProtectedLogin />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login />} />
                    <Route path="/verify" element={<OTPVerification />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/channel" element={<Channel />}></Route>
                    </Route>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}