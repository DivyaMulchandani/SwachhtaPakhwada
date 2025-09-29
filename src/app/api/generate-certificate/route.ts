import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, course, score, totalQuestions, batch, school } = body;

    // Load the certificate template image
    const templatePath = path.join(process.cwd(), 'src/app/api/generate-certificate/certi.jpg');
    const templateImage = await loadImage(templatePath);
    
    // Create canvas to modify the image
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the template image
    ctx.drawImage(templateImage, 0, 0);
    
    // Set up calligraphy-style font for the name
    ctx.font = 'italic 72px "Brush Script MT", "Lucida Handwriting", cursive';
    ctx.fillStyle = '#2c2c2c'; // Dark grey color
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calculate position for the name (centered on the line)
    const nameX = canvas.width / 2;
    const nameY = canvas.height * 0.57; // Adjust this value to position on the line
    
    // Draw the name with calligraphy style
    ctx.fillText(name, nameX, nameY);
    
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
    return new NextResponse(pdfBytes, {
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
