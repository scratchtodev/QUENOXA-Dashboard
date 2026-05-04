import React, { useState } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientProjects() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for Phase 1
  const projects = [
    { id: 'PRJ-001', title: 'AI Model Development', domain: 'Data Science', type: 'External', status: 'Active', progress: 75, startDate: '2026-01-10', endDate: '2026-06-30' },
    { id: 'PRJ-002', title: 'Data Infrastructure Setup', domain: 'Cloud Engineering', type: 'External', status: 'Active', progress: 30, startDate: '2026-03-01', endDate: '2026-08-15' },
    { id: 'PRJ-003', title: 'Initial Consultation', domain: 'Strategy', type: 'External', status: 'Completed', progress: 100, startDate: '2025-11-01', endDate: '2025-12-15' },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>My Projects</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Track the progress and status of your active projects.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--outline-variant)',
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)'
            }}
          />
        </div>
        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Title</th>
              <th>Domain</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Timeline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} onClick={() => console.log('Navigate to project details')}>
                <td className="mono" style={{ color: 'var(--primary)' }}>{project.id}</td>
                <td style={{ fontWeight: '500' }}>{project.title}</td>
                <td>{project.domain}</td>
                <td>
                  <span className={`badge ${project.status === 'Active' ? 'success' : project.status === 'Completed' ? '' : 'pending'}`} style={project.status === 'Completed' ? { backgroundColor: '#dbeafe', color: '#1e40af' } : {}}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '60px', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '6px' }}>
                      <div style={{ width: `${project.progress}%`, backgroundColor: project.progress === 100 ? '#1e40af' : 'var(--primary)', height: '100%', borderRadius: '999px' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{project.progress}%</span>
                  </div>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                  {project.startDate} - {project.endDate}
                </td>
                <td style={{ textAlign: 'right', color: 'var(--outline)' }}>
                  <ChevronRight size={18} />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
