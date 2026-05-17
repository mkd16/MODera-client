import { ClipLoader } from "react-spinners";1

export default function Spinner() {
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