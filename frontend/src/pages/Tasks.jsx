import React, { useState } from 'react';
import { Plus, CheckCircle, Circle } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design Mockups', assignee: 'Alice Walker', status: 'Completed', deadline: '2026-04-20' },
    { id: '2', title: 'API Integration', assignee: 'Bob Harris', status: 'Pending', deadline: '2026-04-30' },
  ]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Tasks & Activities</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage assigned tasks for students and team</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} style={{ marginRight: '8px' }} />
          Assign Task
        </button>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Task Title</th>
              <th>Assignee</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.status === 'Completed' ? <CheckCircle color="green" size={20}/> : <Circle color="gray" size={20}/>}</td>
                <td style={{ fontWeight: 500 }}>{task.title}</td>
                <td>{task.assignee}</td>
                <td className="mono">{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
