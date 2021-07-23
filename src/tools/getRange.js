// Get the range from the even points on the domain [0, 1]
// An array of n + 1 length appears as n intervals or n frames.
export default function getRange(n, fs) {
    const Y = new Array(n + 1);
    const interval = 1 / n;
    let accumulator = 0;
    for (let i = 0; i <= n; i++) {
        Y[i] = fs(accumulator);
        accumulator += interval;
    }
    return Y;
}
