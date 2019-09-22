import PDFDocument from 'pdfkit';

export function createDoc(writeStream) {
    const doc = new PDFDocument;
    doc.pipe(writeStream);
    return doc;
}

export function addText(doc, text, x, y) {
    doc.fontSize(15)
        .text(text, x, y);
}

export function addImage(doc, path, fit) {
    doc.image(path, {
        fit: fit,
        align: 'center',
        valign: 'center'
    });
}

var doTransform = function (x, y, angle) {
    var rads = angle / 180 * Math.PI;
    var newX = x * Math.cos(rads) + y * Math.sin(rads);
    var newY = y * Math.cos(rads) - x * Math.sin(rads);

    return {
        x: newX,
        y: newY,
        rads: rads,
        angle: angle
    };
};

export function drawImageWithRotation(doc, image, x, y, rotation) {
    doc.save();
        var loc = doTransform(x, y, rotation);
        doc.rotate(rotation, x, y);
        doc.image(image, loc.y, loc.x);
        console.log("New Location: ", loc)
        doc.restore();
};

export function calculateCenterX(doc, objWidth) {
    return (doc.page.width - objWidth - doc.page.margins.left - doc.page.margins.right)/2;
}