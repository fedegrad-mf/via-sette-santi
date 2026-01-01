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
- Site Map for SEO dynamically generated from `astro.config.mjs` with i18n support (https://docs.astro.build/en/guides/integrations-guide/sitemap/)

### SEO Best Practices - CRITICAL
**Every page MUST have proper SEO metadata.** The Base layout accepts these props:

```typescript
interface Props {
  title?: string;              // Page title (default: "Via dei Sette Santi")
  description?: string;        // Meta description for search engines
  ogImage?: string;            // Open Graph image (relative or absolute URL)
  ogType?: "website" | "article"; // OG type (default: "website")
  preloadImage?: string;       // Critical image to preload
  noindex?: boolean;          // Set true for 404, private pages
}
```

**Required for all pages:**
1. **Title**: Unique, descriptive, 50-60 characters
2. **Description**: Compelling summary, 150-160 characters
3. **OG Image**: Representative image for social sharing

**Example Usage:**
```astro
<BaseLayout
  title="Trail Stage 1 - Amandola to San Leonardo | Via dei Sette Santi"
  description="Discover the first stage of the Via dei Sette Santi: 12km moderate trail from Amandola to San Leonardo through stunning Sibillini landscapes."
  ogImage="images/trails/trail-1.jpg"
  ogType="article"
  preloadImage="images/hero-trail-1.jpg"
>
```

**Open Graph & Twitter Cards:**
- Automatically generated from title, description, and ogImage props
- Ensures proper preview on Facebook, Twitter, LinkedIn, WhatsApp
- Images should be at least 1200×630px for optimal social sharing

**Canonical URLs & Hreflang:**
- Automatically generated for each language version
- Prevents duplicate content issues
- Helps search engines understand multi-language structure

### Structured Data (Schema.org)
**TODO**: Implement JSON-LD structured data for:
- Trail pages: `https://schema.org/Trail`
- Saints/Churches: `https://schema.org/Place` or `https://schema.org/Church`
- Reviews: `https://schema.org/Review`
- Events: `https://schema.org/Event`

Example for trail pages:
```json
{
  "@context": "https://schema.org",
  "@type": "Trail",
  "name": "Via dei Sette Santi - Stage 1",
  "description": "...",
  "distance": "12 km",
  "difficulty": "moderate",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "...",
    "longitude": "..."
  }
}
```

## Accessibility

### Core Principles (WCAG 2.1 AA Compliance)
**All features must be accessible to users with disabilities.**

### Focus States - IMPLEMENTED ✅
- All interactive elements (links, buttons, inputs) have visible focus indicators
- 2px outline with 2px offset for clarity
- Focus states work in both light and dark modes
- Located in `src/styles/global.css` under "Accessibility & Focus States"

### Keyboard Navigation Requirements
1. **Tab order must be logical**: Follow visual flow
2. **Skip to main content**: Add for screen reader users (TODO)
3. **No keyboard traps**: Users can always escape with Tab/Shift+Tab
4. **Enter/Space activate buttons**: Standard behavior

### ARIA Labels & Semantic HTML
- Use semantic HTML5 elements: `<nav>`, `<main>`, `<article>`, `<section>`
- Add ARIA labels for icon-only buttons: `aria-label="Close menu"`
- Use `aria-expanded` for collapsible elements (already in LanguagePicker)
- Use `aria-live` for dynamic content updates
- Never use `div` or `span` where semantic elements exist

### Color Contrast
- Text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large)
- Links must be distinguishable from surrounding text
- Color cannot be the only visual indicator (use icons, underlines)

### Images & Media
- All images must have descriptive `alt` text
- Decorative images: `alt=""` (empty, not missing)
- Use `loading="lazy"` for non-critical images
- Use `decoding="async"` for better performance

### Reduced Motion Support - IMPLEMENTED ✅
- Respects `prefers-reduced-motion: reduce`
- Disables animations for users with vestibular disorders
- Located in `src/styles/global.css`

### Screen Reader Considerations
- Use descriptive link text (avoid "click here")
- Provide context for screen reader users
- Test with NVDA (Windows) or VoiceOver (Mac)

### 404 Pages - IMPLEMENTED ✅
- Created for all languages at `src/pages/[lang]/404.astro`
- Clear error message and navigation back to home
- Includes `noindex` meta tag to exclude from search engines

## Performance

### Image Optimization
**CURRENT**: Using plain `<img>` tags
**TODO**: Migrate to Astro's `Image` component for:
- Automatic WebP/AVIF conversion
- Responsive `srcset` generation
- Lazy loading with native browser support
- Proper width/height to prevent layout shift

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero-1.jpg';
---
<Image 
  src={heroImage} 
  alt="Sibillini Mountains landscape"
  widths={[400, 800, 1200]}
  loading="lazy"
  decoding="async"
