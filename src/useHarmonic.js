import { useMemo } from 'react';
import useCurve from './useCurve';
import getHarmonic from './explicits/getHarmonic';

// { damping: c = 1000, stiffness: k = 110, mass: m = 15, initPosition: d0 = 1, initSpeed: v0 = 0, halfPeriods: hp = 0 }
export default function useCubicBezier(n, hOptions, fOptions) {
    const harmonic = useMemo(() => getHarmonic(hOptions), [])
    return useCurve(n, harmonic, fOptions);
}