import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  birthPlace: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // Family Information
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },

  // Passport Information
  passportNumber: { type: String, required: true },
  passportIssueDate: { type: Date, required: true },
  passportExpiryDate: { type: Date, required: true },
  passportIssuingCountry: { type: String, required: true },

  // Travel Information
  previousUSTravel: { type: String, enum: ['yes', 'no'], required: true },
  usAddress: { type: String, required: true },

  // Employment Information
  employment: {
    company: { type: String, required: true },
    position: { type: String, required: true },
    address: { type: String, required: true }
  },

  // Additional Information
  criminalRecord: { type: String, enum: ['yes', 'no'], required: true },
  termsAccepted: { type: Boolean, required: true },

  // Application Status
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },

  // Metadata
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  
  // PDF Generation Status
  pdfGenerado: {
    type: Boolean,
    default: false
  },
  fechaGeneracionPDF: {
    type: Date,
    default: null
  }
});

// Prevent duplicate model initialization
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

export default Application; 