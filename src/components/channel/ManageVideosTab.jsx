import { mockVideos } from "../../data/mockVideos";
import VideoTableRow from "./VideoTableRow";

const ManageVideosTab = () => {
    return (
        <div className="video-table-wrapper">
            <table className="video-table">
                <thead>
                    <tr>
                        <th>Video</th>
                        <th>Visibility</th>
                        <th>Restriction</th>
                        <th>Uploaded At</th>
                        <th className="video-table__cell--actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockVideos.map((video) => (
                        <VideoTableRow key={video.id} video={video} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageVideosTab;