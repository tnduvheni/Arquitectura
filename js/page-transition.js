/* A quiet image handoff from a project card into its case study. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const layer = document.querySelector('.page-transition');
  const image = layer && layer.querySelector('img');
  const title = layer && layer.querySelector('.page-transition-title');
  if (!layer || !image) return;

  const handoffKey = 'arq-image-handoff';
  const fadeKey = 'arq-light-fade';
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const typeTitle = value => {
    if (!title) return 0;
    const text = (value || '').trim();
    title.textContent = '';
    if (!text) return 0;
    title.dataset.typing = 'true';
    if (!motionOK) {
      title.textContent = text;
      delete title.dataset.typing;
      return 0;
    }
    const chars = Array.from(text);
    const characterDelay = 64;
    let index = 0;
    const tick = () => {
      title.textContent += chars[index++] || '';
      if (index < chars.length) window.setTimeout(tick, characterDelay);
      else delete title.dataset.typing;
    };
    tick();
    return chars.length * characterDelay;
  };
  const setBox = box => {
    image.style.top = `${box.top}px`;
    image.style.left = `${box.left}px`;
    image.style.width = `${box.width}px`;
    image.style.height = `${box.height}px`;
    image.style.borderRadius = box.radius || '0px';
  };

  let arriving = null;
  let fading = false;
  try {
    arriving = JSON.parse(sessionStorage.getItem(handoffKey) || 'null');
    sessionStorage.removeItem(handoffKey);
    const fadeValue = sessionStorage.getItem(fadeKey);
    fading = fadeValue ? (fadeValue === '1' ? { title: '' } : JSON.parse(fadeValue)) : false;
    sessionStorage.removeItem(fadeKey);
  } catch (_) {}

  window.ARQ_SKIP_LOADER = Boolean((arriving && arriving.src) || fading);
  if (arriving && arriving.src && motionOK) {
    let revealStarted = false;
    image.src = arriving.src;
    const titleDuration = typeTitle(arriving.title);
    layer.classList.add('is-active', 'is-handoff');
    setBox({ top: 0, left: 0, width: innerWidth, height: innerHeight });
    const reveal = () => {
      if (revealStarted) return;
      revealStarted = true;
      const target = document.querySelector('.project-detail-page .featured-image');
      if (!target) {
        layer.classList.remove('is-active', 'is-handoff');
        return;
      }
      const rect = target.getBoundingClientRect();
      layer.classList.add('is-settling');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setBox({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        window.setTimeout(() => {
          layer.classList.remove('is-active', 'is-handoff', 'is-settling');
          if (title) title.textContent = '';
        }, Math.max(720, titleDuration + 120));
      }));
    };
    window.addEventListener('arq:ready', reveal, { once: true });
    window.setTimeout(reveal, 3200);
  } else if (fading && motionOK) {
    const titleDuration = typeTitle(fading.title);
    layer.classList.add('is-active', 'is-fading', 'is-fading-out');
    window.addEventListener('arq:ready', () => {
      layer.classList.remove('is-fading-out');
      window.setTimeout(() => {
        layer.classList.remove('is-active', 'is-fading', 'is-fading-out');
        if (title) title.textContent = '';
      }, Math.max(460, titleDuration + 120));
    }, { once: true });
    window.setTimeout(() => layer.classList.remove('is-active', 'is-fading', 'is-fading-out'), 3000);
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if ((link.target && link.target !== '_self') || link.hasAttribute('download')) return;

    let destination;
    try { destination = new URL(link.href, location.href); } catch (_) { return; }
    const currentRoute = `${location.pathname}${location.search}`;
    const destinationRoute = `${destination.pathname}${destination.search}`;
    if (destination.origin !== location.origin || destinationRoute === currentRoute || !/\.html?$/.test(destination.pathname)) return;
    event.preventDefault();

    const sectionNames = {
      about: 'The Studio', portfolio: 'Selected Projects', services: 'Services',
      process: 'Our Process', contact: 'Contact the Studio',
    };
    const nextProjectTitle = link.closest('#next-project-link')?.querySelector('strong')?.textContent;
    const destinationTitle = link.closest('.portfolio-card')?.dataset.title
      || nextProjectTitle
      || sectionNames[destination.hash.slice(1)]
      || link.textContent.trim()
      || 'The Studio';

    const cardImage = link.matches('.portfolio-link') && link.querySelector('img');
    const cardBox = cardImage && cardImage.getBoundingClientRect();
    if (motionOK && cardImage && cardBox && cardBox.width && cardBox.height) {
      image.src = cardImage.currentSrc || cardImage.src;
      typeTitle(destinationTitle);
      setBox({ top: cardBox.top, left: cardBox.left, width: cardBox.width, height: cardBox.height, radius: getComputedStyle(cardImage).borderRadius });
      layer.classList.add('is-active', 'is-handoff');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        layer.classList.add('is-settling');
        setBox({ top: 0, left: 0, width: innerWidth, height: innerHeight });
      }));
      try { sessionStorage.setItem(handoffKey, JSON.stringify({ src: image.src, title: destinationTitle })); } catch (_) {}
      window.setTimeout(() => { location.href = destination.href; }, 760);
      return;
    }

    if (motionOK) {
      typeTitle(destinationTitle);
      layer.classList.add('is-active', 'is-fading');
      requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add('is-fading-out')));
      try { sessionStorage.setItem(fadeKey, JSON.stringify({ title: destinationTitle })); } catch (_) {}
      window.setTimeout(() => { location.href = destination.href; }, 280);
    } else {
      try { sessionStorage.setItem(fadeKey, JSON.stringify({ title: destinationTitle })); } catch (_) {}
      location.href = destination.href;
    }
  });
});
