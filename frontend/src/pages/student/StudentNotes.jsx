import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StickyNote, MessageSquare, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

export default function StudentNotes() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [notes, setNotes] = useState({ internal_remarks: '', follow_up_notes: '', status_comments: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('internal_remarks, follow_up_notes, status_comments')
        .eq('user_id', user.id)
        .single();
      if (!error && data) setNotes(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  const sections = [
    { key: 'internal_remarks', title: t('notes.internalRemarks'), icon: <StickyNote size={24} />, color: 'var(--primary)' },
    { key: 'follow_up_notes', title: t('notes.followUpNotes'), icon: <MessageSquare size={24} />, color: '#1e40af' },
    { key: 'status_comments', title: t('notes.statusComments'), icon: <AlertCircle size={24} />, color: '#92400e' },
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>{t('notes.title')}</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>{t('notes.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {sections.map(section => (
          <div key={section.key} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ color: section.color }}>{section.icon}</div>
              <h3 style={{ margin: 0 }}>{section.title}</h3>
            </div>
            <div style={{ 
              padding: '16px', 
              backgroundColor: 'var(--surface-container-highest)', 
              borderRadius: '8px',
              color: notes[section.key] ? 'var(--on-surface)' : 'var(--outline)',
              fontStyle: notes[section.key] ? 'normal' : 'italic',
              lineHeight: '1.6'
            }}>
              {notes[section.key] || t('notes.noNotes')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
