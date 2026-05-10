import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Calendar, Clock, BookOpen, Layers } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

export default function StudentInternship() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInternship();
  }, []);

  const loadInternship = async () => {
    try {
      const { data: student, error } = await supabase
        .from('students')
        .select('internship_id, domain, internship_type, batch_number, start_date, end_date, duration, status, enrollment_date')
        .eq('user_id', user.id)
        .single();
      if (!error && student) {
        // Auto-calculate duration if empty
        if (!student.duration && student.start_date && student.end_date) {
          const start = new Date(student.start_date);
          const end = new Date(student.end_date);
          const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
          student.duration = `${months} Months`;
        }
        setData(student);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return <span className="badge success">{t('status.active')}</span>;
      case 'completed': return <span className="badge" style={{ backgroundColor: 'var(--info-container)', color: 'var(--on-info-container)' }}>{t('status.completed')}</span>;
      case 'dropped': return <span className="badge error">{t('status.dropped')}</span>;
      default: return <span className="badge">{status || 'N/A'}</span>;
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  if (!data) return <div className="page-container"><p>{t('empty.noData')}</p></div>;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>{t('internship.title')}</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>{t('internship.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--primary-container)', borderRadius: '12px', color: 'var(--on-primary-container)' }}>
                <Briefcase size={28} />
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{t('internship.programDetails')}</h2>
                <div style={{ color: 'var(--on-surface-variant)', fontSize: '14px', marginTop: '4px' }}>
                  ID: <span className="mono">{data.internship_id || 'N/A'}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(data.status)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <BookOpen size={16} /> {t('internship.domain')}
              </div>
              <div style={{ fontWeight: '500' }}>{data.domain || 'N/A'}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <Layers size={16} /> {t('internship.batchNumber')}
              </div>
              <div style={{ fontWeight: '500' }}>{data.batch_number || 'N/A'}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--outline)', marginBottom: '4px', fontSize: '13px' }}>
                <Clock size={16} /> {t('internship.type')}
              </div>
              <div style={{ fontWeight: '500' }}>{data.internship_type || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '12px', color: 'var(--on-surface)' }}>
              <Calendar size={28} />
            </div>
            <h2 style={{ margin: 0 }}>{t('internship.timeline')}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>{t('internship.startDate')}</div>
              <div style={{ fontWeight: '600' }}>{formatDate(data.start_date)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>{t('internship.endDate')}</div>
              <div style={{ fontWeight: '600' }}>{formatDate(data.end_date)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--on-surface-variant)' }}>{t('internship.totalDuration')}</div>
              <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{data.duration || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>{t('internship.progressTimeline')}</h3>
        <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--primary-container)' }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0' }}>{t('internship.enrollment')}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>{formatDate(data.enrollment_date || data.start_date)}</p>
          </div>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: data.status?.toLowerCase() === 'completed' ? 'var(--primary)' : 'var(--outline-variant)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0' }}>{t('internship.midTerm')}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>{t('internship.pending')}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: data.status?.toLowerCase() === 'completed' ? 'var(--primary)' : 'var(--outline-variant)', border: '2px solid var(--surface)' }}></div>
            <h4 style={{ margin: '0 0 4px 0', color: data.status?.toLowerCase() === 'completed' ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>{t('internship.completion')}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--outline)' }}>{t('internship.expected')} {formatDate(data.end_date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
