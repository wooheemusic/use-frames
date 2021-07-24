
export default function getExponential(base = Math.exp(1)) {
    const scaler = base - 1;
    return function (x) {
        return (base ** x - 1) / scaler;
    }
}

