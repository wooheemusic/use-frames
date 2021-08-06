import { useState, useEffect, useRef } from 'react';
import useAnimationEffect from './useAnimationEffect';

const ESCAPE = null; // or something like 'iegrioHJBUIBUrifne9jNIUHfninwef'

function usePreviousEscape(value) {
    const ref = useRef(value);
    useEffect(() => {
        value !== ESCAPE && (ref.current = value);
    });
    return ref.current;
}

/**
 * 
 * @param {Function} dynamicFunction 
 * @param {*} veryInitState 
 * @returns {Array} releases values continuously
 */
export default function useDynamicFrames(dynamicFunction, veryInitState) {
    const [state, _setState] = useState(veryInitState);
    const [innerState, setInnerState] = useState(state);

    function setState(state) {
        setInnerState(ESCAPE);
        _setState(typeof state === 'function' ? state(innerState) : state);
    }

    useEffect(() => {
        setInnerState(state);
    }, [state]);

    useAnimationEffect(stop => {
        setInnerState(prevInnerState => {
            return prevInnerState === ESCAPE ? ESCAPE : dynamicFunction(prevInnerState, stop);
        })
    }, [state]);
    
    // In the react lifecycle, this module returns necessary evils of values detached from animation frames.
    // You should use them idempotently.
    // If they change its client's state recusively with useEffect, it might ruins the mathematical integrity of the classic-physics world.
    // For example, if the releasing `state` is a derivative dF of F and its client update F2 = F1 + dF to another useState, it would be an anomaly.
    // You can use the 3rd element `isValid` of [state, setState, isValid] = useDynamicFrames(dynamicFunction) to escape them.
    // But `dynamicFunction` does not need to refer to them. `dynamicFunction` never gets invalid values.
    const prevInnerState = usePreviousEscape(innerState);
    const invalid = innerState === ESCAPE;
    const toRender = invalid ? prevInnerState : innerState;
    return [toRender, setState, !invalid];
}