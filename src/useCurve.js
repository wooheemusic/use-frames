import { useMemo } from 'react';

import useFrames from './useFrames';
import getRange from './tools/getRange';
import getSummedRange from './tools/getSummedRange';

// n is the number of frames
export default function useCurve(n = 60, fs = x => x, _options) {
    const range = useMemo(() => {
        if (typeof fs === 'function') return getRange(n, fs);
        if (Array.isArray(fs) && typeof fs[0] === 'function') return getSummedRange(n, ...fs);
        throw new Error('useCurve requires the second argument of a function or an array of functions')
    }, []);
    const options = useMemo(() => {
        const { range: _, ...rest } = (typeof _options === 'function' ? _options() : _options) || {}; // range in _options is ignored.
        return { range, ...rest }
    }, [])
    return useFrames(options);
}