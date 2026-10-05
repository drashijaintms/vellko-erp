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
            'active' => "TINYINT(1) DEFAULT 1",
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

        // Fill any null _id or active for older rows
        try {
            $pdo->exec("UPDATE blogs SET _id = CAST(id AS CHAR) WHERE _id IS NULL OR _id = ''");
            $pdo->exec("UPDATE blogs SET active = 1 WHERE active IS NULL");
        } catch (Exception $e) {}

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

function getBlogs($activeOnly = true) {
    $pdo = getPDO();
    if ($pdo) {
        try {
            $sql = $activeOnly ? "SELECT * FROM blogs WHERE (active = 1 OR active IS NULL) AND status != 'Trash' ORDER BY id DESC" : "SELECT * FROM blogs ORDER BY id DESC";
            $stmt = $pdo->query($sql);
            $rows = $stmt->fetchAll();
            foreach ($rows as &$r) {
                $r['id'] = (int)$r['id'];
                $r['isFeatured'] = (bool)$r['isFeatured'];
                $r['active'] = isset($r['active']) ? (int)$r['active'] : 1;
                $r['views'] = (int)$r['views'];
            }
            return $rows;
        } catch (Exception $e) {
            error_log('MySQL select error: ' . $e->getMessage());
        }
    }
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
                $single['active'] = isset($single['active']) ? (int)$single['active'] : 1;
                $single['views'] = (int)$single['views'];
                echo json_encode($single);
                exit;
            }
        } else {
            $blogs = getBlogs(false);
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
    $activeFilter = $_GET['active'] ?? null;
    $isTrash = isset($_GET['trash']) || $activeFilter === '0' || $status === 'Trash';

    if ($pdo) {
        $sql = "SELECT * FROM blogs WHERE 1=1";
        $params = [];

        if ($isTrash) {
            $sql .= " AND (active = 0 OR status = 'Trash')";
        } elseif ($activeFilter === 'all') {
            // no active restriction
        } else {
            $sql .= " AND (active = 1 OR active IS NULL) AND (status != 'Trash' OR status IS NULL)";
            if ($status) {
                $sql .= " AND status = ?";
                $params[] = $status;
            }
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
            $r['active'] = isset($r['active']) ? (int)$r['active'] : 1;
            $r['views'] = (int)$r['views'];
        }
        echo json_encode($rows);
        exit;
    }

    $blogs = getBlogs(!$isTrash && $activeFilter !== 'all');
    $filtered = array_values(array_filter($blogs, function($b) use ($status, $category, $isFeatured, $isTrash) {
        if ($isTrash && (isset($b['active']) && $b['active'] == 1)) return false;
        if (!$isTrash && isset($b['active']) && $b['active'] == 0) return false;
        if ($status && (!isset($b['status']) || $b['status'] !== $status)) return false;
        if ($category && (!isset($b['category']) || $b['category'] !== $category)) return false;
        if ($isFeatured !== null && (!isset($b['isFeatured']) || (bool)$b['isFeatured'] !== $isFeatured)) return false;
        return true;
    }));

    echo json_encode($filtered);
    exit;
}

