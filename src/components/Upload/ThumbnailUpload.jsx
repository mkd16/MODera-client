import { useState } from "react";
import { ImageIcon } from "../icons/icons";

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
                        <ImageIcon />
                        <span>Upload thumbnail</span>
                    </div>
                )}
                <input id="thumbnailInput" type="file" accept="image/*" className="thumbnail-upload__input" onChange={handleChange} />
            </label>
        </div>
    );
};

export default ThumbnailUpload;