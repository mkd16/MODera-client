import toast from "react-hot-toast";
import { validateVideoFile } from "../../utils/inputValidations";

const UploadDropzone = ({ onFileSelect }) => {
    const handleChange = (e) => {
        console.log(e, '-------------');
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 16V4m0 0-4 4m4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <p className="upload-dropzone__title">Drag and drop a video to upload</p>
            <p className="upload-dropzone__subtitle">Your video will remain private until published</p>
            <span className="btn btn--primary upload-dropzone__button">Select file</span>
            <input id="videoFileInput" type="file" accept="video/*" className="upload-dropzone__input" onChange={handleChange} />
        </label>
    );
};

export default UploadDropzone;