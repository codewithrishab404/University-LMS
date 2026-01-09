from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    Cookie
)
from sqlalchemy.orm import Session
from typing import Annotated, Optional
from starlette import status
from datetime import date, datetime, timedelta
from fastapi.responses import JSONResponse

from database import sessionLocal
from models import (
    Instructors,
    Courses,
    Teaching,
    Enrolled_in,
    Students
)

# ==========================
# Pydantic
# ==========================
from pydantic import BaseModel, EmailStr, Field

# ==========================
# Security
# ==========================
from passlib.context import CryptContext
from jose import jwt, JWTError

# ==========================
# CONFIG
# ==========================
SECRET_KEY = "CHANGE_THIS_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ==========================
# Router
# ==========================
router = APIRouter(
    prefix="/instructor",
    tags=["Instructor"]
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
# Utility Functions
# ==========================
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ==========================
# COOKIE AUTH
# ==========================
def get_current_instructor(
    access_token: Optional[str] = Cookie(default=None),
    db: Session = Depends(get_db)
):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        instructor_id = int(payload.get("sub"))
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    instructor = db.query(Instructors).filter(
        Instructors.id == instructor_id
    ).first()

    if not instructor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Instructor not found"
        )

    return instructor

# ==========================
# Schemas
# ==========================
class InstructorRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    dob: date
    salary: float

class InstructorLogin(BaseModel):
    email: EmailStr
    password: str

class CourseCreate(BaseModel):
    title: str = Field(min_length=4)
    year: int
    duration: float
    syllabus: str
    fees: float
    dept_id: int

class GradeUpdate(BaseModel):
    student_id: int
    course_id: int
    grade: str

# ==========================
# AUTH
# ==========================
@router.post("/register", status_code=201)
def register_instructor(
    request: InstructorRegister,
    db: db_dependency
):
    if db.query(Instructors).filter(
        Instructors.email == request.email
    ).first():
        raise HTTPException(400, "Instructor already exists")

    instructor = Instructors(
        name=request.name,
        email=request.email,
        hashed_password=hash_password(request.password),
        DOB=request.dob,
        salary=request.salary
    )

    db.add(instructor)
    db.commit()

    return {"message": "Instructor registered"}

@router.post("/login")
def login_instructor(
    request: InstructorLogin,
    response: Response,
    db: db_dependency
):
    instructor = db.query(Instructors).filter(
        Instructors.email == request.email
    ).first()

    if not instructor or not verify_password(
        request.password,
        instructor.hashed_password
    ):
        raise HTTPException(401, "Invalid email or password")

    token = create_access_token({
        "sub": str(instructor.id),
        "role": "instructor"
    })

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,  # True in prod
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return {
        "id": instructor.id,
        "name": instructor.name,
        "email": instructor.email
    }

@router.post("/logout")
def logout():
    res = JSONResponse({"message": "Logged out"})
    res.delete_cookie("access_token")
    return res

# ==========================
# PROFILE
# ==========================
@router.get("/me")
def get_profile(
    instructor: Instructors = Depends(get_current_instructor)
):
    return {
        "id": instructor.id,
        "name": instructor.name,
        "email": instructor.email,
        "salary": instructor.salary,
        "dob": instructor.DOB,
        "role": "instructor"
    }

# ==========================
# DASHBOARD
# ==========================
@router.get("/dashboard-summary")
def dashboard_summary(
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor)
):
    total_courses = db.query(Teaching).filter(
        Teaching.instructor_id == instructor.id
    ).count()

    total_students = (
        db.query(Students)
        .join(Enrolled_in)
        .join(Teaching)
        .filter(Teaching.instructor_id == instructor.id)
        .distinct()
        .count()
    )

    return {
        "total_courses": total_courses,
        "total_students": total_students
    }

# ==========================
# COURSES (INSTRUCTOR OWNED)
# ==========================
@router.post("/create/courses", status_code=status.HTTP_201_CREATED)
def create_course(
    request: CourseCreate,
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor)
):
    course = Courses(
        title=request.title,
        year=request.year,
        duration=request.duration,
        syllabus=request.syllabus,
        fees=request.fees,
        dept_id=request.dept_id
    )

    db.add(course)
    db.commit()
    db.refresh(course)

    db.add(Teaching(
        instructor_id=instructor.id,
        course_id=course.course_id
    ))
    db.commit()

    return {"message": "Course created"}

@router.get("/my-courses")
def my_courses(
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor)
):
    courses = (
        db.query(Courses)
        .join(Teaching)
        .filter(Teaching.instructor_id == instructor.id)
        .all()
    )

    result = []
    for c in courses:
        students = db.query(Enrolled_in).filter(
            Enrolled_in.course_id == c.course_id
        ).count()

        result.append({
            "course_id": c.course_id,
            "title": c.title,
            "year": c.year,
            "fees": c.fees,
            "students": students
        })

    return result





# ==========================
# ANALYTICS
# ==========================
@router.get("/analytics")
def analytics(
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor)
):
    data = []

    courses = (
        db.query(Courses.course_id, Courses.title)
        .join(Teaching)
        .filter(Teaching.instructor_id == instructor.id)
        .all()
    )

    for c in courses:
        count = db.query(Enrolled_in).filter(
            Enrolled_in.course_id == c.course_id
        ).count()

        data.append({
            "course": c.title,
            "students": count
        })

    return data

# ==========================
# GRADING
# ==========================
@router.put("/grade")
def update_grade(
    request: GradeUpdate,
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor)
):
    if not db.query(Teaching).filter(
        Teaching.instructor_id == instructor.id,
        Teaching.course_id == request.course_id
    ).first():
        raise HTTPException(403, "Not authorized")

    enrollment = db.query(Enrolled_in).filter(
        Enrolled_in.student_id == request.student_id,
        Enrolled_in.course_id == request.course_id
    ).first()

    if not enrollment:
        raise HTTPException(404, "Enrollment not found")

    enrollment.grade = request.grade
    db.commit()

    return {"message": "Grade updated"}

# ==========================
# UPDATE COURSE (OWNED)
# ==========================
@router.put("/courses/{course_id}")
def update_course(
    course_id: int,
    request: CourseCreate,
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor),
):
    course = (
        db.query(Courses)
        .join(Teaching)
        .filter(
            Courses.course_id == course_id,
            Teaching.instructor_id == instructor.id
        )
        .first()
    )

    if not course:
        raise HTTPException(404, "Course not found or not authorized")

    course.title = request.title
    course.year = request.year
    course.duration = request.duration
    course.syllabus = request.syllabus
    course.fees = request.fees
    course.dept_id = request.dept_id

    db.commit()
    return {"message": "Course updated successfully"}


# ==========================
# DELETE COURSE (OWNED)
# ==========================
@router.delete("/courses/{course_id}")
def delete_course(
    course_id: int,
    db: db_dependency,
    instructor: Instructors = Depends(get_current_instructor),
):
    course = (
        db.query(Courses)
        .join(Teaching)
        .filter(
            Courses.course_id == course_id,
            Teaching.instructor_id == instructor.id
        )
        .first()
    )

    if not course:
        raise HTTPException(404, "Course not found or not authorized")

    db.query(Teaching).filter(
        Teaching.course_id == course_id
    ).delete()

    db.delete(course)
    db.commit()

    return {"message": "Course deleted"}
