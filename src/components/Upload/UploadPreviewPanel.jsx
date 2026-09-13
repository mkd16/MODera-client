import { useEffect, useState } from "react";

const UploadPreviewPanel = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewFailed, setPreviewFailed] = useState(false);

    // Creating an object URL is external-resource sync, not derived state: it must
    // happen in an effect so the matching revoke can run on cleanup. The rule below
    // can't express that pattern, so it's disabled deliberately rather than worked around.
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        setPreviewFailed(false);
        const blobUrl = URL.createObjectURL(file);
        setPreviewUrl(blobUrl);

        // Cleanup: revoke the blob URL when file changes or component unmounts
        return () => {
            URL.revokeObjectURL(blobUrl);
        };
    }, [file]);
    /* eslint-enable react-hooks/set-state-in-effect */

    return (
        <div className="upload-preview-panel">
            <div className="upload-preview-panel__player">
                {previewUrl && !previewFailed && (
                    <video
                        src={previewUrl}
                        className="upload-preview-panel__video"
                        controls
                        muted
                        playsInline
                        onError={() => setPreviewFailed(true)}
                    />
                )}
                {previewFailed && (
                    // Preview is best-effort — some codecs (HEVC in particular) don't
                    // decode in the browser. Never block the upload on it.
                    <p className="upload-preview-panel__preview-error">
                        Preview isn&apos;t available for this file. It will still upload normally.
                    </p>
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
