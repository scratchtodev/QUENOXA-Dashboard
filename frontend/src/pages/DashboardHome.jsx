import React from 'react';
import { Users, FileText, CheckCircle, Briefcase } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Dashboard Home</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Welcome to Nexus Dashboard. Here is your overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Active Projects</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>12</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', color: 'var(--on-secondary-container)' }}>
            <Users size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Active Students</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>45</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef9c3', color: '#854d0e' }}>
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Pending Evaluations</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>8</p>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: '#dcfce7', color: '#166534' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Completed Tasks</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>124</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Recent Activity</h2>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>Alice Walker submitted the mockups for Acme Corp.</li>
            <li style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>Admin evaluated Bob Harris's API Integration.</li>
            <li style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>New client Initech registered.</li>
          </ul>
        </div>
        
        <div className="card">
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-secondary">Assign New Task</button>
            <button className="btn btn-secondary">Generate Invoice</button>
            <button className="btn btn-secondary">Add New Student</button>
          </div>
        </div>
      </div>
    </div>
  );
}
