import { useMemo } from 'react';
import useCurve from './useCurve';
import builtIn from './explicits/getCubicBezier';

// n is the number of frames
export default function useCubicBezier(n, x1, y1, x2, y2, { getCubicBezier, ...options } = {}) {
    const cubicBezier = useMemo(() => (getCubicBezier || builtIn)(x1, y1, x2, y2), [])
    return useCurve(n, cubicBezier, options);
}