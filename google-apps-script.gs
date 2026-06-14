/**
 * Series A Hub — Email capture → Google Sheets (+ email notification)
 * ------------------------------------------------------------
 * Paste this into a Google Apps Script bound to your Google Sheet,
 * deploy it as a Web App, and put the resulting URL into index.html
 * (the SHEETS_ENDPOINT constant). Full steps are in README.md.
 *
 * The web form sends: email, source, page  (plus a server timestamp).
 *
 * IMPORTANT: after changing this file you must publish a NEW VERSION
 * (Deploy → Manage deployments → edit → New version) and re-authorize
 * when prompted (the email feature needs the "send email" permission).
 */

// Get an email here every time someone joins. Set to '' to turn off.
var NOTIFY_EMAIL = 'brooks.fastsolutions@gmail.com';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
              || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');

    // Add a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Page']);
    }

    var p = (e && e.parameter) ? e.parameter : {};

    // Honeypot: if the hidden "company" field is filled, it's a bot — ignore it.
    if (p.company) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'ignored' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),
      p.email  || '',
      p.source || '',
      p.page   || ''
    ]);

    // Notify by email (failures here never block saving the lead).
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: 'New Series A Hub waitlist signup: ' + (p.email || '(no email)'),
          body: 'A new person joined the waitlist.\n\n'
              + 'Email:  ' + (p.email  || '') + '\n'
              + 'Source: ' + (p.source || '') + '\n'
              + 'Page:   ' + (p.page   || '') + '\n'
              + 'Time:   ' + new Date()
        });
      } catch (mailErr) {
        // ignore — the lead is already safely in the sheet
      }
    }

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
    .createTextOutput(JSON.stringify({ status: 'Series A Hub lead endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
