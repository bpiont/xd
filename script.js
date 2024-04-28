document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.classList.add('smaller-header');
    } else {
        header.classList.remove('smaller-header');
    }

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(element => {
        const elementPos = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if(elementPos < windowHeight - 50) {
            element.classList.add('active');
        }
    });
});
