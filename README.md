# Still Ground

The live Still Ground website for Jane Aldiss.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Published Site

Canonical domain:

```text
https://stillground.co.uk/
```

This repo is configured for GitHub Pages:

```text
https://peter-wilkins.github.io/yogalightness-beta/
```

Cloudflare Pages can deploy the same `dist` build after these repository values
exist:

```text
CLOUDFLARE_PAGES_ENABLED=true
CLOUDFLARE_PROJECT_NAME=yogalightness-beta
```

and these secrets exist:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Theme prototypes:

```bash
npm run dev
# open /theme-preview/
```

Asset plan:

```bash
python3 scripts/plan_blog_assets.py --name 'Still Ground' --subject 'meditation, retreats, contemplative support, Norfolk, and reflective practice'
```

Posts live in:

```text
src/content/posts/
```

Posts are drafts by default. Change `draft: false` when a post is ready to
publish.

## Source Policy

Jane has said not to reuse the old website. Keep this site on the new Still
Ground copy and clearly marked placeholder content only.
