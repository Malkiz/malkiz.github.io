const sheetName = 'Form Responses 1'; // This is the default sheet name
const EMAIL = 'YOUR_EMAIL'; // email to receive notifications

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

function sendEmailNotification(commentData) {
  const recipient = EMAIL;
  const subject = "New Comment on malkiz.github.io";
  
  const emailBody = `
    A new comment has been submitted on your blog post.

    Post URL: ${commentData.post}
    Name: ${commentData.name}
    Comment: ${commentData.comment}
    Timestamp: ${commentData.timestamp}
  `;

  // Send the email
  MailApp.sendEmail(recipient, subject, emailBody);
}

function doPost(e) {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName(sheetName);
  const row = e.postData.contents.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[decodeURIComponent(key.replace(/\+/g, ' '))] = decodeURIComponent(value.replace(/\+/g, ' '));
    return acc;
  }, {});
  const newComment = {
    name: row.name,
    comment: row.comment,
    post: row.post,
    timestamp: new Date()
  };
  sheet.appendRow([
    newComment.timestamp, 
    newComment.name,
    newComment.comment,
    newComment.post,
  ]);
  sendEmailNotification(newComment);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
