const MAX_CALL_STACK_SIZE = 10;
const PRECISION = 0.0000001;

// from 'bezier-easing'
// https://github.com/gre/bezier-easing/blob/master/src/index.js
// This is 5 times faster than my code on my machine.
export default function monteCarlo(pf, x, a, b, precision = PRECISION, maxIteration = MAX_CALL_STACK_SIZE) {
    let diff, mt, i = 0;
    do {
        mt = a + (b - a) / 2;
        diff = pf(mt) - x;
        if (diff > 0) {
            b = mt;
        } else {
            a = mt;
        }
    } while (Math.abs(diff) > precision && ++i < maxIteration);
    return mt;
}

// export default function monteCarlo(pf, x, a, b, precision = PRECISION, maxcall = MAX_CALL_STACK_SIZE, repeat = 1) {
//     const m = a + (b - a) / 2;
//     const diff = pf(m) - x;
//     if (diff === 0 || Math.abs(diff) < precision || repeat === maxcall) {
//         return m;
//     } else {
//         // if diff > 0, t is between a and m such that pf(t) = x
//         return diff > 0 ? monteCarlo(pf, x, a, m, precision, maxcall, ++repeat) : monteCarlo(pf, x, m, b, precision, maxcall, ++repeat)
//     }
// }