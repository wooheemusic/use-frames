import { useState, useEffect, useMemo } from 'react';

// prevRange will be added to be smoothly merged with the new range.
export default function useFrames(_state) {
    const state = useMemo(() => {
        return typeof _state === 'function' ? _state() : _state;
    }, []);
    const { range: _range, from: _from = 0, to: _to = _range.length - 1, onEnd: _onEnd, restart: _restart = 0 } = state || {};
    const [range, setRange] = useState(_range);
    const [restart, setRestart] = useState(_restart);
    const [from, setFrom] = useState(_from);
    const [current, setCurrent] = useState(_from);
    const [to, setTo] = useState(_to);
    const [{ onEnd }, setOnEnd] = useState({ onEnd: _onEnd }); // function wrapped in an object 

    useEffect(() => {
        setCurrent(from);
    }, [from, restart])

    useEffect(() => {
        let isStreaming = true;
        let sid = 0;
        function stop() {
            isStreaming = false;
            cancelAnimationFrame(sid);
        }
        function animate() {
            if (isStreaming) {
                sid = requestAnimationFrame(animate);
                setCurrent(prev => {
                    const limit = range.length - 1;
                    if (prev > limit) {
                        prev = limit;
                    }
                    if (prev > to ) {
                        return prev - 1;
                    } else if (prev < to && prev < limit) {
                        return prev + 1;
                    } else {
                        stop();
                        return prev;
                    }
                })
            }
        }
        animate();
        return stop;
    }, [range.length, from, to, onEnd, restart]);

    function setFrames(options) {
        typeof options === 'function' && (options = options({ range, restart, from, to, onEnd }))
        if ('range' in options) setRange(options.range);
        if ('restart' in options) setRestart(options.restart);
        if ('from' in options) setFrom(options.from);
        if ('to' in options) setTo(options.to);
        if ('onEnd' in options) setOnEnd({ onEnd: options.onEnd });
    }

    useEffect(() => {
        if (current === to && typeof onEnd === 'function') {
            const state = onEnd({ range, restart, from, to, onEnd });
            if (typeof state === 'object' || typeof state === 'function') {
                setFrames(state);
            }
        }
    }, [current === to, onEnd])

    // If a shorter range is applied, current cannot be adjusted to its shorter length before it renders once.
    return [range[Math.min(current, range.length -1)], setFrames];
}