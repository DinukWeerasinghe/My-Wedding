# Development Blueprint

Explored on 2026-08-04.

This file documents the current structure, behavior, integrations, and extension points of the Dinuka and Nimasha wedding invitation site before new development begins.

## Project Overview

This is a Vite and React single-page wedding invitation application. The public invitation flow is a romantic, animated page with an envelope intro, save-the-date video, personalized invitation card, wedding details, countdown, timeline, gallery, map, RSVP form, and footer.

There is also a separate guest upload mode for the live memory booth. It is selected by query string, not by routing.

Primary modes:

- Invitation mode: default URL, for example `/`
- Personalized invitation mode: `/?name=Guest_Name`
- Guest upload mode: `/?upload=true`
- Final attendance confirmation mode: `/confirm?name=Guest_Name`

## Tech Stack

- React 18
- Vite 5
- CSS modules by component convention, using plain CSS files imported per component
- Lucide icons loaded from CDN in `index.html`
- Google Fonts loaded from CDN in `index.html`
- `browser-image-compression` for guest-side image compression before Cloudinary upload
- `sharp` for local image optimization scripts

## Commands

```bash
npm run dev
npm run build
npm run preview
node optimize-images.js
node rename-images.js
```

`npm run dev` starts Vite with `--host 0.0.0.0`. In local testing, the app has also been used on `http://localhost:5174/`.

## Current Directory Structure

```text
My Wedding/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
├── structure.md
├── DEVELOPMENT_BLUEPRINT.md
├── RSVP_GOOGLE_SHEETS_SETUP.md
├── optimize-images.js
├── rename-images.js
├── public/
│   ├── Wedding Save the Date Video.mp4
│   ├── intro.mp4
│   ├── wax-seal.png
│   ├── music/
│   │   └── wedding-background.mp3
│   └── images/
│       ├── home_photo.webp
│       ├── photo1.webp ... photo12.webp
│       ├── rsvp.webp, rsvp2.webp, rsvp3.webp
│       ├── DEL*.webp
│       └── logo.svg
└── src/
    ├── App.jsx
    ├── config.js
    ├── main.jsx
    ├── styles.css
    ├── wax-seal.png
    ├── hooks/
    │   └── useLucideIcons.js
    ├── utils/
    │   └── guestName.js
    └── components/
        ├── AttendanceConfirmation.jsx / AttendanceConfirmation.css
        ├── CountdownSection.jsx / CountdownSection.css
        ├── DetailsSection.jsx / DetailsSection.css
        ├── EnvelopeIntro.jsx / EnvelopeIntro.css
        ├── GallerySection.jsx / GallerySection.css
        ├── GuestUploadSection.jsx / GuestUploadSection.css
        ├── HeroSection.jsx / HeroSection.css
        ├── LocationSection.jsx / LocationSection.css
        ├── ParentsSection.jsx / ParentsSection.css
        ├── PersonalNoteSection.jsx / PersonalNoteSection.css
        ├── RsvpSection.jsx / RsvpSection.css
        ├── SaveDateSection.jsx / SaveDateSection.css
        ├── SeatingSection.jsx / SeatingSection.css
        ├── TimelineSection.jsx / TimelineSection.css
        └── WeddingFooter.jsx / WeddingFooter.css
```

Generated or dependency directories:

- `dist/`: production build output
- `node_modules/`: installed dependencies
- `.git/`: repository metadata
- `.cursor/`: editor/tooling metadata

## Application Entry Points

`index.html`

- Defines viewport and theme color.
- Loads Google Fonts.
- Loads Lucide UMD script globally as `window.lucide`.
- Mounts React at `#root`.

`src/main.jsx`

- Creates the React root.
- Renders `App` inside `React.StrictMode`.
- Imports global styles from `src/styles.css`.

`src/App.jsx`

- Imports all section components.
- Owns cross-section application state.
- Chooses confirmation mode, upload mode, or full invitation mode.
- Builds floating petals, sparkles, and hearts.
- Handles music playback, intro state, reveal observer, back-to-top visibility, countdown updates, seating search, RSVP submission, final confirmation submission, and lightbox state.

## Global Configuration

`src/config.js`

- `RSVP_ENDPOINT`: Google Apps Script web app endpoint for RSVP submissions.
- `MUSIC_SOURCE`: background music path, currently `/music/wedding-background.mp3`.

