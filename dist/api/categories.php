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

$dataFile = dirname(__DIR__, 1) . '/data/categories.json';
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$lastDbError = null;

function getCategoriesPDO() {
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
        error_log('MySQL connection failed in api/categories.php: ' . $lastDbError);
        return null;
    }

    try {
        // Ensure table exists
        $createTableSql = "CREATE TABLE IF NOT EXISTS categories (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            slug VARCHAR(150) NOT NULL,
            parent VARCHAR(150) DEFAULT 'None',
            image LONGTEXT,
            imageAlt VARCHAR(500),
            description LONGTEXT,
            status VARCHAR(50) DEFAULT 'Approved',
            createdAt VARCHAR(50),
            updatedAt VARCHAR(50),
            INDEX idx_slug (slug)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $pdo->exec($createTableSql);

        // Auto-migrate any missing columns
        $requiredColumns = [
            'name' => "VARCHAR(150) NOT NULL",
            'slug' => "VARCHAR(150) NOT NULL",
            'parent' => "VARCHAR(150) DEFAULT 'None'",
            'image' => "LONGTEXT NULL",
            'imageAlt' => "VARCHAR(500) NULL DEFAULT NULL",
            'description' => "LONGTEXT NULL",
            'status' => "VARCHAR(50) DEFAULT 'Approved'",
            'createdAt' => "VARCHAR(50) NULL DEFAULT NULL",
            'updatedAt' => "VARCHAR(50) NULL DEFAULT NULL"
        ];

        $existingColsStmt = $pdo->query("SHOW COLUMNS FROM categories");
        $existingCols = $existingColsStmt->fetchAll(PDO::FETCH_COLUMN, 0);
        $existingColsLower = array_map('strtolower', $existingCols);

        foreach ($requiredColumns as $colName => $colDef) {
            if (!in_array(strtolower($colName), $existingColsLower)) {
                try {
                    $pdo->exec("ALTER TABLE categories ADD COLUMN `{$colName}` {$colDef}");
                } catch (Exception $colEx) {
                    error_log("Failed to add column {$colName}: " . $colEx->getMessage());
                }
            }
        }

        // Auto-seed table if empty
        $count = (int)$pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
        if ($count === 0) {
            $jsonCategories = getCategoriesFromJson();
            if (!empty($jsonCategories)) {
                $stmt = $pdo->prepare("INSERT INTO categories (name, slug, parent, image, imageAlt, description, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                foreach ($jsonCategories as $c) {
                    $stmt->execute([
                        $c['name'] ?? 'Category',
                        $c['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $c['name'] ?? 'category'), '-')),
                        $c['parent'] ?? 'None',
                        $c['image'] ?? '',
                        $c['imageAlt'] ?? ($c['name'] ?? ''),
                        $c['description'] ?? '',
                        $c['status'] ?? 'Approved',
                        date('c'),
                        date('c')
                    ]);
                }
            }
        }
        return $pdo;
    } catch (Exception $e) {
        $lastDbError = $e->getMessage();
        error_log('MySQL init error in api/categories.php: ' . $e->getMessage());
        return $pdo;
    }
}

