import { api } from "./axios";

export function fetchVideos() {
    return api.get("/videos")
}

export function fetchVideo(id) {
    return api.get(`/videos/${id}`)
}