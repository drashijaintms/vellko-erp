const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure public/uploads folder exists
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper to get original filename or append incrementing index if file already exists
function getAvailableFilename(dir, originalname) {
  const ext = path.extname(originalname).toLowerCase() || '.jpg';
  const base = path.basename(originalname, ext)
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'image';

  let candidate = `${base}${ext}`;
  let counter = 1;

  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${base}-${counter}${ext}`;
    counter++;
  }

  return candidate;
}

// Multer Storage Configuration - keeps exact filename, appends -1, -2 if duplicate
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = getAvailableFilename(uploadDir, file.originalname);
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploads folder statically
app.use('/uploads', express.static(uploadDir));

// Helper to save base64 image strings to real disk files
function saveBase64ToDisk(base64String, preferredName = 'blog-image') {
  if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:image/')) {
    return base64String;
  }
  try {
    const matches = base64String.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return base64String;
    
    let ext = matches[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext.includes('svg')) ext = 'svg';
    
    const filename = getAvailableFilename(uploadDir, `${preferredName}.${ext}`);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(matches[2], 'base64');
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (err) {
    console.error('Error saving base64 to disk:', err);
    return base64String;
  }
}

let pool;

// Guard middleware: return 503 if DB pool isn't ready yet
app.use('/api', (req, res, next) => {
  if (!pool) {
    return res.status(503).json({ message: 'Database not connected. MySQL may be offline.', error: 'POOL_NOT_INITIALIZED' });
  }
  next();
});

// Initialize MySQL Connection and Table Schema
async function initDB() {
  try {
    // 1. First connect without selecting database to ensure DB exists
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    const dbName = process.env.DB_NAME || 'vellko_erp';
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await tempConnection.end();

    // 2. Connect with pool selecting the database
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log(`Connected to MySQL database: ${dbName}`);

    // 3. Create table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        readTime VARCHAR(50) DEFAULT '3 Mins Read',
        excerpt TEXT,
        date VARCHAR(50),
        status ENUM('Draft', 'Published') DEFAULT 'Published',
        isFeatured BOOLEAN DEFAULT false,
        image LONGTEXT,
        imageAlt VARCHAR(255),
        views INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await pool.query(createTableQuery);

    // Ensure image, imageAlt, and views columns exist if table was already created
    try {
      await pool.query("ALTER TABLE blogs ADD COLUMN image LONGTEXT;");
    } catch (e) { /* already exists */ }
    try {
      await pool.query("ALTER TABLE blogs ADD COLUMN imageAlt VARCHAR(255);");
    } catch (e) { /* already exists */ }
    try {
      await pool.query("ALTER TABLE blogs ADD COLUMN views INT DEFAULT 0;");
    } catch (e) { /* already exists */ }

    console.log('Blogs database table schema verified/created successfully');

    // Helper to save base64 image strings to real disk files
    function saveBase64ToDisk(base64String) {
      if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:image/')) {
        return base64String;
      }
      try {
        const matches = base64String.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) return base64String;
        
        let ext = matches[1].toLowerCase();
        if (ext === 'jpeg') ext = 'jpg';
        if (ext.includes('svg')) ext = 'svg';
        
        const filename = `blog-img-${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
        const filePath = path.join(uploadDir, filename);
        const buffer = Buffer.from(matches[2], 'base64');
        fs.writeFileSync(filePath, buffer);
        return `/uploads/${filename}`;
      } catch (err) {
        console.error('Error saving base64 to disk:', err);
        return base64String;
      }
    }

    // Auto-migrate any existing base64 images in database to disk files
    try {
      const [allBlogs] = await pool.query("SELECT id, image FROM blogs WHERE image LIKE 'data:%'");
      for (const b of allBlogs) {
        const diskPath = saveBase64ToDisk(b.image);
        if (diskPath !== b.image) {
          await pool.query('UPDATE blogs SET image = ? WHERE id = ?', [diskPath, b.id]);
        }
      }
      if (allBlogs.length > 0) {
        console.log(`Migrated ${allBlogs.length} base64 images to clean /uploads/ files.`);
      }
    } catch (migErr) {
      console.error('Error during image migration:', migErr);
    }


    // 4. Create contact_inquiries table if not exists
    const createInquiriesTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(150) NOT NULL,
        workEmail VARCHAR(150) NOT NULL,
        phoneNumber VARCHAR(50),
        companyName VARCHAR(150),
        jobTitle VARCHAR(100),
        companySize VARCHAR(50),
        requirements TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await pool.query(createInquiriesTableQuery);
    // 5. Ensure the rich Table-of-Contents test blog exists
    const testBlogTitle = 'Complete Guide to Enterprise ERP Implementation: Strategies, Architecture and ROI in 2026';
    const [existingTestBlog] = await pool.query('SELECT id FROM blogs WHERE title = ?', [testBlogTitle]);
    if (existingTestBlog.length === 0) {
      const fullContent = [
        '<p>Modern enterprises operate in increasingly fast-paced environments where fragmented data, siloed communication, and manual reporting significantly slow down decision-making. Adopting a unified Enterprise Resource Planning (ERP) platform is no longer optional—it is the foundational operating system of high-growth businesses.</p>',
        '<p>In this comprehensive guide, we unpack the proven methodologies, architectural choices, and practical frameworks required to successfully deploy an enterprise ERP system with maximum ROI.</p>',
        '<h2>1. Understanding Enterprise ERP in the Modern Era</h2>',
        '<p>At its core, an ERP platform integrates key business operations into a single source of truth. From supply chain and procurement to financial ledger management and HR payroll, centralized operations eliminate redundant data entry and costly communication gaps.</p>',
        '<h3>1.1 Core Modules and Workflow Synergy</h3>',
        '<p>A comprehensive ERP solution typically connects the following critical pillars:</p>',
        '<ul>',
        '<li><strong>Financial Accounting & Compliance:</strong> Real-time general ledger tracking, automated GST invoice generation, and bank reconciliations.</li>',
        '<li><strong>Inventory & Multi-Warehouse Tracking:</strong> Live stock movement alerts, batch/serial tracking, and automated reorder points.</li>',
        '<li><strong>Automated Call & CRM Integration:</strong> Automatic call recording import, transcript generation, and direct attachment to client accounts.</li>',
        '<li><strong>Human Resource & Payroll (HRMS):</strong> Biometric time-tracking, leave management, and one-click salary disbursement.</li>',
        '</ul>',
        '<h3>1.2 Cloud Architecture vs Legacy On-Premise</h3>',
        '<p>Traditional on-premise ERP software demanded expensive local servers, dedicated IT maintenance staff, and complex manual updates. In contrast, modern cloud ERP platforms provide 99.99% uptime, end-to-end TLS encryption, seamless remote access across devices, and instant automatic updates without downtime.</p>',
        '<div class="cta-style-2" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:28px 0; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">',
        '<div style="flex:1; min-width:260px;">',
        '<h4 style="color:#1e293b; margin:0 0 6px 0; font-size:1.15rem; font-weight:700;">Ready to Transform Your Enterprise Operations?</h4>',
        '<p style="color:#64748b; margin:0; line-height:1.6; font-size:0.95rem;">Experience live demo access to Vellko ERP modules customized for your industry workflows.</p>',
        '</div>',
        '<a href="/contact" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#DC1436; color:#ffffff; padding:10px 24px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.88rem; letter-spacing:0.04em; text-transform:uppercase; box-shadow:0 2px 8px rgba(220,20,54,0.35);">Schedule Live Demo</a>',
        '</div>',
        '<h2>2. Essential Phases for Successful ERP Implementation</h2>',
        '<p>According to industry research, over 50% of ERP implementation friction occurs due to poor change management rather than software limitations. Following a structured multi-phase deployment roadmap ensures smooth adoption.</p>',
        '<h3>2.1 Requirement Gathering and Gap Analysis</h3>',
        '<p>Begin by mapping every team daily manual processes. Document standard operating procedures (SOPs), identify bottlenecks, and define key performance indicators (KPIs) such as order fulfillment speed and billing accuracy.</p>',
        '<h3>2.2 Data Cleansing and Migration</h3>',
        '<p>Before importing legacy data into the new ERP, perform thorough data hygiene. Eliminate duplicate vendor contacts, archive obsolete inventory SKUs, and verify opening ledger balances.</p>',
        '<h3>2.3 User Training and Role-Based Onboarding</h3>',
        '<p>Provide tailored, interactive training sessions for each department. Warehouse managers require barcode scanning workflows, while finance controllers need automated reconciliation dashboards.</p>',
        '<h2>3. Calculating Real-World ERP ROI and Business Impact</h2>',
        '<p>Investing in enterprise ERP generates direct financial return across multiple business functions:</p>',
        '<ul>',
        '<li><strong>30–45% Reduction in Administrative Overhead:</strong> Automated invoicing and reporting eliminates hours of manual data entry each week.</li>',
        '<li><strong>20% Improvement in Inventory Turnover:</strong> Accurate demand forecasting prevents stockouts and over-purchasing.</li>',
        '<li><strong>99.8% Billing & Tax Compliance Accuracy:</strong> Built-in tax engines eliminate costly calculation errors and penalty risks.</li>',
        '</ul>',
        '<div class="cta-style-1" style="display:flex; align-items:flex-start; gap:16px; background:#fff1f2; border-left:4px solid #DC1436; border-radius:0 12px 12px 0; padding:20px 24px; margin:28px 0; box-shadow:0 2px 5px rgba(220,20,54,0.04);">',
        '<div style="flex-shrink:0; width:44px; height:44px; border-radius:50%; background:#ffe4e6; display:flex; align-items:center; justify-content:center; font-size:20px; color:#DC1436;">💼</div>',
        '<div style="flex:1;">',
        '<h4 style="color:#881337; margin:0 0 6px 0; font-size:1.1rem; font-weight:700;">Executive Strategy Tip</h4>',
        '<p style="color:#475569; margin:0; font-style:italic; line-height:1.6; font-size:0.95rem;">Appoint a dedicated internal project champion to lead departmental communication and ensure alignment between software milestones and business targets.</p>',
        '</div>',
        '</div>',
        '<h2>4. Frequently Asked Questions</h2>',
        '<details class="vellko-faq-accordion" style="background:#ffffff; border:1px solid #fecdd3; border-left:4px solid #DC1436; border-radius:8px 12px 12px 8px; margin:18px 0; overflow:hidden; box-shadow:0 1px 3px rgba(220,20,54,0.04);">',
        '<summary style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; font-weight:700; color:#881337; font-size:1.02rem; list-style:none; user-select:none;">',
        '<span style="display:flex; align-items:center; gap:10px;">',
        '<span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; background:#ffe4e6; color:#DC1436; font-size:0.78rem; font-weight:800;">Q</span>',
        '<span>How long does a typical ERP deployment take with Vellko?</span>',
        '</span>',
        '<span class="faq-chevron" style="color:#DC1436; font-size:1.15rem; transition:transform 0.2s ease;">▾</span>',
        '</summary>',
        '<div style="padding:10px 20px 16px 54px; color:#475569; line-height:1.65; font-size:0.95rem; border-top:1px dashed #ffe4e6;">',
        '<p style="margin:0;">Standard cloud deployment for small to mid-sized enterprises typically takes 2 to 4 weeks, including data migration and team training. Complex multi-branch setups take between 6 to 8 weeks.</p>',
        '</div>',
        '</details>',
        '<details class="vellko-faq-accordion" style="background:#ffffff; border:1px solid #fecdd3; border-left:4px solid #DC1436; border-radius:8px 12px 12px 8px; margin:18px 0; overflow:hidden; box-shadow:0 1px 3px rgba(220,20,54,0.04);">',
        '<summary style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; font-weight:700; color:#881337; font-size:1.02rem; list-style:none; user-select:none;">',
        '<span style="display:flex; align-items:center; gap:10px;">',
        '<span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; background:#ffe4e6; color:#DC1436; font-size:0.78rem; font-weight:800;">Q</span>',
        '<span>Can our existing CRM and call recording audio files be linked automatically?</span>',
        '</span>',
        '<span class="faq-chevron" style="color:#DC1436; font-size:1.15rem; transition:transform 0.2s ease;">▾</span>',
        '</summary>',
        '<div style="padding:10px 20px 16px 54px; color:#475569; line-height:1.65; font-size:0.95rem; border-top:1px dashed #ffe4e6;">',
        '<p style="margin:0;">Yes. Vellko ERP features native call logging and transcription integrations that automatically link incoming/outgoing audio records and transcripts directly to customer contact cards.</p>',
        '</div>',
        '</details>'
      ].join('\n');

      await pool.query(
        'INSERT INTO blogs (title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          testBlogTitle,
          'ERP Modules',
          '6 Mins Read',
          fullContent,
          'Aug 26, 2026',
          'Published',
          1,
          '/uploads/26522da9c38d01c3c08e1e82de48bd12c96f8c56.jpg',
          'Enterprise ERP Implementation Strategy 2026'
        ]
      );
      console.log('Seeded complete Table-of-Contents rich test blog post into MySQL.');
    }
  } catch (error) {
    console.error('MySQL Database Initialization Error:', error);
  }
}

