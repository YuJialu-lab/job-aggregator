const puppeteer = require('puppeteer');

async function fetchXingJobs(query, location) {
  const url =
    `https://www.xing.com/jobs/search?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  );

  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.waitForSelector('article h2', { timeout: 15000 });

  const jobs = await page.evaluate(() => {
    const items = [];

    document.querySelectorAll('article').forEach(el => {
      const title = el.querySelector('h2')?.innerText?.trim();
      const company = el.querySelector('p')?.innerText?.trim();
      const link = el.querySelector('a')?.href;

      if (title && link) {
        items.push({
          platform: 'XING',
          title,
          company,
          location: '',
          link
        });
      }
    });

    return items;
  });

  await browser.close();
  return jobs;
}

module.exports = fetchXingJobs;
