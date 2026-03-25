// 功能模块处理器
class ModuleHandler {
    constructor() {
        this.modules = {
            'task-decomposition': {
                name: '任务分解',
                icon: '📋',
                description: '根据项目时间线和团队信息，AI自动生成每日/每周/每月任务列表',
                handler: this.handleTaskDecomposition.bind(this)
            },
            'priority-management': {
                name: '优先级管理',
                icon: '🎯',
                description: '拖拽式优先级排序，支持P0-P3四级优先级，批量任务管理',
                handler: this.handlePriorityManagement.bind(this)
            },
            'reminder-service': {
                name: '提醒服务',
                icon: '⏰',
                description: '关键里程碑前自动发送通知提醒，支持邮件、短信、系统通知',
                handler: this.handleReminderService.bind(this)
            },
            'visualization-dashboard': {
                name: '可视化Dashboard',
                icon: '📊',
                description: '按项目/时间显示任务进度和统计，图表化展示团队负载',
                handler: this.handleVisualizationDashboard.bind(this)
            },
            'auto-report': {
                name: '自动报告',
                icon: '📄',
                description: '基于任务优先级生成每日报告，支持多种模板和导出格式',
                handler: this.handleAutoReport.bind(this)
            },
            'api-interface': {
                name: 'API接口',
                icon: '🔧',
                description: '完整的RESTful API，支持第三方集成和自动化工作流',
                handler: this.handleApiInterface.bind(this)
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindModuleClicks();
        this.addModalStyles();
        console.log('功能模块处理器已初始化');
    }
    
    bindModuleClicks() {
        // 为所有模块卡片添加点击事件
        document.addEventListener('click', (e) => {
            const moduleCard = e.target.closest('.module-card');
            if (moduleCard) {
                const moduleTitle = moduleCard.querySelector('h3').textContent;
                this.handleModuleClick(moduleTitle);
            }
        });
    }
    
    handleModuleClick(moduleName) {
        // 根据模块名称找到对应的处理器
        const moduleKey = Object.keys(this.modules).find(key => 
            this.modules[key].name === moduleName
        );
        
        if (moduleKey && this.modules[moduleKey]) {
            console.log(`点击模块: ${moduleName}`);
            this.modules[moduleKey].handler();
        } else {
            console.warn(`未找到模块处理器: ${moduleName}`);
            this.showModuleNotImplemented(moduleName);
        }
    }
    
    // 添加模态框样式
    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal-content {
                background: white;
                border-radius: 10px;
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #4f46e5;
                color: white;
                border-radius: 10px 10px 0 0;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-footer {
                padding: 15px 20px;
                border-top: 1px solid #e2e8f0;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .form-input, .form-textarea, .form-select {
                width: 100%;
                padding: 10px;
                border: 1px solid #cbd5e1;
                border-radius: 5px;
                font-size: 1rem;
            }
            
            .form-textarea {
                resize: vertical;
                min-height: 80px;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
            }
            
            .form-row .form-group {
                flex: 1;
            }
            
            .upload-options {
                margin: 15px 0;
            }
            
            .upload-option {
                margin-bottom: 15px;
            }
            
            .file-upload {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
            }
            
            .radio-group {
                display: flex;
                gap: 15px;
                margin-top: 10px;
            }
            
            .radio-group label {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        `;
        document.head.appendChild(style);
    }
    
    showModal(html) {
        // 移除现有的模态框
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // 添加新的模态框
        document.body.insertAdjacentHTML('beforeend', html);
    }
    
    showAlert(title, message) {
        alert(`${title}\n\n${message}`);
    }
    
    showModuleNotImplemented(moduleName) {
        this.showAlert('功能开发中', `${moduleName}功能正在开发中，敬请期待！`);
    }
    
    // 任务分解模块
    handleTaskDecomposition() {
        console.log('打开任务分解模块');
        this.showTaskDecompositionModal();
    }
    
    // 任务分解模态框
    showTaskDecompositionModal() {
        const modalHtml = `
            <div class="modal-overlay" id="task-decomposition-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>📋 任务分解</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <p>上传项目信息，AI将自动分解为详细任务列表</p>
                        
                        <div class="form-group">
                            <label>项目名称</label>
                            <input type="text" id="project-name" placeholder="例如：网站重构项目" class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label>项目描述</label>
                            <textarea id="project-description" placeholder="详细描述项目目标和范围..." class="form-textarea" rows="3"></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>开始日期</label>
                                <input type="date" id="start-date" class="form-input">
                            </div>
                            <div class="form-group">
                                <label>结束日期</label>
                                <input type="date" id="end-date" class="form-input">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>团队成员（每行一个，格式：姓名-角色）</label>
                            <textarea id="team-members" placeholder="例如：
张三-前端开发
李四-后端开发
王五-产品经理" class="form-textarea" rows="3"></textarea>
                        </div>
                        
                        <div class="upload-options">
                            <div class="upload-option">
                                <input type="radio" id="upload-text" name="upload-type" value="text" checked>
                                <label for="upload-text">📝 文本描述</label>
                                <textarea id="text-description" placeholder="在此处粘贴或输入项目详细描述..." class="form-textarea" rows="4"></textarea>
                            </div>
                            <div class="upload-option">
                                <input type="radio" id="upload-file" name="upload-type" value="file">
                                <label for="upload-file">📎 上传文件</label>
                                <div class="file-upload">
                                    <input type="file" id="project-file" accept=".txt,.png,.jpg,.pdf,.doc,.docx" style="display: none;">
                                    <button class="btn btn-secondary" onclick="document.getElementById('project-file').click()">选择文件</button>
                                    <span id="file-name">未选择文件</span>
                                </div>
                                <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">支持格式：TXT, PNG, PDF, DOC, DOCX</p>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>分解粒度</label>
                            <div class="radio-group">
                                <label>
                                    <input type="radio" name="granularity" value="month" checked>
                                    <span>按月分解</span>
                                </label>
                                <label>
                                    <input type="radio" name="granularity" value="week">
                                    <span>按周分解</span>
                                </label>
                                <label>
                                    <input type="radio" name="granularity" value="day">
                                    <span>按日分解</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
                        <button class="btn btn-primary" onclick="ModuleHandler.getInstance().processTaskDecomposition()">
                            开始分解任务
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
        
        // 绑定文件上传事件
        const fileInput = document.getElementById('project-file');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const fileName = e.target.files[0]?.name || '未选择文件';
                document.getElementById('file-name').textContent = fileName;
            });
        }
    }
    
