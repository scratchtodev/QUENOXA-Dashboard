import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserCircle, Briefcase, FileText, StickyNote } from 'lucide-react';

export default function StudentSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
    { name: 'My Profile', path: '/student/profile', icon: <UserCircle size={20} /> },
    { name: 'My Internship', path: '/student/internship', icon: <Briefcase size={20} /> },
    { name: 'Documents', path: '/student/documents', icon: <FileText size={20} /> },
    { name: 'My Notes', path: '/student/notes', icon: <StickyNote size={20} /> },
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
            const fallback = document.getElementById('fallback-student-logo-text');
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <h2 id="fallback-student-logo-text" style={{ display: 'none', margin: 0, color: 'var(--primary)', letterSpacing: '2px', fontWeight: '800' }}>
          QUENOXA
        </h2>
      </div>
      <div style={{ padding: '0 24px', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Student Portal
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/student' && location.pathname.startsWith(item.path));
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
