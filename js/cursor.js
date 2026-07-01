/* ==========================================
   ARQ Arquitectura
   Premium Cursor
========================================== */

'use strict';

const Cursor = {

    cursor: null,
    dot: null,
    ring: null,
    text: null,

    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,

    ringX: window.innerWidth / 2,
    ringY: window.innerHeight / 2,

    speed: 0.18,

    init() {

        this.cursor = document.getElementById("cursor");

        if (!this.cursor) return;

        this.dot = this.cursor.querySelector(".cursor-dot");
        this.ring = this.cursor.querySelector(".cursor-ring");
        this.text = this.cursor.querySelector(".cursor-text");

        this.events();

        this.animate();

    },

    events() {

        document.addEventListener("mousemove", e => {

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

        });

        document.addEventListener("mouseleave", () => {

            this.cursor.style.opacity = 0;

        });

        document.addEventListener("mouseenter", () => {

            this.cursor.style.opacity = 1;

        });

        this.hover("a","↗");
        this.hover("button","→");
        this.hover(".btn","OPEN");
        this.hover(".portfolio-card","VIEW");
        this.hover(".service-card","+");

    },

    hover(selector,label){

        document.querySelectorAll(selector).forEach(item=>{

            item.addEventListener("mouseenter",()=>{

                this.cursor.classList.add("active");

                this.text.textContent = label;

            });

            item.addEventListener("mouseleave",()=>{

                this.cursor.classList.remove("active");

                this.text.textContent = "";

            });

        });

    },

    animate(){

        this.ringX += (this.mouseX - this.ringX) * this.speed;
        this.ringY += (this.mouseY - this.ringY) * this.speed;

        this.dot.style.transform =
            `translate(${this.mouseX}px, ${this.mouseY}px)`;

        this.ring.style.transform =
            `translate(${this.ringX}px, ${this.ringY}px)`;

        this.text.style.transform =
            `translate(${this.ringX}px, ${this.ringY}px)`;

        requestAnimationFrame(()=>this.animate());

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    Cursor.init();

});

