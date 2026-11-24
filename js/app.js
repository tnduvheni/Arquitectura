/* ==========================================
   ARQ Arquitectura — Main Application
========================================== */
'use strict';

const ARQ = {

  init() {
    this.cacheDOM();
    this.year();
    this.loader();       // sets up loader; hero waits for loaderReady event
    this.bindEvents();   // anchor smooth-scroll, resize
    this.scrollProgress();

    console.log('%cARQ Arquitectura', 'color:#9F4035;font-size:16px;font-weight:bold;');
  },

  cacheDOM() {
    this.loaderEl   = document.getElementById('loader');
    this.progressEl = document.getElementById('scroll-progress');
  },

  /* ── LOADER ─────────────────────────────── */

  loader() {
    const fill = document.querySelector('.loader-bar-fill');

    // Route handoffs already carry their own visual transition; don't insert
    // another blocking loading screen between the two pages.
    if (window.ARQ_SKIP_LOADER) {
      this.loaderEl?.classList.add('hidden');
      document.body.classList.remove('is-loading');
      window.dispatchEvent(new CustomEvent('arq:ready'));
      return;
    }

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

    // Keep anchor navigation native so trackpads and sticky scenes stay responsive.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id     = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => ARQ.init());
