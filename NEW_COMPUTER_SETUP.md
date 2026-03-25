# 新电脑设置指南

当将项目复制到新电脑时，可能会遇到虚拟环境问题。本指南提供解决方案。

## 问题症状
运行 `./start.sh` 时出现错误：
```
./start.sh: line 28: pip: command not found
```

## 根本原因
虚拟环境 (`venv`) 是从旧电脑复制过来的，其中的 Python 和 pip 路径指向了旧电脑的安装位置。

## 解决方案

### 方案1：使用修复脚本（推荐）
运行修复脚本重新创建虚拟环境：

```bash
# 给脚本添加执行权限（如果需要）
chmod +x fix-venv.sh

# 运行修复脚本
./fix-venv.sh
```

### 方案2：手动修复
1. 删除旧的虚拟环境：
   ```bash
   cd backend
   rm -rf venv
   ```

2. 创建新的虚拟环境：
   ```bash
   python3 -m venv venv
   ```

3. 激活虚拟环境：
   ```bash
   source venv/bin/activate
   ```

4. 安装依赖：
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. 返回项目根目录并启动：
   ```bash
   cd ..
   ./start.sh
   ```

### 方案3：使用修复版启动脚本
如果不想重新创建虚拟环境，可以使用修复版脚本：

```bash
# 给脚本添加执行权限
chmod +x start-fixed.sh

# 运行修复版脚本
./start-fixed.sh
```

## 检查步骤

### 1. 检查 Python 安装
```bash
python3 --version
```

如果未安装 Python3，请先安装：
- macOS: `brew install python`
- Ubuntu/Debian: `sudo apt install python3 python3-pip`
- Windows: 从 https://www.python.org/downloads/ 下载安装

### 2. 检查虚拟环境
```bash
cd backend
ls -la venv/bin/ | grep -E "(python|pip)"
```

正常应该看到：
- `python` -> `python3.x` 的符号链接
- `pip`, `pip3` 等可执行文件

### 3. 测试虚拟环境激活
```bash
source venv/bin/activate
which python
which pip
echo $VIRTUAL_ENV
```

## 常见问题

### Q1: 虚拟环境激活后 pip 仍然找不到
**原因**: 虚拟环境损坏或路径问题
**解决**: 使用修复脚本重新创建虚拟环境

### Q2: 权限被拒绝
**原因**: 脚本没有执行权限
**解决**: 
```bash
chmod +x *.sh
```

### Q3: Python 版本不匹配
**原因**: 新电脑的 Python 版本与旧电脑不同
**解决**: 确保安装 Python 3.8+ 版本

### Q4: 依赖安装失败
**原因**: 网络问题或包冲突
**解决**:
1. 检查网络连接
2. 尝试使用国内镜像源：
   ```bash
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
   ```

## 快速启动命令

```bash
# 方法1：使用修复脚本
./fix-venv.sh && ./start.sh

# 方法2：使用修复版启动脚本
./start-fixed.sh

# 方法3：手动步骤
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
./start.sh
```

## 验证安装

安装完成后，可以通过以下方式验证：

1. 检查后端服务：
   ```bash
   curl http://localhost:8000/api/health
   ```
   应该返回：`{"status":"healthy"}`

2. 检查前端：
   打开浏览器访问：`http://localhost:8080`

## 注意事项

1. **虚拟环境不要提交到 Git**：`.gitignore` 中已排除 `venv/`
2. **每台电脑都需要自己的虚拟环境**：虚拟环境不能在不同电脑间共享
3. **保持依赖更新**：定期更新 `requirements.txt` 中的包版本
4. **备份重要数据**：数据库文件等需要手动备份

## 联系支持

如果问题仍然存在，请提供以下信息：
1. 操作系统和版本
2. Python 版本 (`python3 --version`)
3. 完整的错误信息
4. 运行 `./fix-venv.sh` 的输出