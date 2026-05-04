import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Calendar, Clock, BookOpen, Layers } from 'lucide-react';

export default function StudentInternship() {
  const { user } = useAuth();
  
  // Mock data for Phase 2
  const internshipData = {
    internshipId: 'INT-2026-1042',
    domain: 'AI & Data Science',
    type: 'Online',
    batchNumber: 'B-2026-Q1',
    startDate: '10/01/2026',
    endDate: '10/04/2026',
    duration: '3 Months',
    status: 'Active'
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="badge success">Active</span>;
      case 'Completed': return <span className="badge" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>Completed</span>;
      case 'Dropped': return <span className="badge error">Dropped</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>My Internship</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>View details and track the timeline of your current program. (Read-Only)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--primary-container)', borderRadius: '12px', color: 'var(--on-primary-container)' }}>
                <Briefcase size={28} />
              </div>
              <div>
                <h2 style={{ margin: 0 }}>Program Details</h2>
                <div style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginTop: '4px' }}>
                  ID: <span className="mono">{internshipData.internshipId}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(internshipData.status)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <BookOpen size={16} /> Domain
              </div>
              <div style={{ fontWeight: '500' }}>{internshipData.domain}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <Layers size={16} /> Batch Number
              </div>
              <div style={{ fontWeight: '500' }}>{internshipData.batchNumber}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <Clock size={16} /> Type
              </div>
              <div style={{ fontWeight: '500' }}>{internshipData.type}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '12px', color: 'var(--on-surface)' }}>
              <Calendar size={28} />
            </div>
            <h2 style={{ margin: 0 }}>Timeline</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>Start Date</div>
              <div style={{ fontWeight: '600' }}>{internshipData.startDate}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>End Date</div>
              <div style={{ fontWeight: '600' }}>{internshipData.endDate}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>Total Duration</div>
              <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{internshipData.duration}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Progress Timeline</h3>
        <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--primary-container)' }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0' }}>Enrollment</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Started on {internshipData.startDate}</p>
          </div>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0' }}>Mid-Term Evaluation</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>Pending</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--outline-variant)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0', color: 'var(--on-surface-variant)' }}>Completion</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--outline)' }}>Expected {internshipData.endDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
