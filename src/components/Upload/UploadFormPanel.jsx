import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadVideo } from "../../api/uploadApi";
import ThumbnailUpload from "./ThumbnailUpload";
import toast from "react-hot-toast";

const schema = z.object({
    title: z.string()
        .nonempty('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be at most 100 characters long'),
    description: z.string(),
    visibility: z.enum(['public', 'private'], { message: 'Visibility is required' }),
    // thumbnail: z.any(),
});

const UploadFormPanel = ({ setUploading, file }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: zodResolver(schema),
        defaultValues: {
            visibility: "public"
        }
    });

    const uploadVideoHandler = async (data) => {
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

    return (
        <form onSubmit={handleSubmit(uploadVideoHandler)}>
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
                    <button type="submit" className="btn btn--primary">Upload</button>
                </div>
            </div>
        </form>
    );
};

export default UploadFormPanel;