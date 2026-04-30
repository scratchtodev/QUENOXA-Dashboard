import React, { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'Ongoing', deadline: '2026-05-15' },
    { id: '2', name: 'Mobile App', client: 'Initech', status: 'Pending', deadline: '2026-06-01' },
  ]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Projects</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Track client project progress</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} style={{ marginRight: '8px' }} />
          New Project
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Deadline</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td className="mono">PRJ-00{project.id}</td>
                <td style={{ fontWeight: 500 }}>{project.name}</td>
                <td>{project.client}</td>
                <td><span className={`badge ${project.status === 'Ongoing' ? 'success' : 'pending'}`}>{project.status}</span></td>
                <td className="mono">{project.deadline}</td>
                <td style={{ textAlign: 'right' }}><MoreVertical size={16} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
