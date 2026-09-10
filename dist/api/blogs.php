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
