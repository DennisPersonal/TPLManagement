#!/bin/bash

# push-to-github.sh
# 帮助用户将项目推送到 GitHub 仓库

set -e

echo "🚀 项目管理系统 GitHub 推送助手"
echo "================================="

# 检查当前目录
if [ ! -f "README.md" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 项目信息:"
echo "  仓库: https://github.com/DennisPersonal/TPLManagement"
echo "  本地目录: $(pwd)"
echo ""

# 检查 Git 状态
echo "🔍 检查 Git 状态..."
git status --short

echo ""
echo "📝 提交信息:"
git log --oneline -5

echo ""
echo "🔑 认证选项:"
echo "1. 使用 SSH 密钥 (已生成)"
echo "2. 使用 GitHub Token"
echo "3. 手动操作"
echo ""
read -p "请选择选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔐 SSH 公钥:"
        cat ~/.ssh/id_ed25519_github.pub
        echo ""
        echo "请将上面的公钥添加到 GitHub:"
        echo "1. 登录 GitHub → Settings → SSH and GPG keys"
        echo "2. 点击 'New SSH key'"
        echo "3. 粘贴公钥并保存"
        echo ""
        read -p "完成后按 Enter 继续..." 
        
        echo "🔄 配置 SSH 远程..."
        git remote set-url origin git@github.com:DennisPersonal/TPLManagement.git
        ;;
    2)
        echo ""
        echo "🔐 需要 GitHub Token:"
        echo "1. 登录 GitHub → Settings → Developer settings"
        echo "2. 选择 'Personal access tokens' → 'Tokens (classic)'"
        echo "3. 生成新 token，选择 'repo' 权限"
        echo ""
        read -p "请输入 GitHub Token: " token
        
        if [ -z "$token" ]; then
            echo "❌ Token 不能为空"
            exit 1
        fi
        
        echo "🔄 配置 HTTPS 远程..."
        git remote set-url origin "https://${token}@github.com/DennisPersonal/TPLManagement.git"
        ;;
    3)
        echo ""
        echo "📋 手动操作指南:"
        echo "1. 确保你有仓库的推送权限"
        echo "2. 配置远程仓库:"
        echo "   git remote set-url origin <your-remote-url>"
        echo "3. 推送代码:"
        echo "   git push -u origin master"
        echo ""
        exit 0
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🚀 开始推送..."
if git push -u origin master; then
    echo ""
    echo "✅ 推送成功!"
    echo ""
    echo "🌐 仓库地址: https://github.com/DennisPersonal/TPLManagement"
    echo "📊 查看提交: git log --oneline"
else
    echo ""
    echo "❌ 推送失败"
    echo "可能的原因:"
    echo "1. 认证失败"
    echo "2. 网络问题"
    echo "3. 仓库不存在或无权限"
    echo ""
    echo "💡 建议:"
    echo "1. 检查 ~/.ssh/id_ed25519_github.pub 是否已添加到 GitHub"
    echo "2. 验证 token 是否正确"
    echo "3. 确认仓库 https://github.com/DennisPersonal/TPLManagement 存在"
fi