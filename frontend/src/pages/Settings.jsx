import React, { useState } from 'react';
import { Palette, Key, LogOut, UserPlus } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--surface', '#1e293b');
      root.style.setProperty('--surface-container-lowest', '#1e293b'); // Cards
      root.style.setProperty('--surface-container', '#334155'); // Card hover/active
      root.style.setProperty('--surface-container-low', '#0f172a');
      root.style.setProperty('--background', '#020617'); // Main content area (deepest)
      root.style.setProperty('--on-background', '#f8fafc');
      root.style.setProperty('--on-surface', '#f8fafc');
      root.style.setProperty('--on-surface-variant', '#94a3b8');
      root.style.setProperty('--outline-variant', '#334155'); // Borders
      root.style.setProperty('--primary-container', '#064e3b');
      root.style.setProperty('--on-primary-container', '#d1fae5');
      
      // Fix secondary buttons in dark mode
      root.style.setProperty('--secondary', '#f8fafc'); 
      root.style.setProperty('--secondary-container', '#334155'); 
      root.style.setProperty('--on-secondary-container', '#f8fafc');
      
      // Sidebar dark specific
      root.style.setProperty('--sidebar-bg', '#0f172a'); // Slightly lighter than main bg
      root.style.setProperty('--sidebar-border', '#1e293b');
      root.style.setProperty('--sidebar-hover', '#1e293b');
    } else {
      // Light theme (default)
      root.style.removeProperty('--surface');
      root.style.removeProperty('--surface-container');
      root.style.removeProperty('--surface-container-low');
      root.style.removeProperty('--surface-container-lowest');
      root.style.removeProperty('--background');
      root.style.removeProperty('--on-background');
      root.style.removeProperty('--on-surface');
      root.style.removeProperty('--on-surface-variant');
      root.style.removeProperty('--outline-variant');
      root.style.removeProperty('--primary-container');
      root.style.removeProperty('--on-primary-container');
      
      root.style.removeProperty('--secondary');
      root.style.removeProperty('--secondary-container');
      root.style.removeProperty('--on-secondary-container');
      
      root.style.removeProperty('--sidebar-bg');
      root.style.removeProperty('--sidebar-border');
      root.style.removeProperty('--sidebar-hover');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>Settings</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>System configuration and preferences</p>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Palette size={20} /> Appearance
        </h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className={`btn ${currentTheme === 'light' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleThemeChange('light')}>Light Theme</button>
          <button className={`btn ${currentTheme === 'dark' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleThemeChange('dark')}>Dark Theme</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Key size={20} /> Authentication (Supabase)
        </h3>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>Manage 2FA and connected accounts.</p>
        <button className="btn btn-secondary" onClick={() => alert("TOTP Setup will open in a new window.")}>Enable Google Authenticator (TOTP)</button>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <UserPlus size={20} /> User Management
        </h3>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>
          Invite new members to the Dashboard. Copy this link and send it to them so they can securely register their account.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/register');
            alert("Invite link copied to clipboard!");
          }}
        >
          Copy Invite Link
        </button>
      </div>

      <div className="card" style={{ borderColor: 'var(--error-container)', backgroundColor: '#fffcfc' }}>
        <h3 style={{ color: 'var(--error)', marginBottom: '16px' }}>Danger Zone</h3>
        <button className="btn" style={{ backgroundColor: 'var(--error)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSignOut}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
