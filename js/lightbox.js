/* ==========================================
   Lightbox
========================================== */

'use strict';

const Lightbox = {

    el: null,

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
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption">
                <span class="lightbox-title"></span>
                <span class="lightbox-location"></span>
            </div>
        `;

        this.img = this.el.querySelector(".lightbox-image");
        this.title = this.el.querySelector(".lightbox-title");
        this.location = this.el.querySelector(".lightbox-location");
        this.closeBtn = this.el.querySelector(".lightbox-close");

    },

    bindTriggers() {

        document.querySelectorAll(".portfolio-card").forEach(card => {

            card.addEventListener("click", () => {

                const img = card.querySelector("img");

                if (!img) return;

                this.open(
                    img.src,
                    card.dataset.title || "",
                    card.dataset.location || ""
                );

            });

        });

    },

    bindClose() {

        this.closeBtn.addEventListener("click", () => this.close());

        this.el.addEventListener("click", e => {

            if (e.target === this.el) this.close();

        });

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") this.close();

        });

    },

    open(src, title, location) {

        this.img.src = src;
        this.title.textContent = title;
        this.location.textContent = location;

        this.el.classList.add("active");

        document.body.classList.add("menu-open");

    },

    close() {

        this.el.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Lightbox.init();

});
