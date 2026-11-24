# ARQ Arquitectura

Static architecture studio website with an immersive home page and shared project case-study pages.

## Pages

- `index.html` — studio introduction, scroll-led walkthrough, portfolio, services, process and contact.
- `project-detail.html?project=<slug>` — project overview, location, image gallery and next-project navigation.

## Preview locally

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Project content

Project titles, descriptions, locations, map coordinates and gallery image paths live in `js/project-detail.js`. Portfolio cards and categories live in `index.html`; keep their `data-title`, `data-category` and `project-detail.html?project=` values aligned with the project record.

The contact form opens a prefilled email draft because this static site has no server endpoint. Project galleries open in a keyboard-accessible lightbox. Scroll and doorway transitions respect the visitor's reduced-motion preference.
