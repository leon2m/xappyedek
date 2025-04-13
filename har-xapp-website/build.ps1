# AR Solutions Web Sitesi Build Tool - PowerShell Version

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "   AR Solutions Web Sitesi Build Tool   " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

Write-Host "`n1. Bağımlılıkları kontrol ediyorum..." -ForegroundColor Green
npm install

Write-Host "`n2. Proje dosyalarını temizliyorum..." -ForegroundColor Green
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }

Write-Host "`n3. Lint kontrolü yapılıyor..." -ForegroundColor Green
npm run lint

Write-Host "`n4. Production build oluşturuluyor..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild başarıyla tamamlandı!" -ForegroundColor Green
    Write-Host "Dosyalar 'out/' klasöründe oluşturuldu."
    Write-Host "`nBu dosyaları hosting sağlayıcınıza yükleyebilirsiniz."
    Write-Host "Örnek olarak yerel ortamda test etmek için: npx serve out" -ForegroundColor Yellow
}
else {
    Write-Host "`nBuild sırasında bir hata oluştu." -ForegroundColor Red
    Write-Host "Lütfen hata mesajlarını kontrol edin."
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "     Build İşlemi Tamamlandı     " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow 