/* ==========================================
   ARQ Arquitectura — Portfolio
========================================== */
'use strict';

const Portfolio = {
  init() {
    this.filters();
    this.search();
    this.tilt();
    this.projectLinks();
  },

  /* ── FILTER ─────────────────────────── */

  filters() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = [...document.querySelectorAll('.portfolio-card')];
    const grid = document.querySelector('.portfolio-grid');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show the portfolio grid when a filter is clicked
        if (grid) {
          grid.classList.add('visible');
        }

        const filter = btn.dataset.filter;
        let visIdx = 0;

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;

          if (match) {
            card.style.display = '';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card,
                { opacity: 0, y: 44 },
                { opacity: 1, y: 0, duration: 0.65, delay: visIdx * 0.07, ease: 'power3.out' }
              );
            }
            visIdx++;
          } else {
            if (typeof gsap !== 'undefined') {
              gsap.to(card, { opacity: 0, y: 24, duration: 0.25, onComplete: () => { card.style.display = 'none'; } });
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  },

  /* ── SEARCH ─────────────────────────── */

  search() {
    const searchInput = document.getElementById('portfolio-search');
    const grid = document.querySelector('.portfolio-grid');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.portfolio-grid .portfolio-card');

      // Show grid when searching
      if (searchTerm !== '' && grid) {
        grid.classList.add('visible');
      } else if (searchTerm === '' && grid) {
        grid.classList.remove('visible');
      }

      cards.forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        const location = (card.dataset.location || '').toLowerCase();
        
        const match = title.includes(searchTerm) || location.includes(searchTerm) || searchTerm === '';

        if (match) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  },

  /* ── PROJECT DETAIL LINKS ─────────── */

  projectLinks() {
    // Featured portfolio cards (in .portfolio-featured-grid)
    document.querySelectorAll('.portfolio-featured-grid .portfolio-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');

      const showSimilarProjects = () => {
        const category = card.dataset.category;
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        const grid = document.querySelector('.portfolio-grid');
        
        if (filterBtn) {
          filterBtn.click(); // Trigger the filter
          
          // Scroll to the portfolio grid
          setTimeout(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      };

      card.addEventListener('click', showSimilarProjects);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showSimilarProjects();
        }
      });
    });

    // Main portfolio grid cards
    document.querySelectorAll('.portfolio-grid .portfolio-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');

      const goToProject = () => {
        const slug = this.slugify(card.dataset.title || 'project');
        window.location.href = `project-detail.html?project=${slug}`;
      };

      card.addEventListener('click', goToProject);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          goToProject();
        }
      });
    });
  },

  slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  /* ── 3-D TILT ───────────────────────── */

  tilt() {
    if (typeof gsap === 'undefined') return;

    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const rx = -((e.clientY - r.top)  / r.height - 0.5) * 9;
        const ry =  ((e.clientX - r.left) / r.width  - 0.5) * 9;
        gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 1100, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.65, ease: 'power3.out' });
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Portfolio.init());
