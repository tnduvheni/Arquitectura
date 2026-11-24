/* ==========================================
   Process Timeline
========================================== */

const Process = {

    init() {

        this.animateTimeline();

    },

    animateTimeline() {
        const rooms = document.querySelectorAll('.process-rooms article');
        if (!rooms.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            rooms.forEach(room => room.classList.add('is-visible'));
            return;
        }

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            rooms.forEach((room, index) => gsap.from(room,
                { y: 18, duration: .55, delay: index * .06, ease: 'power3.out',
                  scrollTrigger: { trigger: room, start: 'top 82%', once: true } }
            ));
            return;
        }

        if (!('IntersectionObserver' in window)) {
            rooms.forEach(room => room.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }), { threshold: .15 });
        rooms.forEach(room => observer.observe(room));

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Process.init();

});

