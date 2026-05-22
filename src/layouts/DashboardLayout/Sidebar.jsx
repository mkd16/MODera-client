import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="yt-sidebar">

            {/* ── Top section (Home) ──────────── */}
            <div className="yt-sidebar-section">
                <button className="yt-nav-item yt-nav-item--active">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Home</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z" />
                    </svg>
                    <span>Shorts</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" />
                    </svg>
                    <span>Subscriptions</span>
                </button>
            </div>

            {/* ── You section ─────────────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">You</div>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 7l-1.41 1.41L13.17 12l-3.58 3.59L11 17l5-5-5-5z" />
                    </svg>
                    <Link to="/profile">Your channel</Link>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-2c6.08 0 11 4.92 11 11s-4.92 11-11 11S1 18.08 1 12 5.92 1 12 1z" />
                    </svg>
                    <span>History</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h2c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8C9.04 4 6.57 5.82 5.35 8.35l2.24-.37-.37 2.22-4.35.73.73-4.35 2.22-.37-.73 2.24C6.88 4.5 9.3 2 12.19 2c5.51 0 9.81 4.49 9.81 10z" />
                    </svg>
                    <span>Watch Later</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3V20zM19.98 13.17l-1.34 6C18.54 19.65 18.03 20 17.43 20H8v-8.61l5.6-6.06C13.79 5.12 14.08 5 14.38 5c.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94L13.18 12h1.35h4.23c.41 0 .8.17 1.03.46.12.15.25.36.18.65z" />
                    </svg>
                    <span>Liked videos</span>
                </button>
            </div>

            {/* ── Subscriptions ──────────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">Subscriptions</div>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 1</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 2</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                    <span>Channel Name 3</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                    <span>Show 12 more</span>
                </button>
            </div>

            {/* ── Explore ────────────────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">Explore</div>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3.87v9.77C19 17.7 15.86 21 12 21s-7-3.3-7-7.37v-.13c0-1.06.22-2.13.62-3.09.5-1.19 1.29-2.21 2.27-2.97.85-.66 1.83-1.14 2.87-1.65.39-.19.77-.38 1.15-.58.36-.19.72-.38 1.08-.56v3.22l1.55-1.04L19 3.87M20 2l-6 4V3c-.85.44-1.7.88-2.55 1.33-1.41.74-2.9 1.34-4.17 2.32-1.13.87-2.02 2.05-2.58 3.37-.46 1.09-.7 2.29-.7 3.48v.14C4 18.26 7.58 22 12 22s8-3.74 8-8.36V2zM9.45 12.89 14 10v5.7c0 1.82-1.34 3.3-3 3.3s-3-1.47-3-3.3c0-1.19.58-2.23 1.45-2.81z" />
                    </svg>
                    <span>Trending</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 7H4V6h16v1zm-2 2H6v1h12V9zm-2 2H8v1h8v-1zm-2 2h-4v1h4v-1zm-2 2h-0v1h0v-1z" />
                    </svg>
                    <span>Music</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.98c-1.53 0-2.87.4-4.03 1.21-1.2.83-2.12 2-2.75 3.39-.63 1.39-.95 2.91-.95 4.53 0 1.62.31 3.14.94 4.53.63 1.39 1.56 2.56 2.76 3.39 1.16.81 2.5 1.21 4.03 1.21s2.87-.4 4.03-1.21c1.2-.83 2.13-2 2.76-3.39.63-1.39.94-2.91.94-4.53 0-1.62-.31-3.14-.94-4.53-.63-1.39-1.56-2.56-2.76-3.39C14.87 5.38 13.53 4.98 12 4.98zm0 1.71c2.34 0 4.31 1.52 5.2 3.63h-1.3c-.75-1.38-2.18-2.31-3.9-2.31s-3.15.93-3.9 2.31h-1.3c.89-2.11 2.86-3.63 5.2-3.63zm0 11.62c-2.34 0-4.31-1.52-5.2-3.63h1.3c.75 1.38 2.18 2.31 3.9 2.31s3.15-.93 3.9-2.31h1.3c-.89 2.11-2.86 3.63-5.2 3.63z" />
                    </svg>
                    <span>Gaming</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
                    </svg>
                    <span>News</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                    </svg>
                    <span>Live</span>
                </button>
            </div>

            {/* ── More from YouTube ──────────── */}
            <div className="yt-sidebar-section">
                <div className="yt-sidebar-section-title">More from YouTube</div>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)' }}>
                        <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
                    </svg>
                    <span>YouTube Premium</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z" />
                    </svg>
                    <span>Help</span>
                </button>

                <button className="yt-nav-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 14h-2v-2h2v2zm0-9h-2v6h2V5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <span>Send feedback</span>
                </button>
            </div>

        </aside>
    );
}