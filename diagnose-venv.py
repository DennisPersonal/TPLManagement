#!/usr/bin/env python3
"""
虚拟环境诊断工具
用于检查新电脑上的虚拟环境问题
"""

import os
import sys
import subprocess
import platform

def run_command(cmd, cwd=None):
    """运行命令并返回输出"""
    try:
        result = subprocess.run(
            cmd, 
            shell=True, 
            capture_output=True, 
            text=True,
            cwd=cwd
        )
        return result.returncode, result.stdout.strip(), result.stderr.strip()
    except Exception as e:
        return -1, "", str(e)

def print_section(title):
    """打印章节标题"""
    print("\n" + "="*60)
    print(f" {title}")
    print("="*60)

def main():
    print("🔍 虚拟环境诊断工具")
    print(f"系统: {platform.system()} {platform.release()}")
    print(f"Python路径: {sys.executable}")
    print(f"Python版本: {platform.python_version()}")
    
    # 检查项目目录
    project_root = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(project_root, "backend")
    
    print_section("1. 项目目录结构")
    print(f"项目根目录: {project_root}")
    print(f"后端目录: {backend_dir}")
    
    # 检查目录是否存在
    if not os.path.exists(backend_dir):
        print("❌ 错误: backend 目录不存在")
        return
    
    # 检查虚拟环境
    venv_dir = os.path.join(backend_dir, "venv")
    print_section("2. 虚拟环境检查")
    
    if os.path.exists(venv_dir):
        print(f"✅ 虚拟环境目录存在: {venv_dir}")
        
        # 检查关键文件
        key_files = [
            ("venv/bin/activate", "激活脚本"),
            ("venv/bin/python", "Python可执行文件"),
            ("venv/bin/pip", "pip可执行文件"),
        ]
        
        for rel_path, desc in key_files:
            full_path = os.path.join(backend_dir, rel_path)
            if os.path.exists(full_path):
                print(f"  ✅ {desc}: {full_path}")
                
                # 检查文件类型
                if os.path.islink(full_path):
                    try:
                        target = os.readlink(full_path)
                        print(f"     链接到: {target}")
                    except:
                        print(f"     无法读取链接目标")
            else:
                print(f"  ❌ {desc} 不存在: {rel_path}")
    else:
        print(f"❌ 虚拟环境目录不存在: {venv_dir}")
        print("建议运行: ./fix-venv.sh")
    
    print_section("3. Python环境检查")
    
    # 检查系统Python
    code, stdout, stderr = run_command("python3 --version")
    if code == 0:
        print(f"✅ 系统Python: {stdout}")
    else:
        print(f"❌ 系统Python不可用: {stderr}")
    
    # 检查虚拟环境Python（如果存在）
    if os.path.exists(venv_dir):
        venv_python = os.path.join(venv_dir, "bin", "python")
        if os.path.exists(venv_python):
            code, stdout, stderr = run_command(f"{venv_python} --version")
            if code == 0:
                print(f"✅ 虚拟环境Python: {stdout}")
            else:
                print(f"❌ 虚拟环境Python不可用: {stderr}")
    
    print_section("4. pip检查")
    
    # 检查系统pip
    code, stdout, stderr = run_command("python3 -m pip --version")
    if code == 0:
        print(f"✅ 系统pip: {stdout.split()[1]}")
    else:
        print(f"❌ 系统pip不可用: {stderr}")
    
    # 检查虚拟环境pip（如果存在）
    if os.path.exists(venv_dir):
        venv_pip = os.path.join(venv_dir, "bin", "pip")
        if os.path.exists(venv_pip):
            code, stdout, stderr = run_command(f"{venv_pip} --version")
            if code == 0:
                print(f"✅ 虚拟环境pip: {stdout.split()[1]}")
            else:
                print(f"❌ 虚拟环境pip不可用: {stderr}")
    
    print_section("5. 依赖检查")
    
    requirements_file = os.path.join(backend_dir, "requirements.txt")
    if os.path.exists(requirements_file):
        print(f"✅ requirements.txt 存在")
        with open(requirements_file, 'r') as f:
            lines = f.readlines()
            print(f"  包含 {len(lines)} 个依赖包")
            for i, line in enumerate(lines[:5]):  # 只显示前5个
                if line.strip() and not line.startswith('#'):
                    print(f"  {i+1}. {line.strip()}")
            if len(lines) > 5:
                print(f"  ... 还有 {len(lines)-5} 个依赖包")
    else:
        print(f"❌ requirements.txt 不存在")
    
    print_section("6. 建议")
    
    if not os.path.exists(venv_dir):
        print("🔧 建议: 运行 ./fix-venv.sh 创建虚拟环境")
    else:
        # 检查虚拟环境是否可用
        venv_python = os.path.join(venv_dir, "bin", "python")
        if os.path.exists(venv_python):
            code, stdout, stderr = run_command(f"{venv_python} -c \"import sys; print('Python导入正常')\"")
            if code == 0:
                print("✅ 虚拟环境看起来正常")
                print("🔧 如果仍有问题，尝试:")
                print("   1. 运行: ./start-fixed.sh")
                print("   2. 或重新创建虚拟环境: ./fix-venv.sh")
            else:
                print("❌ 虚拟环境可能损坏")
                print("🔧 建议: 运行 ./fix-venv.sh 重新创建虚拟环境")
        else:
            print("❌ 虚拟环境不完整")
            print("🔧 建议: 运行 ./fix-venv.sh 重新创建虚拟环境")
    
    print("\n" + "="*60)
    print("诊断完成!")
    print("="*60)

if __name__ == "__main__":
    main()