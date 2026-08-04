You are working on my existing **Dinuka & Nimasha Wedding Invitation** project.

First, inspect the complete repository and read these files before changing anything:

* `DEVELOPMENT_BLUEPRINT.md`
* `src/App.jsx`
* `src/config.js`
* `src/styles.css`
* `src/components/RsvpSection.jsx`
* `src/components/RsvpSection.css`
* `src/components/ParentsSection.jsx`
* `src/components/ParentsSection.css`
* `src/components/DetailsSection.jsx`
* `src/components/WeddingFooter.jsx`
* `RSVP_GOOGLE_SHEETS_SETUP.md`
* `vite.config.js`
* Any existing Vercel configuration

## Main objective

Add a new, separate, lightweight wedding attendance confirmation page.

Example URL:

```text
/confirm?name=ප්‍රසන්න_මල්ලි
```

Full example:

```text
https://dinuka-nimasha-wedding-invite.vercel.app/confirm?name=ප්‍රසන්න_මල්ලි
```

This page will be sent to guests who have already received the full wedding invitation.

The purpose is to ask them for a simple final confirmation of whether they will attend the wedding.

## Critical backward-compatibility requirement

Do not remove, replace, redirect, or break any existing functionality.

These existing modes must continue working exactly as they currently do:

```text
/
```

```text
/?name=Guest_Name
```

```text
/?upload=true
```

The complete wedding invitation must remain available through the existing root URL.

Do not turn the root invitation into the new confirmation page.

Do not remove or simplify any existing invitation sections.

## New confirmation mode

Add a new application mode based on the pathname:

```text
/confirm
```

The application should detect:

```js
window.location.pathname === "/confirm"
```

or use another clean solution appropriate for the current project.

Avoid adding React Router unless it provides a clear benefit. The current application already handles different modes inside `App.jsx`, so follow the existing architectural style where practical.

The rendering priority should avoid query-mode conflicts:

1. `/confirm` → render the new confirmation page
2. `?upload=true` on the regular invitation path → render guest upload mode
3. Everything else → render the existing invitation

Do not allow `/confirm` to accidentally render the complete invitation or upload section.

## Guest name handling

Read the existing `name` query parameter using the same behavior as the current invitation.

Example:

```text
/confirm?name=ප්‍රසන්න_මල්ලි
```

must display:

```text
ප්‍රසන්න මල්ලි
```

Requirements:

* Decode URL-encoded characters safely.
* Convert underscores to spaces.
* Trim unnecessary whitespace.
* Preserve Sinhala and other Unicode characters correctly.
* Reuse or extract the existing guest-name parsing logic instead of creating inconsistent duplicate logic.
* Do not display `Guest`, `undefined`, `null`, or an empty personalized greeting.

When a valid name is provided, show a personalized greeting such as:

```text
Dear ප්‍රසන්න මල්ලි,
```

When no name is provided:

* Show a tasteful generic greeting.
* Display a required guest-name input before submission.
* Do not submit an anonymous confirmation.

When a name comes from the URL:

* Show it clearly on the confirmation card.
* Store the clean name in the submitted Google Sheets payload.
* The guest should not normally need to type the name again.
* A small “Not you?” or “Edit name” action may be provided if it can be implemented elegantly and simply.

## Page purpose and content

This must not feel like another large form.

Create a beautiful, premium, mobile-first confirmation experience using the visual identity of the existing invitation.

The page should communicate:

* Dinuka & Nimasha
* Wedding date: 26 August 2026
* Ceremony time: 9:10 AM
* Venue: Capital City Hotel, Badulla
* A short final-confirmation message
* Two clear response options:

  * Yes, I’ll be there
  * Sorry, I can’t attend

Suggested copy:

```text
Final Attendance Confirmation
```

```text
Dear [Guest Name],

We’re finalizing the arrangements for our wedding celebration and would love to know whether you’ll be joining us.

Please confirm your attendance below.
```

The wording may be polished, but keep it warm, respectful, concise, and suitable for Sri Lankan wedding guests.

Do not mention that guests ignored or skipped the earlier invitation.

## Visual design

Create new files following the existing project convention:

```text
src/components/AttendanceConfirmation.jsx
src/components/AttendanceConfirmation.css
```

Use a better equivalent name only if the repository already has a naming convention that makes another name clearly preferable.

The confirmation page should include:

* A romantic premium background consistent with the current invitation
* Subtle petals, glow, texture, gradients, or restrained motion
* A centered confirmation card
* The couple’s names
* Personalized guest greeting
* A compact wedding-details area
* Two large, highly visible Yes/No buttons
* Elegant success state after submission
* A small link to view the complete invitation
* The existing footer branding only if it fits the lightweight experience

You may reuse suitable existing assets such as:

```text
/images/home_photo.webp
/images/rsvp.webp
/images/logo.svg
```

Choose the most appropriate image after inspecting the current design.

Do not use the heavy invitation intro, envelope animation, save-the-date video, full gallery, countdown, timeline, or embedded map on this page.

