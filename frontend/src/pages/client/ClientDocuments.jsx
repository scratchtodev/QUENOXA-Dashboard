import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

export default function ClientDocuments() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  const docSlots = [
    { id: 'proposal', name: t('documents.proposal'), column: 'proposal_url' },
    { id: 'contract', name: t('documents.contract'), column: 'contract_url' },
    { id: 'requirements', name: t('documents.requirements'), column: 'requirements_url' },
    { id: 'delivery', name: t('documents.delivery'), column: 'delivery_url' },
  ];

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('proposal_url, contract_url, requirements_url, delivery_url')
        .eq('user_id', user.id)
        .single();
      if (!error) setClientData(data);
    } catch (err) {
      console.error('Error loading client docs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDocStatus = (column) => {
    if (!clientData) return 'Missing';
    return clientData[column] ? 'Uploaded' : 'Missing';
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
        .from('client-documents')
        .upload(filePath, file);

      if (uploadError) {
        alert('Upload failed: ' + uploadError.message);
        setUploading(null);
        return;
      }

      const { error: updateError } = await supabase
        .from('clients')
        .update({ [docSlot.column]: filePath })
        .eq('user_id', user.id);

      if (updateError) {
        alert('Failed to save reference: ' + updateError.message);
      } else {
        await loadClientData();
      }
      setUploading(null);
    };
    input.click();
  };

  const handleDownload = async (column) => {
    const filePath = clientData?.[column];
    if (!filePath) return;

    const { data, error } = await supabase.storage
      .from('client-documents')
      .createSignedUrl(filePath, 3600);

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
        <p style={{ color: 'var(--on-surface-variant)' }}>{t('documents.clientSubtitle')}</p>
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
                  <div style={{ fontSize: '13px' }}>{getStatusBadge(status)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => handleUpload(doc)} disabled={uploading === doc.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
