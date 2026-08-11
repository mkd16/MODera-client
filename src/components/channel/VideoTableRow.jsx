const visibilityClassMap = {
    Public: "badge--success",
    Unlisted: "badge--warning",
    Private: "badge--muted",
};

const VideoTableRow = ({ video }) => {
    return (
        <tr className="video-table__row">
            <td className="video-table__cell video-table__cell--video">
                <div className="video-table__video">
                    <img src={video.thumbnail} alt={video.title} className="video-table__thumb" />
                    <div className="video-table__video-text">
                        <p className="video-table__title">{video.title}</p>
                        <p className="video-table__description">{video.description}</p>
                    </div>
                </div>
            </td>
            <td className="video-table__cell">
                <span className={`badge ${visibilityClassMap[video.visibility] || "badge--muted"}`}>
                    {video.visibility}
                </span>
            </td>
            <td className="video-table__cell video-table__cell--restriction">{video.restriction}</td>
            <td className="video-table__cell video-table__cell--date">{video.uploadedOn}</td>
            <td className="video-table__cell">
                <div className="video-table__cell--actions">
                    <button type="button" className="icon-btn" aria-label="Edit video">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9" strokeLinecap="round" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" className="icon-btn icon-btn--danger" aria-label="Delete video">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18" strokeLinecap="round" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default VideoTableRow;