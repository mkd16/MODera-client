import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSideVideoUpload, completeUpload, getPresignedUploadUrl, multipartUpload, uploadVideo, uploadVideoToS3 } from "../../api/uploadApi";
import ThumbnailUpload from "./ThumbnailUpload";
import toast from "react-hot-toast";
import { uploadChunksInBatch } from "../../utils/uploadChunks";

const schema = z.object({
    title: z.string()
        .nonempty('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be at most 100 characters long'),
    description: z.string(),
    visibility: z.enum(['public', 'private'], { message: 'Visibility is required' }),
    // thumbnail: z.any(),
});

const UploadFormPanel = ({ setUploading, file, isUploading, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: zodResolver(schema),
        defaultValues: {
            visibility: "public"
        }
    });

    const serverUploadVideoHandler = async (data) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("video", file)
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })
            const res = await uploadVideo(formData)
            if (res && res.success) {
                toast.success("Video uploaded successfully")
            }
        } catch (error) {
            toast.error(error?.message || "Failed to upload video")
        } finally {
            setUploading(false)
        }
    }

    const clientUploadVideoHandler = async (data) => {
        setUploading(true);
        try {
            let fileData = {
                name: file.name,
                size: file.size,
                mimetype: file.type
            }
            let uploadData = { ...data, fileData };

            const res = await clientSideVideoUpload(uploadData);

            if (res && res.success) {
                if (res.data && res.data.videoId && res.data.presignedURL) {
                    await uploadToS3(res.data);
                } else {
                    setUploading(false);
                    toast.error("Something went wrong. Please try again.")
                }
            }
        } catch (error) {
            setUploading(false)
            toast.error(error?.message || "Failed to upload video")
        }
    }

    const uploadToS3 = async (data) => {
        try {
            await uploadVideoToS3(data.presignedURL, file)
            const res = await completeUpload({ videoId: data.videoId })

            if (res && res.success) {
                toast.success(res?.message ?? "Video uploaded successfully !!")
            } else {
                toast.error(res?.message ?? "Something went wrong. Please try again.")
            }
        } catch (error) {
            toast.error(error?.message || "Failed to upload video")
        } finally {
            setUploading(false);
        }
    }

    const multipartUploadHandler = async (data) => {
        try {
            setUploading(true)
            let fileData = {
                name: file.name,
                size: file.size,
                mimetype: file.type
            }
            let uploadData = { ...data, fileData }

            const res = await multipartUpload(uploadData)

            if (res && res.success) {
                const { partSize, sessionId, videoId, totalParts } = res.data
                const uploadContext = {
                    partSize,
                    totalParts,
                    sessionId,
                    videoId,
                }
                const uploaded = await createAndUploadChunks(uploadContext)
                if (uploaded) {
                    closeModal()
                }
            }
        } catch (error) {
            toast.error(error?.message || "Multipart upload failed")
        } finally {
            setUploading(false)
        }
    }

    const createAndUploadChunks = async (uploadContext) => {
        const { videoId, sessionId, totalParts, partSize } = uploadContext
        for (let index = 1; index <= totalParts; index += 10) {
            const range = [...Array(Math.min(index + 10, totalParts + 1) - index).keys()].map(i => i + index)
            const data = { range, videoId, sessionId }
            let urlBatch = await getPresignedUploadUrl(data)
            await uploadChunksInBatch(file, urlBatch.data, partSize)
        }
        let incompleteUpload = true
        let pendingUploads = []
        let retry = 0
        const MAX_RETRIES = 5

        while (incompleteUpload && retry < MAX_RETRIES) {
            if (pendingUploads && pendingUploads.length > 0) {
                await uploadChunksInBatch(file, pendingUploads, partSize)
                pendingUploads = []
                incompleteUpload = true

                await new Promise(resolve => setTimeout(resolve, 1000))          // add a timeout so that uploaded parts can be synced in s3 for list parts
            } else {
                const res = await completeUpload({ sessionId, videoId });
                if (res && res.success && res.data?.length <= 0) {
                    incompleteUpload = false
                    toast.success("File Uploaded Successfully !!")
                } else {
                    incompleteUpload = true
                    pendingUploads = res.data
                    retry++;
                }
            }
        }

        if (incompleteUpload) {
            toast.error("Upload incomplete. Please check your connection or retry later.")
            return false
        }
        return true
    }

    return (
        <form onSubmit={handleSubmit(multipartUploadHandler)}>
            <div className="upload-form-panel">
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title<span className="form-label__required">*</span></label>
                    <input id="title" type="text" {...register('title')} className="form-input" placeholder="Add a title that describes your video" />
                    <p className="form-error">{errors.title?.message}</p>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea id="description" {...register('description')} className="form-input form-textarea" rows={5} placeholder="Tell viewers about your video" />
                    <p className="form-error">{errors.description?.message}</p>
                </div>

                {/* <ThumbnailUpload /> */}

                <div className="form-group">
                    <label className="form-label" htmlFor="visibility">Visibility<span className="form-label__required">*</span></label>
                    <select id="visibility" {...register('visibility')} className="form-input">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <p className="form-error">{errors.visibility?.message}</p>
                </div>

                <div className="upload-form-panel__actions">
                    {/* <button type="button" className="btn btn--secondary">Save as draft</button> */}
                    <button disabled={isUploading} type="submit" className="btn btn--primary">Upload</button>
                </div>
            </div>
        </form>
    );
};

export default UploadFormPanel;