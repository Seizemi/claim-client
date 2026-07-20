# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Refer to README.md to project overview.

**Current actual state differs from the plan above**: the repository is still the unmodified [Create React App](https://github.com/facebook/create-react-app) JavaScript scaffold — `src/App.js` etc. TypeScript and Axios are not yet installed (`package.json` has no `typescript` dependency, no `tsconfig.json`). When starting real implementation work, set up TypeScript and Axios first, and update this section once the gap between plan and reality closes.

## Commands

- `npm start` — run the dev server at http://localhost:3000 with hot reload
- `npm test` — run the test runner via Jest in interactive watch mode (react-scripts test)
- `npm test -- --watchAll=false` — run the full test suite once, non-interactively (useful for CI-style verification)
- `npm test -- App.test.js` — run a single test file
- `npm run build` — produce a production build in `build/`
- `npm run eject` — irreversible; copies CRA's webpack/Babel/ESLint config into the project. Do not run without explicit user request.

There is no separate lint command; ESLint runs as part of `react-scripts start`/`build`/`test` via the `eslintConfig` (`react-app`, `react-app/jest`) in `package.json`.

## Architecture
- This is a React app with TypeScript
- State management: Zustand for client state
- Routing: React Router v6
- API calls: Always use the useApi hook
- Use react-toastify to notify user
- Validate API responses with Zod inside useApi
- Each page or component lives in its own folder named after it, containing the component (`Name.tsx`), its styles (`Name.scss`, occasionally `.css`)
- Always use one the color existing in Color rules section within README.md file
- when the component has non-trivial data/state logic — a co-located custom hook `useName.tsx` that the component imports (e.g. `pages/Dashboard/Claim/DashboardClaim.tsx` + `useDashboardClaim.tsx`). When adding data-fetching or stateful logic to a page, follow this hook-extraction pattern rather than inlining it in the component.
- Imports use absolute paths rooted at `src` (`tsconfig.json` sets `baseUrl: "./src"`), e.g. `import Login from "pages/Login/Login"

## File Organization
- Components: `src/components/`
- Pages: `src/pages/`
- Types: `src/types/`

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