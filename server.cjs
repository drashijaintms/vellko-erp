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
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await pool.query(createTableQuery);

    // Ensure image and imageAlt columns exist if table was already created
    try {
      await pool.query("ALTER TABLE blogs ADD COLUMN image LONGTEXT;");
    } catch (e) { /* already exists */ }
    try {
      await pool.query("ALTER TABLE blogs ADD COLUMN imageAlt VARCHAR(255);");
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
    console.log('Contact inquiries database table schema verified/created successfully');
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
      isFeatured: !!row.isFeatured
    }));

    res.json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs from MySQL', error: error.message });
  }
});

// 2. POST /api/blogs - Create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt } = req.body;
    const cleanImage = image ? saveBase64ToDisk(image) : null;
    const sql = `
      INSERT INTO blogs (title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      imageAlt: imageAlt || null
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
