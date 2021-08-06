import { useState, useEffect, useMemo } from 'react';

import useAnimationEffect from './useAnimationEffect'

export default function useRealFrames(_state) {
    const state = useMemo(() => {
        return typeof _state === 'function' ? _state() : _state;
    }, []); // _state is used at the very beginning... like useState
    const { n: _n, f: _f = x => x, from: _from = 0, to: _to = _range.length - 1, onEnd: _onEnd, restart: _restart = 0 } = state || {};
    const [n, setN] = useState(_n);
    const [f, setF] = useState(_f);
    const [restart, setRestart] = useState(_restart);
    const [from, setFrom] = useState(_from);
    const [current, setCurrent] = useState(_from);
    const [to, setTo] = useState(_to);
    const [{ onEnd }, setOnEnd] = useState({ onEnd: _onEnd }); // function wrapped in an object 

    const interval = useMemo(() => 1 / n, [n]);

    useEffect(() => {
        setCurrent(from);
    }, [from, restart]);

    useAnimationEffect(stop => {
        setCurrent(prev => {
            if (prev > n) {
                prev = n;
            }
            if (prev > to) {
                return prev - 1;
            } else if (prev < to && prev < n) {
                return prev + 1;
            } else {
                stop();
                return prev;
            }
        })
    }, [n, from, to, onEnd, restart]);

    function setFrames(options) {
        typeof options === 'function' && (options = options({ n, f, restart, from, to, onEnd }))
        if ('n' in options) setN(options.n);
        if ('f' in options) setF(options.f);
        if ('restart' in options) setRestart(options.restart);
        if ('from' in options) setFrom(options.from);
        if ('to' in options) setTo(options.to);
        if ('onEnd' in options) setOnEnd({ onEnd: options.onEnd });
    }

    useEffect(() => {
        if (current === to && typeof onEnd === 'function') {
            const state = onEnd({ n, f, restart, from, to, onEnd });
            if (typeof state === 'object' || typeof state === 'function') {
                setFrames(state);
            }
        }
    }, [current === to, onEnd])

    // If a shorter range is applied, current cannot be adjusted to its shorter length before it renders once.
    const cn = Math.min(current, n);
    return [f(cn === n ? 1 : interval * cn), setFrames];
}