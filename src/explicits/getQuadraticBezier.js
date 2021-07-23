
import qb from '../parametrics/quadraticBezier';
import deduceFromParametric from '../tools/deduceFromParametric';

function getInverse(xa) {
    if ( xa === 0.5) {
        return x => x;
    } else {
        const base = 1 - 2 * xa; 
        const rbase = Math.sqrt(base);
        const A = xa * xa / base;
        const rA = Math.sqrt(A);
        return x => (Math.sqrt(A + x) - rA) / rbase
    }
}

export function getNumericalQuadraticBezier(x, y) { 
    return deduceFromParametric(qb(x), qb(y))
}

// The inverse function of quadratic bezier is much faster than numerical methods
export default function getQuadraticBezier(xa, ya) {
    let iqb = getInverse(xa);
    const qby = qb(ya);
    return function (x) {
        return qby(iqb(x))
    }
}