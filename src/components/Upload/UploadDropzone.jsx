import toast from "react-hot-toast";
import { validateVideoFile } from "../../utils/inputValidations";
import { assertReadable } from "../../utils/pickedFile";
import { UploadArrowIcon } from "../icons/icons";

// Listing a non-media type alongside the video types keeps Chrome for Android on the
// document picker, which returns a durable file handle. A pure "video/*" accept routes
// to the system photo picker, whose handles die before the upload finishes. See pickedFile.js.
const VIDEO_ACCEPT = "video/mp4,video/webm,application/octet-stream";

const UploadDropzone = ({ onFileSelect }) => {
    const handleChange = async (e) => {
        // Capture the input before any await — we still need it to reset on failure.
        const input = e.target;
        const file = input.files?.[0];
        if (!file) return;

        try {
            // Probe before validating: reading .size first can invalidate the handle.
            await assertReadable(file);
        } catch (error) {
            console.error("[UploadDropzone] file handle is not readable", error);
            input.value = "";
            toast.error("Couldn't read that file. If it came from Google Photos, try picking it again from Files.");
            return;
        }

        const invalidMsg = validateVideoFile(file);
        if (invalidMsg) {
            input.value = "";
            toast.error(invalidMsg || "Please select a valid video file.");
            return;
        }

        onFileSelect(file);
    };

    return (
        <label className="upload-dropzone" htmlFor="videoFileInput">
            <div className="upload-dropzone__icon">
                <UploadArrowIcon />
            </div>
            <p className="upload-dropzone__title">Drag and drop a video to upload</p>
            <p className="upload-dropzone__subtitle">Your video will remain private until published</p>
            <span className="btn btn--primary upload-dropzone__button">Select file</span>
            <input id="videoFileInput" type="file" accept={VIDEO_ACCEPT} className="upload-dropzone__input" onChange={handleChange} />
        </label>
    );
};

export default UploadDropzone;
