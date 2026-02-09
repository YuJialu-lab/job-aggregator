const puppeteer = require('puppeteer');

async function fetchIndeedJobs(query, location) {
  const url =
    `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`;

  const browser = await puppeteer.launch({
    headless: 'new'
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  );

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('.job_seen_beacon');

  const jobs = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.job_seen_beacon').forEach(el => {
      const title =
        el.querySelector('.jobTitle span')?.innerText?.trim();
      const company =
        el.querySelector('.companyName')?.innerText?.trim();
      const location =
        el.querySelector('.companyLocation')?.innerText?.trim();
      const link =
        el.querySelector('a.jcs-JobTitle')?.href;

      if (title && link) {
        items.push({
          platform: 'Indeed',
          title,
          company,
          location,
          link
        });
      }
    });
    return items;
  });

  await browser.close();
  return jobs;
}

module.exports = fetchIndeedJobs;
