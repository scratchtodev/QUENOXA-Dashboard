import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Info, Send } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function ClientCommunication() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, meeting_summary, follow_up_status, client_notes, internal_remarks')
        .eq('user_id', user.id)
        .single();
      if (!error) setClientData(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientData?.id) return;
    setSending(true);

    const { error } = await supabase
      .from('support_requests')
      .insert({
        client_id: clientData.id,
        subject,
        message,
        status: 'open'
      });

    if (error) {
      alert('Failed to send: ' + error.message);
    } else {
      setSubject('');
      setMessage('');
      alert('Support request sent successfully!');
    }
    setSending(false);
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  const sections = [
    { title: t('communication.meetingSummaries'), content: clientData?.meeting_summary, icon: <Calendar size={24} />, color: 'var(--primary)' },
    { title: t('communication.followUpNotes'), content: clientData?.follow_up_status, icon: <MessageSquare size={24} />, color: 'var(--info)' },
    { title: t('communication.projectRemarks'), content: clientData?.internal_remarks, icon: <Info size={24} />, color: 'var(--warning)' },
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>{t('communication.title')}</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>{t('communication.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {sections.map((section, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ color: section.color }}>{section.icon}</div>
              <h3 style={{ margin: 0 }}>{section.title}</h3>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '8px', color: section.content ? 'var(--on-surface)' : 'var(--outline)', fontStyle: section.content ? 'normal' : 'italic', lineHeight: '1.5' }}>
              {section.content || t('empty.noNotes')}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '8px' }}>{t('communication.contactManager')}</h2>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '24px', fontSize: '14px' }}>{t('communication.contactSubtitle')}</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <div className="form-group">
            <label>{t('communication.subject')}</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Question about Invoice" required />
          </div>
          <div className="form-group">
            <label>{t('communication.message')}</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please describe your inquiry..." rows={5} required style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', fontFamily: 'inherit', resize: 'vertical' }} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={16} /> {sending ? t('buttons.sending') : t('buttons.send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
