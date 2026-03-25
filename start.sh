#!/bin/bash

# 项目管理系统启动脚本

set -e

echo "🚀 启动项目管理系统..."

# 检查Python版本
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "Python版本: $python_version"

# 进入后端目录
cd backend

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "📦 安装依赖包..."
pip install --upgrade pip
pip install -r requirements.txt

# 启动后端服务
echo "🚀 启动后端API服务..."
echo "访问地址: http://localhost:8000"
echo "API文档: http://localhost:8000/docs"
echo "按 Ctrl+C 停止服务"

python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000