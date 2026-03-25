from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum as PyEnum

class Priority(PyEnum):
    P0 = "P0"  # Critical
    P1 = "P1"  # High
    P2 = "P2"  # Normal
    P3 = "P3"  # Low

class TaskStatus(PyEnum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    REVIEW = "REVIEW"
    DONE = "DONE"

class ProjectModel:
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    description = Column(String(500))
    team_list = Column(String(2000))  # JSON string of team members
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(20), default="ACTIVE")  # ACTIVE, COMPLETED, ARCHIVED
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class TaskModel:
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    task_name = Column(String(300), nullable=False)
    task_type = Column(String(50), default="DAILY")  # DAILY, WEEKLY, MONTHLY, MILESTONE
    description = Column(String(1000))
    priority = Column(Enum(Priority), default=Priority.P2)
    status = Column(Enum(TaskStatus), default=TaskStatus.TODO)
    start_date = Column(DateTime, nullable=False)
    due_date = Column(DateTime, nullable=False)
    is_milestone = Column(Boolean, default=False)
    countdown_days = Column(Integer, default=0)  # Days until deadline
    assigned_to = Column(String(100))  # Team member
    progress = Column(Float, default=0.0)  # 0.0 to 1.0
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MilestoneModel:
    __tablename__ = "milestones"
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(String(500))
    target_date = Column(DateTime, nullable=False)
    actual_date = Column(DateTime)  # When actually completed
    status = Column(String(20), default="PENDING")  # PENDING, ACHIEVED, AT_RISK, MISSED
    reminder_days = Column(Integer, default=3)  # Days before milestone to remind
    created_at = Column(DateTime, default=datetime.utcnow)

class ReportModel:
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    report_type = Column(String(50), default="DAILY")  # DAILY, WEEKLY, MONTHLY
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    summary = Column(String(2000))
    key_tasks = Column(String(5000))  # JSON of key tasks
    generated_at = Column(DateTime, default=datetime.utcnow)