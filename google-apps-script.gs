/**
 * RaiseReady — Email capture → Google Sheets
 * ------------------------------------------------------------
 * Paste this into a Google Apps Script bound to your Google Sheet,
 * deploy it as a Web App, and put the resulting URL into index.html
 * (the SHEETS_ENDPOINT constant). Full steps are in README.md.
 *
 * The web form sends: email, source, page  (plus a server timestamp).
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
              || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');

    // Add a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Page']);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.email  || '',
      p.source || '',
      p.page   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the Web App URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RaiseReady lead endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
