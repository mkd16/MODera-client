import { useEffect, useState } from "react";

const MEDIA_ERROR_CODES = {
    1: "MEDIA_ERR_ABORTED - The media playback was aborted.",
    2: "MEDIA_ERR_NETWORK - A network error occurred while loading the media.",
    3: "MEDIA_ERR_DECODE - The media could not be decoded. This commonly indicates an unsupported/corrupt codec or malformed media.",
    4: "MEDIA_ERR_SRC_NOT_SUPPORTED - The media format or source is not supported by this browser.",
};

const NETWORK_STATES = {
    0: "NETWORK_EMPTY",
    1: "NETWORK_IDLE",
    2: "NETWORK_LOADING",
    3: "NETWORK_NO_SOURCE",
};

const READY_STATES = {
    0: "HAVE_NOTHING",
    1: "HAVE_METADATA",
    2: "HAVE_CURRENT_DATA",
    3: "HAVE_FUTURE_DATA",
    4: "HAVE_ENOUGH_DATA",
};

const getBrowserInfo = () => {
    if (typeof navigator === "undefined") {
        return {
            userAgent: "SSR / navigator unavailable",
            platform: "unknown",
        };
    }

    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        online: navigator.onLine,
    };
};

const getVideoSupport = (fileType) => {
    if (typeof document === "undefined") {
        return {
            canPlay: "unknown",
            canPlayMp4: "unknown",
            canPlayH264: "unknown",
            canPlayHevc: "unknown",
        };
    }

    const video = document.createElement("video");

    return {
        canPlay: fileType ? video.canPlayType(fileType) : "",
        canPlayMp4: video.canPlayType("video/mp4"),
        canPlayH264: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
        canPlayHevc: video.canPlayType('video/mp4; codecs="hvc1"'),
    };
};

