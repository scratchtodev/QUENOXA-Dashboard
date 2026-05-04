import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, CheckSquare, FolderGit2, Star, FileText, Settings, UserCog, Activity } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Members', path: '/members', icon: UserCog },
    { name: 'Clients', path: '/clients', icon: Users },
    { name: 'Students', path: '/students', icon: UserSquare2 },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Evaluations', path: '/evaluations', icon: Star },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Activity Log', path: '/activity-log', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
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
            document.getElementById('fallback-logo-text').style.display = 'block';
          }}
        />
        <h2 id="fallback-logo-text" style={{ display: 'none', margin: 0, color: 'var(--primary)', letterSpacing: '2px', fontWeight: '800' }}>
          QUENOXA
        </h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: isActive ? '#374151' : 'transparent',
                borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                paddingLeft: isActive ? '20px' : '24px',
                color: isActive ? '#F9FAFB' : '#D1D5DB'
              }}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
