import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Calendar, CheckCircle, CreditCard, Users } from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock data for Phase 2 based on projectId param
  const project = {
    id: projectId || 'PRJ-001',
    title: 'AI Model Development',
    description: 'Development and training of a custom predictive AI model for sales forecasting.',
    domain: 'Data Science',
    type: 'External',
    status: 'Active',
    progress: 75,
    startDate: '10/01/2026',
    endDate: '30/06/2026',
    estimatedCost: '₹ 5,00,000',
    finalCost: 'Pending',
    paymentStatus: 'Partial',
    team: [
      { name: 'Sarah Connor', role: 'Project Manager' },
      { name: 'John Smith', role: 'Lead Data Scientist' },
      { name: 'Emily Chen', role: 'ML Engineer' }
    ]
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="badge success">Active</span>;
      case 'Completed': return <span className="badge" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>Completed</span>;
      case 'On Hold': return <span className="badge pending">On Hold</span>;
      case 'Cancelled': return <span className="badge error">Cancelled</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getPaymentBadge = (status) => {
    switch(status) {
      case 'Paid': return <span className="badge success">Paid</span>;
      case 'Pending': return <span className="badge pending">Pending</span>;
      case 'Partial': return <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Partial</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/client/projects')} style={{ padding: '8px' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            {project.title} {getStatusBadge(project.status)}
          </h1>
          <p style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0 0' }}>Project ID: <span className="mono">{project.id}</span></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Project Overview</h3>
            <p style={{ color: 'var(--on-surface)', lineHeight: '1.6', marginBottom: '24px' }}>
              {project.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>Domain</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} /> {project.domain}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>Type</div>
                <div style={{ fontWeight: '500' }}>{project.type}</div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>Start Date</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} /> {project.startDate}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>End Date</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} /> {project.endDate}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--primary)" /> Progress
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Overall Completion</span>
              <span style={{ fontWeight: '600' }}>{project.progress}%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '12px' }}>
              <div style={{ width: `${project.progress}%`, backgroundColor: 'var(--primary)', height: '100%', borderRadius: '999px' }}></div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--primary)" /> Financial Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Estimated Cost</span>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>{project.estimatedCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Final Cost</span>
                <span style={{ fontWeight: '500' }}>{project.finalCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Payment Status</span>
                {getPaymentBadge(project.paymentStatus)}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--primary)" /> Assigned Team
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.team.map((member, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{member.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
