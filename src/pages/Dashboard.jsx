import { useEffect, useState } from "react";
import { fetchVideos } from "../api/listingApi";
import toast from "react-hot-toast";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [videos, setVideos] = useState([...Array(12).keys()])

    useEffect(() => {
        setIsLoading(true)
        async function fetchVideoList() {
            try {
                const res = await fetchVideos()
                if (res && res.success) {
                    setVideos(res.data.videos)
                }
            } catch (error) {
                setVideos([])
                toast.error(error?.message || "Failed to fetch videos")
            } finally {
                setIsLoading(false)
            }
        }
        fetchVideoList()
    }, [])

    return (
        <div className="h-full">
            {/* Video grid */}
            {videos.length > 0 &&
                <div className="yt-video-grid">
                    {videos.map((video) => (
                        <div key={video} className="yt-video-card">
                            <div className={`yt-video-card-thumb ${isLoading ? 'skeleton' : ''}`}></div>
                            <div className="yt-video-card-info">
                                <div className="yt-video-card-title">
                                    {!isLoading ? video?.title : "Video title placeholder that spans two lines maximum"}
                                </div>
                                <div className="yt-video-card-meta">
                                    {!isLoading ? video?.channel?.name : "Channel Name"} • {!isLoading ? (video?.size / 1000000).toFixed(1) + "M views" : "1.2M views"} • {!isLoading ? (new Date(video?.created_at)).toDateString() : "2 days ago"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {!videos.length &&
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-lg font-medium">No videos uploaded</p>
                        <p className="text-sm text-gray-500">Upload a video to get started</p>
                    </div>
                </div>
            }
        </div>
    );
}