export default function getMonomial(a = 1) {
    return function monomial(x) {
        return x ** a;
    }
}