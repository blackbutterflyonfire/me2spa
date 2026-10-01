export interface DriveSheetFile {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export interface WhatsAppSheetEnquiry {
  rowIndex: number;
  timestamp: string;
  customerPhone: string;
  customerName: string;
  enquiryType: string;
  content: string;
  threadStatus: 'Thread Opened' | 'Replied on WhatsApp' | 'Booking Confirmed' | 'Completed' | 'Pending Review';
  source: string;
}

const LOCAL_STORAGE_KEY = 'spavibe_whatsapp_enquiries_log';
const SYNCED_IDS_KEY = 'spavibe_synced_enquiry_timestamps';

/**
 * Lists Google Sheets from the user's Google Drive.
 */
export async function listGoogleSheets(token: string): Promise<DriveSheetFile[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,createdTime,modifiedTime)&pageSize=50&orderBy=modifiedTime desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list Google Sheets: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Fetches basic spreadsheet metadata.
 */
export async function getSpreadsheet(token: string, spreadsheetId: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch spreadsheet details: ${res.status} ${errorText}`);
  }

  return await res.json();
}

/**
 * Creates a dedicated SPAVIBE WhatsApp Customer Enquiries Google Sheet with pre-formatted headers.
 */
export async function createWhatsAppEnquiriesSheet(
  token: string,
  title: string = 'SPAVIBE - WhatsApp Customer Enquiries Tracker'
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; sheetName: string }> {
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const sheetName = 'WhatsApp Enquiries';

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: sheetName,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${createRes.status} ${errorText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Initialize header row
  const headerValues = [
    [
      'Timestamp (IST)',
      'Customer Phone',
      'Customer Name',
      'Enquiry Type',
      'Content Shared via WhatsApp Floating Button',
      'Thread Status',
      'Source / Lead Origin',
    ],
  ];

  const updateHeaderUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${encodeURIComponent(
    sheetName
  )}'!A1:G1?valueInputOption=USER_ENTERED`;

  await fetch(updateHeaderUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: headerValues,
    }),
  });

  return {
    spreadsheetId,
    spreadsheetUrl,
    sheetName,
  };
}

/**
 * Appends a customer WhatsApp enquiry row to the Google Sheet.
 */
export async function appendWhatsAppEnquiryToSheet(
  token: string,
  spreadsheetId: string,
  enquiry: {
    timestamp: string;
    phone: string;
    name?: string;
    enquiryType: string;
    content: string;
    status?: string;
    source?: string;
  },
  sheetName: string = 'WhatsApp Enquiries'
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${encodeURIComponent(
    sheetName
  )}'!A:G:append?valueInputOption=USER_ENTERED`;

  const values = [
    [
      enquiry.timestamp,
      enquiry.phone,
      enquiry.name || 'WhatsApp Guest',
      enquiry.enquiryType,
      enquiry.content,
      enquiry.status || 'Thread Opened',
      enquiry.source || 'WhatsApp Floating Button',
    ],
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to append enquiry to Google Sheet: ${res.status} ${errorText}`);
  }

  return await res.json();
}

/**
 * Reads all WhatsApp enquiries from the Google Sheet.
 */
export async function readWhatsAppEnquiriesFromSheet(
  token: string,
  spreadsheetId: string,
  preferredSheetName?: string
): Promise<{ sheetName: string; enquiries: WhatsAppSheetEnquiry[] }> {
  // First discover actual sheet tab name if not guaranteed
  let targetSheetName = preferredSheetName || 'WhatsApp Enquiries';
  try {
    const meta = await getSpreadsheet(token, spreadsheetId);
    const firstSheet = meta.sheets?.[0]?.properties?.title;
    if (firstSheet) {
      targetSheetName = firstSheet;
    }
  } catch (err) {
    console.warn('Could not inspect spreadsheet tabs, using default:', err);
  }

  const range = `'${encodeURIComponent(targetSheetName)}'!A1:G1000`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to read Google Sheet: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  if (rows.length <= 1) {
    return { sheetName: targetSheetName, enquiries: [] };
  }

  // Skip header row (index 0)
  const enquiries: WhatsAppSheetEnquiry[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0 || (!row[0] && !row[1] && !row[4])) continue;

    enquiries.push({
      rowIndex: i + 1, // 1-based index in Google Sheets
      timestamp: row[0] || 'Unknown Date',
      customerPhone: row[1] || 'Not specified',
      customerName: row[2] || 'Guest',
      enquiryType: row[3] || 'General Enquiry',
      content: row[4] || '',
      threadStatus: (row[5] as any) || 'Thread Opened',
      source: row[6] || 'WhatsApp Floating Button',
    });
  }

  // Newest entries first
  enquiries.reverse();

  return { sheetName: targetSheetName, enquiries };
}

/**
 * Updates the Thread Status in Google Sheets for a specific row.
 * Mandatory explicit user confirmation must precede this operation in the UI.
 */
export async function updateEnquiryStatusInSheet(
  token: string,
  spreadsheetId: string,
  rowIndex: number,
  newStatus: string,
  sheetName: string = 'WhatsApp Enquiries'
): Promise<void> {
  const cellRange = `'${encodeURIComponent(sheetName)}'!F${rowIndex}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${cellRange}?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [[newStatus]],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update thread status in Google Sheet: ${res.status} ${errorText}`);
  }
}

/**
 * Deletes a Google Sheet file from Google Drive.
 * Requires user confirmation beforehand.
 */
export async function deleteSheetFile(token: string, fileId: string): Promise<void> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete Google Sheet: ${res.status} ${errorText}`);
  }
}

// ==========================================
// Local storage helpers & offline sync queue
// ==========================================

export function saveLocalEnquiry(enquiry: {
  timestamp: string;
  phone: string;
  name?: string;
  enquiryType: string;
  content: string;
  threadStatus?: WhatsAppSheetEnquiry['threadStatus'];
  source?: string;
}) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: WhatsAppSheetEnquiry[] = raw ? JSON.parse(raw) : [];
    const newEnquiry: WhatsAppSheetEnquiry = {
      rowIndex: 0,
      timestamp: enquiry.timestamp,
      customerPhone: enquiry.phone,
      customerName: enquiry.name || 'Guest',
      enquiryType: enquiry.enquiryType,
      content: enquiry.content,
      threadStatus: enquiry.threadStatus || 'Thread Opened',
      source: enquiry.source || 'WhatsApp Floating Button',
    };
    list.unshift(newEnquiry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch (err) {
    console.error('Failed to save enquiry locally:', err);
  }
}

export function getLocalEnquiries(): WhatsAppSheetEnquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('me2spa_whatsapp_enquiries_log');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function getSyncedTimestamps(): Set<string> {
  try {
    const raw = localStorage.getItem(SYNCED_IDS_KEY) || localStorage.getItem('me2spa_synced_enquiry_timestamps');
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (err) {
    return new Set();
  }
}

export function markTimestampSynced(timestamp: string) {
  try {
    const set = getSyncedTimestamps();
    set.add(timestamp);
    localStorage.setItem(SYNCED_IDS_KEY, JSON.stringify(Array.from(set)));
  } catch (err) {
    console.error('Failed to mark synced:', err);
  }
}
