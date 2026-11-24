/* ==========================================
   Lightbox
========================================== */

'use strict';

const Lightbox = {

    el: null,
    images: [],
    index: 0,
    returnFocus: null,

    init() {

        this.el = document.getElementById("lightbox");

        if (!this.el) return;

        this.build();
        this.bindTriggers();
        this.bindClose();

    },

    build() {

        this.el.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous image">←</button>
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-nav lightbox-next" aria-label="Next image">→</button>
            <div class="lightbox-caption">
                <span class="lightbox-title"></span>
                <span class="lightbox-location"></span>
                <span class="lightbox-count" aria-live="polite"></span>
            </div>
        `;

        this.img = this.el.querySelector(".lightbox-image");
        this.title = this.el.querySelector(".lightbox-title");
        this.location = this.el.querySelector(".lightbox-location");
        this.closeBtn = this.el.querySelector(".lightbox-close");
        this.count = this.el.querySelector(".lightbox-count");
        this.prevBtn = this.el.querySelector(".lightbox-prev");
        this.nextBtn = this.el.querySelector(".lightbox-next");

    },

    bindTriggers() {

        const gallery = document.getElementById('project-gallery');
        if (!gallery) return;
        const openImage = image => {
            if (!image) return;
            this.images = [...gallery.querySelectorAll('img')];
            this.index = this.images.indexOf(image);
            this.returnFocus = image;
            this.showCurrent();
            this.el.classList.add('active');
            document.body.classList.add('menu-open');
            this.closeBtn.focus();
        };
        gallery.addEventListener('click', event => openImage(event.target.closest('img')));

    },

    bindClose() {

        this.closeBtn.addEventListener("click", () => this.close());
        this.prevBtn.addEventListener('click', () => this.move(-1));
        this.nextBtn.addEventListener('click', () => this.move(1));

        this.el.addEventListener("click", e => {

            if (e.target === this.el) this.close();

        });

        document.addEventListener("keydown", e => {

            if (!this.el.classList.contains('active')) return;
            if (e.key === "Escape") this.close();
            if (e.key === "ArrowLeft") this.move(-1);
            if (e.key === "ArrowRight") this.move(1);
            if (e.key === 'Tab') {
                const controls = [...this.el.querySelectorAll('button:not(:disabled)')];
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }

        });

    },

    showCurrent() {
        const image = this.images[this.index];
        if (!image) return;
        this.img.src = image.src;
        this.img.alt = image.alt;
        this.title.textContent = document.getElementById('project-detail-heading')?.textContent || 'Project';
        this.location.textContent = document.getElementById('project-location')?.textContent || '';
        this.count.textContent = `${this.index + 1} / ${this.images.length}`;
        this.prevBtn.disabled = this.images.length < 2;
        this.nextBtn.disabled = this.images.length < 2;
    },

    move(direction) {
        if (this.images.length < 2) return;
        this.index = (this.index + direction + this.images.length) % this.images.length;
        this.showCurrent();
    },

    close() {

        this.el.classList.remove("active");

        document.body.classList.remove("menu-open");
        this.returnFocus?.focus();

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Lightbox.init();

});
