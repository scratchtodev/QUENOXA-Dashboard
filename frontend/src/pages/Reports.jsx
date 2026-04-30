import React, { useState } from 'react';
import { FileText, Download, Loader } from 'lucide-react';
import { generateDocument } from '../api';

export default function Reports() {
  const [loadingType, setLoadingType] = useState(null);

  const handleGenerate = async (type) => {
    setLoadingType(type);
    try {
      const result = await generateDocument(type);
      alert(result.message + ' ' + result.url);
    } catch (error) {
      console.error(`Failed to generate ${type}`, error);
      alert(`Failed to generate ${type}`);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Report Generation</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Generate project and student reports</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleGenerate('report')} disabled={loadingType === 'report'}>
          {loadingType === 'report' ? <Loader size={18} className="spin" style={{ marginRight: '8px' }} /> : <FileText size={18} style={{ marginRight: '8px' }} />}
          Create Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h3>Client Progress Report</h3>
          <p style={{ marginTop: '8px', color: 'var(--on-surface-variant)' }}>Automated PDF generation for client project status and payments.</p>
          <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => handleGenerate('report')} disabled={loadingType === 'report'}>
            {loadingType === 'report' ? <Loader size={16} className="spin" style={{ marginRight: '8px' }} /> : <Download size={16} style={{ marginRight: '8px' }} />}
            Generate Report
          </button>
        </div>
        
        <div className="card">
          <h3>Student Internship Certificate</h3>
          <p style={{ marginTop: '8px', color: 'var(--on-surface-variant)' }}>Final evaluation and task completion certificate for university submission.</p>
          <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => handleGenerate('certificate')} disabled={loadingType === 'certificate'}>
            {loadingType === 'certificate' ? <Loader size={16} className="spin" style={{ marginRight: '8px' }} /> : <Download size={16} style={{ marginRight: '8px' }} />}
            Generate Certificate
          </button>
        </div>
      </div>
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
