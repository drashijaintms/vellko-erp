<?php
/**
 * Dynamic Blog Page Handler for Vellko ERP
 * Serves single blog detail pages with backend-configured meta titles,
 * meta descriptions, Open Graph, Twitter Card tags, and comprehensive JSON-LD schemas
 * (BlogPosting, BreadcrumbList, Organization, and FAQPage where visible FAQs exist).
 */

header('Content-Type: text/html; charset=utf-8');

// --- Configuration ---
$baseUrl = 'https://vellkoerp.com';
$defaultImage = "{$baseUrl}/assets/logo-bAy9mXr5.png";

$dbHost = 'localhost';
$dbPort = '3306';
$dbName = 'qqoophoh_vellko_erp';
$dbUser = 'qqoophoh_vellko_erp';
$dbPass = 'qqoophoh_vellko_erp';

function slugifyText($text) {
    if (empty($text)) return '';
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    return strtolower($text);
}

function extractCleanExcerpt($htmlContent, $maxLen = 160) {
    if (empty($htmlContent)) return '';
    $cleaned = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $htmlContent);
    $cleaned = preg_replace('/<style\b[^>]*>(.*?)<\/style>/is', '', $cleaned);
    $cleaned = strip_tags($cleaned);
    $cleaned = html_entity_decode($cleaned, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $cleaned = preg_replace('/\s+/', ' ', $cleaned);
    $cleaned = trim($cleaned);

    if (mb_strlen($cleaned, 'UTF-8') <= $maxLen) {
        return $cleaned;
    }
    $truncated = mb_substr($cleaned, 0, $maxLen, 'UTF-8');
    $lastSpace = mb_strrpos($truncated, ' ', 0, 'UTF-8');
    if ($lastSpace !== false && $lastSpace > ($maxLen * 0.7)) {
        $truncated = mb_substr($truncated, 0, $lastSpace, 'UTF-8');
    }
    return rtrim($truncated, ',;:- ') . '...';
}

function formatIsoDate($dateString) {
    if (empty($dateString)) return date('c');
    $time = strtotime($dateString);
    if ($time !== false && $time > 0) {
        return date('c', $time);
    }
    return date('c');
}

function extractBlogFaqs($htmlContent) {
    if (empty($htmlContent)) return [];
    $faqs = [];

    if (preg_match_all('/<details\b[^>]*>(.*?)<\/details>/is', $htmlContent, $detailMatches)) {
        foreach ($detailMatches[1] as $detailHtml) {
            $question = '';
            if (preg_match('/<summary\b[^>]*>(.*?)<\/summary>/is', $detailHtml, $sumMatch)) {
                $cleaned = preg_replace('/<span\b[^>]*class=["\']faq-chevron["\'][^>]*>.*?<\/span>/is', '', $sumMatch[1]);
                $cleaned = preg_replace('/<span\b[^>]*>Q<\/span>/is', '', $cleaned);
                $question = trim(strip_tags($cleaned));
            }

            $body = preg_replace('/<summary\b[^>]*>.*?<\/summary>/is', '', $detailHtml);
            $answer = trim(strip_tags($body));
            $answer = preg_replace('/\s+/', ' ', $answer);

            if (!empty($question) && !empty($answer)) {
                $faqs[] = [
                    '@type' => 'Question',
                    'name' => $question,
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $answer
                    ]
                ];
            }
        }
    }

    return $faqs;
}

// 1. Resolve slug from query parameter or request URI
$rawSlug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if (empty($rawSlug)) {
    $uriPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if (preg_match('#^/blog/([^/]+)#', $uriPath, $m)) {
        $rawSlug = $m[1];
    }
}
$rawSlug = trim($rawSlug, '/');
$cleanSlug = strtolower($rawSlug);

// If no slug provided or accessing admin, fall through to index.html
if (empty($rawSlug) || $cleanSlug === 'admin') {
    $indexFile = file_exists(__DIR__ . '/index.html') ? (__DIR__ . '/index.html') : (__DIR__ . '/dist/index.html');
    if (file_exists($indexFile)) {
        readfile($indexFile);
        exit;
    }
}

// 2. Fetch Blog from MySQL or Fallback JSON
$blog = null;
$pdo = null;

$dsnList = [
    "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
    "mysql:host=127.0.0.1;port={$dbPort};dbname={$dbName};charset=utf8mb4",
    "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4",
    "mysql:unix_socket=/var/lib/mysql/mysql.sock;dbname={$dbName};charset=utf8mb4",
    "mysql:unix_socket=/tmp/mysql.sock;dbname={$dbName};charset=utf8mb4",
    "mysql:unix_socket=/var/run/mysqld/mysqld.sock;dbname={$dbName};charset=utf8mb4"
];

