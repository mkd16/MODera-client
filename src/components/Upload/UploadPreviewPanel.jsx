import { useEffect, useState } from "react";

const MEDIA_ERROR_CODES = {
    1: "MEDIA_ERR_ABORTED",
    2: "MEDIA_ERR_NETWORK",
    3: "MEDIA_ERR_DECODE",
    4: "MEDIA_ERR_SRC_NOT_SUPPORTED",
};

const getDiagnosis = ({ errorCode, fileType, support, readyState }) => {
    if (errorCode === 3) {
        return {
            title: "Video decoding failed",
            message:
                "The browser received the video but could not decode it. The video codec may not be supported on this mobile device.",
            action:
                "Check whether the video uses H.264/AVC. HEVC/H.265 videos are a common cause of this issue.",
        };
    }

    if (errorCode === 4) {
        return {
            title: "Video format is not supported",
            message:
                "This mobile browser does not support the uploaded video format or codec.",
            action:
                "Convert the video to MP4 using H.264 video + AAC audio.",
        };
    }

    if (errorCode === 2) {
        return {
            title: "Video loading failed",
            message:
                "The browser encountered a problem while loading the video.",
            action:
                "Check the Blob URL, file loading, and upload pipeline.",
        };
    }

    if (!fileType) {
        return {
            title: "Missing MIME type",
            message:
                "The uploaded file does not have a MIME type.",
            action:
                "Check how the mobile file is being selected/uploaded.",
        };
    }

    if (
        fileType === "video/mp4" &&
        support.canPlayMp4 === ""
    ) {
        return {
            title: "MP4 is not supported",
            message:
                "The browser reports that it cannot play video/mp4.",
            action:
                "Use a browser-compatible H.264/AAC MP4.",
        };
    }

    if (readyState === 0) {
        return {
            title: "Video has no readable metadata",
            message:
                "The browser could not read the video's metadata.",
            action:
                "Check the video container and codec.",
        };
    }

    return {
        title: "Unknown playback problem",
        message:
            "The browser could not provide enough information to determine the exact cause.",
        action:
            "Check the original video's codec and encoding.",
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
        canPlay: fileType
            ? video.canPlayType(fileType)
            : "",
        canPlayMp4: video.canPlayType("video/mp4"),
        canPlayH264: video.canPlayType(
            'video/mp4; codecs="avc1.42E01E"'
        ),
        canPlayHevc: video.canPlayType(
            'video/mp4; codecs="hvc1"'
        ),
    };
};

