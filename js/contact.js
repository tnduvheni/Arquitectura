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

            if (!this.form.reportValidity()) return;

            const values = new FormData(this.form);
            const status = this.form.querySelector('.contact-form-status');
            const subject = values.get('subject') || 'New architecture enquiry';
            const body = [
                `Name: ${values.get('name')}`,
                `Email: ${values.get('email')}`,
                `Project type: ${values.get('subject') || 'Not specified'}`,
                '',
                values.get('message'),
            ].join('\n');

            // This static site has no message server; open a ready-to-send
            // email draft instead of showing a false success state.
            window.location.href = `mailto:studio@arqarquitectura.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            if (status) status.textContent = 'Your email app will open with the project details ready to send.';

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Contact.init();

});