Important: RSVP posts use `fetch` with `mode: "no-cors"`, so the client treats a completed request as success without reading a response body.

## Core State And Data

Main constants in `src/App.jsx`:

- `weddingDate`: `2026-08-26T09:10:00+05:30`
- `saveDateVideoUrl`: `/Wedding Save the Date Video.mp4`
- `introVideo`: `/intro.mp4`
- `SHOW_SEATING_FINDER`: currently `false`
- `galleryImages`: 12 WebP image entries
- `seatingDatabase`: local guest/table lookup data
- `/confirm` mode payload uses the same `RSVP_ENDPOINT` as the full RSVP form

Important state in `App`:

- `introClosed`: hides/shows intro overlay and controls body scroll
- `countdown`: recalculated every second
- `videoFallback`: toggles save-date poster fallback if video fails
- `toast`: global status messages
- `musicPlaying`: controls audio toggle state
- `backToTopVisible`: scroll-based utility button state
- `submitting`: RSVP submit loading state
- `seatingQuery`, `seatingResult`, `searchedName`: seating finder state
- `lightboxIndex`: fullscreen gallery modal state
- `isConfirmationMode`: true when `window.location.pathname === "/confirm"`
- `isUploadMode`: true when URL contains `?upload=true`
- `guestName`, `rawGuestName`: personalized invitation display from URL `name` parameter

## Render Flow

Mode priority:

1. `/confirm` renders `AttendanceConfirmation`.
2. `?upload=true` renders `GuestUploadSection` on regular invitation paths.
3. Everything else renders the full invitation.

Default invitation mode:

1. Loading screen
2. Background audio element
3. Music and back-to-top utility buttons
4. Floating petals, sparkles, and hearts
5. `EnvelopeIntro`
6. `SaveDateSection`
7. `HeroSection`
8. `ParentsSection`
9. `DetailsSection`
10. `CountdownSection`
11. Optional `SeatingSection` if `SHOW_SEATING_FINDER` is true
12. `TimelineSection`
13. `GallerySection`
14. `PersonalNoteSection`
15. `LocationSection`
16. `RsvpSection`
17. `WeddingFooter`
18. Conditional lightbox modal
19. Toast region

Upload mode:

1. Loading screen
2. Utility/background decorative layers
3. `GuestUploadSection`

In upload mode, intro and footer are skipped and body scroll is unlocked.

Confirmation mode:

1. Loading screen
2. `AttendanceConfirmation`

In confirmation mode, intro, footer, audio, decorative floating layers, lightbox, scroll observers, and invitation-only sections are skipped.

## Feature Inventory

### Final Attendance Confirmation

Files:

- `src/components/AttendanceConfirmation.jsx`
- `src/components/AttendanceConfirmation.css`
- `src/utils/guestName.js`
- `vercel.json`

Behavior:

- Route is `/confirm`.
- Supports personalized links such as `/confirm?name=Guest_Name`.
- Underscores in guest names are converted to spaces with the shared guest-name helper.
- If no name is provided, the guest must type their name before submitting.
- Guests choose one final answer: `Yes` or `No`.
- Successful submissions remain editable through the "Change Response" action.
- Last submitted response is saved in browser local storage under `wedding_final_confirmation` for local feedback only.
- The "View Full Invitation" link preserves the guest name when present.

Submission payload:

```json
{
  "event": "Dinuka & Nimasha Wedding",
  "submissionType": "Final Attendance Confirmation",
  "name": "Guest Name",
  "attendance": "Yes",
  "submittedAt": "2026-08-04T00:00:00.000Z",
  "pageUrl": "https://example.com/confirm?name=Guest_Name",
  "source": "confirmation-page"
}
```

Development notes:

- Final confirmations use the existing `sendRsvpToGoogleSheet` helper and `RSVP_ENDPOINT`.
- The Apps Script in `RSVP_GOOGLE_SHEETS_SETUP.md` routes these rows into a `Final Confirmations` tab.
- `vercel.json` rewrites `/confirm` to `/` so direct refreshes on Vercel still load the Vite app.

### Envelope Intro

Files:

- `src/components/EnvelopeIntro.jsx`
- `src/components/EnvelopeIntro.css`

Behavior:

