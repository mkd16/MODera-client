import { api } from "./axios";

export function uploadVideo(data) {
    return api.post("/upload", data)
}