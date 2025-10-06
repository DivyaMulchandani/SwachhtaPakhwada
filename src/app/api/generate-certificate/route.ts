import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    // Load the certificate template image
    const templatePath = path.join(process.cwd(), 'src/app/api/generate-certificate/certi.jpg');
    const templateImage = await loadImage(templatePath);
    
    // Create canvas to modify the image
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the template image
    ctx.drawImage(templateImage, 0, 0);
    
    // Set up text rendering properties
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Try to use a web-safe font that's likely to support various characters
    ctx.font = 'bold 60px Arial, "Noto Sans", sans-serif';
    ctx.fillStyle = '#000080'; // Navy blue color
    
    // Calculate position for the name (centered on the line)
    const nameX = canvas.width / 2;
    const nameY = canvas.height * 0.57;
    
    // Add a subtle shadow for better visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    // Draw the name
    ctx.fillText(name.toUpperCase(), nameX, nameY);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    
    // Convert canvas to image buffer
    const imageBuffer = canvas.toBuffer('image/png');
    
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // Landscape A4 size
    
    // Embed the modified image
    const image = await pdfDoc.embedPng(imageBuffer);
    
    // Draw the image on the PDF page
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: 842,
      height: 595,
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Swachhata-Certificate-${name.replace(/\s+/g, '-')}.pdf"`,
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