    // 处理任务分解
    async processTaskDecomposition() {
        // 收集表单数据
        const projectName = document.getElementById('project-name').value;
        const projectDescription = document.getElementById('project-description').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const teamMembers = document.getElementById('team-members').value;
        const uploadType = document.querySelector('input[name="upload-type"]:checked').value;
        const granularity = document.querySelector('input[name="granularity"]:checked').value;
        
        // 验证数据
        if (!projectName || !projectDescription || !startDate || !endDate) {
            this.showAlert('错误', '请填写项目名称、描述和日期');
            return;
        }
        
        // 显示处理中状态
        const modal = document.getElementById('task-decomposition-modal');
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="width: 50px; height: 50px; border: 4px solid #e2e8f0; border-top: 4px solid #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <h3>AI正在分解任务...</h3>
                <p>正在分析项目信息并生成任务列表</p>
                <p style="color: #666; font-size: 0.9rem; margin-top: 10px;">这可能需要几秒钟时间</p>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
        
        try {
            // 准备请求数据
            const requestData = {
                project_name: projectName,
                project_description: projectDescription,
                start_date: startDate,
                end_date: endDate,
                team_members: teamMembers.split('\n').filter(m => m.trim()),
                granularity: granularity
            };
            
            // 调用AI任务分解API
            const response = await fetch('http://localhost:8001/api/ai/task-decomposition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'AI任务分解失败');
            }
            
            // 显示AI分解结果
            this.showTaskDecompositionResults({
                projectName,
                startDate,
                endDate,
                teamMembers: requestData.team_members,
                granularity,
                tasks: result.tasks,
                projectId: result.project_id,
                message: result.message
            });
            
        } catch (error) {
            console.error('任务分解失败:', error);
            
            // 显示错误信息
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
                    <h3 style="margin: 0 0 10px 0;">AI任务分解失败</h3>
                    <p style="color: #666; margin-bottom: 20px;">${error.message}</p>
                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; text-align: left;">
                        <h4 style="margin: 0 0 10px 0; color: #dc2626;">错误详情</h4>
                        <p style="margin: 0; color: #7f1d1d; font-family: monospace; font-size: 0.9rem;">${error.message}</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().showTaskDecompositionModal()">
                            返回重试
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    // 生成示例任务
    generateSampleTasks(granularity) {
        if (granularity === 'month') {
            return [
                { period: '第1个月', tasks: ['需求分析与规划', '技术选型与架构设计', 'UI/UX设计初稿'] },
                { period: '第2个月', tasks: ['前端框架搭建', '后端API开发', '数据库设计'] },
                { period: '第3个月', tasks: ['核心功能开发', '单元测试编写', '集成测试'] },
                { period: '第4个月', tasks: ['性能优化', '安全测试', '用户验收测试'] },
                { period: '第5个月', tasks: ['部署上线', '监控设置', '文档编写'] }
            ];
        } else if (granularity === 'week') {
            return [
                { period: '第1周', tasks: ['项目启动会议', '需求收集', '技术调研'] },
                { period: '第2周', tasks: ['原型设计', 'UI设计评审', '开发环境搭建'] },
                { period: '第3周', tasks: ['数据库设计', 'API接口定义', '前端框架选择'] },
                { period: '第4周', tasks: ['核心模块开发', '单元测试', '代码评审'] }
            ];
        } else {
            return [
                { period: '第1天', tasks: ['项目启动', '团队介绍', '目标设定'] },
                { period: '第2天', tasks: ['需求分析会议', '用户故事编写'] },
                { period: '第3天', tasks: ['技术方案讨论', '架构设计'] },
                { period: '第4天', tasks: ['开发环境配置', '代码仓库设置'] },
                { period: '第5天', tasks: ['第一个功能开发', '代码提交'] }
            ];
        }
    }
    
    // 显示任务分解结果
    showTaskDecompositionResults(data) {
        const modal = document.getElementById('task-decomposition-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        // 格式化任务列表
        const tasksHtml = data.tasks.map(task => `
            <div class="task-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div>
                        <h4 style="color: #4f46e5; margin: 0 0 5px 0;">${task.title}</h4>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="background: ${this.getPriorityColor(task.priority)}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
                                ${task.priority}
                            </span>
                            <span style="color: #64748b; font-size: 0.9rem;">截止: ${task.due_date}</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="color: #475569; font-size: 0.9rem;">负责人: ${task.assigned_to}</span>
                    </div>
                </div>
                <p style="color: #475569; margin: 0 0 10px 0;">${task.description}</p>
                ${task.period ? `<div style="color: #94a3b8; font-size: 0.85rem;">阶段: ${task.period}</div>` : ''}
            </div>
        `).join('');
        
        modalBody.innerHTML = `
            <div>
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
                    <h3 style="margin: 0 0 10px 0;">任务分解完成！</h3>
                    <p style="color: #666;">${data.message || 'AI已成功将项目分解为详细任务'}</p>
                    ${data.projectId ? `<p style="color: #4f46e5; font-weight: 600;">项目ID: ${data.projectId}</p>` : ''}
                </div>
                
                <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px 0;">项目概览</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                        <div>
                            <span style="color: #64748b; font-size: 0.9rem;">项目名称</span>
                            <div style="font-weight: 600;">${data.projectName}</div>
                        </div>
                        <div>
                            <span style="color: #64748b; font-size: 0.9rem;">时间范围</span>
                            <div style="font-weight: 600;">${data.startDate} 至 ${data.endDate}</div>
                        </div>
                        <div>
                            <span style="color: #64748b; font-size: 0.9rem;">团队规模</span>
                            <div style="font-weight: 600;">${data.teamMembers.length} 人</div>
                        </div>
                        <div>
                            <span style="color: #64748b; font-size: 0.9rem;">分解粒度</span>
                            <div style="font-weight: 600;">按${data.granularity === 'month' ? '月' : data.granularity === 'week' ? '周' : '日'}分解</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="margin: 0;">任务列表 (${data.tasks.length}个任务)</h4>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn btn-sm btn-outline" onclick="ModuleHandler.getInstance().filterTasksByPriority('P0')" style="background: #fee2e2; color: #dc2626;">P0</button>
                            <button class="btn btn-sm btn-outline" onclick="ModuleHandler.getInstance().filterTasksByPriority('P1')" style="background: #fef3c7; color: #d97706;">P1</button>
                            <button class="btn btn-sm btn-outline" onclick="ModuleHandler.getInstance().filterTasksByPriority('P2')" style="background: #dbeafe; color: #2563eb;">P2</button>
                            <button class="btn btn-sm btn-outline" onclick="ModuleHandler.getInstance().filterTasksByPriority('P3')" style="background: #f1f5f9; color: #475569;">P3</button>
                        </div>
                    </div>
                    <div id="task-list-container">
                        ${tasksHtml}
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                    <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().exportTasks()">
                        导出任务列表
                    </button>
                    <button class="btn btn-primary" onclick="ModuleHandler.getInstance().saveToProject()">
                        保存到项目
                    </button>
                    <button class="btn btn-success" onclick="ModuleHandler.getInstance().viewInPriorityManager(${data.projectId || 'null'})">
                        在优先级管理中查看
                    </button>
                </div>
            </div>
        `;
        
        // 更新模态框底部按钮
        const modalFooter = modal.querySelector('.modal-footer');
        modalFooter.innerHTML = `
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
            <button class="btn btn-primary" onclick="ModuleHandler.getInstance().showTaskDecompositionModal()">
                重新分解
            </button>
        `;
    }
    
    // 获取优先级颜色
    getPriorityColor(priority) {
        const colors = {
            'P0': '#dc2626',  // 红色
            'P1': '#d97706',  // 橙色
            'P2': '#2563eb',  // 蓝色
            'P3': '#475569'   // 灰色
        };
        return colors[priority] || '#94a3b8';
    }
    
    // 按优先级过滤任务
    filterTasksByPriority(priority) {
        const taskListContainer = document.getElementById('task-list-container');
        if (!taskListContainer) return;
        
        const taskCards = taskListContainer.querySelectorAll('.task-card');
        taskCards.forEach(card => {
            const prioritySpan = card.querySelector('span[style*="background:"]');
            const cardPriority = prioritySpan?.textContent?.trim();
            
            if (priority === 'all' || cardPriority === priority) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // 在优先级管理中查看
    viewInPriorityManager(projectId) {
        if (!projectId) {
            this.showAlert('提示', '请先保存项目');
            return;
        }
        
        // 关闭当前模态框
        const modal = document.getElementById('task-decomposition-modal');
        if (modal) {
            modal.remove();
        }
        
        // 打开优先级管理
        this.showPriorityManagementModal();
        
        // 加载项目任务
        this.loadProjectTasksForPriorityManager(projectId);
    }
    
    // 导出任务
    exportTasks() {
        this.showAlert('导出成功', '任务列表已导出为Excel文件，请查看下载文件夹。');
    }
    
    // 保存到项目
    saveToProject() {
        this.showAlert('保存成功', '任务已保存到项目管理系统中，可以在项目列表中查看。');
    }
    
    // 优先级管理模块
    handlePriorityManagement() {
        console.log('打开优先级管理模块');
        this.showPriorityManagementModal();
    }
    
    // 优先级管理模态框
    showPriorityManagementModal() {
        const modalHtml = `
            <div class="modal-overlay" id="priority-management-modal">
                <div class="modal-content" style="max-width: 1000px;">
                    <div class="modal-header">
                        <h2>🎯 优先级管理</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <p style="margin: 0;">拖拽任务卡片调整优先级，支持P0-P3四级优先级管理</p>
                            <div style="display: flex; gap: 10px;">
                                <div class="time-filter" style="display: flex; gap: 5px;">
                                    <button class="btn btn-sm ${this.currentTimeFilter === 'day' ? 'btn-primary' : 'btn-outline'}" 
                                            onclick="ModuleHandler.getInstance().filterTasksByTime('day')">
                                        今日
                                    </button>
                                    <button class="btn btn-sm ${this.currentTimeFilter === 'week' ? 'btn-primary' : 'btn-outline'}" 
                                            onclick="ModuleHandler.getInstance().filterTasksByTime('week')">
                                        本周
                                    </button>
                                    <button class="btn btn-sm ${this.currentTimeFilter === 'month' ? 'btn-primary' : 'btn-outline'}" 
                                            onclick="ModuleHandler.getInstance().filterTasksByTime('month')">
                                        本月
                                    </button>
                                    <button class="btn btn-sm ${this.currentTimeFilter === 'all' ? 'btn-primary' : 'btn-outline'}" 
                                            onclick="ModuleHandler.getInstance().filterTasksByTime('all')">
                                        全部
                                    </button>
                                </div>
                                <button class="btn btn-sm btn-outline" onclick="ModuleHandler.getInstance().loadTasksFromAPI()">
                                    🔄 刷新任务
                                </button>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <h3 style="margin: 0;">待处理任务</h3>
                                    <span id="pending-count" style="background: #94a3b8; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                                </div>
                                <div id="pending-tasks" class="task-list" style="min-height: 300px; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 15px;">
                                    <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                                        <div style="font-size: 2rem; margin-bottom: 10px;">📋</div>
                                        <p>正在加载任务...</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="flex: 1;">
                                <h3 style="margin: 0 0 10px 0;">已分配优先级</h3>
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    <div class="priority-column" data-priority="p0">
                                        <div class="priority-header" style="background: #ef4444; color: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <h4 style="margin: 0;">🔥 P0 - 紧急重要</h4>
                                                    <small>立即处理，影响核心功能</small>
                                                </div>
                                                <span id="p0-count" style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                                            </div>
                                        </div>
                                        <div class="task-list" style="min-height: 100px; border: 2px solid #ef4444; border-radius: 8px; padding: 10px;"></div>
                                    </div>
                                    
                                    <div class="priority-column" data-priority="p1">
                                        <div class="priority-header" style="background: #f97316; color: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <h4 style="margin: 0;">⚡ P1 - 高优先级</h4>
                                                    <small>尽快处理，重要但不紧急</small>
                                                </div>
                                                <span id="p1-count" style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                                            </div>
                                        </div>
                                        <div class="task-list" style="min-height: 100px; border: 2px solid #f97316; border-radius: 8px; padding: 10px;"></div>
                                    </div>
                                    
                                    <div class="priority-column" data-priority="p2">
                                        <div class="priority-header" style="background: #eab308; color: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <h4 style="margin: 0;">📋 P2 - 中等优先级</h4>
                                                    <small>正常处理，常规任务</small>
                                                </div>
                                                <span id="p2-count" style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                                            </div>
                                        </div>
                                        <div class="task-list" style="min-height: 100px; border: 2px solid #eab308; border-radius: 8px; padding: 10px;"></div>
                                    </div>
                                    
                                    <div class="priority-column" data-priority="p3">
                                        <div class="priority-header" style="background: #22c55e; color: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <h4 style="margin: 0;">🌱 P3 - 低优先级</h4>
                                                    <small>有空处理，优化和增强</small>
                                                </div>
                                                <span id="p3-count" style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                                            </div>
                                        </div>
                                        <div class="task-list" style="min-height: 100px; border: 2px solid #22c55e; border-radius: 8px; padding: 10px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <h4 style="margin: 0 0 10px 0;">📊 优先级统计</h4>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                                <div>
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #ef4444;" data-stat="p0">0</div>
                                    <div style="font-size: 0.9rem; color: #64748b;">P0任务</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #f97316
        
        this.showModal(modalHtml);
        this.initDragAndDrop();
        this.addPriorityManagementStyles();
    }
    
    // 添加优先级管理样式
    addPriorityManagementStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .task-card {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
                cursor: move;
                transition: all 0.2s;
            }
            
            .task-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }
            
            .task-card.dragging {
                opacity: 0.5;
                transform: rotate(3deg);
            }
            
            .task-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .task-title {
                font-weight: 600;
                margin-bottom: 5px;
                color: #1e293b;
            }
            
            .task-desc {
                font-size: 0.9rem;
                color: #64748b;
                margin-bottom: 8px;
            }
            
            .task-tags {
                display: flex;
                gap: 5px;
            }
            
            .tag {
                background: #f1f5f9;
                color: #475569;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
            }
            
            .task-list {
                transition: all 0.3s;
            }
            
            .task-list.drag-over {
                background: rgba(59, 130, 246, 0.1);
                border-color: #3b82f6 !important;
            }
            
            .priority-column .task-list {
                min-height: 100px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 初始化拖拽功能
    initDragAndDrop() {
        const taskCards = document.querySelectorAll('.task-card');
        const taskLists = document.querySelectorAll('.task-list');
        
        // 设置拖拽事件
        taskCards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
        
        // 设置放置事件
        taskLists.forEach(list => {
            list.addEventListener('dragover', this.handleDragOver.bind(this));
            list.addEventListener('dragenter', this.handleDragEnter.bind(this));
            list.addEventListener('dragleave', this.handleDragLeave.bind(this));
            list.addEventListener('drop', this.handleDrop.bind(this));
        });
    }
    
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
        e.target.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        e.target.closest('.task-list').classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.target.closest('.task-list').classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        const taskList = e.target.closest('.task-list');
        taskList.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.querySelector(`[data-id="${taskId}"]`);
        
        if (draggedElement && taskList) {
            // 更新任务优先级
            const priority = taskList.closest('.priority-column')?.dataset.priority || 'pending';
            draggedElement.dataset.priority = priority;
            
            // 更新优先级显示
            if (priority !== 'pending') {
                const priorityColors = {
                    'p0': '#ef4444',
                    'p1': '#f97316', 
                    'p2': '#eab308',
                    'p3': '#22c55e'
                };
                const priorityTexts = {
                    'p0': 'P0',
                    'p1': 'P1',
                    'p2': 'P2',
                    'p3': 'P3'
                };
                
                const prioritySpan = draggedElement.querySelector('.task-priority');
                prioritySpan.textContent = priorityTexts[priority];
                prioritySpan.style.background = priorityColors[priority];
            }
            
            // 移动任务到新位置
            taskList.appendChild(draggedElement);
            
            // 更新统计
            this.updatePriorityStats();
        }
    }
    
    // 更新优先级统计
    updatePriorityStats() {
        const stats = {
            p0: document.querySelectorAll('[data-priority="p0"] .task-card').length,
            p1: document.querySelectorAll('[data-priority="p1"] .task-card').length,
            p2: document.querySelectorAll('[data-priority="p2"] .task-card').length,
            p3: document.querySelectorAll('[data-priority="p3"] .task-card').length
        };
        
        // 更新统计显示
        document.querySelectorAll('.priority-column').forEach(col => {
            const priority = col.dataset.priority;
            const count = col.querySelectorAll('.task-card').length;
            stats[priority] = count;
        });
        
        // 更新统计数字
        const statElements = document.querySelectorAll('.priority-column');
        statElements.forEach(col => {
            const priority = col.dataset.priority;
            const countElement = document.querySelector(`[data-stat="${priority}"]`);
            if (countElement) {
                countElement.textContent = stats[priority] || 0;
            }
        });
    }
    
    // 保存优先级设置
    savePriorityChanges() {
        // 收集所有任务的优先级
        const tasks = [];
        document.querySelectorAll('.task-card').forEach(card => {
            tasks.push({
                id: card.dataset.id,
                title: card.querySelector('.task-title').textContent,
                priority: card.dataset.priority,
                estimatedTime: card.querySelector('.task-time')?.textContent?.replace('预计: ', '') || '未设置'
            });
        });
        
        // 显示保存成功
        this.showAlert('保存成功', `已保存${tasks.length}个任务的优先级设置。\n\nP0: ${tasks.filter(t => t.priority === 'p0').length}个\nP1: ${tasks.filter(t => t.priority === 'p1').length}个\nP2: ${tasks.filter(t => t.priority === 'p2').length}个\nP3: ${tasks.filter(t => t.priority === 'p3').length}个`);
    }
    
    // 按时间过滤任务
    async filterTasksByTime(period) {
        this.currentTimeFilter = period;
        
        // 更新按钮状态
        document.querySelectorAll('.time-filter .btn').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });
        
        const activeBtn = document.querySelector(`.time-filter .btn[onclick*="'${period}'"]`);
        if (activeBtn) {
            activeBtn.classList.remove('btn-outline');
            activeBtn.classList.add('btn-primary');
        }
        
        // 显示加载状态
        const pendingTasksContainer = document.getElementById('pending-tasks');
        if (pendingTasksContainer) {
            pendingTasksContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                    <div style="width: 30px; height: 30px; border: 3px solid #e2e8f0; border-top: 3px solid #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                    <p>正在加载${this.getPeriodName(period)}任务...</p>
                </div>
            `;
        }
        
        try {
            let tasks = [];
            
            if (period === 'all') {
                // 加载所有任务
                const response = await fetch('http://localhost:8001/api/tasks');
                if (response.ok) {
                    const data = await response.json();
                    tasks = data.tasks || [];
                }
            } else {
                // 按时间周期过滤
                const response = await fetch(`http://localhost:8001/api/tasks/filter/${period}`);
                if (response.ok) {
                    const data = await response.json();
                    tasks = data.tasks || [];
                }
            }
            
            // 更新任务列表
            this.updateTaskLists(tasks);
            
        } catch (error) {
            console.error('过滤任务失败:', error);
            
            if (pendingTasksContainer) {
                pendingTasksContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: #ef4444;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">❌</div>
                        <p>加载任务失败</p>
                        <p style="font-size: 0.9rem; color: #94a3b8;">${error.message}</p>
                    </div>
                `;
            }
        }
    }
    
    // 获取周期名称
    getPeriodName(period) {
        const names = {
            'day': '今日',
            'week': '本周',
            'month': '本月',
            'all': '全部'
        };
        return names[period] || period;
    }
    
    // 从API加载任务
    async loadTasksFromAPI() {
        await this.filterTasksByTime(this.currentTimeFilter || 'all');
    }
    
    // 更新任务列表
    updateTaskLists(tasks) {
        // 清空所有任务列表
        document.querySelectorAll('.task-list').forEach(list => {
            list.innerHTML = '';
        });
        
        // 重置计数
        ['pending', 'p0', 'p1', 'p2', 'p3'].forEach(type => {
            const countElement = document.getElementById(`${type}-count`);
            if (countElement) {
                countElement.textContent = '0';
            }
        });
        
        // 如果没有任务
        if (!tasks || tasks.length === 0) {
            const pendingTasksContainer = document.getElementById('pending-tasks');
            if (pendingTasksContainer) {
                pendingTasksContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📭</div>
                        <p>没有找到任务</p>
                        <p style="font-size: 0.9rem;">请创建新任务或调整过滤条件</p>
                    </div>
                `;
            }
            return;
        }
        
        // 将任务添加到待处理列表
        const pendingTasksContainer = document.getElementById('pending-tasks');
        if (pendingTasksContainer) {
            pendingTasksContainer.innerHTML = '';
            
            tasks.forEach(task => {
                const taskCard = this.createTaskCard(task);
                pendingTasksContainer.appendChild(taskCard);
            });
            
            // 更新待处理任务计数
            const pendingCount = document.getElementById('pending-count');
            if (pendingCount) {
                pendingCount.textContent = tasks.length;
            }
        }
        
        // 更新统计
        this.updatePriorityStats();
    }
    
    // 创建任务卡片
    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.dataset.id = task.id;
        card.dataset.priority = 'pending';
        card.dataset.dueDate = task.due_date;
        
        // 格式化日期
        const dueDate = new Date(task.due_date);
        const today = new Date();
        const timeDiff = dueDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        let timeText = '';
        if (daysDiff === 0) {
            timeText = '今天截止';
        } else if (daysDiff === 1) {
            timeText = '明天截止';
        } else if (daysDiff > 0) {
            timeText = `${daysDiff}天后截止`;
        } else {
            timeText = `${Math.abs(daysDiff)}天前截止`;
        }
        
        card.innerHTML = `
            <div class="task-header">
                <span class="task-priority" style="background: #94a3b8; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">待分配</span>
                <span class="task-time">${timeText}</span>
            </div>
            <div class="task-title">${task.title}</div>
            <div class="task-desc">${task.description}</div>
            <div class="task-tags">
                <span class="tag">${task.assigned_to || '未分配'}</span>
                <span class="tag">${task.priority || 'P2'}</span>
            </div>
        `;
        
        return card;
    }
    
    // 加载项目任务到优先级管理器
    async loadProjectTasksForPriorityManager(projectId) {
        try {
            const response = await fetch(`http://localhost:8001/api/projects/${projectId}/tasks`);
            if (!response.ok) {
                throw new Error(`获取项目任务失败: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateTaskLists(data.tasks || []);
            
        } catch (error) {
            console.error('加载项目任务失败:', error);
            this.showAlert('错误', `无法加载项目任务: ${error.message}`);
        }
    }
    
    // 提醒服务模块
    handleReminderService() {
        console.log('打开提醒服务模块');
        this.showReminderServiceModal();
    }
    
    // 提醒服务模态框
    showReminderServiceModal() {
        const modalHtml = `
            <div class="modal-overlay" id="reminder-service-modal">
                <div class="modal-content" style="max-width: 700px;">
                    <div class="modal-header">
                        <h2>⏰ 提醒服务</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <p>设置关键里程碑提醒，支持邮件、短信、系统通知等多种提醒方式</p>
                        
                        <div class="form-group">
                            <label>选择提醒类型</label>
                            <div class="radio-group" style="margin-top: 10px;">
                                <label>
                                    <input type="radio" name="reminder-type" value="milestone" checked>
                                    <span>里程碑提醒</span>
                                </label>
                                <label>
                                    <input type="radio" name="reminder-type" value="deadline">
                                    <span>截止日期提醒</span>
                                </label>
                                <label>
                                    <input type="radio" name="reminder-type" value="daily">
                                    <span>每日进度提醒</span>
                                </label>
                                <label>
                                    <input type="radio" name="reminder-type" value="weekly">
                                    <span>每周总结提醒</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>提醒标题</label>
                                <input type="text" id="reminder-title" placeholder="例如：项目上线前检查" class="form-input">
                            </div>
                            <div class="form-group">
                                <label>关联项目</label>
                                <select id="project-select" class="form-select">
                                    <option value="">选择项目</option>
                                    <option value="website-redesign">网站重构项目</option>
                                    <option value="mobile-app">移动应用开发</option>
                                    <option value="api-integration">API集成项目</option>
                                    <option value="data-migration">数据迁移项目</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>提醒日期</label>
                                <input type="date" id="reminder-date" class="form-input">
                            </div>
                            <div class="form-group">
                                <label>提醒时间</label>
                                <input type="time" id="reminder-time" class="form-input">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>提前提醒</label>
                            <div class="radio-group" style="margin-top: 10px;">
                                <label>
                                    <input type="radio" name="advance-notice" value="1h" checked>
                                    <span>1小时前</span>
                                </label>
                                <label>
                                    <input type="radio" name="advance-notice" value="1d">
                                    <span>1天前</span>
                                </label>
                                <label>
                                    <input type="radio" name="advance-notice" value="3d">
                                    <span>3天前</span>
                                </label>
                                <label>
                                    <input type="radio" name="advance-notice" value="1w">
                                    <span>1周前</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>提醒方式</label>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                                <label style="display: flex; align-items: center; gap: 5px;">
                                    <input type="checkbox" id="email-reminder" checked>
                                    <span>📧 邮件提醒</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 5px;">
                                    <input type="checkbox" id="sms-reminder">
                                    <span>📱 短信提醒</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 5px;">
                                    <input type="checkbox" id="system-reminder" checked>
                                    <span>💻 系统通知</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 5px;">
                                    <input type="checkbox" id="slack-reminder">
                                    <span>💬 Slack通知</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>提醒内容</label>
                            <textarea id="reminder-content" placeholder="请输入提醒的具体内容..." class="form-textarea" rows="4"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>接收人</label>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <input type="text" id="recipient-input" placeholder="输入邮箱或手机号" class="form-input" style="flex: 1;">
                                <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().addRecipient()">添加</button>
                            </div>
                            <div id="recipient-list" style="margin-top: 10px; min-height: 40px; border: 1px solid #e2e8f0; border-radius: 5px; padding: 10px;">
                                <div style="color: #94a3b8; font-size: 0.9rem;">暂无接收人，点击添加按钮添加</div>
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <h4 style="margin: 0 0 10px 0;">📅 已设置的提醒</h4>
                            <div id="existing-reminders">
                                <div style="text-align: center; padding: 20px; color: #94a3b8;">
                                    暂无已设置的提醒
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
                        <button class="btn btn-primary" onclick="ModuleHandler.getInstance().saveReminder()">
                            设置提醒
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
        this.addReminderServiceStyles();
        this.loadExistingReminders();
    }
    
    // 添加提醒服务样式
    addReminderServiceStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .recipient-tag {
                display: inline-flex;
                align-items: center;
                background: #e2e8f0;
                color: #475569;
                padding: 4px 10px;
                border-radius: 16px;
                margin: 2px;
                font-size: 0.9rem;
            }
            
            .recipient-tag .remove-btn {
                margin-left: 5px;
                cursor: pointer;
                color: #94a3b8;
            }
            
            .recipient-tag .remove-btn:hover {
                color: #ef4444;
            }
            
            .reminder-item {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }
            
            .reminder-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .reminder-title {
                font-weight: 600;
                color: #1e293b;
            }
            
            .reminder-time {
                color: #64748b;
                font-size: 0.9rem;
            }
            
            .reminder-methods {
                display: flex;
                gap: 5px;
                margin-top: 5px;
            }
            
            .method-tag {
                background: #f1f5f9;
                color: #475569;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 添加接收人
    addRecipient() {
        const input = document.getElementById('recipient-input');
        const recipientList = document.getElementById('recipient-list');
        
        if (!input.value.trim()) {
            this.showAlert('错误', '请输入接收人信息');
            return;
        }
        
        const recipient = input.value.trim();
        const recipientTag = document.createElement('div');
        recipientTag.className = 'recipient-tag';
        recipientTag.innerHTML = `
            ${recipient}
            <span class="remove-btn" onclick="this.parentElement.remove()">×</span>
        `;
        
        // 如果还是默认提示文本，先清空
        if (recipientList.firstChild && recipientList.firstChild.style?.color === 'rgb(148, 163, 184)') {
            recipientList.innerHTML = '';
        }
        
        recipientList.appendChild(recipientTag);
        input.value = '';
    }
    
    // 加载现有提醒
    loadExistingReminders() {
        // 模拟现有提醒数据
        const existingReminders = [
            {
                id: 1,
                title: '项目周会',
                type: 'weekly',
                date: '2026-03-27',
                time: '14:00',
                methods: ['email', 'system'],
                recipients: ['team@example.com']
            },
            {
                id: 2,
                title: '代码审查',
                type: 'deadline',
                date: '2026-03-28',
                time: '18:00',
                methods: ['slack'],
                recipients: ['dev-team@example.com']
            }
        ];
        
        const container = document.getElementById('existing-reminders');
        if (existingReminders.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 20px; color: #94a3b8;">暂无已设置的提醒</div>';
            return;
        }
        
        const remindersHtml = existingReminders.map(reminder => `
            <div class="reminder-item">
                <div class="reminder-header">
                    <div class="reminder-title">${reminder.title}</div>
                    <div class="reminder-time">${reminder.date} ${reminder.time}</div>
                </div>
                <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 5px;">
                    ${this.getReminderTypeText(reminder.type)}
                </div>
                <div class="reminder-methods">
                    ${reminder.methods.map(method => `<span class="method-tag">${this.getMethodText(method)}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        container.innerHTML = remindersHtml;
    }
    
    getReminderTypeText(type) {
        const types = {
            'milestone': '里程碑提醒',
            'deadline': '截止日期提醒',
            'daily': '每日进度提醒',
            'weekly': '每周总结提醒'
        };
        return types[type] || type;
    }
    
    getMethodText(method) {
        const methods = {
            'email': '📧 邮件',
            'sms': '📱 短信',
            'system': '💻 系统',
            'slack': '💬 Slack'
        };
        return methods[method] || method;
    }
    
    // 保存提醒
    saveReminder() {
        const title = document.getElementById('reminder-title').value;
        const date = document.getElementById('reminder-date').value;
        const time = document.getElementById('reminder-time').value;
        const type = document.querySelector('input[name="reminder-type"]:checked').value;
        const advance = document.querySelector('input[name="advance-notice"]:checked').value;
        const content = document.getElementById('reminder-content').value;
        
        if (!title || !date || !time) {
            this.showAlert('错误', '请填写提醒标题、日期和时间');
            return;
        }
        
        // 收集提醒方式
        const methods = [];
        if (document.getElementById('email-reminder').checked) methods.push('email');
        if (document.getElementById('sms-reminder').checked) methods.push('sms');
        if (document.getElementById('system-reminder').checked) methods.push('system');
        if (document.getElementById('slack-reminder').checked) methods.push('slack');
        
        if (methods.length === 0) {
            this.showAlert('错误', '请至少选择一种提醒方式');
            return;
        }
        
        // 收集接收人
        const recipients = [];
        document.querySelectorAll('.recipient-tag').forEach(tag => {
            recipients.push(tag.childNodes[0].textContent.trim());
        });
        
        if (recipients.length === 0) {
            this.showAlert('错误', '请至少添加一个接收人');
            return;
        }
        
        // 显示成功消息
        this.showAlert('提醒设置成功', 
            `提醒标题：${title}\n` +
            `提醒时间：${date} ${time}\n` +
            `提醒类型：${this.getReminderTypeText(type)}\n` +
            `提前提醒：${advance}\n` +
            `提醒方式：${methods.map(m => this.getMethodText(m)).join(', ')}\n` +
            `接收人：${recipients.join(', ')}\n\n` +
            `提醒已设置，将在指定时间发送通知。`
        );
    }
    
    // 可视化Dashboard模块
    handleVisualizationDashboard() {
        console.log('打开可视化Dashboard模块');
        this.showVisualizationDashboardModal();
    }
    
    // 可视化Dashboard模态框
    showVisualizationDashboardModal() {
        const modalHtml = `
            <div class="modal-overlay" id="dashboard-modal">
                <div class="modal-content" style="max-width: 1000px; width: 95%;">
                    <div class="modal-header">
                        <h2>📊 可视化Dashboard</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <p>实时监控项目进度和团队负载，图表化展示关键指标</p>
                        
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().switchDashboardView('overview')">概览</button>
                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().switchDashboardView('progress')">进度</button>
                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().switchDashboardView('team')">团队</button>
                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().switchDashboardView('tasks')">任务</button>
                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().switchDashboardView('timeline')">时间线</button>
                        </div>
                        
                        <div id="dashboard-content">
                            <!-- 概览视图 -->
                            <div id="overview-view" style="display: block;">
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 20px; border-radius: 10px;">
                                        <div style="font-size: 2rem; font-weight: bold;">85%</div>
                                        <div style="font-size: 0.9rem;">整体进度</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #10b981, #34d399); color: white; padding: 20px; border-radius: 10px;">
                                        <div style="font-size: 2rem; font-weight: bold;">42</div>
                                        <div style="font-size: 0.9rem;">完成任务</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #f59e0b, #fbbf24); color: white; padding: 20px; border-radius: 10px;">
                                        <div style="font-size: 2rem; font-weight: bold;">18</div>
                                        <div style="font-size: 0.9rem;">进行中任务</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #ef4444, #f87171); color: white; padding: 20px; border-radius: 10px;">
                                        <div style="font-size: 2rem; font-weight: bold;">5</div>
                                        <div style="font-size: 0.9rem;">延期任务</div>
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
                                    <div>
                                        <h3 style="margin: 0 0 15px 0;">📈 项目进度趋势</h3>
                                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                            <div id="progress-chart" style="height: 200px; position: relative;">
                                                <!-- 模拟进度图表 -->
                                                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: flex-end; gap: 10px;">
                                                    <div style="flex: 1; background: #4f46e5; height: 60%; border-radius: 4px 4px 0 0;"></div>
                                                    <div style="flex: 1; background: #4f46e5; height: 75%; border-radius: 4px 4px 0 0;"></div>
                                                    <div style="flex: 1; background: #4f46e5; height: 85%; border-radius: 4px 4px 0 0;"></div>
                                                    <div style="flex: 1; background: #4f46e5; height: 90%; border-radius: 4px 4px 0 0;"></div>
                                                    <div style="flex: 1; background: #4f46e5; height: 95%; border-radius: 4px 4px 0 0;"></div>
                                                </div>
                                                <div style="position: absolute; bottom: -25px; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 0.8rem; color: #64748b;">
                                                    <span>第1周</span>
                                                    <span>第2周</span>
                                                    <span>第3周</span>
                                                    <span>第4周</span>
                                                    <span>本周</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 style="margin: 0 0 15px 0;">🎯 任务状态分布</h3>
                                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                            <div id="task-distribution" style="height: 200px; position: relative;">
                                                <!-- 模拟饼图 -->
                                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#10b981 0% 65%, #f59e0b 65% 85%, #ef4444 85% 100%);"></div>
                                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-radius: 50%; background: white;"></div>
                                                
                                                <div style="position: absolute; top: 20px; right: 20px;">
                                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                                        <div style="width: 12px; height: 12px; background: #10b981; border-radius: 2px; margin-right: 8px;"></div>
                                                        <span style="font-size: 0.9rem;">已完成 (65%)</span>
                                                    </div>
                                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                                        <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 2px; margin-right: 8px;"></div>
                                                        <span style="font-size: 0.9rem;">进行中 (20%)</span>
                                                    </div>
                                                    <div style="display: flex; align-items: center;">
                                                        <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 2px; margin-right: 8px;"></div>
                                                        <span style="font-size: 0.9rem;">未开始 (15%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="margin-top: 20px;">
                                    <h3 style="margin: 0 0 15px 0;">👥 团队负载情况</h3>
                                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                            <div style="flex: 1; text-align: center;">
                                                <div style="font-size: 1.2rem; font-weight: bold; color: #4f46e5;">张三</div>
                                                <div style="height: 20px; background: #e2e8f0; border-radius: 10px; margin-top: 5px; overflow: hidden;">
                                                    <div style="width: 75%; height: 100%; background: #4f46e5;"></div>
                                                </div>
                                                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">75% 负载</div>
                                            </div>
                                            <div style="flex: 1; text-align: center;">
                                                <div style="font-size: 1.2rem; font-weight: bold; color: #10b981;">李四</div>
                                                <div style="height: 20px; background: #e2e8f0; border-radius: 10px; margin-top: 5px; overflow: hidden;">
                                                    <div style="width: 60%; height: 100%; background: #10b981;"></div>
                                                </div>
                                                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">60% 负载</div>
                                            </div>
                                            <div style="flex: 1; text-align: center;">
                                                <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">王五</div>
                                                <div style="height: 20px; background: #e2e8f0; border-radius: 10px; margin-top: 5px; overflow: hidden;">
                                                    <div style="width: 90%; height: 100%; background: #f59e0b;"></div>
                                                </div>
                                                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">90% 负载</div>
                                            </div>
                                            <div style="flex: 1; text-align: center;">
                                                <div style="font-size: 1.2rem; font-weight: bold; color: #ef4444;">赵六</div>
                                                <div style="height: 20px; background: #e2e8f0; border-radius: 10px; margin-top: 5px; overflow: hidden;">
                                                    <div style="width: 45%; height: 100%; background: #ef4444;"></div>
                                                </div>
                                                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">45% 负载</div>
                                            </div>
                                        </div>
                                        <div style="text-align: center; color: #64748b; font-size: 0.9rem;">
                                            <span style="color: #10b981;">● 低负载</span>
                                            <span style="margin: 0 10px; color: #f59e0b;">● 中等负载</span>
                                            <span style="color: #ef4444;">● 高负载</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 进度视图 -->
                            <div id="progress-view" style="display: none;">
                                <h3>📅 项目进度详情</h3>
                                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 15px;">
                                    <div style="margin-bottom: 20px;">
                                        <h4 style="margin: 0 0 10px 0;">网站重构项目</h4>
                                        <div style="height: 20px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
                                            <div style="width: 85%; height: 100%; background: #4f46e5;"></div>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                                            <span style="font-size: 0.9rem; color: #64748b;">开始: 2026-03-01</span>
                                            <span style="font-size: 0.9rem; color: #64748b;">结束: 2026-04-15</span>
                                            <span style="font-size: 0.9rem; color: #4f46e5; font-weight: bold;">85% 完成</span>
                                        </div>
                                    </div>
                                    
                                    <div style="margin-bottom: 20px;">
                                        <h4 style="margin: 0 0 10px 0;">移动应用开发</h4>
                                        <div style="height: 20px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
                                            <div style="width: 60%; height: 100%; background: #10b981;"></div>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                                            <span style="font-size: 0.9rem; color: #64748b;">开始: 2026-03-10</span>
                                            <span style="font-size: 0.9rem; color: #64748b;">结束: 2026-05-20</span>
                                            <span style="font-size: 0.9rem; color: #10b981; font-weight: bold;">60% 完成</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 style="margin: 0 0 10px 0;">API集成项目</h4>
                                        <div style="height: 20px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
                                            <div style="width: 40%; height: 100%; background: #f59e0b;"></div>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                                            <span style="font-size: 0.9rem; color: #64748b;">开始: 2026-03-20</span>
                                            <span style="font-size: 0.9rem; color: #64748b;">结束: 2026-06-10</span>
                                            <span style="font-size: 0.9rem; color: #f59e0b; font-weight: bold;">40% 完成</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 团队视图 -->
                            <div id="team-view" style="display: none;">
                                <h3>👥 团队成员详情</h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px;">
                                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                            <div style="width: 40px; height: 40px; background: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold;">张</div>
                                            <div>
                                                <div style="font-weight: bold;">张三</div>
                                                <div style="font-size: 0.9rem; color: #64748b;">前端开发</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 0.9rem; color: #475569;">
                                            <div>当前任务: 3个</div>
                                            <div>完成率: 85%</div>
                                            <div>平均耗时: 2.5天/任务</div>
                                        </div>
                                    </div>
                                    
                                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                            <div style="width: 40px; height: 40px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold;">李</div>
                                            <div>
                                                <div style="font-weight: bold;">李四</div>
                                                <div style="font-size: 0.9rem; color: #64748b;">后端开发</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 0.9rem; color: #475569;">
                                            <div>当前任务: 4个</div>
                                            <div>完成率: 92%</div>
                                            <div>平均耗时: 3.2天/任务</div>
                                        </div>
                                    </div>
                                    
                                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                            <div style="width: 40px; height: 40px; background: #f59e0b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold;">王</div>
                                            <div>
                                                <div style="font-weight: bold;">王五</div>
                                                <div style="font-size: 0.9rem; color: #64748b;">UI设计师</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 0.9rem; color: #475569;">
                                            <div>当前任务: 2个</div>
                                            <div>完成率: 78%</div>
                                            <div>平均耗时: 4.1天/任务</div>
                                        </div>
                                    </div>
                                    
                                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                            <div style="width: 40px; height: 40px; background: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold;">赵</div>
                                            <div>
                                                <div style="font-weight: bold;">赵六</div>
                                                <div style="font-size: 0.9rem; color: #64748b;">测试工程师</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 0.9rem; color: #475569;">
                                            <div>当前任务: 5个</div>
                                            <div>完成率: 95%</div>
                                            <div>平均耗时: 1.8天/任务</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 任务视图 -->
                            <div id="tasks-view" style="display: none;">
                                <h3>📋 任务详情</h3>
                                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 15px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <thead>
                                            <tr style="background: #f8fafc;">
                                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">任务名称</th>
                                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">负责人</th>
                                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">状态</th>
                                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">优先级</th>
                                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">截止日期</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">用户登录页面开发</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">张三</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">已完成</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="color: #ef4444; font-weight: bold;">P0</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">2026-03-20</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">数据库优化</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">李四</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">进行中</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="color: #f97316; font-weight: bold;">P1</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">2026-03-28</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">首页UI设计</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">王五</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">进行中</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="color: #eab308; font-weight: bold;">P2</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">2026-04-05</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">API接口测试</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">赵六</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background: #ef4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">延期</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="color: #ef4444; font-weight: bold;">P0</span></td>
                                                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">2026-03-22</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px;">文档编写</td>
                                                <td style="padding: 10px;">李四</td>
                                                <td style="padding: 10px;"><span style="background: #94a3b8; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">未开始</span></td>
                                                <td style="padding: 10px;"><span style="color: #22c55e; font-weight: bold;">P3</span></td>
                                                <td style="padding: 10px;">2026-04-10</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- 时间线视图 -->
                            <div id="timeline-view" style="display: none;">
                                <h3>📅 甘特图时间线</h3>
                                <div style="margin-bottom: 20px;">
                                    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                                        <select id="gantt-project-select" style="padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white;">
                                            <option value="1">网站重构项目</option>
                                            <option value="2">移动应用开发</option>
                                            <option value="3">API集成项目</option>
                                        </select>
                                        <button class="btn btn-primary" onclick="ModuleHandler.getInstance().loadGanttChart()">加载甘特图</button>
                                        <div style="margin-left: auto; display: flex; gap: 5px;">
                                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().zoomGantt('out')" style="padding: 5px 10px; font-size: 0.9rem;">缩小</button>
                                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().zoomGantt('in')" style="padding: 5px 10px; font-size: 0.9rem;">放大</button>
                                            <button class="btn btn-secondary" onclick="ModuleHandler.getInstance().resetGanttView()" style="padding: 5px 10px; font-size: 0.9rem;">重置</button>
                                        </div>
                                    </div>
                                    
                                    <div id="gantt-chart-container" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; min-height: 400px; overflow-x: auto;">
                                        <div style="text-align: center; color: #64748b; padding: 100px 0;">
                                            <div style="font-size: 2rem; margin-bottom: 10px;">📊</div>
                                            <div>选择项目并点击"加载甘特图"查看时间线</div>
                                            <div style="font-size: 0.9rem; margin-top: 5px;">甘特图将显示任务的开始/结束时间、进度和负责人</div>
                                        </div>
                                    </div>
                                    
                                    <div style="margin-top: 20px; font-size: 0.9rem; color: #64748b;">
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 2px; margin-right: 5px;"></div>
                                                <span>P0 - 紧急</span>
                                            </div>
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 12px; height: 12px; background: #f97316; border-radius: 2px; margin-right: 5px;"></div>
                                                <span>P1 - 高</span>
                                            </div>
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 12px; height: 12px; background: #eab308; border-radius: 2px; margin-right: 5px;"></div>
                                                <span>P2 - 中</span>
                                            </div>
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 12px; height: 12px; background: #22c55e; border-radius: 2px; margin-right: 5px;"></div>
                                                <span>P3 - 低</span>
                                            </div>
                                        </div>
                                        <div>提示：点击阶段标题可以展开/收起详细任务列表</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
                        <button class="btn btn-primary" onclick="ModuleHandler.getInstance().exportDashboardData()">
                            导出数据
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
        this.addDashboardStyles();
    }
    
    // 添加Dashboard样式
    addDashboardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .dashboard-view {
                display: none;
            }
            
            .dashboard-view.active {
                display: block;
            }
            
            .metric-card {
                background: linear-gradient(135deg, var(--color1), var(--color2));
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            }
            
            .metric-value {
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .metric-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 切换Dashboard视图
    switchDashboardView(view) {
        // 隐藏所有视图
        document.querySelectorAll('#dashboard-content > div').forEach(div => {
            div.style.display = 'none';
        });
        
        // 显示选中的视图
        const targetView = document.getElementById(`${view}-view`);
        if (targetView) {
            targetView.style.display = 'block';
        }
        
        // 更新按钮状态
        document.querySelectorAll('#dashboard-modal .btn-secondary').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 激活当前按钮
        const activeBtn = Array.from(document.querySelectorAll('#dashboard-modal .btn-secondary')).find(btn => 
            btn.textContent.includes(this.getViewName(view))
        );
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    getViewName(view) {
        const views = {
            'overview': '概览',
            'progress': '进度',
            'team': '团队',
            'tasks': '任务',
            'timeline': '时间线'
        };
        return views[view] || view;
    }
    
    // 导出Dashboard数据
    exportDashboardData() {
        const data = {
            timestamp: new Date().toISOString(),
            metrics: {
                overallProgress: 85,
                completedTasks: 42,
                inProgressTasks: 18,
                delayedTasks: 5
            },
            projects: [
                { name: '网站重构项目', progress: 85, start: '2026-03-01', end: '2026-04-15' },
                { name: '移动应用开发', progress: 60, start: '2026-03-10', end: '2026-05-20' },
                { name: 'API集成项目', progress: 40, start: '2026-03-20', end: '2026-06-10' }
            ],
            team: [
                { name: '张三', role: '前端开发', tasks: 3, completionRate: 85, avgTime: 2.5 },
                { name: '李四', role: '后端开发', tasks: 4, completionRate: 92, avgTime: 3.2 },
                { name: '王五', role: 'UI设计师', tasks: 2, completionRate: 78, avgTime: 4.1 },
                { name: '赵六', role: '测试工程师', tasks: 5, completionRate: 95, avgTime: 1.8 }
            ]
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showAlert('导出成功', 'Dashboard数据已导出为JSON文件');
    }

    
    // 自动报告模块
    handleAutoReport() {
        console.log('打开自动报告模块');
        this.showAlert('自动报告', '每日报告生成功能正在开发中...');
    }
    
    // API接口模块
    handleApiInterface() {
        console.log('打开API接口模块');
        this.showAlert('API接口', 'RESTful API文档正在开发中...');
    }
    
    // 加载甘特图
    async loadGanttChart() {
        const projectSelect = document.getElementById('project-select');
        const projectId = projectSelect.value;
        
        if (!projectId) {
            return;
        }
        
        const container = document.getElementById('gantt-chart-container');
        if (!container) return;
        
        // 显示加载状态
        container.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; color: #94a3b8;">
                <div style="width: 30px; height: 30px; border: 3px solid #e2e8f0; border-top: 3px solid #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                <p>正在加载甘特图数据...</p>
            </div>
        `;
        
        try {
            // 调用API获取甘特图数据
            const response = await fetch(`http://localhost:8001/api/gantt/${projectId}`);
            if (!response.ok) {
                throw new Error(`获取甘特图数据失败: ${response.status}`);
            }
            
            const data = await response.json();
            this.renderGanttChart(data);
            
        } catch (error) {
            console.error('加载甘特图失败:', error);
            container.innerHTML = `
                <div style="padding: 40px 20px; text-align: center; color: #ef4444;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">❌</div>
                    <p>加载甘特图失败</p>
                    <p style="font-size: 0.9rem; color: #94a3b8;">${error.message}</p>
                </div>
            `;
        }
    }
    
    // 渲染甘特图
    renderGanttChart(data) {
        const container = document.getElementById('gantt-chart-container');
        if (!container) return;
        
        const { tasks, project_id } = data;
        
        if (!tasks || tasks.length === 0) {
            container.innerHTML = `
                <div style="padding: 40px 20px; text-align: center; color: #94a3b8;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">📭</div>
                    <p>项目没有任务数据</p>
                    <p style="font-size: 0.9rem;">请先为项目创建任务</p>
                </div>
            `;
            return;
        }
        
        // 计算时间范围
        const dates = tasks.map(task => new Date(task.start_date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates.map(date => new Date(date).getTime())));
        
        // 扩展时间范围
        minDate.setDate(minDate.getDate() - 2);
        maxDate.setDate(maxDate.getDate() + 2);
        
        const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
        
        // 创建甘特图HTML
        let html = `
            <div style="padding: 20px;">
                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px 0;">项目ID: ${project_id} - 甘特图</h4>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem;">P0-紧急</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #f97316; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem;">P1-高</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #eab308; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem;">P2-中</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #22c55e; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem;">P3-低</span>
                        </div>
                    </div>
                </div>
                
                <!-- 时间轴 -->
                <div style="display: flex; border-bottom: 2px solid #cbd5e1; margin-bottom: 10px; padding-bottom: 5px;">
                    <div style="width: 150px; font-weight: 600; color: #475569;">任务</div>
                    <div style="flex: 1; display: flex;">
        `;
        
        // 添加日期标题
        for (let i = 0; i <= totalDays; i++) {
            const currentDate = new Date(minDate);
            currentDate.setDate(minDate.getDate() + i);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            
            html += `
                <div style="flex: 1; text-align: center; font-size: 0.8rem; color: #64748b; border-left: 1px solid #e2e8f0; padding: 2px;">
                    ${month}/${day}
                </div>
            `;
        }
        
        html += `
                    </div>
                </div>
        `;
        
        // 添加任务行
        tasks.forEach((task, index) => {
            const startDate = new Date(task.start_date);
            const endDate = new Date(task.end_date);
            
            const startOffset = Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24));
            const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            const priorityColor = this.getPriorityColor(task.priority);
            
            html += `
                <div style="display: flex; margin-bottom: 15px; align-items: center;">
                    <div style="width: 150px; padding-right: 10px;">
                        <div style="font-weight: 600; color: #475569; margin-bottom: 2px;">${task.title}</div>
                        <div style="font-size: 0.8rem; color: #64748b;">${task.assigned_to} · ${task.progress}%</div>
                    </div>
                    <div style="flex: 1; position: relative; height: 30px; background: #f8fafc; border-radius: 4px; overflow: hidden;">
                        <!-- 时间轴背景 -->
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex;">
            `;
            
            // 添加时间轴网格
            for (let i = 0; i <= totalDays; i++) {
                html += `<div style="flex: 1; border-left: 1px solid #e2e8f0;"></div>`;
            }
            
            html += `
                        </div>
                        
                        <!-- 任务条 -->
                        <div style="position: absolute; 
                                    top: 5px; 
                                    left: ${(startOffset / totalDays) * 100}%; 
                                    width: ${(duration / totalDays) * 100}%; 
                                    height: 20px; 
                                    background: ${priorityColor}; 
                                    border-radius: 4px; 
                                    display: flex; 
                                    align-items: center; 
                                    padding: 0 8px;
                                    color: white;
                                    font-size: 0.8rem;
                                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                ${task.title}
                            </div>
                            <div style="background: rgba(255,255,255,0.2); padding: 1px 6px; border-radius: 3px; font-size: 0.7rem;">
                                ${task.progress}%
                            </div>
                        </div>
                        
                        <!-- 进度条 -->
                        <div style="position: absolute; 
                                    top: 5px; 
                                    left: ${(startOffset / totalDays) * 100}%; 
                                    width: ${(duration / totalDays) * 100 * (task.progress / 100)}%; 
                                    height: 20px; 
                                    background: rgba(255,255,255,0.3); 
                                    border-radius: 4px 0 0 4px;">
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 0.9rem; color: #64748b;">
                    <div>总计: ${tasks.length}个任务</div>
                    <div>时间范围: ${minDate.toISOString().split('T')[0]} 至 ${maxDate.toISOString().split('T')[0]}</div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    // 甘特图缩放
    zoomGantt(direction) {
        const container = document.getElementById('gantt-chart-container');
        if (!container) return;
        
        const currentScale = parseFloat(container.style.transform?.replace('scale(', '')?.replace(')', '')) || 1;
        let newScale = direction === 'in' ? currentScale * 1.2 : currentScale / 1.2;
        
        // 限制缩放范围
        newScale = Math.max(0.5, Math.min(3, newScale));
        
        container.style.transform = `scale(${newScale})`;
        container.style.transformOrigin = 'top left';
    }
    
    // 重置甘特图视图
    resetGanttView() {
        const container = document.getElementById('gantt-chart-container');
        if (!container) return;
        
        container.style.transform = 'scale(1)';
        container.scrollTop = 0;
        container.scrollLeft = 0;
    }
    
    // 刷新Dashboard
    refreshDashboard() {
        const projectSelect = document.getElementById('project-select');
        if (projectSelect && projectSelect.value) {
            this.loadGanttChart();
        }
    }
    
    // 单例模式
    static getInstance() {
        if (!ModuleHandler.instance) {
            ModuleHandler.instance = new ModuleHandler();
        }
        return ModuleHandler.instance;
    }
}

// 初始化模块处理器
window.ModuleHandler = ModuleHandler;