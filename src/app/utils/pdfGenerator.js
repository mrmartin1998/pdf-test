import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generatePDF(formData) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();
  
  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Add a new page (A4 size)
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  
  // Helper function to draw a section
  const drawSection = (title, y, items) => {
    // Draw section title
    page.drawText(title, {
      x: 50,
      y,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    
    // Draw underline
    page.drawLine({
      start: { x: 50, y: y - 5 },
      end: { x: width - 50, y: y - 5 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    
    // Draw items
    let currentY = y - 25;
    items.forEach(([label, value]) => {
      // Draw label
      page.drawText(label + ':', {
        x: 50,
        y: currentY,
        size: 10,
        font: helveticaBold,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      // Draw value
      const lines = value.toString().split('\\n');
      lines.forEach((line, index) => {
        page.drawText(line, {
          x: 200,
          y: currentY - (index * 12),
          size: 10,
          font: helvetica,
          color: rgb(0, 0, 0),
        });
      });
      
      currentY -= (20 + (lines.length - 1) * 12);
    });
    
    return currentY - 10; // Return the new Y position
  };
  
  // Draw header
  page.drawText('ESTA Application Form', {
    x: 50,
    y: height - 50,
    size: 24,
    font: helveticaBold,
    color: rgb(0, 0, 0.5),
  });
  
  // Draw application date
  page.drawText(`Application Date: ${new Date().toLocaleDateString()}`, {
    x: 50,
    y: height - 80,
    size: 10,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  
  // Draw sections
  let currentY = height - 120;
  
  // Personal Information
  currentY = drawSection('Personal Information', currentY, [
    ['Full Name', formData.fullName],
    ['Date of Birth', formData.birthDate],
    ['Place of Birth', formData.birthPlace],
    ['Nationality', formData.nationality],
    ['Email', formData.email],
    ['Phone', formData.phone],
    ['Address', formData.address],
  ]);
  
  // Family Information
  currentY = drawSection('Family Information', currentY, [
    ['Father\'s Name', formData.fatherName],
    ['Mother\'s Name', formData.motherName],
  ]);
  
  // Passport Information
  currentY = drawSection('Passport Information', currentY, [
    ['Passport Number', formData.passportNumber],
    ['Issuing Country', formData.passportIssuingCountry],
    ['Issue Date', formData.passportIssueDate],
    ['Expiry Date', formData.passportExpiryDate],
  ]);
  
  // Travel Information
  currentY = drawSection('Travel Information', currentY, [
    ['Previous US Travel', formData.previousUSTravel === 'yes' ? 'Yes' : 'No'],
    ['US Address', formData.usAddress],
  ]);
  
  // Employment Information
  currentY = drawSection('Employment Information', currentY, [
    ['Company', formData.employment.company],
    ['Position', formData.employment.position],
    ['Address', formData.employment.address],
  ]);
  
  // Additional Information
  currentY = drawSection('Additional Information', currentY, [
    ['Criminal Record/Immigration Issues', formData.criminalRecord === 'yes' ? 'Yes' : 'No'],
  ]);
  
  // Terms acceptance
  if (currentY > 100) { // Check if there's enough space
    currentY = drawSection('Declaration', currentY, [
      ['Terms Accepted', formData.termsAccepted ? 'Yes' : 'No'],
      ['Date', new Date().toLocaleDateString()],
    ]);
  } else {
    // Add new page if needed
    const newPage = pdfDoc.addPage([595.28, 841.89]);
    currentY = height - 50;
    currentY = drawSection('Declaration', currentY, [
      ['Terms Accepted', formData.termsAccepted ? 'Yes' : 'No'],
      ['Date', new Date().toLocaleDateString()],
    ]);
  }
  
  // Add footer
  page.drawText('This document is not an official ESTA application', {
    x: 50,
    y: 30,
    size: 8,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  // Save the PDF
  return await pdfDoc.save();
} 