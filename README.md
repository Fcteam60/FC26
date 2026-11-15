# FC 27 Grup Ligi & Turnuva Takip (PWA)

Arkadaş grupları ve bireysel turnuvalar için tasarlanmış, tamamen sunucusuz (serverless), çevrimdışı çalışabilen Progressive Web App (PWA) turnuva ve lig takip uygulaması.

Kura çekimi, grup/eleme veya puan ligi kurulumu, adım adım gol ve asist eşleştirmesi, Opta/StatsBomb tarzı xG/xPts ve Taktiksel DNA (Radar) analizi, paylaşılabilir yüksek çözünürlüklü görseller (Karne, Kura, Maç Kartı, Kariyer Özeti), rozetler ve yedekleme özelliklerini içerir. Veriler yalnızca kullanıcının tarayıcısında (`localStorage`) saklanır; hiçbir sunucuya ağ isteği yapılmaz.

## Dosya Yapısı (Sıfır Bağımlılık & Doğal Modülerlik)

Proje hiçbir derleyiciye (Vite, Webpack vb.) veya harici kütüphaneye ihtiyaç duymaz; doğrudan statik dosya olarak çalışır. Betikler klasik `<script defer>` ile yüklenir (ES modülü değildir); sıra önemlidir: önce `data.js`, sonra `app.js`.

| Dosya | Görev |
|---|---|
| `index.html` | Yalnızca arayüz iskeleti (HTML kabuğu); `style.css`, `data.js` ve `app.js` dosyalarını yükler |
| `style.css` | Tüm stiller (gömülü "FC Sayi" yazı tipi dahil) |
| `app.js` | Tüm uygulama mantığı (Vanilla JS); `initApp()` ile başlatılır |
| `data.js` | 108 takım (`RAW`) ve ~3.200+ oyuncu (`SQ`) veritabanı (bakım kolaylığı için ayrılmıştır) |
| `sw.js` | Service Worker (çevrimdışı çalışma ve arka plan güncelleme mekanizması) |
| `manifest.webmanifest` | PWA kurulum ve ana ekran bilgileri |
| `icon-*.png`, `apple-touch-icon.png` | Uygulama ikonları |
| `DEGISIKLIKLER.md` | Sürüm geçmişi ve yapılan iyileştirmeler |

## Yeni Oyun Çıktığında (Örn. FC 28) Kadroları Güncelleme

Takım ve oyuncu veritabanı `app.js` kodundan bağımsız olarak **`data.js`** dosyasında tutulur:
1. **Takım Güçleri (`RAW`):** `TakımAdı,ÜlkeKodu,Genel,Hücum,OrtaSaha,Defans` biçiminde noktalı virgülle (`;`) ayrılmış metindir.
2. **Takım Kadroları (`SQ`):** Her takım anahtarı altında `OyuncuAdı,Mevki,Genel,Yaş,FormaNo,Durum` (`S`: İlk 11, `B`: Yedek, `R`: Rezerv) biçiminde noktalı virgülle (`;`) ayrılmış metindir.
3. Takım adları değiştiyse eski sezon yedeklerinin sorunsuz eşleşmesi için `app.js` içindeki `ALIAS` nesnesine `"Eski Ad": "Yeni Ad"` eklenmesi yeterlidir.

## Yeni Sürüm Yayınlama

1. `app.js` içindeki `VER` değerini artır (örn. `"17.15"`).
2. `sw.js` içindeki `CACHE` adını artır (örn. `"fc27-lig-v17-15"`).
3. Yeni bir dosya eklediysen `sw.js` içindeki `FILES` listesine de ekle (aksi halde çevrimdışı modda eksik kalır).
4. Değişiklikleri GitHub'a (`git push`) gönder. Kullanıcılar uygulamayı açtığında **"Yeni sürüm var — Yenile"** bildirimi alır ve verileri korunarak güncellenir.

## Önemli Teknik Not

Tarayıcı depolama anahtarları (`fc26lig4` vb.) geriye dönük veri uyumluluğu için **değiştirilmemelidir**; değiştirilirse mevcut kullanıcıların önceki sezon kayıtları görünmez olur.

## Yasal Uyarı (Disclaimer)

Bu proje ticari olmayan, reklamsız, açık kaynaklı ve eğitim/hobi amaçlı geliştirilmiş bağımsız bir topluluk aracıdır. **Electronic Arts Inc. (EA Sports), EA SPORTS FC, FIFA, UEFA** veya uygulamada adı geçen herhangi bir futbol kulübü ya da spor federasyonu ile **hiçbir resmi bağlantısı, ortaklığı, sponsorluğu veya onayı yoktur**. Uygulamadaki kulüp armaları telifli logolar içermez; takım renkleri ve harflerinden jenerik SVG kalkanlar olarak çalışma zamanında üretilir. Tüm ticari markalar ve kulüp/oyuncu adları ilgili sahiplerinin mülkiyetindedir ve yalnızca bilgi/takip amacıyla kullanılmıştır.
