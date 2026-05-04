import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Sidebar from './components/Sidebar';
import StudentSidebar from './components/StudentSidebar';
import ClientSidebar from './components/ClientSidebar';
import TopNavigation from './components/TopNavigation';

// Admin Pages
import DashboardHome from './pages/DashboardHome';
import Clients from './pages/Clients';
import Students from './pages/Students';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Evaluations from './pages/Evaluations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Members from './pages/Members';
import ActivityLog from './pages/ActivityLog';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentInternship from './pages/student/StudentInternship';
import StudentDocuments from './pages/student/StudentDocuments';
import StudentNotes from './pages/student/StudentNotes';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProjects from './pages/client/ClientProjects';
import ProjectDetails from './pages/client/ProjectDetails';
import ClientInvoices from './pages/client/ClientInvoices';
import ClientCommunication from './pages/client/ClientCommunication';
import ClientDocuments from './pages/client/ClientDocuments';

// Protected Route Wrapper with Role and Layout support
const ProtectedRoute = ({ children, allowedRoles, layoutType = 'admin' }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Enforce role-based access
  const role = user.app_metadata?.role || 'admin';
  
  if (allowedRoles && !allowedRoles.includes(role)) {
     // Unauthorized access attempt, redirect to appropriate home
     if (role === 'student') return <Navigate to="/student" replace />;
     if (role === 'client') return <Navigate to="/client" replace />;
     return <Navigate to="/" replace />;
  }
  
  const renderSidebar = () => {
    if (layoutType === 'student') return <StudentSidebar />;
    if (layoutType === 'client') return <ClientSidebar />;
    return <Sidebar />;
  };

  return (
    <div className="app-layout">
      {renderSidebar()}
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <TopNavigation />
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><DashboardHome /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Profile /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Members /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Clients /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Students /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Projects /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Tasks /></ProtectedRoute>} />
          <Route path="/evaluations" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Evaluations /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><Settings /></ProtectedRoute>} />
          <Route path="/activity-log" element={<ProtectedRoute allowedRoles={['admin']} layoutType="admin"><ActivityLog /></ProtectedRoute>} />

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']} layoutType="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']} layoutType="student"><StudentProfile /></ProtectedRoute>} />
          <Route path="/student/internship" element={<ProtectedRoute allowedRoles={['student']} layoutType="student"><StudentInternship /></ProtectedRoute>} />
          <Route path="/student/documents" element={<ProtectedRoute allowedRoles={['student']} layoutType="student"><StudentDocuments /></ProtectedRoute>} />
          <Route path="/student/notes" element={<ProtectedRoute allowedRoles={['student']} layoutType="student"><StudentNotes /></ProtectedRoute>} />

          {/* Client Routes */}
          <Route path="/client" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ClientDashboard /></ProtectedRoute>} />
          <Route path="/client/projects" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ClientProjects /></ProtectedRoute>} />
          <Route path="/client/projects/:projectId" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ProjectDetails /></ProtectedRoute>} />
          <Route path="/client/invoices" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ClientInvoices /></ProtectedRoute>} />
          <Route path="/client/communication" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ClientCommunication /></ProtectedRoute>} />
          <Route path="/client/documents" element={<ProtectedRoute allowedRoles={['client']} layoutType="client"><ClientDocuments /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
