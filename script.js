document.addEventListener('DOMContentLoaded', function() {
    const layers = document.querySelectorAll('[data-speed]');
    window.addEventListener('scroll', function() {
        layers.forEach(layer => {
            const depth = layer.getAttribute('data-speed');
            const amountMoved = -(window.pageYOffset * depth);
            layer.style.transform = `translateY(${amountMoved}px)`;
        });
    });
});