// REST API Endpoints

// 0. POST /api/upload - Handle file upload and return public URL path
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// 0b. GET /api/uploads - List all uploaded images
app.get('/api/uploads', (req, res) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return res.json([]);
    }
    const files = fs.readdirSync(uploadDir);
    const images = files
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map(f => {
        const stats = fs.statSync(path.join(uploadDir, f));
        return {
          filename: f,
          url: `/uploads/${f}`,
          createdAt: stats.mtime
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error listing uploaded images', error: error.message });
  }
});

// 1. GET /api/blogs - Fetch blogs based on filters
app.get('/api/blogs', async (req, res) => {
  try {
    const { status, category, isFeatured, q } = req.query;
    let sql = 'SELECT * FROM blogs WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (isFeatured !== undefined) {
      sql += ' AND isFeatured = ?';
      params.push(isFeatured === 'true' ? 1 : 0);
    }
    if (q) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }

    sql += ' ORDER BY createdAt DESC';

    const [rows] = await pool.query(sql, params);
    
    // Map 'id' to '_id' and format booleans for frontend compatibility
    const formattedBlogs = rows.map(row => ({
      ...row,
      _id: row.id.toString(),
      views: Number(row.views) || 0,
      isFeatured: !!row.isFeatured
    }));

    res.json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs from MySQL', error: error.message });
  }
});

