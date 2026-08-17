import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icons/icons"

export default function PasswordField({
    label,
    value,
    onChange,
    error,
    disabled,
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <label className="form-label">
                {label}
                {required && <span className="required-star">*</span>}
            </label>

            <div className="input-password-wrap">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={`Enter your ${label}`}
                    className={`form-input ${error ? "form-input--error" : ""}`}
                />
                <button
                    type="button"
                    className="input-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={disabled}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>

            <span className="form-error-msg">
                {error}
            </span>
        </div>
    );
}