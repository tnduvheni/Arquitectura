/* Portfolio filters, search and reveal behavior. */
'use strict';

const Portfolio = {
  filter: 'all',
  term: '',

  init() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.grid = document.querySelector('.portfolio-grid');
    this.cards = [...document.querySelectorAll('.portfolio-grid .portfolio-card')];
    this.status = document.querySelector('.portfolio-results-status');
    this.bindFilters();
    this.bindSearch();
    if (this.status) this.status.textContent = `${this.cards.length} projects`;
  },

  bindFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.filter = button.dataset.filter || 'all';
        document.querySelectorAll('.filter-btn').forEach(item => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        this.render(true);
      });
    });
  },

  bindSearch() {
    const input = document.getElementById('portfolio-search');
    if (!input) return;
    input.addEventListener('input', () => {
      this.term = input.value.trim().toLocaleLowerCase();
      this.render(Boolean(this.term));
    });
  },

  render(forceOpen = false) {
    const hasQuery = Boolean(this.term);
    const showGrid = forceOpen || hasQuery || this.filter !== 'all' || this.grid?.classList.contains('visible');
    this.grid?.classList.toggle('visible', showGrid);
    let visible = 0;

    this.cards.forEach((card, index) => {
      const category = (card.dataset.category || '').toLocaleLowerCase();
      const title = (card.dataset.title || '').toLocaleLowerCase();
      const location = (card.dataset.location || '').toLocaleLowerCase();
      const matches = (this.filter === 'all' || category === this.filter.toLocaleLowerCase())
        && (!hasQuery || title.includes(this.term) || location.includes(this.term));

      if (!matches) {
        card.style.display = 'none';
        return;
      }

      card.style.display = '';
      card.classList.add('active');
      card.classList.remove('reveal-pending');
      if (showGrid && !this.reduceMotion && typeof gsap !== 'undefined') {
        gsap.killTweensOf(card);
        gsap.fromTo(card, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: .55, delay: Math.min(visible, 7) * .045, ease: 'power3.out', clearProps: 'transform',
        });
      }
      visible += 1;
    });

    if (this.status) {
      this.status.textContent = visible ? `${visible} ${visible === 1 ? 'project' : 'projects'}` : 'No projects match that search.';
    }
  },
};

document.addEventListener('DOMContentLoaded', () => Portfolio.init());
