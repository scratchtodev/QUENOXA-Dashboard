<p align="center">
  <h1 align="center">🟢 QUENOXA Dashboard</h1>
  <p align="center">
    <strong>A comprehensive management portal for teams, clients, and students.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/FastAPI-0.111+-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Role-Based Access](#role-based-access)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [License](#license)

---

## Overview

**QUENOXA** is a full-stack management dashboard designed for organizations that need to manage **clients**, **students/interns**, **projects**, and **tasks** all in one place. It features three distinct portals — **Admin**, **Student**, and **Client** — each with its own tailored UI, sidebar navigation, and access controls powered by Supabase Auth.

The platform uses a dark neon-green aesthetic with a fully responsive layout, real-time data from Supabase, and automated document generation capabilities.

---

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | React 18, Vite 5, React Router v6, Lucide React Icons                     |
| **Backend**  | Python, FastAPI, Uvicorn                                                   |
| **Database** | Supabase (PostgreSQL) with Row-Level Security                              |
| **Auth**     | Supabase Auth (email/password, role-based via `app_metadata`)              |
| **i18n**     | i18next + react-i18next (English & Tamil)                                  |
| **Exports**  | jsPDF, jspdf-autotable, SheetJS (xlsx)                                     |
| **Deploy**   | Frontend → Netlify · Backend → Vercel (Serverless Python)                  |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                       QUENOXA                            │
│                                                          │
│  ┌─────────────┐       ┌──────────────┐    ┌──────────┐ │
│  │   Frontend   │◄─────►│   Backend    │◄──►│ Supabase │ │
│  │  React/Vite  │  API  │   FastAPI    │    │ Postgres │ │
│  │  (Netlify)   │       │  (Vercel)    │    │  + Auth  │ │
│  └─────────────┘       └──────────────┘    └──────────┘ │
│                                                          │
│  Frontend also connects directly to Supabase for:        │
│  • Authentication (login/session)                        │
│  • Real-time data queries (clients, students, etc.)      │
└──────────────────────────────────────────────────────────┘
```

---

## Features

### 🔐 Authentication & Security
- Email/password authentication via Supabase Auth
- Role-based access control (`admin`, `student`, `client`)
- Protected routes with automatic redirection
- Secure invite-link registration for new staff
- Row-Level Security (RLS) on all database tables

### 📊 Admin Portal
| Module         | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| **Dashboard**  | Overview metrics, quick actions, and recent activity feed           |
| **Clients**    | Full CRM — add, view, and manage corporate/individual clients       |
| **Students**   | Enrollment tracking, status management, course assignments          |
| **Members**    | Staff directory with live workload tracking per member              |
| **Projects**   | Project management tied to clients with status tracking             |
| **Tasks**      | Granular task engine — assignees, priorities, deadlines, statuses   |
| **Evaluations**| Student performance scoring and qualitative feedback                |
| **Reports**    | Automated generation of reports, invoices, and certificates         |
| **Activity Log** | Platform-wide audit trail of actions                              |
| **Settings**   | Theme toggle (light/dark), invite links, session management         |
| **Profile**    | Personal details and individual performance metrics                 |

### 🎓 Student Portal
- Personal dashboard with internship overview
- Profile management
- Internship progress tracking
- Document upload and management
- Personal notes

### 🏢 Client Portal
- Client-specific dashboard
- Project overview and detailed project views
- Invoice tracking and management
- Communication center
- Document management

### 🌍 Other Features
- **Internationalization** — English and Tamil language support
- **Dark Neon Theme** — Signature chartreuse/lime-on-black design
- **PDF & Excel Exports** — Export data to PDF and XLSX formats
- **Responsive Design** — Works across desktop and mobile

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **A Supabase project** ([supabase.com](https://supabase.com))

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. Interactive docs at `/docs`.

### Environment Variables

#### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000
```

#### Backend (`backend/.env`)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> [!CAUTION]
> Never commit the `SUPABASE_SERVICE_ROLE_KEY` to version control. It has full admin access to your database and bypasses RLS.

---

## Database Schema

Run `backend/schema.sql` in the Supabase SQL Editor to initialize the tables.

```
┌───────────────┐       ┌───────────────┐
│    clients    │       │   students    │
├───────────────┤       ├───────────────┤
│ id (PK)       │       │ id (PK)       │
│ name          │       │ user_id (FK)  │──► auth.users
│ company       │       │ name          │
│ email         │       │ email         │
│ phone         │       │ university    │
│ status        │       │ status        │
│ created_at    │       │ enrollment_dt │
└──────┬────────┘       └──────┬────────┘
       │                       │
       ▼                       ▼
┌───────────────┐       ┌───────────────┐
│   projects    │       │  evaluations  │
├───────────────┤       ├───────────────┤
│ id (PK)       │       │ id (PK)       │
│ client_id(FK) │       │ student_id(FK)│
│ name          │       │ mentor_id(FK) │──► auth.users
│ description   │       │ score (0–100) │
│ status        │       │ feedback      │
│ deadline      │       │ created_at    │
└──────┬────────┘       └───────────────┘
       │
       ▼
┌───────────────┐       ┌───────────────┐
│    tasks      │       │   payments    │
├───────────────┤       ├───────────────┤
│ id (PK)       │       │ id (PK)       │
│ project_id(FK)│       │ client_id(FK) │
│ student_id(FK)│       │ amount        │
│ title         │       │ status        │
│ description   │       │ invoice_date  │
│ status        │       │ created_at    │
│ deadline      │       └───────────────┘
└───────────────┘
```

All tables have **Row-Level Security** enabled. Configure RLS policies based on your authentication needs.

---

## Role-Based Access

QUENOXA uses Supabase `app_metadata.role` to enforce access:

| Role      | Default Route | Accessible Modules                                           |
| --------- | ------------- | ------------------------------------------------------------ |
| `admin`   | `/`           | Full access — Dashboard, Clients, Students, Tasks, etc.      |
| `student` | `/student`    | Student Dashboard, Profile, Internship, Documents, Notes     |
| `client`  | `/client`     | Client Dashboard, Projects, Invoices, Communication, Docs    |

Unauthorized route access automatically redirects users to their role's home page.

---

## Internationalization

The app supports multiple languages via `i18next`:

| Code | Language |
| ---- | -------- |
| `en` | English  |
| `ta` | Tamil    |

Language preference is persisted in `localStorage` under the key `quenoxa-lang`.

To add a new language, create a new folder under `frontend/src/locales/<code>/translation.json` and register it in `frontend/src/i18n.js`.

---

## Deployment

### Frontend → Netlify

The project includes a `netlify.toml` with SPA redirect rules:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Set the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`) in the Netlify dashboard under **Site Settings → Environment Variables**.

### Backend → Vercel

The project includes a `vercel.json` for serverless Python deployment:

```json
{
  "version": 2,
  "builds": [{ "src": "main.py", "use": "@vercel/python" }],
  "routes": [{ "src": "/(.*)", "dest": "main.py" }]
}
```

Set the environment variables (`SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) in the Vercel dashboard under **Settings → Environment Variables**.

