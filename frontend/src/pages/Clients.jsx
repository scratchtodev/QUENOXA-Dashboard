import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X } from 'lucide-react';
import { fetchClients, createClient } from '../api';
import { useTranslation } from 'react-i18next';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';

export default function Clients() {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => { loadClients(); }, []);

  const loadClients = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error("Failed to load clients:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createClient(formData);
      setIsModalOpen(false);
      setFormData({ name: '', contact: '', email: '', status: 'Active' });
      loadClients();
    } catch (error) {
      console.error("Failed to save client:", error);
    }
  };

  const filtered = clients.filter(c => {
    const matchSearch = searchTerm === '' ||
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.id || '').toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || (c.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const selectStyle = { padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', fontSize: '14px' };

  const exportColumns = [
    { header: 'Client ID', dataKey: 'id' },
    { header: 'Company', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Status', dataKey: 'status' },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Client Management</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage organizations and tracking details</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t('buttons.export')} ▾
            </button>
            {showExportMenu && (
              <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--outline-variant)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
                <button onClick={() => { exportToExcel(filtered, exportColumns, 'QUENOXA_Clients'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.excel')}</button>
                <button onClick={() => { exportToPDF(filtered, exportColumns, 'Client Directory', 'QUENOXA_Clients'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.pdf')}</button>
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} />
            Add Client
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
          <input type="text" placeholder={t('filters.searchClients')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('filters.allStatuses')}</option>
          <option value="Active">{t('status.active')}</option>
          <option value="Pending">{t('status.pending')}</option>
          <option value="Inactive">{t('status.inactive')}</option>
        </select>
        <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setStatusFilter('All'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <X size={16} /> {t('buttons.clearFilters')}
        </button>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Company Name</th>
                <th>Primary Contact</th>
                <th>Status</th>
                <th>Active Projects</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => (
                <tr key={client.id}>
                  <td className="mono">CLT-{(client.id || '').toString().padStart(3, '0')}</td>
                  <td style={{ fontWeight: 500 }}>{client.name}</td>
                  <td>
                    <div style={{ fontSize: '14px' }}>{client.contact || 'N/A'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{client.email || 'N/A'}</div>
                  </td>
                  <td>
                    <span className={`badge ${(client.status || 'active').toLowerCase()}`}>{client.status || 'Active'}</span>
                  </td>
                  <td>{client.projects || 0}</td>
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
                    No clients found. Click "Add Client" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Add New Client</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--on-surface-variant)" />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Company Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Acme Corp" />
              </div>
              <div className="form-group">
                <label>Primary Contact</label>
                <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="e.g. john@acme.com" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
