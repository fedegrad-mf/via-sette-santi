# Design System - Via dei Sette Santi

## 🎨 Color Palette

### Philosophy
The color palette is inspired by nature and spirituality, reflecting the sacred journey through the Sibillini Mountains. Colors are drawn from the logo and natural elements of the path.

### Primary Colors

#### Brown/Terra (Earth - from logo)
Represents the earth, the path, and grounding spiritual connection.
- `--color-primary-50` through `--color-primary-950`
- Main: `--color-primary-600` (#8b6647)
- Use for: Primary buttons, main accents, earthy elements

#### Green/Natura (Nature)
Symbolizes the natural environment, growth, and life along the trail.
- `--color-secondary-50` through `--color-secondary-950`
- Main: `--color-secondary-600` (#2a7f3b)
- Use for: Success states, nature-related content, growth indicators

#### Sky Blue/Cielo (Sky)
Evokes the open sky, freedom, and spiritual elevation.
- `--color-accent-50` through `--color-accent-950`
- Main: `--color-accent-600` (#0284c7)
- Use for: Links, info states, sky-related elements

#### Gold/Spirituale (Sacred)
Represents spirituality, enlightenment, and the sacred nature of the journey.
- `--color-gold-50` through `--color-gold-950`
- Main: `--color-gold-600` (#d97706)
- Use for: Premium features, sacred elements, highlights, special badges

### Semantic Colors
- `--color-background`: Page background (light/dark mode adaptive)
- `--color-surface`: Card and elevated surface background
- `--color-surface-hover`: Hover state for surfaces
- `--color-text`: Primary text color
- `--color-text-muted`: Secondary/muted text
- `--color-border`: Border color
- `--color-border-hover`: Border hover state

## 🎭 Modern Design Features

### Gradients
Modern gradient definitions for contemporary look:
- `--gradient-primary`: Brown earth gradient
- `--gradient-secondary`: Green nature gradient
- `--gradient-accent`: Blue sky gradient
- `--gradient-gold`: Spiritual gold gradient
- `--gradient-nature`: Multi-color nature gradient (green → blue → gold)
- `--gradient-spiritual`: Spiritual gradient (brown → gold)

### Glass-morphism
Modern translucent effects with backdrop blur:
- Header uses `backdrop-filter: blur(var(--blur-lg))`
- Semi-transparent backgrounds for elevated feel
- `--blur-sm`, `--blur-md`, `--blur-lg`, `--blur-xl` available

### Border Radius
Softer, more modern curves:
- `--radius-sm`: 0.5rem
- `--radius-md`: 0.75rem
- `--radius-lg`: 1rem
- `--radius-xl`: 1.25rem
- `--radius-2xl`: 1.5rem (default for cards)
- `--radius-3xl`: 2rem
- `--radius-full`: 9999px (circles)

### Shadows
Natural, softer shadows for depth:
- `--shadow-sm`: Subtle elevation
- `--shadow-md`: Standard card shadow
- `--shadow-lg`: Hover state shadow
- `--shadow-xl`: High elevation shadow
- `--shadow-2xl`: Maximum elevation
- `--shadow-inner`: Inset shadow for depth
- `--shadow-colored`: Colored shadow for special effects

## 🧩 Components

### Buttons

#### `.btn` Base
Modern button with gradient hover effect:
- Rounded corners (`--radius-xl`)
- Internal gradient overlay on hover
- Transform on hover (translateY(-2px))
- 2px border for definition

#### Button Variants
- `.btn-primary`: Brown earth gradient
- `.btn-secondary`: Green nature gradient  
- `.btn-accent`: Blue sky gradient
- `.btn-gold`: Gold spiritual gradient (dark text)
- `.btn-outline`: Transparent with border, fills on hover

### Cards

#### `.card-base`
Modern card with:
- Gradient background (light → slightly darker)
- Animated top border (gradient nature bar)
- Shadow elevation on hover
- Transform animation (translateY(-4px))
- Rounded corners (`--radius-2xl`)

#### Card Image
- Gradient background fallback
- Overlay darkening on hover
- Scale transform on hover (1.08)
- Bottom gradient overlay

#### Card Link
- Animated arrow (→)
- Color transition
- Arrow moves on hover (translateX(4px))

### Badges
Modern pill-shaped badges:
- `.badge`: Base badge style
- `.badge-primary`: Brown/terra theme
- `.badge-secondary`: Green/nature theme
- `.badge-accent`: Blue/sky theme
- `.badge-gold`: Gold gradient sacred theme

### Sections

#### `.section`
Standard section with responsive padding.


### Typography

#### `.section-title`
- Bold weight (800)
- Underline decoration (gradient nature bar)
- Centered alignment

#### `.page-title`
- Extra bold (800)
- Left-aligned gradient underline (spiritual gradient)
- Larger size (3rem)

### Info Box
Modern info container:
- Gradient background
- Top accent bar (gradient accent)
- Shadow elevation
- Rounded corners

## 🎯 Usage Guidelines

### When to Use Each Color

**Primary (Brown):**
- Main CTA buttons
- Primary navigation items
- Trail numbers and identifiers
- Earth/path related content

**Secondary (Green):**
- Success messages
- Nature/environmental features
- Trail difficulty: Easy
- Vegetation and flora content

**Accent (Blue):**
- Links and hyperlinks
- Info messages
- Location indicators
- Sky and weather references
- Trail difficulty: Hard

**Gold:**
- Premium/special features
- Sacred and spiritual content
- Trail difficulty: Moderate
- Highlights and featured items
- Review stars

### Accessibility
- All color combinations meet WCAG AA standards
- Dark mode fully supported with `light-dark()` function
- Focus states clearly visible
- Text remains readable on all backgrounds

### Animation & Motion
- Use `--transition-fast` (150ms) for small UI elements
- Use `--transition-base` (250ms) for most transitions
- Use `--transition-slow` (350ms) for large movements
- Transform movements are subtle (2-6px)
- Hover states enhance without being distracting

## 🌗 Dark Mode
Automatically adapts using CSS `light-dark()` function:
- Maintains color harmony in both modes
- Ensures readability in all conditions
- Smooth transitions between modes
- Preserves brand identity

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Grid systems adapt automatically
- Typography scales fluidly with `clamp()`
- Touch-friendly targets (minimum 44px)

---

**Last Updated:** December 30, 2025  
**Version:** 2.0 - Modern Nature-Inspired Redesign

Documentazione del sistema di design scalabile e riutilizzabile del progetto.

## Principi

1. **Coerenza**: Utilizzare le utility classes predefinite per mantenere uno stile uniforme
2. **Scalabilità**: Le classi sono progettate per essere riutilizzate in tutto il progetto
3. **Manutenibilità**: Modifiche centralizzate in `global.css` si propagano a tutto il sito
4. **Performance**: Riduzione della duplicazione del CSS

## Utility Classes Disponibili

### Layout & Container

#### `.container-custom`
Container principale del sito con larghezza massima e padding responsive.
- **Max-width**: 1280px
- **Padding mobile**: 1.25rem (20px) - con safe-area
- **Padding tablet (≥768px)**: 1.5rem (24px)
- **Padding desktop (≥1024px)**: 2rem (32px)

```astro
<div class="container-custom">
  <!-- Contenuto -->
</div>
```

#### `.content-wrapper`
Wrapper per contenuto testuale, ottimizzato per leggibilità.
- **Max-width**: 800px
- **Uso**: Paragrafi, testo lungo, overview

```astro
<div class="content-wrapper">
  <p>Testo lungo e leggibile</p>
</div>
```

#### `.content-wrapper-lg`
Wrapper per contenuto più ampio.
- **Max-width**: 1200px
- **Uso**: Griglie di card, gallerie

```astro
<div class="content-wrapper-lg">
  <div class="grid-auto-fit">
    <!-- Cards -->
  </div>
</div>
```

### Sezioni

#### `.section`
Sezione principale con padding verticale responsive.
- **Padding desktop**: 5rem verticale
- **Padding tablet (≤1024px)**: 4rem verticale
- **Padding mobile (≤768px)**: 3rem verticale

```astro
<section class="section">
  <div class="container-custom">
    <!-- Contenuto sezione -->
  </div>
</section>
```

**Spaziatura tra sezioni**: Usa direttamente le utility classes di Tailwind sui componenti sezione invece di wrapper div:
- `mt-28` = 7rem mobile
- `lg:mt-32` = 8rem tablet/desktop  
- `xl:mt-36` = 9rem schermi grandi

```astro
<OverviewSection 
  class="mt-28 lg:mt-32 xl:mt-36"
  title={t('overview.title')}
  ...
/>
```

#### `.section-header`
Header standard per le sezioni (centrato, con max-width).

```astro
<div class="section-header">
  <h2 class="section-title">Titolo</h2>
  <p class="section-subtitle">Sottotitolo descrittivo</p>
</div>
```

### Tipografia

#### `.section-title`
Titolo principale di sezione.
- **Desktop**: 2.5rem (40px)
- **Mobile**: 2rem (32px)
- **Font-weight**: 700

#### `.section-subtitle`
Sottotitolo di sezione.
- **Font-size**: 1.125rem (18px)
- **Color**: `--color-text-muted`

#### `.page-title`
Titolo principale di pagina.
- **Desktop**: 3rem (48px)
- **Mobile**: 2.25rem (36px)
- **Font-weight**: 700

#### `.card-title`
Titolo per card e componenti.
- **Font-size**: 1.5rem (24px)
- **Font-weight**: 600

#### `.text-muted`
Testo secondario/muted.
- **Color**: `--color-text-muted`

### Griglie

#### `.grid-auto-fit`
Griglia responsive con `auto-fit` (le colonne si espandono per riempire lo spazio).

**Personalizzazione tramite CSS variables**:
- `--grid-min-width`: Larghezza minima colonne (default: 300px)
- `--grid-gap`: Spaziatura tra elementi (default: 2rem)

```astro
<!-- Griglia con colonne minime di 350px -->
<div class="grid-auto-fit" style="--grid-min-width: 350px;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### `.grid-auto-fill`
Griglia responsive con `auto-fill` (crea tutte le colonne possibili, anche vuote).

```astro
<!-- Griglia per trail cards -->
<div class="grid-auto-fill" style="--grid-min-width: 350px;">
  {trails.map(trail => <TrailCard {...trail} />)}
</div>
```

**Responsive**: Su mobile (≤640px) entrambe le griglie diventano single-column con gap ridotto a 1.5rem e padding laterale aggiuntivo di 0.5rem per evitare che le card tocchino i bordi dello schermo.

**Note sull'uso**:
- Le griglie hanno già padding interno su mobile, non serve aggiungere wrapper extra
- Il `container-custom` circostante fornisce il padding base
- Su mobile il padding totale è: container (1.25rem) + griglia (0.5rem) = 1.75rem per lato

### Componenti

#### `.card-base`
Classe base per tutti i componenti card (sostituisce custom card styles).
- **Background**: `--color-surface`
- **Border**: 1px solid `--color-border`
- **Border-radius**: `--radius-xl`
- **Layout**: Flexbox column
- **Hover**: Shadow e border color change
- **Uso**: Base per TrailCard, SaintCard, ReviewCard, BookingCard

```astro
<article class="card-base">
  <div class="card-image" style="height: 200px;">
    <img src="..." alt="..." />
  </div>
  <div class="card-content">
    <h3 class="card-title">Titolo</h3>
    <p class="text-muted">Descrizione</p>
    <a href="..." class="card-link">Link →</a>
  </div>
</article>
```

#### `.card-image`
Container per immagini delle card.
- **Width**: 100%
- **Overflow**: hidden
- **Hover**: Zoom effect (scale 1.05)
- **Personalizzabile**: Aggiungi `style="height: XXXpx"` per altezza custom

#### `.card-content`
Container per il contenuto delle card.
- **Padding**: 1.5rem
- **Layout**: Flexbox column con gap 0.75rem
- **Flex-grow**: 1 (riempie spazio disponibile)

#### `.card-link`
Link stilizzato per card con freccia.
- **Color**: `--color-primary-600`
- **Hover**: Color change + gap increase (effetto freccia)
- **Margin-top**: auto (si posiziona in fondo)

#### `.info-box`
Box informativo con bordo e sfondo.
- **Padding desktop**: 2rem
- **Padding mobile**: 1.5rem
- **Bordo**: 1px solid
- **Shadow**: Leggera

```astro
<div class="info-box">
  <div class="info-item">
    <span class="info-item-label">Località:</span>
    <span class="info-item-value">Sibillini, Marche</span>
  </div>
</div>
```

#### `.info-item`
Elemento informativo (label + valore).

```astro
<div class="info-item">
  <span class="info-item-label">Durata:</span>
  <span class="info-item-value">4-5 ore</span>
</div>
```

#### `.feature-list` & `.feature-item`
Lista di caratteristiche/features con icone e bordi.

```astro
<ul class="feature-list">
  <li class="feature-item">
    <svg class="feature-item-icon" width="20" height="20">
      <!-- Icon SVG -->
    </svg>
    Descrizione caratteristica
  </li>
</ul>
```

#### `.list-reset`
Reset stile lista (rimuove bullets e padding).

```astro
<ul class="list-reset">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

#### `.description-text`
Testo descrittivo con formattazione ottimizzata.
- **Font-size**: 1.125rem (18px)
- **Line-height**: 1.8
- **Margin-bottom**: 2rem
- **Uso**: Overview, descrizioni lunghe

```astro
<p class="description-text">{longDescription}</p>
```

#### `.section-content-center`
Centra il contenuto di una sezione usando flexbox.
- **Display**: flex
- **Flex-direction**: column
- **Align-items**: center
- **Text-align**: center
- **Uso**: Applicato al container-custom per centrare tutto il contenuto

```astro
<div class="container-custom section-content-center">
  <!-- Tutto il contenuto sarà centrato -->
</div>
```

## Variabili CSS

Tutte le variabili sono definite in `src/styles/global.css` nel blocco `@theme`.

### Colori

```css
/* Primary - Arancione caldo */
--color-primary-600: #e35b04;
--color-primary-700: #bc4207;

/* Secondary - Blu scuro */
--color-secondary-600: #526078;
--color-secondary-900: #343b47;

/* Accent - Verde */
--color-accent-600: #16a34a;

/* Semantici */
--color-background: light-dark(#ffffff, #0f172a);
--color-surface: light-dark(#f8fafc, #1e293b);
--color-text: light-dark(#0f172a, #f1f5f9);
--color-text-muted: light-dark(#64748b, #94a3b8);
--color-border: light-dark(#e2e8f0, #334155);
```

### Spacing

```css
--spacing-4: 1rem;    /* 16px */
--spacing-6: 1.5rem;  /* 24px */
--spacing-8: 2rem;    /* 32px */
--spacing-12: 3rem;   /* 48px */
--spacing-16: 4rem;   /* 64px */
--spacing-20: 5rem;   /* 80px */
```

### Border Radius

```css
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--radius-xl: 0.75rem;
--radius-2xl: 1rem;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Pattern di Utilizzo Comuni

### Pagina Standard

```astro
<BaseLayout>
  <section class="section">
    <div class="container-custom">
      <div class="section-header">
        <h1 class="page-title">Titolo Pagina</h1>
        <p class="section-subtitle">Descrizione breve</p>
      </div>

      <div class="content-wrapper">
        <!-- Contenuto principale -->
      </div>
    </div>
  </section>
</BaseLayout>
```

### Lista di Card

```astro
<section>
  <div class="container-custom">
    <div class="section-header">
      <h2 class="section-title">I Nostri Trail</h2>
      <p class="section-subtitle">5 tappe attraverso i Monti Sibillini</p>
    </div>

    <div class="grid-auto-fill" style="--grid-min-width: 350px;">
      {trails.map(trail => <TrailCard {...trail} />)}
    </div>
  </div>
</section>
```

### Info Box con Dettagli

```astro
<div class="content-wrapper">
  <div class="info-box">
    <div class="info-item">
      <strong class="info-item-label">Località:</strong>
      <span class="info-item-value">Monti Sibillini, Marche</span>
    </div>
    <div class="info-item">
      <strong class="info-item-label">Periodo migliore:</strong>
      <span class="info-item-value">Maggio - Ottobre</span>
    </div>
  </div>
</div>
```

## Best Practices

1. **Usa sempre le utility classes quando disponibili** invece di creare CSS custom
2. **Combina le classi** per costruire layout complessi
3. **Personalizza con CSS variables** inline quando necessario (es: `--grid-min-width`)
4. **Crea CSS custom solo per stili veramente specifici** del componente
5. **Mantieni la coerenza**: usa sempre gli stessi spacing, colori, font-size
6. **Test responsive**: verifica sempre su mobile, tablet, desktop

## Estendere il Sistema

Per aggiungere nuove utility classes:

1. Aggiungi la classe nel blocco `@layer utilities` in `src/styles/global.css`
2. Usa variabili CSS per valori configurabili
3. Includi breakpoint responsive se necessario
4. Documenta la nuova classe in questo file
5. Aggiorna gli esempi di utilizzo

## Componenti Astro Standard

I componenti riutilizzabili del progetto già utilizzano questo sistema:

- `BookingSection.astro` - Usa `section-header`, `grid-auto-fit`, `content-wrapper-lg`
- `TrailCard.astro` - Usa `card-title`, custom styles per layout card
- `SaintCard.astro` - Usa `card-title`, custom styles per layout card
- `ReviewCard.astro` - Usa custom styles specifici per reviews

Quando crei nuovi componenti, riutilizza queste utility classes per mantenere coerenza.
