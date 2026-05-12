export const convertToPSI = (value, multiplier) => {
    if (value === undefined || value === null || !multiplier) return value;
    return value * multiplier;
};

export const convertFromPSI = (valueInPSI, multiplier) => {
    if (valueInPSI === undefined || valueInPSI === null || !multiplier) return valueInPSI;
    return valueInPSI / multiplier;
};
