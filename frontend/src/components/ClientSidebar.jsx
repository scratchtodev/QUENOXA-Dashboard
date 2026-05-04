import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, CreditCard, MessageSquare } from 'lucide-react';

export default function ClientSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/client', icon: <LayoutDashboard size={20} /> },
    { name: 'My Projects', path: '/client/projects', icon: <FolderKanban size={20} /> },
    { name: 'Documents', path: '/client/documents', icon: <FileText size={20} /> },
    { name: 'Invoices', path: '/client/invoices', icon: <CreditCard size={20} /> },
    { name: 'Communication', path: '/client/communication', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', height: '80px' }}>
        <img 
          src="/logo.png" 
          alt="QUENOXA Logo" 
          style={{ height: '32px', maxWidth: '100%', objectFit: 'contain' }} 
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = document.getElementById('fallback-client-logo-text');
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <h2 id="fallback-client-logo-text" style={{ display: 'none', margin: 0, color: 'var(--primary)', letterSpacing: '2px', fontWeight: '800' }}>
          QUENOXA
        </h2>
      </div>
      <div style={{ padding: '0 24px', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Client Portal
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/client' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name} 
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: isActive ? 'var(--sidebar-hover)' : 'transparent',
                color: isActive ? 'var(--sidebar-text)' : 'var(--sidebar-link)',
                borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                paddingLeft: isActive ? '20px' : '24px'
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
