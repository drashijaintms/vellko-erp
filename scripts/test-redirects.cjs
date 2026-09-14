const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: HOST,
        port: PORT,
        path: path,
        method: options.method || 'GET',
        headers: {
          Host: `localhost:${PORT}`,
          ...(options.headers || {})
        }
      },
      (res) => {
        let body = '';
        res.on('data', chunk => (body += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log(`\n========================================`);
  console.log(`Starting Local Route & Redirect Verification on http://${HOST}:${PORT}`);
  console.log(`========================================\n`);

  const testCases = [
    // 1. Root / Homepage
    {
      name: 'Homepage /',
      path: '/',
      expectedStatus: 200,
      mustContain: ['<title>', 'Vellko ERP']
    },
    // 2. Non-slash main URLs (Must return 200 OK directly, NOT 301)
    {
      name: 'Non-Slash Main URL: /crm-lead-management',
      path: '/crm-lead-management',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/crm-lead-management" />', '<title>']
    },
    {
      name: 'Non-Slash Main URL: /service-management',
      path: '/service-management',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/service-management" />']
    },
    {
      name: 'Non-Slash Main URL: /inventory-management',
      path: '/inventory-management',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/inventory-management" />']
    },
    {
      name: 'Non-Slash Main URL: /real-estate-erp',
      path: '/real-estate-erp',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/real-estate-erp" />']
    },
    {
      name: 'Non-Slash Main URL: /about',
      path: '/about',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/about" />']
    },
    {
      name: 'Non-Slash Main URL: /contact',
      path: '/contact',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/contact" />']
    },
    {
      name: 'Non-Slash Main URL: /blog',
      path: '/blog',
      expectedStatus: 200,
      mustContain: ['<link rel="canonical" href="https://vellkoerp.com/blog" />']
    },
    // 3. Trailing Slash URLs (Must return 301 Redirect to Non-Slash URL)
    {
      name: 'Trailing Slash URL: /crm-lead-management/ -> 301 to /crm-lead-management',
      path: '/crm-lead-management/',
      expectedStatus: 301,
      expectedLocation: '/crm-lead-management'
    },
    {
      name: 'Trailing Slash URL: /service-management/ -> 301 to /service-management',
      path: '/service-management/',
      expectedStatus: 301,
      expectedLocation: '/service-management'
    },
    {
      name: 'Trailing Slash URL: /inventory-management/ -> 301 to /inventory-management',
      path: '/inventory-management/',
      expectedStatus: 301,
      expectedLocation: '/inventory-management'
    },
    {
      name: 'Trailing Slash URL: /real-estate-erp/ -> 301 to /real-estate-erp',
      path: '/real-estate-erp/',
      expectedStatus: 301,
      expectedLocation: '/real-estate-erp'
    },
    {
      name: 'Trailing Slash URL: /about/ -> 301 to /about',
      path: '/about/',
      expectedStatus: 301,
      expectedLocation: '/about'
    },
    {
      name: 'Trailing Slash URL: /blog/ -> 301 to /blog',
      path: '/blog/',
      expectedStatus: 301,
      expectedLocation: '/blog'
    },
    // 4. Sitemap
    {
      name: 'Sitemap /sitemap.xml',
      path: '/sitemap.xml',
      expectedStatus: 200,
      mustContain: ['<urlset', '<loc>https://vellkoerp.com/crm-lead-management</loc>']
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const res = await request(tc.path);
      let testPassed = true;
      const failureReasons = [];

      if (res.statusCode !== tc.expectedStatus) {
        testPassed = false;
        failureReasons.push(`Expected status ${tc.expectedStatus} but got ${res.statusCode}`);
      }

      if (tc.expectedLocation) {
        const location = res.headers['location'] || '';
        if (!location.endsWith(tc.expectedLocation)) {
          testPassed = false;
          failureReasons.push(`Expected Location header to end with '${tc.expectedLocation}' but got '${location}'`);
        }
      }

      if (tc.mustContain) {
        for (const token of tc.mustContain) {
          if (!res.body.includes(token)) {
            testPassed = false;
            failureReasons.push(`Response body missing required token: "${token}"`);
          }
        }
      }

      if (testPassed) {
        console.log(` PASS: [${res.statusCode}] ${tc.name}`);
        passed++;
      } else {
        console.log(` FAIL: ${tc.name}`);
        failureReasons.forEach(r => console.log(`   -> ${r}`));
        failed++;
      }
    } catch (err) {
      console.log(` ERROR: ${tc.name} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  return failed === 0;
}

if (require.main === module) {
  runTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runTests };
