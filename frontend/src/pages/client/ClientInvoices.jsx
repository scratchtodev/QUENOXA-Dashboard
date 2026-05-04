import React, { useState, useEffect } from 'react';
import { Download, CreditCard } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

export default function ClientInvoices() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      // First get the client record for this user
      const { data: clientRecord } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (clientRecord) {
        const { data, error } = await supabase
          .from('invoices')
          .select('*, projects(name)')
          .eq('client_id', clientRecord.id)
          .order('created_at', { ascending: false });

        if (!error) setInvoices(data || []);
      }
    } catch (err) {
      console.error('Error loading invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (invoiceUrl) => {
    if (!invoiceUrl) return;
    const { data, error } = await supabase.storage
      .from('client-documents')
      .createSignedUrl(invoiceUrl, 3600);
    if (!error) window.open(data.signedUrl, '_blank');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid': return <span className="badge success">{t('status.paid')}</span>;
      case 'pending': return <span className="badge pending">{t('status.pending')}</span>;
      case 'partial': return <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>{t('status.partial')}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const totalBilled = invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  const partialPaid = invoices.filter(i => i.status === 'partial').reduce((sum, inv) => sum + Number(inv.amount || 0) * 0.5, 0);
  const outstanding = totalBilled - totalPaid - partialPaid;

  const exportColumns = [
    { header: t('invoices.invoiceId'), dataKey: 'id' },
    { header: t('invoices.date'), dataKey: 'date' },
    { header: t('invoices.amount'), dataKey: 'amount' },
    { header: 'Status', dataKey: 'status' },
    { header: t('invoices.paymentMethod'), dataKey: 'payment_method' },
  ];
  const exportData = invoices.map(inv => ({ ...inv, date: formatDate(inv.created_at), amount: `₹ ${Number(inv.amount).toLocaleString('en-IN')}` }));

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>{t('invoices.title')}</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>{t('invoices.subtitle')}</p>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="btn btn-secondary" onClick={() => setShowExportMenu(!showExportMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('buttons.export')} ▾
          </button>
          {showExportMenu && (
            <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--outline-variant)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
              <button onClick={() => { exportToExcel(exportData, exportColumns, 'QUENOXA_Invoices'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.excel')}</button>
              <button onClick={() => { exportToPDF(exportData, exportColumns, t('invoices.title'), 'QUENOXA_Invoices'); setShowExportMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--on-surface)', fontSize: '14px' }}>{t('buttons.pdf')}</button>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('invoices.invoiceId')}</th>
              <th>{t('invoices.date')}</th>
              <th>{t('invoices.amount')}</th>
              <th>Status</th>
              <th>{t('invoices.paymentMethod')}</th>
              <th>{t('invoices.action')}</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="mono" style={{ color: 'var(--primary)', fontWeight: '500' }}>{inv.id?.slice(0, 8).toUpperCase()}</td>
                <td>{formatDate(inv.created_at)}</td>
                <td style={{ fontWeight: '600' }}>₹ {Number(inv.amount).toLocaleString('en-IN')}</td>
                <td>{getStatusBadge(inv.status)}</td>
                <td>{inv.payment_method || 'N/A'}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleDownload(inv.invoice_url)} style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <Download size={14} /> {t('buttons.download')}
                  </button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>{t('empty.noInvoices')}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', backgroundColor: 'var(--surface-container-highest)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{t('invoices.totalBilled')}</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>₹ {totalBilled.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{t('invoices.totalPaid')}</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>₹ {(totalPaid + partialPaid).toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px', border: outstanding > 0 ? '1px solid var(--error-container)' : 'none' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{t('invoices.outstanding')}</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: outstanding > 0 ? '#b91c1c' : '#166534' }}>₹ {outstanding.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