// 2. POST /api/blogs/:id/view - Increment blog views by 1 when URL is visited
app.post('/api/blogs/:id/view', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE blogs SET views = COALESCE(views, 0) + 1 WHERE id = ?', [id]);
    const [rows] = await pool.query('SELECT id, views FROM blogs WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ success: true, views: rows[0].views });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing views', error: error.message });
  }
});

// 3. POST /api/blogs - Create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt } = req.body;
    const cleanImage = image ? saveBase64ToDisk(image) : null;
    const sql = `
      INSERT INTO blogs (title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt, views)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;
    
    const displayDate = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const [result] = await pool.query(sql, [
      title,
      category,
      readTime || '3 Mins Read',
      excerpt || '',
      displayDate,
      status || 'Published',
      isFeatured ? 1 : 0,
      cleanImage,
      imageAlt || null
    ]);

    const newBlog = {
      _id: result.insertId.toString(),
      id: result.insertId,
      title,
      category,
      readTime: readTime || '3 Mins Read',
      excerpt: excerpt || '',
      date: displayDate,
      status: status || 'Published',
      isFeatured: !!isFeatured,
      image: cleanImage,
      imageAlt: imageAlt || null,
      views: 0
    };

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog in MySQL', error: error.message });
  }
});

// 3. PUT /api/blogs/:id - Update an existing blog
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [];
    const params = [];
    
    const allowedFields = ['title', 'category', 'readTime', 'excerpt', 'date', 'status', 'isFeatured', 'image', 'imageAlt'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fields.push(`\`${field}\` = ?`);
        if (field === 'isFeatured') {
          params.push(req.body[field] ? 1 : 0);
        } else if (field === 'image') {
          params.push(req.body[field] ? saveBase64ToDisk(req.body[field]) : null);
        } else {
          params.push(req.body[field]);
        }
      }
    });

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(id);
    const sql = `UPDATE blogs SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Fetch and return the updated row
    const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);
    res.json({
      ...rows[0],
      _id: rows[0].id.toString(),
      isFeatured: !!rows[0].isFeatured
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog in MySQL', error: error.message });
  }
});

// 4. DELETE /api/blogs/:id - Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully from MySQL', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog from MySQL', error: error.message });
  }
});

// 5. POST /api/blogs/seed - Seed default data if database table is empty
app.post('/api/blogs/seed', async (req, res) => {
  try {
    const [countRows] = await pool.query('SELECT COUNT(*) as count FROM blogs');
    const count = countRows[0].count;
    
    if (count > 0) {
      return res.json({ message: 'Database already has blogs. Seeding skipped.', count });
    }

    const defaultBlogs = [
      // 1. Featured Blog
      {
        title: "Vellko ERP now imports and transcribes your call recordings automatically",
        category: "Vellko Call Recording",
        readTime: "4 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: true
      },
      // 2. Secondary list blogs
      {
        title: "How ERP Modules help coordinate retail workflows",
        category: "ERP Modules",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "Introducing Vellko ERP for manufacturing business optimization",
        category: "ERP Modules",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "Healthcare compliance and digital record keeping in 2026",
        category: "ERP Modules",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "10 reasons to migrate inventory management to cloud ERP",
        category: "ERP Modules",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      // 3. Latest blogs grid
      {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        category: "ERP eCommerce",
        readTime: "6 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        category: "ERP Manufacturing",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        category: "ERP Real Estate",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      },
      {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        category: "ERP Healthcare",
        readTime: "3 Mins Read",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
        date: "Aug 5, 2026",
        status: "Published",
        isFeatured: false
      }
    ];

    for (const blog of defaultBlogs) {
      await pool.query(
        'INSERT INTO blogs (title, category, readTime, excerpt, date, status, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [blog.title, blog.category, blog.readTime, blog.excerpt, blog.date, blog.status, blog.isFeatured ? 1 : 0]
      );
    }

    res.json({ message: 'Seeded default blogs successfully to MySQL', count: defaultBlogs.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding MySQL database', error: error.message });
  }
});

// 6. POST /api/contact - Save contact inquiries
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, workEmail, phoneNumber, companyName, jobTitle, companySize, requirements } = req.body;
    if (!fullName || !workEmail) {
      return res.status(400).json({ message: 'Full name and email are required.' });
    }
    
    const sql = `
      INSERT INTO contact_inquiries (fullName, workEmail, phoneNumber, companyName, jobTitle, companySize, requirements)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [
      fullName,
      workEmail,
      phoneNumber || '',
      companyName || '',
      jobTitle || '',
      companySize || '1-10 employees',
      requirements || ''
    ]);
    
    res.status(201).json({ message: 'Inquiry saved successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact inquiry to MySQL', error: error.message });
  }
});

// 7. GET /api/contact - Fetch all contact inquiries (For Admin Dashboard)
app.get('/api/contact', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_inquiries ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact inquiries from MySQL', error: error.message });
  }
});

// 8. DELETE /api/contact/:id - Delete a contact inquiry
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully from MySQL', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry from MySQL', error: error.message });
  }
});

// Start Server after database is initialized
initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Backend server is running on port ' + PORT);
  });
});
