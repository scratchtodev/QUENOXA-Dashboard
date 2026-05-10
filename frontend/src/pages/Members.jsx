import React, { useState, useEffect } from 'react';
import { UserCog, Mail, Shield, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { fetchMembers } from '../api';

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch (error) {
      console.error("Failed to load members:", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Team Members</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Directory of Admins and Staff and their task workloads</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {members.map(member => (
          <div key={member.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '50%', 
                backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <UserCog size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{member.name}</h3>
                <span className="badge pending">{member.role}</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <Mail size={16} /> {member.email}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--outline-variant)', margin: '0 -24px 24px -24px' }}></div>

            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Task Workload</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'var(--surface-container)', borderRadius: '8px' }}>
                  <ListTodo size={18} color="var(--on-surface-variant)" style={{ marginBottom: '8px' }} />
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{member.tasks.total}</span>
                  <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>Total</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'var(--secondary-container)', borderRadius: '8px' }}>
                  <CheckCircle size={18} color="var(--secondary)" style={{ marginBottom: '8px' }} />
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)' }}>{member.tasks.completed}</span>
                  <span style={{ fontSize: '12px', color: 'var(--secondary)' }}>Completed</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'var(--warning-container)', borderRadius: '8px' }}>
                  <Clock size={18} color="var(--warning)" style={{ marginBottom: '8px' }} />
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--warning)' }}>{member.tasks.remaining}</span>
                  <span style={{ fontSize: '12px', color: 'var(--warning)' }}>Remaining</span>
                </div>

              </div>
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--on-surface-variant)' }}>
            No team members found.
          </div>
        )}
      </div>
    </div>
  );
}
