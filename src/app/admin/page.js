'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      // Refresh the applications list
      fetchApplications();
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating status');
    }
  };

  const generatePDF = async (id) => {
    try {
      const response = await fetch(`/api/applications/${id}/generate-pdf`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to generate PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ESTA_Application_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Update the application list to reflect PDF generation
      fetchApplications();
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating PDF');
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ESTA Applications Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>PDF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.fullName}</td>
                <td>{app.email}</td>
                <td>{new Date(app.fechaCreacion).toLocaleDateString()}</td>
                <td>
                  <select
                    value={app.estado}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </td>
                <td>
                  {app.pdfGenerado ? (
                    <span className="text-green-600">Generated</span>
                  ) : (
                    <span className="text-yellow-600">Not Generated</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => generatePDF(app._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Generate PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 