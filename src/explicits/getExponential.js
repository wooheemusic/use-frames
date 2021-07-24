
export default function getExponential(base = Math.exp(1)) {
    const scaler = base - 1;
    return function (exponent) {
        return (Math.pow(base, exponent) - 1) / scaler;
    }
}