// Helper to insert or update blog in MySQL and JSON backup
function upsertBlog($id, $body) {
    global $lastDbError;
    $pdo = getPDO();
    $title = $body['title'] ?? 'Untitled Article';
    $excerpt = isset($body['excerpt']) ? extractAndSaveBase64Images($body['excerpt'], $title) : '';
    $featuredImg = isset($body['image']) ? extractAndSaveBase64Images($body['image'], $title . '-featured') : '';
    $slug = !empty($body['slug']) ? $body['slug'] : strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));
    $status = $body['status'] ?? 'Published';
    $active = isset($body['active']) ? (!empty($body['active']) ? 1 : 0) : ($status === 'Trash' ? 0 : 1);
    $isFeatured = !empty($body['isFeatured']) ? 1 : 0;
    $updatedAt = date('c');

    if ($pdo) {
        $existing = null;
        if (!empty($id)) {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE _id = ? OR id = ? OR slug = ? LIMIT 1");
            $stmt->execute([$id, $id, $id]);
            $existing = $stmt->fetch();
        }

        if ($existing) {
            $rowId = $existing['id'];
            $allowed = ['title', 'category', 'readTime', 'excerpt', 'date', 'status', 'active', 'isFeatured', 'image', 'imageAlt', 'seoTitle', 'metaDesc', 'focusKeyword', 'slug', 'ogTitle', 'ogDesc', 'ogImg', 'twitterTitle', 'twitterDesc', 'twitterCard', 'rawSchema'];
            $fields = [];
            $values = [];

            foreach ($allowed as $f) {
                if (isset($body[$f])) {
                    if ($f === 'isFeatured') {
                        $fields[] = "`{$f}` = ?";
                        $values[] = !empty($body[$f]) ? 1 : 0;
                    } elseif ($f === 'active') {
                        $fields[] = "`{$f}` = ?";
                        $values[] = !empty($body[$f]) ? 1 : 0;
                    } elseif ($f === 'excerpt') {
                        $fields[] = "`{$f}` = ?";
                        $values[] = $excerpt;
                    } elseif ($f === 'image') {
                        $fields[] = "`{$f}` = ?";
                        $values[] = $featuredImg;
                    } else {
                        $fields[] = "`{$f}` = ?";
                        $values[] = $body[$f];
                    }
                }
            }
            $fields[] = "`updatedAt` = ?";
            $values[] = $updatedAt;
            $values[] = $rowId;

            try {
                $sql = "UPDATE blogs SET " . implode(', ', $fields) . " WHERE id = ?";
                $updateStmt = $pdo->prepare($sql);
                $updateStmt->execute($values);

                $fetchStmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ? LIMIT 1");
                $fetchStmt->execute([$rowId]);
                $updatedRecord = $fetchStmt->fetch();
                if ($updatedRecord) {
                    $updatedRecord['id'] = (int)$updatedRecord['id'];
                    $updatedRecord['isFeatured'] = (bool)$updatedRecord['isFeatured'];
                    $updatedRecord['active'] = (int)$updatedRecord['active'];
                    $updatedRecord['views'] = (int)$updatedRecord['views'];
                }
                saveBlogsBackup(getBlogs(false));
                echo json_encode($updatedRecord ?: ['message' => 'Blog updated successfully in MySQL', 'id' => $rowId]);
                exit;
            } catch (Exception $e) {
                error_log('MySQL Update Error in api/blogs.php: ' . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database update error: ' . $e->getMessage()]);
                exit;
            }
        } else {
            // Not found in MySQL -> INSERT as new row with provided or generated ID
            $genId = !empty($body['_id']) ? (string)$body['_id'] : (!empty($id) ? (string)$id : (string)(time() . mt_rand(100, 999)));
            $createdAt = $body['createdAt'] ?? date('c');

            try {
                $stmt = $pdo->prepare("INSERT INTO blogs (_id, slug, title, category, readTime, excerpt, date, status, active, isFeatured, image, imageAlt, seoTitle, metaDesc, focusKeyword, ogTitle, ogDesc, ogImg, twitterTitle, twitterDesc, twitterCard, rawSchema, views, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $genId,
                    $slug,
                    $title,
                    $body['category'] ?? 'ERP Modules',
                    $body['readTime'] ?? '3 Mins Read',
                    $excerpt,
                    $body['date'] ?? date('M j, Y'),
                    $status,
                    $active,
                    $isFeatured,
                    $featuredImg,
                    $body['imageAlt'] ?? $title,
                    $body['seoTitle'] ?? $title,
                    $body['metaDesc'] ?? '',
                    $body['focusKeyword'] ?? '',
                    $body['ogTitle'] ?? $title,
                    $body['ogDesc'] ?? '',
                    $body['ogImg'] ?? $featuredImg,
                    $body['twitterTitle'] ?? $title,
                    $body['twitterDesc'] ?? '',
                    $body['twitterCard'] ?? 'Summary Large Image',
                    $body['rawSchema'] ?? '',
                    isset($body['views']) ? (int)$body['views'] : 0,
                    $createdAt,
                    $updatedAt
                ]);
                $newId = (int)$pdo->lastInsertId();
                $fetchStmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ? LIMIT 1");
                $fetchStmt->execute([$newId]);
                $createdRecord = $fetchStmt->fetch();
                if ($createdRecord) {
                    $createdRecord['id'] = (int)$createdRecord['id'];
                    $createdRecord['isFeatured'] = (bool)$createdRecord['isFeatured'];
                    $createdRecord['active'] = (int)$createdRecord['active'];
                    $createdRecord['views'] = (int)$createdRecord['views'];
                }
                saveBlogsBackup(getBlogs(false));
                http_response_code(200);
                echo json_encode($createdRecord ?: ['message' => 'Blog saved successfully in MySQL', 'id' => $newId]);
                exit;
            } catch (Exception $e) {
                error_log('MySQL Insert Error in api/blogs.php: ' . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database insert error: ' . $e->getMessage()]);
                exit;
            }
        }
    }

    // JSON fallback if MySQL is offline
    $blogs = getBlogs(false);
    $found = false;
    foreach ($blogs as &$b) {
        if ((!empty($id) && ((isset($b['id']) && (string)$b['id'] === (string)$id) || (isset($b['_id']) && (string)$b['_id'] === (string)$id) || (isset($b['slug']) && $b['slug'] === $id))) || (!empty($body['_id']) && isset($b['_id']) && (string)$b['_id'] === (string)$body['_id'])) {
            foreach ($body as $k => $v) {
                if ($k === 'excerpt' || $k === 'image') {
                    $b[$k] = extractAndSaveBase64Images($v, $b['title'] ?? 'blog');
                } else {
                    $b[$k] = $v;
                }
            }
            $b['updatedAt'] = $updatedAt;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $newBlog = array_merge([
            'id' => time() . mt_rand(100, 999),
            '_id' => !empty($body['_id']) ? (string)$body['_id'] : (!empty($id) ? (string)$id : (string)(time() . mt_rand(100, 999))),
            'title' => $title,
            'category' => $body['category'] ?? 'ERP Modules',
            'readTime' => $body['readTime'] ?? '3 Mins Read',
            'excerpt' => $excerpt,
            'date' => $body['date'] ?? date('M j, Y'),
            'status' => $status,
            'active' => $active,
            'isFeatured' => $isFeatured,
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
            'createdAt' => date('c'),
            'updatedAt' => date('c')
        ], $body);
        $blogs = array_merge([$newBlog], $blogs);
    }
    saveBlogsBackup($blogs);
    echo json_encode(['message' => 'Blog saved successfully']);
    exit;
}

// 2. POST /api/blogs or /api/blogs/:id/view or /api/blogs/:id/restore
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];

    // Restore Trashed Blog
    if (strpos($path, 'restore') !== false || substr($path, -8) === '/restore') {
        $id = explode('/', $path)[0];
        $pdo = getPDO();
        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE blogs SET active = 1, status = 'Published', updatedAt = ? WHERE _id = ? OR id = ? OR slug = ?");
            $stmt->execute([date('c'), $id, $id, $id]);
        }
        $allBlogs = getBlogs(false);
        saveBlogsBackup($allBlogs);
        echo json_encode(['message' => 'Blog restored successfully']);
        exit;
    }

    // View Counter Increment
    if (strpos($path, 'view') !== false || substr($path, -5) === '/view') {
        $id = explode('/', $path)[0];
        $pdo = getPDO();
        $updatedViews = 1;
        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE _id = ? OR id = ? OR slug = ?");
            $stmt->execute([$id, $id, $id]);
            $stmt2 = $pdo->prepare("SELECT views FROM blogs WHERE _id = ? OR id = ? OR slug = ? LIMIT 1");
            $stmt2->execute([$id, $id, $id]);
            $updatedViews = (int)$stmt2->fetchColumn();
        } else {
            $blogs = getBlogs(false);
            foreach ($blogs as &$b) {
                if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id) || (isset($b['slug']) && $b['slug'] === $id)) {
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

    // Create or Update Blog via POST
    $id = !empty($path) ? $path : ($_GET['id'] ?? $body['_id'] ?? $body['id'] ?? '');
    upsertBlog($id, $body);
}

