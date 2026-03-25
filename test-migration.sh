#!/bin/bash

# 搬迁测试脚本
# 测试项目搬迁后的功能

set -e

echo "=========================================="
echo "🧪 项目搬迁测试脚本"
echo "=========================================="

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

TARGET_DIR="/Users/dennisduan/Documents/ClawProjects/project-management-system"

echo "测试目标目录: $TARGET_DIR"
echo ""

# 检查目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}❌ 错误: 目标目录不存在${NC}"
    echo "请先运行搬迁脚本: ./migrate-to-clawprojects.sh"
    exit 1
fi

echo -e "${GREEN}✅ 目标目录存在${NC}"

# 检查关键文件
echo ""
echo "检查关键文件..."
files_to_check=(
    "$TARGET_DIR/start-all.sh"
    "$TARGET_DIR/backend/main.py"
    "$TARGET_DIR/frontend/index.html"
    "$TARGET_DIR/backend/requirements.txt"
)

all_files_exist=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $(basename "$file")"
    else
        echo -e "  ${RED}✗${NC} $(basename "$file") (缺失)"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo -e "\n${RED}❌ 错误: 缺少关键文件${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ 所有关键文件存在${NC}"

# 检查脚本权限
echo ""
echo "检查脚本权限..."
scripts_to_check=(
    "$TARGET_DIR/start-all.sh"
    "$TARGET_DIR/start.sh"
    "$TARGET_DIR/serve-frontend.sh"
)

all_scripts_executable=true
for script in "${scripts_to_check[@]}"; do
    if [ -x "$script" ]; then
        echo -e "  ${GREEN}✓${NC} $(basename "$script") (可执行)"
    else
        echo -e "  ${RED}✗${NC} $(basename "$script") (不可执行)"
        all_scripts_executable=false
    fi
done

if [ "$all_scripts_executable" = false ]; then
    echo -e "\n${RED}❌ 错误: 脚本不可执行${NC}"
    echo "运行: chmod +x $TARGET_DIR/*.sh"
    exit 1
fi

echo -e "\n${GREEN}✅ 所有脚本可执行${NC}"

# 检查后端虚拟环境
echo ""
echo "检查后端虚拟环境..."
if [ -d "$TARGET_DIR/backend/venv" ]; then
    echo -e "  ${GREEN}✓${NC} 虚拟环境存在"
    
    # 检查Python版本
    if [ -f "$TARGET_DIR/backend/venv/bin/python" ]; then
        python_version=$("$TARGET_DIR/backend/venv/bin/python" --version 2>&1 || echo "未知")
        echo -e "  ${GREEN}✓${NC} Python版本: $python_version"
    else
        echo -e "  ${RED}✗${NC} Python解释器缺失"
    fi
else
    echo -e "  ${GREEN}ℹ${NC} 虚拟环境不存在（首次启动时会自动创建）"
fi

# 检查端口占用
echo ""
echo "检查端口占用..."
ports_to_check=(8000 8001)

for port in "${ports_to_check[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "  ${RED}⚠${NC} 端口 $port 被占用"
    else
        echo -e "  ${GREEN}✓${NC} 端口 $port 可用"
    fi
done

# 显示项目信息
echo ""
echo "=========================================="
echo "📊 项目信息"
echo "=========================================="
echo "目录: $TARGET_DIR"
echo ""

# 文件统计
file_count=$(find "$TARGET_DIR" -type f | wc -l | tr -d ' ')
dir_count=$(find "$TARGET_DIR" -type d | wc -l | tr -d ' ')
total_size=$(du -sh "$TARGET_DIR" | awk '{print $1}')

echo "文件统计:"
echo "  - 文件数: $file_count"
echo "  - 目录数: $dir_count"
echo "  - 总大小: $total_size"
echo ""

# 可用命令
echo "可用命令:"
echo "  1. 启动项目: $TARGET_DIR/start-all.sh"
echo "  2. 快捷启动: /Users/dennisduan/Documents/ClawProjects/start-project-management.sh"
echo "  3. 仅启动前端: $TARGET_DIR/serve-frontend.sh"
echo "  4. 仅启动后端: $TARGET_DIR/start.sh"
echo ""

# 访问地址
echo "访问地址:"
echo "  - 前端: http://localhost:8000/index.html"
echo "  - 后端: http://localhost:8001"
echo "  - API文档: http://localhost:8001/docs"
echo ""

echo "=========================================="
echo -e "${GREEN}✅ 搬迁测试通过!${NC}"
echo "=========================================="
echo ""
echo "下一步:"
echo "  1. 运行启动命令开始使用项目"
echo "  2. 查看 MIGRATION_GUIDE.md 获取详细指南"
echo "  3. 查看 README.md 了解项目功能"
echo ""

exit 0