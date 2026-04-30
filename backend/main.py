import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("http"):
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase: {e}")
        supabase = None

app = FastAPI(title="Nexus Dashboard API", description="API for Client and Student Tracking Systems")

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
    return {"message": "Welcome to Nexus Dashboard API", "supabase_connected": supabase is not None}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

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

# --- Document Generation Routes ---
@app.post("/api/reports/generate")
def generate_report():
    # Placeholder for reportlab / python-docx logic
    return {"message": "Report generation triggered.", "url": "/mock-report.pdf"}

@app.post("/api/certificates/generate")
def generate_certificate():
    # Placeholder for certificate generation
    return {"message": "Certificate generation triggered.", "url": "/mock-certificate.pdf"}

