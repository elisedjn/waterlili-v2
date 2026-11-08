# Waterlili Creation – waterlili.eu

Astro 6 + Tailwind v4 static site (en / fr / pt) merging the former `workshops` and `shop` projects.

| Section           | URLs (en / fr / pt)                                                            |
| ----------------- | ------------------------------------------------------------------------------ |
| Home              | `/` · `/fr/` · `/pt/`                                                          |
| Workshops         | `/workshops/` · `/fr/ateliers/` · `/pt/workshops/` (details: `<list>/<slug>/`) |
| At home           | `/at-home/` · `/fr/ateliers-a-domicile/` · `/pt/workshops-em-casa/`            |
| Watercolor prints | `/shop/` · `/fr/shop/` · `/pt/shop/` (details: `<list>/<slug>/`)               |
| Blog              | `/blog/` · `/fr/blog/` · `/pt/blog/`                                           |

## Commands

`npm run dev` · `npm run build` (type-checks first) · `npm run preview` · `npm run images`

## Add a workshop

Create a markdown file in `src/content/workshops/<lang>/`. Key fields: `location` (`ericeira` | `santa-cruz`),
`slug`, `startDate`, `endDate` (recurring workshops), `date`, `time`, `price`, `place`, and `images:` – a list of paths in `public/images/`
(more than one picture shows a carousel).
A workshop is shown (workshops page and home cards) until its `endDate`, or until its `startDate` when there is no
`endDate`; a date-only `endDate` includes that whole day. Workshops without any date are always shown.
For a recurring workshop, set `startDate` to the first session and `endDate` to the last one.
The site is static, so it must be rebuilt after a date passes to hide the workshop. New locations: add them in `src/config/locations.ts`.

## Add a watercolor print

1. Put numbered images in `originals/<slug>/` (git-ignored) and run `npm run images`.
2. Create `src/content/artworks/<slug>.yaml` (see existing files).
3. Commit the YAML, `public/artworks/` and `src/config/artwork-images.json`.

## Shared components

`Card`, `Tag`, `CtaBanner`, `LinkButton`, `Icon` and `Carousel` (variants `card`, `large`, `fill`, `wide`)
are used by both the workshops and the shop pages.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` (`SITE=https://waterlili.eu`, `public/CNAME`).
