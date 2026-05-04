import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Calendar, CheckCircle, CreditCard, Users } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      // Get client record to verify ownership
      const { data: clientRecord } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!clientRecord) { navigate('/client/projects'); return; }

      // Fetch the project and verify it belongs to this client
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('client_id', clientRecord.id)
        .single();

      if (error || !data) {
        navigate('/client/projects'); // Not their project, redirect
        return;
      }
      setProject(data);

      // Fetch assigned team members from tasks on this project
      const { data: tasks } = await supabase
        .from('tasks')
        .select('student_id, students(name)')
        .eq('project_id', projectId);

      if (tasks) {
        const uniqueMembers = [];
        const seen = new Set();
        tasks.forEach(task => {
          if (task.student_id && !seen.has(task.student_id)) {
            seen.add(task.student_id);
            uniqueMembers.push({ name: task.students?.name || 'Team Member', role: 'Assigned' });
          }
        });
        setTeamMembers(uniqueMembers);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB');
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active' || s === 'ongoing') return <span className="badge success">{t('status.active')}</span>;
    if (s === 'completed') return <span className="badge" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>{t('status.completed')}</span>;
    if (s === 'on hold' || s === 'pending') return <span className="badge pending">{t('status.onHold')}</span>;
    if (s === 'cancelled') return <span className="badge error">{t('status.cancelled')}</span>;
    return <span className="badge">{status}</span>;
  };

  const getPaymentBadge = (status) => {
    switch(status) {
      case 'paid': return <span className="badge success">{t('status.paid')}</span>;
      case 'pending': return <span className="badge pending">{t('status.pending')}</span>;
      case 'partial': return <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>{t('status.partial')}</span>;
      default: return <span className="badge">{status || 'N/A'}</span>;
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  if (!project) return <div className="page-container"><p>{t('empty.noData')}</p></div>;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/client/projects')} style={{ padding: '8px' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            {project.name} {getStatusBadge(project.status)}
          </h1>
          <p style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0 0' }}>{t('projects.projectId')}: <span className="mono">{project.id?.slice(0, 8).toUpperCase()}</span></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>{t('projects.overview')}</h3>
            <p style={{ color: 'var(--on-surface)', lineHeight: '1.6', marginBottom: '24px' }}>
              {project.project_description || project.description || 'No description provided.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>{t('projects.projectDomain')}</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={16} /> {project.domain || 'N/A'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>{t('internship.type')}</div>
                <div style={{ fontWeight: '500' }}>{project.project_type || 'N/A'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>{t('internship.startDate')}</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {formatDate(project.created_at)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--outline)', fontSize: '13px', marginBottom: '4px' }}>{t('internship.endDate')}</div>
                <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {formatDate(project.deadline)}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--primary)" /> {t('projects.progress')}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Overall Completion</span>
              <span style={{ fontWeight: '600' }}>{project.progress_percentage || 0}%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '12px' }}>
              <div style={{ width: `${project.progress_percentage || 0}%`, backgroundColor: 'var(--primary)', height: '100%', borderRadius: '999px', transition: 'width 0.5s' }}></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--primary)" /> {t('projects.financialSummary')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>{t('projects.estimatedCost')}</span>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>₹ {Number(project.estimated_cost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>{t('projects.finalCost')}</span>
                <span style={{ fontWeight: '500' }}>{project.final_cost ? `₹ ${Number(project.final_cost).toLocaleString('en-IN')}` : t('status.pending')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>{t('projects.paymentStatus')}</span>
                {getPaymentBadge(project.payment_status)}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--primary)" /> {t('projects.assignedTeam')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {teamMembers.length > 0 ? teamMembers.map((member, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{member.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{member.role}</div>
                  </div>
                </div>
              )) : (
                <p style={{ color: 'var(--outline)', fontStyle: 'italic' }}>{t('empty.noData')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
