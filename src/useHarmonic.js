import { useMemo } from 'react';
import useCurve from './useCurve';
import getHarmonic from './explicits/getHarmonic';

export default function useHarmonic(n, hOptions, fOptions) {
    const harmonic = useMemo(() => getHarmonic(hOptions), [])
    return useCurve(n, harmonic, fOptions);
}