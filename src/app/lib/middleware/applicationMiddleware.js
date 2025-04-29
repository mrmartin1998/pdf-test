import { sendStatusEmail } from '../utils/emailService';

// Middleware to handle status changes and trigger notifications
export async function handleStatusChange(application) {
  try {
    // Send email notification based on new status
    await sendStatusEmail(application);
    
    // Log the status change
    console.log(`Application status changed to ${application.estado} for ${application.fullName}`);
    
    return true;
  } catch (error) {
    console.error('Error in status change middleware:', error);
    return false;
  }
}

// Pre-save middleware function for the Application model
export function createPreSaveMiddleware() {
  return async function(next) {
    // Only proceed if the status (estado) has been modified
    if (this.isModified('estado')) {
      await handleStatusChange(this);
    }
    next();
  };
} 