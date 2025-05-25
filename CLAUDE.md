# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeatherGuesser is a weather-related guessing game built with TanStack Start, React, and Mantine UI. The app uses Tailwind CSS for additional styling and is deployed on Vercel.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Start production server
npm run start

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

# Generate route tree (automatically done on dev/build)
npm run routes:generate
```

## Architecture

- **Framework**: TanStack Start with React and TypeScript
- **UI Library**: Mantine UI components with Tailwind CSS integration
- **Build Tool**: Vinxi (Vite-based) with TanStack Start configuration
- **Routing**: File-based routing with TanStack Router in `/src/routes/`
- **Styling**: Mantine UI + Tailwind CSS (Tailwind preflight disabled to avoid conflicts)
- **Testing**: Vitest for unit tests, Playwright for integration tests

## Key Directories

- `/src/routes/` - TanStack Router file-based routes
- `/src/components/` - Reusable React components
- `/src/styles/` - Global CSS and styling
- `/tests/` - Playwright integration tests
- `/static/` - Static assets served from root

## Tech Stack Integration

- **Mantine + Tailwind**: Mantine provides component library, Tailwind for utilities
- **PostCSS**: Configured with `postcss-preset-mantine` for Mantine variables
- **TanStack Router**: Auto-generates route tree in `/src/routeTree.gen.ts`
- **Client/Server**: Split architecture with `/src/client.tsx` and `/src/server.tsx`

## Testing Setup

- Unit tests: Place `*.test.tsx` files alongside source code in `/src/`
- Integration tests: Write Playwright tests in `/tests/` directory
- Playwright automatically starts dev server for E2E testing

## Current State

Recently migrated from SvelteKit to TanStack Start. Basic UI structure implemented with Mantine components and Tailwind styling. Ready for weather guessing game functionality development.