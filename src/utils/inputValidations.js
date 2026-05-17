import { MESSAGES } from "./messages"

export function validateEmail(val) {
    if(!val) {
        return (MESSAGES.email_required)
    } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(val)) {
        return (MESSAGES.email_invalid)
    }
    return ""
}

export function validateRequired(val, fieldName) {
    if(!val) {
        return (`${fieldName} ${MESSAGES.password_required}`)
    }
    return ""
}