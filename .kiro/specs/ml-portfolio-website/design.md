# Design Document

## Overview

### Design Philosophy

The ML portfolio website adopts a **clean, content-first design** inspired by nextwork.ai, emphasizing clarity, performance, and accessibility. The design prioritizes showcasing ML/AI projects through a minimal, distraction-free interface that lets the work speak for itself.

**Core Design Principles:**
- **Content-First**: Projects and technical details are the star; UI elements support rather than compete
- **Performance-Driven**: Static generation and optimized assets ensure sub-1.5s load times
- **Accessibility-Native**: WCAG 2.1 AA compliance built into every component, not retrofitted
- **Mobile-First**: Design begins at 320px and progressively enhances for larger screens
- **Progressive Enhancement**: Core content accessible to all; enhanced features layered for modern browsers

### Technology Stack

**Framework & Build:**
- **Next.js 14+** with App Router for React-based static site generation
- **TypeScript** for type safety and improved developer experience
- **Static Site Generation (SSG)** via `next export` for optimal performance and SEO

**Styling & Layout:**
- **CSS Modules** for component-scoped styling without runtime overhead
- **CSS Grid** for flexible, responsive project layouts
- **CSS Custom Properties** for consistent theming and easy maintenance
- Mobile-first approach with semantic breakpoints

**Content Management:**
- **Markdown + Frontmatter** for project content (easy to edit, version-controlled)
- **Gray-Matter** for parsing frontmatter metadata
- **Next.js Image** component for automatic optimization

**Deployment:**
- **Vercel/Netlify/Cloudflare Pages** for edge CDN distribution
- **Static export** eliminates server requirements and maximizes cache-ability

### Design Inspiration from nextwork.ai

Key patterns adapted from nextwork.ai:
1. **Grid-Based Project Cards**: Clean, uniform cards with image preview, title, description, and tags
2. **Featured/Trending Sections**: Prominent placement for key projects on homepage
3. **Category Organization**: Clear visual groupings by ML domain (Computer Vision, NLP, etc.)
4. **Minimal Navigation**: Persistent header with 4-5 main links; no clutter
5. **Hover States**: Subtle card elevation and border highlights on interaction
6. **Typography Hierarchy**: Large, readable headings; generous whitespace

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Static CDN                          │
│              (Vercel/Netlify/Cloudflare)                │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Serves pre-built HTML/CSS/JS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Browser (Client)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  React Components (Hydrated for Interactivity)  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Architecture Type:** Static Site Generation (SSG) with Client-Side Hydration

**Build-Time Process:**
1. Next.js reads project data from Markdown files in `/content/projects/`
2. Generates static HTML pages for each route (/, /projects, /projects/[slug], /about, /contact)
3. Optimizes images using Next.js Image Optimization
4. Bundles and minifies CSS/JS
5. Outputs to `/out` directory for deployment

**Runtime Behavior:**
- All pages served as static HTML from CDN edge nodes
- React hydrates on client for interactive elements (filters, forms, navigation)
- No server-side rendering or API calls required
- Client-side routing via Next.js Link for instant navigation

### File Structure

```
portfolio-website/
├── public/
│   ├── images/
│   │   └── projects/          # Project preview images
│   ├── icons/                 # Favicon, social icons
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   ├── page.tsx           # Homepage
│   │   ├── projects/
│   │   │   ├── page.tsx       # Projects list page
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Dynamic project detail pages
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── ContactForm.tsx
│   │   └── SEO.tsx
│   ├── lib/
│   │   ├── projects.ts        # Load and parse project data
│   │   └── utils.ts
│   ├── styles/
│   │   ├── globals.css        # Reset, typography, utilities
│   │   └── variables.css      # CSS custom properties
│   └── types/
│       └── project.ts
├── content/
│   └── projects/
│       ├── project-1.md
│       ├── project-2.md
│       └── ...
├── next.config.js             # Next.js configuration
├── tsconfig.json
└── package.json
```

### Data Flow

**Project Data Loading:**
1. Markdown files stored in `/content/projects/` with frontmatter metadata
2. Build-time: `lib/projects.ts` reads all Markdown files
3. Gray-matter parses frontmatter (title, description, tags, date, featured, etc.)
4. Data passed to page components via props during static generation
5. Components render static HTML with project data

**Client-Side Filtering:**
1. All project data embedded in initial page load
2. User selects category filter
3. React state updates to filter criteria
4. ProjectGrid component re-renders to show/hide matching cards
5. No network requests; instant filtering

