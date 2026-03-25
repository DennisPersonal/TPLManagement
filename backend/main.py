"""
项目管理系统 - 后端主程序
FastAPI 实现
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import uvicorn
from typing import List, Optional
from pydantic import BaseModel

# 数据模型
class Project(BaseModel):
    id: int
    name: str
    description: str
    start_date: str
    end_date: str
    progress: int = 0
    priority: str = "P2"
    created_at: str = None

class Task(BaseModel):
    id: int
    project_id: int
    title: str
    description: str
    assigned_to: str
    due_date: str
    status: str = "pending"
    priority: str = "P2"

class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    email: str
    workload: int = 0

# AI任务分解请求模型
class AITaskDecompositionRequest(BaseModel):
    project_name: str
    project_description: str
    start_date: str
    end_date: str
    team_members: List[str]
    granularity: str = "month"  # month, week, day

# AI任务分解响应模型
class AITaskDecompositionResponse(BaseModel):
    success: bool
    project_id: Optional[int] = None
    tasks: List[dict]
    message: str = ""
    
# 甘特图任务模型
class GanttTask(BaseModel):
    id: int
    title: str
    start_date: str
    end_date: str
    progress: int
    priority: str
    assigned_to: str

# 初始化FastAPI应用
app = FastAPI(
    title="项目管理系统 API",
    description="自动化项目管理平台后端API",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应该限制来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 模拟数据存储
projects_db = []
tasks_db = []
team_db = []

# 初始化一些示例数据
def init_sample_data():
    global projects_db, tasks_db, team_db
    
    # 示例项目
    projects_db = [
        Project(
            id=1,
            name="网站重构项目",
            description="公司官网全面升级改版",
            start_date="2026-03-20",
            end_date="2026-05-20",
            progress=45,
            priority="P1",
            created_at="2026-03-15"
        ),
        Project(
            id=2,
            name="移动应用开发",
            description="iOS和Android双平台应用",
            start_date="2026-03-15",
            end_date="2026-06-30",
            progress=30,
            priority="P0",
            created_at="2026-03-10"
        ),
        Project(
            id=3,
            name="数据分析平台",
            description="大数据分析和可视化平台",
            start_date="2026-04-01",
            end_date="2026-07-15",
            progress=10,
            priority="P2",
            created_at="2026-03-20"
        )
    ]
    
    # 示例任务
    tasks_db = [
        Task(
            id=1,
            project_id=1,
            title="需求分析",
            description="收集和分析用户需求",
            assigned_to="张三",
            due_date="2026-03-25",
            status="completed",
            priority="P1"
        ),
        Task(
            id=2,
            project_id=1,
            title="UI设计",
            description="设计网站界面和用户体验",
            assigned_to="李四",
            due_date="2026-04-05",
            status="in_progress",
            priority="P1"
        ),
        Task(
            id=3,
            project_id=2,
            title="架构设计",
            description="设计应用技术架构",
            assigned_to="王五",
            due_date="2026-03-30",
            status="pending",
            priority="P0"
        )
    ]
    
    # 示例团队成员
    team_db = [
        TeamMember(
            id=1,
            name="张三",
            role="产品经理",
            email="zhangsan@example.com",
            workload=60
        ),
        TeamMember(
            id=2,
            name="李四",
            role="UI设计师",
            email="lisi@example.com",
            workload=75
        ),
        TeamMember(
            id=3,
            name="王五",
            role="后端开发",
            email="wangwu@example.com",
            workload=50
        ),
        TeamMember(
            id=4,
            name="赵六",
            role="前端开发",
            email="zhaoliu@example.com",
            workload=65
        )
    ]

# API路由
@app.get("/")
async def root():
    return {
        "message": "欢迎使用项目管理系统 API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "project-management-system",
        "version": "1.0.0"
    }

@app.get("/api/status")
async def system_status():
    """系统状态检查端点"""
    from datetime import datetime
    
    # 检查后端服务状态
    backend_status = "running"
    
    # 模拟数据库连接检查
    # 在实际应用中，这里应该检查真实的数据库连接
    try:
        # 模拟数据库连接检查
        import random
        db_connected = random.random() > 0.3  # 70%概率显示连接成功
        database_status = "connected" if db_connected else "disconnected"
    except:
        database_status = "error"
    
    # 模拟AI解析服务检查
    # 在实际应用中，这里应该检查AI服务API
    try:
        # 模拟AI服务检查
        ai_available = random.random() > 0.2  # 80%概率显示可用
        ai_status = "available" if ai_available else "unavailable"
    except:
        ai_status = "error"
    
    return {
        "timestamp": datetime.now().isoformat(),
        "components": {
            "backend": {
                "status": backend_status,
                "message": "FastAPI服务运行正常",
                "uptime": "10分钟"  # 这里可以添加实际运行时间
            },
            "database": {
                "status": database_status,
                "message": "数据库连接正常" if database_status == "connected" else "数据库连接失败",
                "type": "SQLite/PostgreSQL (模拟)"
            },
            "ai_parser": {
                "status": ai_status,
                "message": "AI任务分解服务可用" if ai_status == "available" else "AI服务不可用",
                "provider": "OpenAI/本地模型 (模拟)"
            }
        },
        "overall": "operational" if backend_status == "running" and database_status == "connected" and ai_status == "available" else "degraded"
    }

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    """获取所有项目"""
    return projects_db

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """获取指定项目"""
    for project in projects_db:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail="项目不存在")

@app.post("/api/projects", response_model=Project)
async def create_project(project: Project):
    """创建新项目"""
    # 生成新ID
    new_id = max([p.id for p in projects_db], default=0) + 1
    project.id = new_id
    project.created_at = datetime.now().isoformat()
    projects_db.append(project)
    return project

@app.get("/api/projects/{project_id}/tasks", response_model=List[Task])
async def get_project_tasks(project_id: int):
    """获取项目的所有任务"""
    return [task for task in tasks_db if task.project_id == project_id]

@app.get("/api/tasks", response_model=List[Task])
async def get_tasks():
    """获取所有任务"""
    return tasks_db

@app.post("/api/tasks", response_model=Task)
async def create_task(task: Task):
    """创建新任务"""
    new_id = max([t.id for t in tasks_db], default=0) + 1
    task.id = new_id
    tasks_db.append(task)
    return task

@app.put("/api/tasks/{task_id}/complete")
async def complete_task(task_id: int):
    """标记任务为完成"""
    for task in tasks_db:
        if task.id == task_id:
            task.status = "completed"
            return {"message": "任务标记为完成", "task_id": task_id}
    raise HTTPException(status_code=404, detail="任务不存在")

@app.get("/api/team", response_model=List[TeamMember])
async def get_team():
    """获取团队成员"""
    return team_db

@app.get("/api/dashboard/{project_id}")
async def get_dashboard_data(project_id: int):
    """获取Dashboard数据"""
    project = None
    for p in projects_db:
        if p.id == project_id:
            project = p
            break
    
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")
    
    # 计算项目相关数据
    project_tasks = [t for t in tasks_db if t.project_id == project_id]
    
    # 任务状态统计
    status_stats = {
        "completed": len([t for t in project_tasks if t.status == "completed"]),
        "in_progress": len([t for t in project_tasks if t.status == "in_progress"]),
        "pending": len([t for t in project_tasks if t.status == "pending"])
    }
    
    # 优先级统计
    priority_stats = {
        "P0": len([t for t in project_tasks if t.priority == "P0"]),
        "P1": len([t for t in project_tasks if t.priority == "P1"]),
        "P2": len([t for t in project_tasks if t.priority == "P2"]),
        "P3": len([t for t in project_tasks if t.priority == "P3"])
    }
    
    # 计算剩余天数
    from datetime import datetime
    end_date = datetime.strptime(project.end_date, "%Y-%m-%d")
    remaining_days = (end_date - datetime.now()).days
    
    return {
        "project": project,
        "task_count": len(project_tasks),
        "status_stats": status_stats,
        "priority_stats": priority_stats,
        "remaining_days": max(0, remaining_days),
        "team_members": len(team_db),
        "last_updated": datetime.now().isoformat()
    }

@app.get("/api/reports/{project_id}/{period}")
async def generate_report(project_id: int, period: str):
    """生成项目报告"""
    if period not in ["daily", "weekly", "monthly"]:
        raise HTTPException(status_code=400, detail="报告周期必须是 daily, weekly 或 monthly")
    
    project = None
    for p in projects_db:
        if p.id == project_id:
            project = p
            break
    
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")
    
    project_tasks = [t for t in tasks_db if t.project_id == project_id]
    
    report = {
        "project_id": project_id,
        "project_name": project.name,
        "period": period,
        "generated_at": datetime.now().isoformat(),
        "summary": {
            "total_tasks": len(project_tasks),
            "completed_tasks": len([t for t in project_tasks if t.status == "completed"]),
            "completion_rate": project.progress,
            "high_priority_tasks": len([t for t in project_tasks if t.priority in ["P0", "P1"]])
        },
        "recent_activities": [
            {
                "task": task.title,
                "status": task.status,
                "assigned_to": task.assigned_to,
                "due_date": task.due_date
            }
            for task in project_tasks[-5:]  # 最近5个任务
        ],
        "recommendations": [
            "关注高优先级任务",
            "及时更新任务状态",
            "定期检查项目进度"
        ]
    }
    
    return report

@app.post("/api/ai/task-decomposition", response_model=AITaskDecompositionResponse)
async def ai_task_decomposition(request: AITaskDecompositionRequest):
    """AI任务分解接口"""
    try:
        print(f"收到AI任务分解请求: {request.project_name}")
        
        # 1. 创建新项目
        new_project_id = max([p.id for p in projects_db], default=0) + 1
        new_project = Project(
            id=new_project_id,
            name=request.project_name,
            description=request.project_description,
            start_date=request.start_date,
            end_date=request.end_date,
            progress=0,
            priority="P2",
            created_at=datetime.now().isoformat()
        )
        projects_db.append(new_project)
        
        # 2. 使用AI生成任务（这里模拟AI处理，实际应该调用AI服务）
        ai_tasks = generate_ai_tasks(
            project_name=request.project_name,
            description=request.project_description,
            start_date=request.start_date,
            end_date=request.end_date,
            team_members=request.team_members,
            granularity=request.granularity
        )
        
        # 3. 将AI生成的任务保存到数据库
        saved_tasks = []
        for i, ai_task in enumerate(ai_tasks):
            # 分配团队成员（轮询分配）
            assigned_member = request.team_members[i % len(request.team_members)] if request.team_members else "未分配"
            
            # 确定优先级（根据任务类型）
            priority = determine_priority(ai_task["title"])
            
            # 创建任务
            new_task_id = max([t.id for t in tasks_db], default=0) + 1
            new_task = Task(
                id=new_task_id,
                project_id=new_project_id,
                title=ai_task["title"],
                description=ai_task["description"],
                assigned_to=assigned_member,
                due_date=ai_task["due_date"],
                status="pending",
                priority=priority
            )
            tasks_db.append(new_task)
            
            saved_tasks.append({
                "id": new_task_id,
                "title": ai_task["title"],
                "description": ai_task["description"],
                "assigned_to": assigned_member,
                "due_date": ai_task["due_date"],
                "priority": priority,
                "period": ai_task.get("period", "")
            })
        
        print(f"AI任务分解完成: 项目ID={new_project_id}, 任务数={len(saved_tasks)}")
        
        return AITaskDecompositionResponse(
            success=True,
            project_id=new_project_id,
            tasks=saved_tasks,
            message=f"AI已成功分解项目为{len(saved_tasks)}个任务"
        )
        
    except Exception as e:
        print(f"AI任务分解失败: {str(e)}")
        return AITaskDecompositionResponse(
            success=False,
            tasks=[],
            message=f"AI任务分解失败: {str(e)}"
        )

@app.get("/api/tasks/filter/{period}")
async def filter_tasks_by_period(period: str):
    """按时间周期过滤任务"""
    if period not in ["day", "week", "month"]:
        raise HTTPException(status_code=400, detail="周期必须是 day, week 或 month")
    
    from datetime import datetime, timedelta
    
    today = datetime.now().date()
    
    if period == "day":
        # 今天和明天的任务
        target_date = today.strftime("%Y-%m-%d")
        filtered_tasks = [t for t in tasks_db if t.due_date == target_date]
        
    elif period == "week":
        # 本周的任务
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)
        filtered_tasks = [
            t for t in tasks_db 
            if week_start <= datetime.strptime(t.due_date, "%Y-%m-%d").date() <= week_end
        ]
        
    else:  # month
        # 本月的任务
        month_start = today.replace(day=1)
        if today.month == 12:
            month_end = today.replace(year=today.year+1, month=1, day=1) - timedelta(days=1)
        else:
            month_end = today.replace(month=today.month+1, day=1) - timedelta(days=1)
        
        filtered_tasks = [
            t for t in tasks_db 
            if month_start <= datetime.strptime(t.due_date, "%Y-%m-%d").date() <= month_end
        ]
    
    return {
        "period": period,
        "task_count": len(filtered_tasks),
        "tasks": filtered_tasks
    }

@app.get("/api/gantt/{project_id}")
async def get_gantt_data(project_id: int):
    """获取甘特图数据"""
    project_tasks = [t for t in tasks_db if t.project_id == project_id]
    
    if not project_tasks:
        raise HTTPException(status_code=404, detail="项目没有任务")
    
    # 将任务转换为甘特图格式
    gantt_tasks = []
    for task in project_tasks:
        # 计算任务持续时间（模拟）
        start_date = datetime.strptime(task.due_date, "%Y-%m-%d")
        duration_days = 3  # 默认3天
        end_date = start_date + timedelta(days=duration_days)
        
        gantt_tasks.append({
            "id": task.id,
            "title": task.title,
            "start_date": start_date.strftime("%Y-%m-%d"),
            "end_date": end_date.strftime("%Y-%m-%d"),
            "progress": 50 if task.status == "in_progress" else 100 if task.status == "completed" else 0,
            "priority": task.priority,
            "assigned_to": task.assigned_to
        })
    
    return {
        "project_id": project_id,
        "tasks": gantt_tasks,
        "total_tasks": len(gantt_tasks)
    }

# AI任务生成辅助函数
def generate_ai_tasks(project_name, description, start_date, end_date, team_members, granularity):
    """模拟AI生成任务"""
    tasks = []
    
    # 解析日期
    from datetime import datetime, timedelta
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    
    # 根据粒度确定阶段数量
    if granularity == "month":
        # 按月分解
        months_diff = (end.year - start.year) * 12 + end.month - start.month
        if months_diff <= 0:
            months_diff = 1
        
        for i in range(months_diff):
            period_start = start + timedelta(days=30*i)
            period_end = min(period_start + timedelta(days=30), end)
            
            tasks.append({
                "title": f"第{i+1}阶段: {get_phase_title(i, granularity)}",
                "description": f"{project_name}的第{i+1}个月阶段工作",
                "due_date": period_end.strftime("%Y-%m-%d"),
                "period": f"第{i+1}个月"
            })
            
    elif granularity == "week":
        # 按周分解
        weeks_diff = (end - start).days // 7
        if weeks_diff <= 0:
            weeks_diff = 1
        
        for i in range(weeks_diff):
            period_start = start + timedelta(days=7*i)
            period_end = min(period_start + timedelta(days=7), end)
            
            tasks.append({
                "title": f"第{i+1}周: {get_phase_title(i, granularity)}",
                "description": f"{project_name}的第{i+1}周工作",
                "due_date": period_end.strftime("%Y-%m-%d"),
                "period": f"第{i+1}周"
            })
            
    else:  # day
        # 按日分解（最多30天）
        days_diff = min((end - start).days, 30)
        if days_diff <= 0:
            days_diff = 1
        
        for i in range(days_diff):
            task_date = start + timedelta(days=i)
            
            tasks.append({
                "title": f"第{i+1}天: {get_phase_title(i, granularity)}",
                "description": f"{project_name}的第{i+1}天工作",
                "due_date": task_date.strftime("%Y-%m-%d"),
                "period": f"第{i+1}天"
            })
    
    return tasks

def get_phase_title(index, granularity):
    """获取阶段标题"""
    if granularity == "month":
        phases = ["需求分析与规划", "技术架构设计", "核心功能开发", "测试与优化", "部署上线", "维护与迭代"]
    elif granularity == "week":
        phases = ["项目启动", "需求分析", "设计阶段", "开发阶段", "测试阶段", "部署准备"]
    else:  # day
        phases = ["项目启动会议", "需求收集", "技术调研", "原型设计", "开发环境搭建", "代码编写", "单元测试", "集成测试"]
    
    return phases[index % len(phases)]

def determine_priority(task_title):
    """根据任务标题确定优先级"""
    high_priority_keywords = ["紧急", "重要", "核心", "关键", "P0", "P1"]
    medium_priority_keywords = ["常规", "一般", "P2"]
    
    task_lower = task_title.lower()
    
    for keyword in high_priority_keywords:
        if keyword in task_lower:
            return "P1"
    
    for keyword in medium_priority_keywords:
        if keyword in task_lower:
            return "P2"
    
    return "P3"

# 启动时初始化示例数据
@app.on_event("startup")
async def startup_event():
    init_sample_data()
    print("项目管理系统后端已启动")
    print("示例数据已初始化")
    print(f"项目数量: {len(projects_db)}")
    print(f"任务数量: {len(tasks_db)}")
    print(f"团队成员: {len(team_db)}")
    print("API文档: http://localhost:8000/docs")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )