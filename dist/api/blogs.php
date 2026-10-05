<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- MySQL Database Configuration ---
$dbHost = 'localhost';
$dbPort = '3306';
$dbName = 'qqoophoh_vellko_erp';
$dbUser = 'qqoophoh_vellko_erp';
$dbPass = 'qqoophoh_vellko_erp';

$dataFile = dirname(__DIR__) . '/data/blogs.json';
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$lastDbError = null;

function getPDO() {
    global $dbHost, $dbPort, $dbName, $dbUser, $dbPass, $lastDbError;
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dsnList = [
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        "mysql:host=127.0.0.1;port={$dbPort};dbname={$dbName};charset=utf8mb4",
        "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/var/lib/mysql/mysql.sock;dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/tmp/mysql.sock;dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/var/run/mysqld/mysqld.sock;dbname={$dbName};charset=utf8mb4"
    ];

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    foreach ($dsnList as $dsn) {
        try {
            $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
            if ($pdo) break;
        } catch (Exception $e) {
            $lastDbError = $e->getMessage();
            $pdo = null;
        }
    }

    if (!$pdo) {
        error_log('MySQL connection failed in api/blogs.php: ' . $lastDbError);
        return null;
    }

    try {
        // 1. Ensure table exists with flexible varchar/text columns
        $createTableSql = "CREATE TABLE IF NOT EXISTS blogs (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            _id VARCHAR(64) NULL DEFAULT NULL,
            slug VARCHAR(255) NULL DEFAULT NULL,
            title VARCHAR(500) NULL DEFAULT NULL,
            category VARCHAR(150) NULL DEFAULT NULL,
            readTime VARCHAR(50) DEFAULT '3 Mins Read',
            excerpt LONGTEXT,
            date VARCHAR(50),
            status VARCHAR(50) DEFAULT 'Published',
            isFeatured TINYINT(1) DEFAULT 0,
            image LONGTEXT,
            imageAlt VARCHAR(500),
            seoTitle VARCHAR(500),
            metaDesc LONGTEXT,
            focusKeyword VARCHAR(500),
            ogTitle VARCHAR(500),
            ogDesc LONGTEXT,
            ogImg LONGTEXT,
            twitterTitle VARCHAR(500),
            twitterDesc LONGTEXT,
            twitterCard VARCHAR(100) DEFAULT 'Summary Large Image',
            rawSchema LONGTEXT,
            views INT DEFAULT 0,
            createdAt VARCHAR(50),
            updatedAt VARCHAR(50),
            INDEX idx_status (status),
            INDEX idx_slug (slug),
            INDEX idx_id (_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $pdo->exec($createTableSql);

        // 2. Auto-migrate missing columns for existing pre-created table
        $requiredColumns = [
            '_id' => "VARCHAR(64) NULL DEFAULT NULL",
            'slug' => "VARCHAR(255) NULL DEFAULT NULL",
            'title' => "VARCHAR(500) NULL DEFAULT NULL",
            'category' => "VARCHAR(150) NULL DEFAULT NULL",
            'readTime' => "VARCHAR(50) DEFAULT '3 Mins Read'",
            'excerpt' => "LONGTEXT NULL",
            'date' => "VARCHAR(50) NULL DEFAULT NULL",
            'status' => "VARCHAR(50) DEFAULT 'Published'",
            'isFeatured' => "TINYINT(1) DEFAULT 0",
            'image' => "LONGTEXT NULL",
            'imageAlt' => "VARCHAR(500) NULL DEFAULT NULL",
            'seoTitle' => "VARCHAR(500) NULL DEFAULT NULL",
            'metaDesc' => "LONGTEXT NULL",
            'focusKeyword' => "VARCHAR(500) NULL DEFAULT NULL",
            'ogTitle' => "VARCHAR(500) NULL DEFAULT NULL",
            'ogDesc' => "LONGTEXT NULL",
            'ogImg' => "LONGTEXT NULL",
            'twitterTitle' => "VARCHAR(500) NULL DEFAULT NULL",
            'twitterDesc' => "LONGTEXT NULL",
            'twitterCard' => "VARCHAR(100) DEFAULT 'Summary Large Image'",
            'rawSchema' => "LONGTEXT NULL",
            'views' => "INT DEFAULT 0",
            'createdAt' => "VARCHAR(50) NULL DEFAULT NULL",
            'updatedAt' => "VARCHAR(50) NULL DEFAULT NULL"
        ];

        $existingColsStmt = $pdo->query("SHOW COLUMNS FROM blogs");
        $existingCols = $existingColsStmt->fetchAll(PDO::FETCH_COLUMN, 0);
        $existingColsLower = array_map('strtolower', $existingCols);

        foreach ($requiredColumns as $colName => $colDef) {
            if (!in_array(strtolower($colName), $existingColsLower)) {
                try {
                    $pdo->exec("ALTER TABLE blogs ADD COLUMN `{$colName}` {$colDef}");
                } catch (Exception $colEx) {
                    error_log("Failed to add column {$colName}: " . $colEx->getMessage());
                }
            }
        }

        // Fill any null _id or slug for older rows
        try {
            $pdo->exec("UPDATE blogs SET _id = CAST(id AS CHAR) WHERE _id IS NULL OR _id = ''");
        } catch (Exception $e) {}

        // Auto-seed table from JSON if empty
        $count = (int)$pdo->query("SELECT COUNT(*) FROM blogs")->fetchColumn();
        if ($count === 0) {
            $jsonBlogs = getBlogsFromJson();
            if (!empty($jsonBlogs)) {
                $stmt = $pdo->prepare("INSERT INTO blogs (_id, slug, title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt, seoTitle, metaDesc, focusKeyword, ogTitle, ogDesc, ogImg, twitterTitle, twitterDesc, twitterCard, rawSchema, views, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                foreach ($jsonBlogs as $b) {
                    $title = $b['title'] ?? 'Untitled Article';
                    $slug = $b['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));
                    $stmt->execute([
                        (string)($b['_id'] ?? $b['id'] ?? time() . mt_rand(100, 999)),
                        $slug,
                        $title,
                        $b['category'] ?? 'ERP Modules',
                        $b['readTime'] ?? '3 Mins Read',
                        $b['excerpt'] ?? '',
                        $b['date'] ?? date('M j, Y'),
                        $b['status'] ?? 'Published',
                        !empty($b['isFeatured']) ? 1 : 0,
                        $b['image'] ?? null,
                        $b['imageAlt'] ?? $title,
                        $b['seoTitle'] ?? $title,
                        $b['metaDesc'] ?? '',
                        $b['focusKeyword'] ?? '',
                        $b['ogTitle'] ?? $title,
                        $b['ogDesc'] ?? '',
                        $b['ogImg'] ?? ($b['image'] ?? ''),
                        $b['twitterTitle'] ?? $title,
                        $b['twitterDesc'] ?? '',
                        $b['twitterCard'] ?? 'Summary Large Image',
                        $b['rawSchema'] ?? '',
                        intval($b['views'] ?? 0),
                        $b['createdAt'] ?? date('c'),
                        $b['updatedAt'] ?? date('c')
                    ]);
                }
            }
        }
        return $pdo;
    } catch (Exception $e) {
        $lastDbError = $e->getMessage();
        error_log('MySQL init error in api/blogs.php: ' . $e->getMessage());
        return $pdo; // return pdo anyway if connection succeeded
    }
}

function getBlogsFromJson() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if (is_array($data)) return $data;
    }
    return [];
}

