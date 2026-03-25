#!/bin/bash

# 项目管理系统前端服务启动脚本
# 使用方法: ./serve-frontend.sh [端口号]

PORT=${1:-8000}
PROJECT_DIR="/Users/dennisduan/.openclaw/workspace/project-system"

echo "=========================================="
echo "项目管理系统前端服务"
echo "=========================================="
echo "项目目录: $PROJECT_DIR"
echo "服务端口: $PORT"
echo ""
echo "启动 Python HTTP 服务器..."
echo ""

cd "$PROJECT_DIR"

# 获取本地IP地址
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}')
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP="127.0.0.1"
fi

echo "✅ 服务器已启动!"
echo ""
echo "访问方式:"
echo "1. 本地访问: http://localhost:$PORT/frontend/index.html"
echo "2. 局域网访问: http://$LOCAL_IP:$PORT/frontend/index.html"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=========================================="

# 启动Python HTTP服务器
python3 -m http.server $PORT