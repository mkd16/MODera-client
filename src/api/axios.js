import axios from "axios";
import { getAccessToken } from "../utils/accessTokenManager";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        console.log(response, '++++++++++++++++++++++++++++++++')
        return response.data
    },
    (error) => {
        console.log(error, '----------------------------------')
        console.log(error.status)
        console.log(error.response)
        throw error
    }
)