# Panorama Research Institute — Website

Source for [research.panorama-sg.com](https://research.panorama-sg.com), the website of the **Panorama Research Institute (PRI)**, the internal research and academic development division of **Panorama Scholarly Group**.

PRI conducts and coordinates research across scholarly publishing studies, journal indexing and evaluation, policy and social research, AI and future society, education and learning research, and arts, culture and embodiment. The site presents the Institute's research centers, projects, publications, events, and governance information, and links out to the wider Panorama Scholarly Group platforms (Panorama Journals, Panorama Books, POSI Database, Panorama Scholar Profiles).

> Panorama Research Institute is an internal division of Panorama Scholarly Group and is not a separate legal entity.

## Tech Stack

- [Astro](https://docs.astro.build) — static site framework
- [Tailwind CSS](https://tailwindcss.com) — styling
- Multi-language support (English, Simplified Chinese, Traditional Chinese) via `src/i18n`

## Project Structure

```text
/
├── public/              # Static assets, robots.txt, sitemap
├── src/
│   ├── components/      # Reusable Astro components
│   ├── data/            # Site content: research areas, centers, projects, publications
│   ├── i18n/            # Translation dictionary and locale utilities
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes (including zh-cn/ and zh-tw/ locales)
│   └── styles/          # Global styles
└── scripts/             # Build-time helper scripts
```

## Development

```sh
npm install
npm run dev       # start local dev server
npm run build     # build production site to ./dist/
npm run preview   # preview the production build locally
```

## Contact

research@panorama-sg.com
