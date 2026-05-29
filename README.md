# Yoga Lightness Beta

A public beta rebuild of Yoga Lightness for Jane to review.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Published Beta

This repo is configured for GitHub Pages immediately:

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
python3 scripts/plan_blog_assets.py --name 'Yoga Lightness Beta' --subject 'yoga, lightness, kundalini, classes, and reflective practice'
```

Posts live in:

```text
src/content/posts/
```

Posts are drafts by default. Change `draft: false` when a post is ready to
publish.

## Source Policy

The beta imports public image assets and publishes summaries with links back to
the original Yoga Lightness pages. Do not migrate full article bodies until Jane
confirms the desired public migration path.
