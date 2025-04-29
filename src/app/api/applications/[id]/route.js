import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Application from '@/app/lib/models/Application';
import { sendStatusEmail } from '@/app/lib/emailService';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const data = await request.json();
    
    // Get the current application to check if status is changing
    const currentApplication = await Application.findById(id);
    if (!currentApplication) {
      return NextResponse.json({ 
        error: 'Application not found' 
      }, { status: 404 });
    }

    // Update the application
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    // If status changed, send email notification
    if (data.estado && data.estado !== currentApplication.estado) {
      try {
        await sendStatusEmail(updatedApplication);
        console.log(`Status email sent for application ${id}`);
      } catch (emailError) {
        console.error('Error sending status email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ 
      error: 'Failed to update application' 
    }, { status: 500 });
  }
} 