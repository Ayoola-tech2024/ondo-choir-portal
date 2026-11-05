# Ondo Area Music Committee — 2026 Christmas Concert Attendance & Portal

A lightweight, mobile-first web app built for Zonal & Station Attendance Officers, choristers, and the Music Committee Chairman.

---

## 🌟 Key Features

1. **Mark Attendance (Officers Check-In Tab)**:
   - One-tap **Present**, **Excused**, or **Absent**.
   - Filters by Zone, Station, and Voice Part (Soprano, Alto, Tenor, Bass, Musician).
   - Pre-loaded with all 11 rehearsal sessions from the 2026 Schedule.
   - Quick **"+ Add New Chorister"** button right at rehearsal so no one is delayed.

2. **Check My Score (Chorister Self-Service Tab)**:
   - Enter phone number or name to see instant attendance %.
   - Visual status badge:
     - 🟢 **ON TRACK FOR CONCERT STAGE** (≥70%)
     - 🟡 **BORDERLINE** (50% – 69%)
     - 🔴 **AT RISK** (<50%)
   - Full history of attended and upcoming rehearsals.
   - 1-click button to open the **Google Drive Rehearsal Videos**.

3. **Register Member (Interest Form Tab)**:
   - For members who haven't registered in the main registry yet.

4. **Admin Dashboard & Sync**:
   - Live breakdown of registrations by Voice Part and Zone.
   - Count of stage-qualified choristers.
   - **Export to CSV / Excel** for official reports.
   - **Import CSV** to batch upload existing member data.
   - **Google Sheets Live Sync** via Google Apps Script.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it with any local server:

```powershell
# Using Node / npx
npx.cmd serve ondo-choir-portal

# Or Python
python -m http.server 8080 --directory ondo-choir-portal
```

## 🌐 Deploying to Vercel (Free & Instant)

To get a public link to share on WhatsApp:
1. Run `npx.cmd vercel` inside this folder, or connect to Vercel / GitHub Pages.
2. Share the generated link on WhatsApp with all Area Music Leaders and Officers.
