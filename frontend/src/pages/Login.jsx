import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Lock, Mail, Shield, User, Briefcase } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin', 'student', 'client'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // First, check if the placeholder key is still there
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-supabase-project-url')) {
      setError("Please add your Supabase URL and Key to the .env file to enable login.");
      setLoading(false);
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Role-based routing and verification
    const actualRole = data.user?.app_metadata?.role || 'admin';
    
    // Enforce that they used the correct portal toggle
    if (actualRole !== selectedRole) {
      setError(`Account mismatch. Please use the ${actualRole.charAt(0).toUpperCase() + actualRole.slice(1)} login portal.`);
      await supabase.auth.signOut(); // Log them out since they used the wrong portal
      setLoading(false);
      return;
    }

    if (actualRole === 'student') {
      // Activity logging for students
      await supabase.from('students').update({ 
        last_login: new Date().toISOString(), 
        login_count: (await supabase.from('students').select('login_count').eq('user_id', data.user.id).single()).data?.login_count + 1 || 1
      }).eq('user_id', data.user.id);
      navigate('/student');
    } else if (actualRole === 'client') {
      // Activity logging for clients
      await supabase.from('clients').update({ 
        last_login: new Date().toISOString(), 
        login_count: (await supabase.from('clients').select('login_count').eq('user_id', data.user.id).single()).data?.login_count + 1 || 1
      }).eq('user_id', data.user.id);
      navigate('/client');
    } else {
      navigate('/'); // Admin fallback
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      width: '100vw',
      padding: '20px'
    }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '12px', 
            backgroundColor: 'var(--primary)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 16px auto'
          }}>
            <Lock size={24} />
          </div>
          <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>QUENOXA</h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>Select your portal and sign in</p>
        </div>

        {/* Role Toggle Tabs */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: 'var(--surface-container-highest)', 
          padding: '6px', 
          borderRadius: '12px', 
          marginBottom: '24px',
          gap: '4px'
        }}>
          <button 
            type="button"
            onClick={() => { setSelectedRole('admin'); setError(''); }}
            style={{
              flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px',
              backgroundColor: selectedRole === 'admin' ? 'var(--surface)' : 'transparent',
              color: selectedRole === 'admin' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: selectedRole === 'admin' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              fontWeight: selectedRole === 'admin' ? '600' : '400',
              cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px'
            }}
          >
            <Shield size={16} /> Member
          </button>
          <button 
            type="button"
            onClick={() => { setSelectedRole('student'); setError(''); }}
            style={{
              flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px',
              backgroundColor: selectedRole === 'student' ? 'var(--surface)' : 'transparent',
              color: selectedRole === 'student' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: selectedRole === 'student' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              fontWeight: selectedRole === 'student' ? '600' : '400',
              cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px'
            }}
          >
            <User size={16} /> Student
          </button>
          <button 
            type="button"
            onClick={() => { setSelectedRole('client'); setError(''); }}
            style={{
              flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px',
              backgroundColor: selectedRole === 'client' ? 'var(--surface)' : 'transparent',
              color: selectedRole === 'client' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: selectedRole === 'client' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              fontWeight: selectedRole === 'client' ? '600' : '400',
              cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px'
            }}
          >
            <Briefcase size={16} /> Client
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={`${selectedRole}@example.com`}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '24px', justifyContent: 'center', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
          Secured by Supabase Auth
        </p>
      </div>
    </div>
  );
}
