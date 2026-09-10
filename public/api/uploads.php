<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = dirname(__DIR__) . '/uploads/';
if (!is_dir($uploadDir)) {
    echo json_encode([]);
    exit;
}

$files = scandir($uploadDir);
$images = [];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'])) {
        $filePath = $uploadDir . $file;
        $images[] = [
            'filename' => $file,
            'url' => '/uploads/' . $file,
            'createdAt' => date('c', filemtime($filePath))
        ];
    }
}

// Sort newest first
usort($images, function($a, $b) {
    return strtotime($b['createdAt']) - strtotime($a['createdAt']);
});

echo json_encode($images);