function getBlogs() {
    $pdo = getPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM blogs ORDER BY id DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$r) {
                $r['id'] = (int)$r['id'];
                $r['isFeatured'] = (bool)$r['isFeatured'];
                $r['views'] = (int)$r['views'];
            }
            return $rows;
        } catch (Exception $e) {
            error_log('MySQL select error: ' . $e->getMessage());
        }
    }
    return getBlogsFromJson();
}

function saveBlogsBackup($blogs) {
    global $dataFile;
    $json = json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    @file_put_contents($dataFile, $json);

    $distData = dirname(__DIR__) . '/dist/data/blogs.json';
    if (is_dir(dirname($distData))) {
        @file_put_contents($distData, $json);
    }

    updateSitemap($blogs);
}

function updateSitemap($blogs) {
    $baseUrl = 'https://vellkoerp.com';
    $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

    // 1. Homepage
    $xml .= "<!--  Homepage  -->\n";
    $xml .= "<url>\n<loc>{$baseUrl}/</loc>\n<changefreq>weekly</changefreq>\n<priority>1.0</priority>\n</url>\n";

    // 2. Company Pages
    $xml .= "<!--  Company Pages  -->\n";
    $companyPages = [
        ['path' => '/about', 'freq' => 'monthly', 'prio' => '0.7'],
        ['path' => '/contact', 'freq' => 'monthly', 'prio' => '0.7'],
        ['path' => '/pricing', 'freq' => 'monthly', 'prio' => '0.8']
    ];
    foreach ($companyPages as $cp) {
        $xml .= "<url>\n<loc>{$baseUrl}{$cp['path']}</loc>\n<changefreq>{$cp['freq']}</changefreq>\n<priority>{$cp['prio']}</priority>\n</url>\n";
    }

    // 3. ERP Modules
    $xml .= "<!--  ERP Modules  -->\n";
    $modules = [
        '/crm-lead-management',
        '/e-commerce-erp',
        '/manufacturing-erp',
        '/retail-erp',
        '/distribution-erp',
        '/education-erp',
        '/real-estate-erp',
        '/hrms-payroll',
        '/biometric-attendance-management',
        '/inventory-management',
        '/finance-accounting',
        '/project-management',
        '/service-management',
        '/service-business-erp',
        '/healthcare-erp'
    ];
    foreach ($modules as $mod) {
        $xml .= "<url>\n<loc>{$baseUrl}{$mod}</loc>\n<changefreq>monthly</changefreq>\n<priority>0.8</priority>\n</url>\n";
    }

    // 4. Blog Section
    $xml .= "<!--  Blog Section  -->\n";
    $xml .= "<url>\n<loc>{$baseUrl}/blog</loc>\n<changefreq>daily</changefreq>\n<priority>0.9</priority>\n</url>\n";

    // 5. Published Blog Articles
    $published = array_filter($blogs, function($b) {
        return !isset($b['status']) || $b['status'] === 'Published';
    });

    if (!empty($published)) {
        $xml .= "<!--  Published Blog Articles  -->\n";
        foreach ($published as $b) {
            $slug = '';
            if (!empty($b['slug'])) {
                $slug = $b['slug'];
            } elseif (!empty($b['title'])) {
                $slug = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $b['title']), '-'));
            } else {
                $slug = (string)($b['id'] ?? $b['_id'] ?? '');
            }

            if (!empty($slug)) {
                $xml .= "<url>\n<loc>{$baseUrl}/blog/{$slug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.8</priority>\n</url>\n";
            }
        }
    }

    // 6. Legal Pages
    $xml .= "<!--  Legal Pages  -->\n";
    $legals = [
        ['path' => '/terms-and-conditions', 'freq' => 'yearly', 'prio' => '0.3'],
        ['path' => '/privacy-policy', 'freq' => 'yearly', 'prio' => '0.3']
    ];
    foreach ($legals as $lp) {
        $xml .= "<url>\n<loc>{$baseUrl}{$lp['path']}</loc>\n<changefreq>{$lp['freq']}</changefreq>\n<priority>{$lp['prio']}</priority>\n</url>\n";
    }

    $xml .= "</urlset>\n";

    $paths = [
        dirname(__DIR__, 2) . '/sitemap.xml',
        dirname(__DIR__) . '/sitemap.xml',
        dirname(__DIR__, 2) . '/public/sitemap.xml',
        dirname(__DIR__, 2) . '/dist/sitemap.xml'
    ];
    foreach ($paths as $p) {
        $dir = dirname($p);
        if (is_dir($dir)) {
            @file_put_contents($p, $xml);
        }
    }
}

