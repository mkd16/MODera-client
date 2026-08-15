import axios from "axios";
import { api } from "./axios";

export function uploadVideo(data) {
    return api.post("/upload", data)
}

export function clientSideVideoUpload(data) {
    return api.post('/upload/client', data)
}

export function completeUpload(data) {
    return api.post('/upload/complete', data)
}

export function uploadVideoToS3(presignedURL, video) {
    return axios.put(presignedURL, video, {
        headers: {
            "Content-Type": video.type,
        },
    });
}