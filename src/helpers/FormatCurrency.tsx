export const formatNumber = (value: number | string, decimals: number = 2): string => {
    // Convierte el valor a número si es un string válido que representa un número
    const numericValue: number = typeof value === 'string' ? parseFloat(value) : Number(value);

    if (isNaN(numericValue)) {
        throw new Error('El valor proporcionado no es un número válido.');
    }

    // Decide si se debe formatear como decimal o entero
    const formattedValue = Number.isInteger(numericValue)
        ? numericValue.toLocaleString()
        : numericValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
};
