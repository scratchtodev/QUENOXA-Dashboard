import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';

export default function ActivityLog() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: studentsData } = await supabase
        .from('students')
        .select('name, email, status, last_login, login_count');
      const { data: clientsData } = await supabase
        .from('clients')
        .select('name, email, status, last_login, login_count');

      setStudents((studentsData || []).map(s => ({ ...s, role: 'Student' })));
      setClients((clientsData || []).map(c => ({ ...c, role: 'Client' })));
    } catch (err) {
      console.error('Error loading activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const allUsers = [...students, ...clients];

  const filtered = allUsers.filter(u => {
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchSearch = searchTerm === '' ||
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchSearch;
  });

  const formatDate = (d) => {
    if (!d) return t('activityLog.never');
    return new Date(d).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const selectStyle = { padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', fontSize: '14px' };

  const exportColumns = [
    { header: t('activityLog.name'), dataKey: 'name' },
    { header: t('activityLog.role'), dataKey: 'role' },
    { header: t('activityLog.lastLogin'), dataKey: 'lastLoginFormatted' },
    { header: t('activityLog.totalLogins'), dataKey: 'login_count' },
    { header: 'Status', dataKey: 'status' },
  ];
  const exportData = filtered.map(u => ({ ...u, lastLoginFormatted: formatDate(u.last_login) }));

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>{t('activityLog.title')}</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>{t('activityLog.subtitle')}</p>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="btn btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('buttons.export')} ▾
          </button>
          {showExportMenu && (
            <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--outline-variant)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
              <button onClick={() => { exportToExcel(exportData, exportColumns, 'QUENOXA_ActivityLog'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.excel')}</button>
              <button onClick={() => { exportToPDF(exportData, exportColumns, t('activityLog.title'), 'QUENOXA_ActivityLog'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.pdf')}</button>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
          <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px 16px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }} />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={selectStyle}>
          <option value="All">{t('activityLog.allRoles')}</option>
          <option value="Student">{t('activityLog.student')}</option>
          <option value="Client">{t('activityLog.client')}</option>
        </select>
        <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setRoleFilter('All'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <X size={16} /> {t('buttons.clearFilters')}
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('activityLog.name')}</th>
              <th>{t('activityLog.role')}</th>
              <th>{t('activityLog.lastLogin')}</th>
              <th>{t('activityLog.totalLogins')}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '500' }}>
                  <div>{user.name || 'N/A'}</div>
                  <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{user.email || ''}</div>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: user.role === 'Student' ? '#dbeafe' : '#fce7f3', color: user.role === 'Student' ? '#1e40af' : '#9d174d' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ fontSize: '14px' }}>{formatDate(user.last_login)}</td>
                <td style={{ fontWeight: '600' }}>{user.login_count || 0}</td>
                <td>
                  <span className={`badge ${(user.status || 'active').toLowerCase() === 'active' ? 'success' : (user.status || '').toLowerCase() === 'inactive' ? '' : 'pending'}`} style={(user.status || '').toLowerCase() === 'inactive' ? { backgroundColor: '#e5e7eb', color: '#6b7280' } : {}}>
                    {user.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>{t('empty.noData')}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
