// 模拟浏览器fetch行为
const fetch = require('node-fetch');

async function testFrontendStatusCheck() {
    console.log('模拟浏览器状态检查...');
    
    try {
        const response = await fetch('http://localhost:8001/api/status');
        console.log('响应状态:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('响应数据:', JSON.stringify(data, null, 2));
            
            // 模拟前端更新逻辑
            const backendStatus = data.components.backend.status;
            const databaseStatus = data.components.database.status;
            const aiStatus = data.components.ai_parser.status;
            
            console.log('\n状态结果:');
            console.log('后端:', backendStatus === 'running' ? '✅ 运行中' : '❌ 已停止');
            console.log('数据库:', databaseStatus === 'connected' ? '✅ 已连接' : '❌ 连接失败');
            console.log('AI:', aiStatus === 'available' ? '✅ 已配置' : '❌ 配置失败');
            
            return true;
        } else {
            console.error('响应失败:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('请求失败:', error.message);
        return false;
    }
}

// 运行测试
testFrontendStatusCheck().then(success => {
    console.log('\n测试结果:', success ? '✅ 成功' : '❌ 失败');
    process.exit(success ? 0 : 1);
});
