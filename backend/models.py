from database import Base
from sqlalchemy import (
    DateTime,
    Integer,
    Column,
    String,
    Float,
    ForeignKey,
    Date
)
from sqlalchemy.sql import func


class Department(Base):
    __tablename__ = "department"
    dept_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(100))


class Courses(Base):
    __tablename__ = "courses"
    course_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    year = Column(Integer)
    duration = Column(Float)
    syllabus = Column(String(500))
    fees = Column(Float)
    dept_id = Column(Integer, ForeignKey("department.dept_id"))


class SubjectArea(Base):
    __tablename__ = "subjectarea"
    subject_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)


class Instructors(Base):
    __tablename__ = "instructors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    salary = Column(Float)
    DOB = Column(Date)


class Teaching(Base):
    __tablename__ = "teaching"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    instructor_id = Column(Integer, ForeignKey("instructors.id"))


class Students(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    dob = Column(Date)


class Enrolled_in(Base):
    __tablename__ = "enrolledin"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    date = Column(DateTime(timezone=True), server_default=func.now())
    grade = Column(String(10))


class ClassifiedOrder(Base):
    __tablename__ = "classifiedorder"
    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjectarea.subject_id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))


class FinalProject(Base):
    __tablename__ = "finalproject"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(String(500))


class Submission(Base):
    __tablename__ = "submission"
    id = Column(Integer, primary_key=True, index=True)
    submitted_by_student_id = Column(Integer, ForeignKey("students.id"))
    project_id = Column(Integer, ForeignKey("finalproject.id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))
