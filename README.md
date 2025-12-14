# E-commerce Vertex - Frontend

This project is the frontend for an e-commerce platform built with Angular. It
is currently set up for a frontend developer to focus exclusively on building
the admin dashboard.

## 🚀 Project Description

The goal is to develop a modern, functional admin dashboard for managing
products, orders, and users. The project is configured so that, upon running, it
displays the admin dashboard by default.

## 📦 Requirements

- Node.js v20.x (use `nvm use` for the correct version)
- Angular CLI v17+
- Firebase access (only if you need integration; not required for UI
  development)

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <REPO_URL>
cd ecommerce-vertex
```

2. Install dependencies:

```bash
npm install
```

3. Use the recommended Node version:

```bash
nvm use
```

## 🗝️ Environment Variables

- Copy `src/environments/environment.example.ts` to
  `src/environments/environment.ts` and fill in your Firebase credentials.
- **Never commit your real environment files.**

## 🖥️ Local Development

To start the project in development mode:

```bash
npm start
```

This will open the app at [http://localhost:4200](http://localhost:4200) and
display the admin dashboard.

Other useful scripts:

- `npm run build` – Build the project for production
- `npm run lint` – Lint the codebase
- `npm run test` – Run unit tests

## 🚀 Remote Development & Deployment

### Firebase Hosting

- The project is ready for deployment on Firebase Hosting.
- Build the project and deploy:

```bash
npm run build
firebase deploy
```

### Vercel / Netlify

- You can also deploy the `dist/ecommerce-vertex/browser` folder to Vercel or
  Netlify as a static site.
- Configure environment variables in the dashboard of your chosen platform.

## 📁 Folder Structure

- `src/app/features/admin/` → The dashboard and its pages/components
- `src/app/app.routes.ts` → Routing configuration (dashboard is the main route)
- `src/environments/` → Environment variables (not included in the repo)

## 🧑‍💻 Best Practices

- Use standalone components and Angular 17+
- Keep styles and templates in separate files
- Follow the feature-based folder structure
- Do not commit credentials or environment files
- Write clear and descriptive commit messages

## 📝 Notes

- Backend and Firebase integration are out of scope for this frontend repo.
- If you need to add libraries, please consult with the team first.

## 📬 Contact

For questions or support, please contact the project maintainer or team.
