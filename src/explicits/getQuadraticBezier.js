
import qb, { sdqb } from '../parametrics/quadraticBezier';
import deduceFromParametric from '../tools/deduceFromParametric';

function getInverse(xa) {
    if (sdqb(xa)() === 0) {
        return x => x;
    } else {
        return function quadraticBezier(x) {
            return ((-2) * xa + Math.sqrt(4 * xa * xa + (4 - 8 * xa) * x)) / (2 - 4 * xa)
        }
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