import { useEffect } from "react"
import { healthCheck } from "../api/authApi"

export function Profile() {

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await Promise.all([
                    healthCheck(),
                    healthCheck(),
                    healthCheck(),
                    healthCheck()
                ])
            } catch (error) {
                console.log('eeeeeeeeee', error)
            }
        }

        getProfile()
    }, [])

    return (
        <>
            <h1>Profile Page</h1>
        </>
    )
}