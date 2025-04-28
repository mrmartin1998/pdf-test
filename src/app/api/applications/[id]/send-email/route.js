import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Application from '@/app/lib/models/Application';
import { generatePDF } from '@/app/utils/pdfGenerator';
import { sendApplicationPDF } from '@/app/lib/emailService';

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

    // Send email with PDF
    await sendApplicationPDF(
      application.email,
      application.fullName,
      pdfBytes
    );

    return NextResponse.json({ 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      error: 'Failed to send email' 
    }, { status: 500 });
  }
} 