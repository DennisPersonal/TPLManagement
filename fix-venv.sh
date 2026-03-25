#!/bin/bash

# 修复虚拟环境脚本
# 当虚拟环境从一台电脑复制到另一台电脑时，需要重新创建

echo "🔧 修复虚拟环境问题..."

cd backend

# 备份旧的虚拟环境
if [ -d "venv" ]; then
    echo "📦 备份旧的虚拟环境..."
    mv venv "venv.backup.$(date +%Y%m%d%H%M%S)"
    echo "✅ 旧虚拟环境已备份"
fi

# 检查Python
echo "🔍 检查Python安装..."
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: Python3 未安装"
    echo "请先安装 Python3: https://www.python.org/downloads/"
    exit 1
fi

python_version=$(python3 --version 2>&1)
echo "✅ Python版本: $python_version"

# 创建新的虚拟环境
echo "📦 创建新的虚拟环境..."
python3 -m venv venv

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 验证激活
if [ -z "$VIRTUAL_ENV" ]; then
    echo "❌ 错误: 虚拟环境激活失败"
    exit 1
fi

echo "✅ 虚拟环境激活成功: $VIRTUAL_ENV"

# 安装依赖
echo "📦 安装依赖包..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ 虚拟环境修复完成!"
echo ""
echo "现在可以运行以下命令启动项目:"
echo "1. 使用修复版脚本: ./start-fixed.sh"
echo "2. 或使用原脚本: ./start.sh"
echo ""
echo "如果仍有问题，请检查:"
echo "1. Python 是否正确安装"
echo "2. 是否有足够的权限"
echo "3. 网络连接是否正常"