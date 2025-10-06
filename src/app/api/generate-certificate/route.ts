import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';

// Set up canvas configuration
const fontPath = path.join(process.cwd(), 'src/app/api/generate-certificate/fonts');
try {
  if (!fs.existsSync(fontPath)) {
    fs.mkdirSync(fontPath, { recursive: true });
  }
  process.env.FONTCONFIG_PATH = fontPath;
} catch (error) {
  console.error('Font directory setup error:', error);
}

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
    
    // Enhanced text rendering setup
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Use a simple font configuration
    ctx.font = 'bold 65px sans-serif';
    
    // Set up colors for better visibility
    ctx.fillStyle = '#000080';  // Navy blue
    
    // Calculate text metrics to ensure proper positioning
    const text = name.toUpperCase();
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    
    // Calculate position for the text
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.52; // Positioned at 52% from top
    
    // Draw with white border for better visibility
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText(text, centerX, centerY);
    
    // Draw main text
    ctx.fillText(text, centerX, centerY);
    
    console.log('Text rendering details:', {
      text,
      width: textWidth,
      position: { x: centerX, y: centerY },
      fontHeight: parseInt(ctx.font),
      canvasSize: { width: canvas.width, height: canvas.height }
    });
    
    // Calculate position for the name
    const nameX = canvas.width / 2;
    const nameY = canvas.height * 0.56;
    
    // Enhanced text rendering setup
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Use a simple font configuration
    ctx.font = 'bold 65px sans-serif';
    
    // Set up colors for better visibility
    ctx.fillStyle = '#000080';  // Navy blue
    
    // Calculate text metrics to ensure proper positioning
    const upperName = name.toUpperCase();
    const upperNameMetrics = ctx.measureText(upperName);
    const upperNameTextWidth = upperNameMetrics.width;
    
    // Calculate position
    const centerX2 = canvas.width / 2;
    const centerY2 = canvas.height * 0.52; // Positioned at 52% from top
    
    // Draw with white border for better visibility
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText(upperName, centerX2, centerY2);
    
    // Draw main text
    ctx.fillText(upperName, centerX2, centerY2);
    
    console.log('Text rendering details:', {
      text: upperName,
      width: upperNameTextWidth,
      position: { x: centerX2, y: centerY2 },
      fontHeight: parseInt(ctx.font),
      canvasSize: { width: canvas.width, height: canvas.height }
    });
    
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
