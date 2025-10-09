import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    // Read the certificate background image from the repo
    const templatePath = path.join(process.cwd(), 'src/app/api/generate-certificate/certi.jpg');
    const templateBytes = fs.readFileSync(templatePath);

    // Create a new PDF document and embed the JPEG
    const pdfDoc = await PDFDocument.create();
    const jpgImage = await pdfDoc.embedJpg(templateBytes);

    const pageWidth = jpgImage.width;
    const pageHeight = jpgImage.height;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Draw the background image to fill the page
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });

    // Use a standard font for maximum compatibility
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Prepare the name text and sizing
    const text = name ? String(name).toUpperCase() : '';
    // Scale font size based on page width for responsiveness
    const fontSize = Math.max(26, Math.floor(pageWidth * 0.03));
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    // Calculate centered position (slightly below center vertically)
    const x = (pageWidth - textWidth) / 2;
    const y = pageHeight * 0.42;

    // Draw a white shadow/border by drawing the same text slightly offset in white
    page.drawText(text, {
      x: x + 2,
      y: y - 2,
      size: fontSize + 2,
      font,
      color: rgb(1, 1, 1),
    });

    // Draw the main text in navy color
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.0, 0.2, 0.6),
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificate-${text.replace(/\s+/g, '-') || 'recipient'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
