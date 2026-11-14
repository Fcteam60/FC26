# FC 27 Grup Ligi

FC 27 için grup, lig ve turnuva takip uygulaması. Tek dosyalık (`index.html`) bir PWA:
kura, maç ve oyuncu istatistikleri, xG/xPts tahmini, başarımlar ve yedekleme içerir.
Veriler yalnızca kullanıcının tarayıcısında (`localStorage`) saklanır, sunucu yoktur.

## Dosyalar

| Dosya | Görev |
|---|---|
| `index.html` | Uygulamanın tamamı (HTML, CSS, JS) |
| `sw.js` | Service worker (çevrimdışı çalışma, güncelleme) |
| `manifest.webmanifest` | PWA bilgileri |
| `icon-*.png`, `apple-touch-icon.png` | Uygulama ikonları |
| `.nojekyll` | GitHub Pages'in dosyaları olduğu gibi sunmasını sağlar |
| `tests/` | Node testleri (yayın için gerekmez) |

## Testleri çalıştırma

Node.js 18+ gerekir, ek paket kurulumu yoktur.

```bash
npm test
```

## Yeni sürüm yayınlama

1. `index.html` içindeki `VER` değerini artır (örn. `17.7`).
2. `sw.js` içindeki `CACHE` adını artır (örn. `fc27-lig-v17-7`).
3. `tests/run.js` ve `tests/sw-test.js` içindeki sürüm/önbellek adını aynı şekilde güncelle.
4. `npm test` çalıştır, sonra `git push` yap.

Kullanıcılar uygulamayı açınca güncelleme banner'ı görür.

## Önemli not

Depolama anahtarları (`fc26lig4` vb.) uygulama FC 27 olsa da **değiştirilmemelidir**;
değiştirilirse mevcut kullanıcıların kayıtları görünmez olur. Bu adlar yalnızca
tarayıcı içindeki teknik anahtardır, kullanıcıya görünmez.
