import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import DashboardHome from './pages/DashboardHome';
import Clients from './pages/Clients';
import Students from './pages/Students';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Evaluations from './pages/Evaluations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <TopNavigation />
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/students" element={<Students />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;
