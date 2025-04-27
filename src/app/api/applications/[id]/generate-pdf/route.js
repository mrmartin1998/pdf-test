import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Application from '@/app/lib/models/Application';
import { generatePDF } from '@/app/utils/pdfGenerator';

export async function POST(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const application = await Application.findById(id);

    if (!application) {
      return NextResponse.json({ 
        error: 'Application not found' 
      }, { status: 404 });
    }

    // Generate PDF
    const pdfBytes = await generatePDF(application);

    // Update application status
    application.pdfGenerado = true;
    application.fechaGeneracionPDF = new Date();
    await application.save();

    // Return PDF as blob
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ESTA_Application_${id}.pdf"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF' 
    }, { status: 500 });
  }
} 