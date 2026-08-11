const UploadPreviewPanel = ({ file }) => {
    const previewUrl = file ? URL.createObjectURL(file) : null;
    // This creates BLOB (binary large object) URL for browser to render video

    return (
        <div className="upload-preview-panel">
            <div className="upload-preview-panel__player">
                {previewUrl && <video src={previewUrl} className="upload-preview-panel__video" controls muted />}
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