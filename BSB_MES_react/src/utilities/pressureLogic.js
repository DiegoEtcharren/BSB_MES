export const calculatePressureLimits = (nominal, rules) => {
    if (!rules || !Array.isArray(rules)) {
        return { min: nominal, max: nominal, error: "Invalid rules" };
    }

    const rule = rules.find(r => {
        if (r.operator === '<=') return nominal <= r.threshold;
        if (r.operator === '>') return nominal > r.threshold;
        return false;
    });

    if (!rule) {
        console.error(`MES Logic Error: No rule found for nominal pressure: ${nominal}`);
        return { min: nominal, max: nominal };
    }

    const min = (nominal * rule.lower_bound.multiplier) + rule.lower_bound.offset;
    const max = (nominal * rule.upper_bound.multiplier) + rule.upper_bound.offset;

    return {
        min: Number(min.toFixed(2)),
        max: Number(max.toFixed(2)),
        ruleThreshold: rule.threshold,
        ruleOperator: rule.operator
    };
}