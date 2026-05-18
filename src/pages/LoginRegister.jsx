import { useEffect, useState } from "react";
import InputField from "../components/inputs/InputField.jsx";
import PasswordField from "../components/inputs/PasswordField.jsx";
import { PlayIcon, GoogleIcon, IButton } from "../components/icons/icons.jsx";
import { validateEmail, validateRequired } from "../utils/inputValidations.js";
import { setAccessToken } from "../utils/accessTokenManager.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner.jsx";
import { login, register } from "../api/authApi.js";

export default function Login() {
    const navigate = useNavigate();
    const currentURL = useLocation();
    const loginPage = currentURL.pathname === "/login"
    const { setAuthStatus, setCurrentUser } = useAuth()

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUserNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName("")
        setUsername("")
        setEmail("")
        setPassword("")
        setNameError("")
        setUserNameError("")
        setEmailError("")
        setPasswordError("")
        setLoginError("")
    }, [currentURL])

    const loginHandler = async () => {
        const errorEmail = validateEmail(email)
        const errorPassword = validateRequired(password, "Password")
        setEmailError(errorEmail)
        setPasswordError(errorPassword)
        if(errorEmail || errorPassword) return

        setLoading(true);

        try {
            const res = await login({email, password})

            if (res && res.success) {
                setAuthStatus("authenticated")
                setCurrentUser(res.data)
                setAccessToken(res.data.accessToken)
                setLoginError("")
                setName("")
                setUsername("")
                setEmail("")
                setPassword("")
                navigate("/")
            }
        } catch (error) {
            if (error.status < 500) {
                setLoginError(error.response.data.message)
            } else {
                setLoginError('Internal Server Error. Please try again later.')
            }
            setAuthStatus("unauthenticated")
            setCurrentUser(null)
            setAccessToken(null)
        } finally {
            setLoading(false)
        }
    };

    const registerHandler = async () => {
        const errorName = validateRequired(name, "Name")
        const errorUsername = validateRequired(username, "Username")
        const errorEmail = validateEmail(email)
        const errorPassword = validateRequired(password, "Password")
        setEmailError(errorEmail)
        setPasswordError(errorPassword)
        setNameError(errorName)
        setUserNameError(errorUsername)
        if(errorName || errorUsername || errorEmail || errorPassword) return

        setLoading(true);
        try {
            const res = await register({username, password, name, email})

            if (res && res.success) {
                setAuthStatus("authenticated")
                setCurrentUser(res.data)
                setAccessToken(res.data.accessToken)
                setLoginError("")
                setName("")
                setUsername("")
                setEmail("")
                setPassword("")
                navigate("/")
            }
        } catch (error) {
            if (error.status < 500) {
                setLoginError(error.response.data.message)
            } else {
                setLoginError('Internal Server Error. Please try again later.')
            }
            setAuthStatus("unauthenticated")
            setCurrentUser(null)
            setAccessToken(null)
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            { loading && <Spinner /> } 

            <div className="auth-wrapper">

                {/* ── Left cover ─────────────────────── */}
                <div className="auth-cover">
                    <div className="auth-cover-logo">
                        <div className="auth-cover-logo-icon">
                            <PlayIcon />
                        </div>
                        <span className="auth-cover-logo-text">MODera</span>
                    </div>

                    <div className="auth-cover-body">
                        <h2>Watch what<br />moves you.</h2>
                        <p>
                            Discover videos, creators and communities
                            built around your interests.
                        </p>
                    </div>

                    <span className="auth-cover-footer">
                        © {new Date().getFullYear()} MODera. All rights reserved.
                    </span>
                </div>

                {/* ── Right form panel ───────────────── */}
                <div className="auth-form-panel">
                    <div className="auth-card">

                        {/* Mobile logo */}
                        <div className="auth-mobile-logo">
                            <div className="auth-mobile-logo-icon">
                                <PlayIcon />
                            </div>
                            <span className="auth-mobile-logo-text">MODera</span>
                        </div>

                        {/* Heading */}
                        <div className="auth-heading">
                            { loginPage ? (<h1>Welcome back! 👋</h1>) : (<h1>Welcome aboard! 🚀</h1>) }
                            <p>Please { loginPage ? 'sign in to' : 'create ' } your account and start watching</p>
                        </div>

                        {/* Error banner */}
                        {loginError && (
                            <div className="alert alert--error">
                                <IButton />
                                {loginError}
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                loginPage ? loginHandler() : registerHandler()
                            }}
                            className="form-fields"
                            noValidate
                        >
                            { !loginPage 
                                && 
                                <InputField
                                    label="Name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setName(value)
                                        setNameError(validateRequired(value, "Name"))
                                    }}
                                    error={nameError}
                                    required
                                />
                            }

                            { !loginPage 
                                && 
                                <InputField
                                    label="Username"
                                    type="username"
                                    value={username}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setUsername(value)
                                        setUserNameError(validateRequired(value, "Username"))
                                    }}
                                    error={usernameError}
                                    required
                                />
                            }

                            <InputField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setEmail(value)
                                    setEmailError(validateEmail(value))
                                }}
                                error={emailError}
                                required
                            />

                            <PasswordField
                                label="Password"
                                value={password}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPassword(value)
                                    setPasswordError(validateRequired(value, "Password"))
                                }}
                                error={passwordError}
                                required
                            />

                            {/* Forgot password */}
                            { loginPage ? (
                                <div className="form-row">
                                    <Link to="/forgot-password" className="btn-ghost text-brand text-xs">
                                        Forgot Password?
                                    </Link>
                                </div>
                            ) : <div className="form-row"></div> }

                            <button
                                type="submit"
                                className="btn btn--brand btn--md btn--full"
                            >
                                { loginPage ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider">or</div>

                        {/* Google */}
                        <button
                            type="button"
                            className="btn btn--outlined btn--md btn--full"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        {/* Register link */}
                        <p className="auth-footer-text">
                            { loginPage ? 'New on our platform?' : 'Already have an account?'}{" "}
                            { loginPage 
                                ? 
                                <Link to='/register' className="text-brand" style={{ background: "none", border: "none", fontFamily: "inherit", fontWeight: 500 }}>{ 'Create an account' }</Link> 
                                : 
                                <Link to='/login' className="text-brand" style={{ background: "none", border: "none", fontFamily: "inherit", fontWeight: 500 }}>{ 'Sign In' }</Link>
                            }
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
}