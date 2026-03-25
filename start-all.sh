#!/bin/bash

# 项目管理系统 - 完整启动脚本
# 同时启动前端和后端服务

set -e

echo "=========================================="
echo "🚀 项目管理系统完整启动"
echo "=========================================="

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "项目目录: $PROJECT_DIR"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函数：打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 函数：检查端口是否被占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # 端口被占用
    else
        return 1  # 端口空闲
    fi
}

# 函数：杀死占用端口的进程
kill_port() {
    local port=$1
    local service=$2
    
    print_warning "端口 $port 被占用，尝试停止占用进程..."
    
    # 查找占用端口的进程
    local pids=$(lsof -ti:$port 2>/dev/null)
    
    if [ -n "$pids" ]; then
        for pid in $pids; do
            print_info "停止进程 $pid..."
            kill -9 $pid 2>/dev/null || true
        done
        sleep 1
        
        # 再次检查
        if check_port $port; then
            print_error "无法释放端口 $port，请手动检查"
            return 1
        else
            print_success "端口 $port 已释放"
            return 0
        fi
    else
        print_error "未找到占用端口 $port 的进程"
        return 1
    fi
}

# 配置端口
BACKEND_PORT=8001
FRONTEND_PORT=8000

print_info "配置端口: 后端=$BACKEND_PORT, 前端=$FRONTEND_PORT"

# 检查端口占用
print_info "检查端口占用情况..."

if check_port $BACKEND_PORT; then
    print_warning "后端端口 $BACKEND_PORT 被占用"
    if ! kill_port $BACKEND_PORT "后端"; then
        print_error "请手动解决端口冲突或修改配置"
        exit 1
    fi
fi

if check_port $FRONTEND_PORT; then
    print_warning "前端端口 $FRONTEND_PORT 被占用"
    if ! kill_port $FRONTEND_PORT "前端"; then
        print_error "请手动解决端口冲突或修改配置"
        exit 1
    fi
fi

print_success "所有端口可用"

# 启动后端服务
print_info "启动后端服务..."
cd "$PROJECT_DIR/backend"

# 检查虚拟环境
if [ ! -d "venv" ]; then
    print_warning "虚拟环境不存在，正在创建..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
if [ -f "requirements.txt" ]; then
    print_info "安装依赖包..."
    pip install --upgrade pip > /dev/null 2>&1
    pip install -r requirements.txt > /dev/null 2>&1
fi

# 在后端目录中启动后端服务（后台运行）
print_info "启动后端API服务 (端口: $BACKEND_PORT)..."
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port $BACKEND_PORT > backend.log 2>&1 &
BACKEND_PID=$!

# 等待后端启动
print_info "等待后端服务启动..."
sleep 3

# 检查后端是否启动成功
if curl -s http://localhost:$BACKEND_PORT/api/health > /dev/null 2>&1; then
    print_success "后端服务启动成功!"
else
    print_error "后端服务启动失败，检查 backend.log 查看详情"
    exit 1
fi

# 启动前端服务
print_info "启动前端服务..."
cd "$PROJECT_DIR"

# 获取本地IP地址（兼容macOS和Linux）
get_local_ip() {
    # 尝试多种方法获取本地IP
    if command -v ip > /dev/null 2>&1; then
        # Linux
        ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -n1
    elif command -v ifconfig > /dev/null 2>&1; then
        # macOS/BSD
        ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}'
    else
        # 尝试其他方法
        hostname -I 2>/dev/null | awk '{print $1}' || echo "127.0.0.1"
    fi
}

LOCAL_IP=$(get_local_ip 2>/dev/null || echo "127.0.0.1")

# 在前端目录中启动前端服务（后台运行）
print_info "启动前端HTTP服务器 (端口: $FRONTEND_PORT)..."
cd frontend
python3 -m http.server $FRONTEND_PORT > frontend.log 2>&1 &
FRONTEND_PID=$!

# 等待前端启动
sleep 2

print_success "前端服务启动成功!"

echo ""
echo "=========================================="
echo "✅ 项目管理系统启动完成!"
echo "=========================================="
echo ""
echo "访问地址:"
echo "1. 前端界面: http://localhost:$FRONTEND_PORT/index.html"
echo "2. 后端API: http://localhost:$BACKEND_PORT"
echo "3. API文档: http://localhost:$BACKEND_PORT/docs"
echo ""
if [ "$LOCAL_IP" != "127.0.0.1" ]; then
    echo "局域网访问:"
    echo "1. 前端界面: http://$LOCAL_IP:$FRONTEND_PORT/index.html"
    echo "2. 后端API: http://$LOCAL_IP:$BACKEND_PORT"
    echo ""
fi
echo "进程信息:"
echo "- 后端PID: $BACKEND_PID (日志: backend/backend.log)"
echo "- 前端PID: $FRONTEND_PID (日志: frontend/frontend.log)"
echo ""
echo "停止服务:"
echo "1. 按 Ctrl+C 停止此脚本"
echo "2. 或运行: kill $BACKEND_PID $FRONTEND_PID"
echo "=========================================="

# 捕获Ctrl+C，优雅停止服务
trap 'echo ""; print_info "正在停止服务..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; print_success "服务已停止"; exit 0' INT

# 保持脚本运行，显示日志
echo ""
print_info "按 Ctrl+C 停止所有服务"
echo ""

# 显示实时日志（可选）
tail -f backend/backend.log frontend/frontend.log 2>/dev/null || wait