The confirmation page must load quickly because guests may open it through WhatsApp on mobile data.

## Suggested page structure

A suitable structure is:

1. Minimal decorative header or couple monogram
2. Couple names
3. “Final Attendance Confirmation” label
4. Personalized guest greeting
5. Short confirmation message
6. Compact date, time, and venue details
7. Two attendance buttons
8. Submission progress state
9. Success state
10. Link to open the complete invitation

The complete invitation link should preserve the guest name.

Example:

```text
/?name=ප්‍රසන්න_මල්ලි
```

Build the URL safely with `URLSearchParams`.

## Confirmation controls

Use two large selection cards or buttons:

### Yes

Visible copy:

```text
Yes, I’ll be there
```

Stored value:

```text
Yes
```

### No

Visible copy:

```text
Sorry, I can’t attend
```

Stored value:

```text
No
```

Do not include “Maybe” on this final-confirmation page.

A guest should be able to submit with one clear interaction or with a select-then-confirm flow.

Preferred behavior:

1. Guest selects Yes or No.
2. Show the selected state clearly.
3. Show a final button such as `Confirm Attendance`.
4. Submit only after the guest presses the final button.

This reduces accidental submissions.

Keep the interaction simple and do not add unnecessary fields such as phone number, liquor preference, guest count, or long messages.

An optional short note field may be included only if it does not distract from the Yes/No confirmation. Prefer leaving it out for the first version.

## Google Sheets integration

Reuse the existing Google Apps Script RSVP infrastructure configured through:

```js
RSVP_ENDPOINT
```

Do not expose new secrets in the frontend.

Do not remove or break the current RSVP submission.

Submit a payload that clearly identifies this as a final attendance confirmation.

Recommended payload:

```json
{
  "event": "Dinuka & Nimasha Wedding",
  "submissionType": "Final Attendance Confirmation",
  "name": "Clean guest name",
  "attendance": "Yes | No",
  "submittedAt": "ISO timestamp",
  "pageUrl": "current confirmation page URL",
  "source": "confirmation-page"
}
```

Inspect the existing Google Apps Script and `RSVP_GOOGLE_SHEETS_SETUP.md` before deciding how to store the data.

Preferred storage approach:

* Preserve the existing RSVP sheet and existing RSVP records.
* Add a separate Google Sheets tab named:

```text
Final Confirmations
```

Recommended columns:

```text
Timestamp
Event
Guest Name
Attendance
Submission Type
Source
Submitted At
Page URL
```

If the Apps Script source is available in the repository:

* Update it with backward-compatible routing.
* Existing full RSVP submissions must continue going to the existing RSVP sheet.
* Payloads with `submissionType === "Final Attendance Confirmation"` or `source === "confirmation-page"` must go to the `Final Confirmations` tab.
* Automatically create the new tab and header row if it does not exist.
* Do not delete, reorder, or overwrite the existing RSVP sheet.
* Keep support for the current payload fields.

If the Apps Script source is not available in the repository:

* Do not invent that the Google Sheet was automatically updated.
* Update `RSVP_GOOGLE_SHEETS_SETUP.md` with the complete replacement Apps Script code.
* Clearly document the exact deployment steps.
* Explain that the Apps Script must be redeployed as a new version after the code is updated.
* Keep the existing web app URL if Google allows deployment of the new version under the same deployment.
* Provide a precise test procedure.

## Duplicate and updated confirmations

Guests may open the confirmation link more than once.

Do not block them from changing their answer.

Every successful submission may be appended as a new timestamped record. This preserves an audit trail.

However, the Google Sheet documentation should explain that the latest record for a guest name is considered the current final answer.

If practical without making the implementation fragile, include a normalized guest-name field or document how to determine the latest submission.

Do not attempt unsafe client-side duplicate prevention using only `localStorage`.

You may save the last successful response in `localStorage` only to improve user experience, for example:

```text
wedding_final_confirmation
```

If used:

* It must not prevent resubmission.
* It may show “Your previous response from this device was Yes.”
* Google Sheets remains the source of truth.

## Submission behavior

Follow the current RSVP submission approach where appropriate.

The existing endpoint reportedly uses:

```js
mode: "no-cors"
```

Because `no-cors` produces an opaque response, treat a resolved fetch as submitted, consistent with the current form.

Requirements:

* Validate the endpoint before submitting.
* Validate that a guest name exists.
* Validate that Yes or No has been selected.
* Disable controls while submitting.
* Prevent rapid duplicate button presses.
* Show a visible loading state.
* Show an elegant success state.
* Show a useful error message if the request fails.
* Preserve accessibility announcements.

Suggested success state for Yes:

```text
Thank you, [Guest Name]!

We’re delighted that you’ll be joining us. We can’t wait to celebrate with you.
```

Suggested success state for No:

```text
Thank you for letting us know, [Guest Name].

We’ll miss you on the day and truly appreciate your confirmation.
```

Include a button or link to change the response and submit again.

Do not immediately reset the page after a successful submission.

## Existing toast system

Inspect the current toast implementation in `App.jsx`.

