# GitHub Copilot Instructions - Sentiero dei Sette Santi

## Project Overview

This is a website for "la Via dei Sette Santi" (Path of the Seven Saints), a spiritual trekking/pilgrimage route in Sibillini Mountains (Marche, Italy). The site provides comprehensive information about the 5-stage circular trail, booking options, and aims to build a community around this spiritual journey through the Amandola e Montefortino municipalities territory.

### Project Goals
1. **Showcase the Trekking Route**: Present the 5 stages with detailed information, maps, and historical/cultural context
2. **Enable Bookings**: Allow users to reserve organized tours (individual, group, premium experiences)
3. **Content Publishing**: Blog section for news, events, and trekking-related content
4. **Community Building**: User engagement through comments, reviews, and social features
5. **Technical Excellence**: Fast, accessible, SEO-friendly, and maintainable codebase

## Technology Stack

- **Framework**: Astro 5.x (content-focused, static-first)
- **Styling**: Tailwind CSS 3.x (utility-first CSS)
- **Language**: TypeScript (for type safety)
- **Deployment**: Static site generation (SSG)

## Coding Conventions

### File Naming
- Use **kebab-case** for files: `trail-details.astro`, `user-comments.ts`
- Astro components: PascalCase in imports, but kebab-case filenames acceptable
- TypeScript/Data files: camelCase for exports, kebab-case for filenames

### Routing
- To reference public images use `${import.meta.env.BASE_URL}images/***.jpg` so it works with base URL after deploy

## Astro Architecture
- Project infrastructure reflects standard Astro best practices and documentation
- The helper `getResourceRoute` in `src/utils/path.ts` are used to split the current URL and getting the specific resource pathname without base URL and language codes

### Page Structure
```
src/pages/
  ├── index.astro               # Homepage (redirect to language-specific index)
  └── [lang]                    # Dynamic language route parameter
      ├── index.astro           # Language-specific homepage
      ├── trails                # Feature folder: trails and trekking paths 
      │   ├── index.astro       # Feature local homepage/index
      │   └── [...slug].astro   # Feature Contents (pages with dynamic route and Collections)
      └── saints                # Feature folder: saints and churches detail sheets 
          ├── index.astro       # Feature local homepage/index (currently empty)
          └── [...slug].astro   # Feature Contents (pages with dynamic route and Collections)
```

### Common Base Astro Layout
- Use a single common base layout for the whole site: `src/layouts/Base.astro`
- Layout handles common elements: header, footer, navigation, meta tags, i18n setup
- Layout contains common JavaScript/TypeScript logic for all pages

