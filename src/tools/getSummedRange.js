function sum(Fs, x) {
    return Fs.reduce((accumulator, F) => (accumulator = accumulator + F(x)), 0)
}
export default function getSummedRange(n, ...Fs) {
    const Y = new Array(n + 1);
    const interval = 1 / n;
    let accumulator = 0;
    for (let i = 0; i <= n; i++) {
        Y[i] = sum(Fs, accumulator);
        accumulator += interval;
    }
    return Y;
}