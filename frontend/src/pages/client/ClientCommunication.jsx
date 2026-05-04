import React, { useState } from 'react';
import { MessageSquare, Calendar, Info, Send } from 'lucide-react';

export default function ClientCommunication() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Mock data for Phase 2
  const communications = {
    meetingSummaries: [
      { date: '10/01/2026', content: 'Initial kickoff meeting. Agreed on Phase 1 deliverables and timeline.' },
      { date: '25/02/2026', content: 'Review of AI Model accuracy. Approved to proceed with integration.' }
    ],
    followUpNotes: [
      { date: '12/01/2026', content: 'Requested additional dataset for the model. Client team will provide by EOW.' }
    ],
    remarks: [
      { date: '01/01/2026', content: 'Priority client. Ensure fast turnaround on data requests.' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Mock submit action
    setTimeout(() => {
      setSending(false);
      setSubject('');
      setMessage('');
      alert('Support request sent successfully!');
    }, 1000);
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Communication</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>Review meeting notes, tracking updates, and reach out to your account manager.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Meeting Summaries */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary)' }}><Calendar size={24} /></div>
            <h3 style={{ margin: 0 }}>Meeting Summaries</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {communications.meetingSummaries.map((item, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--outline)', marginBottom: '8px' }}>{item.date}</div>
                <div style={{ color: 'var(--on-surface)', lineHeight: '1.5' }}>{item.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Notes */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ color: '#1e40af' }}><MessageSquare size={24} /></div>
            <h3 style={{ margin: 0 }}>Follow-up Notes</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {communications.followUpNotes.map((item, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--outline)', marginBottom: '8px' }}>{item.date}</div>
                <div style={{ color: 'var(--on-surface)', lineHeight: '1.5' }}>{item.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Remarks */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ color: '#92400e' }}><Info size={24} /></div>
            <h3 style={{ margin: 0 }}>Project Remarks</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {communications.remarks.map((item, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--outline)', marginBottom: '8px' }}>{item.date}</div>
                <div style={{ color: 'var(--on-surface)', lineHeight: '1.5' }}>{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Request Form */}
      <div className="card">
        <h2 style={{ marginBottom: '8px' }}>Contact Account Manager</h2>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '24px', fontSize: '14px' }}>Need help or have questions? Send a direct message to our team.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="e.g., Question about Invoice #INV-2026-001"
              required 
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Please describe your inquiry in detail..."
              rows={5}
              required 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--outline-variant)',
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={16} /> {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
