// 项目管理系统 - 主JavaScript文件

class ProjectManagementSystem {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8001/api';
        this.currentProject = null;
        this.init();
    }

    init() {
        console.log('项目管理系统初始化...');
        this.bindEvents();
        this.checkBackendStatus();
        this.loadSampleData();
    }

    bindEvents() {
        // 绑定按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                const action = e.target.getAttribute('data-action');
                this.handleAction(action);
            }
        });

        // 绑定表单提交
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
    }

    async checkBackendStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/health`);
            if (response.ok) {
                this.updateStatus('backend', 'running');
                console.log('后端服务运行正常');
                
                // 检查完整的系统状态
                await this.checkSystemStatus();
            } else {
                this.updateStatus('backend', 'stopped');
            }
        } catch (error) {
            this.updateStatus('backend', 'stopped');
            console.warn('后端服务未启动或无法访问');
        }
    }

    async checkSystemStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/status`);
            if (response.ok) {
                const data = await response.json();
                console.log('系统状态检查结果:', data);
                
                // 更新各个组件的状态
                if (data.components.backend) {
                    this.updateStatus('backend', data.components.backend.status);
                }
                
                if (data.components.database) {
                    const dbStatus = data.components.database.status;
                    this.updateStatus('database', dbStatus === 'connected' ? 'running' : 'stopped');
                }
                
                if (data.components.ai_parser) {
                    const aiStatus = data.components.ai_parser.status;
                    this.updateStatus('ai', aiStatus === 'available' ? 'running' : 'stopped');
                }
            }
        } catch (error) {
            console.warn('系统状态检查失败:', error);
            // 如果状态检查失败，保持当前状态
        }
    }

    updateStatus(component, status) {
        const statusElement = document.querySelector(`[data-status="${component}"]`);
        if (statusElement) {
            statusElement.textContent = this.getStatusText(status, component);
            statusElement.className = `status-value ${this.getStatusClass(status)}`;
        }
    }

    getStatusText(status, component) {
        const statusMap = {
            'running': {
                'frontend': '✅ 运行中',
                'backend': '✅ 运行中',
                'database': '✅ 已连接',
                'ai': '✅ 已配置'
            },
            'pending': {
                'frontend': '⏳ 待启动',
                'backend': '⏳ 待启动',
                'database': '⏳ 待连接',
                'ai': '⏳ 待配置'
            },
            'stopped': {
                'frontend': '❌ 已停止',
                'backend': '❌ 已停止',
                'database': '❌ 连接失败',
                'ai': '❌ 配置失败'
            },
            'error': {
                'frontend': '⚠️ 错误',
                'backend': '⚠️ 错误',
                'database': '⚠️ 连接错误',
                'ai': '⚠️ 配置错误'
            }
        };
        
        if (statusMap[status] && statusMap[status][component]) {
            return statusMap[status][component];
        }
        
        // 默认回退
        const defaultMap = {
            'running': '✅ 运行中',
            'pending': '⏳ 待启动',
            'stopped': '❌ 已停止',
            'error': '⚠️ 错误'
        };
        return defaultMap[status] || '❓ 未知';
    }

    getStatusClass(status) {
        const classMap = {
            'running': 'running',
            'pending': 'pending',
            'stopped': 'stopped',
            'error': 'stopped'  // 错误状态也使用stopped样式
        };
        return classMap[status] || 'pending';
    }

    loadSampleData() {
        // 加载示例项目数据
        const sampleProjects = [
            {
                id: 1,
                name: '网站重构项目',
                description: '公司官网全面升级改版',
                startDate: '2026-03-20',
                endDate: '2026-05-20',
                progress: 45,
                priority: 'P1'
            },
            {
                id: 2,
                name: '移动应用开发',
                description: 'iOS和Android双平台应用',
                startDate: '2026-03-15',
                endDate: '2026-06-30',
                progress: 30,
                priority: 'P0'
            },
            {
                id: 3,
                name: '数据分析平台',
                description: '大数据分析和可视化平台',
                startDate: '2026-04-01',
                endDate: '2026-07-15',
                progress: 10,
                priority: 'P2'
            }
        ];

        this.renderProjects(sampleProjects);
    }

    renderProjects(projects) {
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = projects.map(project => `
            <div class="module-card fade-in">
                <div class="module-icon">📁</div>
                <h3 class="module-title">${project.name}</h3>
                <p class="module-desc">${project.description}</p>
                <div class="mt-2">
                    <span class="status-badge ${project.priority === 'P0' ? 'status-stopped' : 
                                           project.priority === 'P1' ? 'status-pending' : 'status-running'}">
                        ${project.priority}
                    </span>
                    <span class="text-secondary" style="float: right;">
                        进度: ${project.progress}%
                    </span>
                </div>
                <div class="progress-bar mt-2">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <div class="btn-group mt-3">
                    <button class="btn btn-secondary" data-action="view-project" data-id="${project.id}">
                        查看详情
                    </button>
                    <button class="btn btn-primary" data-action="edit-project" data-id="${project.id}">
                        编辑任务
                    </button>
                </div>
            </div>
        `).join('');

        // 添加进度条样式
        this.addProgressBarStyles();
    }

    addProgressBarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4f46e5, #7c3aed);
                border-radius: 4px;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    handleAction(action) {
        const actions = {
            'create-project': () => this.showCreateProjectForm(),
            'view-project': (id) => this.viewProject(id),
            'edit-project': (id) => this.editProject(id),
            'generate-report': () => this.generateReport(),
            'open-dashboard': () => this.openDashboard(),
            'test-api': () => this.testAPI(),
            'start-backend': () => this.startBackend()
        };

        if (actions[action]) {
            const element = event.target;
            const id = element.getAttribute('data-id');
            actions[action](id);
        }
    }

    showCreateProjectForm() {
        alert('创建项目功能正在开发中...\n\n即将推出：\n• 项目基本信息输入\n• 时间线设置\n• 团队分配\n• 自动任务分解');
    }

    viewProject(id) {
        alert(`查看项目详情 #${id}\n\n功能正在开发中...\n\n将显示：\n• 项目时间线\n• 任务列表\n• 团队负载\n• 进度统计`);
    }

    editProject(id) {
        alert(`编辑项目 #${id}\n\n功能正在开发中...\n\n将支持：\n• 任务优先级调整\n• 时间线修改\n• 团队重新分配\n• 里程碑设置`);
    }

    generateReport() {
        alert('生成报告功能正在开发中...\n\n支持的报告类型：\n• 每日任务清单\n• 进度周报\n• 团队负载报告\n• 项目风险分析');
    }

    openDashboard() {
        alert('打开Dashboard功能正在开发中...\n\n可视化Dashboard将显示：\n• 项目进度甘特图\n• 任务状态分布\n• 团队负载视图\n• 关键节点倒计时');
    }

    async testAPI() {
        alert('API测试功能正在开发中...\n\n可用API端点：\n• POST /api/projects - 创建项目\n• GET /api/projects/{id}/tasks - 获取任务\n• GET /api/dashboard/{id} - Dashboard数据\n• POST /api/tasks/{id}/complete - 完成任务');
        
        // 模拟API测试
        this.showAPITestResults();
    }

    showAPITestResults() {
        const results = [
            { endpoint: '/api/health', status: '❌ 失败', response: 'Connection refused' },
            { endpoint: '/api/projects', status: '❌ 失败', response: 'Endpoint not found' },
            { endpoint: '/api/tasks', status: '❌ 失败', response: 'Service unavailable' }
        ];

        let message = 'API测试结果：\n\n';
        results.forEach(result => {
            message += `${result.endpoint}: ${result.status}\n`;
            message += `响应: ${result.response}\n\n`;
        });
        message += '提示：请先启动后端服务';

        alert(message);
    }

    startBackend() {
        alert('启动后端服务\n\n请运行以下命令：\n\ncd /Users/dennisduan/.openclaw/workspace/project-system/backend\npython3 -m uvicorn main:app --reload --port 8000\n\n或者使用Docker：\ndocker-compose up');
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('表单提交数据:', data);
        alert(`表单提交成功！\n\n数据已接收：\n${JSON.stringify(data, null, 2)}\n\n后端API集成正在开发中...`);
        
        form.reset();
    }
}

// 页面加载完成后初始化系统
document.addEventListener('DOMContentLoaded', () => {
    window.pms = new ProjectManagementSystem();
    
    // 添加一些演示功能
    setTimeout(() => {
        console.log('项目管理系统已就绪！');
        console.log('可用命令：');
        console.log('- pms.showCreateProjectForm() - 显示创建项目表单');
        console.log('- pms.generateReport() - 生成报告');
        console.log('- pms.openDashboard() - 打开Dashboard');
        console.log('- pms.testAPI() - 测试API接口');
    }, 1000);
});

// 工具函数
function formatDate(date) {
    return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateDaysBetween(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectManagementSystem, formatDate, calculateDaysBetween };
}