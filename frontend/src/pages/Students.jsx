import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X, Download } from 'lucide-react';
import { fetchStudents, createStudent, createPortalUser } from '../api';
import { useTranslation } from 'react-i18next';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';

export default function Students() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', university: '', major: '', status: 'Active', email: '', password: '', createAccount: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadStudents(); }, []);

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
    setSaving(true);
    try {
      if (formData.createAccount && formData.email && formData.password) {
        // Create auth user + linked student record in one call
        await createPortalUser({
          email: formData.email,
          password: formData.password,
          role: 'student',
          name: formData.name,
          extraData: { university: formData.university, major: formData.major, status: formData.status }
        });
      } else {
        // Create student record only (no login account)
        await createStudent({ name: formData.name, university: formData.university, major: formData.major, status: formData.status });
      }
      setIsModalOpen(false);
      setFormData({ name: '', university: '', major: '', status: 'Active', email: '', password: '', createAccount: true });
      loadStudents();
      alert('Student created successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = students.filter(s => {
    const matchSearch = searchTerm === '' || 
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.id || '').toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || (s.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const selectStyle = { padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', fontSize: '14px' };

  const exportColumns = [
    { header: 'Student ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'University', dataKey: 'university' },
    { header: 'Major', dataKey: 'major' },
    { header: 'Status', dataKey: 'status' },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Student Internship Tracking</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage interns, tasks, and progress</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t('buttons.export')} ▾
            </button>
            {showExportMenu && (
              <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--outline-variant)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
                <button onClick={() => { exportToExcel(filtered, exportColumns, 'QUENOXA_Students'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.excel')}</button>
                <button onClick={() => { exportToPDF(filtered, exportColumns, 'Student Directory', 'QUENOXA_Students'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.pdf')}</button>
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} />
            Add Student
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
          <input type="text" placeholder={t('filters.searchStudents')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('filters.allStatuses')}</option>
          <option value="Active">{t('status.active')}</option>
          <option value="Completed">{t('status.completed')}</option>
          <option value="Dropped">{t('status.dropped')}</option>
        </select>
        <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setStatusFilter('All'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <X size={16} /> {t('buttons.clearFilters')}
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
            {filtered.map(student => (
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
            {filtered.length === 0 && (
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

              {/* Portal Account Section */}
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: formData.createAccount ? '16px' : '0' }}>
                  <input type="checkbox" checked={formData.createAccount} onChange={e => setFormData({...formData, createAccount: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                  <span style={{ fontWeight: '500' }}>Create Portal Login Account</span>
                </label>
                {formData.createAccount && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Login Email</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="student@email.com" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Password</label>
                      <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Min 6 characters" minLength={6} />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Save Student'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
