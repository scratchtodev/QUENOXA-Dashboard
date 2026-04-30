import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Report Generation</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Generate project and student reports</p>
        </div>
        <button className="btn btn-primary">
          <FileText size={18} style={{ marginRight: '8px' }} />
          Create Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h3>Client Progress Report</h3>
          <p style={{ marginTop: '8px', color: 'var(--on-surface-variant)' }}>Automated PDF generation for client project status and payments.</p>
          <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
            <Download size={16} style={{ marginRight: '8px' }} /> Download Template
          </button>
        </div>
        
        <div className="card">
          <h3>Student Internship Report</h3>
          <p style={{ marginTop: '8px', color: 'var(--on-surface-variant)' }}>Final evaluation and task completion report for university submission.</p>
          <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
            <Download size={16} style={{ marginRight: '8px' }} /> Download Template
          </button>
        </div>
      </div>
    </div>
  );
}
