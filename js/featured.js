/* ==========================================
   Featured Project
========================================== */

const Featured = {

    init(){

        this.parallax();

    },

    parallax(){

        if(typeof gsap==="undefined") return;

        gsap.to(".featured-image img",{

            scale:1.15,

            ease:"none",

            scrollTrigger:{

                trigger:".featured-project",

                start:"top bottom",

                end:"bottom top",

                scrub:true

            }

        });

        gsap.from(".featured-content",{

            x:120,

            opacity:0,

            duration:1,

            scrollTrigger:{

                trigger:".featured-content",

                start:"top 80%"

            }

        });

    }

};

document.addEventListener(

"DOMContentLoaded",

()=>Featured.init()

);