- Fullscreen intro overlay with video background.
- Reads `name` query parameter and displays a personalized "Dear ..." line.
- Envelope can be opened by clicking the stage, pressing Enter/Space on the stage, or clicking the open button.
- Uses an internal `opening` state to prevent double opening.
- Calls `onEnter` after a 2.5 second opening animation.
- Pauses the intro video once hidden.

Development notes:

- Intro close behavior is controlled in `App.closeIntro`.
- `body.intro-active` is toggled by `App`.
- Keep intro content responsive because it is the first viewport on every device.

### Save The Date Video

Files:

- `src/components/SaveDateSection.jsx`
- `src/components/SaveDateSection.css`

Behavior:

- Shows the main save-the-date video only after intro is closed.
- Uses `/images/home_photo.webp` as poster and fallback image.
- Uses `preload="none"` on mobile and `preload="metadata"` on larger devices.
- In `App`, an `IntersectionObserver` plays the video when visible and pauses it when offscreen.

### Hero Invitation

Files:

- `src/components/HeroSection.jsx`
- `src/components/HeroSection.css`

Behavior:

- Displays main couple portrait, wedding date, personalized invite line, RSVP button, and optional seating button.
- Receives `guestName` from `App`.
- Receives `showSeatingFinder`; when false, the "Find My Seat" CTA is hidden.
- The hero backdrop is linked to scroll parallax through `heroBackdropRef`.

### Formal Invitation Card

Files:

- `src/components/ParentsSection.jsx`
- `src/components/ParentsSection.css`

Behavior:

- Renders a decorative digital invitation card.
- Shows parents' names, couple names, date, venue, ceremony time, and a guest line.
- If `rawGuestName` exists from `?name=...`, the guest line shows the decoded guest name.
- If no guest name exists, it renders a blank dotted guest line.

### Wedding Details

Files:

- `src/components/DetailsSection.jsx`
- `src/components/DetailsSection.css`

Behavior:

- Displays date, time, venue, and dress code cards.
- Current RSVP deadline copy: `15 July 2026`.
- Detail card icons are Lucide icon names.

### Countdown

Files:

- `src/components/CountdownSection.jsx`
- `src/components/CountdownSection.css`

Behavior:

- Receives countdown values from `App`.
- Displays four circular SVG progress cards for days, hours, minutes, and seconds.
- Countdown calculation clamps negative distance to zero.

### Seating Finder

Files:

- `src/components/SeatingSection.jsx`
- `src/components/SeatingSection.css`

Behavior:

- Currently hidden because `SHOW_SEATING_FINDER` is false.
- If enabled, allows name search against the local `seatingDatabase` in `App.jsx`.
- Matching is case-insensitive and uses substring inclusion.
- Shows either table details or a not-found panel.

Development notes:

- For production seating data, consider moving `seatingDatabase` out of `App.jsx` into a data file or backend source.
- If guest privacy matters, avoid shipping full seating data in the client bundle.

### Timeline

Files:

- `src/components/TimelineSection.jsx`
- `src/components/TimelineSection.css`

Behavior:

- Displays eight wedding-day agenda milestones.
- Each item includes number, time, title, description, Lucide icon, and accent color.
- Uses alternating left/right timeline card layout with central nodes.

### Gallery And Lightbox

Files:

- `src/components/GallerySection.jsx`
- `src/components/GallerySection.css`
- Lightbox modal markup is currently in `src/App.jsx`.

Behavior:

- Receives `galleryImages` and `onOpenLightbox` from `App`.
- Displays a carousel-like main image area with previous/next controls and thumbnails.
- Auto-advances every 4 seconds while not animating.
- Clicking the main image opens the fullscreen lightbox in `App`.
- Lightbox navigation wraps previous and next across all 12 images.

Development notes:

- There are two gallery interaction layers: local carousel state in `GallerySection`, and fullscreen modal state in `App`.
- If expanding gallery behavior, consider moving the lightbox modal into `GallerySection` or a dedicated `LightboxModal` component.

### Personal Note

Files:

- `src/components/PersonalNoteSection.jsx`
- `src/components/PersonalNoteSection.css`

Behavior:

- Displays a couple photo and romantic note to guests.
- Uses `/images/rsvp.webp`.

### Location

Files:

- `src/components/LocationSection.jsx`
- `src/components/LocationSection.css`

Behavior:

