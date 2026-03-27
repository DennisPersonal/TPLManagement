# 🚀 项目管理系统

一个自动化项目管理平台，支持从项目时间表自动生成任务计划、优先级管理、倒计时提醒、自动报告和可视化 dashboard。

## ✨ 功能特性

### 核心功能
- **智能任务分解**：根据项目时间线和团队信息，AI自动生成合理的任务分解
- **优先级管理**：拖拽式优先级排序，支持P0-P3四级优先级
- **提醒服务**：关键里程碑前自动发送通知提醒
- **可视化Dashboard**：图表化展示项目进度和团队负载
- **自动报告**：基于任务优先级生成每日/每周/每月报告

### 技术特性
- **现代化前端**：响应式设计，美观的UI界面
- **RESTful API**：完整的后端API接口
- **实时更新**：任务状态实时同步
- **数据可视化**：丰富的图表展示
- **扩展性强**：模块化设计，易于扩展

## 🏗️ 项目结构

```
project-system/
├── frontend/                 # 前端代码
│   ├── index.html           # 主页面
│   ├── style.css            # 样式文件
│   └── app.js               # JavaScript主文件
├── backend/                 # 后端代码
│   ├── main.py              # FastAPI主程序
│   ├── requirements.txt     # Python依赖
│   ├── app/                 # 应用模块
│   │   ├── api/             # API路由
│   │   ├── models/          # 数据模型
│   │   ├── services/        # 业务逻辑
│   │   └── core/            # 核心配置
│   └── services/            # 服务层
├── start.sh                 # 启动脚本
└── README.md                # 说明文档
```

## 🚀 快速开始

### 1. 启动后端服务

```bash
# 进入项目目录
cd /Users/dennisduan/.openclaw/workspace/project-system

# 运行启动脚本
./start.sh
```

或者手动启动：

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 访问前端界面

打开浏览器访问：
- **前端界面**: `file:///Users/dennisduan/.openclaw/workspace/project-system/frontend/index.html`
- **后端API**: `http://localhost:8000`
- **API文档**: `http://localhost:8000/docs`

### 3. 测试功能

1. **查看项目列表**：访问前端界面查看示例项目
2. **测试API接口**：点击"测试API接口"按钮
3. **查看Dashboard**：点击"打开Dashboard"按钮
4. **生成报告**：点击"生成报告"按钮

## 📡 API接口

### 主要端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/projects` | 获取所有项目 |
| GET | `/api/projects/{id}` | 获取指定项目 |
| POST | `/api/projects` | 创建新项目 |
| GET | `/api/projects/{id}/tasks` | 获取项目任务 |
| GET | `/api/dashboard/{id}` | 获取Dashboard数据 |
| GET | `/api/reports/{id}/{period}` | 生成项目报告 |

## 🎨 前端功能

### 已实现功能
- ✅ 项目列表展示
- ✅ 任务状态显示
- ✅ 进度条可视化
- ✅ 响应式设计
- ✅ 系统状态监控
- ✅ API测试界面

### 待开发功能
- 🔄 项目创建表单
- 🔄 任务编辑功能
- 🔄 实时数据更新
- 🔄 图表可视化
- 🔄 用户认证

## 🔧 技术栈

### 前端
- HTML5 / CSS3 / JavaScript (ES6+)
- 现代化CSS设计（Flexbox/Grid）
- 响应式布局
- Chart.js (计划集成)

### 后端
- Python 3.11+
- FastAPI (高性能Web框架)
- Pydantic (数据验证)
- Uvicorn (ASGI服务器)

### 开发工具
- Git 版本控制
- 虚拟环境管理
- API自动文档生成

## 📊 数据模型

### 项目 (Project)
```python
{
    "id": 1,
    "name": "项目名称",
    "description": "项目描述",
    "start_date": "2026-03-20",
    "end_date": "2026-05-20",
    "progress": 45,
    "priority": "P1",
    "created_at": "2026-03-15"
}
```

### 任务 (Task)
```python
{
    "id": 1,
    "project_id": 1,
    "title": "任务标题",
    "description": "任务描述",
    "assigned_to": "负责人",
    "due_date": "2026-03-25",
    "status": "pending",
    "priority": "P1"
}
```

## 🚧 开发计划

### 近期目标
1. [ ] 集成数据库（SQLite/PostgreSQL）
2. [ ] 实现用户认证系统
3. [ ] 添加图表可视化
4. [ ] 实现任务拖拽排序
5. [ ] 添加邮件提醒功能

### 长期目标
1. [ ] 集成AI任务分解
2. [ ] 实现多租户支持
3. [ ] 开发移动端应用
4. [ ] 集成第三方服务（Slack、钉钉等）
5. [ ] 实现自动化工作流

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持

如有问题或建议，请：
1. 查看 [API文档](http://localhost:8000/docs)
2. 检查控制台错误信息
3. 提交 Issue

---

## 🧪 功能验证

项目包含自动化测试脚本，用于验证系统功能：

```bash
# 运行功能验证测试
python3 test_backend.py
```

测试内容包括：
- ✅ Git状态检查
- ✅ 前端文件完整性验证
- ✅ 后端模块导入测试
- ✅ 项目结构验证

## 🔄 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新信息。

**Happy Coding!** 🎉

*最后更新: 2026-03-27*