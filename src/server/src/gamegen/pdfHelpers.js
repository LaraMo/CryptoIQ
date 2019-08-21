import PDFDocument from 'pdfkit';

export function createDoc(writeStream) {
    const doc = new PDFDocument;
    doc.pipe(writeStream);
    return doc;
}

export function addText(doc, text, x, y) {
    doc.fontSize(15)
        .text(text , x, y);
}

export function addImage(doc, path, fit) {
    doc.image(path, {
        fit: fit,
        align: 'center',
        valign: 'center'
    });    
}