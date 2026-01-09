from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import Base, engine
from routes import courses, instructors

app = FastAPI()

# =======================
# CORS CONFIGURATION
# =======================
origins = [
    "http://localhost:5173",      # Vite
    "http://127.0.0.1:5173",
    "http://localhost:3000",      
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # frontend URLs
    allow_credentials=True,
    allow_methods=["*"],          # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],          # Authorization, Content-Type, etc.
)

# =======================
# DB TABLES
# =======================
models.Base.metadata.create_all(bind=engine)

# =======================
# ROUTES
# =======================
app.include_router(courses.router)
app.include_router(instructors.router)
