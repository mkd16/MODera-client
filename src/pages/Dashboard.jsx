export default function Dashboard() {
    return (
        <div>
            {/* Video grid */}
            <div className="yt-video-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <div key={i} className="yt-video-card">
                        <div className="yt-video-card-thumb skeleton"></div>
                        <div className="yt-video-card-info">
                            <div className="yt-video-card-title">
                                Video title placeholder that spans two lines maximum
                            </div>
                            <div className="yt-video-card-meta">
                                Channel Name • 1.2M views • 2 days ago
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}