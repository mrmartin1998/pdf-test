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
  },

  // Audit fields
  lastModified: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Middleware to format fullName (capitalize each word)
ApplicationSchema.pre('save', function(next) {
  if (this.isModified('fullName')) {
    this.fullName = this.fullName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  next();
});

// Middleware to validate dates
ApplicationSchema.pre('save', function(next) {
  const now = new Date();

  // Validate birth date (must be in the past)
  if (this.birthDate > now) {
    next(new Error('Birth date cannot be in the future'));
    return;
  }

  // Validate passport dates
  if (this.passportIssueDate > now) {
    next(new Error('Passport issue date cannot be in the future'));
    return;
  }

  if (this.passportExpiryDate <= now) {
    next(new Error('Passport has expired'));
    return;
  }

  if (this.passportIssueDate >= this.passportExpiryDate) {
    next(new Error('Passport issue date must be before expiry date'));
    return;
  }

  // Update lastModified
  this.lastModified = now;

  next();
});

// Middleware to format email to lowercase
ApplicationSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Virtual for age calculation
ApplicationSchema.virtual('age').get(function() {
  return Math.floor((new Date() - this.birthDate) / (365.25 * 24 * 60 * 60 * 1000));
});

// Virtual for passport validity
ApplicationSchema.virtual('isPassportValid').get(function() {
  return new Date() < this.passportExpiryDate;
});

// Prevent duplicate model initialization
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

export default Application; 