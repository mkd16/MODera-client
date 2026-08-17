import { EditIcon, DeleteIcon } from "../icons/icons";

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
                        <EditIcon />
                    </button>
                    <button type="button" className="icon-btn icon-btn--danger" aria-label="Delete video">
                        <DeleteIcon />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default VideoTableRow;