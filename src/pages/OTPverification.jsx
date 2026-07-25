import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayIcon } from "../components/icons/icons";
import { MiniSpinner } from "../components/ui/Spinner.jsx";
import { resendOtp, verifyOtp } from "../api/authApi.js";
import { setAccessToken } from "../utils/accessTokenManager.js";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function OTPVerification() {
    const [searchParams] = useSearchParams();
    const { setCurrentUser, setAuthStatus } = useAuth();
    const email = searchParams.get("email");

    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(60);

    const inputRefs = useRef([]);

    // Countdown timer for resend
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Auto-focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    if (!email) {
        // 404 handling
        return
    }

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace") {
            // If current input is empty, move to previous
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
        // Handle left/right arrow keys
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);

        if (!/^\d+$/.test(pasteData)) return;

        const newOtp = pasteData.split("").concat(Array(6).fill("")).slice(0, 6);
        setOtp(newOtp);
        setError("");

        // Focus last filled input or last input
        const lastFilledIndex = Math.min(pasteData.length, 5);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    const verifyOTPHandler = async () => {
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await verifyOtp({ email, otp: otpValue })

            if (res && res.success) {
                setError("")
                setAccessToken(res?.data?.accessToken)
                setCurrentUser(res?.data?.user)
                setAuthStatus("authenticated")
                toast.success("Success! Your account has been verified.")
                navigate("/")
            }
        } catch (error) {
            if (error.status < 500) {
                toast.error(error?.message || "Something went wrong. Please try again.")
            } else {
                toast.error('Internal Server Error. Please try again later.')
            }
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        if (resendCooldown > 0) return;

        setLoading(true);
        setError("");

        try {
            const res = await resendOtp({ email })

            if (res && res.success) {
                toast.success("Success! Verification code has been resent.")
            }
            setResendCooldown(60);
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch (err) {
            toast.error(err?.message || "Failed to resend code. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">

            {/* ── Left cover panel ───────────────────── */}
            <div className="auth-cover">
                <div className="auth-cover-logo">
                    <div className="auth-cover-logo-icon">
                        <PlayIcon />
                    </div>
                    <span className="auth-cover-logo-text">MODera</span>
                </div>

                <div className="auth-cover-body">
                    <h2>Almost there!</h2>
                    <p>
                        We've sent a verification code to your email.
                        Enter it to complete your registration.
                    </p>
                </div>

                <span className="auth-cover-footer">
                    © {new Date().getFullYear()} MODera. All rights reserved.
                </span>
            </div>

            {/* ── Right form panel ───────────────────── */}
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
                        <h1>Verify your email</h1>
                        <p>
                            We sent a verification code to <strong>{email}</strong>
                        </p>
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div className="alert alert--error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* OTP Input */}
                    <div className="otp-container">
                        <label className="otp-label">Enter verification code</label>
                        <div className="otp-input-group">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`otp-input ${error ? "otp-input--error" : ""}`}
                                    disabled={loading}
                                    aria-label={`Digit ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Verify button */}
                    <button
                        onClick={verifyOTPHandler}
                        disabled={loading || otp.join("").length !== 6}
                        className="btn btn--primary btn--md btn--full"
                    >
                        {loading ? (
                            <span className="btn-loading">
                                <MiniSpinner />
                                Verifying...
                            </span>
                        ) : "Verify Email"}
                    </button>

                    {/* Resend section */}
                    <div className="otp-resend">
                        <p className="text-center" style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                            Didn't receive the code?{" "}
                            {resendCooldown > 0 ? (
                                <span style={{ color: "var(--text-muted)" }}>
                                    Resend in {resendCooldown}s
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={resendOTP}
                                    disabled={loading}
                                    className="text-primary hyperlink-text"
                                    style={{
                                        cursor: loading ? "not-allowed" : "pointer",
                                        opacity: loading ? 0.6 : 1
                                    }}
                                >
                                    Resend code
                                </button>
                            )}
                        </p>
                    </div>

                    {/* Back to login */}
                    <p className="auth-footer-text">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-primary hyperlink-text"
                        >
                            ← Back to login
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
}