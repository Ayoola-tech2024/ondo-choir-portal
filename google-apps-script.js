/**
 * ONDO AREA MUSIC COMMITTEE — 2026 CONCERT ATTENDANCE SYNC SCRIPT
 * Master Spreadsheet ID: 1ifZRqfU435qg0AONB8o30lgohpUKp-RB-3hoECOx15g
 * Web App URL: https://script.google.com/macros/s/AKfycbxu0uyzA6wbWlClg-zx5M7NkMRfwN4ngDMvEl4Pr1DCsdrVPH77NrJ8nGcUv9NzYzFOlg/exec
 */

var SPREADSHEET_ID = "1ifZRqfU435qg0AONB8o30lgohpUKp-RB-3hoECOx15g";

function getTargetSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doPost(e) {
  try {
    var sheetApp = getTargetSpreadsheet();
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
