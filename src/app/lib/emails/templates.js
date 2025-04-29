// Email templates for different application statuses
const emailTemplates = {
  // Template for new applications (status: pendiente)
  newApplication: {
    subject: "ESTA Application Received",
    body: (application) => `
Dear ${application.fullName},

We have received your ESTA application and it is currently under review.

Application Details:
- Reference Number: ${application._id}
- Passport Number: ${application.passportNumber}
- Nationality: ${application.nationality}

We will notify you once the review is complete.

Best regards,
ESTA Processing Team
    `
  },

  // Template for approved applications (status: aprobado)
  aprobado: {
    subject: "Your ESTA Application Has Been Approved",
    body: (application) => `
Dear ${application.fullName},

Great news! Your ESTA application has been approved.

Application Details:
- Reference Number: ${application._id}
- Passport Number: ${application.passportNumber}
- Nationality: ${application.nationality}

Your PDF document is attached to this email.

Best regards,
ESTA Processing Team
    `
  },

  // Template for rejected applications (status: rechazado)
  rechazado: {
    subject: "Update on Your ESTA Application",
    body: (application) => `
Dear ${application.fullName},

We have reviewed your ESTA application and unfortunately, we cannot approve it at this time.

Application Details:
- Reference Number: ${application._id}
- Passport Number: ${application.passportNumber}
- Nationality: ${application.nationality}

Please contact our support team for more information.

Best regards,
ESTA Processing Team
    `
  },

  // Template for pending applications (status: pendiente)
  pendiente: {
    subject: "ESTA Application Under Review",
    body: (application) => `
Dear ${application.fullName},

Your ESTA application is currently under review.

Application Details:
- Reference Number: ${application._id}
- Passport Number: ${application.passportNumber}
- Nationality: ${application.nationality}

We will notify you once the review is complete.

Best regards,
ESTA Processing Team
    `
  }
};

export default emailTemplates; 