# Neon Slice local launcher.
# Serves the NeonSlice folder on http://localhost so the game can read the
# Songs folder, then opens the game in your default browser.
# Close this window to stop the game server.

$ErrorActionPreference = 'Stop'
# BeatSaver needs TLS 1.2; older Windows PowerShell defaults lack it.
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.IO.Compression.FileSystem
$bsApi = 'https://api.beatsaver.com'
$root = [IO.Path]::GetFullPath((Split-Path -Parent (Split-Path -Parent $PSCommandPath)))
if (-not $root.EndsWith('\')) { $root += '\' }

$types = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.json' = 'application/json'; '.dat' = 'application/json'
  '.egg' = 'audio/ogg'; '.ogg' = 'audio/ogg'; '.wav' = 'audio/wav'; '.mp3' = 'audio/mpeg'
  '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.png' = 'image/png'; '.svg' = 'image/svg+xml'
}

$listener = $null
$port = 0
foreach ($p in 8080..8090) {
  $l = New-Object System.Net.HttpListener
  $l.Prefixes.Add("http://localhost:$p/")
  try { $l.Start(); $listener = $l; $port = $p; break } catch { $l.Close() }
}
if (-not $listener) {
  Write-Host 'Could not start: ports 8080-8090 are all in use.' -ForegroundColor Red
  Read-Host 'Press Enter to close'
  exit 1
}

$url = "http://localhost:$port/web/"
Write-Host ''
Write-Host '  NEON SLICE' -ForegroundColor Magenta
Write-Host "  Playing at $url"
Write-Host "  Songs folder: $($root)Songs"
Write-Host '  Add or remove song folders, then reload the page to rescan.'
Write-Host '  Close this window to stop.'
Write-Host ''
Start-Process $url

function Send($res, [byte[]]$bytes, $type) {
  $res.ContentType = $type
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
}

function SendJson($res, $obj, [int]$status = 200) {
  $res.StatusCode = $status
  Send $res ([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -InputObject $obj -Compress -Depth 4))) 'application/json'
}

# Only https BeatSaver hosts may be fetched on the game's behalf.
function Test-BeatSaverUrl([string]$u) {
  $uri = $null
  if (-not [Uri]::TryCreate($u, [UriKind]::Absolute, [ref]$uri)) { return $false }
  return ($uri.Scheme -eq 'https') -and ($uri.Host -match '(^|\.)beatsaver\.com$')
}

function New-Web {
  $wc = New-Object System.Net.WebClient
  $wc.Headers.Add('User-Agent', 'NeonSlice/1.0 (local launcher)')
  return $wc
}

function Get-Remote($res, [string]$u) {
  $wc = New-Web
  try {
    $bytes = $wc.DownloadData($u)
    $type = $wc.ResponseHeaders['Content-Type']
    if (-not $type) { $type = 'application/octet-stream' }
    Send $res $bytes $type
  }
  catch {
    $code = 502
    $r = $_.Exception.InnerException.Response
    if (-not $r) { $r = $_.Exception.Response }
    if ($r -and $r.StatusCode) { $code = [int]$r.StatusCode }
    SendJson $res @{ ok = $false; error = 'BeatSaver could not be reached.' } $code
  }
  finally { $wc.Dispose() }
}

