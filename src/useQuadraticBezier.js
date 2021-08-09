import useCurve from './useCurve';
import getQuadraticBezier from './explicits/getQuadraticBezier';

export default function useQuadraticBezier(frames, x, y, { getQuadraticBezier: _getQuadraticBezier, ...motion } = {}) {
    return useCurve(frames, (_getQuadraticBezier || getQuadraticBezier)(x, y), motion);
}