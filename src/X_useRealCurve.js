import { useMemo } from 'react';

import useRealFrames from './useRealFrames';

export default function useRealCurve(n = 60, f = x => x, _options) {
    const options = useMemo(() => {
        return { n, f, ...((typeof _options === 'function' ? _options() : _options) || {}) }
    }, [])
    return useRealFrames(options);
}