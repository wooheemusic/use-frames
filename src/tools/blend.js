export default function blend(a, b, x) {
    return a * (1 - x) + b * x;
}