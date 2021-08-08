
import { useMemo } from 'react';
import useCurve from './useCurve';
import { getHarmonicForUnit } from './explicits/getHarmonic';

export default function useHarmonicForUnit(n, hOptions, fOptions) {
    const harmonic = useMemo(() => getHarmonicForUnit(hOptions), [])
    return useCurve(n, harmonic, fOptions);
}