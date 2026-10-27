<?php
$slug = $argv[1] ?? '';
$_GET['slug'] = $slug;

ob_start();
include __DIR__ . '/../public/blog.php';
$out = ob_get_clean();

preg_match('/<title>(.*?)<\/title>/i', $out, $tm);
preg_match('/<meta name="description" content="(.*?)"/i', $out, $dm);
preg_match('/<link rel="canonical" href="(.*?)"/i', $out, $cm);
preg_match('/<script type="application\/ld\+json" id="seo-schema">([\s\S]*?)<\/script>/i', $out, $sm);

$schemaJson = !empty($sm[1]) ? json_decode($sm[1], true) : null;
$types = [];
if ($schemaJson && isset($schemaJson['@graph'])) {
    foreach ($schemaJson['@graph'] as $g) {
        if (!empty($g['@type'])) $types[] = $g['@type'];
    }
}

echo json_encode([
    'title' => $tm[1] ?? '',
    'desc' => $dm[1] ?? '',
    'canonical' => $cm[1] ?? '',
    'hasSchema' => !empty($sm[1]),
    'validJson' => ($schemaJson !== null),
    'types' => $types
]);
