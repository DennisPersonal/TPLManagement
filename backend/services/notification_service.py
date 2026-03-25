#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
倒计时和提醒服务
计算关键节点倒计时，发送提醒通知
"""

from datetime import datetime, timedelta
from typing import List, Dict, Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from apscheduler.schedulers.background import BackgroundScheduler

class CountdownService:
    """倒计时服务"""
    
    def __init__(self, reminder_days: int = 3, reminder_hours: int = 24):
        self.reminder_days = reminder_days
        self.reminder_hours = reminder_hours
        self.reminders_sent = set()
    
    def calculate_countdown(self, target_date: datetime, check_date: datetime = None) -> int:
        """计算倒计时天数"""
        if check_date is None:
            check_date = datetime.now()
        
        target = datetime.combine(target_date.date(), datetime.min.time())
        check = datetime.combine(check_date.date(), datetime.min.time())
        
        delta = target - check
        if delta.days < 0:
            return 0  # 已经过期
        return delta.days
    
    def is_near_deadline(self, target_date: datetime, check_date: datetime = None) -> bool:
        """检查是否临近截止日期"""
        countdown = self.calculate_countdown(target_date, check_date)
        return countdown in [self.reminder_days, self.reminder_days - 1, 
                            self.reminder_hours // 24]
    
    def get_urgent_milestones(self, milestones: List[Dict], check_date: datetime = None) -> List[Dict]:
        """获取需要提醒的里程碑"""
        if check_date is None:
            check_date = datetime.now()
        
        urgent = []
        for ms in milestones:
            target = datetime.strptime(ms['target_date'], "%Y-%m-%d")
            if self.is_near_deadline(target, check_date):
                ms['countdown'] = self.calculate_countdown(target, check_date)
                urgent.append(ms)
        
        return sorted(urgent, key=lambda x: x['countdown'])

class NotificationService:
    """通知服务"""
    
    def __init__(self, email_host: str = "smtp.example.com", 
                 email_port: int = 587, 
                 sender_email: str = "noreply@example.com",
                 sender_password: str = "password"):
        self.email_host = email_host
        self.email_port = email_port
        self.sender_email = sender_email
        self.sender_password = sender_password
    
    def send_email(self, to_email: str, subject: str, body: str):
        """发送邮件通知"""
        msg = MIMEMultipart()
        msg['From'] = self.sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'plain'))
        
        try:
            with smtplib.SMTP(self.email_host, self.email_port) as server:
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
            return True
        except Exception as e:
            print(f"发送失败：{e}")
            return False
    
    def send_reminder(self, milestone: Dict, project_name: str):
        """发送里程碑提醒"""
        target_date = datetime.strptime(milestone['target_date'], "%Y-%m-%d")
        countdown = milestone.get('countdown', 1)
        
        if countdown == 0:
            body = f"""🚨 里程碑已过期！

项目名称：{project_name}
里程碑：{milestone['name']}
原计划日期：{milestone['target_date']}
状态：已延迟

请立即检查项目进度并采取补救措施。
"""
        else:
            body = f"""⏰ 里程碑即将到达！

项目名称：{project_name}
里程碑：{milestone['name']}
目标日期：{milestone['target_date']}
剩余时间：{countdown} 天

请尽快完成相关工作！
"""
        
        # 这里应该发送邮件，实际部署时连接真实 SMTP
        # send_email("team@example.com", f"里程碑提醒 - {project_name}", body)
        print(f"【提醒】{body.strip()}")
    
    def send_daily_summary(self, tasks: List[Dict], project_name: str):
        """发送每日总结邮件"""
        today = datetime.now().strftime("%Y-%m-%d")
        daily_tasks = [t for t in tasks if t['date'] == today]
        
        body = f"""📊 每日任务总结 - {project_name}

日期：{today}
完成数量：{len([t for t in daily_tasks if t['status'] == 'DONE'])}
进行中：{len([t for t in daily_tasks if t['status'] == 'IN_PROGRESS'])}
待办：{len([t for t in daily_tasks if t['status'] == 'TODO'])}

关键任务列表：
"""
        
        for task in daily_tasks:
            status_emoji = "✅" if task['status'] == 'DONE' else 
                          "🔄" if task['status'] == 'IN_PROGRESS' else
                          "⏳"
            body += f"{status_emoji} {task['name']} [{task['priority']}]\n"
        
        body += "\n请继续努力！👏"
        
        # send_email("team@example.com", f"每日总结 - {project_name}", body)
        print(f"【每日总结】{body.strip()}")