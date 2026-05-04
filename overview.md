# QUENOXA Dashboard - Functional Overview

This document outlines the core pages, features, and functional elements available within the QUENOXA Dashboard. The platform is designed to provide a comprehensive management system for teams, clients, students, and tasks.

---

## 📌 Main Navigation & Pages

The dashboard is divided into several dedicated modules, accessible via the main sidebar.

### 1. Dashboard (Home)
The central hub for all users upon logging in.
*   **Overview Metrics:** Displays high-level statistics including Total Active Clients, Active Students, Pending Evaluations, and Tasks Completed.
*   **Quick Actions:** Large, accessible buttons that allow users to immediately jump to common workflows:
    *   *Assign New Task* -> Routes to the Tasks page.
    *   *Add Student* -> Routes to the Students page.
    *   *Generate Report* -> Routes to the Reports module.
*   **Recent Activity:** A quick-glance feed showing the latest updates and movements across the platform.

### 2. Clients
A dedicated CRM module for managing external corporate or individual clients.
*   **Functionality:** View a complete list of active clients, including their status (Active/Inactive) and associated company details.
*   **Actions:** Add new clients to the database.

### 3. Students
A specialized module for educational or training tracking.
*   **Functionality:** Lists all enrolled students along with their current enrollment status and the specific course or program they are attending.
*   **Actions:** Enroll new students and track their progress through the system.

### 4. Members (Admin/Staff Directory)
An internal team management page designed to give administrators a clear view of workload distribution.
*   **Functionality:** Displays all registered Admins and Staff members on the platform.
*   **Workload Tracking:** Each member card dynamically calculates and displays their specific task workload, showing:
    *   *Total Tasks Assigned*
    *   *Completed Tasks*
    *   *Remaining Tasks*
*   **Use Case:** Allows management to see who is overworked and who has the capacity to take on new assignments.

### 5. Projects
High-level organizational buckets that group tasks together.
*   **Functionality:** Lists all active and completed projects, showing the project name, description, current status, and the Client/Student it is associated with.
*   **Actions:** Create new projects and assign them to specific clients.

### 6. Tasks
The granular workflow engine of the platform.
*   **Functionality:** A comprehensive table of all actionable items. It tracks exactly what needs to be done, who is responsible, and when it is due.
*   **Data Points:** Shows Task Title, Associated Project, Assigned Member, Priority Level (High/Medium/Low), and Deadline.
*   **Status Tracking:** Utilizes color-coded badges to instantly identify if a task is *Pending* (Yellow) or *Completed* (Green).
*   **Actions:** Create new tasks, assign them to team members, and update their statuses as work progresses.

### 7. Evaluations
A specialized grading and feedback module for students.
*   **Functionality:** Allows staff to submit and track performance evaluations for specific students over time.
*   **Data Points:** Tracks the Student's Name, Evaluation Date, numerical Score, and detailed qualitative Feedback.
*   **Actions:** Submit new evaluations that are permanently tied to the student's record.

### 8. Reports
An automated document generation hub.
*   **Functionality:** Designed to take database information and generate official, exportable documents.
*   **Supported Types:** General Reports, Invoices, and official Certificates.
*   **Actions:** Select a document type and trigger the backend system to generate the required file.

### 9. Profile
A personalized view for the currently logged-in user.
*   **Functionality:** Displays the user's personal details and their specific performance metrics (e.g., how many tasks they have personally completed vs. how many remain).

### 10. Settings
The configuration hub for the platform.
*   **Appearance:** Allows users to seamlessly toggle the entire platform between the Light Theme and the True Dark Theme.
*   **Authentication:** Provides tools for managing security, such as generating secure invite links to register new staff members to the platform.
*   **Session Management:** Secure Logout functionality.

---

## 🔐 Core System Elements

*   **Authentication System:** The platform is entirely locked down. Users must have a registered account and authenticate via the Login page to view any of the modules listed above.
*   **Role-Based Data (Implicit):** The database securely tracks which user created which task or evaluation, ensuring strict accountability across the organization.
