export const convertToFahrenheit = (value, unit) => {
    if (value === undefined || value === null || !unit) return value;

    let result;
    const lowerUnit = unit.toLowerCase();

    if (lowerUnit === 'celsius') {
        result = (value * 9/5) + 32;
    } else if (lowerUnit === 'kelvin') {
        result = (value - 273.15) * 9/5 + 32;
    } else if (lowerUnit === 'fahrenheit') {
        result = value;
    } else {
        return value; // Unrecognized unit
    }

    return Number(result.toFixed(2));
};

export const convertToCelsius = (value, unit) => {
    if (value === undefined || value === null || !unit) return value;

    let result;
    const lowerUnit = unit.toLowerCase();

    if (lowerUnit === 'fahrenheit') {
        result = (value - 32) * 5/9;
    } else if (lowerUnit === 'kelvin') {
        result = value - 273.15;
    } else if (lowerUnit === 'celsius') {
        result = value;
    } else {
        return value; // Unrecognized unit
    }

    return Number(result.toFixed(2));
};

export const convertFromFahrenheit = (valueInFahrenheit, targetUnit) => {
    if (valueInFahrenheit === undefined || valueInFahrenheit === null || !targetUnit) return valueInFahrenheit;

    let result;
    const lowerUnit = targetUnit.toLowerCase();

    if (lowerUnit === 'celsius') {
        result = (valueInFahrenheit - 32) * 5/9;
    } else if (lowerUnit === 'kelvin') {
        result = (valueInFahrenheit - 32) * 5/9 + 273.15;
    } else if (lowerUnit === 'fahrenheit') {
        result = valueInFahrenheit;
    } else {
        return valueInFahrenheit; // Unrecognized unit
    }

    return Number(result.toFixed(2));
};
