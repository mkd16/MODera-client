import toast from "react-hot-toast";
import { validateVideoFile } from "../../utils/inputValidations";
import { UploadArrowIcon } from "../icons/icons";

const UploadDropzone = ({ onFileSelect }) => {
    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const invalidMsg = validateVideoFile(file)
            if (invalidMsg) {
                toast.error(invalidMsg || "Please select a valid video file.")
                return
            }
            onFileSelect(file);
        }
    };

    return (
        <label className="upload-dropzone" htmlFor="videoFileInput">
            <div className="upload-dropzone__icon">
                <UploadArrowIcon />
            </div>
            <p className="upload-dropzone__title">Drag and drop a video to upload</p>
            <p className="upload-dropzone__subtitle">Your video will remain private until published</p>
            <span className="btn btn--primary upload-dropzone__button">Select file</span>
            <input id="videoFileInput" type="file" accept="video/*" className="upload-dropzone__input" onChange={handleChange} />
        </label>
    );
};

export default UploadDropzone;