// 3. PUT /api/blogs/:id (Update Blog)
if ($method === 'PUT') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $id = !empty($path) ? $path : ($_GET['id'] ?? $body['_id'] ?? $body['id'] ?? '');
    upsertBlog($id, $body);
}

// 4. DELETE /api/blogs/:id (Soft-delete to Trash OR Permanent Delete)
if ($method === 'DELETE') {
    $id = $path;
    $isPermanent = isset($_GET['permanent']) || isset($_GET['force']);

    $pdo = getPDO();
    if ($pdo) {
        try {
            if ($isPermanent) {
                $stmt = $pdo->prepare("DELETE FROM blogs WHERE _id = ? OR id = ?");
                $stmt->execute([$id, $id]);
            } else {
                $stmt = $pdo->prepare("UPDATE blogs SET active = 0, status = 'Trash', updatedAt = ? WHERE _id = ? OR id = ?");
                $stmt->execute([date('c'), $id, $id]);
            }
        } catch (Exception $e) {
            error_log('MySQL Delete Error in api/blogs.php: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database delete error: ' . $e->getMessage()]);
            exit;
        }

        $allBlogs = getBlogs(false);
        saveBlogsBackup($allBlogs);

        echo json_encode([
            'message' => $isPermanent ? 'Blog permanently deleted from MySQL' : 'Blog moved to Trash in MySQL',
            'id' => $id,
            'permanent' => $isPermanent
        ]);
        exit;
    }

    $blogs = getBlogs(false);
    if ($isPermanent) {
        $blogs = array_values(array_filter($blogs, function($b) use ($id) {
            return !((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id));
        }));
    } else {
        foreach ($blogs as &$b) {
            if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id)) {
                $b['active'] = 0;
                $b['status'] = 'Trash';
                $b['updatedAt'] = date('c');
                break;
            }
        }
    }

    saveBlogsBackup($blogs);
    echo json_encode(['message' => $isPermanent ? 'Blog permanently deleted' : 'Blog moved to trash', 'id' => $id]);
    exit;
}
