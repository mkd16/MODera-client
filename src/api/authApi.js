import { api } from "./axios.js";

export function refreshToken() {
    return api.post("/auth/refresh")
}

export function login({ email, password }) {
    return api.post("/auth/login", { email, password })
}

export function register({ username, password, name, email }) {
    return api.post("/auth/register", { username, password, name, email })
}

export function logout() {
    return api.post("/auth/logout")
}

export function healthCheck() {
    return api.get("/health")
}

export function verifyOtp({ email, otp }) {
    return api.post("/auth/verify", { email, otp })
}

export function resendOtp({ email }) {
    return api.post("/auth/resend-otp", { email })
}