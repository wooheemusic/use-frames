import { useMemo, useEffect } from 'react';
import getAnimationEffect from './tools/getAnimationEffect';

// The returned value of fn will clean up the effect.
// But you do not need to return 'stop'. 'useAnimationEffect' will excute 'stop' instead.
export default function useAnimationEffect(fn, va) {
    const effect = useMemo(() => getAnimationEffect(fn), va);
    useEffect(effect, va);
}