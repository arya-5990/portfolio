import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Settings, User, Code2, Briefcase, FolderGit2, Award, Phone } from 'lucide-react';
import GeneralSettings from './pages/GeneralSettings';
import AboutSettings from './pages/AboutSettings';
import SkillsSettings from './pages/SkillsSettings';
import ExperienceSettings from './pages/ExperienceSettings';
import ProjectsSettings from './pages/ProjectsSettings';
import CertificationsSettings from './pages/CertificationsSettings';
import ContactSettings from './pages/ContactSettings';
import Login from './pages/Login';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Portfolio Admin</h2>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>General</span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>About Me</span>
        </NavLink>
        <NavLink to="/skills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Code2 size={20} />
          <span>Skills</span>
        </NavLink>
        <NavLink to="/experience" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Briefcase size={20} />
          <span>Experience</span>
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FolderGit2 size={20} />
          <span>Projects</span>
        </NavLink>
        <NavLink to="/certifications" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Award size={20} />
          <span>Certifications</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Phone size={20} />
          <span>Contact</span>
        </NavLink>
      </nav>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if session storage has auth token
    if (sessionStorage.getItem('isAdminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GeneralSettings />} />
          <Route path="/about" element={<AboutSettings />} />
          <Route path="/skills" element={<SkillsSettings />} />
          <Route path="/experience" element={<ExperienceSettings />} />
          <Route path="/projects" element={<ProjectsSettings />} />
          <Route path="/certifications" element={<CertificationsSettings />} />
          <Route path="/contact" element={<ContactSettings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
