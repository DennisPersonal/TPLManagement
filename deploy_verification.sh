#!/bin/bash

# TPLManagement项目部署验证脚本
# 用于验证项目在目标环境中的完整功能

set -e

echo "=========================================="
echo "🚀 TPLManagement项目部署验证"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查函数
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        return 0
    else
        echo -e "${RED}❌ $1${NC}"
        return 1
    fi
}

# 1. 检查基本环境
echo "🔍 检查基本环境..."
python3 --version
check "Python 3 可用"

git --version
check "Git 可用"

# 2. 检查项目结构
echo -e "\n📁 检查项目结构..."
[ -d "frontend" ] && [ -d "backend" ]
check "项目结构完整"

# 3. 检查关键文件
echo -e "\n📄 检查关键文件..."
[ -f "README.md" ] && [ -f "CHANGELOG.md" ] && [ -f "test_backend.py" ]
check "关键文档文件存在"

[ -f "frontend/index.html" ] && [ -f "frontend/style.css" ] && [ -f "frontend/app.js" ]
check "前端核心文件存在"

[ -f "backend/main.py" ] && [ -f "backend/requirements.txt" ]
check "后端核心文件存在"

# 4. 检查Python依赖
echo -e "\n🐍 检查Python依赖..."
python3 -c "import fastapi; print(f'FastAPI版本: {fastapi.__version__}')"
check "FastAPI 可用"

# 5. 运行功能测试
echo -e "\n🧪 运行功能测试..."
python3 test_backend.py
check "功能测试通过"

# 6. 检查启动脚本
echo -e "\n🚀 检查启动脚本..."
[ -f "start-all.sh" ] && [ -x "start-all.sh" ]
check "启动脚本可用"

[ -f "backend/start.sh" ] && [ -x "backend/start.sh" ]
check "后端启动脚本可用"

# 7. 生成验证报告
echo -e "\n📋 生成验证报告..."
cat > deployment_verification_report.md << EOF
# 部署验证报告

## 项目信息
- 项目名称: TPLManagement
- 验证时间: $(date)
- 项目版本: 1.0.1
- 验证环境: $(uname -a)

## 验证结果
$(echo -e "✅ 基本环境检查通过\n✅ 项目结构检查通过\n✅ 关键文件检查通过\n✅ Python依赖检查通过\n✅ 功能测试通过\n✅ 启动脚本检查通过")

## 系统要求
- Python 3.11+
- Git
- FastAPI 0.104+
- 现代浏览器

## 部署说明
1. 克隆项目: \`git clone https://github.com/DennisPersonal/TPLManagement\`
2. 进入目录: \`cd TPLManagement\`
3. 安装依赖: \`cd backend && pip install -r requirements.txt\`
4. 启动后端: \`python3 main.py\`
5. 访问前端: 打开 \`frontend/index.html\`

## 测试命令
\`\`\`bash
# 运行功能验证
python3 test_backend.py

# 启动完整系统
./start-all.sh
\`\`\`

## 注意事项
- 确保端口8000未被占用
- 首次运行需要安装Python依赖
- 前端文件可直接在浏览器中打开

---
*验证完成时间: $(date)*
EOF

check "验证报告生成成功"

echo -e "\n=========================================="
echo -e "${GREEN}🎉 所有验证通过！项目已准备好部署。${NC}"
echo "=========================================="
echo -e "\n📋 验证报告已保存到: deployment_verification_report.md"
echo -e "\n🚀 下一步操作:"
echo "   1. 查看验证报告: cat deployment_verification_report.md"
echo "   2. 启动完整系统: ./start-all.sh"
echo "   3. 提交更改: git add . && git commit -m '版本更新' && git push"
echo -e "\n🔗 项目地址: https://github.com/DennisPersonal/TPLManagement"
echo "=========================================="