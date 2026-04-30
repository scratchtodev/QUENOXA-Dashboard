import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function Clients() {
  const [clients, setClients] = useState([
    { id: '1', name: 'Acme Corp', contact: 'John Smith', email: 'john@acme.com', status: 'Active', projects: 3 },
    { id: '2', name: 'Globex Inc', contact: 'Jane Doe', email: 'jane@globex.com', status: 'Pending', projects: 1 },
    { id: '3', name: 'Initech', contact: 'Peter Gibbons', email: 'peter@initech.com', status: 'Active', projects: 5 },
  ]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Client Management</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage organizations and tracking details</p>
        </div>
        <button className="btn btn-primary">
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
                  <td className="mono">CLT-00{client.id}</td>
                  <td style={{ fontWeight: 500 }}>{client.name}</td>
                  <td>
                    <div style={{ fontSize: '14px' }}>{client.contact}</div>
                    <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{client.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${client.status.toLowerCase()}`}>{client.status}</span>
                  </td>
                  <td>{client.projects}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--outline)' }}>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
