import nodemailer from 'nodemailer';

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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