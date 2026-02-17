const fs = require('fs');
const path = require('path');

function exportToHtml(jobs) {
  const rows = jobs.map(job => `
    <tr class="${job.isNew ? 'new' : ''}">
      <td>${job.platform}</td>
      <td><a href="${job.link}" target="_blank">${job.title}</a></td>
      <td>${job.company || ''}</td>
      <td>${job.location || ''}</td>
      <td>${job.isNew ? '🟢 新' : ''}</td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>Job Aggregator</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    padding: 24px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    font-size: 14px;
  }
  th {
    background: #f4f4f4;
    text-align: left;
  }
  tr.new {
    background: #e8f7ee;
  }
  a {
    color: #0366d6;
    text-decoration: none;
  }
</style>
</head>
<body>
  <h1>职位聚合结果（${jobs.length}）</h1>
  <table>
    <thead>
      <tr>
        <th>平台</th>
        <th>职位</th>
        <th>公司</th>
        <th>地点</th>
        <th>新</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>
`;

  const outputPath = path.join(__dirname, 'jobs.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log(`HTML 已生成：${outputPath}`);
}

module.exports = exportToHtml;
