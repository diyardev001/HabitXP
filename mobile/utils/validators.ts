export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isSecurePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}

export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
}