- Shows venue copy for Capital City Hotel, Badulla.
- Provides Google Maps search and directions links.
- Embeds a Google Maps iframe with lazy loading.

### RSVP

Files:

- `src/components/RsvpSection.jsx`
- `src/components/RsvpSection.css`
- `src/config.js`
- `RSVP_GOOGLE_SHEETS_SETUP.md`

Behavior:

- Collects name, phone number, number of guests, attendance, liquor preference, and message.
- `App.handleRsvpSubmit` builds the payload and posts to `RSVP_ENDPOINT`.
- Shows a success toast and resets the form if the fetch completes.
- Shows an error toast if endpoint validation or fetch fails.

Current payload fields:

```json
{
  "event": "Dinuka & Nimasha Wedding",
  "name": "Guest",
  "phone": "...",
  "guests": "...",
  "attendance": "Yes | No | Maybe",
  "liquor": "Yes, liquor | No, soft drinks only | Not specified",
  "message": "...",
  "submittedAt": "ISO timestamp",
  "pageUrl": "current URL"
}
```

### Guest Upload Mode

Files:

- `src/components/GuestUploadSection.jsx`
- `src/components/GuestUploadSection.css`

Route:

- `/?upload=true`

Behavior:

- Presents the "Live Memory Booth" upload experience.
- Allows up to five image uploads per browser via `localStorage` key `wedding_upload_count`.
- Compresses images client-side with `browser-image-compression`.
- Uploads via XHR to Cloudinary unsigned upload endpoint.
- Shows aggregate upload progress, success/error messages, and a limit reached state.

Current Cloudinary constants:

- Cloud name: `dcyk0cijc`
- Upload preset: `wedding_booth`

Development notes:

- Upload count is browser-local, so clearing local storage resets it.
- Cloudinary credentials are hardcoded in the component.
- For stricter control, move Cloudinary settings to config and use signed uploads or backend validation.

### Footer

Files:

- `src/components/WeddingFooter.jsx`
- `src/components/WeddingFooter.css`

Behavior:

- Provides quick anchor links, contact details, support email, and powered-by branding.
- Hides seating link when `SHOW_SEATING_FINDER` is false.

## Global Styling And Motion

`src/styles.css` contains:

- CSS variables for color, type, shadows, spacing, and responsive section padding.
- Body background, texture overlay, and romantic gradient animation.
- Shared section layout primitives.
- Loading screen.
- Utility buttons.
- Floating petals, sparkles, and hearts.
- Shared button styling and shimmer hover behavior.
- Toast behavior.
- Reveal-on-scroll transitions.
- Shared keyframes and reduced-motion fallback.

Each component owns its detailed section styling in a matching `.css` file.

Important convention:

- Global primitives live in `src/styles.css`.
- Section-specific classes live beside the section component.
- New section components should follow the existing `ComponentName.jsx` plus `ComponentName.css` pattern.

## Assets

Important public assets:

- `/Wedding Save the Date Video.mp4`: main save-date video
- `/intro.mp4`: intro envelope background video
- `/wax-seal.png`: wax seal used by intro
- `/music/wedding-background.mp3`: background audio
- `/images/home_photo.webp`: hero/save-date fallback portrait
- `/images/photo1.webp` through `/images/photo12.webp`: gallery images
- `/images/rsvp.webp`: personal note image
- `/images/DEL*.webp`: additional optimized wedding images, currently available for future gallery or page sections

Image tooling:

- `rename-images.js` renames hashed legacy photo names to cleaner names.
- `optimize-images.js` converts raw PNG/JPG/JPEG files in `public/images` to WebP and resizes existing WebP files over 1200px.

Important: `optimize-images.js` deletes original raw source images after conversion.

## External Integrations

Google Apps Script:

- Used for RSVP collection.
- Endpoint configured in `src/config.js`.
- Sheet columns are documented in `RSVP_GOOGLE_SHEETS_SETUP.md`.
- The current script supports both regular RSVP submissions and final attendance confirmations.
- Final confirmations are appended to a separate `Final Confirmations` sheet tab.

Cloudinary:

- Used by guest upload mode.
- Unsigned upload endpoint is built from `CLOUDINARY_CLOUD_NAME`.
- Upload preset is `CLOUDINARY_UPLOAD_PRESET`.

Google Maps:

