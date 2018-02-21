const fs = require('fs');

const PDFDocument = require('pdfkit');

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('templates/resources/pdf/schedule.pdf'));

const font = 'Times-Roman';
const font_size = 8;

doc.font(font);
doc.fontSize(font_size);

const cell_width = 50;
const header_height = 10;
const padding_width = 5;
const padding_height = 3;

["Tijd", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"]
    .forEach(function(header, index){
        var x = padding_width + index * (cell_width + padding_width);
        var y = padding_height;
        doc.rect(x, y, cell_width, header_height);
        var text_y = y + header_height/2 - font_size/3;
        doc.text(header, x, text_y, { align: 'center', width: cell_width });
    });

doc.stroke();

doc.end();
