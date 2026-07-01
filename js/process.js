/* ==========================================
   Process Timeline
========================================== */

const Process = {

    init() {

        this.animateTimeline();

    },

    animateTimeline() {

        if (typeof gsap === "undefined") return;

        gsap.utils.toArray(".timeline-item").forEach(item => {

            gsap.from(item, {

                scrollTrigger: {

                    trigger: item,

                    start: "top 85%"

                },

                opacity: 0,

                x: 80,

                duration: 0.8,

                ease: "power3.out"

            });

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Process.init();

});