const UploadPreviewPanel = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [debug, setDebug] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            setDebug(null);
            return;
        }

        const browser = getBrowserInfo();
        const support = getVideoSupport(file.type);

        const fileInfo = {
            name: file.name,
            type: file.type || "(empty MIME type)",
            size: file.size,
            sizeMB: (file.size / (1024 * 1024)).toFixed(2),
            lastModified: file.lastModified
                ? new Date(file.lastModified).toISOString()
                : null,
        };

        console.group("🎥 VIDEO UPLOAD DIAGNOSTICS");
        console.log("File:", fileInfo);
        console.log("Browser:", browser);
        console.log("Video support:", support);
        console.log(
            "File is MP4:",
            file.type === "video/mp4" || /\.mp4$/i.test(file.name)
        );

        if (!file.type) {
            console.warn(
                "⚠️ File has no MIME type. This may cause playback issues."
            );
        }

        if (
            file.type &&
            !file.type.startsWith("video/")
        ) {
            console.warn(
                "⚠️ File MIME type does not identify this as a video:",
                file.type
            );
        }

        if (file.type === "video/mp4" && !support.canPlayMp4) {
            console.warn(
                "⚠️ Browser reports that it cannot play video/mp4."
            );
        }

        console.groupEnd();

        let blobUrl;

        try {
            blobUrl = URL.createObjectURL(file);
            setPreviewUrl(blobUrl);

            setDebug({
                stage: "blob-created",
                file: fileInfo,
                browser,
                support,
                blobUrl,
            });

            console.log("✅ Blob URL created:", blobUrl);
        } catch (error) {
            console.error("❌ Failed to create Blob URL:", error);

            setDebug({
                stage: "blob-create-error",
                error: {
                    name: error?.name,
                    message: error?.message,
                    stack: error?.stack,
                },
                file: fileInfo,
                browser,
                support,
            });

            return;
        }

        return () => {
            console.log("🧹 Revoking Blob URL:", blobUrl);
            URL.revokeObjectURL(blobUrl);
        };
    }, [file]);

    const handleLoadedMetadata = (event) => {
        const video = event.currentTarget;

        const metadata = {
            duration: video.duration,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState,
            readyStateName: READY_STATES[video.readyState],
            networkState: video.networkState,
            networkStateName: NETWORK_STATES[video.networkState],
        };

        console.log("✅ VIDEO METADATA LOADED:", metadata);

        setDebug((previous) => ({
            ...previous,
            stage: "metadata-loaded",
            metadata,
        }));
    };

    const handleLoadedData = (event) => {
        const video = event.currentTarget;

        console.log("✅ VIDEO DATA LOADED", {
            currentTime: video.currentTime,
            duration: video.duration,
            readyState: video.readyState,
            readyStateName: READY_STATES[video.readyState],
        });

        setDebug((previous) => ({
            ...previous,
            stage: "data-loaded",
        }));
    };

    const handleCanPlay = (event) => {
        const video = event.currentTarget;

        console.log("✅ VIDEO CAN PLAY", {
            duration: video.duration,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState,
        });

        setDebug((previous) => ({
            ...previous,
            stage: "can-play",
        }));
    };

    const handleStalled = () => {
        console.warn("⚠️ VIDEO STALLED");

        setDebug((previous) => ({
            ...previous,
            stage: "stalled",
        }));
    };

    const handleWaiting = () => {
        console.warn("⚠️ VIDEO WAITING");

        setDebug((previous) => ({
            ...previous,
            stage: "waiting",
        }));
    };

    const handleError = (event) => {
        const video = event.currentTarget;
        const mediaError = video.error;

        const errorCode = mediaError?.code;
        const errorDescription =
            MEDIA_ERROR_CODES[errorCode] ||
            "Unknown media error";

        const diagnostic = {
            stage: "video-error",

            error: {
                code: errorCode,
                codeName: errorDescription,
                message: mediaError?.message || "(no browser error message)",
            },

            video: {
                src: video.currentSrc || video.src,
                currentTime: video.currentTime,
                duration: video.duration,
                videoWidth: video.videoWidth,
                videoHeight: video.videoHeight,
                readyState: video.readyState,
                readyStateName: READY_STATES[video.readyState],
                networkState: video.networkState,
                networkStateName: NETWORK_STATES[video.networkState],
            },

            file: file
                ? {
                      name: file.name,
                      type: file.type,
                      size: file.size,
                      sizeMB: (
                          file.size /
                          (1024 * 1024)
                      ).toFixed(2),
                  }
                : null,

            browser: getBrowserInfo(),

            support: getVideoSupport(file?.type),
        };

        console.error(
            "❌❌❌ VIDEO PLAYBACK ERROR ❌❌❌"
        );
        console.error(diagnostic);

        /*
         * Important diagnostic interpretation:
         *
         * code === 3
         * MEDIA_ERR_DECODE
         *
         * Usually means the browser received the media but
         * couldn't decode it. Check the video's actual codec.
         *
         * code === 4
         * MEDIA_ERR_SRC_NOT_SUPPORTED
         *
         * Usually means the browser doesn't support the
         * source/format/codec or the source is invalid.
         *
         * code === 2
         * MEDIA_ERR_NETWORK
         *
         * Investigate loading/network/blob issues.
         */

        setDebug(diagnostic);
    };

    return (
        <div className="upload-preview-panel">
            <div className="upload-preview-panel__player">
                {previewUrl && (
                    <video
                        src={previewUrl}
                        className="upload-preview-panel__video"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={handleLoadedMetadata}
                        onLoadedData={handleLoadedData}
                        onCanPlay={handleCanPlay}
                        onStalled={handleStalled}
                        onWaiting={handleWaiting}
                        onError={handleError}
                    />
                )}
            </div>

            {debug && (
                <details className="upload-preview-panel__debug">
                    <summary>
                        Video diagnostics
                    </summary>

                    <pre>
                        {JSON.stringify(
                            debug,
                            null,
                            2
                        )}
                    </pre>
                </details>
            )}

            <div className="upload-preview-panel__file-info">
                <p className="upload-preview-panel__file-name">
                    {file?.name}
                </p>

                <p className="upload-preview-panel__file-size">
                    {file
                        ? `${(
                              file.size /
                              (1024 * 1024)
                          ).toFixed(1)} MB`
                        : ""}
                </p>

                <p className="upload-preview-panel__file-type">
                    {file?.type || "Unknown MIME type"}
                </p>
            </div>

            <div className="upload-progress">
                <div className="upload-progress__bar upload-progress__bar--demo" />
            </div>

            <p className="upload-progress__label">
                Ready to upload
            </p>
        </div>
    );
};

export default UploadPreviewPanel;