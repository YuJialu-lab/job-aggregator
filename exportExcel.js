const XLSX = require('xlsx');
const path = require('path');

function exportToExcel(jobs) {
  const data = jobs.map(job => ({
    Platform: job.platform,
    Title: job.title,
    Company: job.company || '',
    Location: job.location || '',
    Link: job.link,
    IsNew: job.isNew ? 'YES' : ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');

  const outputPath = path.join(__dirname, 'jobs.xlsx');
  XLSX.writeFile(workbook, outputPath);

  console.log(`Excel 已生成：${outputPath}`);
}

module.exports = exportToExcel;
