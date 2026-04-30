import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, X } from 'lucide-react';
import { fetchProjects, createProject } from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Pending', deadline: '' });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      setIsModalOpen(false);
      setFormData({ name: '', description: '', status: 'Pending', deadline: '' });
      loadProjects();
    } catch (error) {
      console.error("Failed to save project", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Projects</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Track client project progress</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
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
              <th>Description</th>
              <th>Status</th>
              <th>Deadline</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id || index}>
                <td className="mono">PRJ-{(project.id || index).toString().padStart(3, '0')}</td>
                <td style={{ fontWeight: 500 }}>{project.name}</td>
                <td>{project.description || 'N/A'}</td>
                <td><span className={`badge ${(project.status || 'Pending').toLowerCase() === 'ongoing' ? 'success' : 'pending'}`}>{project.status || 'Pending'}</span></td>
                <td className="mono">{project.deadline || 'N/A'}</td>
                <td style={{ textAlign: 'right' }}><MoreVertical size={16} color="var(--outline)" /></td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Add New Project</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--on-surface-variant)" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Project Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" required value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