// Convert base64 images inside HTML content or image fields to SEO files on disk
function extractAndSaveBase64Images($content, $blogTitle = 'blog') {
    $uploadDir = dirname(__DIR__) . '/uploads/';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }

    $cleanTitle = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $blogTitle), '-'));
    if (empty($cleanTitle)) $cleanTitle = 'blog-image';

    $pattern = '/data:image\/([a-zA-Z0-9+]+);base64,([a-zA-Z0-9+\/=\r\n]+)/';
    
    $counter = 1;
    $updated = preg_replace_callback($pattern, function($matches) use ($uploadDir, $cleanTitle, &$counter) {
        $ext = strtolower($matches[1]);
        if ($ext === 'jpeg') $ext = 'jpg';
        if (strpos($ext, 'svg') !== false) $ext = 'svg';

        $rawBase64 = str_replace(["\r", "\n", ' '], '', $matches[2]);
        $binary = base64_decode($rawBase64);
        if (!$binary) return $matches[0];

        $filename = "{$cleanTitle}-{$counter}-" . time() . ".{$ext}";
        $counter++;

        file_put_contents($uploadDir . $filename, $binary);

        $distUploadDir = dirname(__DIR__) . '/dist/uploads/';
        if (is_dir(dirname(__DIR__) . '/dist')) {
            if (!is_dir($distUploadDir)) @mkdir($distUploadDir, 0755, true);
            @file_put_contents($distUploadDir . $filename, $binary);
        }

        return "/uploads/{$filename}";
    }, $content);

    return $updated;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

