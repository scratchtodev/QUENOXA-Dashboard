import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FolderKanban, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Client Dashboard</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Welcome back, {user?.user_metadata?.full_name || 'Client'}. Here is an overview of your projects.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--primary-container)', borderRadius: '12px', color: 'var(--on-primary-container)' }}>
            <FolderKanban size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>3</h2>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>Total Projects</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '12px', color: '#166534' }}>
            <Clock size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>2</h2>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>Active Projects</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '12px', color: '#1e40af' }}>
            <CheckCircle size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>1</h2>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>Completed</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '12px', color: '#92400e' }}>
            <AlertCircle size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>0</h2>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>On Hold</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '16px' }}>Active Projects Progress</h2>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>AI Model Development</strong>
              <span>75%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: '75%', backgroundColor: 'var(--primary)', height: '100%', borderRadius: '999px' }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Data Infrastructure Setup</strong>
              <span>30%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: '30%', backgroundColor: 'var(--primary)', height: '100%', borderRadius: '999px' }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '16px' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', color: 'var(--primary)' }}><CheckCircle size={18} /></div>
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: 'var(--on-surface)' }}>Invoice Paid</p>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Invoice #INV-001 was paid successfully.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', color: 'var(--outline)' }}><FolderKanban size={18} /></div>
              <div>
                <p style={{ margin: 0, fontWeight: '500', color: 'var(--on-surface)' }}>Project Updated</p>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Phase 1 delivery completed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
