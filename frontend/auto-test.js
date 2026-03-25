// 自动测试脚本
console.log('自动测试脚本开始执行...');

// 测试后端API
async function testBackend() {
    try {
        console.log('测试后端API...');
        const response = await fetch('http://localhost:8001/api/health');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ 后端API正常:', data);
            return true;
        } else {
            console.log('❌ 后端API响应异常:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ 后端API连接失败:', error.message);
        return false;
    }
}

// 测试系统状态
async function testSystemStatus() {
    try {
        console.log('测试系统状态...');
        const response = await fetch('http://localhost:8001/api/status');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ 系统状态正常:', JSON.stringify(data, null, 2));
            
            // 检查各个组件状态
            const backendOk = data.components.backend?.status === 'running';
            const dbOk = data.components.database?.status === 'connected';
            const aiOk = data.components.ai_parser?.status === 'available';
            
            console.log(`后端: ${backendOk ? '✅ 运行中' : '❌ 已停止'}`);
            console.log(`数据库: ${dbOk ? '✅ 已连接' : '❌ 连接失败'}`);
            console.log(`AI服务: ${aiOk ? '✅ 已配置' : '❌ 配置失败'}`);
            
            return { backendOk, dbOk, aiOk };
        } else {
            console.log('❌ 系统状态检查失败:', response.status);
            return { backendOk: false, dbOk: false, aiOk: false };
        }
    } catch (error) {
        console.log('❌ 系统状态检查错误:', error.message);
        return { backendOk: false, dbOk: false, aiOk: false };
    }
}

// 测试前端页面
async function testFrontend() {
    try {
        console.log('测试前端页面...');
        const response = await fetch('http://localhost:8000/');
        if (response.ok) {
            console.log('✅ 前端页面可访问');
            return true;
        } else {
            console.log('❌ 前端页面访问失败:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ 前端页面连接失败:', error.message);
        return false;
    }
}

// 运行所有测试
async function runAllTests() {
    console.log('=== 开始系统测试 ===');
    
    const frontendOk = await testFrontend();
    const backendOk = await testBackend();
    const status = await testSystemStatus();
    
    console.log('=== 测试结果汇总 ===');
    console.log(`前端页面: ${frontendOk ? '✅ 正常' : '❌ 异常'}`);
    console.log(`后端API: ${backendOk ? '✅ 正常' : '❌ 异常'}`);
    console.log(`系统状态检查: ${status.backendOk ? '✅' : '❌'}`);
    console.log(`数据库状态: ${status.dbOk ? '✅ 已连接' : '❌ 连接失败'}`);
    console.log(`AI服务状态: ${status.aiOk ? '✅ 已配置' : '❌ 配置失败'}`);
    
    // 总体评估
    const allOk = frontendOk && backendOk && status.backendOk && status.dbOk && status.aiOk;
    console.log(`\n总体评估: ${allOk ? '✅ 所有系统正常' : '⚠️ 部分系统异常'}`);
    
    if (!allOk) {
        console.log('\n问题诊断:');
        if (!frontendOk) console.log('- 前端HTTP服务器可能未运行 (端口8000)');
        if (!backendOk) console.log('- 后端API服务器可能未运行 (端口8001)');
        if (!status.backendOk) console.log('- 后端服务状态异常');
        if (!status.dbOk) console.log('- 数据库连接状态异常');
        if (!status.aiOk) console.log('- AI服务状态异常');
    }
}

// 执行测试
runAllTests().catch(error => {
    console.error('测试执行失败:', error);
});