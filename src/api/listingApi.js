import { api } from "./axios";

export function fetchVideos() {
    return api.get("/videos")
}