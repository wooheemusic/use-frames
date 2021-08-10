import { useState, useEffect } from 'react';
import useDynamicHarmonic from './useDynamicHarmonic';

function distance(a, b) {
    return a - b;
}

/**
 * @param {number|Object|Array} [initState = 1] 1, 2, 3, ... or an array like [{ v: 0, d: 0 }, { v: 0, d: 0 }, ...]
 * @param {Object|Function} [_options] {stiffness: 100, mass: 1, damping: 5, frequency = 60, precision: 0.0001}
 * @returns {Function} a react hook
 */
export default function createUseSpring(initState, options) {
    return function useSpring(...C) {
        const [{ stiffness, damping, mass }, setSpring] = useState({})
        const [H, setH, isValid] = useDynamicHarmonic(initState, options);
        const isHArray = Array.isArray(H);
        const [R, setR] = useState(isHArray? H.map(el => el.d) : H.d);
        useEffect(() => {
            if (isHArray) {
                setH(C.map((el, i) => ({ d: distance(el, R[i]), v: H[i].v, stiffness, damping, mass })))
            } else {
                setH({ d: distance(C[0], R), v: H.v, stiffness, damping, mass })
            }
        }, C)
        useEffect(() => {
            if (isValid) {
                if (isHArray) {
                    setR(C.map((el, i) => distance(el, H[i].d)));
                } else {
                    setR(distance(C[0], H.d));
                }
            }
        }, (isHArray ? H.map(el => el.d) : [H.d]))
        if (isHArray) {
            return [...R, setSpring];
        }
        return [R, setSpring];
    }
}