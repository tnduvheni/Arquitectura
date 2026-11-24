/* ==========================================
   ARQ Arquitectura — Scroll Reveals
========================================== */
'use strict';

const Reveal = {
  init() {
    this.reveals();
    this.counters();
    this.imageReveal();
  },

  reveals() {
    const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('active'));
      return;
    }
    items.forEach(el => el.classList.add('reveal-pending'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          e.target.classList.remove('reveal-pending');
          io.unobserve(e.target);   // only animate once
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  },

  counters() {
    const stats = document.querySelectorAll('[data-count]');
    if (!stats.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = +el.dataset.count;
        const step   = Math.ceil(target / 80);
        let   cur    = 0;

        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur;
          if (cur >= target) clearInterval(timer);
        }, 20);

        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(el => io.observe(el));
  },

  // CSS-driven image-reveal using .image-reveal / .visible
  imageReveal() {
    // Apply the image treatment to the main project imagery without requiring
    // every image in the portfolio markup to carry an animation class.
    const imgs = document.querySelectorAll(
      '.image-reveal, .featured-image, .portfolio-image, .full-image-container, .project-gallery-item'
    );
    imgs.forEach(el => {
      el.classList.add('image-reveal', 'image-reveal-pending');
    });
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(el => el.classList.add('visible'));
      imgs.forEach(el => el.classList.remove('image-reveal-pending'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.classList.remove('image-reveal-pending');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    imgs.forEach(el => io.observe(el));
  },
};

document.addEventListener('DOMContentLoaded', () => Reveal.init());
