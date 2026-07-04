/* ==========================================
   ARQ Arquitectura — Slideshow
========================================== */
'use strict';

const Slideshow = {
  init() {
    this.createInfiniteLoop();
    this.pauseOnHover();
  },

  createInfiniteLoop() {
    const track = document.querySelector('.slideshow-track');
    if (!track) return;

    // Clone all items for seamless loop
    const items = track.querySelectorAll('.slideshow-item');
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  },

  pauseOnHover() {
    const slideshow = document.querySelector('.logo-slideshow');
    const track = document.querySelector('.slideshow-track');

    if (!slideshow || !track) return;

    slideshow.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    slideshow.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
};

// Initialize slideshow when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Slideshow.init());
} else {
  Slideshow.init();
}
