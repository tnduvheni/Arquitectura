/* ==========================================
   Contact Form
========================================== */

'use strict';

const Contact = {

    form: null,

    init() {

        this.form = document.getElementById("contact-form");

        if (!this.form) return;

        this.bindSubmit();

    },

    bindSubmit() {

        this.form.addEventListener("submit", e => {

            e.preventDefault();

            const button = this.form.querySelector("button[type='submit']");
            const original = button.textContent;

            button.textContent = "Message Sent";
            button.disabled = true;

            this.form.reset();

            setTimeout(() => {

                button.textContent = original;
                button.disabled = false;

            }, 3000);

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Contact.init();

});
