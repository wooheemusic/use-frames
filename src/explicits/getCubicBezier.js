import cb from '../parametrics/cubicBezier';
import deduceFromParametric from '../tools/deduceFromParametric';

// CB and QB are parametric functions
// CB: T -> X x Y
// QB: T -> X x Y

// we actually use a curved sequence of y from a constant sequece of x matching a constant time-sequence.
// we have to derive explicit functions like F: X-> Y from parametric functions
// ref: https://en.wikipedia.org/wiki/Parametric_equation

export default function getCubicBezier(x1, y1, x2, y2) { 
    return deduceFromParametric(cb(x1, x2), cb(y1, y2))
}