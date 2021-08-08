import { FREQUENCY, GRAVITY } from '../variables';

// https://en.wikipedia.org/wiki/Gravity

// to-left is positive, to-bottom is positive, h = -d 
export default function getGravity(frequency = FREQUENCY, g = GRAVITY) {
    const dt = 1 / frequency;
    return function gravity(state, stop) {
        const { h, v } = state;
        if (h <= 0) {
            stop();
            return state;
        }
        const d = -h;
        const nv = v + g * dt;
        const nd = d + nv * dt;
        if (nd <= 0) {
            return { h: -nd, v: nv };
        }
        // (h - nh) / h => (d - nd) / d
        return {h: 0, v: nv * dt * (d - nd) / d};
    }
}