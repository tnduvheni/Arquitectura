/* ==========================================
   ARQ Arquitectura — Navigation
========================================== */
'use strict';

const Navigation = {
  init() {
    this.header     = document.querySelector('header');
    this.menuBtn    = document.querySelector('.menu-btn');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.allLinks   = [
      ...document.querySelectorAll('.nav-links a'),
      ...document.querySelectorAll('.mobile-menu a'),
    ];

    this.stickyHeader();
    this.mobileToggle();
    this.activeLinks();
  },

  stickyHeader() {
    const update = () => this.header.classList.toggle('scrolled', window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
  },

  mobileToggle() {
    if (!this.menuBtn) return;

    this.menuBtn.addEventListener('click', () => {
      const open = this.mobileMenu.classList.toggle('active');
      this.menuBtn.classList.toggle('active', open);
      this.menuBtn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });

    // Close on any nav link click
    this.allLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeMenu();
    });
  },

  closeMenu() {
    this.mobileMenu?.classList.remove('active');
    this.menuBtn?.classList.remove('active');
    this.menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  },

  activeLinks() {
    const sections = document.querySelectorAll('section[id]');

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        this.allLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { threshold: 0.35 });

    sections.forEach(s => io.observe(s));
  },
};

document.addEventListener('DOMContentLoaded', () => Navigation.init());
