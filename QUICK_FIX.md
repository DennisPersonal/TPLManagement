# 快速修复指南

当在新电脑上遇到 `pip: command not found` 错误时，使用本指南快速修复。

## 问题
运行 `./start.sh` 时出现：
```
./start.sh: line 28: pip: command not found
```

## 一键修复
运行以下命令：

```bash
# 1. 进入项目目录
cd /path/to/project-system

# 2. 运行修复脚本
./fix-venv.sh

# 3. 启动项目
./start.sh
```

## 分步修复

### 步骤1：检查问题
```bash
cd backend
ls -la venv/bin/ | grep pip
```

如果看不到 `pip` 文件，说明虚拟环境损坏。

### 步骤2：删除旧虚拟环境
```bash
rm -rf venv
```

### 步骤3：创建新虚拟环境
```bash
python3 -m venv venv
```

### 步骤4：激活并安装依赖
```bash
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 步骤5：返回并启动
```bash
cd ..
./start.sh
```

## 替代方案

### 使用修复版启动脚本
```bash
chmod +x start-fixed.sh
./start-fixed.sh
```

### 使用诊断工具
```bash
./diagnose-venv.py
```

## 验证修复

修复后，运行以下命令验证：

```bash
# 检查虚拟环境
cd backend
source venv/bin/activate
which python
which pip
pip --version

# 测试后端
python -c "import fastapi; print('FastAPI版本:', fastapi.__version__)"
```

## 预防措施

1. **不要提交虚拟环境到 Git**：确保 `.gitignore` 包含 `venv/`
2. **每台电脑单独创建虚拟环境**：虚拟环境不能跨电脑使用
3. **记录依赖版本**：定期更新 `requirements.txt`

## 获取帮助

如果问题仍然存在，请提供：
1. 运行 `./diagnose-venv.py` 的输出
2. 操作系统信息
3. Python 版本 (`python3 --version`)