/>
```

### Critical Assets Preloading - IMPLEMENTED ✅
- Hero images can be preloaded via Base layout's `preloadImage` prop
- Reduces Largest Contentful Paint (LCP)
- Use for above-the-fold critical images only

### Build Optimization
- Astro automatically optimizes CSS/JS bundles
- Use `client:load` sparingly (prefer `client:idle` or `client:visible`)
- Static generation (SSG) for all routes
- No hydration needed for content pages

## Design System & Styling

### Core Principles
- **Reusability First**: Always use utility classes from `src/styles/global.css` before creating custom CSS
- **Consistency**: Maintain uniform spacing, colors, typography across the entire site
- **Scalability**: Design system supports easy addition of new pages and features
- **DRY**: Avoid duplicating styles; centralize in global utilities
- **Performance**: Smaller CSS bundle through shared classes

### Styling Architecture
- `global.css` is imported in the base common layout `src/layouts/Base.astro`
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
- ✅ **Meta descriptions implemented** for all pages via Base layout props
- ✅ **Proper heading hierarchy** (h1, h2, h3) enforced
- ✅ **Sitemap.xml generated** with i18n support and dynamic lastmod
- 🔲 **Structured data** (schema.org) - TODO for trail/event pages
- ✅ **Open Graph tags implemented** for social sharing
- ✅ **Twitter Card tags** for rich previews
- ✅ **Canonical URLs** and hreflang for multi-language
- ✅ **404 pages** created for all languages with noindex

## Implementing New Features

### Checklist for Every New Page
When creating a new page, follow this checklist:

**SEO Requirements:**
- [ ] Pass `title` prop to BaseLayout (unique, descriptive, 50-60 chars)
- [ ] Pass `description` prop (compelling, 150-160 chars)
- [ ] Pass `ogImage` prop (representative image for social sharing)
- [ ] Set `ogType` to "article" for content pages, "website" for index pages
- [ ] Add `preloadImage` for critical above-the-fold images
- [ ] Use proper heading hierarchy (one h1, then h2, h3 in order)

**Accessibility Requirements:**
- [ ] Use semantic HTML (nav, main, article, section, etc.)
- [ ] Add descriptive alt text for all images
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Test focus states (tab through the page)
- [ ] Add ARIA labels for icon-only buttons
- [ ] Verify color contrast meets WCAG AA standards
- [ ] Test with screen reader if possible

**i18n Requirements:**
- [ ] Add translations to `src/i18n/ui.ts` for all languages
- [ ] Use `useTranslations(lang as keyof typeof languages)` helper for all UI strings
- [ ] Create content in all supported languages (en, it, de)
- [ ] Test language switching maintains current page context
- [ ] Verify hreflang tags are generated correctly

**Design System Requirements:**
- [ ] Use utility classes from `src/styles/global.css`
- [ ] Follow card system patterns for card-based layouts
- [ ] Use CSS custom properties (--color-*, --spacing-*, etc.)
- [ ] Maintain responsive design (mobile-first)
- [ ] Test in both light and dark modes
- [ ] Verify reduced motion support

**Performance Requirements:**
- [ ] Use lazy loading for below-the-fold images
- [ ] Preload critical assets if needed
- [ ] Minimize custom CSS (prefer utilities)
- [ ] Test build time and bundle size
- [ ] Verify no layout shift (CLS)

### Creating New Content Collections
When adding a new content type (e.g., blog posts, events):

1. **Define Schema** in `src/content.config.ts`:
```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});
```

2. **Create Directory Structure**:
```
src/content/blog/
  ├── en/
  ├── it/
  └── de/
```

3. **Create Collection Page** at `src/pages/[lang]/blog/[...slug].astro`:
```astro
export async function getStaticPaths() {
  const pages = await getCollection("blog", ({ data }) => {
    return !data.draft; // Filter out drafts
  });
  return pages.map((page) => {
    const [lang, ...slug] = page.id.split("/");
    return { params: { lang, slug: slug.join("/") }, props: page };
  });
}
```

4. **Add SEO metadata** following the checklist above

5. **Add translations** to `src/i18n/ui.ts` for UI elements

### Adding Interactive Features
When adding JavaScript interactivity:

**Hydration Strategy:**
- `client:load` - Critical, above-the-fold interactivity (use sparingly)
- `client:idle` - Non-critical, when browser is idle (preferred)
- `client:visible` - Load when element enters viewport (for below-fold)
- `client:only` - For framework-specific components

**Example:**
```astro
<InteractiveMap client:visible lang={lang} />
```

### Component Development Pattern
When creating new components:

1. **Check if utility classes exist** in `global.css` first
2. **Create minimal custom CSS** only for truly unique styling
3. **Use TypeScript** for props interface
4. **Add JSDoc comments** for complex props
5. **Test in all supported languages**
6. **Verify accessibility** (keyboard, screen reader, focus states)

**Example:**
```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  class?: string;
}

const { title, description, variant = 'primary', class: className } = Astro.props;
---

<div class:list={['card', className]}>
  <h3 class="card-title">{title}</h3>
  {description && <p class="text-muted">{description}</p>}
</div>
```

## Testing

### Pre-Deployment Checklist
Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test all language versions (en, it, de)
- [ ] Verify SEO metadata in browser DevTools
- [ ] Test Open Graph preview (Facebook Sharing Debugger, Twitter Card Validator)
- [ ] Check accessibility with Lighthouse (aim for 95+ score)
- [ ] Test keyboard navigation
- [ ] Verify dark mode appearance
- [ ] Test on mobile devices (responsive design)
- [ ] Check sitemap.xml generation
- [ ] Verify all internal links work
- [ ] Test 404 page for all languages
- [ ] Review console for errors/warnings

### Useful Testing Tools
- **Lighthouse** (Chrome DevTools): Performance, SEO, Accessibility audits
- **WAVE** (browser extension): Accessibility evaluation
- **Facebook Sharing Debugger**: Test Open Graph tags
- **Twitter Card Validator**: Test Twitter cards
- **Mobile-Friendly Test** (Google): Mobile usability
- **PageSpeed Insights**: Real-world performance data

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