- Venue links use Google Maps search and directions URLs.
- Embedded map uses `https://www.google.com/maps?q=Capital%20City%20Hotel%20Badulla&output=embed`.

CDNs:

- Google Fonts
- Lucide icons

## Feature Flags And Query Parameters

`SHOW_SEATING_FINDER`

- Location: `src/App.jsx`
- Current value: `false`
- Controls whether seating section, seating CTA, and footer seating link render.

`?name=Guest_Name`

- Personalizes `EnvelopeIntro`, `HeroSection`, and `ParentsSection`.
- Underscores are converted to spaces.
- Also personalizes `/confirm?name=Guest_Name`.

`/confirm`

- Renders only the final attendance confirmation experience.
- Has priority over `?upload=true`.
- Supports optional `name` query parameter.

`?upload=true`

- Replaces the invitation flow with `GuestUploadSection`.
- Skips intro and footer.
- Keeps decorative background layers.

## Development Extension Points

Add a new invitation section:

1. Create `src/components/NewSection.jsx`.
2. Create `src/components/NewSection.css`.
3. Import the component in `src/App.jsx`.
4. Render it in the default invitation branch.
5. Add a footer link if it should be anchor navigable.
6. Add `id` and `aria-labelledby` to preserve navigation and accessibility.

Add a new gallery image:

1. Put an optimized WebP file in `public/images`.
2. Add a `{ src, alt }` entry to `galleryImages` in `src/App.jsx`.
3. Verify carousel, thumbnails, and lightbox counts.

Change RSVP fields:

1. Update `src/components/RsvpSection.jsx`.
2. Update `handleRsvpSubmit` payload in `src/App.jsx`.
3. Update `RSVP_GOOGLE_SHEETS_SETUP.md`.
4. Create a new Google Apps Script deployment if sheet columns changed.
5. Submit a test RSVP and verify the sheet row.

Change final confirmation fields:

1. Update `src/components/AttendanceConfirmation.jsx`.
2. Update `handleFinalConfirmationSubmit` payload in `src/App.jsx`.
3. Update the final confirmation branch in `RSVP_GOOGLE_SHEETS_SETUP.md`.
4. Create a new Google Apps Script deployment if sheet columns changed.
5. Test both `Yes` and `No` responses and verify the `Final Confirmations` sheet rows.

Enable seating:

1. Set `SHOW_SEATING_FINDER` to `true` in `src/App.jsx`.
2. Replace sample `seatingDatabase` data if needed.
3. Verify search, not-found, clear, hero CTA, footer link, and mobile layout.

Change upload behavior:

1. Update Cloudinary constants or move them into `src/config.js`.
2. Review max photo count in `GuestUploadSection`.
3. Test multiple uploads, limit reached state, browser refresh, and local storage reset.

## Verification Checklist Before Shipping

- Run `npm run build`.
- Start the dev server with `npm run dev`.
- Check desktop, tablet, and mobile viewports.
- Open envelope intro by click and keyboard.
- Verify music toggle behavior.
- Verify save-date video loads or fallback image appears.
- Check `?name=Guest_Name` personalization.
- Check countdown circles update.
- If seating is enabled, test a known match and a not-found search.
- Navigate gallery carousel and open fullscreen lightbox.
- Submit a test RSVP and inspect Google Sheet output.
- Visit `/?upload=true` and test upload mode with small images.
- Visit `/confirm` and verify the missing-name validation.
- Visit `/confirm?name=Guest_Name` and verify the personalized greeting.
- Submit final confirmation test responses for both `Yes` and `No`.
- Refresh `/confirm` directly on the deployed Vercel URL to verify the rewrite.
- Check browser console for runtime errors.

## Known Risks And Notes

- `README.md` is not currently present in the visible project root, although `structure.md` exists.
- RSVP uses `no-cors`, so the browser cannot verify the Apps Script response body.
- Google Apps Script changes must be deployed manually before final confirmations reach the new sheet tab.
- Final confirmations are append-only. Use the newest timestamp per guest name as the current response.
- Seating data is currently shipped client-side if the feature is enabled.
- Upload count enforcement is local to each browser, not server-side.
- Upload mode depends on Cloudinary unsigned upload configuration.
- Large video assets can affect mobile load time; current code delays the save-date video until intro is closed and uses lighter preload behavior on mobile.
- `dist/` is generated output and may become stale after source changes.
