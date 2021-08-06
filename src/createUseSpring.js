import { useState, useEffect } from 'react';
import useDynamicHarmonic from './useDynamicHarmonic';

function distance(a, b) {
    return a - b;
}

/**
 * 
 * @param {number|Object|Array} [initState = 1] 1, 2, 3, ... or an array like [{ v: 0, d: 0 }, { v: 0, d: 0 }, ...]
 * @param {Object|Function} [_options] {stiffness: 100, mass: 1, damping: 5, frequency = 60, precision: 0.0001}
 * @returns {Function} a react hook
 */
export default function createUseSpring(initState, options) {
    return function useSpring(...C) {
        const [{ stiffness, damping, mass }, setSpring] = useState({})
        const [H, setH, isValid] = useDynamicHarmonic(initState, options);
        const isHArray = Array.isArray(H);
        const [R, setR] = useState(C);
        useEffect(() => setH(C.map((el, i) => ({ d: distance(el, R[i]), v: isHArray ? H[i].v : H.v, stiffness, damping, mass }))), C)
        useEffect(() => {
            isValid && setR(C.map((el, i) => distance(el, isHArray ? H[i].d : H.d)));
        }, isHArray ? H.map(el => el.d) : [H.d])
        return [...R, setSpring];
    }
}