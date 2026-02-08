# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for the Bellevue Amateur Radio Club (BARC) — a fan site supplement to the official club site. Built with Eleventy (11ty) v2, using Nunjucks templates and Markdown content pages. No frameworks — vanilla JavaScript only.

## Build & Development Commands

```bash
npm install        # Install dependencies (only dependency is @11ty/eleventy)
npm start          # Dev server with live reload at http://localhost:8080
npm run build      # Production build → _site/ directory
```

There are no test or lint commands configured.

## Architecture

**Eleventy config** (`.eleventy.js`): Source in `src/`, output to `_site/`. Passthrough copies `src/css`, `src/js`, and `src/_data` to output.

**Data-driven content**: Club information lives in JSON files under `src/_data/`. These are the single source of truth and are directly available in Nunjucks templates by filename (e.g., `organizers.json` → `{{ organizers }}`). They are also copied to `_site/_data/` for client-side JS to fetch at runtime.

| Data file | Content |
|-----------|---------|
| `next_meeting.json` | Next meeting date, time, location, topic |
| `organizers.json` | Club officers with callsigns and titles |
| `committees.json` | Club committees and members |
| `repeaters.json` | Area repeaters with frequencies, tones, callsigns |
| `google-calendar.json` | Google Calendar API key and calendar ID |

**Templates**: `src/_layouts/base.njk` is the single base layout. `src/_includes/next_meeting.njk` is a reusable component for meeting info displayed on multiple pages.

**Content pages**: Markdown files in `src/` (index.md, meetings.md, about.md, calendar.md, hamfests.md, nets.md, repeaters.md) plus `bring.html`. Each uses frontmatter to set layout, title, and permalink.

**Client-side JS** (`src/js/`):
- `calendar.js` — Fetches events from Google Calendar API and renders an upcoming events list + monthly calendar grid
- `nets.js` — Fetches nets schedule from a GitHub-hosted JSON file (`payne/ham-radio-data` repo)
- `repeaters.js` — Loads `repeaters.json` at runtime, groups by band (2m/1.25m/70cm/23cm), renders sortable tables
- `menu.js` — Hamburger menu toggle and dark mode persistence via localStorage

**Styling**: Single stylesheet at `src/css/style.css` with CSS custom properties for light/dark theming.

## Adding a New Page

1. Create a `.md` file in `src/` with frontmatter (`layout: base.njk`, `title`, `permalink`)
2. Add navigation link in `src/_layouts/base.njk`

## Interaction Logging

After each interaction, append the user's prompt and a summary of your response to `CLAUDE_INTERACTIONS.md`. Use this format:

```markdown
## User [YYYY-MM-DD HH:MM:SS]

<the user's prompt>

---

## Claude [YYYY-MM-DD HH:MM:SS]

<summary of what you did/responded>

---
```

## Key Conventions

- This is **BARC** (Bellevue Amateur Radio Club), not AARC (some older references may still say AARC)
- Meeting info updates go in `src/_data/next_meeting.json` and are automatically reflected everywhere via the `next_meeting.njk` include
- The Google Calendar API key in `google-calendar.json` is intentionally committed — it's domain-restricted and read-only for public calendar data
