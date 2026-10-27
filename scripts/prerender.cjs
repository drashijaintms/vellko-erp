const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vellkoerp.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/logo-bAy9mXr5.png`;

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

function escapeHtmlAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getBlogs() {
  const blogsPath = path.join(__dirname, '..', 'data', 'blogs.json');
  try {
    if (fs.existsSync(blogsPath)) {
      const data = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.error('Error reading blogs.json:', e.message);
  }
  return [];
}

async function runPrerender() {
  const templatePath = path.resolve(__dirname, '../dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html does not exist. Run vite build first.');
    return;
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  const ssrBundlePath = path.resolve(__dirname, '../dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('dist-ssr/entry-server.js does not exist. Run vite build --ssr first.');
    return;
  }

  const { render } = await import('file:///' + ssrBundlePath.replace(/\\/g, '/'));

  // Load seoData from source or bundled module
  let seoRoutes = {};
  let defaultSeo = {};
  let seoModule = {};
  try {
    const seoDataPath = path.resolve(__dirname, '../src/data/seoData.js');
    // We can parse or import seoData from ssr module if exported, or import directly
    seoModule = await import('file:///' + seoDataPath.replace(/\\/g, '/'));
    seoRoutes = seoModule.seoRoutes || {};
    defaultSeo = seoModule.defaultSeo || {};
  } catch (e) {
    console.warn('Could not load seoData directly:', e.message);
  }

  const staticRoutes = [
    '/',
    '/crm-lead-management',
    '/hrms-payroll',
    '/finance-accounting',
    '/inventory-management',
    '/e-commerce-erp',
    '/manufacturing-erp',
    '/retail-erp',
    '/distribution-erp',
    '/education-erp',
    '/real-estate-erp',
    '/biometric-attendance-management',
    '/biometric-attendance',
    '/project-management',
    '/service-management',
    '/service-business-erp',
    '/healthcare-erp',
    '/pricing',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/blog'
  ];

  const blogs = getBlogs();
  const publishedBlogs = blogs.filter(b => !b.status || b.status === 'Published');

  const allRoutes = [...staticRoutes];
  const blogRouteMap = new Map();

  for (const b of publishedBlogs) {
    const slug = b.slug || slugify(b.title) || b.id || b._id;
    if (slug) {
      const blogPath = `/blog/${slug}`;
      allRoutes.push(blogPath);
      blogRouteMap.set(blogPath, b);
    }
  }

  console.log(`Prerendering ${allRoutes.length} routes...`);

  for (const route of allRoutes) {
    try {
      const appHtml = render(route);
      const normalizedPath = (!route || route === '/') ? '/' : route.replace(/\/$/, '');
      const pageUrl = `${BASE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;

      let title = defaultSeo.title || 'Vellko ERP - All-in-One Cloud ERP Software for Growing Businesses';
      let description = defaultSeo.description || 'Vellko ERP unifies CRM, HRMS, Payroll, Accounting, Inventory, Projects, and Production into a single smart platform.';
      let keywords = defaultSeo.keywords || 'ERP software, cloud ERP, CRM software, HRMS payroll, inventory management';
      let image = DEFAULT_IMAGE;
      let schema = defaultSeo.schema || null;
      let ogTitle = title;
      let ogDesc = description;
      let ogImg = image;
      let twitterTitle = title;
      let twitterDesc = description;
      let twitterImg = image;
      let twitterCard = 'summary_large_image';
      let currentBlog = null;

      if (seoRoutes[normalizedPath]) {
        const entry = seoRoutes[normalizedPath];
        if (entry.title) title = entry.title;
        if (entry.description) description = entry.description;
        if (entry.keywords) keywords = entry.keywords;
        if (entry.image) image = entry.image;
        if (entry.schema) schema = entry.schema;
        ogTitle = title;
        ogDesc = description;
        ogImg = image;
        twitterTitle = title;
        twitterDesc = description;
        twitterImg = image;
      } else if (blogRouteMap.has(normalizedPath)) {
        currentBlog = blogRouteMap.get(normalizedPath);
        if (seoModule.generateBlogSeo) {
          const blogSeo = seoModule.generateBlogSeo(currentBlog, normalizedPath);
          title = blogSeo.title;
          description = blogSeo.description;
          keywords = blogSeo.keywords;
          image = blogSeo.image;
          ogTitle = blogSeo.ogTitle;
          ogDesc = blogSeo.ogDescription;
          ogImg = blogSeo.ogImage;
          twitterTitle = blogSeo.twitterTitle;
          twitterDesc = blogSeo.twitterDescription;
          twitterImg = blogSeo.twitterImage;
          twitterCard = blogSeo.twitterCard;
          schema = {
            "@context": "https://schema.org",
            "@graph": blogSeo.schema
          };
        } else {
          title = currentBlog.seoTitle || currentBlog.title || `${normalizedPath.replace('/blog/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Vellko ERP Blog`;
          description = currentBlog.metaDesc || (currentBlog.excerpt ? currentBlog.excerpt.replace(/<[^>]+>/g, '').substring(0, 160) : '') || `Read insightful ERP analysis on the Vellko ERP blog.`;
          keywords = currentBlog.focusKeyword || 'ERP blog, business management, cloud ERP insights';
          image = currentBlog.image ? (currentBlog.image.startsWith('http') ? currentBlog.image : `${BASE_URL}${currentBlog.image}`) : DEFAULT_IMAGE;
          ogTitle = currentBlog.ogTitle || title;
          ogDesc = currentBlog.ogDesc || description;
          ogImg = currentBlog.ogImg || image;
          twitterTitle = currentBlog.twitterTitle || title;
          twitterDesc = currentBlog.twitterDesc || description;
          twitterImg = image;
          schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": currentBlog.title || title,
            "image": image,
            "datePublished": currentBlog.createdAt || currentBlog.date,
            "url": pageUrl
          };
        }
      }

      // Convert schema to string
      let schemaScript = '';
      if (schema) {
        if (typeof schema === 'string') {
          const cleaned = schema.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '').trim();
          schemaScript = `<script type="application/ld+json" id="seo-schema">\n${cleaned}\n</script>`;
        } else {
          schemaScript = `<script type="application/ld+json" id="seo-schema">\n${JSON.stringify(schema, null, 2)}\n</script>`;
        }
      }

      // Build complete HTML for this page
      let pageHtml = template;

      // 1. Replace Title
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/is, `<title>${escapeHtmlAttr(title)}</title>`);

      // 2. Replace Meta Description
      pageHtml = pageHtml.replace(/<meta name="description" content=".*?"\s*\/?>/is, `<meta name="description" content="${escapeHtmlAttr(description)}" />`);

      // 3. Replace Meta Keywords
      if (pageHtml.includes('<meta name="keywords"')) {
        pageHtml = pageHtml.replace(/<meta name="keywords" content=".*?"\s*\/?>/is, `<meta name="keywords" content="${escapeHtmlAttr(keywords)}" />`);
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta name="keywords" content="${escapeHtmlAttr(keywords)}" />\n</head>`);
      }

      // 4. Replace Canonical Link
      pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/is, `<link rel="canonical" href="${pageUrl}" />`);

      // 5. Replace Hreflang Links
      pageHtml = pageHtml.replace(/<link rel="alternate" hreflang="en" href=".*?"\s*\/?>/is, `<link rel="alternate" hreflang="en" href="${pageUrl}" />`);
      pageHtml = pageHtml.replace(/<link rel="alternate" hreflang="x-default" href=".*?"\s*\/?>/is, `<link rel="alternate" hreflang="x-default" href="${pageUrl}" />`);

      // 6. Replace OpenGraph Tags
      pageHtml = pageHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/is, `<meta property="og:title" content="${escapeHtmlAttr(ogTitle)}" />`);
      pageHtml = pageHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/is, `<meta property="og:description" content="${escapeHtmlAttr(ogDesc)}" />`);
      pageHtml = pageHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/is, `<meta property="og:url" content="${pageUrl}" />`);
      pageHtml = pageHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/is, `<meta property="og:image" content="${escapeHtmlAttr(ogImg)}" />`);
      if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
        pageHtml = pageHtml.replace(/<meta property="og:type" content=".*?"\s*\/?>/is, `<meta property="og:type" content="article" />`);
      }

      // 7. Replace Twitter Card Tags
      pageHtml = pageHtml.replace(/<meta name="twitter:card" content=".*?"\s*\/?>/is, `<meta name="twitter:card" content="${escapeHtmlAttr(twitterCard)}" />`);
      pageHtml = pageHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/is, `<meta name="twitter:title" content="${escapeHtmlAttr(twitterTitle)}" />`);
      pageHtml = pageHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/is, `<meta name="twitter:description" content="${escapeHtmlAttr(twitterDesc)}" />`);
      pageHtml = pageHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/is, `<meta name="twitter:image" content="${escapeHtmlAttr(twitterImg)}" />`);

      // 8. Replace / Inject JSON-LD Schema
      if (schemaScript) {
        if (pageHtml.includes('id="seo-schema"')) {
          pageHtml = pageHtml.replace(/<script type="application\/ld\+json" id="seo-schema">.*?<\/script>/is, schemaScript);
        } else {
          pageHtml = pageHtml.replace('</head>', `  ${schemaScript}\n</head>`);
        }
      }

      // 8b. For blog detail routes, inject initial blog JSON state before </head>
      if (currentBlog) {
        const blogStateScript = `<script>window.__INITIAL_BLOG__ = ${JSON.stringify(currentBlog).replace(/</g, '\\u003c')};</script>\n`;
        pageHtml = pageHtml.replace('</head>', `  ${blogStateScript}</head>`);
      }

      // 9. Inject Pre-rendered App Content into <div id="root">
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 10. Write to target disk locations
      if (route === '/') {
        fs.writeFileSync(templatePath, pageHtml, 'utf8');
      } else {
        const cleanRoute = route.replace(/^\//, '');
        
        // Write file: dist/<route>.html (e.g. dist/crm-lead-management.html or dist/blog/slug.html)
        const directHtmlPath = path.resolve(__dirname, `../dist/${cleanRoute}.html`);
        const directHtmlDir = path.dirname(directHtmlPath);
        if (!fs.existsSync(directHtmlDir)) fs.mkdirSync(directHtmlDir, { recursive: true });
        fs.writeFileSync(directHtmlPath, pageHtml, 'utf8');

        // For blog root, also ensure dist/blog/index.html is created so web servers serving the physical directory get the fresh page
        if (cleanRoute === 'blog') {
          const blogDir = path.resolve(__dirname, '../dist/blog');
          if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
          fs.writeFileSync(path.join(blogDir, 'index.html'), pageHtml, 'utf8');
        }

        // Remove legacy directory if it exists to avoid web servers (Apache/LiteSpeed) issuing 301 trailing slash redirects
        const legacyDirPath = path.resolve(__dirname, `../dist/${cleanRoute}`);
        if (fs.existsSync(legacyDirPath) && fs.statSync(legacyDirPath).isDirectory() && cleanRoute !== 'blog') {
          try {
            fs.rmSync(legacyDirPath, { recursive: true, force: true });
          } catch (rmErr) {
            console.warn(`Could not remove legacy directory ${legacyDirPath}:`, rmErr.message);
          }
        }
      }

      console.log(`✓ Prerendered ${route} (${pageHtml.length} bytes)`);
    } catch (err) {
      console.error(`✗ Error prerendering ${route}:`, err.message);
    }
  }

  // Ensure .htaccess is in dist
  try {
    const publicHtaccess = path.resolve(__dirname, '../public/.htaccess');
    const distHtaccess = path.resolve(__dirname, '../dist/.htaccess');
    if (fs.existsSync(publicHtaccess)) {
      const htContent = fs.readFileSync(publicHtaccess, 'utf8');
      fs.writeFileSync(distHtaccess, htContent, 'utf8');
      console.log('✓ Copied .htaccess to dist/.htaccess');
    }
  } catch (htErr) {
    console.warn('Could not copy .htaccess:', htErr.message);
  }

  console.log('Prerendering complete!');
}

if (require.main === module) {
  runPrerender().catch(console.error);
}

module.exports = { runPrerender };
