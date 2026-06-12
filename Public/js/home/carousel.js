document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let slideInterval;
    
    // We expose goToSlide to the window so the onclick attributes still work
    window.goToSlide = function(index) {
        if(!slides.length) return;
        slides[currentSlide].classList.remove('active');
        if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
        resetInterval();
    }

    function nextSlide() {
        if(!slides.length) return;
        window.goToSlide((currentSlide + 1) % slides.length);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    if(slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
});
