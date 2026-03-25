# 项目管理系统搬迁和使用指南

## 概述

本文档指导如何将项目管理系统从当前目录搬迁到 `/Users/dennisduan/Documents/ClawProjects/`，并提供完整的启动和使用说明。

## 当前项目位置
- **源目录**: `/Users/dennisduan/.openclaw/workspace/project-system`
- **目标目录**: `/Users/dennisduan/Documents/ClawProjects/project-management-system`

## 项目结构

```
project-system/
├── backend/                    # 后端服务
│   ├── main.py                # FastAPI主应用
│   ├── requirements.txt       # Python依赖
│   ├── venv/                  # Python虚拟环境
│   └── backend.log           # 后端日志
├── frontend/                  # 前端界面
│   ├── index.html            # 主页面
│   ├── style.css             # 样式表
│   ├── script.js             # 主脚本
│   └── frontend.log          # 前端日志
├── start-all.sh              # 完整启动脚本（推荐）
├── start.sh                  # 仅启动后端
├── serve-frontend.sh         # 仅启动前端
├── migrate-to-clawprojects.sh # 搬迁脚本
├── README.md                 # 项目说明
├── BACKEND_START_GUIDE.md    # 后端启动指南
└── MIGRATION_GUIDE.md        # 本文档
```

## 搬迁步骤

### 方法1：使用搬迁脚本（推荐）

1. **运行搬迁脚本**：
   ```bash
   cd /Users/dennisduan/.openclaw/workspace/project-system
   ./migrate-to-clawprojects.sh
   ```

2. **按照提示操作**：
   - 脚本会检查目标目录
   - 如果目标目录已存在，会提示是否覆盖
   - 确认后自动搬迁所有文件

3. **搬迁完成后**：
   - 项目将被复制到：`/Users/dennisduan/Documents/ClawProjects/project-management-system`
   - 创建快捷启动脚本：`/Users/dennisduan/Documents/ClawProjects/start-project-management.sh`

### 方法2：手动搬迁

1. **创建目标目录**：
   ```bash
   mkdir -p /Users/dennisduan/Documents/ClawProjects/project-management-system
   ```

2. **复制项目文件**：
   ```bash
   cp -r /Users/dennisduan/.openclaw/workspace/project-system/* \
         /Users/dennisduan/Documents/ClawProjects/project-management-system/
   ```

3. **设置执行权限**：
   ```bash
   chmod +x /Users/dennisduan/Documents/ClawProjects/project-management-system/*.sh
   ```

## 启动项目

### 完整启动（推荐）

使用 `start-all.sh` 脚本同时启动前端和后端：

```bash
# 在新位置启动
cd /Users/dennisduan/Documents/ClawProjects/project-management-system
./start-all.sh

# 或使用快捷方式
/Users/dennisduan/Documents/ClawProjects/start-project-management.sh
```

**启动流程**：
1. 检查端口占用（后端:8001，前端:8000）
2. 自动处理端口冲突
3. 启动后端FastAPI服务
4. 启动前端HTTP服务器
5. 显示访问地址和进程信息

### 单独启动

**仅启动后端**：
```bash
cd /Users/dennisduan/Documents/ClawProjects/project-management-system/backend
./start.sh
```

**仅启动前端**：
```bash
cd /Users/dennisduan/Documents/ClawProjects/project-management-system
./serve-frontend.sh
```

## 访问地址

启动成功后，可以通过以下地址访问：

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端界面 | `http://localhost:8000/index.html` | 项目管理系统主界面 |
| 后端API | `http://localhost:8001` | FastAPI后端服务 |
| API文档 | `http://localhost:8001/docs` | 交互式API文档 |
| 健康检查 | `http://localhost:8001/api/health` | 服务健康状态 |

**局域网访问**（如果配置了网络）：
- 前端：`http://<你的IP地址>:8000/index.html`
- 后端：`http://<你的IP地址>:8001`

## 功能特性

### 启动脚本特性
1. **自动端口管理**：检查并处理端口冲突
2. **依赖自动安装**：自动安装Python依赖包
3. **虚拟环境管理**：自动创建和激活虚拟环境
4. **日志记录**：前后端分别记录日志
5. **优雅停止**：Ctrl+C一键停止所有服务
6. **进程管理**：显示PID便于管理

### 项目功能
1. **任务分解**：AI分析生成每日/每周/每月任务
2. **优先级管理**：任务排序和批量管理
3. **提醒服务**：关键里程碑通知
4. **可视化Dashboard**：项目进度统计和展示

## 故障排除

### 常见问题

1. **端口被占用**：
   - 脚本会自动尝试释放端口
   - 如果失败，手动修改端口号：
     ```bash
     # 编辑 start-all.sh，修改端口变量
     BACKEND_PORT=8002
     FRONTEND_PORT=8003
     ```

2. **Python依赖安装失败**：
   ```bash
   cd backend
   source venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **虚拟环境问题**：
   ```bash
   cd backend
   rm -rf venv
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### 日志查看

- **后端日志**：`backend/backend.log`
- **前端日志**：`frontend/frontend.log`
- **实时查看**：启动脚本会显示实时日志

## 维护和更新

### 更新项目
```bash
# 从源目录更新
cd /Users/dennisduan/.openclaw/workspace/project-system
git pull origin main  # 如果有Git仓库

# 重新搬迁
./migrate-to-clawprojects.sh
```

### 备份项目
```bash
# 备份到压缩文件
tar -czf project-management-system-backup-$(date +%Y%m%d).tar.gz \
    -C /Users/dennisduan/Documents/ClawProjects project-management-system
```

## 联系方式

如有问题，请参考：
- `BACKEND_START_GUIDE.md` - 后端启动详细指南
- `README.md` - 项目功能说明
- 日志文件 - 错误和调试信息

---

**搬迁完成时间**: 2026-03-25  
**最后更新**: 2026-03-25