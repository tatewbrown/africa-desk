# Africa Desk

Public morning research dashboard, independent of tatebrown.com.

Expected site URL: https://tatewbrown.github.io/africa-desk/

## Publish

GitHub repository Settings > Pages: deploy from the `main` branch, `/docs` folder. GitHub rebuilds the static site when those files change. The site is public. There is no custom domain, backend or paid search API.

## Local development

Requires Node 22+; no package installation required.

    node scripts/build.mjs
    node --test scripts/build.test.mjs
    node scripts/preview.mjs

`content/desk.json` is the reviewed public source of truth. `docs/data.js` and `docs/data.json` are generated from it. `docs/index.html`, `styles.css`, `app.js`, and `favicon.svg` provide the static dashboard. Browser bookmarks are stored only on that device; they are not a shared database.

## Morning publishing workflow

The existing Codex morning research automation does the research using public sources and its available web tool. GitHub Pages does not run that research, and this repository does not contain a server or a search credential. The computer and Codex must remain available for the research workflow.

After completing a run, produce reviewed public JSON with `edition` and `leads` (and optionally `sources`) following the existing schema. Then:

    node scripts/ingest-brief.mjs path-to-public-edition.json
    node --test scripts/build.test.mjs

Publish `content/desk.json`, `docs/data.js`, and `docs/data.json` together through a single GitHub commit on main. The Codex GitHub connector can do this without a local GitHub token. Fetch the latest branch head first, create a tree retaining all other files, create a commit, then update the main ref with an expected-head check. Do not force push. Confirm the deployed page updates before reporting success.

A no-new-finding edition is still a completed research update; publish its date and access gaps while retaining older leads explicitly as carried forward. Never present a site rebuild as a new research run. Keep the original first-reviewed date on existing leads.

## Public-content boundary

The user explicitly approved publishing research leads. Publish concise, attributed research summaries and public source links only. Do not upload downloaded documents, personal data, internal logs, credentials, local paths, raw search responses or unreviewed generated text. No unpublished allegation should be presented as an established fact. All current leads have unconfirmed originality. The public website has no authentication.

## Quality checks

The dashboard has edition selection, topic/country/text filters, local saved leads, source lookup, research-file dialogs and responsive layouts. Visible freshness and method notes distinguish public source material, reporting hypotheses, existing coverage and evidence gaps. Source-access numbers refer to the selected completed research run, not live source status.
