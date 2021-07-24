import getRange from './getRange';
import monteCarlo from '../methods/monteCarlo';

const INTERVALS_DEFAULT = 10;
const PRECISION_DEFAULT = 0.0000001;

// Newton's method is NOT applied YET.
// I need to study the javascript numerical precision.

// parametric to explicit
// pfx: [0, 1] -> [0, 1], increasing <---------- important
// pfy: [0, 1] -> R
// pfx and pfy should start from (0,0) and end to (1,1) to be used as a unit of motions 
export default function deduceFromParametric(pfx, pfy, intervals = INTERVALS_DEFAULT, precision = PRECISION_DEFAULT) {

    const curvyRangeX = getRange(intervals, pfx); // [ pfx(0), ..., pfx(1)], its length is intervals + 1
    const domainT = getRange(intervals, x => x);

    return function deduced(x) {
        let i = intervals; // intervals === curvyRangeX.length - 1
        for (let j = 1; j < curvyRangeX.length; j++) {
            if (curvyRangeX[j] >= x) {
                i = j;
                break;
            }
        }
        return pfy(monteCarlo(pfx, x, domainT[i - 1], domainT[i], precision));
    }
}