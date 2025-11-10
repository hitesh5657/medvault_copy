# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

This repository is a Vite + React project configured to deploy as a GitHub Pages project.

Automatic deploy
- A GitHub Actions workflow has been added at `.github/workflows/deploy.yml`. On every push to the `main` branch the workflow will:
	1. install dependencies (`npm ci`)
	2. run the build (`npm run build`)
	3. publish the `dist/` folder to the `gh-pages` branch using `GITHUB_TOKEN`.

Manual deploy (optional)
- The project already includes `gh-pages` as a dependency and the following npm scripts in `package.json`:

	- `npm run build` — build the app into `dist/`.
	- `npm run deploy` — runs `gh-pages -d dist` (publishes `dist/` to `gh-pages`).

Notes & configuration
- The project `vite.config.js` base is set to `/medvault_copy` to match the repository name. If you deploy to a user/org site (username.github.io) change `base` to `/`.
- To trigger automatic deploys, push your changes to `main` (or change the workflow to another branch).

If you want me to also add a GitHub Pages CNAME, or change the workflow to deploy on PR merge only, tell me which option you prefer.
