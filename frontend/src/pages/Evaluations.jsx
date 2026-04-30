import React, { useState, useEffect } from 'react';
import { Star, Award, X } from 'lucide-react';
import { fetchEvaluations, createEvaluation, generateDocument } from '../api';

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ score: 0, feedback: '' });

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = async () => {
    try {
      const data = await fetchEvaluations();
      setEvaluations(data);
    } catch (error) {
      console.error("Failed to load evaluations", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createEvaluation(formData);
      setIsModalOpen(false);
      setFormData({ score: 0, feedback: '' });
      loadEvaluations();
    } catch (error) {
      console.error("Failed to save evaluation", error);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const result = await generateDocument('certificate');
      alert(result.message + ' ' + result.url);
    } catch (error) {
      console.error("Failed to generate certificate", error);
      alert("Failed to generate certificate.");
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Performance Evaluations</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Mentor panel and grading</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Star size={18} style={{ marginRight: '8px' }} />
          New Evaluation
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Evaluation ID</th>
              <th>Score</th>
              <th>Feedback</th>
              <th style={{ textAlign: 'right' }}>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((ev, index) => (
              <tr key={ev.id || index}>
                <td className="mono">EVAL-{(ev.id || index).toString().padStart(3, '0')}</td>
                <td>
                  <span style={{ color: ev.score > 90 ? 'green' : 'black', fontWeight: 'bold' }}>{ev.score}/100</span>
                </td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.feedback}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={handleGenerateCertificate}>
                    <Award size={14} style={{ marginRight: '4px' }} /> Generate
                  </button>
                </td>
              </tr>
            ))}
            {evaluations.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No evaluations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Add New Evaluation</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--on-surface-variant)" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Score (0-100)</label>
                <input required type="number" min="0" max="100" value={formData.score} onChange={e => setFormData({...formData, score: parseInt(e.target.value)})} />
              </div>
              <div className="form-group">
                <label>Feedback</label>
                <textarea required rows="4" value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
