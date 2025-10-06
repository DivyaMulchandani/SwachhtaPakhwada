import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

// Configure canvas for better text rendering
process.env.FONTCONFIG_PATH = '/var/tmp';

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
    
    // Try multiple font configurations
    const fonts = [
      'bold 50px sans-serif',
      'bold 50px Arial',
      'bold 50px system-ui',
      '50px sans-serif' // Fallback without bold
    ];
    
    // Try each font until one works
    let fontWorked = false;
    for (const font of fonts) {
      try {
        ctx.font = font;
        // Test if font works by measuring text
        ctx.measureText(name);
        fontWorked = true;
        console.log('Successfully set font:', font);
        break;
      } catch (error) {
        console.log('Font failed:', font, error instanceof Error ? error.message : 'Unknown error');
        continue;
      }
    }
    
    if (!fontWorked) {
      console.log('Warning: All fonts failed, using default');
      ctx.font = '50px sans-serif';
    }
    
    ctx.fillStyle = '#000000'; // Black color for maximum contrast
    
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
