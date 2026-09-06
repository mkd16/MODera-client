import { useState } from "react";
import UploadDropzone from "../Upload/UploadDropzone";
import UploadFormPanel from "../Upload/UploadFormPanel";
import UploadPreviewPanel from "../Upload/UploadPreviewPanel";
import { Spinner } from "../ui/Spinner";
import { CloseIcon } from "../icons/icons";

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
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="upload-modal__body">
                        {selectedFile ? (
                            <div className="upload-split">
                                <UploadFormPanel setUploading={setUploading} isUploading={uploading} file={selectedFile} closeModal={onClose} />
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