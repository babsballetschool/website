const fs = require('fs');

const PDFDocument = require('pdfkit');

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('templates/resources/pdf/schedule.pdf'));

doc
    .moveTo(0,0)
    .lineTo(100, 100)
    .stroke();

doc.end();
