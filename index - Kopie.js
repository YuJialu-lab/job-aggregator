const config = require('./config');
// const fetchIndeedJobs = require('./fetchers/indeed'); // 注释掉
const fetchStepStoneJobs = require('./fetchers/stepstone');
const { isNewJob } = require('./utils');

async function fetchAllJobs() {
    const allJobs = [];

    // if (config.platforms.includes('indeed')) {
    //     const indeedJobs = await fetchIndeedJobs(config.query, config.location);
    //     allJobs.push(...indeedJobs);
    // }

    if (config.platforms.includes('stepstone')) {
        const stepJobs = await fetchStepStoneJobs(config.query, config.location);
        allJobs.push(...stepJobs);
    }

    // 按时间排序（最新在前）
    allJobs.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

    // 标记新职位
    allJobs.forEach(job => job.isNew = isNewJob(job.date));

    return allJobs;
}

// 定时抓取
async function run() {
    console.log('抓取开始…');
    const jobs = await fetchAllJobs();
    console.log(jobs);
    console.log('抓取完成');
}

run();
setInterval(run, config.fetchInterval);
