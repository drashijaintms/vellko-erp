const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BASE_URL = 'https://vellkoerp.com';
const blogsPath = path.resolve(__dirname, '../data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
const publishedBlogs = blogs.filter(b => !b.status || b.status === 'Published');

console.log(`Auditing ${publishedBlogs.length} published blog posts...\n`);

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const results = [];

for (let i = 0; i < publishedBlogs.length; i++) {
  const b = publishedBlogs[i];
  const slug = b.slug || slugify(b.title) || String(b.id || b._id);
  const expectedCanonical = `${BASE_URL}/blog/${slug}`;
  const htmlFile = path.resolve(__dirname, `../dist/blog/${slug}.html`);

  const audit = {
    index: i + 1,
    id: b.id,
    title: b.title,
    slug: slug,
    expectedCanonical,
    prerenderExists: fs.existsSync(htmlFile),
    prerenderValid: false,
    phpValid: false,
    errors: [],
    details: {}
  };

  // 1. Audit Pre-rendered HTML
  if (audit.prerenderExists) {
    const html = fs.readFileSync(htmlFile, 'utf8');

    // Title check
    const titleMatches = html.match(/<title>(.*?)<\/title>/gi) || [];
    const title = titleMatches[0] ? titleMatches[0].replace(/<\/?title>/gi, '') : '';
    audit.details.prerenderTitleCount = titleMatches.length;
    audit.details.prerenderTitle = title;
    if (titleMatches.length !== 1) audit.errors.push(`Multiple or missing title tags (${titleMatches.length}) in HTML`);

    // Meta description check
    const descMatches = html.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/gi) || [];
    const desc = descMatches[0] ? descMatches[0].replace(/<meta\s+name="description"\s+content="/i, '').replace(/"\s*\/?>$/, '') : '';
    audit.details.prerenderDescCount = descMatches.length;
    audit.details.prerenderDesc = desc;
    if (descMatches.length !== 1) audit.errors.push(`Multiple or missing meta descriptions (${descMatches.length}) in HTML`);

    // Canonical check
    const canMatches = html.match(/<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/gi) || [];
    const canonical = canMatches[0] ? canMatches[0].replace(/<link\s+rel="canonical"\s+href="/i, '').replace(/"\s*\/?>$/, '') : '';
    audit.details.prerenderCanonical = canonical;
    if (canonical !== expectedCanonical) audit.errors.push(`Canonical URL mismatch: got "${canonical}", expected "${expectedCanonical}"`);

    // Open Graph
    const ogTitle = (html.match(/<meta\s+property="og:title"\s+content="(.*?)"/i) || [])[1] || '';
    const ogDesc = (html.match(/<meta\s+property="og:description"\s+content="(.*?)"/i) || [])[1] || '';
    const ogType = (html.match(/<meta\s+property="og:type"\s+content="(.*?)"/i) || [])[1] || '';
    audit.details.ogType = ogType;
    if (ogType !== 'article') audit.errors.push(`og:type is "${ogType}", expected "article"`);

    // JSON-LD Schema check
    const schemaMatch = html.match(/<script type="application\/ld\+json" id="seo-schema">([\s\S]*?)<\/script>/i);
    if (!schemaMatch) {
      audit.errors.push('Missing JSON-LD schema block');
    } else {
      try {
        const parsed = JSON.parse(schemaMatch[1]);
        const graph = parsed['@graph'] || [parsed];
        const types = graph.map(g => g['@type']);
        audit.details.schemaTypes = types;

        // BlogPosting verification
        const bp = graph.find(g => g['@type'] === 'BlogPosting');
        if (!bp) {
          audit.errors.push('Missing BlogPosting schema');
        } else {
          if (!bp['@id']) audit.errors.push('BlogPosting missing @id');
          if (!bp.headline) audit.errors.push('BlogPosting missing headline');
          if (!bp.description) audit.errors.push('BlogPosting missing description');
          if (!bp.image) audit.errors.push('BlogPosting missing image');
          if (!bp.datePublished) audit.errors.push('BlogPosting missing datePublished');
          if (!bp.author) audit.errors.push('BlogPosting missing author');
          if (!bp.publisher) audit.errors.push('BlogPosting missing publisher');
          if (!bp.inLanguage) audit.errors.push('BlogPosting missing inLanguage');
        }

        // BreadcrumbList verification
        const bc = graph.find(g => g['@type'] === 'BreadcrumbList');
        if (!bc) {
          audit.errors.push('Missing BreadcrumbList schema');
        } else {
          const items = bc.itemListElement || [];
          if (items.length !== 3) audit.errors.push(`BreadcrumbList has ${items.length} items, expected 3`);
          if (items[0]?.position !== 1 || items[0]?.name !== 'Home') audit.errors.push('Breadcrumb item 1 incorrect');
          if (items[1]?.position !== 2 || items[1]?.name !== 'Blog') audit.errors.push('Breadcrumb item 2 incorrect');
          if (items[2]?.position !== 3 || items[2]?.item !== expectedCanonical) audit.errors.push('Breadcrumb item 3 incorrect');
        }

        // Organization verification
        const org = graph.find(g => g['@type'] === 'Organization');
        if (!org) audit.errors.push('Missing Organization schema');

        // FAQ verification
        const hasFaqsInContent = (b.excerpt || '').includes('vellko-faq-accordion') || (b.excerpt || '').includes('<summary');
        const faq = graph.find(g => g['@type'] === 'FAQPage');
        if (hasFaqsInContent && !faq) {
          audit.errors.push('Content contains visible FAQs but FAQPage schema is missing');
        } else if (!hasFaqsInContent && faq) {
          audit.errors.push('FAQPage schema generated but content has no visible FAQs');
        } else if (faq) {
          audit.details.faqCount = faq.mainEntity ? faq.mainEntity.length : 0;
          if (audit.details.faqCount === 0) audit.errors.push('Empty FAQPage schema');
        }

        audit.prerenderValid = audit.errors.length === 0;
      } catch (err) {
        audit.errors.push(`Invalid JSON-LD syntax: ${err.message}`);
      }
    }
  }

  // 2. Audit Dynamic PHP Blog Handler
  try {
    const phpRunner = path.resolve(__dirname, 'test-one-blog.php');
    const phpOut = execFileSync('C:\\xampp\\php\\php.exe', [phpRunner, slug], { encoding: 'utf8' }).trim();
    if (phpOut.startsWith('{')) {
      const parsedPhp = JSON.parse(phpOut);
      audit.details.phpTitle = parsedPhp.title;
      audit.details.phpDesc = parsedPhp.desc;
      audit.details.phpCanonical = parsedPhp.canonical;
      audit.details.phpValidSchema = parsedPhp.validJson && parsedPhp.hasSchema;
      audit.phpValid = !!(parsedPhp.title && parsedPhp.desc && parsedPhp.canonical === expectedCanonical && audit.details.phpValidSchema);
    }
  } catch (phpErr) {
    audit.details.phpError = phpErr.message;
  }

  results.push(audit);
}

