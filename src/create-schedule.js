const fs = require('fs');

const PDFDocument = require('pdfkit');

var schedule = JSON.parse(fs.readFileSync('contents/wanneer.json'));

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('templates/resources/pdf/schedule.pdf'));

const font = 'Times-Roman';
const font_size = 8;

doc.font(font);
doc.fontSize(font_size);

const cell_width = 50;
const header_height = 10;
const cell_height = 30;
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

const timetable = schedule.timetable;
timetable
    .forEach(function(row, row_index){
        var y = 2*padding_height + header_height + row_index * (padding_height + cell_height);
        var x = padding_width;
        doc.rect(x, y, cell_width, cell_height);
        var text_y = y + cell_height/2 - font_size/3;
        var time_text = row.time.start + "-" + row.time.end;
        doc.text(time_text, x, text_y, { align: 'center', width: cell_width });
        ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(function(day, column_index){
            var x = padding_width + (column_index + 1) * (padding_width + cell_width);
            doc.rect(x, y, cell_width, cell_height);
        });
    });

doc.rect(0, 0,
         6 * (padding_width + cell_width) + padding_width,
         timetable.length * (padding_height + cell_height) + 2*padding_height + header_height);
doc.stroke();

doc.end();
