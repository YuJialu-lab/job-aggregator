// StepStone 职位抓取器（Puppeteer 版本）
// ==================================================
// 功能概述：
// 1. 访问 StepStone 公开职位搜索页
// 2. 渲染 JavaScript 动态内容
// 3. 抓取每条职位的标题、公司、地点、链接
// 4. 返回 JSON 数组，方便后续聚合、排序、标记新职位

// ==================== 导入模块 ====================
// Node.js 中的 require 用于导入模块， puppeteer 是一个控制 Chromium/Chrome 浏览器的库，浏览器自动化库
const puppeteer = require('puppeteer'); 

// ==================== 定义函数 ====================
/**
 * fetchStepStoneJobs - 抓取 StepStone 职位
 * @param {string} query - 搜索关键词，例如 'UX Designer'（@param: 用于函数说明）
 * @param {string} location - 城市/地区
 * @returns {Promise<Array>} 返回一个 Promise，resolve 时返回职位数组
 * 
 * - async: 声明异步函数，允许在内部使用 await 等待异步操作
 * - Promise: JS 的异步处理对象，用于表示未来完成的值
 */
async function fetchStepStoneJobs(query, location) {

  // ==================== Step 1: 构建 URL ====================
  // encodeURIComponent: 对字符串进行 URL 编码，处理空格和特殊字符, 将字符转成 %16hex 形式，保证 URL 安全
  const url = `https://www.stepstone.de/jobs/${encodeURIComponent(query)}/in-${encodeURIComponent(location)}`;

  // ==================== Step 2: 启动浏览器 ====================
  // await: 等待 Promise 完成，暂停当前函数执行，返回结果
  // launch(): Puppeteer 启动浏览器实例，（就像你电脑打开 Chrome 一样）
  // headless: 'new' 不显示窗口，但浏览器仍然在后台执行所有操作
  const browser = await puppeteer.launch({
    headfull: 'new'
  });

  // ==================== Step 3: 新建页面 ====================
  const page = await browser.newPage(); 
  // newPage(): 浏览器中创建一个空白标签页，操作 DOM 就在这个标签页

  // ==================== Step 4: 设置 User-Agent ====================
  // setUserAgent: 修改浏览器请求头的 UA 字段
  // 作用: 防止服务器认为是爬虫，降低风控概率
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  );

  // ==================== Step 5: 打开页面 ====================
  // page.goto: 跳转到目标 URL，await: 等待页面加载完成
  // waitUntil: 'networkidle2' 算法原理：页面加载完成时网络请求少于 2 个，表示 JS 渲染完成
  await page.goto(url, { waitUntil: 'networkidle2' });

  // ==================== Step 6: 等待元素 ====================
  // waitForSelector('article'): 等待第一个 <article> 元素出现，如果元素不存在，函数会暂停，直到超时
  await page.waitForSelector('article');

  // ==================== Step 7: 页面抓取 ====================
  // page.evaluate(fn): 在浏览器环境中执行 JS，fn 返回值会被传回 Node。使用浏览器的 DOM API 遍历元素，提取文本内容
  const jobs = await page.evaluate(() => {
    const items = []; // push 算法：在数组尾部插入元素，复杂度 O(1) 平均

    // document.querySelectorAll('article'): 返回页面所有 <article> 节点
    // 结果是 NodeList，可用 forEach 遍历
    document.querySelectorAll('article').forEach(el => { // el: 当前元素引用

      // querySelector: 返回匹配选择器的第一个元素
      // ?. 可选链运算符: 避免 null 报错，innerText: 获取元素文本内容，trim(): 去掉前后空格
      const title = el.querySelector('h2')?.innerText?.trim();
      const company = el.querySelector('[data-at="job-item-company-name"]')?.innerText?.trim();
      const location = el.querySelector('[data-at="job-item-location"]')?.innerText?.trim();
      const link = el.querySelector('h2 a')?.href;

      // 条件判断算法：只保存 title 和 link 都存在的职位
      if (title && link) {
        // push: 将对象插入数组末尾
        items.push({
          platform: 'StepStone', // 标记来源平台
          title,                 // 职位名称
          company,               // 公司名称
          location,              // 城市/地点
          link                   // 职位链接
        });
      }
    });

    return items; // 返回数组给 Node 上下文
  });

  // ==================== Step 8: 关闭浏览器 ====================
  await browser.close(); // 避免内存泄漏

  // ==================== Step 9: 返回结果 ====================
  // 使用示例：
  // const jobs = await fetchStepStoneJobs('UX Designer', 'Hamburg');
  // console.log(jobs);
  // 输出示例：
  // [
  //   { platform: 'StepStone', title: 'UX Designer', company: 'Firma X', location: 'Hamburg', link: 'https://...' }
  // ]
  return jobs;
}

// ==================== Step 10: 导出模块 ====================
// module.exports: Node.js 的模块导出对象
// 允许其他文件通过 require 导入该函数
module.exports = fetchStepStoneJobs;
