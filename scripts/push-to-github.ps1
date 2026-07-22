# Run after: gh auth login
# Creates public repo HENE.com and pushes local main.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

gh auth status
gh repo create "HENE.com" --public --source=. --remote=origin --push

Write-Host "Done. Enable Pages: Settings → Pages → Source: GitHub Actions"
Write-Host "Site will be at: https://$((gh api user --jq .login)).github.io/HENE.com/"
