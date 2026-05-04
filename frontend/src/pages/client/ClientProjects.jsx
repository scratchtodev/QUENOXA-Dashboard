import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

export default function ClientProjects() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const { data: clientRecord } = await supabase
        .from('clients').select('id').eq('user_id', user.id).single();
      if (clientRecord) {
        const { data } = await supabase
          .from('projects').select('*').eq('client_id', clientRecord.id).order('created_at', { ascending: false });
        setAllProjects(data || []);
      }
    } catch (err) { console.error('Error:', err); }
    finally { setLoading(false); }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';

  // Client-side filtering
  const filtered = allProjects.filter(p => {
    const matchSearch = searchTerm === '' || p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || (p.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchDomain = domainFilter === 'All' || (p.domain || '').toLowerCase() === domainFilter.toLowerCase();
    let matchDate = true;
    if (dateFilter !== 'All' && p.created_at) {
      const created = new Date(p.created_at);
      const now = new Date();
      if (dateFilter === 'This Month') matchDate = created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      else if (dateFilter === 'Last 3 Months') { const threeMonthsAgo = new Date(); threeMonthsAgo.setMonth(now.getMonth() - 3); matchDate = created >= threeMonthsAgo; }
      else if (dateFilter === 'This Year') matchDate = created.getFullYear() === now.getFullYear();
    }
    return matchSearch && matchStatus && matchDomain && matchDate;
  });

  const clearFilters = () => { setSearchTerm(''); setStatusFilter('All'); setDomainFilter('All'); setDateFilter('All'); };

  const selectStyle = { padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', fontSize: '14px' };

  const exportColumns = [
    { header: t('projects.projectId'), dataKey: 'id' },
    { header: t('projects.projectTitle'), dataKey: 'name' },
    { header: t('projects.projectDomain'), dataKey: 'domain' },
    { header: 'Status', dataKey: 'status' },
    { header: t('projects.progress'), dataKey: 'progress_percentage' },
  ];

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>{t('projects.title')}</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>{t('projects.subtitle')}</p>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="btn btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('buttons.export')} ▾
          </button>
          {showExportMenu && (
            <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--outline-variant)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
              <button onClick={() => { exportToExcel(filtered, exportColumns, 'QUENOXA_Projects'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.excel')}</button>
              <button onClick={() => { exportToPDF(filtered, exportColumns, t('projects.title'), 'QUENOXA_Projects'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.pdf')}</button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
          <input type="text" placeholder={t('projects.search')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('filters.allStatuses')}</option>
          <option value="Active">{t('status.active')}</option>
          <option value="Completed">{t('status.completed')}</option>
          <option value="On Hold">{t('status.onHold')}</option>
          <option value="Cancelled">{t('status.cancelled')}</option>
        </select>
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('filters.allDomains')}</option>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="AI">AI</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('filters.allDates')}</option>
          <option value="This Month">{t('filters.thisMonth')}</option>
          <option value="Last 3 Months">{t('filters.last3Months')}</option>
          <option value="This Year">{t('filters.thisYear')}</option>
        </select>
        <button className="btn btn-secondary" onClick={clearFilters} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <X size={16} /> {t('buttons.clearFilters')}
        </button>
      </div>

      <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--on-surface-variant)' }}>{t('projects.showing')} {filtered.length} {t('projects.of')} {allProjects.length} {t('projects.projectsLabel')}</p>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('projects.projectId')}</th>
              <th>{t('projects.projectTitle')}</th>
              <th>{t('projects.projectDomain')}</th>
              <th>Status</th>
              <th>{t('projects.progress')}</th>
              <th>{t('projects.projectTimeline')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={project.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/client/projects/${project.id}`)}>
                <td className="mono" style={{ color: 'var(--primary)' }}>{project.id?.slice(0, 8).toUpperCase()}</td>
                <td style={{ fontWeight: '500' }}>{project.name}</td>
                <td>{project.domain || 'N/A'}</td>
                <td>
                  <span className={`badge ${(project.status || '').toLowerCase() === 'active' || (project.status || '').toLowerCase() === 'ongoing' ? 'success' : (project.status || '').toLowerCase() === 'completed' ? '' : 'pending'}`} style={(project.status || '').toLowerCase() === 'completed' ? { backgroundColor: '#dbeafe', color: '#1e40af' } : {}}>
                    {project.status || 'Pending'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '60px', backgroundColor: 'var(--surface-container-high)', borderRadius: '999px', height: '6px' }}>
                      <div style={{ width: `${project.progress_percentage || 0}%`, backgroundColor: 'var(--primary)', height: '100%', borderRadius: '999px' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{project.progress_percentage || 0}%</span>
                  </div>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                  {formatDate(project.created_at)} - {formatDate(project.deadline)}
                </td>
                <td style={{ textAlign: 'right', color: 'var(--outline)' }}><ChevronRight size={18} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>{t('empty.noProjects')}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
