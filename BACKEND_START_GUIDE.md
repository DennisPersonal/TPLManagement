# 后端服务启动指南

## 问题描述
启动后端服务时出现错误：
```
python3 -m uvicorn main:app --reload --port 8000
/Library/Frameworks/Python.framework/Versions/3.11/bin/python3: No module named uvicorn
```

## 问题原因
错误原因是**没有激活Python虚拟环境**，直接使用了系统Python，而系统Python中没有安装uvicorn模块。

## 解决方案

### 方法1：使用提供的启动脚本（推荐）
```bash
cd /Users/dennisduan/.openclaw/workspace/project-system/backend
./start-backend.sh
```

或者使用简化版本：
```bash
cd /Users/dennisduan/.openclaw/workspace/project-system/backend
./start.sh
```

### 方法2：手动启动
```bash
cd /Users/dennisduan/.openclaw/workspace/project-system/backend

# 1. 激活虚拟环境
source venv/bin/activate

# 2. 启动后端服务（使用端口8001，因为8000可能被占用）
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

## 端口说明
- **端口8000**：之前用于前端静态文件服务器（Python HTTP服务器）
- **端口8001**：现在用于后端API服务（FastAPI + uvicorn）

## 服务状态检查

### 1. 检查后端API是否运行
```bash
curl http://localhost:8001/api/health
```
预期响应：
```json
{"status":"healthy","timestamp":"...","service":"project-management-system","version":"1.0.0"}
```

### 2. 访问API文档
打开浏览器访问：`http://localhost:8001/docs`

### 3. 检查前端连接
前端已自动更新为连接到 `http://localhost:8001/api`

## 文件说明

### 创建的脚本文件
1. **`start-backend.sh`** - 详细启动脚本，包含环境检查和版本显示
2. **`start.sh`** - 简化启动脚本，快速启动服务

### 虚拟环境
- 位置：`backend/venv/`
- 已安装所有依赖包（见 `requirements.txt`）
- 包含：fastapi, uvicorn, pydantic等

## 常见问题

### Q1: 端口已被占用怎么办？
如果端口8001也被占用，可以修改端口号：
```bash
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8002
```

### Q2: 如何停止后端服务？
按 `Ctrl+C` 停止当前运行的服务。

### Q3: 如何检查服务是否在运行？
```bash
ps aux | grep uvicorn
```

### Q4: 前端需要修改吗？
不需要，前端代码已自动更新为使用端口8001。

## 完整测试流程

1. **启动后端服务**：
   ```bash
   cd /Users/dennisduan/.openclaw/workspace/project-system/backend
   ./start-backend.sh
   ```

2. **启动前端服务器**：
   ```bash
   cd /Users/dennisduan/.openclaw/workspace/project-system
   python3 -m http.server 8000
   ```

3. **访问系统**：
   - 前端界面：`http://localhost:8000/frontend/index.html`
   - 后端API文档：`http://localhost:8001/docs`

4. **测试功能**：
   - 检查后端状态显示
   - 测试项目管理功能
   - 测试任务管理功能

## 技术细节

### 虚拟环境信息
- Python版本：3.11.3
- 虚拟环境路径：`backend/venv/`
- 依赖管理：`requirements.txt`

### 后端服务配置
- 框架：FastAPI 0.104.1
- 服务器：uvicorn 0.24.0
- 主机：0.0.0.0（允许所有IP访问）
- 端口：8001
- 重载模式：启用（代码修改自动重启）

### 前端配置
- API基础URL：`http://localhost:8001/api`
- 自动检测后端状态
- 错误处理和重试机制

## 故障排除

### 错误1：ModuleNotFoundError: No module named 'uvicorn'
**原因**：未激活虚拟环境
**解决**：运行 `source venv/bin/activate` 激活虚拟环境

### 错误2：Address already in use
**原因**：端口被占用
**解决**：使用其他端口（如8002, 8003等）

### 错误3：前端无法连接后端
**原因**：端口不匹配或后端未启动
**解决**：
1. 确认后端在运行：`curl http://localhost:8001/api/health`
2. 检查前端API URL配置
3. 检查防火墙或网络设置

## 下一步
1. 测试所有API端点
2. 测试前后端集成
3. 添加数据库集成
4. 部署到生产环境