import requests
import sys

def test_api():
    print("=== API诊断测试 ===")
    
    # 测试健康检查
    try:
        health_url = "http://localhost:8001/api/health"
        print(f"1. 测试健康检查: {health_url}")
        health_res = requests.get(health_url, timeout=5)
        print(f"   状态码: {health_res.status_code}")
        print(f"   响应: {health_res.json()}")
    except Exception as e:
        print(f"   错误: {e}")
    
    # 测试状态检查
    try:
        status_url = "http://localhost:8001/api/status"
        print(f"\n2. 测试状态检查: {status_url}")
        status_res = requests.get(status_url, timeout=5)
        print(f"   状态码: {status_res.status_code}")
        if status_res.status_code == 200:
            data = status_res.json()
            print(f"   后端状态: {data['components']['backend']['status']}")
            print(f"   数据库状态: {data['components']['database']['status']}")
            print(f"   AI状态: {data['components']['ai_parser']['status']}")
        else:
            print(f"   响应: {status_res.text}")
    except Exception as e:
        print(f"   错误: {e}")
    
    # 测试前端服务
    try:
        frontend_url = "http://localhost:8000/index.html"
        print(f"\n3. 测试前端服务: {frontend_url}")
        frontend_res = requests.get(frontend_url, timeout=5)
        print(f"   状态码: {frontend_res.status_code}")
        print(f"   内容长度: {len(frontend_res.text)} 字符")
    except Exception as e:
        print(f"   错误: {e}")
    
    print("\n=== 诊断完成 ===")

if __name__ == "__main__":
    try:
        import requests
        test_api()
    except ImportError:
        print("错误: 需要requests库，请运行: pip install requests")
        sys.exit(1)
