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
    
    // Use basic sans-serif font
    ctx.font = 'bold 50px sans-serif';
    ctx.fillStyle = '#000000'; // Navy blue color
    
    // Calculate position for the name
    const nameX = canvas.width / 2;
    const nameY = canvas.height * 0.56;
    
    // Create text with outline for better visibility
    const text = name.toUpperCase();
    
    // Draw white outline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.strokeText(text, nameX, nameY);
    
    // Draw text
    ctx.fillText(text, nameX, nameY);
    
    // Log for debugging
    console.log('Drawing text:', {
      text,
      position: { x: nameX, y: nameY },
      canvasSize: { width: canvas.width, height: canvas.height }
    });
    
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
