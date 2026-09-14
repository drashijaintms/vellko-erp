const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const distDir = path.join(__dirname, '..', 'dist');

// React Router fallback - Serve pre-rendered HTML if available, otherwise index.html
app.use((req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return next();
  }

  const cleanPath = req.path.replace(/^\/+|\/+$/g, '');
  
  if (!cleanPath) {
    return res.sendFile(path.join(distDir, 'index.html'));
  }

  const directFile = path.join(distDir, `${cleanPath}.html`);
  if (fs.existsSync(directFile)) {
    return res.sendFile(directFile);
  }

  const dirFile = path.join(distDir, cleanPath, 'index.html');
  if (fs.existsSync(dirFile)) {
    return res.sendFile(dirFile);
  }

  res.sendFile(path.join(distDir, 'index.html'));
});

const PORT = 5999;
const server = app.listen(PORT, async () => {
  console.log(`Test Express server running on port ${PORT}\n`);

  const userAgents = [
    { name: 'Screaming Frog', ua: 'Screaming Frog SEO Spider/19.0' },
    { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    { name: 'Chrome Browser', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' }
  ];

  const testPaths = [
    '/crm-lead-management',
    '/hrms-payroll',
    '/finance-accounting',
    '/inventory-management',
    '/about',
    '/contact',
    '/blog'
  ];

  let overallPass = true;

  for (const bot of userAgents) {
    console.log(`\n=== Testing with User-Agent: ${bot.name} ===`);
    for (const testPath of testPaths) {
      const result = await new Promise((resolve) => {
        const options = {
          hostname: '127.0.0.1',
          port: PORT,
          path: testPath,
          method: 'GET',
          headers: { 'User-Agent': bot.ua }
        };

        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            const titleMatch = data.match(/<title>(.*?)<\/title>/i);
            const canonicalMatch = data.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
            const h1Match = data.match(/<h1[^>]*>(.*?)<\/h1>/is);
            const rootMatch = data.match(/<div id="root">(.*?)<\/body>/is);
            const textContent = (rootMatch ? rootMatch[1] : '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

            resolve({
              statusCode: res.statusCode,
              title: titleMatch ? titleMatch[1] : 'N/A',
              canonical: canonicalMatch ? canonicalMatch[1] : 'N/A',
              h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A',
              wordCount,
              size: data.length
            });
          });
        });
        req.on('error', err => resolve({ error: err.message }));
        req.end();
      });

      const pass = result.statusCode === 200 &&
                   result.canonical.includes(testPath) &&
                   result.wordCount > 100 &&
                   !result.title.includes('Homepage meta');

      console.log(`GET ${testPath} -> HTTP ${result.statusCode} | Words: ${result.wordCount} | Canonical: ${result.canonical} | Pass: ${pass ? '✅' : '❌'}`);
      if (!pass) overallPass = false;
    }
  }

  server.close(() => {
    console.log(`\nHTTP Server tests complete. Overall Status: ${overallPass ? 'ALL TESTS PASSED ✅' : 'FAILED ❌'}`);
    process.exit(overallPass ? 0 : 1);
  });
});
