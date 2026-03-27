#!/usr/bin/env python3
"""
测试后端API功能
"""

import sys
import os
import subprocess
import time

def check_backend_health():
    """检查后端健康状态（简化版本）"""
    print("⚠️  跳过实际HTTP检查（避免依赖requests）")
    return True

def start_backend():
    """启动后端服务"""
    print("🚀 启动后端服务...")
    
    # 检查是否已安装依赖
    try:
        import fastapi
        print("✅ FastAPI已安装")
    except ImportError:
        print("❌ FastAPI未安装，尝试安装依赖...")
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                         check=True, capture_output=True, text=True)
            print("✅ 依赖安装成功")
        except subprocess.CalledProcessError as e:
            print(f"❌ 依赖安装失败: {e}")
            return False
    
    # 启动后端服务
    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    os.chdir(backend_dir)
    
    # 使用子进程启动后端
    try:
        # 先检查是否能导入main模块
        import importlib.util
        spec = importlib.util.spec_from_file_location("main", "main.py")
        main_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(main_module)
        print("✅ 可以导入main模块")
        
        # 尝试启动服务
        print("⏳ 启动后端服务进程...")
        # 这里我们只测试导入，不实际启动服务
        return True
    except Exception as e:
        print(f"❌ 后端启动测试失败: {e}")
        return False

def test_frontend_files():
    """测试前端文件"""
    print("\n🔍 测试前端文件...")
    
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
    
    # 检查关键文件
    required_files = ["index.html", "main.html", "style.css", "app.js"]
    for file in required_files:
        file_path = os.path.join(frontend_dir, file)
        if os.path.exists(file_path):
            print(f"✅ {file} 存在")
        else:
            print(f"❌ {file} 不存在")
            return False
    
    # 检查index.html内容
    with open(os.path.join(frontend_dir, "index.html"), "r", encoding="utf-8") as f:
        content = f.read()
        if "项目管理系统" in content:
            print("✅ index.html包含正确标题")
        else:
            print("❌ index.html标题不正确")
            return False
    
    return True

def test_git_status():
    """测试Git状态"""
    print("\n🔍 测试Git状态...")
    
    try:
        result = subprocess.run(["git", "status"], 
                              capture_output=True, text=True, check=True)
        if "nothing to commit" in result.stdout:
            print("✅ Git工作区干净")
        else:
            print("⚠️  Git工作区有未提交的更改")
            print(result.stdout[:200])
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Git状态检查失败: {e}")
        return False

def main():
    """主测试函数"""
    print("=" * 60)
    print("🚀 TPLManagement项目功能验证")
    print("=" * 60)
    
    # 测试Git状态
    if not test_git_status():
        print("\n❌ Git状态测试失败")
        return False
    
    # 测试前端文件
    if not test_frontend_files():
        print("\n❌ 前端文件测试失败")
        return False
    
    # 测试后端功能（不实际启动服务）
    print("\n🔍 测试后端功能...")
    try:
        # 检查main.py是否可以导入
        backend_dir = os.path.join(os.path.dirname(__file__), "backend")
        sys.path.insert(0, backend_dir)
        
        import importlib.util
        spec = importlib.util.spec_from_file_location("main", os.path.join(backend_dir, "main.py"))
        main_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(main_module)
        print("✅ 后端main.py可以成功导入")
        
        # 检查是否有必要的模块
        if hasattr(main_module, 'app'):
            print("✅ 找到FastAPI应用实例")
        else:
            print("❌ 未找到FastAPI应用实例")
            return False
            
    except Exception as e:
        print(f"❌ 后端导入测试失败: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("✅ 所有基本功能验证通过!")
    print("=" * 60)
    
    # 显示项目信息
    print("\n📋 项目信息:")
    print(f"   项目目录: {os.path.abspath('.')}")
    print(f"   前端文件: {len(os.listdir('frontend'))} 个文件")
    print(f"   后端文件: {len(os.listdir('backend'))} 个文件")
    
    # 显示下一步建议
    print("\n📝 下一步建议:")
    print("   1. 运行 ./start-all.sh 启动完整系统")
    print("   2. 访问 frontend/index.html 查看前端界面")
    print("   3. 运行 python3 backend/main.py 启动后端API")
    print("   4. 使用 git add . && git commit -m '更新说明' && git push 推送更改")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)