### Dynamic Contents with Collections
- Features pages (trails, saints) use Astro Content Collections for managing dynamic content (see: https://docs.astro.build/en/guides/content-collections/)

```
src/
└── content/
    ├── trails/        # Contents for the feature "trails"
    │   ├── en/        # Collection for Contents in English language
    │   ├── it/        # Collection for Contents in Italian language
    │   ├── de/        # Collection for Contents in German language
    │   └── .../       # Other languages supported
    ├── saints/        # Contents for the feature "saints"
    │   ├── en/        # Collection for Contents in English language              
    │   ├── it/        # Collection for Contents in Italian language              
    │   ├── de/        # Collection for Contents in German language              
    │   └── .../       # Other languages supported             
    └── .../           # Contents for other features
        ├── en/        # Collection for Contents in English language        
        ├── it/        # Collection for Contents in Italian language        
        ├── de/        # Collection for Contents in German language        
        └── .../       # Other languages supported           
```

### Internationalization (i18n)
- Multi-language support is implemented with standard Astro support
- Supported languages are stored in a single source of truth file: `src/i18n/languages.ts`; other occurrences of language codes should be imported and derived from this file
- UI translations, texts, and labels can be found in `src/i18n/ui.ts`
- i18n helper methods are in `src/i18n/utils.ts`
- Use `useTranslations(lang)` helper to get translated strings (https://docs.astro.build/en/recipes/i18n/#translate-ui-strings)
- Internationalization implementation determines route structure as: /base-url/[lang]/resource-path
- Default language has its own explicit route (see https://docs.astro.build/en/recipes/i18n/#hide-default-language-in-the-url)
- The [lang] node of the route is implemented as Astro standard dynamic route parameters (https://docs.astro.build/en/guides/routing/#dynamic-routes), so there is a single common `src/pages/[lang]` populated by the `getStaticPaths()` method in its related `index.astro` file
- The main `src/pages/index.astro` redirects to the default language index page, trying to determine the user preferred locale (https://docs.astro.build/en/guides/internationalization/#browser-language-detection)
- URI structure is in English (e.g., `/trails`, `/saints`); there are no language-specific routes for the resource paths (future improvement)
- `src/components/LanguagePicker.astro` component implements the language switcher, generating correct relative URLs for the current resource in the selected language
- Relative URLs for i18n are generated with Astro's built-in `getRelativeLocaleUrl(lang, resourcePath)` method (https://docs.astro.build/en/guides/internationalization/#create-links; https://docs.astro.build/en/reference/modules/astro-i18n/#getrelativelocaleurl), so users can change language while staying on the same resource page

## SEO
- Alternate "hreflang" and Canonical tags to optimize SEO for multi-language setup are generated in the common layout `src/layouts/Base.astro`
- Site Map for SEO dynamically generated from ``astro.config.mjs`` with i18n support (https://docs.astro.build/en/guides/integrations-guide/sitemap/)

## Design System & Styling

### Core Principles
- **Reusability First**: Always use utility classes from `src/styles/global.css` before creating custom CSS
- **Consistency**: Maintain uniform spacing, colors, typography across the entire site
- **Scalability**: Design system supports easy addition of new pages and features
- **DRY**: Avoid duplicating styles; centralize in global utilities
- **Performance**: Smaller CSS bundle through shared classes

### Styling Architecture
- `global.css` is imported in the main index `src/pages/index.astro`
- All CSS variables defined in `@theme` block in `global.css`
- Utility classes defined in `@layer utilities` in `global.css`
- Component-specific styles only for truly unique styling needs
- Use themes to customize look and feel and provide dark mode support
- Accessible design: follow WCAG guidelines
- Responsive design: mobile-first approach

### Global Utility Classes
**ALWAYS use these classes instead of creating custom CSS:**

#### Layout & Container
- `.container-custom` - Main site container (max-width: 1280px, responsive padding)
- `.content-wrapper` - Text content wrapper (max-width: 800px)
- `.content-wrapper-lg` - Larger content wrapper (max-width: 1200px)

#### Sections
- `.section` - Standard section with responsive padding (5rem → 4rem → 3rem)
- `.section-header` - Centered section header container

#### Typography
- `.section-title` - Main section title (2.5rem → 2rem on mobile)
- `.section-subtitle` - Section subtitle (1.125rem, muted color)
- `.page-title` - Page main title (3rem → 2.25rem on mobile)
- `.card-title` - Card component title (1.5rem)
- `.text-muted` - Muted text color

#### Responsive Grids
- `.grid-auto-fit` - Responsive grid with auto-fit (columns expand)
- `.grid-auto-fill` - Responsive grid with auto-fill (creates all possible columns)
- Customize with CSS variables: `--grid-min-width` (default: 300px), `--grid-gap` (default: 2rem)
- Automatically becomes single-column on mobile (≤640px)

#### Components
- `.info-box` - Information box with border and shadow
- `.info-item`, `.info-item-label`, `.info-item-value` - Info item elements
- `.feature-list`, `.feature-item`, `.feature-item-icon` - Feature list elements
- `.list-reset` - Reset list styling (no bullets, no padding)

#### Card System - Modern Lightweight Design
**Use these classes for all card-based components:**
- `.card` - Base card with shadow (no borders), hover effect, responsive layout
- `.card-image` - Image container (12rem height, object-fit cover)
- `.card-image-overlay` - Gradient overlay for images
- `.card-content` - Content area with padding and flex layout
- `.card-link` - Link with arrow icon, auto margin-top
- `.card-link-arrow` - Arrow icon for links (1rem size)
- `.card-icon` - Generic icon (1rem size)
- `.card-badge` - Badge/pill for status or category
- `.card-footer` - Footer layout (flex space-between)

**Card Design Principles:**
- Use **shadows** instead of borders for depth
- Keep design **lightweight and clean**
- Minimize redundant styling
- Component-specific CSS only for unique features
- Leverage global utilities maximally

### Standard Page Pattern
```astro
<BaseLayout>
  <section class="section">
    <div class="container-custom">
      <div class="section-header">
        <h1 class="page-title">Page Title</h1>
        <p class="section-subtitle">Page description</p>
      </div>
      
      <div class="content-wrapper">
        <!-- Main content -->
      </div>
    </div>
  </section>
</BaseLayout>
```


### Card Component Pattern
```astro
<article class="card">
  <div class="card-image">
    <img src={image} alt={title} loading="lazy" />
    <!-- Optional: overlay for text/badges on image -->
    <div class="card-image-overlay">
      <div>Overlay content</div>
    </div>
  </div>
  <div class="card-content">
    <h3 class="card-title">{title}</h3>
    <p class="text-muted">{description}</p>
    
    <!-- Custom component-specific content -->
    
    <div class="card-footer">
      <span class="card-badge">{status}</span>
      <a href={link} class="card-link">
        Learn more
        <svg class="card-link-arrow"><!-- arrow icon --></svg>
      </a>
    </div>
  </div>
</article>

<!-- Component-specific styles (minimal) -->
<style>
  /* Only truly unique styling here */
  .component-specific-class { ... }
</style>
```

### CSS Variables Usage
All design tokens are CSS variables in `global.css`:
- **Colors**: `--color-primary-600`, `--color-text`, `--color-surface`, etc.
- **Spacing**: `--spacing-4` (1rem), `--spacing-8` (2rem), etc.
- **Radius**: `--radius-md`, `--radius-lg`, `--radius-xl`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Transitions**: `--transition-fast`, `--transition-base`

### When to Create Custom CSS
Only create component-specific CSS for:
1. Truly unique styling not covered by utilities
2. Complex component-specific interactions
3. Specific visual effects not generalizable

Always ask: "Can I use an existing utility class for this?"

For complete documentation, see `DESIGN_SYSTEM.md` in project root.



## Maintenance Notes

### Dependencies
- Keep Astro updated to latest stable version
- Update Tailwind CSS cautiously (check for breaking changes)
- Pin major versions, allow minor/patch updates
- Test thoroughly after dependency updates

### Performance Monitoring
- Keep build times reasonable (currently fast due to static generation)
- Monitor bundle sizes if adding client-side JavaScript
- Optimize images before committing to repository
- Use Astro's built-in optimization features

### SEO Considerations
- Include meta descriptions for all pages
- Use proper heading hierarchy (h1, h2, h3)
- Generate sitemap.xml (Astro can do this)
- Add structured data for trail/event pages (schema.org)
- Implement Open Graph tags for social sharing

## Future Considerations

### Planned Features
- **Site Map**: will be fondamental for SEO and user navigation
- **Maps**: Integrate Leaflet or Mapbox for interactive maps
- **Authentication**: User accounts for community features
- **Multi-language**: Support EN, DE, FR, ES beyond IT
- **Progressive Web App**: Offline access to trail information
- **Mobile App**: Companion app for on-trail navigation

### Scalability
- Design data structures to support additional trails/routes
- Keep components generic and reusable
- Plan for increased content volume (more blog posts, user comments)
- Consider CMS integration for non-technical content editors

### Integration Points
- Payment gateway for booking system
- Email service for notifications
- Analytics for tracking user behavior
- Social media API for sharing features
- Weather API for trail conditions

## Questions to Ask When Making Changes

1. **Does this maintain the spiritual and respectful tone of the site?**
2. **Is this accessible to users with disabilities?**
3. **Will this work well on mobile devices?**
4. **Does this follow the existing code patterns?**
5. **Am I using utility classes from `global.css` instead of creating custom CSS?**
6. **Is this the minimal change needed to achieve the goal?**
7. **Have I tested this in both development and production builds?**
8. **Does this maintain or improve site performance?**
9. **Is the TypeScript typing complete and accurate?**
10. **Does this maintain consistency with the design system?**

## Getting Help

- Check Astro documentation: https://docs.astro.build
- Review Tailwind CSS docs: https://tailwindcss.com/docs
- **Check `DESIGN_SYSTEM.md` for utility classes and patterns**
- Review `src/styles/global.css` for available utilities and CSS variables
- Refer to existing components and pages in `src/components/` and `src/pages/` for patterns
- Homepage (`src/pages/[lang]/index.astro`) demonstrates best practices for using utility classes

---

**Remember**: This is a spiritual project. Approach it with care, respect, and attention to detail. Every feature should serve the pilgrim's journey, both physical and spiritual.
