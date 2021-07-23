> DO NOT USE THIS MODULE YET. I just started it. I need some tests.

# use-frames
This module is a set of [react hook](https://ko.reactjs.org/docs/hooks-intro.html)s and mathematical [explicit functions](https://en.wikipedia.org/wiki/Parametric_equation#Computer-aided_design). The hooks help clients to animate the DOM by continuously releasing numbers of the range of a function or elements of an array.

## Demo and simulator

## Usages

### `useFrames`
```
import useFrames from 'use-frames';
```

### `useCurve` with an explicit function

### `useCurve` with an external module

### `useCubicBezier`

### `useQuadraticBezier`

## Animation contol examples
```js

```

## Choose `n` from duration
- If you animate it for 1 sec, you need about 60 frames for a full easing.
- If you animate it for 0.5 sec, you need about 30 frames for a full easing.
```js
import getFramesFromMilli from 'use-frames/tools/getFramesFromMilli';
const n = getFramesFromMilli(1000 / 3); // 20 frames for 1000/3 ms
```

## Best practice for performance
```js
// writeArray(getRange(n, fn), to);
// import arr from to
// useFrames({range:arr})
```

## Deduce a explicit function from parametric functions
```js
// deduceFromParametric
```

## numerical implementations of `deduceFromParametric`
Only the Monte-Carlo method is implemented. I need to study the javascript numerical precision.

## References
[https://ko.reactjs.org/docs/hooks-intro.html](https://ko.reactjs.org/docs/hooks-intro.html)
[https://github.com/gre/bezier-easing/blob/master/src/index.js](https://github.com/gre/bezier-easing/blob/master/src/index.js)
[https://en.wikipedia.org/wiki/Parametric_equation](https://en.wikipedia.org/wiki/Parametric_equation)
[https://en.wikipedia.org/wiki/Polynomial_interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation)

## License

MIT © [wooheemusic](https://github.com/wooheemusic)




