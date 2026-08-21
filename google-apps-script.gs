/**
 * BLC website contact form → Google Sheets bridge.
 *
 * Setup:
 * 1. Go to sheets.google.com and create a new blank spreadsheet.
 *    Rename Sheet1's header row (row 1) to: Timestamp | Name | Email | Phone | Interested In | Message
 * 2. In the sheet, open Extensions → Apps Script.
 * 3. Delete any starter code and paste this whole file in.
 * 4. Click Deploy → New deployment → select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions Google asks for.
 * 6. Copy the "Web app URL" it gives you — that's your VITE_GSHEET_WEBHOOK_URL.
 * 7. Put that URL in a .env file at the project root:
 *      VITE_GSHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
 * 8. Rebuild/redeploy the site. Every form submission now appends a row here.
 *
 * If you ever need to update this script, edit it and choose
 * Deploy → Manage deployments → Edit → New version, so the same URL keeps working.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.interestedIn || '',
    data.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
