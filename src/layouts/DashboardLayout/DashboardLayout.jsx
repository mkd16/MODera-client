import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="yt-layout">
            <Navbar />
            <Sidebar />
            
            <main className="yt-main">
                <div className="yt-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}