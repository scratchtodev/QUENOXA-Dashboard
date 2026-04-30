import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X } from 'lucide-react';
import { fetchStudents, createStudent } from '../api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', university: '', major: '', status: 'Active' });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      setIsModalOpen(false);
      setFormData({ name: '', university: '', major: '', status: 'Active' });
      loadStudents(); // Refresh the table
    } catch (error) {
      console.error("Failed to save student:", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Student Internship Tracking</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage interns, tasks, and progress</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          Add Student
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>University</th>
              <th>Major</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td className="mono">STU-{(student.id || '').toString().padStart(3, '0')}</td>
                <td style={{ fontWeight: 500 }}>{student.name}</td>
                <td>{student.university || 'N/A'}</td>
                <td>{student.major || 'N/A'}</td>
                <td>
                  <span className={`badge ${(student.status || 'active').toLowerCase() === 'active' ? 'success' : 'pending'}`}>{student.status || 'Active'}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--outline)' }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No students found. Click "Add Student" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Add New Student</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--on-surface-variant)" />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Alice Walker" />
              </div>
              <div className="form-group">
                <label>University</label>
                <input required type="text" value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} placeholder="e.g. State University" />
              </div>
              <div className="form-group">
                <label>Major</label>
                <input required type="text" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} placeholder="e.g. Computer Science" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

