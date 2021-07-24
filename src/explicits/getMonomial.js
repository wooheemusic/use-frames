
;export default function getMonomial(exponent = 1) {
    return function monomial(base) {
        return Math.pow(base, exponent);
    };
}