import React from 'react';
import { Palette, Key, LogOut, UserPlus } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Settings() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--outline-variant)' }}></div>
          <span style={{ fontWeight: '500' }}>QUENOXA Dark</span>
          <span className="badge success">Active</span>
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

      <div className="card" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-container)' }}>
        <h3 style={{ color: 'var(--error)', marginBottom: '16px' }}>Danger Zone</h3>
        <button className="btn" style={{ backgroundColor: 'var(--error)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSignOut}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
