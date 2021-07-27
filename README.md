# use-frames
This module is a set of [react hook](https://reactjs.org/docs/hooks-intro.html)s and mathematical [explicit functions](https://en.wikipedia.org/wiki/Parametric_equation#Computer-aided_design). The hooks help clients to animate any by continuously releasing primitive numbers of the range of a function or elements of an array.

## Demo and simulator
(not implemented)

## Methods

### `useCubicBezier`
```js
import useCubicBezier from 'use-frames/useCubicBezier';
// ...
// n is frames for a full animation. 60 for 1 sec. 120 for 2 sec
const [ y ] = useCubicBezier(n, x1, y1, x2, y2); // y is on [0, 1]

return (
    <Dog style={{ transform: `translateX(${y * 200}px)` }}>
)
```

### `useCubicBezier` with an external cubic-bezier module
```js
import useCubicBezier from 'use-frames/useCubicBezier';
import bezierEasing from 'bezier-easing';
// ...
const [ y ] = useCubicBezier(n, x1, y1, x2, y2, { getCubicBezier: bezierEasing });
```

### `useQuadraticBezier`
`useQuadraticBezier` is much faster than `useCubicBezier`.
```js
import useQuadraticBezier from 'use-frames/getQuadraticBezier';
// ...
const [ y ] = useQuadraticBezier(n, x1, y1);
```

### `useCurve` with an explicit function
```js
import { useMemo } from 'react';
import { useCurve } from 'use-frames';
import { linear, getExponential, getMonomial, getCubicBezier, getQuadraticBezier } from 'use-frames/explicits';
// ...
// Choose one of five or any function on your own
const f = useMemo(() => getExponential(base), []); // The default for base is e.
const [ y ] = useCurve(n, f);
```
This creates a set of y = f(x) from the domain of [0, ...., 1] with length n + 1.

### `useFrames`
This is the best practice for performance.
Programs like Matlab does not generate random numbers but just use them from its huge archive of random numbers. Archiving than calculating.
```js
import useFrames from 'use-frames';
// ...
const Y = [0, ... , 1];
// ...
const [ y ] = useFrames({range: Y})
```

## Create a range for `useFrames`
```js
import getCubicBezier from 'use-frames/explicits/getCubicBezier';
import getRange from 'use-frames/tools/getRange';

const Y = getRange(n, getCubicBezier(0.1, 0.2, 0.3, 0.4)); // curvy set of [0, ..., 1], length n + 1
```
Write Y in a file and import it.
> not implemented yet
```js
// writeArray(getRange(n, fn), to);
// import arr from to
// useFrames({range:arr})
```

## Create a range dynamically.
```js
import { useMemo } from 'react';
import useFrames from 'use-frames';
import getCubicBezier from 'use-frames/explicits/getCubicBezier';
import getRange from 'use-frames/tools/getRange';
// ...
const Y = useMemo(() => getRange(n, getCubicBezier(0.1, 0.2, 0.3, 0.4)), []); 
const [ y ] = useFrames({ range: Y })
```

## Animation contol examples
```js
const [ y, setMotion ] = useCubicBezier(n, x1, y1, x2, y2, { from: 0, to: n, onEnd: ({ from, end }) => ({ from: to, to: from }) }) // useCurve, useQuadraticBezier also work like this.

const handelClick = () => setMotion({ restart: Date.now() })
const handelChange = () => setMotion({ to: Math.round(n/2)})
const handelAny = () => setMotion(({ from, to }) => ({ from: to, to: from }));
const handelBall = () => setMotion({ onEnd: () => ({ restart: Date.now() }) })

const [ z, setMotionForZ ] = useFrames({ range: Z, onEnd: ({ from }) => ({ to: from })})
const handleSomething = () => setMotionForZ({ to: 300000000000 }); // It's ok to exceed its limit. It just release numbers to the limit.

const handleSoftly = () => setMotionForZ({ range: AnotherRangeWithDifferentLength }); // It works
```

## Choose `n` from duration
- If you animate it for 1 sec, you need about 60 frames for a full motion.
- If you animate it for 0.5 sec, you need about 30 frames for a full motion.
```js
import getFramesFromMilli from 'use-frames/tools/getFramesFromMilli';
// 20 frames for 1000/3 ms
const n = getFramesFromMilli(1000 / 3); // 20
```

## Deduce a explicit function from parametric functions
```js
import deduceFromParametric from 'use-frames/tools/deduceFromParametric';

const f = deduceFromParametric(pfx, pfy);
```
- parametric to explicit
- pfx: [0, 1] -> [0, 1], **increasing** <---------- important
- pfy: [0, 1] -> R
- pfx and pfy should start from (0,0) and end to (1,1) to be used as a unit of motions 

## Numerical implementations of `deduceFromParametric`
Only the *Monte-Carlo* method is implemented. I need to study the javascript numerical precision.

## History ;;
This module started from [bezier-easing](https://github.com/gre/bezier-easing). One day, I read its code and did not understand it. So I reviewed refs about numerical anaysis and got to write a similar code. But I still do not understande its empiricism of NEWTON_MIN_SLOPE.

## Plan for updates
- demo
- cubic-bezier by a cubic inverse
- `setInterval` mode for discretes
- an adapter for the react-motion/spring interface
- polynomial interpolation

## References
- [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
- [https://github.com/gre/bezier-easing/blob/master/src/index.js](https://github.com/gre/bezier-easing/blob/master/src/index.js)
- [https://en.wikipedia.org/wiki/Parametric_equation](https://en.wikipedia.org/wiki/Parametric_equation)
- [https://en.wikipedia.org/wiki/Polynomial_interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation)

## License

MIT © [wooheemusic](https://github.com/wooheemusic)