$pdoOptions = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

foreach ($dsnList as $dsn) {
    try {
        $pdo = new PDO($dsn, $dbUser, $dbPass, $pdoOptions);
        if ($pdo) break;
    } catch (Exception $e) {
        $pdo = null;
    }
}

if ($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE (active = 1 OR active IS NULL) AND (status != 'Trash' OR status IS NULL) AND (slug = ? OR _id = ? OR id = ?) LIMIT 1");
        $stmt->execute([$cleanSlug, $rawSlug, $rawSlug]);
        $blog = $stmt->fetch();

        // If not found by direct slug/id, check slugified title
        if (!$blog) {
            $allStmt = $pdo->query("SELECT * FROM blogs WHERE (active = 1 OR active IS NULL) AND (status != 'Trash' OR status IS NULL)");
            $allRows = $allStmt->fetchAll();
            foreach ($allRows as $row) {
                $rowSlug = !empty($row['slug']) ? strtolower(trim($row['slug'])) : slugifyText($row['title']);
                if ($rowSlug === $cleanSlug || (string)$row['id'] === $rawSlug || (string)$row['_id'] === $rawSlug) {
                    $blog = $row;
                    break;
                }
            }
        }
    } catch (Exception $e) {
        error_log('MySQL query error in blog.php: ' . $e->getMessage());
    }
}

// Fallback to JSON files if MySQL is offline or blog not found in DB
if (!$blog) {
    $jsonCandidates = [
        __DIR__ . '/data/blogs.json',
        dirname(__DIR__) . '/data/blogs.json',
        __DIR__ . '/dist/data/blogs.json',
        __DIR__ . '/public/data/blogs.json'
    ];
    foreach ($jsonCandidates as $jf) {
        if (file_exists($jf)) {
            $data = json_decode(file_get_contents($jf), true);
            if (is_array($data)) {
                foreach ($data as $item) {
                    if (isset($item['status']) && $item['status'] === 'Trash') continue;
                    if (isset($item['active']) && $item['active'] == 0) continue;
                    $itemSlug = !empty($item['slug']) ? strtolower(trim($item['slug'])) : slugifyText($item['title'] ?? '');
                    if ($itemSlug === $cleanSlug || (string)($item['id'] ?? '') === $rawSlug || (string)($item['_id'] ?? '') === $rawSlug) {
                        $blog = $item;
                        break 2;
                    }
                }
            }
        }
    }
}

// 3. If Blog Not Found -> 404
if (!$blog) {
    http_response_code(404);
    $indexFile = file_exists(__DIR__ . '/index.html') ? (__DIR__ . '/index.html') : (__DIR__ . '/dist/index.html');
    if (file_exists($indexFile)) {
        $html = file_get_contents($indexFile);
        $html = preg_replace('/<title>.*?<\/title>/is', '<title>Article Not Found | Vellko ERP Blog</title>', $html);
        $html = preg_replace('/<meta name="robots" content=".*?"\s*\/?>/is', '<meta name="robots" content="noindex, nofollow" />', $html);
        echo $html;
        exit;
    }
    echo '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>Article Not Found</h1><p>The requested blog article was not found.</p><p><a href="/blog">Back to Blog</a></p></body></html>';
    exit;
}

// 4. Resolve Metadata
$blogTitle = trim($blog['title'] ?? 'Vellko ERP Blog');
$seoTitle = trim($blog['seoTitle'] ?? '');
$metaDesc = trim($blog['metaDesc'] ?? '');
$focusKeyword = trim($blog['focusKeyword'] ?? 'ERP blog, business management, cloud ERP insights');

// Final Meta Title (Configured SEO title, with fallback to Blog Title | Vellko ERP Blog)
$finalTitle = !empty($seoTitle) ? $seoTitle : ($blogTitle ? "{$blogTitle} | Vellko ERP Blog" : "Vellko ERP Blog");

// Final Meta Description (Configured SEO description, with fallback to clean excerpt)
$cleanExcerpt = extractCleanExcerpt($blog['excerpt'] ?? '', 160);
$finalDescription = !empty($metaDesc) ? $metaDesc : (!empty($cleanExcerpt) ? $cleanExcerpt : "Read insightful ERP analysis on the Vellko ERP blog.");

// Canonical URL
$canonicalUrl = "{$baseUrl}/blog/{$cleanSlug}";

// Featured & OG Image
$rawImg = !empty($blog['ogImg']) ? $blog['ogImg'] : (!empty($blog['image']) ? $blog['image'] : '');
$imageUrl = $defaultImage;
if (!empty($rawImg)) {
    $imageUrl = (strpos($rawImg, 'http') === 0) ? $rawImg : "{$baseUrl}/" . ltrim($rawImg, '/');
}