// 0. Diagnostic status route: /api/blogs/status or ?action=status
if ($path === 'status' || (isset($_GET['action']) && $_GET['action'] === 'status')) {
    $pdo = getPDO();
    $cols = [];
    if ($pdo) {
        try {
            $cols = $pdo->query("SHOW COLUMNS FROM blogs")->fetchAll(PDO::FETCH_COLUMN, 0);
        } catch (Exception $e) {}
    }
    $statusData = [
        'database_configured' => true,
        'database_connected' => ($pdo !== null),
        'columns' => $cols,
        'last_error' => $lastDbError,
        'driver' => $pdo ? $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) : null,
        'server_version' => $pdo ? $pdo->getAttribute(PDO::ATTR_SERVER_VERSION) : null,
        'total_blogs' => 0
    ];
    if ($pdo) {
        try {
            $statusData['total_blogs'] = (int)$pdo->query("SELECT COUNT(*) FROM blogs")->fetchColumn();
        } catch (Exception $e) {
            $statusData['query_error'] = $e->getMessage();
        }
    } else {
        $statusData['total_blogs'] = count(getBlogsFromJson());
    }
    echo json_encode($statusData, JSON_PRETTY_PRINT);
    exit;
}

// 1. GET /api/blogs or /api/blogs/:id
if ($method === 'GET') {
    $pdo = getPDO();
    if (!empty($path)) {
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE _id = ? OR id = ? OR slug = ? LIMIT 1");
            $stmt->execute([$path, $path, $path]);
            $single = $stmt->fetch();
            if ($single) {
                $single['id'] = (int)$single['id'];
                $single['isFeatured'] = (bool)$single['isFeatured'];
                $single['views'] = (int)$single['views'];
                echo json_encode($single);
                exit;
            }
        } else {
            $blogs = getBlogs();
            foreach ($blogs as $b) {
                if ((isset($b['id']) && (string)$b['id'] === $path) || (isset($b['_id']) && (string)$b['_id'] === $path) || (isset($b['slug']) && $b['slug'] === $path)) {
                    echo json_encode($b);
                    exit;
                }
            }
        }
        http_response_code(404);
        echo json_encode(['message' => 'Blog not found']);
        exit;
    }

    // List Blogs with Filters
    $status = $_GET['status'] ?? null;
    $category = $_GET['category'] ?? null;
    $isFeatured = isset($_GET['isFeatured']) ? filter_var($_GET['isFeatured'], FILTER_VALIDATE_BOOLEAN) : null;

    if ($pdo) {
        $sql = "SELECT * FROM blogs WHERE 1=1";
        $params = [];
        if ($status) {
            $sql .= " AND status = ?";
            $params[] = $status;
        }
        if ($category) {
            $sql .= " AND category = ?";
            $params[] = $category;
        }
        if ($isFeatured !== null) {
            $sql .= " AND isFeatured = ?";
            $params[] = $isFeatured ? 1 : 0;
        }
        $sql .= " ORDER BY id DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['id'] = (int)$r['id'];
            $r['isFeatured'] = (bool)$r['isFeatured'];
            $r['views'] = (int)$r['views'];
        }
        echo json_encode($rows);
        exit;
    }

    $blogs = getBlogs();
    $filtered = array_values(array_filter($blogs, function($b) use ($status, $category, $isFeatured) {
        if ($status && (!isset($b['status']) || $b['status'] !== $status)) return false;
        if ($category && (!isset($b['category']) || $b['category'] !== $category)) return false;
        if ($isFeatured !== null && (!isset($b['isFeatured']) || (bool)$b['isFeatured'] !== $isFeatured)) return false;
        return true;
    }));

    echo json_encode($filtered);
    exit;
}

