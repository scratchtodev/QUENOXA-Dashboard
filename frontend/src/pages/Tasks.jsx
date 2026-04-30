import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, X } from 'lucide-react';
import { fetchTasks, createTask } from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending', deadline: '' });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', status: 'Pending', deadline: '' });
      loadTasks();
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Tasks & Activities</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Manage assigned tasks for students and team</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
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
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id || index}>
                <td>{(task.status || 'Pending').toLowerCase() === 'completed' ? <CheckCircle color="green" size={20}/> : <Circle color="gray" size={20}/>}</td>
                <td style={{ fontWeight: 500 }}>{task.title}</td>
                <td className="mono">{task.deadline || 'N/A'}</td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No tasks found.
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
              <h2>Assign New Task</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--on-surface-variant)" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Task Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" required value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
