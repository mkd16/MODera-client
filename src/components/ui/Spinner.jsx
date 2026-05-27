import { ClipLoader } from "react-spinners"; 1

export function Spinner() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-m">
            <div className="flex flex-col items-center gap-4">
                <ClipLoader
                    color="#111827"
                    size={60}
                    speedMultiplier={1}
                    cssOverride={{
                        borderWidth: "2px",
                    }}
                />
            </div>
        </div>
    )
}

export function MiniSpinner() {
    return (
        <svg className="spinner" viewBox="0 0 24 24">
            <circle className="spinner-track" cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
            <circle className="spinner-head" cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
        </svg>
    )
}