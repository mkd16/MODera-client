import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    ShortsIcon,
    SubscriptionsIcon,
    ChevronRightIcon,
    HistoryIcon,
    WatchLaterIcon,
    LikedVideosIcon,
    TrendingIcon,
    MusicIcon,
    GamingIcon,
    NewsIcon,
    VideoCameraIcon,
    PremiumIcon,
    HelpIcon,
    FeedbackIcon,
} from "../../components/icons/icons";

export default function Sidebar({ isOpen, onClose }) {
    return (
        <aside className={`yt-sidebar ${isOpen ? "yt-sidebar--open" : ""}`} onClick={onClose}>

            {/* ── Top section (Home) ──────────── */}
            <div className="yt-sidebar-section">
                <NavLink to="/" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <HomeIcon />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/shorts" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <ShortsIcon />
                    <span>Shorts</span>
                </NavLink>

                <NavLink to="/subscriptions" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <SubscriptionsIcon />
                    <span>Subscriptions</span>
                </NavLink>
            </div>

            {/* ── You section ─────────────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">You</div>

                <NavLink to="/channel" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <ChevronRightIcon />
                    <span>Your channel</span>
                </NavLink>

                <NavLink to="/history" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <HistoryIcon />
                    <span>History</span>
                </NavLink>

                <NavLink to="/watch-later" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <WatchLaterIcon />
                    <span>Watch Later</span>
                </NavLink>

                <NavLink to="/liked-videos" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <LikedVideosIcon />
                    <span>Liked videos</span>
                </NavLink>
            </div>

            {/* ── Subscriptions ──────────────── */}
            <div className="yt-sidebar-section">
                {/* <div className="yt-sidebar-section-title">Subscriptions</div>

                <NavLink className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 1</span>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 2</span>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 3</span>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                    <span>Show 12 more</span>
                </NavLink> */}
            </div>

            {/* ── Explore ────────────────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">Explore</div>

                <NavLink to="/trending" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <TrendingIcon />
                    <span>Trending</span>
                </NavLink>

                <NavLink to="/music" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <MusicIcon />
                    <span>Music</span>
                </NavLink>

                <NavLink to="/gaming" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <GamingIcon />
                    <span>Gaming</span>
                </NavLink>

                <NavLink to="/news" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <NewsIcon />
                    <span>News</span>
                </NavLink>

                <NavLink to="/live" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <VideoCameraIcon />
                    <span>Live</span>
                </NavLink>
            </div>

            {/* ── More from YouTube ──────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">More from YouTube</div>

                <NavLink to="/premium" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <span style={{ color: 'var(--primary)' }}><PremiumIcon /></span>
                    <span>YouTube Premium</span>
                </NavLink>

                <NavLink to="/help" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <HelpIcon />
                    <span>Help</span>
                </NavLink>

                <NavLink to="/feedback" className={({ isActive }) => isActive ? "yt-nav-item yt-nav-item--active" : "yt-nav-item"}>
                    <FeedbackIcon />
                    <span>Send feedback</span>
                </NavLink>
            </div>

        </aside>
    );
}