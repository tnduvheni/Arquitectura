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
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          io.unobserve(e.target);   // only animate once
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  },

  counters() {
    const stats = document.querySelectorAll('[data-count]');
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
    const imgs = document.querySelectorAll('.image-reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    imgs.forEach(el => io.observe(el));
  },
};

document.addEventListener('DOMContentLoaded', () => Reveal.init());
