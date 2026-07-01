/* ==========================================
   ARQ Arquitectura — Hero
========================================== */
'use strict';

const Hero = {
  hero:       null,
  background: null,
  content:    null,

  init() {
    this.hero = document.getElementById('hero');
    if (!this.hero) return;

    this.background = this.hero.querySelector('.hero-background img');
    this.content    = this.hero.querySelector('.hero-content');

    this.mouseParallax();
    this.buttonEffects();

    // Wait for loader to hide before playing the intro — avoids animating
    // content that's covered by the loader overlay (FOUC fix).
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
      window.addEventListener('arq:ready', () => this.introAnimation(), { once: true });
    } else {
      this.introAnimation();
    }
  },

  /* ── MOUSE PARALLAX ─────────────────── */

  mouseParallax() {
    let ticking = false;
    let mx = 0, my = 0;

    this.hero.addEventListener('mousemove', e => {
      const r = this.hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width  - 0.5;
      my = (e.clientY - r.top)  / r.height - 0.5;

      if (!ticking) {
        requestAnimationFrame(() => {
          if (this.background) {
            this.background.style.transform = `translate(${mx * -28}px,${my * -28}px) scale(1.1)`;
          }
          if (this.content) {
            this.content.style.transform = `translate(${mx * 14}px,${my * 14}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    this.hero.addEventListener('mouseleave', () => {
      if (this.background) this.background.style.transform = 'translate(0,0) scale(1.08)';
      if (this.content)    this.content.style.transform    = 'translate(0,0)';
    });
  },

  /* ── INTRO ANIMATION ────────────────── */

  introAnimation() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-tag',          { y: 40, opacity: 0, duration: 0.8 })
      .from('.hero-title span',   { y: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.35')
      .from('.hero-description',  { y: 36, opacity: 0, duration: 0.75 }, '-=0.35')
      .from('.hero-buttons .btn', { y: 28, opacity: 0, duration: 0.6, stagger: 0.14 }, '-=0.3')
      .from('.scroll-indicator',  { opacity: 0, duration: 0.8 }, '-=0.2');
  },

  /* ── MAGNETIC BUTTONS ───────────────── */

  buttonEffects() {
    if (typeof gsap === 'undefined') return;

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x:        (e.clientX - r.left - r.width  / 2) * 0.16,
          y:        (e.clientY - r.top  - r.height / 2) * 0.16,
          duration: 0.35,
          ease:     'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Hero.init());
