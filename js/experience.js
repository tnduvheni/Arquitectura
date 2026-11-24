/* Scroll-led sequence through the available project imagery. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const beats = [...document.querySelectorAll('.walkthrough-beat')];
  const scenes = [...document.querySelectorAll('.walkthrough-scene')];
  const stage = document.querySelector('.walkthrough-stage');
  if (!beats.length || !scenes.length) return;

  const showScene = index => {
    scenes.forEach((scene, i) => scene.classList.toggle('is-active', i === index));
    if (stage) stage.dataset.scene = index;
  };

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    beats.forEach((beat, index) => ScrollTrigger.create({
      trigger: beat,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => showScene(index),
      onEnterBack: () => showScene(index),
    }));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) showScene(beats.indexOf(entry.target));
    }), { threshold: 0.5 });
    beats.forEach(beat => observer.observe(beat));
  } else {
    let ticking = false;
    const update = () => {
      const section = document.querySelector('.walkthrough');
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range));
      showScene(Math.min(scenes.length - 1, Math.floor(progress * scenes.length)));
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }
});
