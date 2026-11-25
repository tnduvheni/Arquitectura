/* ==========================================
   ARQ Arquitectura — Typewriter Brief
   Each scroll beat activates a brief panel.
   Lines type out one by one, then the
   project image fades in behind the text.
   Re-types every time you scroll back.
========================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const beats   = [...document.querySelectorAll('.walkthrough-beat')];
  const panels  = [...document.querySelectorAll('.brief-panel')];
  const bgs     = [...document.querySelectorAll('.brief-bg')];

  if (!beats.length || !panels.length) return;

  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Store the original text for each line so we can retype it every visit */
  panels.forEach(panel => {
    panel.querySelectorAll('[data-line]').forEach(line => {
      line.dataset.full = line.textContent.trim();
    });
  });

  /* Active typing timers — cancel them if the panel changes mid-type */
  let activeTimers = [];

  const cancelActive = () => {
    activeTimers.forEach(id => window.clearTimeout(id));
    activeTimers = [];
  };

  /* ── Typing engine ──────────────────────── */

  const typeLines = panel => {
    cancelActive();

    const lines = [...panel.querySelectorAll('[data-line]')];

    /* Reset all lines to empty */
    lines.forEach(l => { l.textContent = ''; l.classList.remove('is-typing'); });

    if (!motionOK) {
      lines.forEach(l => { l.textContent = l.dataset.full || ''; });
      return;
    }

    const typeLine = lineIndex => {
      if (lineIndex >= lines.length) return;

      const el   = lines[lineIndex];
      const full = el.dataset.full || '';
      const chars = Array.from(full);
      let i = 0;

      el.classList.add('is-typing');

      const delay = lineIndex === 0 ? 38 : 26;

      const tick = () => {
        el.textContent += chars[i++] || '';
        if (i < chars.length) {
          activeTimers.push(window.setTimeout(tick, delay));
        } else {
          el.classList.remove('is-typing');
          const pause = lineIndex === 0 ? 300 : 160;
          activeTimers.push(window.setTimeout(() => typeLine(lineIndex + 1), pause));
        }
      };

      tick();
    };

    typeLine(0);
  };

  /* ── Activate a brief by index ──────────── */

  let currentIndex = -1;

  const showBrief = index => {
    const clamped = Math.max(0, Math.min(index, panels.length - 1));
    if (clamped === currentIndex) return; /* already showing — don't retype */
    currentIndex = clamped;

    panels.forEach((p, i) => p.classList.toggle('is-active', i === clamped));
    bgs.forEach((bg, i)   => bg.classList.toggle('is-visible', i === clamped));

    typeLines(panels[clamped]);
  };

  /* Show the first brief immediately on load */
  showBrief(0);

  /* ── Scroll wiring ──────────────────────── */

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    beats.forEach((beat, index) => {
      ScrollTrigger.create({
        trigger: beat,
        start: 'top center',
        end:   'bottom center',
        onEnter:     () => showBrief(index),
        onEnterBack: () => showBrief(index),
      });
    });

    return;
  }

  /* IntersectionObserver fallback */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = beats.indexOf(entry.target);
        if (index !== -1) showBrief(index);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    beats.forEach(beat => observer.observe(beat));
    return;
  }

  /* Scroll event last resort */
  const section = document.querySelector('.walkthrough');
  if (!section) return;

  let ticking = false;
  const update = () => {
    const range    = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range));
    showBrief(Math.min(panels.length - 1, Math.floor(progress * panels.length)));
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  update();

});
