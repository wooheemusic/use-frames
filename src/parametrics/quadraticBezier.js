// quadratic-bezier QB
// QB: t -> (x, y) for given A, B, C
// This code is scaled to 1 such that A is (0, 0) and C is (1, 1);
// QBx: t -> qb(t, Bx); // B is (Bx, By)
// QBy: t -> qb(t, By);
// QB: t ->(qb(t, Bx), qb(t, By));
function qb(b) {
    return t => ((1 - 2 * b) * t + 2 * b) * t;
}

// the derivative of QB
function dqb(b) {
    return t => (2 - 4 * b) * t + 2 * b;
}

function sdqb(b) {
    return () => 2 - 4 * b;
}

export { dqb, sdqb };

export default qb;