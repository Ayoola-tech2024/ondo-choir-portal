/**
 * ONDO AREA MUSIC COMMITTEE — 2026 CONCERT ATTENDANCE SYNC SCRIPT
 * 
 * Instructions:
 * 1. Open the Google Sheet linked to your Google Form.
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any default code and paste this entire file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 *    - Description: "Attendance Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click "Deploy", authorize access, and copy the Web App URL.
 * 7. In the portal (Admin & Sync tab), paste that Web App URL!
 */

function doPost(e) {
  try {
    var sheetApp = SpreadsheetApp.getActiveSpreadsheet();
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    
    // Ensure tabs exist
    var membersSheet = sheetApp.getSheetByName("Members");
    if (!membersSheet) {
      membersSheet = sheetApp.insertSheet("Members");
      membersSheet.appendRow(["Member ID", "Full Name", "Phone Number", "Voice Part", "Zone", "Station", "Gender", "Registered At"]);
    }
    
    var attendanceSheet = sheetApp.getSheetByName("Attendance_Logs");
    if (!attendanceSheet) {
      attendanceSheet = sheetApp.insertSheet("Attendance_Logs");
      attendanceSheet.appendRow(["Timestamp", "Session ID", "Member ID", "Status"]);
    }

    if (action === "register_member") {
      var m = contents.member;
      membersSheet.appendRow([
        m.id,
        m.name,
        m.phone,
        m.part,
        m.zone,
        m.station,
        m.gender || "",
        new Date().toISOString()
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Member saved" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "mark_attendance") {
      attendanceSheet.appendRow([
        contents.timestamp || new Date().toISOString(),
        contents.sessionId,
        contents.memberId,
        contents.status
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Attendance logged" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "unknown_action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Ondo Choir Attendance API is running.");
}