// 2. POST /api/blogs or /api/blogs/:id/view
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];

    // View Counter Increment
    if (strpos($path, 'view') !== false || substr($path, -5) === '/view') {
        $id = explode('/', $path)[0];
        $pdo = getPDO();
        $updatedViews = 1;
        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE _id = ? OR id = ?");
            $stmt->execute([$id, $id]);
            $stmt2 = $pdo->prepare("SELECT views FROM blogs WHERE _id = ? OR id = ? LIMIT 1");
            $stmt2->execute([$id, $id]);
            $updatedViews = (int)$stmt2->fetchColumn();
        } else {
            $blogs = getBlogs();
            foreach ($blogs as &$b) {
                if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id)) {
                    $b['views'] = isset($b['views']) ? ($b['views'] + 1) : 1;
                    $updatedViews = $b['views'];
                    break;
                }
            }
            saveBlogsBackup($blogs);
        }
        echo json_encode(['views' => $updatedViews]);
        exit;
    }

    // Create New Blog
    $title = $body['title'] ?? 'Untitled Article';
    $excerpt = extractAndSaveBase64Images($body['excerpt'] ?? '', $title);
    $featuredImg = extractAndSaveBase64Images($body['image'] ?? '', $title . '-featured');
    $slug = $body['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));
    $genId = (string)(time() . mt_rand(100, 999));
    $createdAt = date('c');
    $updatedAt = date('c');

    $newBlog = [
        'id' => time() . mt_rand(100, 999),
        '_id' => $genId,
        'title' => $title,
        'category' => $body['category'] ?? 'ERP Modules',
        'readTime' => $body['readTime'] ?? '3 Mins Read',
        'excerpt' => $excerpt,
        'date' => $body['date'] ?? date('M j, Y'),
        'status' => $body['status'] ?? 'Published',
        'isFeatured' => !empty($body['isFeatured']),
        'image' => $featuredImg,
        'imageAlt' => $body['imageAlt'] ?? $title,
        'seoTitle' => $body['seoTitle'] ?? $title,
        'metaDesc' => $body['metaDesc'] ?? '',
        'focusKeyword' => $body['focusKeyword'] ?? '',
        'slug' => $slug,
        'ogTitle' => $body['ogTitle'] ?? $title,
        'ogDesc' => $body['ogDesc'] ?? '',
        'ogImg' => $body['ogImg'] ?? $featuredImg,
        'twitterTitle' => $body['twitterTitle'] ?? $title,
        'twitterDesc' => $body['twitterDesc'] ?? '',
        'twitterCard' => $body['twitterCard'] ?? 'Summary Large Image',
        'rawSchema' => $body['rawSchema'] ?? '',
        'views' => 0,
        'createdAt' => $createdAt,
        'updatedAt' => $updatedAt
    ];

    $pdo = getPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO blogs (_id, slug, title, category, readTime, excerpt, date, status, isFeatured, image, imageAlt, seoTitle, metaDesc, focusKeyword, ogTitle, ogDesc, ogImg, twitterTitle, twitterDesc, twitterCard, rawSchema, views, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $newBlog['_id'],
                $newBlog['slug'],
                $newBlog['title'],
                $newBlog['category'],
                $newBlog['readTime'],
                $newBlog['excerpt'],
                $newBlog['date'],
                $newBlog['status'],
                $newBlog['isFeatured'] ? 1 : 0,
                $newBlog['image'],
                $newBlog['imageAlt'],
                $newBlog['seoTitle'],
                $newBlog['metaDesc'],
                $newBlog['focusKeyword'],
                $newBlog['ogTitle'],
                $newBlog['ogDesc'],
                $newBlog['ogImg'],
                $newBlog['twitterTitle'],
                $newBlog['twitterDesc'],
                $newBlog['twitterCard'],
                $newBlog['rawSchema'],
                0,
                $createdAt,
                $updatedAt
            ]);
            $newBlog['id'] = (int)$pdo->lastInsertId();
        } catch (Exception $e) {
            error_log('MySQL Insert Error in api/blogs.php: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database insert error: ' . $e->getMessage()]);
            exit;
        }
    }

    $allBlogs = getBlogs();
    saveBlogsBackup($allBlogs);

    http_response_code(201);
    echo json_encode($newBlog);
    exit;
}

