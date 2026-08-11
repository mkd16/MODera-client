import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/accessTokenManager";
import { logout, refreshToken } from "./authApi";

let isRefreshing = false
let retryQueue = []

export const api = axios.create({
    baseURL: import.meta.env.VITE_PROXY_API_URL,
    withCredentials: true,
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
        return response.data
    },
    async (error) => {
        if (error?.response?.status == 401 && error?.response?.config.url != '/auth/refresh') {
            if (error?.response?.config.retried) {
                // already tried once
                await logout()
                throw error
            }

            if (isRefreshing) {
                // insert in queue
                await new Promise((resolve, reject) => {
                    retryQueue.push({ resolve, reject })
                })
                error.response.config.retried = true
                return api(error?.response?.config)
            } else {
                // refresh logic
                isRefreshing = true

                try {
                    const res = await refreshToken()
                    if (res && res.success) {
                        setAccessToken(res.data.accessToken)
                        error.response.config.retried = true

                        // wake up all waiting requests
                        retryQueue.forEach(({ resolve }) => resolve())
                        retryQueue = []

                        return await api(error?.response?.config)
                    }

                    // failed to refresh
                    retryQueue.forEach(({ reject }) => reject(error))
                    retryQueue = []
                    return await logout()
                } catch (error) {
                    retryQueue.forEach(({ reject }) => reject(error))
                    retryQueue = []
                    return await logout()
                } finally {
                    isRefreshing = false;
                }
            }
        }

        throw {
            status: error?.response?.status,
            message: error?.response?.data?.message || "Something went wrong",
        }
    }
)


// error format
// {
//   "message": "Request failed with status code 401",
//   "name": "AxiosError",
//   "stack": "AxiosError: Request failed with status code 401\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=85ca8ba2:1725:14)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=85ca8ba2:2077:4)",
//   "config": {
//     "transitional": {
//       "silentJSONParsing": true,
//       "forcedJSONParsing": true,
//       "clarifyTimeoutError": false,
//       "legacyInterceptorReqResOrdering": true
//     },
//     "adapter": [
//       "xhr",
//       "http",
//       "fetch"
//     ],
//     "transformRequest": [
//       null
//     ],
//     "transformResponse": [
//       null
//     ],
//     "timeout": 0,
//     "xsrfCookieName": "XSRF-TOKEN",
//     "xsrfHeaderName": "X-XSRF-TOKEN",
//     "maxContentLength": -1,
//     "maxBodyLength": -1,
//     "env": {},
//     "headers": {
//       "Accept": "application/json, text/plain, */*",
//       "Content-Type": "application/json"
//     },
//     "baseURL": "http://localhost:9000/api/v1",
//     "withCredentials": true,
//     "method": "post",
//     "url": "/auth/refresh",
//     "allowAbsoluteUrls": true
//   },
//   "code": "ERR_BAD_REQUEST",
//   "status": 401
// }