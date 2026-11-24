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
    if (!this.menuBtn || !this.mobileMenu) return;

    this.menuBtn.addEventListener('click', () => {
      const open = this.mobileMenu.classList.toggle('active');
      this.menuBtn.classList.toggle('active', open);
      this.menuBtn.setAttribute('aria-expanded', String(open));
      this.menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
      if (open) this.mobileMenu.querySelector('a')?.focus();
    });

    // Close on any nav link click
    this.allLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
        this.menuBtn.focus();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
        this.closeMenu();
        this.menuBtn.focus();
      }
      if (e.key === 'Tab' && this.mobileMenu.classList.contains('active')) {
        const links = [...this.mobileMenu.querySelectorAll('a')];
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    window.addEventListener('resize', () => this.closeMenu(), { passive: true });
  },

  closeMenu() {
    this.mobileMenu?.classList.remove('active');
    this.menuBtn?.classList.remove('active');
    this.menuBtn?.setAttribute('aria-expanded', 'false');
    this.menuBtn?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  },

  activeLinks() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

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
