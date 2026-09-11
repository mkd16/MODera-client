import { MESSAGES } from "./messages"

export const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
export const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"];
export const ACCEPTED_THUMBNAIL_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function validateVideoFile(file) {
    if (file.size > MAX_VIDEO_SIZE) {
        return (`Video file size exceeds the maximum limit of ${MAX_VIDEO_SIZE / 1024 / 1024} MB`);
    }
    // Allow empty file.type (common on mobile file pickers) — server validates strictly
    if (file.type && !ACCEPTED_VIDEO_TYPES.includes(file.type)) {
        return (`Video file type is not supported. Please upload a video file of type ${ACCEPTED_VIDEO_TYPES.join(", ")}`);
    }
    return "";
}

export function validateThumbnail(file) {
    if (file.size > MAX_THUMBNAIL_SIZE) {
        return (`Thumbnail file size exceeds the maximum limit of ${MAX_THUMBNAIL_SIZE / 1024 / 1024} MB`);
    }
    if (file.type && !ACCEPTED_THUMBNAIL_TYPES.includes(file.type)) {
        return (`Thumbnail file type is not supported. Please upload a thumbnail file of type ${ACCEPTED_THUMBNAIL_TYPES.join(", ")}`);
    }
    return "";
}

export function validateEmail(val) {
    if (!val) {
        return (MESSAGES.email_required)
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(val)) {
        return (MESSAGES.email_invalid)
    }
    return ""
}

export function validateRequired(val, fieldName) {
    if (!val) {
        return (`${fieldName} ${MESSAGES.password_required}`)
    }
    return ""
}