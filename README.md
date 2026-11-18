# FC 27 Grup Ligi & Turnuva Takip (PWA)

Arkadaş grupları ve bireysel turnuvalar için tasarlanmış, tamamen sunucusuz (serverless), çevrimdışı çalışabilen Progressive Web App (PWA) turnuva ve lig takip uygulaması.

Kura çekimi, grup/eleme veya puan ligi kurulumu, adım adım gol ve asist eşleştirmesi, Opta/StatsBomb tarzı xG/xPts ve Taktiksel DNA (Radar) analizi, paylaşılabilir yüksek çözünürlüklü görseller (Karne, Kura, Maç Kartı, Kariyer Özeti), rozetler ve yedekleme özelliklerini içerir. Veriler yalnızca kullanıcının cihazında (**IndexedDB** üzerinde, hiçbir sunucuya ağ isteği yapılmadan) saklanır.

## Dosya Yapısı (Sıfır Bağımlılık & Doğal Modülerlik)

Proje hiçbir derleyiciye (Vite, Webpack vb.) veya harici kütüphaneye ihtiyaç duymaz; doğrudan statik dosya olarak çalışır. Betikler klasik `<script defer>` ile yüklenir (ES modülü değildir); sıra önemlidir: önce `data.js`, sonra `storage.js`, en son `app.js`.

| Dosya | Görev |
|---|---|
| `index.html` | Yalnızca arayüz iskeleti (HTML kabuğu); `style.css`, `data.js`, `storage.js` ve `app.js` dosyalarını yükler |
| `style.css` | Tüm stiller (gömülü "FC Sayi" yazı tipi dahil) |
| `storage.js` | Asenkron depolama katmanı (`kv`), IndexedDB arka ucu, doğrulamalı taşıma protokolü, sıralı yazma kuyruğu (`queueSave`), `BroadcastChannel` çoklu sekme senkronizasyonu ve kota ölçümü (`estimateStorage`) |
| `app.js` | Tüm uygulama mantığı (Vanilla JS); `async initApp()` ile başlatılır |
| `data.js` | 108 takım (`RAW`) ve ~3.200+ oyuncu (`SQ`) veritabanı (bakım kolaylığı için ayrılmıştır) |
| `sw.js` | Service Worker (çevrimdışı çalışma ve arka plan güncelleme mekanizması) |
| `manifest.webmanifest` | PWA kurulum ve ana ekran bilgileri |
| `icon-*.png`, `apple-touch-icon.png` | Uygulama ikonları |
| `DEGISIKLIKLER.md` | Sürüm geçmişi ve yapılan iyileştirmeler |

## Depolama Mimarisi (`storage.js` ve IndexedDB)

Uygulama v18.0+ itibarıyla 5 MB `localStorage` sınırına takılmamak ve yüzlerce sezonluk veriyi güvenle saklamak için **IndexedDB** kullanır:

1. **Veritabanı ve `kv` Katmanı:**
   - Veritabanı adı `fc26lig4`, nesne deposu (object store) adı `kv` olarak yapılandırılmıştır.
   - `kv.get(k)`, `kv.set(k, v)` ve `kv.del(k)` metodları Promise döndürür. Ana uygulama verisi (`fc26lig4`) IndexedDB içinde tek kayıtta (`main`) tutulur.
   - Yıkıcı işlemlerden (birleştirme, yedekle değiştirme, sıfırlama, takım listesi güncellemesi ve bozuk veri yakalama) önce alınan 5 ayrı kurtarma kopyası (`RCV`) doğrudan IndexedDB'de saklanır ve bellek içi `rcvCache` ile senkronize edilir.
2. **Doğrulamalı Taşıma Protokolü (`fc26lig4_idb=1`):**
   - İlk açılışta IndexedDB'de `main` kaydı yoksa ve `localStorage`'da eski `fc26lig4` kaydı varsa veri IndexedDB'ye kopyalanır, geri okunup karakter karakter doğrulanır ve ancak doğrulama başarılı olduğunda `localStorage`'a `fc26lig4_idb=1` bayrağı konulur.
   - Bayrak varken eski `localStorage` kopyası bir daha okunmaz. Kullanıcı dilerse `Ayarlar › Depolama ve kota` kartından eski `localStorage` taşıma yedeğini onay vererek silebilir (`clearLegacyLs`).
