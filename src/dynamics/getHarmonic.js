import { STIFFNESS, MASS, DAMPING, FREQUENCY, PRECISION } from '../variables';

// A version using explicit harmonic will be updated
export default function getHarmonic({ stiffness: _k = STIFFNESS, mass: _m = MASS, damping: _c = DAMPING, frequency: fq = FREQUENCY, precision: pc = PRECISION } = {}) {
    const dt = 1 / fq;
    return (state, stop) => {
        const isArray = Array.isArray(state);
        const dm = isArray ? state.length : 1;
        let willStop = true;
        let result;
        for (let i = 0; i < dm; i++) {
            const { d, v, stiffness: k = _k, mass: m = _m, damping: c = _c } = isArray ? state[i] : state; // d for spring displacement
            const nv = v + (-k * d - c * v) * dt / m;
            const dd = nv * dt;
            const nd = d + dd;
            if (!isArray) {
                result = { d: nd, v: nv, dd }
            } else if (i === 0) {
                result = [{ d: nd, v: nv, dd }]
            } else {
                result.push({ d: nd, v: nv, dd })
            }
            willStop = willStop && Math.abs(d - nd) < pc && Math.abs(v - nv) < pc;
        }
        if (willStop) {
            stop();
            return state;
        }
        return result;
    }
}