---

## Project Structure

```
QUENOXA/
├── frontend/
│   ├── src/
│   │   ├── components/          # Shared layout components
│   │   │   ├── Sidebar.jsx          # Admin sidebar navigation
│   │   │   ├── StudentSidebar.jsx   # Student portal sidebar
│   │   │   ├── ClientSidebar.jsx    # Client portal sidebar
│   │   │   └── TopNavigation.jsx    # Top nav bar (search, profile, lang)
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication state provider
│   │   ├── locales/                 # i18n translation files
│   │   │   ├── en/translation.json
│   │   │   └── ta/translation.json
│   │   ├── pages/                   # Admin page components
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── Clients.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── Members.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Evaluations.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ActivityLog.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── student/            # Student portal pages
│   │   │   └── client/             # Client portal pages
│   │   ├── utils/
│   │   │   └── exportUtils.js       # PDF & Excel export helpers
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── api.js                   # API client for backend calls
│   │   ├── i18n.js                  # i18next configuration
│   │   ├── index.css                # Global styles & design tokens
│   │   ├── main.jsx                 # Vite entry point
│   │   └── supabaseClient.js        # Supabase client initialization
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── netlify.toml
├── backend/
│   ├── main.py                  # FastAPI application & routes
│   ├── schema.sql               # Core database schema
│   ├── phase2_migration.sql     # Extended schema migrations
│   ├── requirements.txt         # Python dependencies
│   └── vercel.json              # Vercel deployment config
├── palette.css                  # Design system color tokens
├── overview.md                  # Functional specification
└── README.md                    # ← You are here
```

---

## API Reference

| Method   | Endpoint                    | Description                              |
| -------- | --------------------------- | ---------------------------------------- |
| `GET`    | `/`                         | Health check — returns connection status |
| `GET`    | `/api/health`               | Simple health probe                      |
| `POST`   | `/api/create-portal-user`   | Create a new student/client auth user    |
| `GET`    | `/api/clients`              | List all clients                         |
| `POST`   | `/api/clients`              | Create a new client                      |
| `GET`    | `/api/students`             | List all students                        |
| `POST`   | `/api/students`             | Create a new student                     |
| `GET`    | `/api/tasks`                | List all tasks                           |
| `POST`   | `/api/tasks`                | Create a new task                        |
| `GET`    | `/api/projects`             | List all projects                        |
| `POST`   | `/api/projects`             | Create a new project                     |
| `GET`    | `/api/evaluations`          | List all evaluations                     |
| `POST`   | `/api/evaluations`          | Create a new evaluation                  |
| `GET`    | `/api/members`              | List staff members with workload stats   |
| `POST`   | `/api/reports/generate`     | Trigger report generation                |
| `POST`   | `/api/certificates/generate`| Trigger certificate generation           |

> [!TIP]
> Visit `http://localhost:8000/docs` for the full interactive Swagger UI when running locally.

---

## License

This project is proprietary. All rights reserved.
