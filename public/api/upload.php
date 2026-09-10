<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

// Locate upload directory
$uploadDir = dirname(__DIR__) . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check for file upload
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    // Check if another field name was used
    $fileKey = null;
    foreach ($_FILES as $k => $v) {
        if ($v['error'] === UPLOAD_ERR_OK) {
            $fileKey = $k;
            break;
        }
    }
    if (!$fileKey) {
        http_response_code(400);
        echo json_encode(['message' => 'No image file provided or upload error.']);
        exit;
    }
    $file = $_FILES[$fileKey];
} else {
    $file = $_FILES['image'];
}

// Generate clean SEO-friendly filename
$originalName = pathinfo($file['name'], PATHINFO_FILENAME);
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Fallback extension if missing
if (empty($extension)) {
    $mime = mime_content_type($file['tmp_name']);
    $mimeMap = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
        'image/svg+xml' => 'svg'
    ];
    $extension = $mimeMap[$mime] ?? 'png';
}

// Sanitize filename into clean slug: e.g. "Vellko ERP Accounting 2026.png" -> "vellko-erp-accounting-2026.png"
$cleanBase = strtolower(trim($originalName));
$cleanBase = preg_replace('/[^a-z0-9]+/i', '-', $cleanBase);
$cleanBase = trim($cleanBase, '-');
if (empty($cleanBase)) {
    $cleanBase = 'image-' . time();
}

// Avoid filename collisions by appending increment: name.png, name-1.png, name-2.png
$finalName = "{$cleanBase}.{$extension}";
$counter = 1;
while (file_exists($uploadDir . $finalName)) {
    $finalName = "{$cleanBase}-{$counter}.{$extension}";
    $counter++;
}

$destination = $uploadDir . $finalName;
if (move_uploaded_file($file['tmp_name'], $destination)) {
    // Also copy to dist/uploads if running from root
    $distUploadDir = dirname(__DIR__) . '/dist/uploads/';
    if (is_dir(dirname(__DIR__) . '/dist')) {
        if (!is_dir($distUploadDir)) {
            mkdir($distUploadDir, 0755, true);
        }
        @copy($destination, $distUploadDir . $finalName);
    }

    $url = '/uploads/' . $finalName;
    http_response_code(200);
    echo json_encode([
        'url' => $url,
        'location' => $url,
        'filename' => $finalName,
        'originalName' => $file['name'],
        'size' => filesize($destination)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to save uploaded image to disk.']);
}
