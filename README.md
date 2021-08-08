# use-frames
This module is a set of [react hooks](https://reactjs.org/docs/hooks-intro.html), mathematical [explicit functions](https://en.wikipedia.org/wiki/Parametric_equation#Computer-aided_design) and [dynamic systems](https://en.wikipedia.org/wiki/Dynamical_system). The hooks help clients to animate any by continuously releasing primitive numbers of the range of a function or elements of an array.

## Simulator
- [simulator](http://use-frames-simulation.surge.sh/)
- [git for simulator](https://github.com/wooheemusic/use-frames-simulation)

## Explicit functions

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

### `useHarmonic`
It releases Y: [0,1] -> R of a harmonic oscillator. It uses an explicit function deduced from the differential equation of harmonic oscillator. It takes `d` from `d` to 0. It provides `halfPeriods` to ensure `Y(1) = d`.
- `d` for the initial displacement.
- `v` for the initial velocity. 
- `damping` for a viscous damping coefficient. It makes `d` converge to 0. If it is 0, its displacement vibrates infinitely.
If `halfPeriods` is 30, you get `H(1) = d` that is 30th `d`.
`halfPeriods` 0 means 'not scaled'.
```js
import useHarmonic from 'use-frames/useHarmonic';
// ...
const [ y ] = useHarmonic(n, { damping : 1000, stiffness : 110, mass : 15, d : 1, v : 0, halfPeriods : 6 }, { onEnd: () => {}});
// or just
const [ y ] = useHarmonic();
```
### `useHarmonicForUnit`
This module takes `d` from 0 to `d` for motion usage.
```jsx
import useHarmonicForUnit from 'use-frames/useHarmonicForUnit';
```

### `useCurve` with any explicit function
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

### Create a range dynamically.
```js
import { useMemo } from 'react';
import useFrames from 'use-frames';
import getCubicBezier from 'use-frames/explicits/getCubicBezier';
import getRange from 'use-frames/tools/getRange';
// ...
const Y = useMemo(() => getRange(n, getCubicBezier(0.1, 0.2, 0.3, 0.4)), []); 
const [ y ] = useFrames({ range: Y })
```

### Animation contol examples
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

### Choose `n` from duration
- If you animate it for 1 sec, you need about 60 frames for a full motion.
- If you animate it for 0.5 sec, you need about 30 frames for a full motion.
```js
import getFramesFromMilli from 'use-frames/tools/getFramesFromMilli';
// 20 frames for 1000/3 ms
const n = getFramesFromMilli(1000 / 3); // 20
```

### Deduce a explicit function from parametric functions
```js
import deduceFromParametric from 'use-frames/tools/deduceFromParametric';

const f = deduceFromParametric(pfx, pfy);
```
- parametric to explicit
- pfx: [0, 1] -> [0, 1], **increasing** <---------- important
- pfy: [0, 1] -> R
- pfx and pfy should start from (0,0) and end to (1,1) to be used as a unit of motions 

### Numerical implementations of `deduceFromParametric`
Only the *Monte-Carlo* method is implemented yet.

## Dynamic systems

### `useDynamicHarmonic`
It releases values of a harmonic oscillator in a dynamic system. It is not a exact harmonic oscillator but a linear approximation.
```jsx
import useDynamicHarmonic from 'use-frames/useDynamicHarmonic';
// ...
const [{d, v}, setH] = useDynamicHarmonic();
const handleMouseMove = () => setH({d: da, v: va});
```
It supports any natural dimension. 
```jsx
const [[{d: d1, v:v1}, {d:d2, v:v2}], setHH] = useDynamicHarmonic(2, options); // 2-dimension
// or ... useDynamicHarmonic([{d:di, v:vi}, {d:dii, v:vii}]) with init values
const handleMouseMove2 = () => setHH([{d:db, v:vb}, {d:dc, v:vc}]);
```
`options` could be `{ stiffness: 100, mass: 1, damping: 5, frequency: 60, precision: 0.0001 }`. 
`frequency` is for `dT = 1 / frequency` for linear approximation.

### `useSpring`
This module is extremely easy to use consecutively.
```jsx
import createUseSpring from 'use-frames/createUseSpring';

const useSpring = createUseSpring(3, options); // the same argument rules as `useDynamicHarmonic`

const [[x, y, z], setD3] = useState(); // object coordinates from mouse moves or keyboard control in 3D

const [x1, y1, z1, setSpring1] = useSpring(x, y, z); // x1, y1, z1 converge to x, y ,z
const [x2, y2, z2, setSpring2] = useSpring(x1, y1, z1); // x2, y2, z2 converge to x1, y1 ,z1
const [x3, y3, z3, setSpring3] = useSpring(x2, y2, z2); // x3, y3, z3 converge to x2, y2, z2
const [x4, y4, z4, setSpring2] = useSpring(x3, y3, z3); // x4, y4, z4 converge to x3, y3, z3
// ...
// as many as you want

const handleMouseMove = e => {
    toRAF(() => {
        // ...
        setD3(d3)
    })
}
const handleSpringChange = () => {
    setSpring1({stiffness: 300, mass: 1.5, damping: 20});
    setSpring2({stiffness: 200, mass: 1.4, damping: 40});
    // ...
}
```
[toRAF](https://www.npmjs.com/package/to-raf) is a throttling adapter to `requestAnimationFrame`. It adapts a number of callbacks to `requestAnimationFrame`.

### `useDynamicFrames`
This is the core module for dynamic systems, `fn = F(fn-1 = F(...F(f2=F(f1 = F(f0)))))`.
You can simulate chaos or fractal.
```jsx
const dynamicFunction = (prevState, stop) => {
    //....
    if (someConditionToStop) {
        stop();
        return prevState;
    }
    return nextState;
}
const [state, setState] = useDynamicFrames(dynamicFunction, initState);
```
>In the react lifecycle, this module returns necessary evils of values detached from animation frames. *Clients should receive them idempotently*. If they change its client's state recursively with `useEffect` without its second argument, it might ruin the mathematical integrity of the classic-physics world. For example, if the releasing `state` is a derivative `dF` of `F` and a client updates `F2 = F1 + dF` to another `useState`, it would be an anomaly.
>`dynamicFunction` never gets frame-detached values but it must *return a new value each time to make it valid*. Or return its previous value to make it invalid.

## other modules

### `useAnimationEffect`
This is the fundamental module.
```js
import useAnimationEffect from 'use-frames';

const [x, setX] = useState(0);

useAnimationEffect(stop => {
    setX(x => {
        if (x > 100) {
            stop();
            return x;
        }
        return x + 1;
    });
    // return () => {
        // you do not need to call `stop` here. `useAnimationEffect` does it for you
        // you can do something else here as you want for useEffect
    // };
}, []);
return (
    <div>{x}</div>;
)
```

## Plan for updates
- cubic-bezier by a cubic inverse.
- `setInterval` mode for discretes.
- polynomial interpolation.
- use the harmonic solution in the harmonic dynamic function.
- motion linking interfaces or an integrated interface for a dynamics world

## References
- [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
- [https://github.com/gre/bezier-easing/blob/master/src/index.js](https://github.com/gre/bezier-easing/blob/master/src/index.js)
- [https://en.wikipedia.org/wiki/Parametric_equation](https://en.wikipedia.org/wiki/Parametric_equation)
- [https://en.wikipedia.org/wiki/Polynomial_interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation)
- [https://en.wikipedia.org/wiki/Simple_harmonic_motion](https://en.wikipedia.org/wiki/Simple_harmonic_motion)
- [https://en.wikipedia.org/wiki/Harmonic_oscillator](https://en.wikipedia.org/wiki/Harmonic_oscillator)
- [https://en.wikipedia.org/wiki/Damping#Damped_sine_wave](https://en.wikipedia.org/wiki/Damping#Damped_sine_wave)
- [https://kr.mathworks.com/help/symbolic/physics-damped-harmonic-oscillator.html](https://kr.mathworks.com/help/symbolic/physics-damped-harmonic-oscillator.html)
- [http://hyperphysics.phy-astr.gsu.edu/hbase/oscda.html](http://hyperphysics.phy-astr.gsu.edu/hbase/oscda.html) 
- [http://farside.ph.utexas.edu/teaching/315/Waves/node10.html](http://farside.ph.utexas.edu/teaching/315/Waves/node10.html) 

## License

MIT © [wooheemusic](https://github.com/wooheemusic)