You may reuse it if it works naturally in confirmation mode.

However, the new page should have an inline success state so the guest does not depend only on a temporary toast notification.

## Vercel direct-path support

A guest opening this URL directly must not receive a Vercel 404:

```text
/confirm?name=Guest_Name
```

Inspect the existing deployment configuration.

Add or update `vercel.json` only if necessary.

Use a narrow rewrite where possible, such as:

```json
{
  "rewrites": [
    {
      "source": "/confirm",
      "destination": "/"
    }
  ]
}
```

If an existing `vercel.json` is present, merge the new rule carefully and preserve all existing configuration.

Verify that:

* `/confirm` loads the Vite application.
* The browser URL remains `/confirm?...`.
* Static assets still load.
* `/` still loads the full invitation.
* `/?upload=true` still loads upload mode.

Do not introduce a rewrite loop.

## SEO and sharing metadata

When the confirmation page is loaded, use an appropriate document title such as:

```text
Confirm Your Attendance | Dinuka & Nimasha
```

The regular invitation title must remain unchanged when viewing the full invitation.

Do not make invasive changes to the existing metadata system.

## Accessibility

The new page must include:

* Semantic heading order
* Keyboard-accessible Yes/No controls
* Visible focus states
* Proper button labels
* `aria-pressed` or radio-group semantics for selected attendance
* `aria-live` for validation, loading, error, and success feedback
* Sufficient contrast
* Reduced-motion support
* Touch targets suitable for mobile devices

Do not use clickable `div` elements without keyboard support.

## Responsive behavior

Test at minimum:

```text
320px
375px
430px
768px
1024px
1440px
```

On mobile:

* The confirmation card must fit without horizontal scrolling.
* Buttons should stack vertically if needed.
* Important content must appear above excessive decoration.
* Sinhala guest names must wrap gracefully.
* The page must remain usable with larger accessibility font sizes.

## Performance

The confirmation page should be much lighter than the full invitation.

Do not load or autoplay:

* Intro video
* Save-the-date video
* Full gallery
* Location iframe
* Unnecessary invitation-only components

Avoid loading large media assets unless they are used on the confirmation screen.

Ensure that invitation-only effects, observers, timers, and event listeners are not unnecessarily initialized in confirmation mode.

If `App.jsx` currently initializes all invitation behavior before choosing a mode, refactor carefully so mode-specific logic does not cause errors or unnecessary work.

Do not over-engineer the application.

## Code quality

Requirements:

* Follow the existing React 18 and Vite architecture.
* Use functional components and hooks.
* Preserve current styling conventions.
* Avoid unnecessary dependencies.
* Do not duplicate guest-name parsing.
* Keep submission logic maintainable.
* Avoid unrelated refactoring.
* Do not modify generated `dist/` files manually.
* Do not remove current features.
* Do not expose credentials.
* Add comments only where they explain non-obvious behavior.

## Documentation

Update `DEVELOPMENT_BLUEPRINT.md` to document:

* New `/confirm` mode
* Query parameter behavior
* New component files
* Google Sheets payload
* Vercel direct-route handling
* Confirmation render flow
* Testing instructions
* Any new localStorage key
* Known limitations

Update `RSVP_GOOGLE_SHEETS_SETUP.md` to document:

* The new `Final Confirmations` sheet tab
* Headers
* Backward-compatible Apps Script
* Deployment or redeployment procedure
* How to test Yes and No
* How to interpret repeated submissions
* How to identify the latest answer per guest

## Verification

Run:

```bash
npm run build
```

Fix all build errors before finishing.

Also test locally:

```text
/
```

```text
/?name=ප්‍රසන්න_මල්ලි
```

```text
/?upload=true
```

```text
/confirm
```

```text
/confirm?name=ප්‍රසන්න_මල්ලි
```

```text
/confirm?name=John_Doe
```

Verify:

* Full invitation remains unchanged.
* Personalized full invitation still works.
* Guest upload mode still works.
* Confirmation path renders only the new lightweight page.
* Sinhala names render correctly.
* Missing-name validation works.
* Yes submission works.
* No submission works.
* Multiple clicks do not create accidental rapid duplicates.
* Inline success message is correct for the selected answer.
* The guest can change and resubmit their answer.
* The Google Sheet receives the correct data.
* Direct Vercel navigation to `/confirm` does not return 404.
* Browser refresh on `/confirm` works.
* No console errors occur.
* Mobile layout works.
* Reduced-motion preference works.

## Deliverables

After implementation, provide:

1. A concise summary of the implementation.
2. A list of files created.
3. A list of files modified.
4. The final Google Sheets payload format.
5. Any complete Google Apps Script code that I must deploy.
6. Exact Google Apps Script redeployment instructions.
7. Exact Vercel configuration added or changed.
8. Test results, including `npm run build`.
9. Any manual actions I still need to perform.
10. Example links I can send to guests.

Do not claim the Google Sheet or Apps Script deployment has been completed unless you actually have access to deploy it.

Do not remove or alter the current complete wedding invitation experience.
