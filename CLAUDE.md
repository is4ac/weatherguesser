# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeatherGuesser is a weather-related guessing game built with SvelteKit and TypeScript. The app is deployed on Vercel and includes Google Maps integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run all tests (unit + integration)
npm run test

# Run unit tests only
npm run test:unit

# Run integration tests only  
npm run test:integration

# Type checking
npm run check

# Linting and formatting
npm run lint
npm run format
```

## Architecture

- **Framework**: SvelteKit with TypeScript and Vite
- **Styling**: Tailwind CSS (configured in `/src/app.css`)
- **Routes**: File-based routing in `/src/routes/`
- **Components**: Shared utilities in `/src/lib/` (accessible via `$lib` imports)
- **Testing**: Vitest for unit tests, Playwright for integration tests
- **Deployment**: Uses `@sveltejs/adapter-auto` for automatic platform detection

## Key Directories

- `/src/routes/` - SvelteKit pages and layouts
- `/src/lib/` - Reusable components and utilities  
- `/tests/` - Playwright integration tests
- `/static/` - Static assets served from root

## Testing Setup

- Unit tests: Place `*.test.ts` files alongside source code in `/src/`
- Integration tests: Write Playwright tests in `/tests/` directory
- Playwright automatically starts dev server on port 4173 for E2E testing

## Current State

The project was recently migrated to SvelteKit. Main functionality appears to be a weather guessing game with Google Maps integration, though current pages show placeholder content.