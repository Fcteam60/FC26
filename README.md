# FC 27 Grup Ligi & Turnuva Takip (PWA · v23.6)

Arkadaş grupları ve bireysel turnuvalar için tasarlanmış, sıfır bağımlılıklı, çevrimdışı çalışabilen Progressive Web App (PWA) turnuva ve menajerlik takip uygulaması.

Kura çekimi, grup/eleme veya puan usulü lig kurulumu, gerçekçi maç simülasyonu, adım adım gol ve asist eşleştirmesi, Opta/StatsBomb tarzı xG/xPts ve Taktiksel DNA (Radar) analizi, **Firebase Realtime Database REST tabanlı Canlı Menajer Düellosu (VS)**, 9 farklı 1080px+ Broadcast PNG poster üreticisi, rozetler ve JSON yedekleme özelliklerini içerir.

Ana turnuva verileri tamamen kullanıcının cihazında (**IndexedDB**) saklanır; yalnızca kullanıcı ortak bir Düello Oda Kodu girdiğinde hafif kariyer/sezon özeti isteğe bağlı olarak buluta eşitlenir.

## Dosya Yapısı (Sıfır Bağımlılık & Doğal Modülerlik)

Proje hiçbir derleyiciye (Vite, Webpack vb.) veya harici SDK'ya ihtiyaç duymaz; doğrudan statik dosya olarak çalışır. Betikler klasik `<script defer>` ile yüklenir; yükleme sırası önemlidir (`data → storage → sim → analytics → duel → posters → app`).

| Dosya | Görev |
|---|---|
| `index.html` | Arayüz iskeleti (HTML kabuğu), tema/hareket ön yükleyicisi ve sürüm etiketli varlık bağları |
| `style.css` | Tüm stiller, 3 katmanlı navigasyon (obsidiyen alt dock · alt çizgili sekmeler · ince filtreler) ve gömülü "FC Sayi" yazı tipi |
| `data.js` | 108 kulüp (`RAW`), 3.200+ oyuncu kadrosu (`SQ`) ve 99 kulüp arması eşleme haritası (`LOGOS`) |
| `storage.js` | Asenkron depolama katmanı (`kv`), IndexedDB arka ucu, doğrulamalı taşıma protokolü, sıralı yazma kuyruğu (`queueSave`), `BroadcastChannel` çoklu sekme kilidi ve kurtarma kopyaları |
| `sim.js` | Gerçekçi, Dengeli ve Sürprizli maç simülasyon motoru, puan tablosu ve eleme ağacı eşleştiricisi |
| `analytics.js` | xG/xPts analitiği, hak ediş sınıflandırması, 4 eksenli Taktiksel DNA radarı, kariyer ve ödül istatistikleri |
| `duel.js` | Canlı Menajer Düellosu (VS), tek kaynaklı 10 kriterli değerlendirme motoru, 100 sezonluk arşiv, Sezon/Kulüp stüdyoları, Canlı Sezon inceleme modalı ve zaman aşımı korumalı (`AbortController`) Firebase REST istemcisi |
| `posters.js` | 9 farklı 1080px+ Canvas PNG poster üreticisi (Kura, Eleme Ağacı, TOTS, Maç Kartı, Sezon Karnesi, Kariyer Özeti, 1v1 Düello, Sezon vs. Sezon, Kulüp vs. Kulüp) |
| `app.js` | Ana uygulama orkestrasyonu, yönlendirme, olay yöneticileri ve `async initApp()` başlatıcısı |
| `sw.js` | Service Worker (çevrimdışı önbellekleme, kalıcı `LOGO_CACHE` ve arka plan güncelleme mekanizması) |
| `logos/` | 99 kulübün PNG armaları |
| `manifest.webmanifest` | PWA kurulum, ikon ve ana ekran kısayol tanımları |
| `KILAVUZ.md` | Son kullanıcı için güncel kullanım kılavuzu |
| `DEGISIKLIKLER.md` | Sürüm geçmişi ve yapılan iyileştirmeler |

## Depolama & Senkronizasyon Mimarisi

1. **Cihaz İçi Depolama (`storage.js` · IndexedDB):**
   - Veritabanı adı `fc26lig4`, nesne deposu `kv` olarak yapılandırılmıştır; 5 MB `localStorage` sınırına takılmadan yüzlerce sezonu güvenle saklar.
   - Yıkıcı işlemlerden önce otomatik 5 kurtarma kopyası (`RCV`) alınır; çoklu sekme veri ezilmelerine karşı `BroadcastChannel("fc26lig4_sync")` kilidi aktiftir.
2. **İsteğe Bağlı Canlı Düello Eşitlemesi (`duel.js` · Firebase REST):**
   - Harici Firebase SDK kullanılmadan doğrudan REST API (`PUT`/`GET`/`DELETE`) ve 8 saniyelik `AbortController` zaman aşımı ile çalışır.
   - Her menajerin özeti (~8–12 KB, son 100 sezon dahil) ortak oda kodu altında tutulur; ekran içi etkileşimler önbellekli `buildDuelSummary()` üzerinden sıfır gecikmeyle çalışır.

## Yeni Oyun Çıktığında (Örn. FC 28) Kadroları Güncelleme

Takım ve oyuncu veritabanı **`data.js`** dosyasında tutulur:
1. **Takım Güçleri (`RAW`):** `TakımAdı,ÜlkeKodu,Genel,Hücum,OrtaSaha,Defans` biçiminde `;` ile ayrılmış metindir.
2. **Takım Kadroları (`SQ`):** `OyuncuAdı,Mevki,Genel,Yaş,FormaNo,Durum` (`S`: İlk 11, `B`: Yedek, `R`: Rezerv).
3. Takım adları değiştiyse eski sezon yedeklerinin sorunsuz eşleşmesi için `app.js` içindeki `ALIAS` nesnesine `"Eski Ad": "Yeni Ad"` eklenmesi yeterlidir.

## Yeni Sürüm Yayınlama

1. `app.js` (`VER`), `duel.js` başlığı, `package.json` (`version`), `index.html` (`?v=...`), `manifest.webmanifest` (`?v=...`) ve `sw.js` (`CACHE` + `FILES`) içindeki sürüm etiketlerini güncelleyin.
2. Değişiklikleri GitHub'a gönderin; kullanıcılar uygulamayı açtığında **"Yeni sürüm var — Yenile"** bildirimi ile verileri korunarak güncellenir.

## Önemli Teknik Not

Tarayıcı depolama ve veritabanı anahtarları (`fc26lig4`, `fc26lig4_idb`, `fc27lig_duel_cfg` vb.) geriye dönük veri uyumluluğu için **değiştirilmemelidir**.

## Yasal Uyarı (Disclaimer)

Bu proje ticari olmayan, reklamsız, bağımsız bir hobi/takip uygulamasıdır. **Electronic Arts Inc. (EA Sports), EA SPORTS FC, FIFA, UEFA** veya adı geçen kulüp/federasyonlarla hiçbir resmi bağlantısı yoktur. Tüm ticari markalar ilgili sahiplerinin mülkiyetindedir.
