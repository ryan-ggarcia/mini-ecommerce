document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('promo-carousel');
    if (!root) return;

    const slides = Array.from(root.querySelectorAll('.promo-slide'));
    const dots = Array.from(root.querySelectorAll('.promo-dot'));
    const prevBtn = document.getElementById('promo-prev');
    const nextBtn = document.getElementById('promo-next');
    if (slides.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const AUTO_MS = 6000;
    let current = 0;
    let timer = null;

    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            const isActive = i === current;
            slide.classList.toggle('active', isActive);
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
            dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    function play() {
        if (reduceMotion || slides.length < 2) return;
        stop();
        timer = setInterval(next, AUTO_MS);
    }
    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }
    // Reinicia o autoplay após uma interação manual
    function restart() { stop(); play(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            show(Number(dot.dataset.index));
            restart();
        });
    });

    // Pausa quando o ponteiro está sobre o carrossel
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);

    // Navegação por teclado quando o carrossel está focado
    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); restart(); }
        else if (e.key === 'ArrowLeft') { prev(); restart(); }
    });

    // Pausa quando a aba não está visível
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stop() : play();
    });

    show(0);
    play();
});
