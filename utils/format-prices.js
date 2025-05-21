
export function formatPrice(num) {
    if (Math.abs(num) >= 1.0e+12)
        return (num / 1.0e+12).toFixed(1) + "T";
    if (Math.abs(num) >= 1.0e+9)
        return (num / 1.0e+9).toFixed(1) + "B";
    if (Math.abs(num) >= 1.0e+6)
        return (num / 1.0e+6).toFixed(1) + "M";
    if (Math.abs(num) >= 1.0e+3)
        return (num / 1.0e+3).toFixed(1) + "K";
}

const num = 734500;
const formatted = formatPrice(num);
console.log(formatted)


