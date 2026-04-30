import React, { useState } from 'react';
import { Star, Award } from 'lucide-react';

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([
    { id: '1', student: 'Alice Walker', mentor: 'Admin User', score: 95, feedback: 'Excellent performance throughout the internship.', date: '2026-04-25' },
  ]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Performance Evaluations</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Mentor panel and grading</p>
        </div>
        <button className="btn btn-primary">
          <Star size={18} style={{ marginRight: '8px' }} />
          New Evaluation
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              <th>Feedback</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(ev => (
              <tr key={ev.id}>
                <td style={{ fontWeight: 500 }}>{ev.student}</td>
                <td>
                  <span style={{ color: ev.score > 90 ? 'green' : 'black', fontWeight: 'bold' }}>{ev.score}/100</span>
                </td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.feedback}</td>
                <td className="mono">{ev.date}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }}>
                    <Award size={14} style={{ marginRight: '4px' }} /> Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
