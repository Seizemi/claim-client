# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Refer to README.md to project overview.

TypeScript, Axios, Zustand, Zod, react-router-dom, react-toastify, and Sass are installed and in use. The app is organized by feature/domain rather than by technical layer — see Architecture and File Organization below — mirroring the `ClaimApi` backend's own Modular Monolith + Claims module boundary.

## Commands

- `npm start` — run the dev server at http://localhost:3000 with hot reload
- `npm test` — run the test runner via Jest in interactive watch mode (react-scripts test)
- `npm test -- --watchAll=false` — run the full test suite once, non-interactively (useful for CI-style verification)
- `npm test -- App.test.js` — run a single test file
- `npm run build` — produce a production build in `build/`
- `npm run eject` — irreversible; copies CRA's webpack/Babel/ESLint config into the project. Do not run without explicit user request.

There is no separate lint command; ESLint runs as part of `react-scripts start`/`build`/`test` via the `eslintConfig` (`react-app`, `react-app/jest`) in `package.json`.

## Architecture
- Organized by feature/domain, not by technical layer — mirrors the `ClaimApi` backend's own Modular Monolith + Claims module boundary. See File Organization below for where things live.
- This is a React app with TypeScript
- State management: Zustand for client state
- Routing: React Router v6
- API calls: Always use the `useApi` hook (`src/shared/hooks/useApi.ts`), which wraps Axios and validates responses with Zod
- Use react-toastify to notify user
- Each page or component lives in its own folder named after it, containing the component (`Name.tsx`), its styles (`Name.scss`, occasionally `.css`)
- When the component has non-trivial data/state logic — a co-located custom hook `useName.tsx` that the component imports (e.g. `features/claims/dashboard/Dashboard.tsx` + `useDashboard.tsx`). When adding data-fetching or stateful logic to a page, follow this hook-extraction pattern rather than inlining it in the component.
- Imports use absolute paths rooted at `src` (`tsconfig.json` sets `baseUrl: "./src"`), e.g. `import Dashboard from "features/claims/dashboard/Dashboard"`
- Always use one of the colors existing in the Color rules section within README.md file

## File Organization
- App shell (composition root, routing, layout, nav): `src/app/` (`App.tsx`, `Layout/`, `SideBar/`, `TopBar/`)
- Cross-feature shared code — nothing domain-specific goes here: `src/shared/` (`types/`, `hooks/`, `services/`, `utils/`, `styles/`, `mocks/`, `components/icons/`)
- Feature/domain modules, one per business domain, each owning its own types/components/pages: `src/features/<feature>/` (e.g. `src/features/claims/`, `src/features/statistics/`)
  - A feature's pages live directly inside its folder (e.g. `src/features/claims/dashboard/`, `src/features/claims/newClaim/`) — there is no separate top-level `pages/`
- `setupTests.ts` and `react-app-env.d.ts` stay at `src/` root (CRA/Jest convention)

## Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utils: camelCase (`formatDate.ts`)
- Constants: SCREAMING_SNAKE_CASE

## Component Guidelines
- Use functional components with hooks
- Keep components under 200 lines
- Extract complex logic to custom hooks
- Use TypeScript for all prop types