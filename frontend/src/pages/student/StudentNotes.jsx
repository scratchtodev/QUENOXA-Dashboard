import React from 'react';
import { StickyNote, MessageSquare, AlertCircle } from 'lucide-react';

export default function StudentNotes() {
  // Mock data for Phase 2
  const notes = {
    internalRemarks: "Student is performing well. Completed week 1 assignments ahead of schedule.",
    followUpNotes: "", // Empty to show placeholder
    statusComments: "Pending review of Offer Letter."
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>My Notes</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>View remarks and updates from your program administrators. (Read-Only)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Internal Remarks */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ color: 'var(--primary)' }}>
              <StickyNote size={24} />
            </div>
            <h3 style={{ margin: 0 }}>Internal Remarks</h3>
          </div>
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'var(--surface-container-highest)', 
            borderRadius: '8px',
            color: notes.internalRemarks ? 'var(--on-surface)' : 'var(--outline)',
            fontStyle: notes.internalRemarks ? 'normal' : 'italic'
          }}>
            {notes.internalRemarks || "No notes yet."}
          </div>
        </div>

        {/* Follow-up Notes */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ color: '#1e40af' }}>
              <MessageSquare size={24} />
            </div>
            <h3 style={{ margin: 0 }}>Follow-up Notes</h3>
          </div>
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'var(--surface-container-highest)', 
            borderRadius: '8px',
            color: notes.followUpNotes ? 'var(--on-surface)' : 'var(--outline)',
            fontStyle: notes.followUpNotes ? 'normal' : 'italic'
          }}>
            {notes.followUpNotes || "No notes yet."}
          </div>
        </div>

        {/* Status Comments */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ color: '#92400e' }}>
              <AlertCircle size={24} />
            </div>
            <h3 style={{ margin: 0 }}>Status Comments</h3>
          </div>
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'var(--surface-container-highest)', 
            borderRadius: '8px',
            color: notes.statusComments ? 'var(--on-surface)' : 'var(--outline)',
            fontStyle: notes.statusComments ? 'normal' : 'italic'
          }}>
            {notes.statusComments || "No notes yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
