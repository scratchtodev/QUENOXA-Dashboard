import { Bell, Search, User } from 'lucide-react';

export default function TopNavigation() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
        <input 
          type="text" 
          placeholder="Search projects, clients..." 
          style={{
            width: '100%',
            padding: '8px 16px 8px 36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E5E7EB',
            backgroundColor: 'var(--surface)',
            fontSize: '14px'
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)' }}>
          <Bell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-container)',
            color: 'var(--on-primary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            <User size={18} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</span>
        </div>
      </div>
    </header>
  );
}
