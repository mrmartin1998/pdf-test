import nodemailer from 'nodemailer';
import emailTemplates from './emails/templates';

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send PDF attachment email
export async function sendApplicationPDF(email, fullName, pdfBuffer) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your ESTA Application PDF',
      text: `Dear ${fullName},\n\nPlease find attached your ESTA application PDF.\n\nBest regards,\nESTA Application Team`,
      attachments: [
        {
          filename: `ESTA_Application_${fullName}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Send status update email
export async function sendStatusEmail(application) {
  try {
    const template = emailTemplates[application.estado];
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: application.email,
      subject: template.subject,
      text: template.body(application),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Status email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending status email:', error);
    return { success: false, error };
  }
}

// Send welcome email for new applications
export async function sendWelcomeEmail(application) {
  try {
    const template = emailTemplates.newApplication;
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: application.email,
      subject: template.subject,
      text: template.body(application),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
} 