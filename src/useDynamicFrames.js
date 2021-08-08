import { useState, useEffect } from 'react';
import useAnimationEffect from './useAnimationEffect';
import usePreviousEscape, { ESCAPE } from './tools/usePreviousEscape';

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
    
    const prevInnerState = usePreviousEscape(innerState);
    const invalid = innerState === ESCAPE || prevInnerState === innerState;
    const toRender = invalid ? prevInnerState : innerState;
    return [toRender, setState, !invalid];
}