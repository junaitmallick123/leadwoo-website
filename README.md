# LeadWoo Website – GitHub Pages

This private repository publishes an editing copy of the current
`tryleadwoo.com` marketing website through GitHub Pages.

## What is preserved

- The original compiled LeadWoo website, routes, styles, typography, and imagery
- All public marketing routes from the current website
- The original header and footer

## Intentional replacement

Only `/plans` is replaced with the approved LeadWoo pricing page in:

`static/plans/index.html`

## Deployment

Every push to `main` runs `.github/workflows/pages.yml`, prepares the GitHub
Pages artifact, and deploys it.

## Editing

- Pricing page: edit `static/plans/index.html`
- Build/deployment rules: edit `scripts/build-github-pages.sh`
- GitHub Pages workflow: edit `.github/workflows/pages.yml`

The rest of the site is mirrored from the owner-controlled production website
during deployment so it remains an unchanged replica.
