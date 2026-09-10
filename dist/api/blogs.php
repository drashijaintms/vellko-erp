<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = dirname(__DIR__) . '/data/blogs.json';
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function getBlogs() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if (is_array($data)) return $data;
    }
    return [];
}

function saveBlogs($blogs) {
    global $dataFile;
    $json = json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    file_put_contents($dataFile, $json);
    
    // Also sync to dist/data/blogs.json if exists
    $distData = dirname(__DIR__) . '/dist/data/blogs.json';
    if (is_dir(dirname($distData))) {
        @file_put_contents($distData, $json);
    }

    // Auto-update sitemap.xml across all target locations
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
        '/ecommerce-erp',
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
        mkdir($uploadDir, 0755, true);
    }

    $cleanTitle = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $blogTitle), '-'));
    if (empty($cleanTitle)) $cleanTitle = 'blog-image';

    // Regex match data:image/(png|jpeg|webp|gif|svg);base64,...
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
            if (!is_dir($distUploadDir)) mkdir($distUploadDir, 0755, true);
            @file_put_contents($distUploadDir . $filename, $binary);
        }

        return "/uploads/{$filename}";
    }, $content);

    return $updated;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

// 1. GET /api/blogs or /api/blogs/:id
if ($method === 'GET') {
    $blogs = getBlogs();
    if (!empty($path)) {
        // Find single blog by ID
        foreach ($blogs as $b) {
            if (isset($b['id']) && (string)$b['id'] === $path || isset($b['_id']) && (string)$b['_id'] === $path) {
                echo json_encode($b);
                exit;
            }
        }
        http_response_code(404);
        echo json_encode(['message' => 'Blog not found']);
        exit;
    }

    // Filters
    $status = $_GET['status'] ?? null;
    $category = $_GET['category'] ?? null;
    $isFeatured = isset($_GET['isFeatured']) ? filter_var($_GET['isFeatured'], FILTER_VALIDATE_BOOLEAN) : null;

    $filtered = array_values(array_filter($blogs, function($b) use ($status, $category, $isFeatured) {
        if ($status && (!isset($b['status']) || $b['status'] !== $status)) return false;
        if ($category && (!isset($b['category']) || $b['category'] !== $category)) return false;
        if ($isFeatured !== null && (!isset($b['isFeatured']) || (bool)$b['isFeatured'] !== $isFeatured)) return false;
        return true;
    }));

    echo json_encode($filtered);
    exit;
}

// 2. POST /api/blogs (Create new blog) or /api/blogs/:id/view
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];

    // Check if view count increment
    if (strpos($path, 'view') !== false || substr($path, -5) === '/view') {
        $id = explode('/', $path)[0];
        $blogs = getBlogs();
        $updatedViews = 0;
        foreach ($blogs as &$b) {
            if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id)) {
                $b['views'] = isset($b['views']) ? ($b['views'] + 1) : 1;
                $updatedViews = $b['views'];
                break;
            }
        }
        saveBlogs($blogs);
        echo json_encode(['views' => $updatedViews]);
        exit;
    }

    // Normal Blog Create
    $title = $body['title'] ?? 'Untitled Article';
    $excerpt = extractAndSaveBase64Images($body['excerpt'] ?? '', $title);
    $featuredImg = extractAndSaveBase64Images($body['image'] ?? '', $title . '-featured');

    $newBlog = [
        'id' => time() . mt_rand(100, 999),
        '_id' => (string)(time() . mt_rand(100, 999)),
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
        'slug' => $body['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-')),
        'ogTitle' => $body['ogTitle'] ?? $title,
        'ogDesc' => $body['ogDesc'] ?? '',
        'ogImg' => $body['ogImg'] ?? $featuredImg,
        'twitterTitle' => $body['twitterTitle'] ?? $title,
        'twitterDesc' => $body['twitterDesc'] ?? '',
        'twitterCard' => $body['twitterCard'] ?? 'Summary Large Image',
        'rawSchema' => $body['rawSchema'] ?? '',
        'views' => 0
    ];

    $blogs = getBlogs();
    array_unshift($blogs, $newBlog);
    saveBlogs($blogs);

    http_response_code(201);
    echo json_encode($newBlog);
    exit;
}

// 3. PUT /api/blogs/:id
if ($method === 'PUT') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $id = $path;

    $blogs = getBlogs();
    $found = false;
    foreach ($blogs as &$b) {
        if ((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id)) {
            if (isset($body['title'])) $b['title'] = $body['title'];
            if (isset($body['category'])) $b['category'] = $body['category'];
            if (isset($body['readTime'])) $b['readTime'] = $body['readTime'];
            if (isset($body['excerpt'])) $b['excerpt'] = extractAndSaveBase64Images($body['excerpt'], $b['title']);
            if (isset($body['date'])) $b['date'] = $body['date'];
            if (isset($body['status'])) $b['status'] = $body['status'];
            if (isset($body['isFeatured'])) $b['isFeatured'] = (bool)$body['isFeatured'];
            if (isset($body['image'])) $b['image'] = extractAndSaveBase64Images($body['image'], $b['title'] . '-featured');
            if (isset($body['imageAlt'])) $b['imageAlt'] = $body['imageAlt'];
            if (isset($body['seoTitle'])) $b['seoTitle'] = $body['seoTitle'];
            if (isset($body['metaDesc'])) $b['metaDesc'] = $body['metaDesc'];
            if (isset($body['focusKeyword'])) $b['focusKeyword'] = $body['focusKeyword'];
            if (isset($body['slug'])) $b['slug'] = $body['slug'];
            if (isset($body['ogTitle'])) $b['ogTitle'] = $body['ogTitle'];
            if (isset($body['ogDesc'])) $b['ogDesc'] = $body['ogDesc'];
            if (isset($body['ogImg'])) $b['ogImg'] = $body['ogImg'];
            if (isset($body['twitterTitle'])) $b['twitterTitle'] = $body['twitterTitle'];
            if (isset($body['twitterDesc'])) $b['twitterDesc'] = $body['twitterDesc'];
            if (isset($body['twitterCard'])) $b['twitterCard'] = $body['twitterCard'];
            if (isset($body['rawSchema'])) $b['rawSchema'] = $body['rawSchema'];
            $found = true;
            break;
        }
    }

    if ($found) {
        saveBlogs($blogs);
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
    $blogs = getBlogs();
    $initialCount = count($blogs);
    $blogs = array_values(array_filter($blogs, function($b) use ($id) {
        return !((isset($b['id']) && (string)$b['id'] === $id) || (isset($b['_id']) && (string)$b['_id'] === $id));
    }));

    if (count($blogs) !== $initialCount) {
        saveBlogs($blogs);
        echo json_encode(['message' => 'Blog deleted successfully', 'id' => $id]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Blog not found']);
    }
    exit;
}
