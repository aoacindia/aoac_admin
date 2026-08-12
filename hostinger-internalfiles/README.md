# AOAC Internal Files (Hostinger)

Deploy the contents of this folder to the document root of **internalfiles.aoac.in**.

## Files

| File | Purpose |
|------|---------|
| `api.php` | Upload / download / delete API |
| `config.sample.php` | Copy → `config.php` and set `api_key` |
| `uploads/` | Stored files (not directly web-accessible) |
| `.htaccess` | Blocks listing, config, and direct `/uploads/` access |

## Setup

1. Upload this folder to Hostinger for `internalfiles.aoac.in`.
2. Copy `config.sample.php` to `config.php`.
3. Set `api_key` to a long random string (32+ chars).
4. Ensure `uploads/` is writable by PHP.
5. Put the **same** key in the Next.js admin `.env` as `INTERNAL_FILES_API_KEY`.
6. Set `INTERNAL_FILES_BASE_URL=https://internalfiles.aoac.in` (no trailing slash).

## API (server-to-server only)

All requests require header:

```
X-API-Key: <your-secret>
```

### Upload

`POST /api.php?action=upload` (multipart)

- `file` — binary
- `folder` — optional, default `administration`

### Download

`GET /api.php?action=get&path=administration/….pdf`

### Delete

`POST /api.php?action=delete` with JSON `{ "path": "…" }`
