import { useEffect, useState } from "react";

const UploadPreviewPanel = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const blobUrl = URL.createObjectURL(file);
        setPreviewUrl(blobUrl);

        // Cleanup: revoke the blob URL when file changes or component unmounts
        return () => {
            URL.revokeObjectURL(blobUrl);
        };
    }, [file]);

    return (
        <div className="upload-preview-panel">
            <div className="upload-preview-panel__player">
                {
                    console.log({'preview url :: ': previewUrl, file: file})
                }
                {previewUrl && (
                    <video
                        src={previewUrl}
                        className="upload-preview-panel__video"
                        controls
                        muted
                        playsInline
                        onLoadedMetadata={()=>{console.log("VIDEO metadata loaded")}}
                        onError={(e)=>{console.log('Video Error', e.currentTarget.error)}}
                    />
                )}
            </div>

            <div className="upload-preview-panel__file-info">
                <p className="upload-preview-panel__file-name">{file?.name}</p>
                <p className="upload-preview-panel__file-size">
                    {file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : ""}
                </p>
            </div>

            <div className="upload-progress">
                {/* static demo width — drive this from real upload progress later */}
                <div className="upload-progress__bar upload-progress__bar--demo" />
            </div>
            <p className="upload-progress__label">Ready to upload</p>
        </div>
    );
};

export default UploadPreviewPanel;