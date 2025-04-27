'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DocumentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    fatherName: '',
    motherName: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuingCountry: '',
    previousUSTravel: 'no',
    usAddress: '',
    employment: {
      company: '',
      position: '',
      address: ''
    },
    criminalRecord: 'no',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('employment.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        employment: {
          ...prev.employment,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const data = await response.json();
      
      // Show success message and redirect
      alert('Application submitted successfully! Our team will review your application.');
      router.push('/submission-success'); // You'll need to create this page
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">ESTA Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name (as in passport)</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Date of Birth</span>
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">City and Country of Birth</span>
              </label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nationality</span>
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Residential Address</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered h-20"
              required
            />
          </div>

          {/* Parent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Father's Name</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mother's Name</span>
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* Passport Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Passport Number</span>
              </label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Issuing Country</span>
              </label>
              <input
                type="text"
                name="passportIssuingCountry"
                value={formData.passportIssuingCountry}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Issue Date</span>
              </label>
              <input
                type="date"
                name="passportIssueDate"
                value={formData.passportIssueDate}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Expiry Date</span>
              </label>
              <input
                type="date"
                name="passportExpiryDate"
                value={formData.passportExpiryDate}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* Travel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Previous US Travel?</span>
              </label>
              <select
                name="previousUSTravel"
                value={formData.previousUSTravel}
                onChange={handleChange}
                className="select select-bordered"
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">US Address (Hotel/Contact)</span>
              </label>
              <textarea
                name="usAddress"
                value={formData.usAddress}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                required
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Company Name</span>
              </label>
              <input
                type="text"
                name="employment.company"
                value={formData.employment.company}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Position</span>
              </label>
              <input
                type="text"
                name="employment.position"
                value={formData.employment.position}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Company Address</span>
              </label>
              <textarea
                name="employment.address"
                value={formData.employment.address}
                onChange={handleChange}
                className="textarea textarea-bordered h-20"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Criminal Record or Immigration Issues?</span>
            </label>
            <select
              name="criminalRecord"
              value={formData.criminalRecord}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Terms and Conditions */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                required
              />
              <span className="label-text">
                I accept the terms and conditions and confirm that all information provided is accurate
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full mt-6 ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit ESTA Application'}
          </button>
        </form>
      </div>
    </div>
  );
} 