#!/usr/bin/env python3
import subprocess
import sys
import os

def check_remote():
    """检查远程仓库是否存在"""
    try:
        result = subprocess.run(
            ["git", "ls-remote", "https://github.com/DennisPersonal/TPLManagement.git"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            print("✅ 远程仓库存在")
            return True
        else:
            print("❌ 无法访问远程仓库")
            print(f"错误: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ 检查远程仓库时出错: {e}")
        return False

def main():
    print("检查项目状态...")
    
    # 检查当前目录
    os.chdir("/Users/dennisduan/.openclaw/workspace/project-system")
    
    # 检查 Git 状态
    status = subprocess.run(["git", "status"], capture_output=True, text=True)
    print("Git 状态:")
    print(status.stdout)
    
    # 检查远程仓库
    if check_remote():
        print("\n尝试推送...")
        # 这里需要 GitHub token 或 SSH 密钥
        print("需要 GitHub 认证才能推送")
        print("\n请执行以下操作之一:")
        print("1. 将 SSH 公钥添加到 GitHub:")
        print("   cat ~/.ssh/id_ed25519_github.pub")
        print("2. 使用 GitHub token:")
        print("   git remote set-url origin https://<token>@github.com/DennisPersonal/TPLManagement.git")
    else:
        print("\n远程仓库可能不存在或无法访问")
        print("请确保仓库 https://github.com/DennisPersonal/TPLManagement 存在")

if __name__ == "__main__":
    main()