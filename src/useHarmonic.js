import { useMemo } from 'react';
import useDynamicFrames from './useDynamicFrames';
import getHarmonic from './dynamics/getHarmonic';

function checkType(o) {
    return typeof o === 'object' && o !== null && o.v !== undefined && o.d !== undefined;
}

function initHarmonic(initState) {
    if (checkType(initState)) return initState;
    if (Array.isArray(initState) && checkType(initState[0])) return initState; // check more???? T_T
    if (!Number.isNaN(initState) && initState > 0) {
        initState = Math.ceil(initState);
        if (initState === 1) return { v: 0, d: 0 }
        const result = [];
        for (let i = 0; i < initState; i++) {
            result[i] = { v: 0, d: 0 };
        }
        return result;
    }
    throw new Error('`useHarmonic` requires the first argument of number, {v, d} or an array of elements of {v, d}.')
}

// example : const [[{ d: d11, v: v11 }, { d: d12, v: v12 }, { d: d13, v: v13 }], setS, isValid] = useHarmonic([{ v: 0, d: 0 }, { v: 0, d: 0 }, { v: 0, d: 0 }], { stiffness: 100 });

/**
 * 
 * @param {number|Object|Array} [initState = 1] 1, 2, 3, ... or an array like [{ v: 0, d: 0 }, { v: 0, d: 0 }, ...]
 * @param {Object|Function} [_options] {stiffness: 100, mass: 1, damping: 5, frequency = 60, precision: 0.0001}
 * @returns {Array} dynamically release values
 */
export default function useHarmonic(initState = 1, _options) {
    const reducer = useMemo(() => getHarmonic(typeof _options === 'function' ? _options() : _options), []);
    return useDynamicFrames(reducer, initHarmonic(initState));
}