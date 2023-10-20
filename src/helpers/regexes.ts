export function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
}

// Formato NIT: ("123456-2" || "123456")
// MIN DE 6 DIGITOS. VÁLIDO TERMINAR CON GUION Y UN NÚMERO. TAMBIÉN VÁLIDO QUE NO TENGA GUION.
export function isValidNit(nit: string) {
    return /^\d{5,12}-?\d$/.test(nit);
}

export function isNumberNotNegative(number: any) {
    return /^0+|[^0-9]/g.test(number);
}