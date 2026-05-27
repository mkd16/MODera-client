import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Spinner } from "../components/ui/Spinner.jsx"

export function ProtectedRoute() {
    const { authStatus } = useAuth()
    return (
        authStatus == 'authenticated' ? <Outlet /> : (authStatus == 'unauthenticated' ? <Navigate to="/login" replace /> : <Spinner />)
    )
}

export function ProtectedLogin() {
    const { authStatus } = useAuth()
    return (
        authStatus == 'authenticated' ? <Navigate to="/" replace /> : (authStatus == 'unauthenticated' ? <Outlet /> : <Spinner />)
    )
}