/* ==========================================
   Project Detail View
========================================== */
'use strict';

const ProjectDetail = {
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
      image: 'assets/images/portfolio/Residence/IMG-20260628-WA0038.jpg',
      tags: ['Residential', 'Private Home', '2025']
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
      tags: ['Residential', 'Courtyard', '2024']
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
      tags: ['Concept', 'Visualisation', '2024']
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
      tags: ['Residential', 'Glass', '2023']
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
      tags: ['Residential', 'Linear', '2023']
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
      tags: ['Concept', 'Timber', '2022']
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
      tags: ['Residential', 'Coastal', '2022']
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
      tags: ['Residential', 'Garden', '2021']
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
      tags: ['Commercial', 'Workspace', '2021']
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
      tags: ['Concept', 'Pavilion', '2020']
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
      tags: ['Residential', 'Ridge', '2020']
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
      tags: ['Residential', 'Heritage', '2020']
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
  }
};

document.addEventListener('DOMContentLoaded', () => ProjectDetail.init());