// Print Audit Summary Table
console.log('--- BLOG SEO AUDIT RESULTS ---');
console.log(
  '#'.padEnd(4) +
  'Status'.padEnd(10) +
  'Slug'.padEnd(45) +
  'Schemas'.padEnd(35) +
  'PHP'.padEnd(6) +
  'Issues'
);
console.log('-'.repeat(120));

let passCount = 0;
let failCount = 0;

for (const res of results) {
  const isOk = res.prerenderValid && res.phpValid;
  if (isOk) passCount++;
  else failCount++;

  const statusStr = isOk ? 'PASS' : 'WARN';
  const slugStr = res.slug.slice(0, 43);
  const schemasStr = (res.details.schemaTypes || []).join(', ').slice(0, 33);
  const phpStr = res.phpValid ? 'OK' : 'ERR';
  const issuesStr = res.errors.length > 0 ? res.errors.join('; ') : 'None';

  console.log(
    String(res.index).padEnd(4) +
    statusStr.padEnd(10) +
    slugStr.padEnd(45) +
    schemasStr.padEnd(35) +
    phpStr.padEnd(6) +
    issuesStr
  );
}

console.log('-'.repeat(120));
console.log(`Total Published Blogs Audited: ${results.length}`);
console.log(`Passed All Checks: ${passCount}`);
console.log(`Failed / Issues: ${failCount}`);
