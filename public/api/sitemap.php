<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/xml; charset=utf-8');

function generateSitemapXML() {
    $baseUrl = 'https://vellkoerp.com';
    $dataFile = dirname(__DIR__) . '/data/blogs.json';

    $blogs = [];
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $blogs = $decoded;
        }
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

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

    $xml .= '</urlset>' . "\n";
    return $xml;
}

// Function to write sitemap to disk files
function updateSitemapFiles() {
    $xml = generateSitemapXML();
    $paths = [
        dirname(__DIR__) . '/sitemap.xml',
        dirname(__DIR__) . '/public/sitemap.xml',
        dirname(__DIR__) . '/dist/sitemap.xml'
    ];
    foreach ($paths as $p) {
        $dir = dirname($p);
        if (is_dir($dir)) {
            @file_put_contents($p, $xml);
        }
    }
    return $xml;
}

// If accessed directly via browser/cURL, return the generated XML and update files
$outputXml = updateSitemapFiles();
echo $outputXml;
