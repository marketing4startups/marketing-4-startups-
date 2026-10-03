# Marketing4Startups — Principal Founder Growth & Advisory

Bespoke high-performance web application engineered for Irish startups and small businesses, built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 GitHub Actions Deployment Protocol

This repository is configured with automated continuous integration and continuous deployment (CI/CD) to **GitHub Pages** via `.github/workflows/deploy.yml`.

### One-Time GitHub Pages Setup:
1. Navigate to your GitHub repository: **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every push to the `main` or `master` branch will automatically build and publish the React application to your GitHub Pages URL (or custom domain).
4. You can also trigger manual deployments at any time from the **Actions** tab using the **Run workflow** button.

---

## 🛠️ Tech Stack & React Protocols

- **Framework**: React 19 (SPA Architecture)
- **Bundler & Tooling**: Vite 8 with ESM code-splitting
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Animations**: Motion
- **Google Integrations**: Google Calendar API & Gmail API via Firebase Auth OAuth

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on port 3000)
npm run dev

# 3. Type check & lint
npm run lint

# 4. Production build
npm run build

# 5. Local preview of production build
npm run preview
```

---

## 🌐 Custom Domain & GitHub Pages Pathing

- **Relative Asset Resolution**: Vite is configured with `base: process.env.VITE_BASE_URL || './'`, guaranteeing all JavaScript, CSS, and web assets resolve properly whether deployed to a custom root domain (`https://marketing4startups.net`) or a repository path (`https://<username>.github.io/<repo>/`).
- **SPA Routing**: `public/404.html` and `.nojekyll` are included so client-side routing and page reloads work seamlessly without 404 errors.
