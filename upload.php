<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$uploadDir = 'uploads/'; // Folder where images will be stored
$maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check if file was uploaded
if (!isset($_FILES['file'])) {
    echo json_encode([
        'success' => false,
        'error' => 'No file uploaded'
    ]);
    exit;
}

$file = $_FILES['file'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode([
        'success' => false,
        'error' => 'Upload error: ' . $file['error']
    ]);
    exit;
}

// Check file size
if ($file['size'] > $maxFileSize) {
    echo json_encode([
        'success' => false,
        'error' => 'File size exceeds 1MB limit'
    ]);
    exit;
}

// Check file type
$fileType = mime_content_type($file['tmp_name']);
if (!in_array($fileType, $allowedTypes)) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid file type. Only images are allowed.'
    ]);
    exit;
}

// Generate unique filename
$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = uniqid('img_', true) . '_' . time() . '.' . $fileExtension;
$filePath = $uploadDir . $fileName;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Construct the full URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $baseUrl = $protocol . '://' . $host;
    $fileUrl = $baseUrl . '/' . $filePath;
    
    echo json_encode([
        'success' => true,
        'url' => $fileUrl,
        'filename' => $fileName
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to move uploaded file'
    ]);
}
?>

