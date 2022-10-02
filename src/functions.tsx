export const getValue = (value: number, minValue: number, maxValue: number): number => {
    if (value >= minValue) {
        if (value <= maxValue) {
            return value;
        } else {
            return maxValue;
        }
    } else {
        return minValue;
    }
}