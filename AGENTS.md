# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this e-portfolio repository.

## Project Overview

This is a personal portfolio website for Chee Hao, built with TypeScript, Vite, and GSAP. The project uses a modular, feature-based architecture with separate sections for hero, works, about, and contact pages.

## Build & Development Commands

**Primary development (run from `vite-project/` directory):**
```bash
cd vite-project
npm run dev          # Start development server
npm run build        # Build for production (TypeScript compilation + Vite build)
npm run preview      # Preview production build
```

**TypeScript compilation:**
```bash
cd vite-project
npx tsc              # Compile TypeScript (check for type errors)
npx tsc --noEmit     # Type check without emitting files
```

**Root directory dependencies:**
```bash
npm install          # Install GSAP dependency for animations
```

## Project Structure

```
e-portfolio/
├── vite-project/           # Main Vite application
│   ├── src/
│   │   ├── main.ts        # Application entry point
│   │   ├── style.css      # Global styles and design tokens
│   │   ├── shared/        # Shared utilities and animations
│   │   └── sections/      # Feature-based sections
│   │       ├── hero/      # Hero section
│   │       ├── works/     # Works portfolio
│   │       ├── about/     # About section
│   │       └── contact/   # Contact section
│   ├── package.json       # Vite project dependencies
│   └── tsconfig.json      # TypeScript configuration
└── package.json           # Root dependencies (GSAP)
```

## Code Style Guidelines

### TypeScript Configuration
- **Target:** ES2022 with modern DOM APIs
- **Module System:** ESNext with bundler resolution
- **Strict Mode:** Enabled with comprehensive linting rules
- **Import Style:** ES modules with `.ts` extensions allowed
- **Type Checking:** Strict with no unused locals/parameters

### Import Conventions
```typescript
// CSS imports (Vite-specific bundling)
import './hero.css';

// External libraries
import gsap from 'gsap';

// Internal modules (feature-based)
import './sections/hero/hero';
import './sections/works/works';
```

### File Naming & Organization
- **Files:** kebab-case for all files (`hero-section.ts`, `contact-form.css`)
- **Directories:** kebab-case for feature directories (`hero-section/`, `contact-form/`)
- **Components:** Feature-based organization - each section has its own directory
- **Shared Code:** Place in `src/shared/` for utilities and animations

### Code Patterns

**Section Structure:**
```typescript
// Import CSS first for Vite bundling
import './section.css';

// Import external dependencies
import gsap from 'gsap';

// DOM-ready pattern
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#section-id');
  if (!container) return;

  // Inject HTML
  container.innerHTML = `...`;

  // Initialize animations/interactions
  // GSAP animations, event listeners, etc.
});
```

**HTML Injection:**
- Use template literals with proper indentation
- Include semantic HTML5 elements
- Add appropriate ARIA labels and accessibility attributes
- Use CSS classes from design tokens

**GSAP Animations:**
```typescript
// Preferred pattern
gsap.fromTo(elements,
  { fromProperties },
  { toProperties, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
);
```

### CSS Architecture

**Design Tokens (Midnight Prism Theme):**
```css
:root {
  /* Colors - Deep space palette with indigo/cyan accents */
  --color-bg-deep: #030305;
  --color-bg-subtle: #0a0a0c;
  --color-surface: #121216;
  --color-primary: #6366f1;
  --color-secondary: #2dd4bf;
  
  /* Typography - Outfit font family */
  --font-body: 'Outfit', system-ui, -apple-system, sans-serif;
  --font-display: 'Outfit', system-ui, -apple-system, sans-serif;
  
  /* Spacing - Custom scale */
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Animation - Custom easing curves */
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ease-smooth: cubic-bezier(0.23, 1, 0.32, 1);
}
```

**CSS Guidelines:**
- Use CSS custom properties (variables) from design tokens
- Mobile-first responsive design with `clamp()` for fluid typography
- Component-scoped styles with descriptive class names
- Prefer `flexbox` and `grid` for layouts
- Use CSS transitions with custom easing curves

### Naming Conventions

**Variables & Functions:** camelCase
```typescript
const heroContainer = document.querySelector('#hero');
const revealElements = container.querySelectorAll('.reveal-text');
```

**CSS Classes:** kebab-case with BEM-like structure
```css
.hero { }
.hero__title { }
.hero__actions { }
.reveal-text { }
```

**HTML Elements:** Semantic HTML5 with appropriate IDs
```html
<div id="hero"></div>
<div id="works"></div>
<div id="about"></div>
<div id="contact"></div>
```

### Error Handling

**DOM Element Checks:**
```typescript
const container = document.querySelector('#section-id');
if (!container) return; // Early return pattern
```

**Type Safety:**
- Use TypeScript strict mode features
- Add proper type annotations for complex objects
- Use `null` checks for DOM queries

### Performance Guidelines

**Animations:**
- Use GSAP for performant animations
- Prefer `transform` and `opacity` for smooth 60fps
- Use `will-change` sparingly for animated elements
- Implement proper cleanup for event listeners

**Bundle Optimization:**
- Import CSS files at the top of component files
- Use dynamic imports for heavy dependencies if needed
- Leverage Vite's tree-shaking capabilities

### Accessibility

- Use semantic HTML5 elements appropriately
- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Maintain proper color contrast ratios
- Add focus states for interactive elements

## Testing

This project currently does not have formal test suites. When implementing tests:
- Use the root `package.json` for test framework dependencies
- Place test files alongside source files with `.test.ts` suffix
- Follow the existing TypeScript configuration for test files

## Git Workflow

- Commit the `AGENTS.md` file to the repository
- Use conventional commit messages when possible
- Ensure all TypeScript compilation passes before commits

## Browser Support

- Modern browsers with ES2022 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with touch support

## Notes for Agents

- Always work from the `vite-project/` directory for development
- Use the existing design token system for consistency
- Follow the feature-based section architecture
- Ensure responsive design with mobile-first approach
- Test animations for performance and smoothness
- Maintain the Midnight Prism visual theme throughout