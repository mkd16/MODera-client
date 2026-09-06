import axios from "axios";
import { api } from "./axios";

export function uploadVideo (data) {
    return api.post("/upload", data)
}

export function clientSideVideoUpload (data) {
    return api.post('/upload/client', data)
}

export function completeUpload (data) {
    return api.post('/upload/complete', data)
}

export function multipartUpload (data) {
    return api.post("/upload/multipart", data)
}

export function getPresignedUploadUrl (data) {
    return api.post('/upload/getPresignedUrlBatch', data)
}

// RAW HTTP REQUESTS INSTEAD OF WRAPPER------------------------------------
export function uploadVideoToS3 (presignedURL, video) {
    return axios.put(presignedURL, video, {
        headers: {
            "Content-Type": video.type,
        },
    });
}

export function uploadChunkToS3 (presignedURL, chunk) {
    return axios.put(presignedURL, chunk, {
        headers: {
            "Content-Type": ''
        }
    })
}