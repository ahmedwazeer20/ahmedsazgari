# Simple local static file server for previewing this site.
# Usage: right-click this file -> "Run with PowerShell", then open http://localhost:5500 in your browser.
# Needed because fetch('nav.html') / fetch('footer.html') only work over http(s), not when a page
# is opened directly as a file:// URL (double-clicking an .html file).

$port = 5500
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Serving '$root' at http://localhost:$port/  (Ctrl+C to stop)"
Start-Process "http://localhost:$port/index.html"

$mime = @{
  ".html" = "text/html"; ".htm" = "text/html"; ".js" = "application/javascript"
  ".css" = "text/css"; ".json" = "application/json"
  ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".png" = "image/png"; ".gif" = "image/gif"
  ".svg" = "image/svg+xml"; ".ico" = "image/x-icon"
  ".mp4" = "video/mp4"; ".webm" = "video/webm"; ".mov" = "video/quicktime"
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.LocalPath.TrimStart('/'))
    if ($path -eq "") { $path = "index.html" }
    $full = Join-Path $root $path

    if (Test-Path $full -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($full)
      $ct = $mime[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $ctx.Response.ContentType = $ct
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
    }
    $ctx.Response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
}
