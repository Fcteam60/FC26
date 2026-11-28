# FC 27 Grup Ligi & Turnuva Takip (PWA · v26.5)

Arkadaş grupları ve bireysel kariyerler için tasarlanmış, sıfır bağımlılıklı, çevrimdışı çalışabilen Progressive Web App (PWA) futbol turnuva ve menajerlik takip uygulaması.

**108 kulüplük güncel FC 27 veritabanı** (3.262 oyuncu ve 108/108 PNG arma), 3 hazır Avrupa kupası şablonu (**Şampiyonlar Ligi**, **Avrupa Ligi**, **Konferans Ligi**) ve her şablona özel tam ekran **9:16 dinamik turnuva arka planı**, gerçekçi Poisson simülasyonu, **2 Kişilik Ortak Turnuva (2P)**, **Canlı Menajer Düellosu (VS)**, **11 farklı 1080px+ Broadcast PNG poster** ve katlanabilir uzun kariyer analitiği sunar.

Ana turnuva verileri tamamen cihazında (**IndexedDB**) saklanır; yalnızca isteğe bağlı **2P Ortak Turnuva** veya **Menajer Düellosu** odası açıldığında ilgili oda verisi Firebase Realtime Database (REST) üzerinden eşitlenir.

## Dosya Yapısı (Sıfır Bağımlılık & Doğal Modülerlik)

Proje derleyici veya harici SDK gerektirmez; doğrudan statik dosya olarak çalışır. Betik yükleme sırası önemlidir (`data → storage → sim → analytics → duel → posters → coop → app`).

| Dosya | Görev |
|---|---|
| `index.html` | HTML iskeleti, yakınlaştırma kilitli native PWA viewport, flaşsız tema/turnuva arka planı ön yükleyicisi ve `#cupbg` katmanı |
| `style.css` | Açık/koyu tema, 5 renk paleti, 3 dinamik turnuva koyu buzlu cam atmosferi (`UCL/UEL/UECL`) ve tüm bileşen stilleri |
| `data.js` | 108 kulüp, 3.262 oyuncu kadrosu (`SQ`), 108 PNG arma eşlemesi (`LOGOS`), kulüp renkleri ve bayraklar |
| `storage.js` | IndexedDB depolama katmanı, sıralı yazma kuyruğu, 5 kurtarma kopyası ve `BroadcastChannel` çoklu sekme kilidi |
| `sim.js` | Poisson maç simülasyonu, 36T İsviçre ŞL fikstürü, grup/eleme/lig motoru, 4-3-3 En İyi 11 ve ortak `autoMatchMom()` |
| `analytics.js` | Maç/Kadro istatistikleri, xG/xPts, Taktiksel DNA (Radar), Beklenene Göre Performans, Takım Gücü ve Turnuva Evreni |
| `duel.js` | Firebase REST tabanlı Canlı Menajer Düellosu (VS), radar kıyas ve canlı sezon takibi |
| `posters.js` | Canvas 2D tabanlı 11 farklı 1080px+ Broadcast PNG poster üreticisi (1P + 2P) |
| `coop.js` | 2 Kişilik Ortak Turnuva (2P) — ortak oda, CSPRNG oda kodu, Son Odalar geçmişi, sezon adı düzenleme ve 2P posterleri |
| `app.js` | Ana uygulama durumu, 5 sekmeli navigasyon, kurulum/kura/maç girişi, oyuncu/kadro profilleri ve yedekleme |
| `sw.js` | Çevrimdışı Service Worker önbelleği (`fc27-lig-v26-5`), kalıcı arma önbelleği ve 3 turnuva arka planı ön-önbelleği |
| `bg-ucl.jpg` / `bg-uel.jpg` / `bg-uecl.jpg` | Şampiyonlar Ligi, Avrupa Ligi ve Konferans Ligi için optimize edilmiş 9:16 dikey arka plan görselleri |
| `tests/smoke.mjs` | Sıfır bağımlılıklı Node otomatik doğrulama betiği (`npm test`) |

## Öne Çıkan Özellikler

* **3 Hazır Kupa Şablonu & Yayın Atmosferi:** Tek dokunuşla *Konferans Ligi* (`≤76 GEN`), *Avrupa Ligi* (`75–78 GEN`) ve *Şampiyonlar Ligi* (`36T İsviçre, 77+ GEN`) kurulumu; seçilen şablona göre tam ekran arka plan, koyu buzlu cam kartlar ve turnuva renk vurguları otomatik devreye girer (`Ayarlar › Görünüm` üzerinden istenildiğinde kapatılabilir).
* **2 Kişilik Ortak Turnuva (2P):** Arkadaşınla aynı grupta, puan liginde veya 36T Şampiyonlar Ligi’nde yarış; **Son Odalar** ile tek dokunuşla geri bağlan, ortak sezon adını özelleştir ve 4 özel 2P posteri üret.
* **11 Broadcast PNG Poster:** Kura, Grup/Lig Tablosu, Eleme Ağacı, Maç Kartı, 2 Sayfalık Sezon Karnesi, Kariyer Özeti, Turnuvanın En İyi 11’i (TOTS), Menajer Düellosu ve 2P Ortak Turnuva posterleri.
* **Uzun Kariyer Ergonomisi:** Katlanabilir Evren/Performans/Kronoloji/Sezon/Rakip listeleri, `Gol Kralları | MVP’ler` 2’li sekmesi ve doğrudan oyuncu profili açılışı.

## Geliştirme & Doğrulama

```bash
npm test
```

Komut `tests/smoke.mjs` üzerinden 9 JS dosyasının sözdizimini, 108/108 kulüp-kadro-arma bütünlüğünü, 0 sembol çakışmasını, CSS parantez dengesini, `data-a` aksiyon kapsamını ve sürüm tutarlılığını doğrular.

## Kurulum (GitHub Pages)

Paketteki dosyaları deponun ana dizinine yükleyip (mevcut `logos/` klasörünü ve PNG uygulama ikonlarını koruyarak) GitHub Pages üzerinden yayınlayabilirsin.
