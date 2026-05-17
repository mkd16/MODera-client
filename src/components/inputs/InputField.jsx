export default function InputField({
    label,
    value,
    type = "text",
    onChange,
    error,
    disabled,
    required = false,
}) {
    return (
        <div className="form-group">
            <label className="form-label">
                {label}
                {required && <span className="required-star">*</span>}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={`Enter your ${label}`}
                className={`form-input ${error ? "form-input--error" : ""}`}
            />

            {error && (
                <span className="form-error-msg">
                    {error}
                </span>
            )}
        </div>
    );
}