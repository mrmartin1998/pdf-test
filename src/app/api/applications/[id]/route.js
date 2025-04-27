import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Application from '@/app/lib/models/Application';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const data = await request.json();
    
    const application = await Application.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ 
        error: 'Application not found' 
      }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ 
      error: 'Failed to update application' 
    }, { status: 500 });
  }
} 