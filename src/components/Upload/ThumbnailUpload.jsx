import { useState } from "react";

const ThumbnailUpload = () => {
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="form-group">
            <label className="form-label">Thumbnail</label>
            <label className="thumbnail-upload" htmlFor="thumbnailInput">
                {preview ? (
                    <img src={preview} alt="Thumbnail preview" className="thumbnail-upload__preview" />
                ) : (
                    <div className="thumbnail-upload__placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span>Upload thumbnail</span>
                    </div>
                )}
                <input id="thumbnailInput" type="file" accept="image/*" className="thumbnail-upload__input" onChange={handleChange} />
            </label>
        </div>
    );
};

export default ThumbnailUpload;