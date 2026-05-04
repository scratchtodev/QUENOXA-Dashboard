import React from 'react';
import { Download, CreditCard } from 'lucide-react';

export default function ClientInvoices() {
  // Mock data for Phase 2
  const invoices = [
    { id: 'INV-2026-001', amount: '₹ 2,50,000', status: 'Paid', method: 'Bank Transfer', date: '15/01/2026', url: '#' },
    { id: 'INV-2026-002', amount: '₹ 1,50,000', status: 'Pending', method: 'Pending', date: '01/03/2026', url: '#' },
    { id: 'INV-2026-003', amount: '₹ 1,00,000', status: 'Partial', method: 'Credit Card', date: '15/04/2026', url: '#' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid': return <span className="badge success">Paid</span>;
      case 'Pending': return <span className="badge pending">Pending</span>;
      case 'Partial': return <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Partial</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Payments & Invoices</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Track your billing history, view outstanding balances, and download invoices.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="mono" style={{ color: 'var(--primary)', fontWeight: '500' }}>{inv.id}</td>
                <td>{inv.date}</td>
                <td style={{ fontWeight: '600' }}>{inv.amount}</td>
                <td>{getStatusBadge(inv.status)}</td>
                <td>{inv.method}</td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <Download size={14} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Financial Summary */}
      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', backgroundColor: 'var(--surface-container-highest)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>Total Billed</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>₹ 5,00,000</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>Total Paid</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>₹ 3,50,000</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--error-container)' }}>
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>Outstanding Balance</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#b91c1c' }}>₹ 1,50,000</span>
        </div>
      </div>
    </div>
  );
}