const UploadPreviewPanel = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const [diagnostics, setDiagnostics] = useState({
        status: "waiting",
        message: "Waiting for video...",
    });

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);

            setDiagnostics({
                status: "waiting",
                message: "No video selected.",
            });

            return;
        }

        const support = getVideoSupport(file.type);

        let blobUrl;

        try {
            blobUrl = URL.createObjectURL(file);

            setPreviewUrl(blobUrl);

            setDiagnostics({
                status: "loading",
                message: "Video selected. Waiting for browser to read metadata.",

                file: {
                    name: file.name,
                    type: file.type || "EMPTY",
                    sizeMB: (
                        file.size /
                        (1024 * 1024)
                    ).toFixed(2),
                },

                browserSupport: support,
            });
        } catch (error) {
            setDiagnostics({
                status: "error",
                message: "Could not create video preview.",

                error: {
                    name: error?.name,
                    message: error?.message,
                },
            });

            return;
        }

        return () => {
            URL.revokeObjectURL(blobUrl);
        };
    }, [file]);

    const handleLoadedMetadata = (event) => {
        const video = event.currentTarget;

        setDiagnostics((previous) => ({
            ...previous,

            status: "metadata-loaded",

            message:
                "Video metadata loaded successfully.",

            video: {
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
                readyState: video.readyState,
                networkState: video.networkState,
            },
        }));
    };

    const handleCanPlay = (event) => {
        const video = event.currentTarget;

        setDiagnostics((previous) => ({
            ...previous,

            status: "success",

            message:
                "Video can be played by this browser.",

            video: {
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
                readyState: video.readyState,
                networkState: video.networkState,
            },
        }));
    };

    const handleError = (event) => {
        const video = event.currentTarget;
        const mediaError = video.error;

        const errorCode = mediaError?.code;
        const errorName =
            MEDIA_ERROR_CODES[errorCode] ||
            "UNKNOWN_ERROR";

        const support = getVideoSupport(file?.type);

        const diagnosis = getDiagnosis({
            errorCode,
            fileType: file?.type,
            support,
            readyState: video.readyState,
        });

        setDiagnostics({
            status: "error",

            message: diagnosis.title,

            error: {
                code: errorCode || "UNKNOWN",
                codeName: errorName,
                browserMessage:
                    mediaError?.message ||
                    "No browser error message available.",
            },

            diagnosis: {
                explanation: diagnosis.message,
                recommendedAction: diagnosis.action,
            },

            file: {
                name: file?.name,
                type: file?.type || "EMPTY",
                sizeMB: file
                    ? (
                          file.size /
                          (1024 * 1024)
                      ).toFixed(2)
                    : null,
            },

            video: {
                src: video.currentSrc || video.src,
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
                readyState: video.readyState,
                networkState: video.networkState,
            },

            browserSupport: support,

            device: {
                userAgent:
                    navigator.userAgent,
                platform:
                    navigator.platform,
                language:
                    navigator.language,
            },
        });
    };

    const getStatusColor = () => {
        switch (diagnostics.status) {
            case "success":
                return "#16a34a";

            case "error":
                return "#dc2626";

            case "loading":
            case "metadata-loaded":
                return "#d97706";

            default:
                return "#6b7280";
        }
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
                        onLoadedMetadata={
                            handleLoadedMetadata
                        }
                        onCanPlay={handleCanPlay}
                        onError={handleError}
                    />
                )}
            </div>

            {/* MOBILE-FRIENDLY DIAGNOSTICS */}
            <div
                style={{
                    marginTop: "16px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "#f5f5f5",
                    border: `2px solid ${getStatusColor()}`,
                    fontSize: "13px",
                    lineHeight: "1.5",
                    wordBreak: "break-word",
                }}
            >
                <strong
                    style={{
                        color: getStatusColor(),
                        fontSize: "15px",
                    }}
                >
                    Video Diagnostic:{" "}
                    {diagnostics.status}
                </strong>

                <p>
                    <strong>Status:</strong>{" "}
                    {diagnostics.message}
                </p>

                {diagnostics.error && (
                    <>
                        <hr />

                        <p>
                            <strong>Error code:</strong>{" "}
                            {diagnostics.error.code}
                        </p>

                        <p>
                            <strong>Error type:</strong>{" "}
                            {diagnostics.error.codeName}
                        </p>

                        <p>
                            <strong>Browser message:</strong>{" "}
                            {diagnostics.error.browserMessage}
                        </p>
                    </>
                )}

                {diagnostics.diagnosis && (
                    <>
                        <hr />

                        <p>
                            <strong>Likely cause:</strong>{" "}
                            {diagnostics.diagnosis.explanation}
                        </p>

                        <p>
                            <strong>Recommended action:</strong>{" "}
                            {
                                diagnostics.diagnosis
                                    .recommendedAction
                            }
                        </p>
                    </>
                )}

                {diagnostics.file && (
                    <>
                        <hr />

                        <p>
                            <strong>File:</strong>{" "}
                            {diagnostics.file.name}
                        </p>

                        <p>
                            <strong>MIME type:</strong>{" "}
                            {diagnostics.file.type}
                        </p>

                        <p>
                            <strong>Size:</strong>{" "}
                            {diagnostics.file.sizeMB} MB
                        </p>
                    </>
                )}

                {diagnostics.video && (
                    <>
                        <hr />

                        <p>
                            <strong>Video dimensions:</strong>{" "}
                            {diagnostics.video.width} ×{" "}
                            {diagnostics.video.height}
                        </p>

                        <p>
                            <strong>Duration:</strong>{" "}
                            {Number.isFinite(
                                diagnostics.video.duration
                            )
                                ? `${diagnostics.video.duration.toFixed(
                                      2
                                  )} seconds`
                                : "Unknown"}
                        </p>

                        <p>
                            <strong>Ready state:</strong>{" "}
                            {diagnostics.video.readyState}
                        </p>

                        <p>
                            <strong>Network state:</strong>{" "}
                            {diagnostics.video.networkState}
                        </p>
                    </>
                )}

                {diagnostics.browserSupport && (
                    <>
                        <hr />

                        <p>
                            <strong>Browser MP4 support:</strong>{" "}
                            {diagnostics.browserSupport.canPlayMp4 ||
                                "NO"}
                        </p>

                        <p>
                            <strong>H.264 support:</strong>{" "}
                            {diagnostics.browserSupport.canPlayH264 ||
                                "NO"}
                        </p>

                        <p>
                            <strong>HEVC/H.265 support:</strong>{" "}
                            {diagnostics.browserSupport.canPlayHevc ||
                                "NO"}
                        </p>
                    </>
                )}

                {diagnostics.device && (
                    <>
                        <hr />

                        <p>
                            <strong>Platform:</strong>{" "}
                            {diagnostics.device.platform}
                        </p>

                        <p>
                            <strong>Browser:</strong>{" "}
                            {diagnostics.device.userAgent}
                        </p>
                    </>
                )}
            </div>

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