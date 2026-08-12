<?php
/**
 * AOAC Internal Files API — deploy to Hostinger at internalfiles.aoac.in
 *
 * Upload this folder so that:
 *   https://internalfiles.aoac.in/api.php
 * is reachable, and `uploads/` sits beside api.php (not publicly browsable).
 *
 * Setup:
 * 1. Copy config.sample.php → config.php
 * 2. Set a long random INTERNAL_FILES_API_KEY (same value as Next.js .env)
 * 3. Ensure uploads/ is writable by PHP (chmod 750 recommended)
 * 4. Keep config.php and uploads/ outside public listing (.htaccess included)
 */

declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store');

// CORS is intentionally not opened: only the Next.js server should call this API.

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'error' => 'Server config missing']);
    exit;
}

/** @var array{api_key:string,max_upload_bytes:int,allowed_mime:array<string,string>} $config */
$config = require $configPath;

function json_out(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function get_bearer_or_header_key(): ?string
{
    $header = $_SERVER['HTTP_X_API_KEY'] ?? '';
    if (is_string($header) && $header !== '') {
        return $header;
    }
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
    if (is_string($auth) && preg_match('/^Bearer\s+(\S+)$/i', $auth, $m)) {
        return $m[1];
    }
    return null;
}

function require_api_key(string $expected): void
{
    $provided = get_bearer_or_header_key();
    if ($provided === null || $expected === '' || !hash_equals($expected, $provided)) {
        json_out(401, ['success' => false, 'error' => 'Unauthorized']);
    }
}

function uploads_root(): string
{
    $root = realpath(__DIR__ . '/uploads');
    if ($root === false) {
        $created = mkdir(__DIR__ . '/uploads', 0750, true);
        if (!$created && !is_dir(__DIR__ . '/uploads')) {
            json_out(500, ['success' => false, 'error' => 'Uploads directory unavailable']);
        }
        $root = realpath(__DIR__ . '/uploads');
        if ($root === false) {
            json_out(500, ['success' => false, 'error' => 'Uploads directory unavailable']);
        }
    }
    return $root;
}

/**
 * Resolve a relative storage path safely (no traversal).
 * Returns absolute path or null.
 */
function resolve_safe_path(string $relative): ?string
{
    $relative = str_replace('\\', '/', $relative);
    $relative = ltrim($relative, '/');
    if ($relative === '' || str_contains($relative, '..')) {
        return null;
    }
    if (!preg_match('#^[a-zA-Z0-9][a-zA-Z0-9._/-]*$#', $relative)) {
        return null;
    }

    $root = uploads_root();
    $full = $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relative);
    $real = realpath($full);
    if ($real === false) {
        // File may not exist yet for upload target dirs — validate parent instead for get
        return null;
    }
    $rootReal = realpath($root);
    if ($rootReal === false || !str_starts_with($real, $rootReal . DIRECTORY_SEPARATOR) && $real !== $rootReal) {
        return null;
    }
    return $real;
}

function sanitize_subdir(string $subdir): string
{
    $subdir = strtolower(trim(str_replace('\\', '/', $subdir), '/'));
    if ($subdir === '') {
        return 'misc';
    }
    if (!preg_match('#^[a-z0-9][a-z0-9_-]{0,63}$#', $subdir)) {
        return 'misc';
    }
    return $subdir;
}

function detect_mime(string $tmpPath, string $originalName): ?string
{
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($tmpPath);
    if (!is_string($mime) || $mime === '') {
        return null;
    }
    // Some hosts report application/octet-stream for PDFs — fall back to extension map carefully
    if ($mime === 'application/octet-stream') {
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $map = [
            'pdf' => 'application/pdf',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'webp' => 'image/webp',
        ];
        return $map[$ext] ?? $mime;
    }
    return $mime;
}

require_api_key((string) ($config['api_key'] ?? ''));

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$action = $_GET['action'] ?? $_POST['action'] ?? null;

if ($method === 'POST' && ($action === 'upload' || $action === null)) {
    if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
        json_out(400, ['success' => false, 'error' => 'Missing file']);
    }

    $file = $_FILES['file'];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        json_out(400, ['success' => false, 'error' => 'Upload failed', 'code' => (int) $file['error']]);
    }

    $maxBytes = (int) ($config['max_upload_bytes'] ?? 10 * 1024 * 1024);
    $size = (int) ($file['size'] ?? 0);
    if ($size <= 0 || $size > $maxBytes) {
        json_out(400, ['success' => false, 'error' => 'File too large or empty']);
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    $originalName = (string) ($file['name'] ?? 'file');
    if ($tmp === '' || !is_uploaded_file($tmp)) {
        json_out(400, ['success' => false, 'error' => 'Invalid upload']);
    }

    $mime = detect_mime($tmp, $originalName);
    $allowed = $config['allowed_mime'] ?? [];
    if (!is_array($allowed) || $mime === null || !isset($allowed[$mime])) {
        json_out(400, ['success' => false, 'error' => 'File type not allowed']);
    }

    $ext = $allowed[$mime];
    $subdir = sanitize_subdir((string) ($_POST['folder'] ?? 'administration'));
    $root = uploads_root();
    $dir = $root . DIRECTORY_SEPARATOR . $subdir;
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        json_out(500, ['success' => false, 'error' => 'Could not create folder']);
    }

    try {
        $token = bin2hex(random_bytes(16));
    } catch (Throwable $e) {
        json_out(500, ['success' => false, 'error' => 'Could not generate filename']);
    }

    $filename = date('Ymd') . '_' . $token . '.' . $ext;
    $dest = $dir . DIRECTORY_SEPARATOR . $filename;
    if (!move_uploaded_file($tmp, $dest)) {
        json_out(500, ['success' => false, 'error' => 'Failed to store file']);
    }
    @chmod($dest, 0640);

    $relative = $subdir . '/' . $filename;
    json_out(200, [
        'success' => true,
        'path' => $relative,
        'filename' => $filename,
        'mime' => $mime,
        'size' => $size,
    ]);
}

if ($method === 'GET' && $action === 'get') {
    $path = (string) ($_GET['path'] ?? '');
    $absolute = resolve_safe_path($path);
    if ($absolute === null || !is_file($absolute)) {
        json_out(404, ['success' => false, 'error' => 'File not found']);
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($absolute) ?: 'application/octet-stream';
    $downloadName = basename($absolute);

    header('Content-Type: ' . $mime);
    header('Content-Length: ' . (string) filesize($absolute));
    header('Content-Disposition: inline; filename="' . rawurlencode($downloadName) . '"');
    header('X-Content-Type-Options: nosniff');
    readfile($absolute);
    exit;
}

if ($method === 'POST' && $action === 'delete') {
    $raw = file_get_contents('php://input') ?: '';
    $body = json_decode($raw, true);
    $path = is_array($body) ? (string) ($body['path'] ?? '') : '';
    $absolute = resolve_safe_path($path);
    if ($absolute === null || !is_file($absolute)) {
        json_out(404, ['success' => false, 'error' => 'File not found']);
    }
    if (!@unlink($absolute)) {
        json_out(500, ['success' => false, 'error' => 'Failed to delete file']);
    }
    json_out(200, ['success' => true]);
}

json_out(405, ['success' => false, 'error' => 'Method or action not allowed']);
