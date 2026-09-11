import { useState } from "react";
import { CloseIcon, ImageIcon } from "../icons/icons";
import { validateThumbnail } from "../../utils/inputValidations";
import toast from "react-hot-toast";

const ThumbnailUpload = ({ value, onChange, error }) => {
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.target.files?.[0];
        if (file) {
            const invalidMsg = validateThumbnail(file)
            if (invalidMsg) {
                toast.error(invalidMsg || "Please select a valid video file.")
                return
            }
            setPreview(URL.createObjectURL(file));
            onChange(file);
        } else {
            setPreview(null);
            onChange(null);
        }
    };

    const handleRemoveThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPreview(null);
        onChange(null);
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
                {preview && <div className="thumbnail-upload__close-btn" onClick={handleRemoveThumbnail}><CloseIcon></CloseIcon></div>}
                <input id="thumbnailInput" type="file" accept="image/*" className="thumbnail-upload__input" onChange={handleChange} />
            </label>
            {error && <p className="form-error">{error}</p>}
        </div>
    );
};

export default ThumbnailUpload;