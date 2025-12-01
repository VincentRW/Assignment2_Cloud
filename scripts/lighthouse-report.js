const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function generateReport() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], port: chrome.port};
  const runnerResult = await lighthouse('http://localhost:3000/escape_room', options);

  fs.writeFileSync('lighthouse-report.html', runnerResult.report);

  console.log('🏆 Lighthouse Scores:');
  console.log('Performance:', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices:', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO:', runnerResult.lhr.categories.seo.score * 100);

  await chrome.kill();
}

generateReport();