import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../api';

export default function Profile() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, remaining: 0 });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
      
      const total = data.length;
      const completed = data.filter(t => (t.status || '').toLowerCase() === 'completed').length;
      
      setStats({
        total,
        completed,
        remaining: total - completed
      });
    } catch (error) {
      console.error("Failed to load tasks for profile:", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>User Profile</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Manage your details and track your system tasks</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
        {/* User Details Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            marginBottom: '16px'
          }}>
            <User size={40} />
          </div>
          <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{user?.user_metadata?.full_name || 'Admin User'}</h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Shield size={14} /> System Administrator
          </p>
          
          <div style={{ width: '100%', borderTop: '1px solid var(--outline-variant)', margin: '16px 0' }}></div>
          
          <div style={{ width: '100%', textAlign: 'left' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '12px' }}>
              <Mail size={16} /> {user?.email || 'admin@example.com'}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
              <Clock size={16} /> Joined: {user ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        {/* Analytics & Tasks Overview */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                <ListTodo size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '13px', marginBottom: '2px' }}>Total Tasks</h3>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>{stats.total}</p>
              </div>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#166534' }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '13px', marginBottom: '2px' }}>Completed</h3>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>{stats.completed}</p>
              </div>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#b45309' }}>
                <Clock size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--on-surface-variant)', fontSize: '13px', marginBottom: '2px' }}>Remaining</h3>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>{stats.remaining}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Recent Tasks Overview</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 5).map(task => (
                  <tr key={task.id}>
                    <td style={{ fontWeight: 500 }}>{task.title}</td>
                    <td>
                      <span className={`badge ${(task.status || '').toLowerCase() === 'completed' ? 'success' : 'pending'}`}>
                        {task.status || 'Pending'}
                      </span>
                    </td>
                    <td>{task.deadline || 'N/A'}</td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '24px', color: 'var(--on-surface-variant)' }}>
                      No tasks found in the system yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
