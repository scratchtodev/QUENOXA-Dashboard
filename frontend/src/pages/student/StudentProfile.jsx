import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Save } from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();
  
  // Editable fields
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: Connect to Supabase to update student profile
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>My Profile</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage your personal details and contact information.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Read-Only Academic Info */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid var(--outline-variant)' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', 
              backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <UserCircle size={48} />
            </div>
            <h3 style={{ margin: '0 0 8px 0' }}>{user?.user_metadata?.full_name || 'Student Name'}</h3>
            <span className="badge success">ID: STU-2026-001</span>
          </div>
          
          <div style={{ padding: '24px 0 0 0' }}>
            <h4 style={{ marginBottom: '16px', color: 'var(--on-surface-variant)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Academic Details (Read-Only)</h4>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--outline)' }}>College Name</div>
              <div style={{ fontWeight: '500' }}>SRM Institute of Science and Technology</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--outline)' }}>Department</div>
              <div style={{ fontWeight: '500' }}>Computer Science Engineering</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--outline)' }}>Year of Study</div>
              <div style={{ fontWeight: '500' }}>3rd Year</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--outline)' }}>Location</div>
              <div style={{ fontWeight: '500' }}>Chennai, India</div>
            </div>
          </div>
        </div>

        {/* Editable Profile Form */}
        <div className="card">
          <h3 style={{ marginBottom: '24px' }}>Personal Information</h3>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="form-group">
                <label>Gender (Optional)</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth (Optional)</label>
                <input 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : <><Save size={18} style={{ marginRight: '8px' }} /> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
