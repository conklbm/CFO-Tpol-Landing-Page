# RaiseReady — Landing Page

A single-file static landing page for an upcoming product that turns a company's
intake details into an investor-ready **Series A pitch deck**, powered by the
experience of a seasoned CFO.

The design (colors, typography, layout) mirrors
[gulfsideadvisors.com](https://gulfsideadvisors.com/): deep navy `#003865`,
khaki/gold accent `#DFD1A7`, powder-blue bands `#BBDDE6`, italic serif headings
(Playfair Display) and a clean DIN-style sans (Barlow).

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire landing page — HTML, CSS, and JS in one file. Drop it into Netlify. |
| `google-apps-script.gs` | Backend that saves email signups to a Google Sheet. |

---

## 1. Deploy to Netlify (fastest)

**Drag-and-drop:**
1. Go to <https://app.netlify.com/drop>.
2. Drag the project folder (or just `index.html`) onto the page.
3. You'll get a live URL in seconds. Rename the site / add a custom domain in
   **Site settings** when ready.

**Or connect this Git repo:** New site → Import from Git → pick this repo →
deploy. No build command needed; publish directory is the repo root.

---

## 2. Collect emails in Google Sheets

The form posts signups to a Google Sheet via a small Apps Script web app.

1. Create a new Google Sheet (e.g. "RaiseReady Leads").
2. **Extensions → Apps Script**. Delete the starter code.
3. Paste the contents of `google-apps-script.gs` and **Save**.
4. **Deploy → New deployment → Web app.**
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   - Click **Deploy** and authorize when prompted.
5. Copy the **Web app URL** (ends in `/exec`).
6. Open `index.html`, find this line near the bottom, and paste your URL:

   ```js
   const SHEETS_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```

7. Redeploy / re-drop to Netlify. Signups now land in a `Leads` tab with
   timestamp, email, source (which form), and page URL.

> **Note:** The request uses `mode: 'no-cors'`, so the browser can't read the
> response — the page optimistically shows a success message. Check the Sheet to
> confirm rows are being written.

> **Tip:** If you'd rather not run Apps Script, Netlify has built-in form
> handling. Add `name="signup" data-netlify="true"` to the `<form>` tags and a
> hidden `form-name` field; submissions appear under **Forms** in the Netlify
> dashboard. (The current setup uses Google Sheets per your request.)

---

## 3. Customize

Everything is editable in `index.html`. Common edits:

- **Brand name:** replace `RaiseReady` (search/replace).
- **Colors:** edit the `:root` CSS variables at the top of the `<style>` block.
- **The CFO section:** update the initials, name, role, and the `$XXM+ / XX+ /
  XX yrs` stat placeholders (search for `EDIT ME`).
- **Copy:** all headings and paragraphs are plain HTML — edit in place.
- **Contact email:** replace `hello@raiseready.com` in the footer.

---

## Credits / fonts

The reference site uses the Adobe Fonts `mencken-std` (serif) and `urw-din`
(sans). Those are licensed Typekit fonts, so this page uses the closest free
Google Fonts equivalents — **Playfair Display** and **Barlow** — loaded via CDN.
Swap the `<link>` and `--serif` / `--sans` variables if you license the originals.
