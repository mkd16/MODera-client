import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchVideo } from "../api/listingApi";

export default function Watch() {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");

    const [video, setVideo] = useState(null);
    const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!videoId) return;

        // Guards against a state update after the effect re-runs (id changes)
        // or the component unmounts while the request is in flight.
        let cancelled = false;

        async function loadVideo() {
            try {
                const res = await fetchVideo(videoId);
                if (cancelled) return;
                setVideo(res.data.video);
                setStatus("ready");
            } catch (err) {
                if (cancelled) return;
                const message = err?.message || "Failed to load video.";
                setError(message);
                setStatus("error");
                toast.error(message);
            }
        }

        loadVideo();

        return () => {
            cancelled = true;
        };
    }, [videoId]);

    if (!videoId) {
        return (
            <div className="yt-watch">
                <div className="yt-watch__state">
                    <p>No video selected.</p>
                    <Link to="/" className="yt-watch__back">Back to home</Link>
                </div>
            </div>
        );
    }

    if (status === "loading") {
        return (
            <div className="yt-watch">
                <div className="yt-watch__player-wrap skeleton" />
            </div>
        );
    }

    if (status === "error" || !video) {
        return (
            <div className="yt-watch">
                <div className="yt-watch__state">
                    <p>{error || "Video not found."}</p>
                    <Link to="/" className="yt-watch__back">Back to home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="yt-watch">
            <div className="yt-watch__player-wrap">
                <video
                    className="yt-watch__player"
                    src={video.playbackUrl}
                    poster={video.thumbnailUrl || undefined}
                    controls
                    autoPlay
                    playsInline
                />
            </div>

            <h1 className="yt-watch__title">{video.title}</h1>

            <div className="yt-watch__meta">
                <span className="yt-watch__channel">
                    {video.channel?.name || video.owner?.username || "Unknown channel"}
                </span>
                <span> • </span>
                <span>{new Date(video.created_at).toDateString()}</span>
            </div>

            {video.description && (
                <p className="yt-watch__desc">{video.description}</p>
            )}
        </div>
    );
}
