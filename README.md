# ERS Technologies Limited — Corporate Website UI

High-fidelity five-page static website implementation based on the approved ERS UI direction.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `projects.html` — Our Project
- `contact.html` — Contact Us

## UI stack
- HTML5
- CSS3 / responsive custom design system
- Vanilla JavaScript
- jQuery
- Owl Carousel 2
- AOS (Animate On Scroll)
- Animate.css
- VanillaTilt
- Font Awesome
- Google Fonts

## Run
You can open `index.html` directly in a modern browser. For the best local development experience, serve the folder with any static HTTP server.

Example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes
- The website contains only the five requested pages.
- Request-a-demo and partnership CTAs route into the Contact Us page rather than creating additional pages.
- The contact form includes front-end validation and a polished success state. Connect the submit handler in `assets/js/main.js` to your production email/API/CRM endpoint when backend integration is ready.
- The Google map and UI libraries load from public CDNs and therefore require internet access.
- `design-reference.png` is included for visual comparison with the approved design direction.