// OG & Twitter Meta
$ogTitle = !empty($blog['ogTitle']) ? trim($blog['ogTitle']) : $finalTitle;
$ogDesc = !empty($blog['ogDesc']) ? trim($blog['ogDesc']) : $finalDescription;
$twitterTitle = !empty($blog['twitterTitle']) ? trim($blog['twitterTitle']) : $finalTitle;
$twitterDesc = !empty($blog['twitterDesc']) ? trim($blog['twitterDesc']) : $finalDescription;
$twitterCard = !empty($blog['twitterCard']) ? strtolower(str_replace(' ', '_', trim($blog['twitterCard']))) : 'summary_large_image';

$datePublished = formatIsoDate($blog['createdAt'] ?? ($blog['date'] ?? null));
$dateModified = formatIsoDate($blog['updatedAt'] ?? ($blog['createdAt'] ?? ($blog['date'] ?? null)));

// 5. Build Structured Data Schemas
$orgSchema = [
    "@context" => "https://schema.org",
    "@type" => "Organization",
    "@id" => "{$baseUrl}/#organization",
    "name" => "Vellko ERP",
    "url" => "{$baseUrl}/",
    "logo" => [
        "@type" => "ImageObject",
        "url" => "{$baseUrl}/assets/logo-bAy9mXr5.png"
    ],
    "telephone" => "+91-7880107201",
    "email" => "support@vellkoerp.com",
    "founder" => [
        "@type" => "Person",
        "name" => "Deepak Verma"
    ],
    "address" => [
        "@type" => "PostalAddress",
        "streetAddress" => "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
        "addressLocality" => "Bhopal",
        "addressRegion" => "Madhya Pradesh",
        "postalCode" => "462026",
        "addressCountry" => "IN"
    ],
    "contactPoint" => [
        "@type" => "ContactPoint",
        "contactType" => "customer support",
        "telephone" => "+91-7880107201",
        "email" => "support@vellkoerp.com",
        "areaServed" => "IN",
        "availableLanguage" => ["English", "Hindi"]
    ]
];

$blogPostingSchema = [
    "@context" => "https://schema.org",
    "@type" => "BlogPosting",
    "@id" => "{$canonicalUrl}#blogposting",
    "mainEntityOfPage" => [
        "@type" => "WebPage",
        "@id" => $canonicalUrl
    ],
    "headline" => $blogTitle,
    "description" => $finalDescription,
    "image" => [$imageUrl],
    "datePublished" => $datePublished,
    "dateModified" => $dateModified,
    "author" => [
        "@type" => "Organization",
        "@id" => "{$baseUrl}/#organization",
        "name" => "Vellko ERP",
        "url" => "{$baseUrl}/"
    ],
    "publisher" => $orgSchema,
    "inLanguage" => "en-US"
];

$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        [
            "@type" => "ListItem",
            "position" => 1,
            "name" => "Home",
            "item" => "{$baseUrl}/"
        ],
        [
            "@type" => "ListItem",
            "position" => 2,
            "name" => "Blog",
            "item" => "{$baseUrl}/blog"
        ],
        [
            "@type" => "ListItem",
            "position" => 3,
            "name" => $blogTitle,
            "item" => $canonicalUrl
        ]
    ]
];

$schemas = [$blogPostingSchema, $breadcrumbSchema, $orgSchema];

// Automatic FAQPage schema generation only if genuine, visible FAQs exist
$visibleFaqs = extractBlogFaqs($blog['excerpt'] ?? '');
if (!empty($visibleFaqs)) {
    $schemas[] = [
        "@context" => "https://schema.org",
        "@type" => "FAQPage",
        "mainEntity" => $visibleFaqs
    ];
}

