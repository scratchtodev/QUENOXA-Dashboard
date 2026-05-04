import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

export default function StudentDocuments() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const docSlots = [
    { id: 'resume', name: t('documents.resume'), column: 'resume_url' },
    { id: 'idProof', name: t('documents.idProof'), column: 'id_proof_url' },
    { id: 'offerLetter', name: t('documents.offerLetter'), column: 'offer_letter_url' },
    { id: 'certificate', name: t('documents.certificate'), column: 'certificate_url' },
  ];

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('resume_url, id_proof_url, offer_letter_url, certificate_url')
        .eq('user_id', user.id)
        .single();
      if (!error) setStudentData(data);
    } catch (err) {
      console.error('Error loading student docs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDocStatus = (column) => {
    if (!studentData) return 'Missing';
    return studentData[column] ? 'Uploaded' : 'Missing';
  };

  const handleUpload = async (docSlot) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(docSlot.id);
      const filePath = `${user.id}/${docSlot.id}_${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('student-documents')
        .upload(filePath, file);

      if (uploadError) {
        alert('Upload failed: ' + uploadError.message);
        setUploading(null);
        return;
      }

      // Update the URL column in students table
      const { error: updateError } = await supabase
        .from('students')
        .update({ [docSlot.column]: filePath })
        .eq('user_id', user.id);

      if (updateError) {
        alert('Failed to save reference: ' + updateError.message);
      } else {
        await loadStudentData();
      }
      setUploading(null);
    };
    input.click();
  };

  const handleDownload = async (column) => {
    const filePath = studentData?.[column];
    if (!filePath) return;

    const { data, error } = await supabase.storage
      .from('student-documents')
      .createSignedUrl(filePath, 3600); // 60 min expiry

    if (error) {
      alert('Download failed: ' + error.message);
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Uploaded': return <span className="badge success"><CheckCircle size={12} style={{ marginRight: '4px' }}/> {t('status.uploaded')}</span>;
      case 'Missing': return <span className="badge error"><AlertCircle size={12} style={{ marginRight: '4px' }}/> {t('status.missing')}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1>{t('documents.title')}</h1>
        <p style={{ color: 'var(--on-surface-variant)' }}>{t('documents.studentSubtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {docSlots.map((doc) => {
          const status = getDocStatus(doc.column);
          return (
            <div key={doc.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: status === 'Missing' ? 'var(--error-container)' : 'var(--primary-container)', 
                  color: status === 'Missing' ? 'var(--on-error-container)' : 'var(--on-primary-container)',
                  borderRadius: '12px' 
                }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{doc.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                    {getStatusBadge(status)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleUpload(doc)}
                  disabled={uploading === doc.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Upload size={16} /> {uploading === doc.id ? t('buttons.uploading') : t('buttons.upload')}
                </button>
                {status === 'Uploaded' && (
                  <button className="btn btn-primary" onClick={() => handleDownload(doc.column)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={16} /> {t('buttons.download')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
