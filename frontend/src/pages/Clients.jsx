import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X } from 'lucide-react';
import { fetchClients, createClient } from '../api';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', status: 'Active' });

  useEffect(() => {
    loadClients();
  }, []);

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
      loadClients(); // Refresh the table
    } catch (error) {
      console.error("Failed to save client:", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Client Management</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage organizations and tracking details</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          Add Client
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              style={{
                width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-md)',
                border: '1px solid #E5E7EB', backgroundColor: 'var(--surface-container-lowest)'
              }}
            />
          </div>
        </div>

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
              {clients.map(client => (
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
              {clients.length === 0 && (
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
