# Yeshwanth Digital CRO & Paid Media Lab

Portfolio site for Yeshwanth Digital: interactive Shopify product configurators and modular 9:16 ad systems for high-AOV D2C brands.

Live: https://yeshwanth-digital-cro-lab.vercel.app

## Files

| File | What it is |
|---|---|
| `index.html` | Page content and structure |
| `styles.css` | All styling: brand colours, layout, animations |
| `app.js` | Interactions: intro loader, 3D mockups, live configurator, cursor, counters |
| `vercel.json` | Vercel config (clean URLs) |
| `package.json` | Project metadata (no dependencies, no build step) |

Plain HTML, CSS and JavaScript. No framework, no build step, no libraries: the only external request is Google Fonts.

## Edit and preview

Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
```

## Deploy

The site is a static Vercel project. Once this repository is connected to the Vercel project, every push to `main` deploys to production automatically.

## Brand tokens

Defined at the top of `styles.css`:

| Token | Value |
|---|---|
| `--bg-main` | `#FBF9F5` |
| `--bg-dark` / `--text-main` | `#141413` |
| `--accent-primary` | `#D9532F` |
| `--accent-emerald` | `#1F6E4A` |
| `--border-light` | `#E5E0D5` |

Fonts: Instrument Serif (headings), Plus Jakarta Sans (body), JetBrains Mono (numbers).
