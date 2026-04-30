import { Bell, Search, User, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function TopNavigation() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderBottom: '1px solid var(--outline-variant)',
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
            border: '1px solid var(--outline-variant)',
            backgroundColor: 'var(--surface)',
            color: 'var(--on-surface)',
            fontSize: '14px'
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)' }}>
          <Bell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
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
            <span style={{ fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }} 
                  onMouseOver={e => e.target.style.color = 'var(--primary)'}
                  onMouseOut={e => e.target.style.color = 'inherit'}
            >
              {user?.user_metadata?.full_name || user?.email || 'Admin'}
            </span>
          </Link>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              color: 'var(--on-surface-variant)', marginLeft: '8px',
              display: 'flex', alignItems: 'center'
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
