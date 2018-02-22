const fs = require('fs');

const PDFDocument = require('pdfkit');

var schedule = JSON.parse(fs.readFileSync('contents/wanneer.json'));

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('templates/resources/pdf/schedule.pdf'));

const font = 'Times-Bold';
const font_size = 8;

doc.font(font);
doc.fontSize(font_size);

const cell_width = 95;
const header_height = 10;
const cell_height = 38;
const padding_width = 5;
const padding_height = 3;

["Tijd", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"]
    .forEach(function(header, index){
        var x = padding_width + index * (cell_width + padding_width);
        var y = padding_height;
        doc.rect(x, y, cell_width, header_height).fillAndStroke('#990000', '#990000');
        var text_y = y + header_height/2 - font_size/3;
        doc.fillColor('white').font('Times-Bold').fontSize(font_size).text(header, x, text_y, { align: 'center', width: cell_width });
    });

const timetable = schedule.timetable;
timetable
    .forEach(function(row, row_index){
        var y = 2*padding_height + header_height + row_index * (padding_height + cell_height);
        var x = padding_width;
        doc.rect(x, y, cell_width, cell_height).stroke('#990000');
        var text_y = y + cell_height/2 - font_size/3;
        var time_text = row.time.start + "-" + row.time.end;
        doc.fillColor('black').font('Times-Roman').fontSize(font_size).text(time_text, x, text_y, { align: 'center', width: cell_width });
        ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(function(day, column_index){
            var x = padding_width + (column_index + 1) * (padding_width + cell_width);
            doc.rect(x, y, cell_width, cell_height);
            var data = row.columns[day];
            if (data.hasOwnProperty('class')) {
                var text_y = y + font_size/2;
                doc.font('Times-Bold').fontSize(font_size).text(data.class + " (" + data.teacher + ")", x, text_y, { align: 'center', width: cell_width });
                doc.moveDown(0.25).font('Times-Roman').fontSize(font_size).text(data.description, { align: 'center', width: cell_width });
                (data.notes || []).forEach(function(note){
                    doc.font('Times-Roman').fontSize(6*font_size/8).moveDown(0.10).text(note.text, { align: 'center', width: cell_width });
                });
            }
        });
    });

doc.end();
