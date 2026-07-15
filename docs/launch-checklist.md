# Launch Checklist — Prima UI Docs Site on Vercel

**What this is:** the `docs-site` folder is a static documentation/marketing site (built with Vite + React) for the Prima UI component library. It has **no backend, no database, no authentication, and no payments** — it's pages, components, and animations that get compiled into static HTML/JS/CSS. That means this is a short checklist: connect it to Vercel, tell Vercel how to build it, and go live.

**Stack detected:**
- Monorepo managed with **pnpm workspaces** (root `pnpm-workspace.yaml` → `docs-site` package)
- Site itself: **Vite + React + TypeScript**, client-side routing via `HashRouter` (react-router-dom)
- No `vercel.json`, no existing deploy config, and **no git remote configured yet** (`git remote -v` returned empty)

**Estimated total time:** 20–30 minutes (plus up to 24 hours if you add a custom domain, waiting on DNS)

**Legend**
- 🧑 **You** — needs your accounts, decisions, or a click only you can make.
- 🤖 **Agent** — paste the prompt into your coding agent (me) and I'll do it.
- 🤝 **Together** — I prepare it, you click the final button.

---

## Phase 1 — Get the code onto GitHub

Vercel deploys from a git repository. Your project isn't connected to one yet.

- [ ] 🧑 **Create a GitHub repository.** Go to [github.com/new](https://github.com/new), create an empty repo (don't initialize with a README — you already have code). Copy the repo URL it gives you (looks like `https://github.com/<you>/<repo>.git`).
  **You'll know it worked when:** you see an empty repo page with setup instructions.

- [ ] 🤖 **Push this repo to GitHub.** Once you have the URL, give me a prompt like:
  > Add my GitHub repo `<paste URL here>` as the `origin` remote and push the current `main` branch to it.

  **You'll know it worked when:** refreshing the GitHub repo page shows your files.

---

## Phase 2 — Connect Vercel and configure the build

This is a monorepo, so the default Vercel auto-detect will get this wrong unless we tell it explicitly where the site lives and how to build it (pnpm workspace, filtered build command).

- [ ] 🧑 **Create a Vercel account** at [vercel.com/signup](https://vercel.com/signup) (sign in with your GitHub account — this is the easiest path since it lets Vercel see your repos). Free "Hobby" tier is enough for a docs/marketing site.
  **You'll know it worked when:** you land on the Vercel dashboard.

- [ ] 🧑 **Import the project.** On the Vercel dashboard, click **Add New → Project**, pick the GitHub repo you just pushed, and click **Import**.

- [ ] 🧑 **Override the build settings** on the import screen (click "Edit" under Build & Output Settings) — set these exactly:
  | Setting | Value |
  |---|---|
  | Framework Preset | Vite |
  | Root Directory | *(leave as the repo root — do not set it to `docs-site`)* |
  | Install Command | `pnpm install` |
  | Build Command | `pnpm --filter docs-site build` |
  | Output Directory | `docs-site/dist` |

  *Why leave Root Directory at repo root:* the `pnpm-lock.yaml` and workspace definition live at the top level. If you point Vercel's root at `docs-site`, it can't see the workspace and the install will fail or produce a different dependency tree than what you tested locally.

  **You'll know it worked when:** the settings panel shows those four values before you click Deploy.

- [ ] 🧑 **Click Deploy.** Vercel will run the install and build commands and give you a live `*.vercel.app` URL when it finishes (first build usually takes 1–3 minutes).
  **You'll know it worked when:** the deploy log ends in "Ready" and clicking the preview URL loads the Prima UI docs site.

---

## Phase 3 — Verify it actually works live

Because routing here uses `HashRouter` (URLs look like `/#/components/button`), there's no server-side rewrite config needed for deep links to work — this also means there's nothing extra to configure for routing. Still worth checking:

- [ ] 🧑 **Walk the real site**, not just the homepage:
  - Load the home page.
  - Click into 2–3 different nav sections/component pages.
  - Reload the browser on one of those inner pages (not just the homepage) to confirm it doesn't 404.
  - Check it on your phone (or resize your browser) to confirm the hamburger nav / mobile TOC works, since that was recently added.
  **You'll know it worked when:** every page loads correctly, including after a hard refresh on a deep link.

---

## Phase 4 — Custom domain (optional)

Skip this if the `*.vercel.app` URL is fine for now.

- [ ] 🧑 **Buy or use an existing domain.** If you don't have one, Vercel can sell you one directly from the project's **Settings → Domains** tab, or you can use a domain from any registrar (Namecheap, Google Domains, etc.) — roughly $10–15/year.

- [ ] 🧑 **Add it in Vercel:** Project → Settings → Domains → enter your domain → follow the DNS instructions Vercel shows you (usually one `A` record or `CNAME`, added at your domain registrar).
  **You'll know it worked when:** Vercel shows a green checkmark next to the domain. DNS changes can take anywhere from a few minutes to 24 hours to propagate — if it's not working immediately, wait and check again rather than re-configuring.

---

## After launch

- **Auto-deploys:** every future `git push` to `main` will trigger a new Vercel deploy automatically — no extra steps needed.
- **Analytics (optional):** if you want visitor stats, Vercel Analytics can be enabled with one toggle in Project → Analytics (free tier available). Not required to launch.
- **If a deploy fails:** check the build log in the Vercel dashboard first — for this project the most likely cause is the Build Command or Output Directory getting reset to Vercel's auto-detected defaults instead of the values in Phase 2.

---

## Summary of what you personally need to do (🧑)

1. Create a GitHub repo and give me the URL (I'll push the code).
2. Create a Vercel account and import the project.
3. Enter the four build settings from Phase 2 exactly as shown.
4. Click Deploy, then click through the live site once.
5. (Optional) Point a custom domain at it.

Everything else — pushing code, and any fixes if the build settings need adjusting — I can do for you. Total cost: **$0/month** (Vercel Hobby tier), or ~$10–15/year if you add a custom domain.
