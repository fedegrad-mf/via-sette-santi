# Lighthouse Performance Optimizations

This document describes the performance optimizations implemented to address Lighthouse issues.

## Issues Addressed

### 1. Render Blocking Resources (Est. savings: 230ms)

**Problem:** Google Fonts CSS was blocking the initial page render.

**Solution:**
- Implemented async font loading using the `media="print" onload="this.media='all'"` technique
- Added `<noscript>` fallback for browsers with JavaScript disabled
- Added preconnect hints for font resources to establish connections early

**Implementation in `src/layouts/Base.astro`:**
```astro
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:..."
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:..." rel="stylesheet" />
</noscript>
```

### 2. Network Dependency Tree (Est. savings: 230ms)

**Problem:** Missing preconnect hints for third-party resources.

**Solution:**
- Added preconnect hints for OpenStreetMap tile servers (a, b, c.tile.openstreetmap.org)
- Added dns-prefetch for unpkg.com (Leaflet CDN)

**Implementation in `src/layouts/Base.astro`:**
```astro
<link rel="dns-prefetch" href="https://unpkg.com" />
<link rel="preconnect" href="https://a.tile.openstreetmap.org" />
<link rel="preconnect" href="https://b.tile.openstreetmap.org" />
<link rel="preconnect" href="https://c.tile.openstreetmap.org" />
```

### 3. Image Delivery Optimization (Est. savings: 50,865 KiB)

**Problem:** Images were massively oversized for their display dimensions.
- Hero images: 7.9MB files displayed at 1920px wide
- Saint images: 7.9MB files displayed at 312px wide
- Trail images: 7.1MB files displayed at 312px wide

**Solution:**
- Resized all images to appropriate dimensions
- Converted all images to WebP format with JPEG fallbacks
- Implemented responsive images using `<picture>` element
- Added proper width/height attributes to prevent CLS (Cumulative Layout Shift)
- Stripped EXIF metadata
- Enabled progressive JPEG encoding

**Image Size Results:**

| Image Type | Original Size | Optimized JPEG | WebP | Reduction |
|-----------|---------------|----------------|------|-----------|
| hero-3.jpg | 7.9 MB | 360 KB | 171 KB | 95-98% |
| hero-4.jpg | 7.9 MB | 304 KB | 126 KB | 96-98% |
| hero-5.jpg | 3.5 MB | 237 KB | 127 KB | 93-96% |
| saint-leonardo.jpg | 7.9 MB | 121 KB | 68 KB | 98-99% |
| saint-chiodo.jpg | 7.9 MB | 160 KB | 105 KB | 98% |
| trail-3.jpg | 6.5 MB | 185 KB | 143 KB | 97-98% |
| trail-4.jpg | 7.1 MB | 187 KB | 145 KB | 97-98% |

**Total Savings:** ~50MB → ~3.5MB (93% reduction)

**Image Dimensions:**
- Hero carousel: 1920x800px
- Trail cards: 800x600px
- Saint cards: 600x800px (portrait)
- Host images: 1200x800px

**Implementation Example:**
```astro
<picture>
  <source 
    srcset={`${import.meta.env.BASE_URL}images/trails/${image.replace('.jpg', '.webp')}`} 
    type="image/webp" 
  />
  <img 
    src={`${import.meta.env.BASE_URL}images/trails/${image}`} 
    alt={title} 
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
  />
</picture>
```

**Files Modified:**
- `src/components/HeroCarousel.astro` - Updated carousel to use `<picture>` element
- `src/components/TrailCard.astro` - Added WebP support
- `src/components/SaintCard.astro` - Added WebP support
- `src/pages/[lang]/trails/[...slug].astro` - Added WebP support for hero images
- `src/pages/[lang]/saints/[...slug].astro` - Added WebP support for hero images
- `src/pages/[lang]/hosts/[...slug].astro` - Added WebP support for hero images

### 4. Cache Control Headers

**Problem:** GitHub Pages serves assets with only 10-minute cache TTL.

**Solution:**
- Added `public/_headers` file with optimal cache control directives
- Images: 1 year cache (immutable)
- CSS/JS bundles: 1 year cache (immutable, versioned by Astro)
- HTML: 1 hour cache with revalidation

**Note:** GitHub Pages may not respect custom `_headers` file. This is documented for reference and future hosting migrations.

**Implementation in `public/_headers`:**
```
/images/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

### 5. Hero Carousel Bug Fix

**Problem:** HeroCarousel referenced non-existent `hero-6.jpg`.

**Solution:**
- Removed `hero-6.jpg` from the images array in `src/components/HeroCarousel.astro`
- Now uses only existing images: hero-1 through hero-5

## Image Optimization Script

The `optimize-images.sh` script automates image optimization for future updates:

```bash
./optimize-images.sh
```

**What it does:**
1. Resizes images to appropriate dimensions
2. Converts to WebP format
3. Optimizes JPEG quality (85%)
4. Strips EXIF metadata
5. Enables progressive JPEG encoding

**Categories processed:**
- Hero images → 1920x800px
- Trail images → 800x600px
- Saint images → 600x800px (portrait)

## Browser Support

**WebP Support:**
- Chrome 23+
- Firefox 65+
- Safari 14+
- Edge 18+
- Opera 12.1+

**Fallback:**
All browsers receive optimized JPEG images as fallback using the `<picture>` element.

## Performance Impact

**Expected Lighthouse improvements:**
- **Image delivery:** 50,865 KiB saved
- **Render blocking:** 230ms saved (font loading)
- **Network dependency:** 230ms saved (preconnect hints)
- **Total estimated savings:** ~51MB and ~460ms initial load time

**Additional benefits:**
- Reduced CLS (Cumulative Layout Shift) with explicit dimensions
- Better mobile performance (smaller images)
- Improved perceived performance (progressive JPEG)
- Reduced bandwidth costs
- Better SEO scores

## Testing

To verify optimizations:

1. Build the site:
   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Run Lighthouse audit in Chrome DevTools:
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit for Performance, SEO, Accessibility

## Future Improvements

Potential additional optimizations:
1. Implement Astro's native `<Image>` component with automatic optimization
2. Add responsive `srcset` for different screen sizes
3. Implement lazy loading for below-the-fold images (already done for cards)
4. Consider using AVIF format for even better compression (requires broader browser support)
5. Implement critical CSS inlining for above-the-fold content
6. Add service worker for offline caching

## References

- [Google Web Fundamentals - Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN - Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [WebP Format Documentation](https://developers.google.com/speed/webp)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
