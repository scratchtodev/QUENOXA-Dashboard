import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from supabase import create_client, Client
from dotenv import load_dotenv
import httpx

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Base URL for Supabase Auth Admin API (strip /rest/v1/ if present)
SUPABASE_BASE_URL = SUPABASE_URL.replace("/rest/v1/", "").replace("/rest/v1", "") if SUPABASE_URL else ""

# Initialize Supabase client (anon key for normal queries)
supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("http"):
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase: {e}")
        supabase = None

app = FastAPI(title="QUENOXA Dashboard API", description="API for Client and Student Tracking Systems")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the Netlify domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to QUENOXA Dashboard API", "supabase_connected": supabase is not None}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

# --- Portal User Creation (Admin Only) ---
class CreatePortalUserRequest(BaseModel):
    email: str
    password: str
    role: str  # 'student' or 'client'
    name: str
    extra_data: Optional[dict] = None

@app.post("/api/create-portal-user")
async def create_portal_user(req: CreatePortalUserRequest):
    if not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=500, detail="Service role key not configured. Add SUPABASE_SERVICE_ROLE_KEY to backend .env")
    
    if req.role not in ['student', 'client']:
        raise HTTPException(status_code=400, detail="Role must be 'student' or 'client'")

    # Step 1: Create the auth user via Supabase Admin API
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SUPABASE_BASE_URL}/auth/v1/admin/users",
            headers={
                "apikey": SUPABASE_SERVICE_ROLE_KEY,
                "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "email": req.email,
                "password": req.password,
                "email_confirm": True,
                "app_metadata": {"role": req.role},
                "user_metadata": {"full_name": req.name}
            }
        )
    
    if response.status_code not in [200, 201]:
        detail = response.json().get("msg", response.text)
        raise HTTPException(status_code=response.status_code, detail=f"Auth user creation failed: {detail}")
    
    new_user = response.json()
    new_user_id = new_user.get("id")

    # Step 2: Create the linked record in the correct table
    table = "students" if req.role == "student" else "clients"
    record_data = {"name": req.name, "email": req.email, "user_id": new_user_id, "status": "Active"}
    
    # Merge any extra fields from the form
    if req.extra_data:
        record_data.update(req.extra_data)
    
    if supabase:
        supabase.table(table).insert(record_data).execute()
    
    return {"message": f"{req.role.capitalize()} account created successfully", "user_id": new_user_id}

# --- Members (Admins/Staff) Routes ---
@app.get("/api/members")
def get_members():
    # Mock data for members and their task counts
    return [
        {"id": "m1", "name": "Admin User", "email": "admin@quenoxa.com", "role": "Administrator", "tasks": {"total": 12, "completed": 8, "remaining": 4}},
        {"id": "m2", "name": "Alice Walker", "email": "alice@quenoxa.com", "role": "Mentor", "tasks": {"total": 5, "completed": 5, "remaining": 0}},
        {"id": "m3", "name": "Bob Harris", "email": "bob@quenoxa.com", "role": "Staff", "tasks": {"total": 8, "completed": 2, "remaining": 6}}
    ]

# --- Client Tracking System Routes ---
@app.get("/api/clients")
def get_clients():
    if not supabase:
        return [{"id": "1", "name": "Acme Corp (Mock)", "status": "Active"}]
    
    response = supabase.table("clients").select("*").execute()
    return response.data

@app.post("/api/clients")
def create_client(client_data: dict):
    if not supabase:
        return {"message": "Mock Client created"}
        
    response = supabase.table("clients").insert(client_data).execute()
    return response.data

# --- Student Internship Tracking Routes ---
@app.get("/api/students")
def get_students():
    if not supabase:
        return [{"id": "1", "name": "John Doe (Mock)", "status": "Intern"}]
        
    response = supabase.table("students").select("*").execute()
    return response.data

@app.post("/api/students")
def create_student(student_data: dict):
    if not supabase:
        return {"message": "Mock Student created"}
        
    response = supabase.table("students").insert(student_data).execute()
    return response.data

# --- Tasks Routes ---
@app.get("/api/tasks")
def get_tasks():
    if not supabase:
        return [
            {"id": "1", "title": "Design Mockups", "status": "Completed", "deadline": "2023-12-01"},
            {"id": "2", "title": "API Integration", "status": "Pending", "deadline": "2024-01-15"}
        ]
        
    response = supabase.table("tasks").select("*").execute()
    return response.data

# --- Document Generation Routes ---
@app.post("/api/tasks")
def create_task(task_data: dict):
    if not supabase:
        return {"message": "Mock Task created"}
    response = supabase.table("tasks").insert(task_data).execute()
    return response.data

# --- Projects Routes ---
@app.get("/api/projects")
def get_projects():
    if not supabase:
        return [{"id": "1", "name": "Website Redesign (Mock)", "status": "Ongoing"}]
    response = supabase.table("projects").select("*").execute()
    return response.data

@app.post("/api/projects")
def create_project(project_data: dict):
    if not supabase:
        return {"message": "Mock Project created"}
    response = supabase.table("projects").insert(project_data).execute()
    return response.data

# --- Evaluations Routes ---
@app.get("/api/evaluations")
def get_evaluations():
    if not supabase:
        return [{"id": "1", "score": 95, "feedback": "Excellent work! (Mock)"}]
    response = supabase.table("evaluations").select("*").execute()
    return response.data

@app.post("/api/evaluations")
def create_evaluation(eval_data: dict):
    if not supabase:
        return {"message": "Mock Evaluation created"}
    response = supabase.table("evaluations").insert(eval_data).execute()
    return response.data

# --- Document Generation Routes ---
@app.post("/api/reports/generate")
def generate_report(data: dict = None):
    # Placeholder for reportlab / python-docx logic
    return {"message": "Report generation triggered successfully.", "url": "#"}

@app.post("/api/certificates/generate")
def generate_certificate(data: dict = None):
    # Placeholder for certificate generation
    return {"message": "Certificate generation triggered successfully.", "url": "#"}

