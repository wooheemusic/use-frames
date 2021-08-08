import { useRef, useEffect } from 'react';

const ESCAPE = null; // or something like 'iegrioHJBUIBUrifne9jNIUHfninwef'

function usePreviousEscape(value, escape = ESCAPE) {
    const ref = useRef(value);
    useEffect(() => {
        value !== escape && (ref.current = value);
    });
    return ref.current;
}

export { ESCAPE };

export default usePreviousEscape;