3. **Yazma Kuyruğu ve Kapanış Garantisi:**
   - `save()` bellekteki `store` nesnesini anında günceller ve disk yazımını `queueSave()` üzerinden ~200 ms biriktirmeli (batching) sıralı kuyruğa alır.
   - Sekme kapatılırken (`pagehide`) veya arka plana giderken (`visibilitychange`) bekleyen yazma işlemi `flushSaveQueue()` ile beklemeden diske yazılır.
4. **Çoklu Sekme Koruması ve Yedek Plan (Fallback):**
   - Sekmeler arası veri ezilmesini (race condition) önlemek için `BroadcastChannel("fc26lig4_sync")` kullanılır; başka bir sekmede kayıt yapıldığında eski sekmede `st.staleTab` kilidi devreye girer.
   - Tarayıcıda IndexedDB kullanılamıyorsa `storage.js` otomatik olarak `localStorage` moduna düşer. Hata günlüğü (`fc26lig4_log`) ve tema/hareket tercihleri (`fc26lig4_theme`, `fc26lig4_motion`) hızlı erişim için `localStorage`'da tutulur.

## Yeni Oyun Çıktığında (Örn. FC 28) Kadroları Güncelleme

Takım ve oyuncu veritabanı `app.js` kodundan bağımsız olarak **`data.js`** dosyasında tutulur:
1. **Takım Güçleri (`RAW`):** `TakımAdı,ÜlkeKodu,Genel,Hücum,OrtaSaha,Defans` biçiminde noktalı virgülle (`;`) ayrılmış metindir.
2. **Takım Kadroları (`SQ`):** Her takım anahtarı altında `OyuncuAdı,Mevki,Genel,Yaş,FormaNo,Durum` (`S`: İlk 11, `B`: Yedek, `R`: Rezerv) biçiminde noktalı virgülle (`;`) ayrılmış metindir.
3. Takım adları değiştiyse eski sezon yedeklerinin sorunsuz eşleşmesi için `app.js` içindeki `ALIAS` nesnesine `"Eski Ad": "Yeni Ad"` eklenmesi yeterlidir.

## Yeni Sürüm Yayınlama

1. `app.js` içindeki `VER` değerini artır (örn. `"18.27"`).
2. `sw.js` içindeki `CACHE` adını artır (örn. `"fc27-lig-v18-27"`).
3. Yeni bir dosya eklediysen `sw.js` içindeki `FILES` listesine ve `index.html` içerisine ekle (aksi halde çevrimdışı modda eksik kalır).
4. Değişiklikleri GitHub'a (`git push`) gönder. Kullanıcılar uygulamayı açtığında **"Yeni sürüm var — Yenile"** bildirimi alır ve verileri korunarak güncellenir.

## Önemli Teknik Not

Tarayıcı depolama ve veritabanı anahtarları (`fc26lig4`, `fc26lig4_idb` vb.) geriye dönük veri uyumluluğu için **değiştirilmemelidir**; değiştirilirse mevcut kullanıcıların önceki sezon kayıtları görünmez olur.

## Yasal Uyarı (Disclaimer)

Bu proje ticari olmayan, reklamsız, açık kaynaklı ve eğitim/hobi amaçlı geliştirilmiş bağımsız bir topluluk aracıdır. **Electronic Arts Inc. (EA Sports), EA SPORTS FC, FIFA, UEFA** veya uygulamada adı geçen herhangi bir futbol kulübü ya da spor federasyonu ile **hiçbir resmi bağlantısı, ortaklığı, sponsorluğu veya onayı yoktur**. Uygulamadaki kulüp armaları telifli logolar içermez; takım renkleri ve harflerinden jenerik SVG kalkanlar olarak çalışma zamanında üretilir. Tüm ticari markalar ve kulüp/oyuncu adları ilgili sahiplerinin mülkiyetindedir ve yalnızca bilgi/takip amacıyla kullanılmıştır.
