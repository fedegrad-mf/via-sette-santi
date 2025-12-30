# Via dei Sette Santi

A multilingual website for "Via dei Sette Santi" (Path of the Seven Saints), a spiritual trekking route in the Sibillini Mountains, Marche, Italy.

![Homepage Hero](https://github.com/user-attachments/assets/5e2919ea-f73c-4f17-9d8a-64d20ccbf3ba)

## 🌟 About the Project

The Via dei Sette Santi is a 5-day circular trekking route that connects 7 churches dedicated to 7 saints in the Tenna Valley between Amandola and Montefortino. This website serves as the digital gateway to this spiritual journey, providing comprehensive information about:

- **5 Trail Stages**: Detailed information about each stage of the journey
- **7 Sacred Churches**: Historical and cultural insights about the churches and their patron saints
- **Booking System**: Options for individual, group, and premium guided experiences
- **Multilingual Support**: Content available in English, Italian, and German
- **Pilgrim Reviews**: Testimonials from those who have walked the path

## 🚀 Technology Stack

- **Framework**: [Astro 5.x](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com) - Utility-first CSS framework
- **Language**: TypeScript - For type safety and better development experience
- **Deployment**: Static site generation (SSG)
- **Content**: Markdown files with frontmatter for trails and saints

## 📁 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── logo.svg
│       ├── hero-1.jpg, hero-2.jpg, hero-3.jpg
│       ├── trails/        # Trail images
│       └── saints/        # Saint images
├── src/
│   ├── components/
│   │   ├── HeroCarousel.astro
│   │   ├── TrailCard.astro
│   │   ├── SaintCard.astro
│   │   ├── ReviewCard.astro
│   │   ├── BookingSection.astro
│   │   ├── ThemeToggle.astro
│   │   └── LanguagePicker.astro
│   ├── content/
│   │   ├── trails/        # Trail content in en, it, de
│   │   └── saints/        # Saint content in en, it, de
│   ├── i18n/
│   │   ├── languages.ts   # Supported languages
│   │   ├── ui.ts          # UI translations
│   │   └── utils.ts       # i18n helper functions
│   ├── layouts/
│   │   └── Base.astro     # Common base layout
│   ├── pages/
│   │   ├── index.astro    # Homepage redirect
│   │   ├── [lang]/        # Language-specific routes
│   │   │   ├── index.astro
│   │   │   ├── trails/
│   │   │   └── saints/
│   │   └── robots.txt.ts
│   ├── styles/
│   │   └── global.css     # Global styles & Tailwind config
│   ├── utils/
│   │   └── path.ts        # Path helpers
│   └── content.config.ts  # Content collections config
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🌍 Internationalization

The site supports three languages:
- **English** (en) - Default language
- **Italian** (it) - Primary language for local audience
- **German** (de) - For German-speaking visitors

Content is organized in language-specific folders within the `src/content/` directory. UI translations are managed in `src/i18n/ui.ts`.

### URL Structure

- English: `/en/`
- Italian: `/it/`
- German: `/de/`

All routes maintain language prefixes for consistency and SEO optimization.

## 📝 Content Management

### Trails

Trail content is stored in `src/content/trails/{lang}/trail-{number}.md` with the following schema:

```yaml
---
number: 1
title: Trail Title
description: Brief description
distance: "12 km"
duration: "4 hours"
difficulty: moderate
elevation: "+450m / -200m"
startPoint: Start location
endPoint: End location
highlights:
  - Highlight 1
  - Highlight 2
image: trail-1.jpg
date: 2025-12-28
---

# Trail Content

Markdown content goes here...
```

### Saints

Saint content is stored in `src/content/saints/{lang}/saint-name.md` with the following schema:

```yaml
---
name: Saint Name
church: Church Name
location: Location
description: Brief description
history: Historical information
feastDay: Date
image: saint-image.jpg
date: 2025-12-28
---

# Saint Content

Markdown content goes here...
```

## 🎨 Design System

The site uses a custom design system built with Tailwind CSS, featuring:

- **Light/Dark Mode**: Automatic theme switching with manual toggle
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1280px
- **Color Palette**: Orange primary, blue-gray secondary, green accent
- **Typography**: System font stack for optimal performance
- **Components**: Reusable card, button, and form components

## 🔧 Development

### Adding New Content

1. **New Trail**: Create a markdown file in `src/content/trails/{lang}/` with the trail schema
2. **New Saint**: Create a markdown file in `src/content/saints/{lang}/` with the saint schema
3. **New Translation**: Add translations to `src/i18n/ui.ts`

### Customizing Styles

Global styles and Tailwind configuration are in `src/styles/global.css`. The design system uses CSS custom properties for theming.

## 📦 Building for Production

```sh
npm run build
```

The build output will be in the `./dist/` directory, ready for deployment to any static hosting service.

## 🚢 Deployment

The site can be deployed to:
- **Netlify**: Connect your repository and deploy automatically
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Use GitHub Actions workflow
- **Any static hosting**: Upload the `dist/` folder

Set environment variables for production:
- `SITE`: Your site URL (e.g., `https://viasettesanti.it`)
- `BASE`: Base path if not root (e.g., `/path`)

## 📄 License

This project is for "Via dei Sette Santi" spiritual trekking route.

## 🙏 Acknowledgments

- Trail and saint information provided by local historical sources
- Photography credits: (to be added)
- Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)

---

**Via dei Sette Santi** - A spiritual journey through the Sibillini Mountains
