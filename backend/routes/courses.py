from fastapi import APIRouter, Depends, HTTPException
from database import sessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from models import Courses
from pydantic import BaseModel, Field
from starlette import status

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

# ==========================
# DB Dependency
# ==========================
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# ==========================
# Schemas
# ==========================
class CoursesResponse(BaseModel):
    course_id: int
    title: str
    year: int
    duration: float
    syllabus: str
    fees: float
    dept_id: int

    class Config:
        from_attributes = True

# ==========================
# PUBLIC APIs (SAFE)
# ==========================

# 📚 Get all courses (catalog)
@router.get("/all", response_model=list[CoursesResponse])
def get_all_courses(db: db_dependency):
    return db.query(Courses).all()

# 🔢 Total number of courses
@router.get("/count")
def get_courses_count(db: db_dependency):
    return {
        "total_courses": db.query(Courses).count()
    }

# 🔍 Get single course (optional but useful)
@router.get("/{course_id}", response_model=CoursesResponse)
def get_course_by_id(course_id: int, db: db_dependency):
    course = db.query(Courses).filter(Courses.course_id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )

    return course
