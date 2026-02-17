// ==================================================
// 主入口：职位聚合抓取器
// ==================================================

const config = require('./config');

const fetchIndeedJobs = require('./fetchers/indeed');
const fetchStepStoneJobs = require('./fetchers/stepstone');
const fetchGlassdoorJobs = require('./fetchers/glassdoor');
const fetchXingJobs = require('./fetchers/xing');
const fetchArbeitsagenturJobs = require('./fetchers/arbeitsagentur');
const exportToHtml = require('./exportHtml');
const exportToExcel = require('./exportExcel');

const { isNewJob } = require('./utils');

// ==================================================
// 聚合抓取函数
// ==================================================
async function fetchAllJobs() {
  const allJobs = [];

  // 为了避免你以后加平台继续复制 if
  const platformFetchers = {
    indeed: fetchIndeedJobs,
    stepstone: fetchStepStoneJobs,
    glassdoor: fetchGlassdoorJobs,
    xing: fetchXingJobs,
    arbeitsagentur: fetchArbeitsagenturJobs
  };

  for (const platform of config.platforms) {
    const fetcher = platformFetchers[platform];

    if (!fetcher) {
      console.warn(`未知平台，跳过：${platform}`);
      continue;
    }

    try {
      console.log(`抓取 ${platform}…`);
      const jobs = await fetcher(config.query, config.location);

      // 统一补字段，防止后面排序/标记炸掉
      jobs.forEach(job => {
        job.date = job.date || null;
        job.isNew = false;
      });

      allJobs.push(...jobs);
    } catch (err) {
      console.error(`${platform} 抓取失败`, err.message);
    }
  }

  // ==================== 按时间排序 ====================
  allJobs.sort(
    (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
  );

  // ==================== 标记 24h 新职位 ====================
  allJobs.forEach(job => {
    job.isNew = isNewJob(job.date);
  });

  return allJobs;
}

// ==================================================
// 执行函数
// ==================================================
async function run() {
  console.log('==============================');
  console.log('开始抓取职位…');

  const jobs = await fetchAllJobs();

  exportToHtml(jobs);
  exportToExcel(jobs);
  console.log(`抓取完成，共 ${jobs.length} 条`);
  console.log(jobs);

  console.log('==============================');
}

// ==================================================
// 启动 & 定时
// ==================================================
run();
setInterval(run, config.fetchInterval);
