export function MiniSpinner({ size = 16 }) {
    return (
        <svg className="spinner" viewBox="0 0 24 24" style={{ width: size, height: size }}>
            <circle className="spinner-track" cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
            <circle className="spinner-head" cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
        </svg>
    )
}

export function Spinner() {
    return (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/10 backdrop-blur-sm"
            style={{ color: 'var(--primary)', '--spinner-track-color': 'var(--border)' }}
        >
            <MiniSpinner size={48} />
        </div>
    )
}
