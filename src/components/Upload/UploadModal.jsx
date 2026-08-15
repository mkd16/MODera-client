import { useState } from "react";
import UploadDropzone from "../Upload/UploadDropzone";
import UploadFormPanel from "../Upload/UploadFormPanel";
import UploadPreviewPanel from "../Upload/UploadPreviewPanel";
import { Spinner } from "../ui/Spinner";

const UploadModal = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    return (
        <>
            {uploading && <Spinner />}
            <div className="upload-modal-overlay">
                <div className="upload-modal">
                    <div className="upload-modal__header">
                        <h2 className="upload-modal__title">Upload Video</h2>
                        <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="upload-modal__body">
                        {selectedFile ? (
                            <div className="upload-split">
                                <UploadFormPanel setUploading={setUploading} isUploading={uploading} file={selectedFile} />
                                <UploadPreviewPanel file={selectedFile} />
                            </div>
                        ) : (
                            <UploadDropzone onFileSelect={setSelectedFile} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadModal;