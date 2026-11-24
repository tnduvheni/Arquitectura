/* Hero entrance, kept independent of hover transforms. */
'use strict';

const Hero = {
  init() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
      window.addEventListener('arq:ready', () => this.introAnimation(), { once: true });
    } else {
      this.introAnimation();
    }
  },

  introAnimation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const title = document.querySelector('.hero-title');
    const lines = title ? [...title.querySelectorAll('span')] : [];
    if (lines.length) {
      const phrases = lines.map(line => line.textContent.trim());
      title.classList.add('is-typing');
      lines.forEach(line => { line.textContent = ''; });

      const typeLine = lineIndex => {
        if (lineIndex >= lines.length) {
          title.classList.remove('is-typing');
          return;
        }
        const line = lines[lineIndex];
        const chars = Array.from(phrases[lineIndex]);
        let charIndex = 0;
        line.dataset.typing = 'true';
        const typeChar = () => {
          line.textContent += chars[charIndex++] || '';
          if (charIndex < chars.length) window.setTimeout(typeChar, 96);
          else {
            delete line.dataset.typing;
            window.setTimeout(() => typeLine(lineIndex + 1), 220);
          }
        };
        typeChar();
      };
      typeLine(0);
    }

    if (typeof gsap === 'undefined') return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-tag', { y: 24, opacity: 0, duration: .6 })
      .from('.hero-description', { y: 20, opacity: 0, duration: .55 }, '-=.25')
      .from('.hero-buttons .btn', { y: 14, opacity: 0, duration: .45, stagger: .1 }, '-=.2');
  },
};

document.addEventListener('DOMContentLoaded', () => Hero.init());
