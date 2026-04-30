export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function fetchClients() {
  const response = await fetch(`${API_URL}/api/clients`);
  if (!response.ok) throw new Error('Failed to fetch clients');
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
