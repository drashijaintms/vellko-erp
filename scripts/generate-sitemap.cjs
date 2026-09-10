const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vellkoerp.com';

const staticSections = [
  {
    comment: 'Homepage',
    urls: [
      { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' }
    ]
  },
  {
    comment: 'Company Pages',
    urls: [
      { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.7' },
      { loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.7' },
      { loc: `${BASE_URL}/pricing`, changefreq: 'monthly', priority: '0.8' }
    ]
  },
  {
    comment: 'ERP Modules',
    urls: [
      { loc: `${BASE_URL}/crm-lead-management`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/ecommerce-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/manufacturing-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/retail-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/distribution-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/education-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/real-estate-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/hrms-payroll`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/biometric-attendance-management`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/inventory-management`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/finance-accounting`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/project-management`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/service-management`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/service-business-erp`, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/healthcare-erp`, changefreq: 'monthly', priority: '0.8' }
    ]
  },
  {
    comment: 'Blog Section',
    urls: [
      { loc: `${BASE_URL}/blog`, changefreq: 'daily', priority: '0.9' }
    ]
  }
];

const legalPages = {
  comment: 'Legal Pages',
  urls: [
    { loc: `${BASE_URL}/terms-and-conditions`, changefreq: 'yearly', priority: '0.3' },
    { loc: `${BASE_URL}/privacy-policy`, changefreq: 'yearly', priority: '0.3' }
  ]
};

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

function getBlogs() {
  const blogsPath = path.join(__dirname, '..', 'data', 'blogs.json');
  try {
    if (fs.existsSync(blogsPath)) {
      const data = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.error('Error reading data/blogs.json for sitemap:', e.message);
  }
  return [];
}

function generateSitemapXml(blogs) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Static Sections
  for (const sec of staticSections) {
    xml += `<!--  ${sec.comment}  -->\n`;
    for (const item of sec.urls) {
      xml += `<url>\n<loc>${item.loc}</loc>\n<changefreq>${item.changefreq}</changefreq>\n<priority>${item.priority}</priority>\n</url>\n`;
    }
  }

  // 2. Published Blog Articles
  const publishedBlogs = (blogs || []).filter(b => !b.status || b.status === 'Published');
  if (publishedBlogs.length > 0) {
    xml += `<!--  Published Blog Articles  -->\n`;
    for (const blog of publishedBlogs) {
      const slug = blog.slug || slugify(blog.title) || blog.id || blog._id;
      if (slug) {
        xml += `<url>\n<loc>${BASE_URL}/blog/${slug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.8</priority>\n</url>\n`;
      }
    }
  }

  // 3. Legal Pages
  xml += `<!--  ${legalPages.comment}  -->\n`;
  for (const item of legalPages.urls) {
    xml += `<url>\n<loc>${item.loc}</loc>\n<changefreq>${item.changefreq}</changefreq>\n<priority>${item.priority}</priority>\n</url>\n`;
  }

  xml += '</urlset>\n';
  return xml;
}

function saveSitemap() {
  const blogs = getBlogs();
  const xml = generateSitemapXml(blogs);

  const targetDirs = [
    path.join(__dirname, '..'),
    path.join(__dirname, '..', 'public'),
    path.join(__dirname, '..', 'dist')
  ];

  for (const dir of targetDirs) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const dest = path.join(dir, 'sitemap.xml');
      fs.writeFileSync(dest, xml, 'utf8');
      console.log(`Updated ${dest}`);
    } catch (err) {
      console.error(`Failed to write sitemap to ${dir}:`, err.message);
    }
  }
}

if (require.main === module) {
  saveSitemap();
}

module.exports = { generateSitemapXml, saveSitemap };
