# RSVP Google Sheets Setup

Use this to collect RSVP submissions into a Google Sheet report.

## 1. Create the Sheet

1. Open Google Sheets.
2. Create a new spreadsheet named `Dinuka Nimasha RSVP`.
3. Rename the first sheet tab to `RSVP`.
4. Optional: create a second sheet tab named `Final Confirmations`. The script can also create it automatically.

## 2. Add Apps Script

1. In the Google Sheet, go to `Extensions` > `Apps Script`.
2. Delete any starter code.
3. Paste this code:

```javascript
const RSVP_SHEET_NAME = "RSVP";
const FINAL_CONFIRMATIONS_SHEET_NAME = "Final Confirmations";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (isFinalConfirmation(data)) {
      appendFinalConfirmation(spreadsheet, data);
    } else {
      appendRsvp(spreadsheet, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function isFinalConfirmation(data) {
  return data.submissionType === "Final Attendance Confirmation" ||
    data.source === "confirmation-page";
}

function appendRsvp(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME) ||
    spreadsheet.insertSheet(RSVP_SHEET_NAME);

  ensureHeaderRow(sheet, [
    "Received At",
    "Event",
    "Name",
    "Number of Guests",
    "Attendance",
    "Liquor Preference",
    "Message",
    "Submitted At",
    "Page URL",
    "Phone Number",
  ]);

  sheet.appendRow([
    new Date(),
    data.event || "",
    data.name || "",
    data.guests || "",
    data.attendance || "",
    data.liquor || "",
    data.message || "",
    data.submittedAt || "",
    data.pageUrl || "",
    data.phone || "",
  ]);
}

function appendFinalConfirmation(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(FINAL_CONFIRMATIONS_SHEET_NAME) ||
    spreadsheet.insertSheet(FINAL_CONFIRMATIONS_SHEET_NAME);

  ensureHeaderRow(sheet, [
    "Timestamp",
    "Event",
    "Guest Name",
    "Attendance",
    "Submission Type",
    "Source",
    "Submitted At",
    "Page URL",
  ]);

  sheet.appendRow([
    new Date(),
    data.event || "",
    data.name || "",
    data.attendance || "",
    data.submissionType || "",
    data.source || "",
    data.submittedAt || "",
    data.pageUrl || "",
  ]);
}

function ensureHeaderRow(sheet, headers) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow(headers);
}
```

## 3. Deploy the Web App

1. Click `Deploy` > `New deployment`.
2. Click the gear icon and choose `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Click `Deploy`.
6. Authorize when Google asks.
7. Copy the Web App URL. It should start with:

```text
https://script.google.com/macros/s/
```

> **Already deployed?** If you previously deployed the script, create a new version/deployment so the final confirmation routing code is live. Existing RSVP rows can stay as they are.

## 4. Connect This Website

Open `src/config.js` and paste your Web App URL here:

```javascript
const RSVP_ENDPOINT = "PASTE_YOUR_WEB_APP_URL_HERE";
```

After hosting the website, submit one test RSVP and check the `RSVP` sheet. Each guest RSVP will appear as a new row with columns:

| Received At | Event | Name | Guests | Attendance | **Liquor Preference** | Message | Submitted At | Page URL | Phone |
|---|---|---|---|---|---|---|---|---|---|

Then open `/confirm?name=Test_Guest`, submit a `Yes` response, change it, and submit a `No` response. Final attendance confirmations will appear in the `Final Confirmations` sheet with columns:

| Timestamp | Event | Guest Name | Attendance | Submission Type | Source | Submitted At | Page URL |
|---|---|---|---|---|---|---|---|

Final confirmations are append-only. If a guest changes their answer, use the newest `Timestamp` row for that guest as the current final answer.
