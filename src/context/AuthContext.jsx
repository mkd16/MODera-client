import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "../utils/accessTokenManager";
import { refreshToken } from "../api/authApi";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authStatus, setAuthStatus] = useState('checking');

    useEffect(() => {
        async function checkLoggedIn() {
            try {
                const res = await refreshToken();
                if (res && res.success) {
                    setCurrentUser(res.data.user)
                    setAccessToken(res.data.accessToken)
                    setAuthStatus('authenticated')
                } else {
                    setCurrentUser(null)
                    setAccessToken(null)
                    setAuthStatus('unauthenticated')
                }
            } catch (error) {
                setCurrentUser(null)
                setAccessToken(null)
                setAuthStatus('unauthenticated');
            }
        }

        checkLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            authStatus,
            setCurrentUser,
            setAuthStatus
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook .. for provider
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

// in custom hook declarations we can use other hooks
// otherwise we cannot use hook inside hook
// like you cannot access useState in useEffect