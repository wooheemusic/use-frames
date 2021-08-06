// https://en.wikipedia.org/wiki/Simple_harmonic_motion
// https://en.wikipedia.org/wiki/Harmonic_oscillator
// https://en.wikipedia.org/wiki/Damping#Damped_sine_wave
// https://kr.mathworks.com/help/symbolic/physics-damped-harmonic-oscillator.html
// http://hyperphysics.phy-astr.gsu.edu/hbase/oscda.html
// http://farside.ph.utexas.edu/teaching/315/Waves/node10.html

/**
 * @param {number} c viscous damping coefficient
 * @param {number} d0 initial position
 * @param {number} v0 initial speed
 * @param {number} k stiffness
 * @param {number} m mass
 * @returns {Function} non-overdamped harmonic oscillator
 */
// get c, k, m, d0, v0 from https://use-frames-simulation.surge.sh/
// if halfPeriods is 30, scaled-to-1-H(1) = 0 that is 30th 0.
// halfPeriods 0 for infinite 0s
export default function getHarmonic({ damping: c = 1000, stiffness: k = 110, mass: m = 15, d: d0 = 1, v: v0 = 0, halfPeriods: hp = 0 }) {
    const w0 = Math.sqrt(k / m); // natural frequency
    const A = Math.sqrt(d0 * d0 + (v0 / w0) ** 2); // amplitude
    const p = Math.atan2(v0 / w0, d0); // initial phase
    const z = c / 2 / Math.sqrt(m * k); // damping ratio
    if (z > 1) {
        return () => 0;
    }
    // z * w0 === c / 2 / m

    let decay; // // exponential decay
    const w1 = Math.sqrt(1 - z * z) * w0; // angular frequency
    let H;
    if (hp > 0) {
        const ftt = Math.PI * (hp - 1 / 2) - p;
        decay = Math.exp(-z * w0 * ftt / w1);
        H = t => A * (decay ** t) * Math.cos(ftt * t - p);
    } else {
        decay = Math.exp(-z * w0);
        H = t => A * (decay ** t) * Math.cos(w1 * t - p);
    }
    return H;
}

export function getHarmonicForUnit(options = {}) {
    const H = getHarmonic(options);
    return t => (options.initPosition || 1) - H(t); // (0, 0) to (1, d0)
}
