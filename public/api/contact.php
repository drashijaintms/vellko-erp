<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbHost = 'localhost';
$dbPort = '3306';
$dbName = 'qqoophoh_vellko_erp';
$dbUser = 'qqoophoh_vellko_erp';
$dbPass = 'qqoophoh_vellko_erp';

function getContactPDO() {
    global $dbHost, $dbPort, $dbName, $dbUser, $dbPass;
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dsnList = [
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        "mysql:host=127.0.0.1;port={$dbPort};dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/var/lib/mysql/mysql.sock;dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/tmp/mysql.sock;dbname={$dbName};charset=utf8mb4",
        "mysql:unix_socket=/var/run/mysqld/mysqld.sock;dbname={$dbName};charset=utf8mb4"
    ];

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    foreach ($dsnList as $dsn) {
        try {
            $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
            if ($pdo) break;
        } catch (Exception $e) {
            $pdo = null;
        }
    }

    if ($pdo) {
        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS inquiries (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NULL,
                email VARCHAR(255) NULL,
                phone VARCHAR(100) NULL,
                companyName VARCHAR(255) NULL,
                companySize VARCHAR(100) NULL,
                jobTitle VARCHAR(255) NULL,
                sourcePage VARCHAR(255) NULL,
                requirements LONGTEXT NULL,
                createdAt VARCHAR(50) NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
        } catch (Exception $e) {}
    }

    return $pdo;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

if ($method === 'GET') {
    $pdo = getContactPDO();
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY id DESC");
            $rows = $stmt->fetchAll();
            echo json_encode($rows);
            exit;
        } catch (Exception $e) {}
    }
    echo json_encode([]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    $pdo = getContactPDO();

    $inquiry = [
        'fullName' => $body['fullName'] ?? $body['name'] ?? '',
        'email' => $body['email'] ?? '',
        'phone' => $body['phone'] ?? '',
        'companyName' => $body['companyName'] ?? '',
        'companySize' => $body['companySize'] ?? '',
        'jobTitle' => $body['jobTitle'] ?? '',
        'sourcePage' => $body['sourcePage'] ?? '/contact',
        'requirements' => $body['requirements'] ?? $body['message'] ?? '',
        'createdAt' => date('c')
    ];

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO inquiries (fullName, email, phone, companyName, companySize, jobTitle, sourcePage, requirements, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $inquiry['fullName'],
                $inquiry['email'],
                $inquiry['phone'],
                $inquiry['companyName'],
                $inquiry['companySize'],
                $inquiry['jobTitle'],
                $inquiry['sourcePage'],
                $inquiry['requirements'],
                $inquiry['createdAt']
            ]);
            $inquiry['id'] = (int)$pdo->lastInsertId();
        } catch (Exception $e) {}
    }

    echo json_encode(['message' => 'Inquiry received successfully', 'data' => $inquiry]);
    exit;
}

if ($method === 'DELETE') {
    $id = $path ?: ($_GET['id'] ?? '');
    $pdo = getContactPDO();
    if ($pdo && !empty($id)) {
        try {
            $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = ?");
            $stmt->execute([$id]);
        } catch (Exception $e) {}
    }
    echo json_encode(['message' => 'Inquiry deleted', 'id' => $id]);
    exit;
}