---

## Components and Interfaces

### Component Hierarchy

```
App
├── RootLayout
│   ├── Header
│   │   └── Navigation
│   └── Footer
└── Pages
    ├── HomePage
    │   ├── HeroSection
    │   ├── FeaturedProjects (ProjectGrid)
    │   │   └── ProjectCard (x3-6)
    │   └── CallToAction
    ├── ProjectsPage
    │   ├── CategoryFilter
    │   └── ProjectGrid
    │       └── ProjectCard (xN)
    ├── ProjectDetailPage
    │   ├── ProjectHeader
    │   ├── ProjectContent
    │   ├── ProjectMetrics
    │   ├── ProjectMedia (images/videos)
    │   └── RelatedProjects
    ├── AboutPage
    │   ├── BioSection
    │   ├── SkillsGrid
    │   └── SocialLinks
    └── ContactPage
        └── ContactForm
```

### Core Components

#### 1. Header Component

**Responsibility:** Site-wide navigation and branding

**Interface:**
```typescript
interface HeaderProps {
  currentPath: string;
}
```

**Behavior:**
- Sticky positioning on scroll (position: sticky)
- Highlights active navigation item based on currentPath
- Hamburger menu on mobile (<768px)
- Keyboard accessible with visible focus states
- ARIA labels for screen readers

**Styling:**
- Fixed height: 64px (desktop), 56px (mobile)
- Backdrop blur on scroll for depth
- High contrast text (WCAG AA: 4.5:1 minimum)

---

#### 2. ProjectCard Component

**Responsibility:** Display project preview in grid layout

**Interface:**
```typescript
interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    featured?: boolean;
  };
}
```

**Behavior:**
- Links to `/projects/[slug]` using Next.js Link
- Hover effect: subtle elevation and border highlight
- Lazy loads images below fold
- Keyboard accessible (Tab to focus, Enter to navigate)

**Styling:**
- Card dimensions: aspect ratio 16:9 for image, flexible text area
- Border-radius: 8px
- Transition: transform 0.2s, box-shadow 0.2s
- Responsive: full width on mobile, grid columns on desktop

**Accessibility:**
- `<article>` semantic element
- Alt text on preview image describes project visually
- Focus visible on card link

---

#### 3. ProjectGrid Component

**Responsibility:** Responsive grid layout for project cards

**Interface:**
```typescript
interface ProjectGridProps {
  projects: Project[];
  columns?: 1 | 2 | 3;
}
```

**Behavior:**
- Renders ProjectCard for each project
- Responsive columns: 1 (mobile), 2 (tablet), 3 (desktop)
- Equal height cards using CSS Grid

**Styling (CSS Grid):**
```css
.project-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile */
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
  }
}
```

---

#### 4. CategoryFilter Component

**Responsibility:** Filter projects by category

**Interface:**
```typescript
interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
```

**Behavior:**
- Displays category buttons horizontally (wraps on small screens)
- "All" category shows all projects
- Active category visually highlighted
- Updates parent state via callback
- Keyboard navigation (Tab, Enter to select)

**Styling:**
- Button group with active state styling
- Active: solid background, inactive: outline
- Mobile: horizontal scroll if needed (overflow-x: auto)

**Accessibility:**
- `role="tablist"` for button group
- `aria-pressed="true"` for active button
- Keyboard support: Arrow keys to navigate, Enter/Space to select

---

#### 5. ContactForm Component

**Responsibility:** Handle user inquiries

**Interface:**
```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

**Behavior:**
- Client-side validation (required fields, email format)
- Shows validation errors inline
- Submits to external service (Formspree, Netlify Forms, or email API)
- Displays success/error message after submission
- Clears form on success

**Validation Rules:**
- Name: required, min 2 characters
- Email: required, valid email format regex
- Message: required, min 10 characters
- Subject: optional

**Accessibility:**
- `<label>` elements associated with inputs (for attribute)
- `aria-invalid="true"` and `aria-describedby` for errors
- Focus on first invalid field after submit attempt
- High contrast error messages

---

#### 6. SEO Component

**Responsibility:** Generate meta tags for each page

**Interface:**
```typescript
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
}
```

**Behavior:**
- Generates `<title>`, `<meta name="description">`, Open Graph, Twitter Cards
- Ensures unique title and description per page
- Uses fallback image if none provided

**Meta Tags Generated:**
```html
<title>{title} | Portfolio</title>
<meta name="description" content="{description}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{image}" />
<meta property="og:url" content="{url}" />
<meta property="og:type" content="{type}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{image}" />
```

---

## Data Models

### Project Model

**File Format:** Markdown with YAML frontmatter

**Frontmatter Schema:**
```yaml
---
title: "Project Title"
slug: "project-slug"
description: "Brief project summary (1-2 sentences)"
category: "Computer Vision" | "NLP" | "Deep Learning" | "Data Analysis"
tags: ["Python", "TensorFlow", "OpenCV"]
date: "2024-01-15"
featured: true | false
image: "/images/projects/project-slug/preview.jpg"
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/username/repo"
---
```

**Markdown Content Structure:**
```markdown
## Problem Statement
Description of the problem being solved...

