import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function StudentDocuments() {
  const [uploading, setUploading] = useState(null);

  // Mock data for Phase 2
  const documents = [
    { id: 'resume', name: 'Resume', fileName: 'JohnDoe_Resume.pdf', status: 'Uploaded', uploadDate: '10/01/2026', url: '#' },
    { id: 'idProof', name: 'ID Proof', fileName: null, status: 'Missing', uploadDate: null, url: null },
    { id: 'offerLetter', name: 'Offer Letter', fileName: 'OfferLetter_INT1042.pdf', status: 'Pending Review', uploadDate: '11/01/2026', url: '#' },
    { id: 'certificate', name: 'Completion Certificate', fileName: null, status: 'Missing', uploadDate: null, url: null },
  ];

  const handleUpload = (docId) => {
    // Mock upload action
    setUploading(docId);
    setTimeout(() => {
      setUploading(null);
      alert('Document uploaded successfully!');
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Uploaded': return <span className="badge success"><CheckCircle size={12} style={{ marginRight: '4px' }}/> {status}</span>;
      case 'Missing': return <span className="badge error"><AlertCircle size={12} style={{ marginRight: '4px' }}/> {status}</span>;
      case 'Pending Review': return <span className="badge pending"><Clock size={12} style={{ marginRight: '4px' }}/> {status}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Documents</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Manage your required documents. You can upload or download files here.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {documents.map((doc) => (
          <div key={doc.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                backgroundColor: doc.status === 'Missing' ? 'var(--error-container)' : 'var(--primary-container)', 
                color: doc.status === 'Missing' ? 'var(--on-error-container)' : 'var(--on-primary-container)',
                borderRadius: '12px' 
              }}>
                <FileText size={24} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0' }}>{doc.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                  {getStatusBadge(doc.status)}
                  {doc.uploadDate && <span>Uploaded on {doc.uploadDate}</span>}
                  {doc.fileName && <span className="mono" style={{ color: 'var(--outline)' }}>{doc.fileName}</span>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleUpload(doc.id)}
                disabled={uploading === doc.id}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Upload size={16} /> {uploading === doc.id ? 'Uploading...' : 'Upload'}
              </button>
              {doc.url && (
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={16} /> Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
