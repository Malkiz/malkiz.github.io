const sheetName = 'Form Responses 1'; // This is the default sheet name

function doGet(e) {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName(sheetName);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(h => h.toLowerCase().replace(/ /g, '_')); // remove headers
  
  const postUrl = e.parameter.post;
  
  const data = rows.map(row => {
    let record = {};
    headers.forEach((header, i) => {
      record[header] = row[i];
    });
    return record;
  });

  let finalData = data;

  if (postUrl) {
    const filteredData = data.filter(record => record.post === postUrl);
    finalData = filteredData;
  }

  return ContentService.createTextOutput(JSON.stringify({ "data": finalData }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName(sheetName);
  const row = e.postData.contents.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[decodeURIComponent(key.replace(/\+/g, ' '))] = decodeURIComponent(value.replace(/\+/g, ' '));
    return acc;
  }, {});
  sheet.appendRow([
    new Date(), // Timestamp
    row.name,
    row.comment,
    row.post,
  ]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
