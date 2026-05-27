import { PlayIcon } from "../../components/icons/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { setAccessToken } from "../../utils/accessTokenManager";
import { logout } from "../../api/authApi.js";
import { useState } from "react";
import { Spinner } from "../../components/ui/Spinner";

export default function Navbar() {
    const navigate = useNavigate();
    const { authStatus, setAuthStatus, setCurrentUser } = useAuth();
    const [loading, setLoading] = useState(false)

    const logoutUser = async () => {
        try {
            setLoading(true)
            const res = await logout();
            if (res && res.success) {
                setAuthStatus('unauthenticated');
                setAccessToken(null);
                setCurrentUser(null);
                navigate('/login');
            }
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <nav className="yt-navbar">
            {loading && <Spinner />}

            {/* ── Left section ─────────────── */}
            <div className="yt-navbar-left">
                <button className="yt-menu-btn" aria-label="Menu">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </button>

                <a href="/" className="yt-logo">
                    <PlayIcon
                        height={40}
                        width={30}
                    />
                    <span className="yt-logo-text">MODera</span>
                </a>
            </div>

            {/* ── Center section (Search) ───── */}
            <div className="yt-navbar-center">
                <div className="yt-search-wrapper">
                    <form className="yt-search-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className="yt-search-input"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button type="submit" className="yt-search-btn" aria-label="Search">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                        </button>
                    </form>

                    <button className="yt-voice-btn" aria-label="Search with your voice">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Right section (Actions) ───── */}
            <div className="yt-navbar-right">
                <button className="yt-icon-btn" aria-label="Create">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                    </svg>
                </button>

                <button className="yt-icon-btn" aria-label="Notifications">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                    </svg>
                    <span className="yt-icon-btn-badge"></span>
                </button>

                <div className="yt-user-avatar" title="Your account" onClick={() => logoutUser()}>
                    M
                </div>
            </div>

        </nav>
    );
}