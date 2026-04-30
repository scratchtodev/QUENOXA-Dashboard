export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function fetchClients() {
  const response = await fetch(`${API_URL}/api/clients`);
  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
}

export async function fetchMembers() {
  const response = await fetch(`${API_URL}/api/members`);
  if (!response.ok) throw new Error('Failed to fetch members');
  return response.json();
}

export async function createClient(clientData) {
  const response = await fetch(`${API_URL}/api/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientData),
  });
  if (!response.ok) throw new Error('Failed to create client');
  return response.json();
}

export async function fetchStudents() {
  const response = await fetch(`${API_URL}/api/students`);
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json();
}

export async function createStudent(studentData) {
  const response = await fetch(`${API_URL}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error('Failed to create student');
  return response.json();
}

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/api/tasks`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function createProject(projectData) {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function fetchEvaluations() {
  const response = await fetch(`${API_URL}/api/evaluations`);
  if (!response.ok) throw new Error('Failed to fetch evaluations');
  return response.json();
}

export async function createEvaluation(evalData) {
  const response = await fetch(`${API_URL}/api/evaluations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evalData),
  });
  if (!response.ok) throw new Error('Failed to create evaluation');
  return response.json();
}

export async function generateDocument(type, data) {
  const endpoint = type === 'report' ? '/api/reports/generate' : '/api/certificates/generate';
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {}),
  });
  if (!response.ok) throw new Error('Failed to generate document');
  return response.json();
}
