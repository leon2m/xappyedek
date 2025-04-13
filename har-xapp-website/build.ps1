# AR Solutions Web Sitesi Build Tool - PowerShell Version
# Netlify Hata Düzeltme Sürümü

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "   AR Solutions Web Sitesi Build Tool   " -ForegroundColor Yellow
Write-Host "   Netlify Hata Giderme Sürümü   " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

Write-Host "`n1. Bağımlılıkları temizliyorum..." -ForegroundColor Green
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
if (Test-Path "yarn.lock") { Remove-Item -Force "yarn.lock" }

Write-Host "`n2. Bağımlılıkları yüklüyorum..." -ForegroundColor Green
$env:NETLIFY_USE_YARN = "false"
$env:CI = "false"
$env:SKIP_ESLINT_CHECK = "true"
$env:DISABLE_ESLINT_PLUGIN = "true"
npm install --no-package-lock --legacy-peer-deps --no-audit

Write-Host "`n3. Build dosyalarını temizliyorum..." -ForegroundColor Green
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }

Write-Host "`n4. Production build oluşturuyorum..." -ForegroundColor Green
$env:NODE_ENV = "production"
npm run build:netlify

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild başarıyla tamamlandı!" -ForegroundColor Green
    Write-Host "Dosyalar 'out/' klasöründe oluşturuldu."
    Write-Host "`nBu dosyaları Netlify'a manuel olarak yükleyebilirsiniz."
    Write-Host "Veya Netlify site ayarlarında:"
    Write-Host "1. Build command: npm run build:netlify" -ForegroundColor Yellow
    Write-Host "2. Publish directory: out" -ForegroundColor Yellow
    Write-Host "3. Build environment variables:" -ForegroundColor Yellow
    Write-Host "   CI=false" -ForegroundColor Yellow
    Write-Host "   NETLIFY_USE_YARN=false" -ForegroundColor Yellow
    Write-Host "   DISABLE_ESLINT_PLUGIN=true" -ForegroundColor Yellow
    Write-Host "   SKIP_ESLINT_CHECK=true" -ForegroundColor Yellow
}
else {
    Write-Host "`nBuild sırasında bir hata oluştu." -ForegroundColor Red
    Write-Host "Lütfen hata mesajlarını kontrol edin."
    exit 1
}

Write-Host "`n5. Yerel ortamda test ediliyor..." -ForegroundColor Green
Write-Host "Test için: npx serve out" -ForegroundColor Yellow

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "     Build İşlemi Tamamlandı     " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow 