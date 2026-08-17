import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Spinner } from "../../components/ui/Spinner";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="yt-layout">
            {/* <Spinner></Spinner> */}
            <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div
                className={`yt-sidebar-overlay ${sidebarOpen ? "yt-sidebar-overlay--visible" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            <main className="yt-main">
                <div className="yt-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
