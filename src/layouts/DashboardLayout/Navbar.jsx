import { PlayIcon, MenuIcon, SearchIcon, VoiceSearchIcon, VideoCameraIcon, NotificationIcon, CloseIcon, UserIcon, SettingsIcon, LogoutIcon } from "../../components/icons/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { setAccessToken } from "../../utils/accessTokenManager";
import { logout } from "../../api/authApi.js";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import { useGlobalLoader } from "../../context/LoaderContext.jsx";

export default function Navbar({ onMenuClick }) {
    const navigate = useNavigate();
    const { setAuthStatus, setCurrentUser, currentUser } = useAuth();
    const [loading, setLoading] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const { globalLoader, setGlobalLoader } = useGlobalLoader();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const profileRef = useRef(null);

    // Close the profile menu on an outside click or Escape. The listener only exists
    // while the menu is open, and `contains` keeps a click on the avatar itself from
    // closing it here — the avatar's own onClick already toggles it.
    useEffect(() => {
        if (!openProfileMenu) return;

        const handlePointerDown = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setOpenProfileMenu(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpenProfileMenu(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openProfileMenu]);

    const goTo = (path) => {
        setOpenProfileMenu(false);
        navigate(path);
    };

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

                <div className="yt-profile" ref={profileRef}>
                    <button
                        type="button"
                        className="yt-user-avatar"
                        title="Your account"
                        aria-haspopup="menu"
                        aria-expanded={openProfileMenu}
                        onClick={() => setOpenProfileMenu((prev) => !prev)}
                    >
                        {currentUser?.name?.slice(0, 1).toUpperCase() ?? 'U'}
                    </button>

                    {openProfileMenu && (
                        <div className="yt-profile-menu" role="menu">
                            <div className="yt-profile-menu__header">
                                <div className="yt-profile-menu__avatar" aria-hidden="true">
                                    {currentUser?.name?.slice(0, 1).toUpperCase() ?? 'U'}
                                </div>
                                <div className="yt-profile-menu__identity">
                                    <p className="yt-profile-menu__name">{currentUser?.name ?? 'Your account'}</p>
                                    {currentUser?.email && (
                                        <p className="yt-profile-menu__email">{currentUser.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="yt-profile-menu__separator" />

                            <ul className="yt-profile-menu__list">
                                <li>
                                    <button type="button" role="menuitem" className="yt-profile-menu__item" onClick={() => goTo('/profile')}>
                                        <UserIcon />
                                        <span>Profile</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" role="menuitem" className="yt-profile-menu__item" onClick={() => goTo('/channel')}>
                                        <VideoCameraIcon />
                                        <span>Your channel</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" role="menuitem" className="yt-profile-menu__item" onClick={() => goTo('/profile')}>
                                        <SettingsIcon />
                                        <span>Settings</span>
                                    </button>
                                </li>
                            </ul>

                            <div className="yt-profile-menu__separator" />

                            <ul className="yt-profile-menu__list">
                                <li>
                                    <button type="button" role="menuitem" className="yt-profile-menu__item" onClick={() => { setOpenProfileMenu(false); logoutUser(); }}>
                                        <LogoutIcon />
                                        <span>Log out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
}
