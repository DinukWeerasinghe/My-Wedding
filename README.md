# Dinuka & Nimasha Wedding Invitation

A React + Vite wedding invitation website with animated envelope opening, save-the-date video, countdown, timeline, location map, gallery, and Google Sheets RSVP reporting.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build For Hosting

```bash
npm run build
```

Upload the generated `dist` folder to your hosting provider.

## RSVP Report

RSVP submissions are sent to Google Sheets through Apps Script. See `RSVP_GOOGLE_SHEETS_SETUP.md`.

The Apps Script URL is configured in:

```text
src/config.js
```
