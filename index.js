// ==================================================
// 主入口：职位聚合抓取器
// 功能概述：
// 1. 根据 config 配置抓取各平台职位
// 2. 合并到统一数组
// 3. 按发布时间排序
// 4. 标记 24h 内新职位
// 5. 定时抓取，打印结果
// ==================================================

// ==================== 导入模块 ====================

// config.js 存储用户配置，如关键词、地点、平台、抓取频率
const config = require('./config');

// StepStone 抓取器函数
// fetchStepStoneJobs: 异步函数，返回 Promise -> resolve 为职位数组
const fetchStepStoneJobs = require('./fetchers/stepstone');

// utils.js 内 isNewJob 函数
// 功能：判断职位是否是 24h 内的新职位
const { isNewJob } = require('./utils');
const fetchIndeedJobs = require('./fetchers/indeed');

// ==================== 定义抓取函数 ====================
/**
 * fetchAllJobs - 聚合抓取函数
 * 解释关键点：
 * - async: 声明异步函数，可以在内部使用 await
 * - allJobs: 存储所有平台抓取结果的数组
 */
async function fetchAllJobs() {
    const allJobs = []; // 初始化空数组，用于存储所有抓取结果

    // ==================== StepStone ====================
    // 判断配置中是否启用 StepStone
    if (config.platforms.includes('stepstone')) {

        // await: 等待异步函数完成，并返回抓取结果
        const stepJobs = await fetchStepStoneJobs(config.query, config.location);

        // push ... 或 concat 算法：将抓取结果展开后加入 allJobs
        // ... 是扩展运算符，将数组拆成单个元素
        allJobs.push(...stepJobs); 
    }

    if (config.platforms.includes('indeed')) {
       const indeedJobs = await fetchIndeedJobs(config.query, config.location);
       allJobs.push(...indeedJobs);
     }

    // ==================== Step 3: 按时间排序 ====================
    // allJobs.sort: 内置排序函数，将 b.date - a.date，保证最新职位在前
    // ?. 可选链: 如果 date 为 undefined，返回 0，避免报错
    allJobs.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

    // ==================== Step 4: 标记新职位 ====================
    // forEach: 遍历数组，每个元素用 job 表示
    // 算法逻辑：调用 isNewJob(job.date)，返回 true/false，存入 job.isNew
    allJobs.forEach(job => job.isNew = isNewJob(job.date));

    // 返回统一聚合数组
    // 每个元素包含：
    // { platform, title, company, location, link, date, isNew }
    return allJobs;
}

// ==================== 定义定时抓取函数 ====================
async function run() {
    console.log('抓取开始…');

    // 调用 fetchAllJobs 获取所有平台职位
    const jobs = await fetchAllJobs();

    // 打印结果到控制台
    console.log(jobs);

    console.log('抓取完成');
}

// ==================== Step 5: 首次运行 ====================
run(); // 立即抓取一次

// ==================== Step 6: 定时抓取 ====================
// setInterval(fn, interval): 每隔 interval 毫秒执行 fn
// config.fetchInterval 单位毫秒，例如 1 小时 = 3600000
setInterval(run, config.fetchInterval);