## Approach
Technical methodology and approach...

## Technologies
- Technology 1
- Technology 2

## Results
Measurable outcomes and metrics...

## Challenges & Solutions
### Challenge 1
Description...

**Solution:** How it was resolved...

## Visual Demonstrations
![Alt text](/images/projects/project-slug/demo.png)

## Live Demo
[Link to demo](url)

## Source Code
[GitHub Repository](url)
```

**TypeScript Interface:**
```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  featured: boolean;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  content: string; // Parsed Markdown HTML
}

type ProjectCategory = 
  | "Computer Vision"
  | "NLP"
  | "Deep Learning"
  | "Data Analysis"
  | "All";
```

---

### Category Model

**Categories:**
- All (shows all projects)
- Computer Vision
- NLP (Natural Language Processing)
- Deep Learning
- Data Analysis

**TypeScript Interface:**
```typescript
interface Category {
  id: string;
  label: string;
  description: string;
}

const CATEGORIES: Category[] = [
  { id: "all", label: "All Projects", description: "View all projects" },
  { id: "computer-vision", label: "Computer Vision", description: "Image and video analysis" },
  { id: "nlp", label: "NLP", description: "Natural language processing" },
  { id: "deep-learning", label: "Deep Learning", description: "Neural networks and AI" },
  { id: "data-analysis", label: "Data Analysis", description: "Data science and analytics" }
];
```

---

### Contact Form Model

**TypeScript Interface:**
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormValidation {
  name?: string;
  email?: string;
  message?: string;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Note on Property-Based Testing Applicability:**

After careful assessment, this ML portfolio website is **NOT suitable for comprehensive property-based testing (PBT)**. Here's why:

1. **UI Rendering Focus**: Most requirements involve UI presentation, layout, and visual design—areas where snapshot testing and visual regression testing are more appropriate than PBT
2. **Simple CRUD-like Operations**: Project display, filtering, and navigation are straightforward data rendering operations without complex transformation logic
3. **External Dependencies**: Contact form submission, image loading, and navigation involve external services or browser APIs
4. **Configuration and Setup**: Many requirements are about initial page state, responsive breakpoints, and accessibility setup—one-time checks rather than properties across input spaces

**Where PBT Could Apply (Limited Scope):**
- **Client-side filtering logic**: Testing that filter operations correctly subset project arrays
- **Form validation**: Testing validation rules across generated input strings
- **URL slug generation**: Ensuring slug transformation is consistent and reversible

However, even these areas have limited input variation that meaningfully tests edge cases. For example, filtering is a simple array `.filter()` operation; testing it with 100 random project arrays doesn't reveal bugs that 2-3 carefully chosen examples wouldn't catch.

**Testing Strategy Instead:**
Given the UI-centric nature of this portfolio site, the testing strategy will emphasize:
- **Unit tests** for specific examples (valid/invalid form inputs, filter states, edge cases)
- **Snapshot tests** for component rendering consistency
- **Integration tests** for user workflows (navigation, filtering, form submission)
- **Accessibility tests** using tools like jest-axe
- **Visual regression tests** for responsive layouts

The Correctness Properties section is therefore **omitted** as PBT does not provide meaningful value for this feature. Instead, we focus on example-based testing and integration testing in the Testing Strategy section below.

---

## Error Handling

### Client-Side Errors

**1. Project Not Found (404)**
- **Trigger:** User navigates to `/projects/non-existent-slug`
- **Handling:** 
  - Display custom 404 page with clear message
  - Provide navigation back to projects page
  - Suggest similar projects (if available)
- **User Experience:** Graceful degradation, no blank screens

**2. Image Loading Failure**
- **Trigger:** Project preview image fails to load
- **Handling:**
  - Display fallback placeholder image with project category icon
  - Log error to console for debugging
  - Alt text still visible for screen readers
- **Implementation:** `onError` handler on `<img>` tags

**3. Form Validation Errors**
- **Trigger:** User submits invalid contact form
- **Handling:**
  - Prevent form submission
  - Display inline error messages for each invalid field
  - Focus first invalid field
  - Preserve user input (don't clear fields)
- **User Experience:** Clear, actionable feedback

**4. Form Submission Failure**
- **Trigger:** Network error or server rejection
- **Handling:**
  - Display error banner: "Failed to send message. Please try again."
  - Log error details to console
  - Preserve user input for retry
  - Provide alternative contact method (email link)
- **User Experience:** Transparent failure with alternative action

---

### Build-Time Errors

**1. Malformed Markdown Frontmatter**
- **Trigger:** Project Markdown file has invalid YAML frontmatter
- **Handling:**
  - Build fails with clear error message indicating file and line
  - Developer must fix before deployment
- **Prevention:** Validate frontmatter schema in `lib/projects.ts`

**2. Missing Required Image**
- **Trigger:** Frontmatter references image that doesn't exist
- **Handling:**
  - Build warning (not failure)
  - Use fallback placeholder image
  - Log missing image path
- **Prevention:** Image path validation in build script

**3. Duplicate Slugs**
- **Trigger:** Two projects have the same slug
- **Handling:**
  - Build fails with error message
  - List conflicting project files
- **Prevention:** Slug uniqueness check in `lib/projects.ts`

---

### Accessibility Error States

**1. Focus Trap Prevention**
- **Trigger:** Modal or menu could trap keyboard focus
- **Handling:**
  - Implement focus management for modals
  - Ensure Escape key closes overlays
  - Return focus to trigger element on close
- **Implementation:** Focus trap library (focus-trap-react) or manual management

**2. Color-Only Information**
- **Trigger:** Information conveyed solely by color
- **Handling:**
  - Always pair color with text, icons, or patterns
  - Example: Active filter has colored background AND border
- **Prevention:** Design review against WCAG 1.4.1

**3. Insufficient Contrast**
- **Trigger:** Text doesn't meet 4.5:1 contrast ratio
- **Handling:**
  - Darken text or lighten background during design
  - Test with contrast checker tools
- **Prevention:** CSS variables for brand colors with guaranteed contrast

---

### Performance Error States

**1. Slow Page Load**
- **Trigger:** Page takes >3s to load (e.g., on slow 3G)
- **Handling:**
  - Display loading skeletons for content areas
  - Prioritize above-the-fold content
  - Defer below-fold images with lazy loading
- **User Experience:** Perceived performance improvement

**2. Large Image Load**
- **Trigger:** Project detail page has high-res images
- **Handling:**
  - Use Next.js Image component for automatic optimization
  - Generate multiple image sizes (srcset)
  - Serve WebP with JPEG/PNG fallback
  - Implement blur-up placeholder (LQIP)
- **Result:** Faster load without quality loss

---

## Testing Strategy

Given the UI-centric nature of this portfolio website, testing will focus on **example-based unit tests**, **integration tests**, **snapshot tests**, and **accessibility tests**. Property-based testing is not applicable for the reasons outlined in the Correctness Properties section.

### Unit Testing

**Framework:** Jest + React Testing Library

**Components to Test:**
1. **Header**
   - Renders navigation links correctly
   - Highlights active page
   - Mobile menu toggles on button click
   - Keyboard navigation works (Tab, Enter)

2. **ProjectCard**
   - Displays project title, description, tags
   - Links to correct project detail page
   - Shows featured badge when featured=true
   - Renders placeholder image on load error

3. **CategoryFilter**
   - Renders all category buttons
   - Active category highlighted
   - Calls onCategoryChange with correct category on click
   - "All" category shows by default

4. **ContactForm**
   - Validates required fields (name, email, message)
   - Shows error messages for invalid inputs
   - Prevents submission when invalid
   - Calls onSubmit with form data when valid
   - Clears form after successful submission

**Example Test (ContactForm Validation):**
```typescript
describe('ContactForm', () => {
  it('should show error for invalid email', () => {
    render(<ContactForm onSubmit={jest.fn()} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('should accept valid form submission', async () => {
    const mockSubmit = jest.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello, I am interested in your work.' } });
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: 'Hello, I am interested in your work.'
      });
    });
  });
});
```

---

### Integration Testing

**Framework:** Playwright or Cypress

**User Workflows to Test:**

1. **Homepage → Project Detail Flow**
   - Visit homepage
   - Click featured project card
   - Verify navigation to correct project detail page
   - Verify project content displays

2. **Project Filtering Flow**
   - Visit projects page
   - Click "Computer Vision" category
   - Verify only Computer Vision projects displayed
   - Click "All" category
   - Verify all projects displayed again

3. **Contact Form Submission Flow**
   - Visit contact page
   - Fill out form with valid data
   - Submit form
   - Verify success message displayed
   - Verify form cleared

4. **Keyboard Navigation Flow**
   - Tab through header navigation
   - Verify focus indicators visible
   - Press Enter on "Projects" link
   - Verify navigation to projects page

**Example Test (Project Filtering):**
```typescript
test('should filter projects by category', async ({ page }) => {
  await page.goto('/projects');
  
  // Count all projects initially
  const allProjects = await page.locator('[data-testid="project-card"]').count();
  expect(allProjects).toBeGreaterThan(0);
  
  // Click "Computer Vision" filter
  await page.click('button:has-text("Computer Vision")');
  
  // Verify only Computer Vision projects shown
  const filteredProjects = await page.locator('[data-testid="project-card"]').count();
  expect(filteredProjects).toBeLessThan(allProjects);
  
  // Verify all cards have Computer Vision category
  const categories = await page.locator('[data-testid="project-category"]').allTextContents();
  categories.forEach(cat => expect(cat).toBe('Computer Vision'));
});
```

---

### Snapshot Testing

**Framework:** Jest with React Testing Library

**Components to Snapshot:**
- ProjectCard with various props (featured, non-featured, with/without demo URL)
- Header in different states (desktop, mobile menu open/closed)
- Footer
- Project detail page layout

**Purpose:** Catch unintended UI regressions during refactoring

---

### Accessibility Testing

**Tools:**
- **jest-axe**: Automated WCAG checks in unit tests
- **Lighthouse CI**: Accessibility audits in CI pipeline
- **Manual Testing**: Keyboard navigation, screen reader (NVDA/VoiceOver)

**Automated Accessibility Tests:**
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('ProjectCard Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Manual Checks:**
- Tab through entire site with keyboard only
- Test with NVDA screen reader (Windows) and VoiceOver (Mac)
- Verify color contrast with browser DevTools
- Test with prefers-reduced-motion enabled

---

### Performance Testing

**Tools:**
- **Lighthouse CI**: Automated performance audits in CI
- **WebPageTest**: Real-world performance metrics
- **Chrome DevTools**: Core Web Vitals monitoring

**Metrics to Track:**
- **First Contentful Paint (FCP)**: Target <1.5s
- **Largest Contentful Paint (LCP)**: Target <2.5s
- **Cumulative Layout Shift (CLS)**: Target <0.1
- **Time to Interactive (TTI)**: Target <3s
- **Total Blocking Time (TBT)**: Target <200ms

**CI Integration:**
- Run Lighthouse on every PR
- Fail build if performance score drops below 90
- Comment on PR with performance report

---

### Visual Regression Testing

**Tool:** Percy or Chromatic

**Scenarios:**
- Homepage at 320px, 768px, 1024px, 1440px
- Projects page with different filter states
- Project detail page with various content lengths
- Contact page with form errors

**Purpose:** Catch unintended layout and styling changes across responsive breakpoints

---

### Test Coverage Goals

- **Unit Test Coverage**: >80% for components and utilities
- **Integration Tests**: All critical user workflows covered
- **Accessibility**: Zero critical violations (Lighthouse score 100)
- **Performance**: Lighthouse performance score >90
- **Visual Regression**: All responsive breakpoints covered

---

## Design Deliverables Summary

This design document has established:

1. **Architecture**: Static site generation with Next.js, mobile-first responsive design, and CDN deployment
2. **Components**: Modular React components (Header, ProjectCard, ProjectGrid, CategoryFilter, ContactForm) with clear interfaces
3. **Data Models**: Markdown-based project content with TypeScript interfaces
4. **Error Handling**: Comprehensive client-side, build-time, and accessibility error strategies
5. **Testing Strategy**: Focus on unit tests, integration tests, snapshot tests, and accessibility tests (PBT not applicable)

**Next Steps:**
- User review and feedback on design approach
- Proceed to task breakdown for implementation
- Begin development with mobile-first homepage and project components

---

**End of Design Document**
