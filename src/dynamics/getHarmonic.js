const PRECISION_DEFAULT = 0.0001;

// A version using explicit harmonic will be updated
export default function getHarmonic({ stiffness: _k = 100, mass: _m = 1, damping: _c = 5, frequency: fq = 60, precision: pc = PRECISION_DEFAULT } = {}) {
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