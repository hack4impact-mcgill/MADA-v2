
export function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

export function isValidPhone(phone: string) {
    const regex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    return regex.test(phone);
}