$schemaJson = json_encode([
    "@context" => "https://schema.org",
    "@graph" => $schemas
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$schemaScript = "<script type=\"application/ld+json\" id=\"seo-schema\">\n{$schemaJson}\n</script>";

// 6. Load Template and Inject Metadata
$indexCandidates = [
    __DIR__ . '/index.html',
    __DIR__ . '/dist/index.html',
    dirname(__DIR__) . '/dist/index.html',
    dirname(__DIR__) . '/index.html'
];
$templateHtml = '';
foreach ($indexCandidates as $cand) {
    if (file_exists($cand)) {
        $templateHtml = file_get_contents($cand);
        break;
    }
}

if (empty($templateHtml)) {
    // Minimal fallback shell if index.html cannot be read
    $templateHtml = '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title></title><meta name="description" content=""/><link rel="canonical" href=""/></head><body><div id="root"></div></body></html>';
}

$escTitle = htmlspecialchars($finalTitle, ENT_QUOTES, 'UTF-8');
$escDesc = htmlspecialchars($finalDescription, ENT_QUOTES, 'UTF-8');
$escKeywords = htmlspecialchars($focusKeyword, ENT_QUOTES, 'UTF-8');
$escCanonical = htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8');
$escOgTitle = htmlspecialchars($ogTitle, ENT_QUOTES, 'UTF-8');
$escOgDesc = htmlspecialchars($ogDesc, ENT_QUOTES, 'UTF-8');
$escOgImg = htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8');
$escTwitterTitle = htmlspecialchars($twitterTitle, ENT_QUOTES, 'UTF-8');
$escTwitterDesc = htmlspecialchars($twitterDesc, ENT_QUOTES, 'UTF-8');
$escTwitterCard = htmlspecialchars($twitterCard, ENT_QUOTES, 'UTF-8');

// Replace Title
$templateHtml = preg_replace('/<title>.*?<\/title>/is', "<title>{$escTitle}</title>", $templateHtml);

// Replace Meta Description
$templateHtml = preg_replace('/<meta name="description" content=".*?"\s*\/?>/is', '<meta name="description" content="' . $escDesc . '" />', $templateHtml);

// Replace Meta Keywords
if (strpos($templateHtml, '<meta name="keywords"') !== false) {
    $templateHtml = preg_replace('/<meta name="keywords" content=".*?"\s*\/?>/is', '<meta name="keywords" content="' . $escKeywords . '" />', $templateHtml);
} else {
    $templateHtml = str_replace('</head>', "  <meta name=\"keywords\" content=\"{$escKeywords}\" />\n</head>", $templateHtml);
}

// Replace Canonical Link
$templateHtml = preg_replace('/<link rel="canonical" href=".*?"\s*\/?>/is', "<link rel=\"canonical\" href=\"{$escCanonical}\" />", $templateHtml);

// Replace Hreflang Links
$templateHtml = preg_replace('/<link rel="alternate" hreflang="en" href=".*?"\s*\/?>/is', "<link rel=\"alternate\" hreflang=\"en\" href=\"{$escCanonical}\" />", $templateHtml);
$templateHtml = preg_replace('/<link rel="alternate" hreflang="x-default" href=".*?"\s*\/?>/is', "<link rel=\"alternate\" hreflang=\"x-default\" href=\"{$escCanonical}\" />", $templateHtml);

// Replace OpenGraph Tags
$templateHtml = preg_replace('/<meta property="og:title" content=".*?"\s*\/?>/is', "<meta property=\"og:title\" content=\"{$escOgTitle}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta property="og:description" content=".*?"\s*\/?>/is', "<meta property=\"og:description\" content=\"{$escOgDesc}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta property="og:url" content=".*?"\s*\/?>/is', "<meta property=\"og:url\" content=\"{$escCanonical}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta property="og:image" content=".*?"\s*\/?>/is', "<meta property=\"og:image\" content=\"{$escOgImg}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta property="og:type" content=".*?"\s*\/?>/is', '<meta property="og:type" content="article" />', $templateHtml);

// Replace Twitter Card Tags
$templateHtml = preg_replace('/<meta name="twitter:card" content=".*?"\s*\/?>/is', "<meta name=\"twitter:card\" content=\"{$escTwitterCard}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta name="twitter:title" content=".*?"\s*\/?>/is', "<meta name=\"twitter:title\" content=\"{$escTwitterTitle}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta name="twitter:description" content=".*?"\s*\/?>/is', "<meta name=\"twitter:description\" content=\"{$escTwitterDesc}\" />", $templateHtml);
$templateHtml = preg_replace('/<meta name="twitter:image" content=".*?"\s*\/?>/is', "<meta name=\"twitter:image\" content=\"{$escOgImg}\" />", $templateHtml);

// Replace or Inject Schema
if (strpos($templateHtml, 'id="seo-schema"') !== false) {
    $templateHtml = preg_replace('/<script type="application\/ld\+json" id="seo-schema">.*?<\/script>/is', $schemaScript, $templateHtml);
} else {
    $templateHtml = str_replace('</head>', "  {$schemaScript}\n</head>", $templateHtml);
}

// Inject Initial Blog JSON for Seamless Client Hydration
$blogJsonSafe = str_replace(['<', '>'], ['\\u003c', '\\u003e'], json_encode($blog, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
$initScript = "<script>window.__INITIAL_BLOG__ = {$blogJsonSafe};</script>\n";
$templateHtml = str_replace('</head>', "  {$initScript}</head>", $templateHtml);

// 7. Render Output
echo $templateHtml;
