# RSVP Google Sheets Setup

Use this to collect RSVP submissions into a Google Sheet report.

## 1. Create the Sheet

1. Open Google Sheets.
2. Create a new spreadsheet named `Dinuka Nimasha RSVP`.
3. Rename the first sheet tab to `RSVP`.

## 2. Add Apps Script

1. In the Google Sheet, go to `Extensions` > `Apps Script`.
2. Delete any starter code.
3. Paste this code:

```javascript
const SHEET_NAME = "RSVP";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");

    ensureHeaderRow(sheet);

    sheet.appendRow([
      new Date(),
      data.event || "",
      data.name || "",
      data.guests || "",
      data.attendance || "",
      data.message || "",
      data.submittedAt || "",
      data.pageUrl || "",
      data.phone || "",
    ]);

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

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "Received At",
    "Event",
    "Name",
    "Number of Guests",
    "Attendance",
    "Message",
    "Submitted At",
    "Page URL",
    "Phone Number",
  ]);
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

## 4. Connect This Website

Open `src/config.js` and paste your Web App URL here:

```javascript
const RSVP_ENDPOINT = "PASTE_YOUR_WEB_APP_URL_HERE";
```

After hosting the website, submit one test RSVP and check the Google Sheet. Each guest RSVP will appear as a new row, so your RSVP report is the Sheet itself.
