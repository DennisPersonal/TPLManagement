#!/bin/bash

# 项目管理系统搬迁脚本
# 将项目搬迁到 /Users/dennisduan/Documents/ClawProjects/

set -e

echo "=========================================="
echo "📦 项目管理系统搬迁脚本"
echo "=========================================="

# 源目录和目标目录
SOURCE_DIR="/Users/dennisduan/.openclaw/workspace/project-system"
TARGET_DIR="/Users/dennisduan/Documents/ClawProjects/project-management-system"

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

# 检查源目录是否存在
print_info "检查源目录..."
if [ ! -d "$SOURCE_DIR" ]; then
    print_error "源目录不存在: $SOURCE_DIR"
    exit 1
fi
print_success "源目录存在: $SOURCE_DIR"

# 检查目标目录
print_info "检查目标目录..."
if [ -d "$TARGET_DIR" ]; then
    print_warning "目标目录已存在: $TARGET_DIR"
    read -p "是否覆盖？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "取消搬迁"
        exit 0
    fi
    print_info "备份现有目录..."
    BACKUP_DIR="${TARGET_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
    mv "$TARGET_DIR" "$BACKUP_DIR" 2>/dev/null || true
    print_success "已备份到: $BACKUP_DIR"
fi

# 创建目标目录
print_info "创建目标目录..."
mkdir -p "$(dirname "$TARGET_DIR")"
print_success "父目录已创建"

# 显示项目结构
print_info "项目结构:"
echo ""
tree -L 2 "$SOURCE_DIR" 2>/dev/null || find "$SOURCE_DIR" -type f | head -20
echo ""

# 确认搬迁
print_warning "即将搬迁项目:"
echo "从: $SOURCE_DIR"
echo "到: $TARGET_DIR"
echo ""
read -p "确认搬迁？(y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "取消搬迁"
    exit 0
fi

# 开始搬迁
print_info "开始搬迁项目..."

# 使用rsync进行搬迁（保留权限和时间戳）
print_info "复制文件..."
rsync -av --progress "$SOURCE_DIR/" "$TARGET_DIR/" --exclude="venv" --exclude="__pycache__" --exclude="*.pyc" --exclude=".git"

print_success "文件复制完成"

# 更新启动脚本中的路径
print_info "更新启动脚本中的路径..."
sed -i '' "s|/Users/dennisduan/.openclaw/workspace/project-system|$TARGET_DIR|g" "$TARGET_DIR/start-all.sh" 2>/dev/null || true
sed -i '' "s|/Users/dennisduan/.openclaw/workspace/project-system|$TARGET_DIR|g" "$TARGET_DIR/serve-frontend.sh" 2>/dev/null || true

# 设置执行权限
print_info "设置脚本执行权限..."
chmod +x "$TARGET_DIR/start-all.sh"
chmod +x "$TARGET_DIR/start.sh"
chmod +x "$TARGET_DIR/serve-frontend.sh"
chmod +x "$TARGET_DIR/migrate-to-clawprojects.sh"

print_success "权限设置完成"

# 创建快捷启动脚本
print_info "创建快捷启动脚本..."
cat > "/Users/dennisduan/Documents/ClawProjects/start-project-management.sh" << 'EOF'
#!/bin/bash

# 项目管理系统快捷启动脚本

PROJECT_DIR="/Users/dennisduan/Documents/ClawProjects/project-management-system"

if [ ! -d "$PROJECT_DIR" ]; then
    echo "错误: 项目目录不存在: $PROJECT_DIR"
    echo "请先运行搬迁脚本: $PROJECT_DIR/migrate-to-clawprojects.sh"
    exit 1
fi

cd "$PROJECT_DIR"
./start-all.sh
EOF

chmod +x "/Users/dennisduan/Documents/ClawProjects/start-project-management.sh"

# 显示搬迁结果
echo ""
echo "=========================================="
print_success "✅ 项目搬迁完成!"
echo "=========================================="
echo ""
echo "项目位置: $TARGET_DIR"
echo ""
echo "文件统计:"
find "$TARGET_DIR" -type f | wc -l | xargs echo "文件总数:"
du -sh "$TARGET_DIR" | awk '{print "总大小: " $1}'
echo ""
echo "可用命令:"
echo "1. 启动项目: $TARGET_DIR/start-all.sh"
echo "2. 快捷启动: /Users/dennisduan/Documents/ClawProjects/start-project-management.sh"
echo "3. 仅启动前端: $TARGET_DIR/serve-frontend.sh"
echo "4. 仅启动后端: $TARGET_DIR/start.sh"
echo ""
echo "访问地址:"
echo "- 前端: http://localhost:8000/index.html"
echo "- 后端API: http://localhost:8001"
echo "- API文档: http://localhost:8001/docs"
echo ""
echo "搬迁完成时间: $(date)"
echo "=========================================="