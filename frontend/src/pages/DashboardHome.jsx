import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Briefcase } from 'lucide-react';
import { fetchClients, fetchStudents } from '../api';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    activeClients: 0,
    activeStudents: 0,
    pendingEvals: 8, // mock for now
    completedTasks: 124 // mock for now
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [clients, students] = await Promise.all([
          fetchClients(),
          fetchStudents()
        ]);
        
        setStats(prev => ({
          ...prev,
          activeClients: clients.length,
          activeStudents: students.filter(s => s.status === 'Active' || s.status === 'active').length || students.length
        }));
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    }
    loadStats();
  }, []);

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
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Active Clients</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>{stats.activeClients}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', color: 'var(--on-secondary-container)' }}>
            <Users size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Active Students</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>{stats.activeStudents}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef9c3', color: '#854d0e' }}>
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Pending Evaluations</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>{stats.pendingEvals}</p>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: '#dcfce7', color: '#166534' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '4px' }}>Completed Tasks</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--on-surface)' }}>{stats.completedTasks}</p>
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
            <a href="/students" className="btn btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>Add New Student</a>
          </div>
        </div>
      </div>
    </div>
  );
}
