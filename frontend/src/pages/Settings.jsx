import React from 'react';
import { Palette, Key, LogOut, UserPlus } from 'lucide-react';

export default function Settings() {
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
          <button className="btn btn-secondary">Light Theme</button>
          <button className="btn btn-secondary">Dark Theme</button>
          <button className="btn btn-secondary">Green Theme</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Key size={20} /> Authentication (Supabase)
        </h3>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>Manage 2FA and connected accounts.</p>
        <button className="btn btn-secondary">Enable Google Authenticator (TOTP)</button>
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
        <button className="btn" style={{ backgroundColor: 'var(--error)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
