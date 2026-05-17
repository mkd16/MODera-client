import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, ProtectedLogin } from "./Auth";
import Login from "../pages/LoginRegister";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route element={<ProtectedLogin/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login/>} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Dashboard/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}