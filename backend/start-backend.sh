#!/bin/bash

# 项目后端启动脚本
# 自动激活虚拟环境并启动FastAPI服务器

set -e

echo "🚀 启动项目管理系统后端服务..."
echo "========================================"

# 进入脚本所在目录
cd "$(dirname "$0")"

# 检查虚拟环境是否存在
if [ ! -d "venv" ]; then
    echo "❌ 错误：未找到虚拟环境目录 'venv'"
    echo "请先运行：python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# 激活虚拟环境
echo "🔧 激活Python虚拟环境..."
source venv/bin/activate

# 检查依赖是否已安装
echo "📦 检查Python依赖..."
if ! python3 -c "import uvicorn" &>/dev/null; then
    echo "⚠️  uvicorn未安装，正在安装依赖..."
    pip install -r requirements.txt
fi

# 检查FastAPI是否已安装
if ! python3 -c "import fastapi" &>/dev/null; then
    echo "⚠️  FastAPI未安装，正在安装依赖..."
    pip install -r requirements.txt
fi

# 显示Python和包版本
echo "🐍 Python版本: $(python3 --version)"
echo "📦 uvicorn版本: $(python3 -c "import uvicorn; print(uvicorn.__version__)")"
echo "⚡ FastAPI版本: $(python3 -c "import fastapi; print(fastapi.__version__)")"

# 启动服务器
echo "🚀 启动FastAPI服务器 (uvicorn)..."
echo "📡 访问地址: http://localhost:8000"
echo "📚 API文档: http://localhost:8000/docs"
echo "🔄 重载模式: 已启用 (代码修改后自动重启)"
echo "========================================"

# 启动uvicorn服务器
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000