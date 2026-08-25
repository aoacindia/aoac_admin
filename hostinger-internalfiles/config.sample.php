<?php
/**
 * Copy this file to config.php on the Hostinger server and set api_key.
 * NEVER commit config.php with a real key.
 */
return [
    // Must match INTERNAL_FILES_API_KEY in the Next.js admin .env
    'api_key' => 'REPLACE_WITH_LONG_RANDOM_SECRET_AT_LEAST_32_CHARS',

    // 10 MB (client compresses larger files down to this before upload)
    'max_upload_bytes' => 10 * 1024 * 1024,

    // mime => extension
    'allowed_mime' => [
        'application/pdf' => 'pdf',
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ],
];
