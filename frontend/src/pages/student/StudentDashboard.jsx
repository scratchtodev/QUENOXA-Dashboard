import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Student Dashboard</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Welcome back! Here is an overview of your internship progress.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Profile Summary Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'var(--primary-container)', borderRadius: '8px', color: 'var(--on-primary-container)' }}>
              <User size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>My Profile</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Student Details</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Name:</strong> {user?.user_metadata?.full_name || 'Student User'}</div>
            <div><strong>Email:</strong> {user?.email}</div>
            <div style={{ marginTop: '8px' }}>
              <span className="badge success">Active Student</span>
            </div>
          </div>
        </div>

        {/* Internship Details Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px', color: 'var(--on-surface)' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>My Internship</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Current Program</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Domain:</strong> AI & Data Science</div>
            <div><strong>Type:</strong> Online</div>
            <div><strong>Duration:</strong> 3 Months</div>
          </div>
        </div>

        {/* Document Status Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'var(--error-container)', borderRadius: '8px', color: 'var(--on-error-container)' }}>
              <FileText size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Documents</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Upload Status</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Resume:</span> <span className="badge success">Uploaded</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>ID Proof:</span> <span className="badge error">Missing</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Offer Letter:</span> <span className="badge pending">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '2px', color: 'var(--primary)' }}><CheckCircle size={18} /></div>
            <div>
              <p style={{ margin: 0, fontWeight: '500', color: 'var(--on-surface)' }}>Account Created</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Your student portal access was granted.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '2px', color: 'var(--outline)' }}><Clock size={18} /></div>
            <div>
              <p style={{ margin: 0, fontWeight: '500', color: 'var(--on-surface)' }}>Logged In</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
