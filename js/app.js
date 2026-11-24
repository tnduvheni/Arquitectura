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
    const typingEl = document.getElementById('loader-typing');

    // Route handoffs already carry their own visual transition; skip the loader.
    if (window.ARQ_SKIP_LOADER) {
      this.loaderEl?.classList.add('hidden');
      document.body.classList.remove('is-loading');
      window.dispatchEvent(new CustomEvent('arq:ready'));
      return;
    }

    const phrase = 'ARQ Arquitectura.';
    const charDelay = 72;   // ms per character
    const holdAfter = 480;  // pause after typing finishes before hiding

    const typeOut = (onDone) => {
      if (!typingEl) { onDone(); return; }
      typingEl.textContent = '';
      typingEl.dataset.typing = 'true';
      const chars = Array.from(phrase);
      let i = 0;
      const tick = () => {
        typingEl.textContent += chars[i++] || '';
        if (i < chars.length) {
          window.setTimeout(tick, charDelay);
        } else {
          delete typingEl.dataset.typing;
          window.setTimeout(onDone, holdAfter);
        }
      };
      tick();
    };

    const finish = () => {
      typeOut(() => {
        this.loaderEl.classList.add('hidden');
        document.body.classList.remove('is-loading');
        window.dispatchEvent(new CustomEvent('arq:ready'));
      });
    };

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
