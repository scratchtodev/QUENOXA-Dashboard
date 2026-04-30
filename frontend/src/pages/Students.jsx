import React, { useState } from 'react';
import { Search, Plus, MoreVertical } from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState([
    { id: '1', name: 'Alice Walker', university: 'State University', major: 'Computer Science', status: 'Active' },
    { id: '2', name: 'Bob Harris', university: 'Tech Institute', major: 'Data Science', status: 'Completed' },
  ]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Student Internship Tracking</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage interns, tasks, and progress</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} style={{ marginRight: '8px' }} />
          Add Student
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>University</th>
              <th>Major</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td className="mono">STU-00{student.id}</td>
                <td style={{ fontWeight: 500 }}>{student.name}</td>
                <td>{student.university}</td>
                <td>{student.major}</td>
                <td>
                  <span className={`badge ${student.status === 'Active' ? 'success' : 'pending'}`}>{student.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--outline)' }}>
                    <MoreVertical size={16} />
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
