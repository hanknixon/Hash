from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Backend.database import Base

class Student(Base):
    __tablename__ = 'students'

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    pass_hash = Column(String(255), nullable=False)

class Teacher(Base):
    __tablename__ = 'teachers'

    teacher_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    pass_hash = Column(String(255), nullable=False)

class Admin(Base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    pass_hash = Column(String(255), nullable=False)

class Subject(Base):
    __tablename__ = 'subjects'

    subject_id = Column(Integer, primary_key=True, index=True)
    sub_code = Column(Integer, nullable=False)
    sub_name = Column(String(100), nullable=False)
    sub_teacher = Column(String(100), nullable=False)
    sub_sem = Column(Integer, nullable=False)
