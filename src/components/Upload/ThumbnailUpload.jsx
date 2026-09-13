import { useState } from "react";
import { CloseIcon, ImageIcon } from "../icons/icons";
import { validateThumbnail } from "../../utils/inputValidations";
import { assertReadable } from "../../utils/pickedFile";
import toast from "react-hot-toast";

// Same reason as the video input: a pure "image/*" accept sends Chrome for Android to the
// system photo picker, whose file handles die before they can be read. Listing one
// non-media type keeps it on the document picker. See pickedFile.js.
const THUMBNAIL_ACCEPT = "image/jpeg,image/png,image/webp,application/octet-stream";

const ThumbnailUpload = ({ value, onChange, error }) => {
    const [preview, setPreview] = useState(null);

    const handleChange = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Capture the input before any await — we still need it to reset on failure.
        const input = e.target;
        const file = input.files?.[0];

        if (!file) {
            clearPreview();
            onChange(null);
            return;
        }

        try {
            // Probe before validating: reading .size first can invalidate the handle.
            await assertReadable(file);
        } catch (readError) {
            // `error` is a prop on this component — don't shadow it.
            console.error("[ThumbnailUpload] file handle is not readable", readError);
            input.value = "";
            toast.error("Couldn't read that image. If it came from Google Photos, try picking it again from Files.");
            return;
        }

        const invalidMsg = validateThumbnail(file);
        if (invalidMsg) {
            input.value = "";
            toast.error(invalidMsg || "Please select a valid image file.");
            return;
        }

        clearPreview();
        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    // Blob URLs are pinned until revoked — always release the old one before dropping it.
    const clearPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
    };

    const handleRemoveThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearPreview();
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
                <input id="thumbnailInput" type="file" accept={THUMBNAIL_ACCEPT} className="thumbnail-upload__input" onChange={handleChange} />
            </label>
            {error && <p className="form-error">{error}</p>}
        </div>
    );
};

export default ThumbnailUpload;
