/* ==========================================
   ARQ Arquitectura — Main Application
========================================== */
'use strict';

const ARQ = {

  init() {
    this.cacheDOM();
    this.year();
    this.loader();       // sets up loader; hero waits for loaderReady event
    this.initLenis();    // Lenis + GSAP ScrollTrigger sync
    this.bindEvents();   // anchor smooth-scroll, resize
    this.scrollProgress();

    console.log('%cARQ Arquitectura', 'color:#C0392B;font-size:16px;font-weight:bold;');
  },

  cacheDOM() {
    this.loaderEl   = document.getElementById('loader');
    this.progressEl = document.getElementById('scroll-progress');
  },

  /* ── LOADER ─────────────────────────────── */

  loader() {
    const fill = document.querySelector('.loader-bar-fill');

    const finish = () => {
      const start    = performance.now();
      const duration = 1400;

      const tick = (now) => {
        const p      = Math.min((now - start) / duration, 1);
        const eased  = 1 - Math.pow(1 - p, 3);

        if (fill) fill.style.width = `${eased * 100}%`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            this.loaderEl.classList.add('hidden');
            document.body.classList.remove('is-loading');
            // Signal other modules (hero, etc.) that loader is gone
            window.dispatchEvent(new CustomEvent('arq:ready'));
          }, 220);
        }
      };

      requestAnimationFrame(tick);
    };

    // Fire as soon as everything is loaded; if already loaded, fire now
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
  },

  /* ── LENIS + SCROLLTRIGGER SYNC ────────── */

  initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration:        1.25,
      smoothWheel:     true,
      touchMultiplier: 1.4,
      easing:          t => 1 - Math.pow(1 - t, 4),
    });

    // Proper sync: use GSAP ticker so ScrollTrigger positions
    // are always computed from Lenis's virtual scroll position.
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }

    this.lenis = lenis;
  },

  /* ── SCROLL PROGRESS BAR ───────────────── */

  scrollProgress() {
    if (!this.progressEl) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      this.progressEl.style.width = (window.scrollY / h * 100) + '%';
    }, { passive: true });
  },

  /* ── YEAR ───────────────────────────────── */

  year() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  },

  /* ── GLOBAL EVENTS ──────────────────────── */

  bindEvents() {
    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      document.body.classList.remove('menu-open');
    }, { passive: true });

    // Intercept all anchor links and route through Lenis.scrollTo
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id     = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (this.lenis) {
          this.lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => ARQ.init());
