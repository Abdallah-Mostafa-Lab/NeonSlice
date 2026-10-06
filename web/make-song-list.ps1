# Writes Songs\index.json: the list of map folders and map .zip files that the
# game reads. Run "Make song list.bat" after adding or removing maps, then
# upload the Songs folder (with index.json) to your web host.

$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Split-Path -Parent (Split-Path -Parent $PSCommandPath)))
$songsDir = Join-Path $root 'Songs'
if (-not (Test-Path -LiteralPath $songsDir -PathType Container)) {
  New-Item -ItemType Directory -Path $songsDir | Out-Null
}
$names = @(Get-ChildItem -LiteralPath $songsDir | Where-Object { $_.PSIsContainer -or $_.Extension -ieq '.zip' } |
  Sort-Object Name | ForEach-Object { $_.Name })
$json = '[' + (($names | ForEach-Object { ConvertTo-Json -InputObject $_ -Compress }) -join ',') + ']'
[IO.File]::WriteAllText((Join-Path $songsDir 'index.json'), $json, (New-Object Text.UTF8Encoding $false))
Write-Host ''
Write-Host "  Wrote Songs\index.json with $($names.Count) maps:" -ForegroundColor Green
$names | ForEach-Object { Write-Host "   - $_" }
Write-Host ''
Write-Host '  Upload the whole Songs folder (including index.json) to your web host.'
Write-Host ''
