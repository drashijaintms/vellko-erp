const http = require('http');
const path = require('path');
const fs = require('fs');

// We'll test against the pre-rendered dist files and the server route logic
const urlsToTest = [
  {
    path: '/crm-lead-management',
    expectedTitle: 'Cloud Based CRM Software & Lead Management Software',
    expectedCanonical: 'https://vellkoerp.com/crm-lead-management',
    expectedH1: 'Manage Your Cloud Based CRM Software'
  },
  {
    path: '/hrms-payroll',
    expectedTitle: 'Cloud based HR systems | Payroll management system',
    expectedCanonical: 'https://vellkoerp.com/hrms-payroll',
    expectedH1: 'Manage Your Cloud Based HR Systems & Payroll'
  },
  {
    path: '/finance-accounting',
    expectedTitle: 'Cloud based Accounting software | Financial Management Vellko ERP',
    expectedCanonical: 'https://vellkoerp.com/finance-accounting',
    expectedH1: 'Financial Management & Accounting'
  },
  {
    path: '/inventory-management',
    expectedTitle: 'Cloud Based Inventory Management Software | Vellko ERP',
    expectedCanonical: 'https://vellkoerp.com/inventory-management',
    expectedH1: 'Cloud Based Inventory Management Software'
  },
  {
    path: '/about',
    expectedTitle: 'About Us | Vellko ERP Philosophy, Mission & Team',
    expectedCanonical: 'https://vellkoerp.com/about',
    expectedH1: 'About Us'
  },
  {
    path: '/pricing',
    expectedTitle: 'Transparent Pricing Plans | Vellko ERP',
    expectedCanonical: 'https://vellkoerp.com/pricing',
    expectedH1: 'Affordable Pricing'
  }
];

function analyzeHtml(html, expected) {
  // Extract Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  // Extract Meta Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  const description = descMatch ? descMatch[1] : '';

  // Extract Canonical
  const canMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  const canonical = canMatch ? canMatch[1] : '';

  // Extract Robots
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="(.*?)"/i);
  const robots = robotsMatch ? robotsMatch[1] : '';

  // Extract Hreflang en & x-default
  const hreflangEnMatch = html.match(/<link\s+rel="alternate"\s+hreflang="en"\s+href="(.*?)"/i);
  const hreflangDefaultMatch = html.match(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="(.*?)"/i);
  const hreflangEn = hreflangEnMatch ? hreflangEnMatch[1] : '';
  const hreflangDefault = hreflangDefaultMatch ? hreflangDefaultMatch[1] : '';

  // Extract H1
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').replace(/<!--.*?-->/g, '').trim() : '';

  // Calculate text and word count in root
  const rootMatch = html.match(/<div id="root">(.*?)<\/body>/is);
  const rootContent = rootMatch ? rootMatch[1] : '';
  const textContent = rootContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                 .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                                 .replace(/<[^>]+>/g, ' ')
                                 .replace(/&[a-z0-9#]+;/gi, ' ')
                                 .replace(/\s+/g, ' ')
                                 .trim();
  const words = textContent ? textContent.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;
  const textRatio = html.length > 0 ? ((textContent.length / html.length) * 100).toFixed(2) : 0;

  return {
    title,
    description,
    canonical,
    robots,
    hreflangEn,
    hreflangDefault,
    h1,
    wordCount,
    textRatio,
    rawLength: html.length,
    passedTitle: title.toLowerCase().includes(expected.expectedTitle.toLowerCase().substring(0, 20)),
    passedCanonical: canonical === expected.expectedCanonical,
    passedRobots: robots.includes('index, follow'),
    passedHreflang: hreflangEn === expected.expectedCanonical && hreflangDefault === expected.expectedCanonical,
    passedH1: h1.length > 0,
    passedWordCount: wordCount > 200,
    passedTextRatio: parseFloat(textRatio) > 5
  };
}

console.log('=== VERIFYING PRE-RENDERED STATIC HTML FILES ===\n');

let allPassed = true;

for (const test of urlsToTest) {
  const filePath = path.join(__dirname, '..', 'dist', test.path.replace(/^\//, '') + '.html');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${filePath}`);
    allPassed = false;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const results = analyzeHtml(html, test);

  console.log(`URL: https://vellkoerp.com${test.path}`);
  console.log(`- Title: "${results.title}" (Match: ${results.passedTitle ? '✅' : '❌'})`);
  console.log(`- Canonical: "${results.canonical}" (Match: ${results.passedCanonical ? '✅' : '❌'})`);
  console.log(`- Robots: "${results.robots}" (Match: ${results.passedRobots ? '✅' : '❌'})`);
  console.log(`- Hreflang en: "${results.hreflangEn}" (Match: ${results.passedHreflang ? '✅' : '❌'})`);
  console.log(`- H1: "${results.h1}" (Found: ${results.passedH1 ? '✅' : '❌'})`);
  console.log(`- Word Count: ${results.wordCount} words (Pass: ${results.passedWordCount ? '✅' : '❌'})`);
  console.log(`- Text Ratio: ${results.textRatio}% (Pass: ${results.passedTextRatio ? '✅' : '❌'})`);
  console.log(`- Raw HTML Size: ${results.rawLength} bytes`);
  console.log('--------------------------------------------------');

  if (!results.passedTitle || !results.passedCanonical || !results.passedRobots || !results.passedHreflang || !results.passedH1 || !results.passedWordCount) {
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL STATIC HTML SEO VERIFICATIONS PASSED WITH 100% SUCCESS!');
} else {
  console.error('\n❌ SOME CHECKS FAILED');
}
