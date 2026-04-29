# Harvard University Website

A responsive, multi-section university landing page built with HTML and CSS, featuring a mobile-friendly navigation menu.

## Project Structure

```
project/
├── index.html
├── styles.css
└── images/
    ├── Harvard-University-Logo.png
    ├── Cambridge.jpg
    ├── Allston.png
    ├── hlc-campus-day.jpg
    ├── library-harvard-edited.jpg
    ├── Lab.webp
    ├── stadium.jpg
    ├── user1.jpeg
    ├── user2.jpeg
    └── user3.jpeg
```

## Features

- **Responsive Navigation** — Hamburger menu for mobile with slide-in/out toggle using vanilla JavaScript
- **Hero Section** — Full-screen header with background image and call-to-action button
- **Courses Section** — Three-column layout showcasing Intermediate, Degree, and Post Graduation programs
- **Global Campus Section** — Image cards with hover overlay labels for Cambridge, Allston, and Longwood Boston campuses
- **Facilities Section** — Highlights the library, laboratories, and stadium
- **Testimonials Section** — Student reviews with star ratings using inline SVG icons
- **Call to Action (CTA) Section** — Enrollment prompt with a contact button
- **Footer** — University logo and brief about description

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling and responsive layout (via `styles.css`) |
| JavaScript (Vanilla) | Mobile menu toggle (`showMenu` / `hideMenu`) |
| Google Fonts | Typography (`Google Sans` font family) |
| Bootstrap Icons (SVG) | Hamburger menu, close button, and star rating icons |

## Getting Started

1. **Clone or download** the repository.
2. Ensure the `images/` folder contains all required image assets (listed above).
3. Open `index.html` in any modern web browser — no build step or server required.

```bash
# Example: serve locally with Python
python -m http.server 8000
# Then visit http://localhost:8000
```

## Navigation Menu (Mobile)

The navigation toggle is handled by two JavaScript functions at the bottom of `index.html`:

```javascript
function showMenu() {
    navLinks.style.right = "0";       // Slides menu into view
}
function hideMenu() {
    navLinks.style.right = "-200px";  // Slides menu out of view
}
```

The hamburger (☰) icon triggers `showMenu()` and the close (✕) icon triggers `hideMenu()`.

## Customization

- **Text content** — Replace the Lorem Ipsum placeholder text in each section with real content.
- **Images** — Swap image files in the `images/` folder, keeping the same filenames, or update the `src` attributes in `index.html`.
- **Colors & Fonts** — Edit `styles.css` to change the color scheme, typography, and spacing.
- **Navigation Links** — Update the `<a href="">` values in the `<ul>` inside `.nav-links` to point to real pages or sections.

## Browser Support

Compatible with all modern browsers (Chrome, Firefox, Safari, Edge). No external JavaScript libraries are required.

## License

This project is intended for educational and demonstration purposes.
