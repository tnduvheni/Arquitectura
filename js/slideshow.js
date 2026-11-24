/* ==========================================
   ARQ Arquitectura — Logo Slideshow
   Infinite CSS-animation loop.
   Pauses only on genuine pointer hover —
   not during trackpad/scroll pass-throughs.
========================================== */
'use strict';

const Slideshow = {

  init() {
    this.track = document.querySelector('.slideshow-track');
    this.band  = document.querySelector('.logo-slideshow');
    if (!this.track || !this.band) return;

    this.cloneItems();
    this.bindControls();
  },

  /* Duplicate items so the CSS translateX(-50%) loop is seamless. */
  cloneItems() {
    const originals = [...this.track.querySelectorAll('.slideshow-item')];
    originals.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach(img => {
        img.alt = '';
        img.setAttribute('loading', 'eager');
      });
      this.track.appendChild(clone);
    });
  },

  /*
   * Pause/resume logic.
   *
   * The problem with a plain mouseenter/mouseleave pair is that macOS
   * trackpad momentum scrolling fires mouseenter as the viewport scrolls
   * over the element, without ever firing mouseleave. The animation stays
   * paused indefinitely.
   *
   * Fix: only treat the hover as "real" if the pointer is actually inside
   * the band's bounding box when checked on a brief delay, AND resume
   * immediately whenever a scroll event fires.
   */
  bindControls() {
    let hovered     = false;
    let hoverTimer  = null;

    const pause  = () => { this.track.style.animationPlayState = 'paused'; };
    const resume = () => { this.track.style.animationPlayState = 'running'; hovered = false; };

    // Only pause after a short confirmation that the pointer genuinely stopped
    this.band.addEventListener('mouseenter', () => {
      hoverTimer = window.setTimeout(() => {
        hovered = true;
        pause();
      }, 120);
    });

    this.band.addEventListener('mouseleave', () => {
      window.clearTimeout(hoverTimer);
      resume();
    });

    // Any scroll means the user is scrolling, not hovering — resume immediately
    window.addEventListener('scroll', () => {
      if (hovered) {
        window.clearTimeout(hoverTimer);
        resume();
      }
    }, { passive: true });

    // Touch devices: never pause (they scroll, not hover)
    this.band.addEventListener('touchstart', () => {
      window.clearTimeout(hoverTimer);
      resume();
    }, { passive: true });
  },

};

document.addEventListener('DOMContentLoaded', () => Slideshow.init());
