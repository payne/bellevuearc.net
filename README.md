# AARC Website

A mobile-friendly static website for the Amateur Radio Club, built with [Eleventy (11ty)](https://www.11ty.dev/).

## Features

- **Mobile-First Responsive Design**: Optimized for all screen sizes
- **Large, Readable Fonts**: Enhanced readability on all devices
- **Collapsible Hamburger Menu**: Smooth slide-out navigation with left rail
- **Bookmarkable Pages**: SEO-friendly URLs for all pages
- **Fast Loading**: Static site generation for optimal performance

## Pages

1. **Home** - Welcome page with club overview
2. **Meetings** - Monthly meeting schedule and information
3. **About Us** - Club history, officers, and membership information
4. **Area Ham-Fests** - Upcoming ham-fest calendar
5. **Area NETs** - Radio net schedules and information
6. **Area Repeaters** - Local repeater directory
7. **Calendar** - Complete events calendar

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or navigate to this repository:
```bash
cd aarc_reboot
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with live reload:
```bash
npm start
```

The site will be available at `http://localhost:8080`

The development server will automatically rebuild when you make changes to files.

### Build for Production

Generate the static site:
```bash
npm run build
```

The built site will be in the `_site/` directory, ready to deploy to any static hosting service.

## Project Structure

```
aarc_reboot/
├── src/
│   ├── _layouts/          # Page templates
│   │   └── base.njk       # Base layout with navigation
│   ├── css/               # Stylesheets
│   │   └── style.css      # Main stylesheet
│   ├── js/                # JavaScript files
│   │   └── menu.js        # Hamburger menu functionality
│   ├── index.md           # Home page
│   ├── meetings.md        # Meetings page
│   ├── about.md           # About Us page
│   ├── hamfests.md        # Ham-Fests page
│   ├── nets.md            # NETs page
│   ├── repeaters.md       # Repeaters page
│   └── calendar.md        # Calendar page
├── _site/                 # Generated site (after build)
├── .eleventy.js           # 11ty configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Customization

### Updating Content

All page content is in Markdown files in the `src/` directory. Simply edit these files to update the content.

### Modifying Styles

Edit `src/css/style.css` to customize the appearance. The site uses CSS custom properties (variables) for easy theming:

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --text-color: #333;
  --bg-color: #f5f5f5;
  --sidebar-width: 280px;
}
```

### Adding New Pages

1. Create a new `.md` file in `src/`
2. Add frontmatter with layout and title:
```markdown
---
layout: base.njk
title: Your Page Title
permalink: /your-page/
---

Your content here...
```
3. Add a link to the navigation in `src/_layouts/base.njk`

## Deployment

The generated `_site/` directory can be deployed to any static hosting service:

- **Netlify**: Drop the `_site` folder or connect your Git repository
- **Vercel**: Deploy directly from Git
- **GitHub Pages**: Push the `_site` folder to `gh-pages` branch
- **Traditional Web Host**: Upload the `_site` folder contents via FTP

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## License

MIT License

## Support

For questions or issues, contact the club webmaster or open an issue in the repository.

---

73 and happy coding!
