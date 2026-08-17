import { PlayIcon, MenuIcon, SearchIcon, VoiceSearchIcon, VideoCameraIcon, NotificationIcon, CloseIcon } from "../../components/icons/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { setAccessToken } from "../../utils/accessTokenManager";
import { logout } from "../../api/authApi.js";
import { useState } from "react";
import { Spinner } from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import { useGlobalLoader } from "../../context/LoaderContext.jsx";

export default function Navbar({ onMenuClick }) {
    const navigate = useNavigate();
    const { authStatus, setAuthStatus, setCurrentUser } = useAuth();
    const [loading, setLoading] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const { globalLoader, setGlobalLoader } = useGlobalLoader();

    const logoutUser = async () => {
        try {
            // setLoading(true)
            setGlobalLoader(true)
            const res = await logout();
            if (res && res.success) {
                setAuthStatus('unauthenticated');
                setAccessToken(null);
                setCurrentUser(null);
                toast.success("Logged out successfully.")
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.")
        } finally {
            // setLoading(false)
            setGlobalLoader(false)
        }
    }
    return (
        <nav className={`yt-navbar ${mobileSearchOpen ? "yt-navbar--search-active" : ""}`}>
            
            {/* ── Left section ─────────────── */}
            <div className="yt-navbar-left">
                <button className="yt-menu-btn" aria-label="Menu" onClick={onMenuClick}>
                    <MenuIcon />
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
                <button type="button" className="yt-icon-btn yt-mobile-search-close" aria-label="Close search" onClick={() => setMobileSearchOpen(false)}>
                    <CloseIcon />
                </button>

                <div className="yt-search-wrapper">
                    <form className="yt-search-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className="yt-search-input"
                            placeholder="Search"
                            aria-label="Search"
                            autoFocus={mobileSearchOpen}
                        />
                        <button type="submit" className="yt-search-btn" aria-label="Search">
                            <SearchIcon />
                        </button>
                    </form>

                    <button className="yt-voice-btn" aria-label="Search with your voice">
                        <VoiceSearchIcon />
                    </button>
                </div>
            </div>

            {/* ── Right section (Actions) ───── */}
            <div className="yt-navbar-right">
                <button type="button" className="yt-icon-btn yt-mobile-search-btn" aria-label="Search" onClick={() => setMobileSearchOpen(true)}>
                    <SearchIcon />
                </button>

                <button className="yt-icon-btn" title="Upload" aria-label="Upload" onClick={() => navigate('/channel?upload=true')}>
                    <VideoCameraIcon />
                </button>

                <button className="yt-icon-btn" aria-label="Notifications">
                    <NotificationIcon />
                    <span className="yt-icon-btn-badge"></span>
                </button>

                <div className="yt-user-avatar" title="Your account" onClick={() => logoutUser()}>
                    M
                </div>
            </div>

        </nav>
    );
}
