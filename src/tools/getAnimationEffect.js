export default function getAnimationEffect(fn) {
    return () => {
        let isAnimating = true;
        let aId = 0;
        let cleanUp;
        function stop() {
            isAnimating = false;
            cancelAnimationFrame(aId);
        }
        function animate() {
            if (isAnimating) {
                aId = requestAnimationFrame(animate);
                cleanUp = fn(stop);
            }
        }
        animate();
        return () => {
            typeof cleanUp === 'function' && cleanUp();
            stop()
        };
    }
}