# Download a map zip and unpack it into Songs\<name>.
function Install-Map([string]$key, [string]$zipUrl, [string]$name) {
  if ($key -notmatch '^[0-9a-fA-F]{1,6}$') { throw 'Bad map key.' }
  if (-not (Test-BeatSaverUrl $zipUrl)) { throw 'Downloads are only allowed from BeatSaver.' }
  $bad = [IO.Path]::GetInvalidFileNameChars()
  if (-not $name -or $name.Length -gt 120 -or $name.IndexOfAny($bad) -ge 0 -or $name.Contains('..') -or
      -not $name.StartsWith("$key (", [StringComparison]::OrdinalIgnoreCase)) { throw 'Bad folder name.' }
  $songsDir = Join-Path $root 'Songs'
  if (-not (Test-Path -LiteralPath $songsDir)) { New-Item -ItemType Directory -Path $songsDir | Out-Null }
  $dest = Join-Path $songsDir $name
  if (Test-Path -LiteralPath $dest) { return $name }   # already installed
  # Same map under another folder name? Reuse it.
  $existing = Get-ChildItem -LiteralPath $songsDir -Directory | Where-Object { $_.Name -like "$key (*" } | Select-Object -First 1
  if ($existing) { return $existing.Name }

  $tmp = Join-Path ([IO.Path]::GetTempPath()) ('neonslice-' + [Guid]::NewGuid().ToString('N'))
  $zip = "$tmp.zip"
  try {
    $wc = New-Web
    try { $wc.DownloadFile($zipUrl, $zip) } finally { $wc.Dispose() }
    [IO.Compression.ZipFile]::ExtractToDirectory($zip, $tmp)
    # Maps keep Info.dat at the top; some zips wrap everything in one folder.
    $info = Get-ChildItem -LiteralPath $tmp -Recurse -File | Where-Object { $_.Name -ieq 'info.dat' } |
      Sort-Object { $_.FullName.Length } | Select-Object -First 1
    if (-not $info) { throw 'The download is not a Beat Saber map (no Info.dat).' }
    Move-Item -LiteralPath $info.DirectoryName -Destination $dest
    return $name
  }
  finally {
    Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
    if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue }
  }
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $res.Headers.Add('Cache-Control', 'no-store')
    $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq '' -or $rel -eq 'web') {
      $res.Redirect($url)
    }
    elseif ($rel.StartsWith('__neon/') -and (
        ($req.Headers['Sec-Fetch-Site'] -in @('cross-site', 'same-site')) -or
        ($req.Headers['Origin'] -and $req.Headers['Origin'] -ne "http://localhost:$port"))) {
      # Only the game page itself may use the launcher's BeatSaver routes.
      $res.StatusCode = 403
    }
    elseif ($rel -eq '__neon/ping') {
      SendJson $res @{ launcher = $true }
    }
    elseif ($rel -eq '__neon/api') {
      # BeatSaver API on the game's behalf, e.g. path=/search/text/0?sortOrder=Rating
      $apiPath = [string]$req.QueryString['path']
      if (-not $apiPath.StartsWith('/') -or $apiPath.Contains('..') -or $apiPath.Contains('://') -or $apiPath.Contains('@')) {
        SendJson $res @{ ok = $false; error = 'Bad request.' } 400
      }
      else { Get-Remote $res ($bsApi + $apiPath) }
    }
    elseif ($rel -eq '__neon/cdn') {
      # Covers and previews.
      $u = [string]$req.QueryString['url']
      if (Test-BeatSaverUrl $u) { Get-Remote $res $u }
      else { SendJson $res @{ ok = $false; error = 'Only BeatSaver files are allowed.' } 403 }
    }
    elseif ($rel -eq '__neon/install') {
      try {
        $q = $req.QueryString
        $folder = Install-Map ([string]$q['key']) ([string]$q['url']) ([string]$q['name'])
        Write-Host "  Installed: $folder" -ForegroundColor Green
        SendJson $res @{ ok = $true; folder = $folder }
      }
      catch {
        Write-Host "  Install failed: $($_.Exception.Message)" -ForegroundColor Yellow
        SendJson $res @{ ok = $false; error = $_.Exception.Message } 502
      }
    }
    elseif ($rel -ieq 'Songs/index.json') {
      # The game asks for this list to find every map folder.
      $songsDir = Join-Path $root 'Songs'
      $names = @()
      if (Test-Path -LiteralPath $songsDir -PathType Container) {
        $names = @(Get-ChildItem -LiteralPath $songsDir -Directory | ForEach-Object { $_.Name })
      }
      $json = '[' + (($names | ForEach-Object { ConvertTo-Json -InputObject $_ -Compress }) -join ',') + ']'
      Send $res ([Text.Encoding]::UTF8.GetBytes($json)) 'application/json'
    }
    else {
      $path = [IO.Path]::GetFullPath((Join-Path $root ($rel -replace '/', '\')))
      if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
        $res.StatusCode = 403
      }
      elseif (Test-Path -LiteralPath $path -PathType Container) {
        $index = Join-Path $path 'index.html'
        if (Test-Path -LiteralPath $index -PathType Leaf) { Send $res ([IO.File]::ReadAllBytes($index)) $types['.html'] }
        else { $res.StatusCode = 404 }
      }
      elseif (Test-Path -LiteralPath $path -PathType Leaf) {
        $ext = [IO.Path]::GetExtension($path).ToLower()
        $type = $types[$ext]
        if (-not $type) { $type = 'application/octet-stream' }
        Send $res ([IO.File]::ReadAllBytes($path)) $type
      }
      else {
        $res.StatusCode = 404
      }
    }
  }
  catch {
    try { $res.StatusCode = 500 } catch { }
  }
  finally {
    try { $res.OutputStream.Close() } catch { }
  }
}
