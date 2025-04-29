import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Application from '@/app/lib/models/Application';
import { sendStatusEmail } from '@/app/lib/emailService';

export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find({})
      .sort({ fechaCreacion: -1 }); // Sort by creation date, newest first
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch applications' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Create new application with default estado
    const application = new Application({
      ...data,
      estado: 'pendiente',
      pdfGenerado: false,
      fechaGeneracionPDF: null
    });

    await application.save();

    // Send initial status email
    try {
      await sendStatusEmail(application);
      console.log(`Initial status email sent for application ${application._id}`);
    } catch (emailError) {
      console.error('Error sending initial status email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      applicationId: application._id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json({ 
      error: 'Failed to submit application' 
    }, { status: 500 });
  }
}