// 3. PUT /api/blogs/:id (Update Blog)
if ($method === 'PUT') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $id = $path;

    $pdo = getPDO();
    if ($pdo) {
        $fields = [];
        $values = [];

        $allowed = ['title', 'category', 'readTime', 'excerpt', 'date', 'status', 'isFeatured', 'image', 'imageAlt', 'seoTitle', 'metaDesc', 'focusKeyword', 'slug', 'ogTitle', 'ogDesc', 'ogImg', 'twitterTitle', 'twitterDesc', 'twitterCard', 'rawSchema'];
        
        foreach ($allowed as $f) {
            if (isset($body[$f])) {
                if ($f === 'isFeatured') {
                    $fields[] = "`{$f}` = ?";
                    $values[] = !empty($body[$f]) ? 1 : 0;
                } elseif ($f === 'excerpt' || $f === 'image') {
                    $titleForImg = $body['title'] ?? 'blog';
                    $fields[] = "`{$f}` = ?";
                    $values[] = extractAndSaveBase64Images($body[$f], $titleForImg);
                } else {
                    $fields[] = "`{$f}` = ?";
                    $values[] = $body[$f];
                }
            }
        }

        if (!empty($fields)) {
            $fields[] = "`updatedAt` = ?";
            $values[] = date('c');

            $values[] = $id;
            $values[] = $id;

            try {
                $sql = "UPDATE blogs SET " . implode(', ', $fields) . " WHERE _id = ? OR id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
            } catch (Exception $e) {
                error_log('MySQL Update Error in api/blogs.php: ' . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database update error: ' . $e->getMessage()]);
                exit;
            }
        }

        $allBlogs = getBlogs();
        saveBlogsBackup($allBlogs);

        echo json_encode(['message' => 'Blog updated successfully in MySQL']);
        exit;
    }

    $blogs = getBlogs();
    $found = false;
    foreach ($blogs as &$b) {
        if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id)) {
            foreach ($body as $k => $v) {
                if ($k === 'excerpt' || $k === 'image') {
                    $b[$k] = extractAndSaveBase64Images($v, $b['title'] ?? 'blog');
                } else {
                    $b[$k] = $v;
                }
            }
            $b['updatedAt'] = date('c');
            $found = true;
            break;
        }
    }

    if ($found) {
        saveBlogsBackup($blogs);
        echo json_encode(['message' => 'Blog updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Blog not found']);
    }
    exit;
}

// 4. DELETE /api/blogs/:id
if ($method === 'DELETE') {
    $id = $path;
    $pdo = getPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM blogs WHERE _id = ? OR id = ?");
            $stmt->execute([$id, $id]);
        } catch (Exception $e) {
            error_log('MySQL Delete Error in api/blogs.php: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database delete error: ' . $e->getMessage()]);
            exit;
        }

        $allBlogs = getBlogs();
        saveBlogsBackup($allBlogs);

        echo json_encode(['message' => 'Blog deleted successfully from MySQL', 'id' => $id]);
        exit;
    }

    $blogs = getBlogs();
    $initialCount = count($blogs);
    $blogs = array_values(array_filter($blogs, function($b) use ($id) {
        return !((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id));
    }));

    if (count($blogs) !== $initialCount) {
        saveBlogsBackup($blogs);
        echo json_encode(['message' => 'Blog deleted successfully', 'id' => $id]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Blog not found']);
    }
    exit;
}
