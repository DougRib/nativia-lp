# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 5174 (uses strictPort)
- `npm run build` - TypeScript check + build production bundle
- `npm run lint` - Run ESLint with JSON output
- `npm run preview` - Preview production build on port 5174

## Project Architecture

This is a React 19 + TypeScript landing page for NativIA (corporate AI platform), built with Vite 8 and Tailwind CSS v4.

### Key Components Structure

**Landing Page Sections (src/components/landing/):**
- Landing page is composed of 14 sequential sections exported from `index.ts`
- Each section is a standalone React component (Hero, PainSolution, Benefits, etc.)
- Sections are rendered in order within `LandingPage.tsx`

**UI Components (src/components/ui/):**
- Base reusable components: button, input, textarea, label
- `reveal-section.tsx` - Animation component for scroll reveals
- `scroll-to-top-button.tsx` - Floating scroll-to-top functionality

**Content Management:**
- `src/data/landing-content.ts` - Static content, icons, and copy for landing sections
- `src/data/legal-content.ts` - Legal documents content and routing

**Services & Utils:**
- `src/services/contact-service.ts` - Contact form submission logic
- `src/lib/contact-schema.ts` - Zod validation schemas
- `src/lib/cn.ts` - Utility functions

### Routing

Custom client-side routing in `App.tsx`:
- Landing page at `/`
- Legal documents at paths defined in `legal-content.ts` (e.g., `/lgpd`, `/privacy`)
- Uses `popstate` listener for browser back/forward navigation
- Path normalization handles trailing slashes

### Contact Form Integration

Contact form uses `VITE_CONTACT_ENDPOINT` environment variable:
- Development: Logs payload to console if no endpoint
- Production: Requires valid endpoint or throws error
- Form validation with Zod schemas

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Path alias `@` maps to `./src` directory
- Design system likely uses CSS custom properties for theming

## Environment Requirements

- Node.js 20.19+ or 22.12+
- npm with optionalDependencies enabled
- Windows-specific rolldown bindings included for performance

## Troubleshooting (Windows)

For "Cannot find native binding" rolldown errors:
```powershell
Get-Process node,npm -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm cache clean --force
npm install --include=optional
npm run dev
```