// cubic-bezier CB
// CB: t -> (x, y) for given A, B, C, D
// This code is scaled to 1 such that A is (0, 0) and D is (1, 1);
// CBx: t -> cb(t, Bx, Cx); // B is (Bx, By)
// CBy: t -> cb(t, By, Cy); 
// CB: t -> (cb(t, Bx, Cx), cb(t, By, Cy));
function cb(b, c) {
    return t => (((3 * (b - c) + 1) * t + 3 * c - 6 * b) * t + 3 * b) * t;
}
// the derivative of cb
function dcb(b, c) {
    return t => ((9 * (b - c) + 3) * t + 6 * c - 12 * b) * t + 3 * b;
}

// the second derivative of cb
function sdcv(b, c) {
    return t => (18 * (b + c) + 6) * t + 6 * c - 12 * b;
}

export { dcb, sdcv };

export default cb;