export const convertToFahrenheit = (value, unit) => {
    console.log(value, unit);
    if (value === undefined || value === null || !unit) return value;

    let result;
    const lowerUnit = unit.toLowerCase();

    if (lowerUnit === 'celsius') {
        result = (Number(value) * 9/5) + 32;
    } else if (lowerUnit === 'kelvin') {
        result = (Number(value) - 273.15) * 9/5 + 32;
    } else if (lowerUnit === 'fahrenheit') {
        result = Number(value);
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
        result = (Number(value) - 32) * 5/9;
    } else if (lowerUnit === 'kelvin') {
        result = Number(value) - 273.15;
    } else if (lowerUnit === 'celsius') {
        result = Number(value);
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
        result = (Number(valueInFahrenheit) - 32) * 5/9;
    } else if (lowerUnit === 'kelvin') {
        result = (Number(valueInFahrenheit) - 32) * 5/9 + 273.15;
    } else if (lowerUnit === 'fahrenheit') {
        result = Number(valueInFahrenheit);
    } else {
        return valueInFahrenheit; // Unrecognized unit
    }

    return Number(result.toFixed(2));
};