function getCategoriesFromJson() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if (is_array($data) && count($data) > 0) return $data;
    }
    return [
        ['id' => 1, 'name' => 'Vellko Call Recording', 'slug' => 'vellko-call-recording', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Call logging & telephony'],
        ['id' => 2, 'name' => 'ERP Modules', 'slug' => 'erp-modules', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Enterprise ERP core modules'],
        ['id' => 3, 'name' => 'Manufacturing', 'slug' => 'manufacturing', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Shop-floor and BOM optimization'],
        ['id' => 4, 'name' => 'Retail', 'slug' => 'retail', 'parent' => 'None', 'status' => 'Approved', 'description' => 'POS billing and store operations'],
        ['id' => 5, 'name' => 'Distribution', 'slug' => 'distribution', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Wholesale and supply chain'],
        ['id' => 6, 'name' => 'Healthcare', 'slug' => 'healthcare', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Clinic and patient records'],
        ['id' => 7, 'name' => 'Education', 'slug' => 'education', 'parent' => 'None', 'status' => 'Approved', 'description' => 'School and university workflows'],
        ['id' => 8, 'name' => 'Real Estate', 'slug' => 'real-estate', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Property and construction projects'],
        ['id' => 9, 'name' => 'Professional Services', 'slug' => 'professional-services', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Client time tracking and billing'],
        ['id' => 10, 'name' => 'E-Commerce', 'slug' => 'e-commerce', 'parent' => 'None', 'status' => 'Approved', 'description' => 'Marketplace and orders synchronization']
    ];
}

function getCategories() {
    $pdo = getCategoriesPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM categories ORDER BY id ASC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$r) {
                $r['id'] = (int)$r['id'];
            }
            return $rows;
        } catch (Exception $e) {
            error_log('MySQL categories select error: ' . $e->getMessage());
        }
    }
    return getCategoriesFromJson();
}

function saveCategoriesBackup($categories) {
    global $dataFile;
    $json = json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    @file_put_contents($dataFile, $json);

    $distData = dirname(__DIR__, 1) . '/dist/data/categories.json';
    if (is_dir(dirname($distData))) {
        @file_put_contents($distData, $json);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

// 1. GET /api/categories or /api/categories/:id
if ($method === 'GET') {
    $categories = getCategories();
    if (!empty($path)) {
        foreach ($categories as $cat) {
            if ((string)$cat['id'] === $path || (string)($cat['slug'] ?? '') === $path || (string)$cat['name'] === $path) {
                echo json_encode($cat);
                exit;
            }
        }
        http_response_code(404);
        echo json_encode(['message' => 'Category not found']);
        exit;
    }
    echo json_encode($categories);
    exit;
}

// 2. POST /api/categories (Create)
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];

    $name = trim($body['name'] ?? '');
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Category name is required']);
        exit;
    }

    $slug = trim($body['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $name), '-'));
    $parent = trim($body['parent'] ?? 'None');
    $image = trim($body['image'] ?? '');
    $imageAlt = trim($body['imageAlt'] ?? $name);
    $description = trim($body['description'] ?? '');
    $status = trim($body['status'] ?? 'Approved');
    $createdAt = date('c');
    $updatedAt = date('c');

    $pdo = getCategoriesPDO();
    $newId = time();

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO categories (name, slug, parent, image, imageAlt, description, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $slug, $parent, $image, $imageAlt, $description, $status, $createdAt, $updatedAt]);
            $newId = (int)$pdo->lastInsertId();
        } catch (Exception $e) {
            error_log('MySQL Category Insert Error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database category insert error: ' . $e->getMessage()]);
            exit;
        }
    }

    $newCategory = [
        'id' => $newId,
        'name' => $name,
        'slug' => $slug,
        'parent' => $parent,
        'image' => $image,
        'imageAlt' => $imageAlt,
        'description' => $description,
        'status' => $status,
        'createdAt' => $createdAt,
        'updatedAt' => $updatedAt
    ];

    $allCats = getCategories();
    saveCategoriesBackup($allCats);

    http_response_code(201);
    echo json_encode($newCategory);
    exit;
}

// 3. PUT /api/categories/:id (Update)
if ($method === 'PUT') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $id = $path ?: ($body['id'] ?? null);

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Category ID is required']);
        exit;
    }

    $pdo = getCategoriesPDO();
    if ($pdo) {
        $fields = [];
        $values = [];

        $allowed = ['name', 'slug', 'parent', 'image', 'imageAlt', 'description', 'status'];
        foreach ($allowed as $f) {
            if (isset($body[$f])) {
                $fields[] = "`{$f}` = ?";
                $values[] = $body[$f];
            }
        }

        if (!empty($fields)) {
            $fields[] = "`updatedAt` = ?";
            $values[] = date('c');

            $values[] = $id;

            try {
                $sql = "UPDATE categories SET " . implode(', ', $fields) . " WHERE id = ? OR slug = ?";
                $values[] = $id;
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
            } catch (Exception $e) {
                error_log('MySQL Category Update Error: ' . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database category update error: ' . $e->getMessage()]);
                exit;
            }
        }

        $allCats = getCategories();
        saveCategoriesBackup($allCats);

        echo json_encode(['message' => 'Category updated successfully in MySQL']);
        exit;
    }

    $categories = getCategories();
    $found = false;
    foreach ($categories as &$c) {
        if ((string)$c['id'] === (string)$id || (string)($c['slug'] ?? '') === (string)$id) {
            foreach ($body as $k => $v) {
                $c[$k] = $v;
            }
            $c['updatedAt'] = date('c');
            $found = true;
            break;
        }
    }

    if ($found) {
        saveCategoriesBackup($categories);
        echo json_encode(['message' => 'Category updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Category not found']);
    }
    exit;
}

// 4. DELETE /api/categories/:id (Delete)
if ($method === 'DELETE') {
    $id = $path;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Category ID is required']);
        exit;
    }

    $pdo = getCategoriesPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ? OR slug = ?");
            $stmt->execute([$id, $id]);
        } catch (Exception $e) {
            error_log('MySQL Category Delete Error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database category delete error: ' . $e->getMessage()]);
            exit;
        }

        $allCats = getCategories();
        saveCategoriesBackup($allCats);

        echo json_encode(['message' => 'Category deleted successfully from MySQL', 'id' => $id]);
        exit;
    }

    $categories = getCategories();
    $initialCount = count($categories);
    $categories = array_values(array_filter($categories, function($c) use ($id) {
        return !((string)$c['id'] === (string)$id || (string)($c['slug'] ?? '') === (string)$id);
    }));

    if (count($categories) !== $initialCount) {
        saveCategoriesBackup($categories);
        echo json_encode(['message' => 'Category deleted successfully', 'id' => $id]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Category not found']);
    }
    exit;
}
