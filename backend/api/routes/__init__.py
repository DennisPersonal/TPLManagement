from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

app = FastAPI(title="Project Management System")

# 基础模型
class ProjectCreate(BaseModel):
    name: str
    description: str
    team_list: str
    start_date: datetime
    end_date: datetime

class TaskCreate(BaseModel):
    task_name: str
    task_type: str
    description: str
    priority: str
    start_date: datetime
    due_date: datetime
    assigned_to: Optional[str]

@app.get("/")
async def root():
    return {"message": "Project Management System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}