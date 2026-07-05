/* ==========================================
   Project Detail View
========================================== */
'use strict';

const ProjectDetail = {
  /*
   * Each project object below powers this single project-detail.html page.
   * The page is opened as project-detail.html?project=<slug>, and render()
   * reads that slug to decide which object to display.
   *
   * gallery: extra photos of the SAME project, shown in the "More from this
   * project" grid further down the page (see renderGallery()). Leave the
   * array empty ( [] ) for projects that don't have extra photos yet — the
   * gallery section hides itself automatically when there's nothing to show.
   */
  projects: [
    {
      slug: 'hillside-residence',
      title: 'Hillside Residence',
      category: 'Residential',
      type: 'Residential',
      location: 'Sandton, Johannesburg',
      latitude: -26.1295,
      longitude: 28.0537,
      description: 'A sculpted hillside home that balances panoramic views with deep privacy and a calm material palette.',
      image: 'assets/images/portfolio/Residence4/IMG-20260628-WA0061.jpg',
      tags: ['Residential', 'Private Home', '2025'],
      gallery: [
        'assets/images/portfolio/Residence4/IMG-20260628-WA0061.jpg',
        'assets/images/portfolio/Residence4/IMG-20260628-WA0032.jpg'
      ]
    },
    {
      slug: 'courtyard-house',
      title: 'Courtyard House',
      category: 'Residential',
      type: 'Residential',
      location: 'Pretoria East',
      latitude: -25.7461,
      longitude: 28.2524,
      description: 'An inward-looking home organised around a central courtyard, bringing light and climate into daily life.',
      image: 'assets/images/portfolio/Residence/IMG-20260628-WA0040.jpg',
      tags: ['Residential', 'Courtyard', '2024'],
      gallery: [
        'assets/images/portfolio/Residence/IMG-20260628-WA0038.jpg',
        'assets/images/portfolio/Residence/IMG-20260628-WA0042.jpg'
      ]
    },
    {
      slug: 'terrace-pavilion',
      title: 'Terrace Pavilion',
      category: 'Concept',
      type: 'Concept',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A spatial concept exploring layered terraces, framed views and a lightweight pavilion structure.',
      image: 'assets/images/portfolio/Residence/IMG-20260628-WA0042.jpg',
      tags: ['Concept', 'Visualisation', '2024'],
      gallery: [
        'assets/images/portfolio/Residence/IMG-20260628-WA0038.jpg',
        'assets/images/portfolio/Residence/IMG-20260628-WA0040.jpg'
      ]
    },
    {
      slug: 'glass-box-residence',
      title: 'Glass Box Residence',
      category: 'Residential',
      type: 'Residential',
      location: 'Bryanston, Johannesburg',
      latitude: -26.1415,
      longitude: 28.0325,
      description: 'A transparent residence where structure, openness and privacy are carefully calibrated through the facade.',
      image: 'assets/images/portfolio/Residence2/IMG-20260628-WA0085.jpg',
      tags: ['Residential', 'Glass', '2023'],
      gallery: [
        'assets/images/portfolio/Residence2/IMG-20260628-WA0087.jpg',
        'assets/images/portfolio/Residence2/IMG-20260628-WA0089.jpg',
        'assets/images/portfolio/Residence2/IMG-20260628-WA0091.jpg'
      ]
    },
    {
      slug: 'the-linear-house',
      title: 'The Linear House',
      category: 'Residential',
      type: 'Residential',
      location: 'Waterkloof, Pretoria',
      latitude: -25.7368,
      longitude: 28.2703,
      description: 'A linear home designed around movement, framed views and a precise sequence of interior spaces.',
      image: 'assets/images/portfolio/Residence2/IMG-20260628-WA0087.jpg',
      tags: ['Residential', 'Linear', '2023'],
      gallery: [
        'assets/images/portfolio/Residence2/IMG-20260628-WA0085.jpg',
        'assets/images/portfolio/Residence2/IMG-20260628-WA0089.jpg'
      ]
    },
    {
      slug: 'timber-retreat',
      title: 'Timber Retreat',
      category: 'Concept',
      type: 'Concept',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A retreat concept dedicated to calm, tactility and the quiet language of timber construction.',
      image: 'assets/images/portfolio/Residence2/IMG-20260628-WA0089.jpg',
      tags: ['Concept', 'Timber', '2022'],
      gallery: [
        'assets/images/portfolio/Residence2/IMG-20260628-WA0085.jpg',
        'assets/images/portfolio/Residence2/IMG-20260628-WA0087.jpg'
      ]
    },
    {
      slug: 'stone-and-steel-house',
      title: 'Stone & Steel House',
      category: 'Residential',
      type: 'Residential',
      location: 'Constantia, Cape Town',
      latitude: -34.0275,
      longitude: 18.3827,
      description: 'A robust coastal residence connecting stone massing with steel-light detailing and sculptural geometry.',
      image: 'assets/images/portfolio/Residence3/IMG-20260628-WA0075.jpg',
      tags: ['Residential', 'Coastal', '2022'],
      gallery: [
        'assets/images/portfolio/Residence3/IMG-20260628-WA0073.jpg',
        'assets/images/portfolio/Residence3/IMG-20260628-WA0079.jpg'
      ]
    },
    {
      slug: 'garden-residence',
      title: 'Garden Residence',
      category: 'Residential',
      type: 'Residential',
      location: 'Hyde Park, Johannesburg',
      latitude: -26.1234,
      longitude: 28.0515,
      description: 'A garden-oriented home with layered planting, shaded outdoor rooms and generous natural light.',
      image: 'assets/images/portfolio/Residence3/IMG-20260628-WA0079.jpg',
      tags: ['Residential', 'Garden', '2021'],
      gallery: [
        'assets/images/portfolio/Residence3/IMG-20260628-WA0073.jpg',
        'assets/images/portfolio/Residence3/IMG-20260628-WA0075.jpg'
      ]
    },
    {
      slug: 'the-apex-tower',
      title: 'The Apex Tower',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Johannesburg CBD',
      latitude: -26.1922,
      longitude: 28.0444,
      description: 'A commercial tower proposal focused on presence, efficiency and a calm civic identity at street level.',
      image: 'assets/images/portfolio/Residence4/IMG-20260628-WA0025.jpg',
      tags: ['Commercial', 'Workspace', '2021'],
      gallery: [
        'assets/images/portfolio/Residence4/IMG-20260628-WA0032.jpg'
      ]
    },
    {
      slug: 'the-black-pavilion',
      title: 'The Black Pavilion',
      category: 'Concept',
      type: 'Concept',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'An expressive concept pavilion using form, shadow and a dark material language to shape atmosphere.',
      image: 'assets/images/portfolio/Residence4/IMG-20260628-WA0057.jpg',
      tags: ['Concept', 'Pavilion', '2020'],
      gallery: [
        'assets/images/portfolio/Residence4/IMG-20260628-WA0061.jpg',
        'assets/images/portfolio/Residence4/IMG-20260628-WA0032.jpg'
      ]
    },
    {
      slug: 'the-ridge',
      title: 'The Ridge',
      category: 'Residential',
      type: 'Residential',
      location: 'Sandton, Johannesburg',
      latitude: -26.1352,
      longitude: 28.0592,
      description: 'A ridge-top residence shaped by long sightlines, sheltered terraces and an architectural restraint.',
      image: 'assets/images/portfolio/Residence3/IMG-20260628-WA0073.jpg',
      tags: ['Residential', 'Ridge', '2020'],
      gallery: [
        'assets/images/portfolio/Residence3/IMG-20260628-WA0075.jpg',
        'assets/images/portfolio/Residence3/IMG-20260628-WA0079.jpg'
      ]
    },
    {
      slug: 'heritage-court',
      title: 'Heritage Court',
      category: 'Residential',
      type: 'Residential',
      location: 'Rosebank, Johannesburg',
      latitude: -26.1438,
      longitude: 28.0525,
      description: 'A layered family home that weaves heritage, light and spatial calm into a contemporary interior.',
      image: 'assets/images/portfolio/Residence2/IMG-20260628-WA0091.jpg',
      tags: ['Residential', 'Heritage', '2020'],
      gallery: [
        'assets/images/portfolio/Residence2/IMG-20260628-WA0085.jpg',
        'assets/images/portfolio/Residence2/IMG-20260628-WA0087.jpg'
      ]
    },

    /*
     * The projects below match the newer cards added to the #portfolio grid
     * in index.html. Their folders (SPA, House Madhie, HOUSE MPHO, House NG,
     * RIASHUMISANA, JANE FURSE, RIBOLLA INN, MAMI LIFE, MTG HQ, MTG LTT,
     * MTG MAKHONDE) weren't included in the project files I was given, so I
     * can't see what other photos live inside them. `gallery` is left empty
     * for these — drop in the extra filenames from each folder and the
     * gallery grid will pick them up automatically, no other code changes
     * needed.
     */
    {
      slug: 'house-mpho',
      title: 'House Mpho',
      category: 'Residential',
      type: 'Residential',
      location: 'Limpopo',
      latitude: -25.7368,
      longitude: 28.2703,
      description: 'A residence composed around natural light and a considered material palette.',
      image: 'assets/images/portfolio/HOUSE MPHO/IMG_4455.jpeg',
      tags: ['Residential', '2025'],
      gallery: ['assets/images/portfolio/HOUSE MPHO/IMG_4419.jpeg','assets/images/portfolio/HOUSE MPHO/IMG_4421.jpeg','assets/images/portfolio/HOUSE MPHO/IMG_4448.jpeg','assets/images/portfolio/HOUSE MPHO/IMG_4455.jpeg',
        'assets/images/portfolio/HOUSE MPHO/IMG_4456.jpeg','assets/images/portfolio/HOUSE MPHO/IMG_4459.jpeg','assets/images/portfolio/HOUSE MPHO/IMG_4462.jpeg'
      ]
    },
    {
      slug: 'house-ng',
      title: 'House NG',
      category: 'Residential',
      type: 'Residential',
      location: 'Waterkloof, Pretoria',
      latitude: -25.7368,
      longitude: 28.2703,
      description: 'A home shaped by its site, balancing openness with privacy.',
      image: 'assets/images/portfolio/House NG/IMG_0663.jpg',
      tags: ['Residential', '2025'],
      gallery: ['assets/images/portfolio/House NG/IMG_0057.jpg','assets/images/portfolio/House NG/IMG_0240.jpg',
        'assets/images/portfolio/House NG/IMG_0246.jpg','assets/images/portfolio/House NG/IMG_0564.jpg','assets/images/portfolio/House NG/IMG_0590.jpg',
        'assets/images/portfolio/House NG/IMG_0639.jpg','assets/images/portfolio/House NG/IMG_0652.jpg','assets/images/portfolio/House NG/IMG_0663.jpg',
        'assets/images/portfolio/House NG/IMG_0684.jpg','assets/images/portfolio/House NG/IMG_2514.jpg'
      ]
    },
    {
      slug: 'riashumisana',
      title: 'Riashumisana',
      category: 'Residential',
      type: 'Residential',
      location: 'Limpopo',
      latitude: -23.9045,
      longitude: 29.4689,
      description: 'A residential project rooted in its Limpopo landscape and local building traditions.',
      image: 'assets/images/portfolio/RIASHUMISANA/V_2 - Photo.jpg',
      tags: ['Residential', '2025'],
      gallery: ['assets/images/portfolio/RIASHUMISANA/V_1 - Photo.jpg','assets/images/portfolio/RIASHUMISANA/V_2 - Photo.jpg',
        'assets/images/portfolio/RIASHUMISANA/V_3 - Photo.jpg','assets/images/portfolio/RIASHUMISANA/V1.jpg'
      ]
    },
    {
      slug: 'jane-furse',
      title: 'Jane Furse',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -24.8333,
      longitude: 29.9000,
      description: 'A commercial complex concept study focused on community and civic presence.',
      image: 'assets/images/portfolio/JANE FURSE/JF_Photo - 4.jpg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/JANE FURSE/JF_Photo - 4.jpg','ARQfixed/assets/images/portfolio/JANE FURSE/JF_Photo - 6.jpg','ARQfixed/assets/images/portfolio/JANE FURSE/JF_Photo - 7.jpg',
        'ARQfixed/assets/images/portfolio/JANE FURSE/JF_Photo - 10.jpg'
      ]
    },
    {
      slug: 'ribolla-inn',
      title: 'Riabolla Inn',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A hospitality concept study exploring guest experience and material warmth.',
      image: 'assets/images/portfolio/RIBOLLA INN/WhatsApp Image 2025-12-29 at 00.06.33.jpeg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/RIBOLLA INN/WhatsApp Image 2025-12-29 at 00.06.33.jpeg','assets/images/portfolio/RIBOLLA INN/WhatsApp Image 2025-12-29 at 00.06.45 (1).jpeg',
        'assets/images/portfolio/RIBOLLA INN/WhatsApp Image 2025-12-29 at 00.06.59.jpeg','assets/images/portfolio/RIBOLLA INN/WhatsApp Image 2025-12-29 at 00.07.11.jpeg'
      ]
    },
    {
      slug: 'spa',
      title: 'SPA',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A commercial concept study centred on wellbeing and everyday ritual.',
      image: 'assets/images/portfolio/SPA/f3.jpg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/SPA/F1 (2).jpg',
        'assets/images/portfolio/SPA/F2 (1).jpg',
        'assets/images/portfolio/SPA/f3.jpg',
        'assets/images/portfolio/SPA/T_Photo-1.jpg',
        'assets/images/portfolio/SPA/T_Photo-3.jpg',
        'assets/images/portfolio/SPA/T_Photo-5.jpg',
        'assets/images/portfolio/SPA/T_Photo-8.jpg'
       ]
    },
    {
      slug: 'mami-life',
      title: 'Mami Life',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A commercial concept study centred on wellbeing and everyday ritual.',
      image: 'assets/images/portfolio/MAMI LIFE/ChatGPT Image Jun 3, 2026, 07_52_45 PM.png',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/MAMI LIFE/ChatGPT Image Jun 3, 2026, 07_46_51 PM.png','assets/images/portfolio/MAMI LIFE/ChatGPT Image Jun 3, 2026, 07_46_49 PM.png',
          'assets/images/portfolio/MAMI LIFE/ChatGPT Image Jun 3, 2026, 07_52_45 PM.png'
      ]
    },
    {
      slug: 'mtg-hq',
      title: 'MTG HQ',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Limpopo',
      latitude: -23.9045,
      longitude: 29.4689,
      description: 'A headquarters concept designed around efficiency and a calm corporate identity.',
      image: 'assets/images/portfolio/MTG HQ/image00034.jpeg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/MTG HQ/d96e4ee8-09b6-4ba6-8d9d-cfa31b1e7c66.JPG','assets/images/portfolio/MTG HQ/image00002.jpeg',
        'assets/images/portfolio/MTG HQ/image00018.jpeg','assets/images/portfolio/MTG HQ/image00034.jpeg','assets/images/portfolio/MTG HQ/image00087.jpeg'
      ]
    },
    {
      slug: 'mtg-ltt',
      title: 'MTG LTT',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A commercial concept study exploring modular, efficient workspace planning.',
      image: 'assets/images/portfolio/MTG LTT/F3.jpg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/MTG LTT/EFFECTS.jpg','assets/images/portfolio/MTG LTT/F3.jpg',
        'assets/images/portfolio/MTG LTT/F4 EDIT.jpg','assets/images/portfolio/MTG LTT/F5 EDIT.jpg','assets/images/portfolio/MTG LTT/F7 EDIT.jpg'
      ]
    },
    {
      slug: 'mtg-makhonde',
      title: 'MTG Makhonde',
      category: 'Commercial',
      type: 'Commercial',
      location: 'Concept Study',
      latitude: -26.2041,
      longitude: 28.0473,
      description: 'A commercial concept study extending the MTG brand into a new regional site.',
      image: 'assets/images/portfolio/MTG MAKHONDE/F1 (2).jpg',
      tags: ['Commercial', 'Concept'],
      gallery: ['assets/images/portfolio/MTG MAKHONDE/F1 (2).jpg','assets/images/portfolio/MTG MAKHONDE/F2 (1).jpg',
        'assets/images/portfolio/MTG MAKHONDE/F3.jpg'
      ]
    }
  ],

  init() {
    this.render();
  },

  render() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    const project = this.projects.find(item => item.slug === slug) || this.projects[0];

    document.title = `ARQ Arquitectura | ${project.title}`;

    const image = document.getElementById('project-image');
    const title = document.getElementById('project-detail-heading');
    const category = document.getElementById('project-category');
    const description = document.getElementById('project-description');
    const location = document.getElementById('project-location');
    const type = document.getElementById('project-type');
    const tags = document.getElementById('project-tags');

    if (image) image.src = project.image;
    if (image) image.alt = `${project.title} — ARQ Arquitectura project`;
    if (title) title.textContent = project.title;
    if (category) category.textContent = project.category;
    if (description) description.textContent = project.description;
    if (location) location.textContent = project.location;
    if (type) type.textContent = project.type;

    if (tags) {
      tags.innerHTML = '';
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tags.appendChild(span);
      });
    }

    // Update map with project coordinates
    this.updateMap(project);

    // Populate the "more from this project" thumbnail grid
    this.renderGallery(project);
  },

  updateMap(project) {
    // Update map location text
    const locationText = document.getElementById('map-location-text');
    if (locationText) {
      locationText.textContent = project.location;
    }

    // Update address
    const addressEl = document.getElementById('map-address');
    if (addressEl) {
      addressEl.textContent = project.location;
    }

    // Update coordinates
    const coordinatesEl = document.getElementById('map-coordinates');
    if (coordinatesEl) {
      const lat = project.latitude.toFixed(4);
      const lon = project.longitude.toFixed(4);
      const latDir = project.latitude >= 0 ? 'N' : 'S';
      const lonDir = project.longitude >= 0 ? 'E' : 'W';
      coordinatesEl.textContent = `${Math.abs(project.latitude).toFixed(4)}° ${latDir}, ${Math.abs(project.longitude).toFixed(4)}° ${lonDir}`;
    }

    // Update map iframe URL with new coordinates
    const mapIframe = document.getElementById('project-map');
    if (mapIframe && project.latitude && project.longitude) {
      const zoomLevel = project.location === 'Concept Study' ? 3 : 15;
      const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${15000 / zoomLevel}!2d${project.longitude}!3d${project.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s${project.location}!5e0!3m2!1sen!2s!4v1234567890`;
      mapIframe.src = embedUrl;
    }
  },

  /*
   * Fills the "More from this project" grid with the project's extra
   * photos (project.gallery). If a project has no gallery images yet, the
   * whole section is hidden rather than showing an empty grid.
   */
  renderGallery(project) {
    const section = document.getElementById('project-gallery-section');
    const grid = document.getElementById('project-gallery');
    if (!section || !grid) return;

    grid.innerHTML = '';

    if (!project.gallery || project.gallery.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';

    project.gallery.forEach((src, index) => {
      const figure = document.createElement('div');
      figure.className = 'project-gallery-item';

      const img = document.createElement('img');
      img.src = src;
      img.alt = `${project.title} — additional view ${index + 1}`;
      img.loading = 'lazy';

      figure.appendChild(img);
      grid.appendChild(figure);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ProjectDetail.init());
