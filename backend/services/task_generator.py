#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
项目分解引擎
根据时间表和团队信息，自动生成每日/每周/每月任务
"""

from datetime import datetime, timedelta
from typing import List, Dict
import random

class TaskGenerator:
    """任务生成器"""
    
    def __init__(self, team_list: str, start_date: datetime, end_date: datetime):
        self.team = self._parse_team(team_list)
        self.start = start_date
        self.end = end_date
        self.duration_days = (self.end - self.start).days + 1
        self.daily_tasks = []
        self.weekly_tasks = []
        self.monthly_tasks = []
        self.milestones = []
    
    def _parse_team(self, team_list: str) -> List[Dict]:
        """解析团队列表"""
        import json
        try:
            return json.loads(team_list) if team_list else []
        except:
            return []
    
    def generate(self) -> Dict:
        """生成所有任务"""
        self._generate_daily_tasks()
        self._generate_weekly_tasks()
        self._generate_monthly_tasks()
        self._generate_milestones()
        
        return {
            "projects": {
                "start": self.start.strftime("%Y-%m-%d"),
                "end": self.end.strftime("%Y-%m-%d"),
                "duration_days": self.duration_days,
                "team_count": len(self.team),
            },
            "tasks": {
                "daily": self.daily_tasks,
                "weekly": self.weekly_tasks,
                "monthly": self.monthly_tasks,
                "milestones": self.milestones,
            }
        }
    
    def _generate_daily_tasks(self):
        """生成每日任务"""
        daily_templates = [
            {"name": "代码提交审查", "duration": "2h", "priority": "P2"},
            {"name": "测试用例编写", "duration": "3h", "priority": "P1"},
            {"name": "文档更新", "duration": "1h", "priority": "P2"},
            {"name": "Bug 修复", "duration": "2-4h", "priority": "P1"},
            {"name": "团队站会", "duration": "15m", "priority": "P2"},
        ]
        
        for day in range(self.duration_days):
            date = self.start + timedelta(days=day)
            tasks = random.sample(daily_templates, 3)
            
            for task in tasks:
                self.daily_tasks.append({
                    "id": f"D-{day:03d}-{len(self.daily_tasks):03d}",
                    "name": task["name"],
                    "date": date.strftime("%Y-%m-%d"),
                    "due_date": date.strftime("%Y-%m-%d"),
                    "priority": task["priority"],
                    "type": "DAILY",
                    "duration": task["duration"],
                    "assigned_to": random.choice([m["name"] for m in self.team]) if self.team else "Unassigned"
                })
    
    def _generate_weekly_tasks(self):
        """生成每周任务"""
        weekly_templates = [
            {"name": "周迭代规划", "duration": "4h", "priority": "P1"},
            {"name": "代码审查会议", "duration": "2h", "priority": "P1"},
            {"name": "技术方案评审", "duration": "3h", "priority": "P1"},
            {"name": "单元测试覆盖检查", "duration": "2h", "priority": "P2"},
        ]
        
        week = 0
        while True:
            week_start = self.start + timedelta(days=week * 7)
            week_end = week_start + timedelta(days=6)
            
            if week_end > self.end:
                break
            
            for task in weekly_templates:
                task_date = week_start + timedelta(days=random.randint(0, 6))
                if task_date <= self.end:
                    self.weekly_tasks.append({
                        "id": f"W-{week:03d}-{len(self.weekly_tasks):03d}",
                        "name": task["name"],
                        "date": task_date.strftime("%Y-%m-%d"),
                        "due_date": task_date.strftime("%Y-%m-%d"),
                        "priority": task["priority"],
                        "type": "WEEKLY",
                        "duration": task["duration"]
                    })
            
            week += 1
    
    def _generate_monthly_tasks(self):
        """生成每月任务"""
        month = self.start.month
        year = self.start.year
        
        monthly_templates = [
            {"name": "月度代码重构", "duration": "1day", "priority": "P2"},
            {"name": "性能优化分析", "duration": "2day", "priority": "P1"},
            {"name": "安全审计", "duration": "1day", "priority": "P1"},
            {"name": "版本发布准备", "duration": "3day", "priority": "P0"},
        ]
        
        month_end = datetime(year, month + 1, 1)
        while datetime(year, month, 1) <= datetime(self.end.year, self.end.month, self.end.day):
            for task in monthly_templates:
                task_date = datetime(year, month, 1)
                task["month"] = f"{year}-{month:02d}"
                self.monthly_tasks.append({
                    "id": f"M-{year}-{month:02d}-{len(self.monthly_tasks):03d}",
                    "name": task["name"],
                    "date": task_date.strftime("%Y-%m-%d"),
                    "due_date": task_date.strftime("%Y-%m-%d"),
                    "priority": task["priority"],
                    "type": "MONTHLY",
                    "duration": task["duration"]
                })
            
            month += 1
            if month > 12:
                month = 1
                year += 1
    
    def _generate_milestones(self):
        """生成关键里程碑"""
        # 根据项目进度生成关键节点
        milestone_points = [0.1, 0.25, 0.5, 0.75, 1.0]  # 项目进度百分比
        
        for percentage in milestone_points:
            milestone_date = self.start + timedelta(days=int(self.duration_days * percentage))
            
            self.milestones.append({
                "id": f"MS-{len(self.milestones):03d}",
                "name": f"里程碑 {int(percentage * 100)}%",
                "description": f"项目进度 {int(percentage * 100)}% 完成",
                "target_date": milestone_date.strftime("%Y-%m-%d"),
                "actual_date": None,
                "status": "PENDING",
                "reminder_days": 3,
                "type": "MILESTONE"
            })

if __name__ == "__main__":
    # 测试
    generator = TaskGenerator(
        team_list='[{"name": "Alice", "role": "Developer"}, {"name": "Bob", "role": "Reviewer"}]',
        start_date=datetime(2026, 4, 1),
        end_date=datetime(2026, 6, 30)
    )
    
    result = generator.generate()
    import json
    print(json.dumps(result, indent=2, default=str))