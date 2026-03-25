#!/bin/bash

# 项目管理系统启动脚本 - 修复版
# 解决虚拟环境复制到新电脑后 pip 找不到的问题

set -e

echo "🚀 启动项目管理系统..."

# 检查Python版本
if command -v python3 &> /dev/null; then
    python_version=$(python3 --version 2>&1 | awk '{print $2}')
    echo "Python版本: $python_version"
else
    echo "❌ 错误: Python3 未安装"
    echo "请先安装 Python3: https://www.python.org/downloads/"
    exit 1
fi

# 进入后端目录
cd backend

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
    echo "✅ 虚拟环境创建完成"
else
    echo "📦 检测到现有虚拟环境"
    
    # 检查虚拟环境是否可用
    if [ -f "venv/bin/activate" ]; then
        echo "✅ 虚拟环境激活脚本存在"
    else
        echo "⚠️  虚拟环境可能损坏，尝试重新创建..."
        rm -rf venv
        python3 -m venv venv
        echo "✅ 虚拟环境重新创建完成"
    fi
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 验证虚拟环境激活
if [ -z "$VIRTUAL_ENV" ]; then
    echo "❌ 错误: 虚拟环境激活失败"
    echo "尝试直接使用虚拟环境中的 Python..."
    VENV_PYTHON="venv/bin/python3"
    VENV_PIP="venv/bin/pip"
else
    echo "✅ 虚拟环境激活成功: $VIRTUAL_ENV"
    VENV_PYTHON="python3"
    VENV_PIP="pip"
fi

# 检查 pip 是否可用
echo "🔍 检查 pip 可用性..."
if command -v "$VENV_PIP" &> /dev/null; then
    echo "✅ pip 可用"
else
    echo "⚠️  pip 不可用，尝试使用 $VENV_PYTHON -m pip"
    VENV_PIP="$VENV_PYTHON -m pip"
fi

# 安装依赖
echo "📦 安装依赖包..."
$VENV_PIP install --upgrade pip
$VENV_PIP install -r requirements.txt

echo "✅ 依赖安装完成"

# 启动后端服务
echo "🚀 启动后端API服务..."
echo "访问地址: http://localhost:8000"
echo "API文档: http://localhost:8000/docs"
echo "按 Ctrl+C 停止服务"

$VENV_PYTHON -m uvicorn main:app --reload --host 0.0.0.0 --port 8000