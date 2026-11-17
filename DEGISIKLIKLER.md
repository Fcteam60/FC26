# Değişiklik listesi

## v18.11 (Düzeltme & Performans Aşama 3: Çift `JSON.stringify` İptali, İndis Tabanlı Golcü Sıkıştırması ve Budama)
- **Çift `JSON.stringify(store)` yükü kaldırıldı (`lastSavedRaw`):** Her tıklamada geri alma (`undo`) için tüm `store` nesnesini baştan serileştirmek yerine bir önceki kayıtta üretilen `lastSavedRaw` önbelleği kullanılır; `quotaCard` da aynı önbellekten boyut okur. Tıklama başına CPU yükü yarıya indirildi.
- **Kadro sıra indisiyle golcü sıkıştırması ve sezon sonu budama (`pickSimScorer`, `pruneSimDetails`):** Simüle edilen maçlarda gol atan oyuncular uzun metin dizileri yerine kadrodaki sıra indisiyle (`0, 1, 2...`) saklanır; turnuva tamamlandığında (`finishTournament`) gol krallığı özeti (`s.sim.sc`) korunarak alt maçlardaki geçici golcü dizileri budanır (~%70 boyut tasarrufu).
- **Gereksiz `withSn` sarmalayıcıları temizlendi:** Doğrudan `RT(s, i)` ve `simPowerOf(s, i)` kullanan `simNextWeek` ve `simKoStage` fonksiyonlarındaki global `T` değiştiren `withSn` sarmalayıcıları kaldırıldı.
- `VER` 18.11, `package.json` 18.11.0, `sw.js` önbelleği `fc27-lig-v18-11`.


## v18.10 (Düzeltme & Arayüz Aşama 2: Yeni Nesil Gerçekçi Simülasyon Motoru ve 4 Çeyrekli Çapraz Eşleşme)
- **İlk 11, Yıldız Hücumcu ve Kaleci Etkili Güç Profili (`squadMetricsOf`, `simPowerOf`):** Simülasyon artık yalnızca takımın kaba genel gücüne değil; `data.js` kadrosundaki **İlk 11 (`t="S"`) ortalamasına**, **en iyi 3 hücum/orta saha yıldızının (`star`) bitiriciliğine** ve **as kalecinin (`gk`) kurtarış gücüne** göre hesaplanır.
- **Doğrusal Olmayan (Non-Linear) Güç Baskınlığı ve Seri Başı Avantajı (`simMatchScore`, `simOneKoTie`):** İki takım arasındaki efektif güç farkı 2.5 puanı aştığında güçlü takımın oyun üstünlüğü üstel olarak artar ve zayıf takımın gol beklentisi ($\lambda$) bastırılır. Uzatma (`UZ`) ve seri penaltılarda (`P`) kaleci ve yıldız oyuncu kalitesi sonucu doğrudan etkiler.
- **4 Çeyrekli Çapraz Eleme Ağacı (`buildInitialKoPairs`):** Gruplardan 4'er takımın çıktığı (`q=4`) turnuvalarda aynı gruptan çıkan 4 takım 4 ayrı çeyreğe dağıtılır ve *1. vs 4.* galibi çeyrek finalde başka bir *1. vs 4.* galibi yerine *2. vs 3.* galibiyle eşleşir.
- `VER` 18.10, `package.json` 18.10.0, `sw.js` önbelleği `fc27-lig-v18-10`.


## v18.9 (Düzeltme & Arayüz Aşama 1: Puan Tablosu Hizalaması, Açılır Hafta Sonuçları ve Denetim Düzeltmeleri)
- **Puan tablosu Averaj (`AV`) ve Puan (`P`) sütun ayrımı:** Çift haneli averajlarda (`+11` vb.) sağdaki Puan (`15`) sütunuyla bitişik görünme sorunu giderildi; `AV` sütunu genişletildi (`32px`) ve `P` sütununa rozet/boşluk ayrımı eklendi.
- **Geçmiş hafta sonuçları için açılır pencere / hafta seçici (`wktog`, `wksel`):** Grup ve lig kartlarının altındaki hafta sonuçları açılır pencereye dönüştürüldü; tıklanarak **1. Hafta, 2. Hafta...** veya **Tümü** arasında geçiş yapılabilir.
- **Gereksiz "Çıkanları seç" butonları kaldırıldı:** Simülasyon sonunda gruptan çıkanlar otomatik belirlendiği için `Sezon` ve `Kura › Gruplar` ekranlarındaki manuel çıkan seçme butonları kaldırıldı.
- **Kod denetimi düzeltmeleri (Madde 1, 3, 4, 5):**
  1. `simUndoWeek`: Son grup haftası geri alındığında `s.gqs`, `s.gq` ve `s.grk` otomatik temizlenir.
  2. `tourneyTopScorers`: `render()` sırasında `s.sim.sc` değiştiren yan etki kaldırıldı (`render` saf tutuldu).
  3. `syncUserMatchesToBracket`: Eleme eşleşmesi filtresi `m.opp === opp` olarak kesinleştirildi.
  4. `calcGroupTable` & `msave`: Aynı grup rakibiyle `c.gl` sınırından fazla maç girilmesi ve tablonun şişmesi engellendi.
- `VER` 18.9, `package.json` 18.9.0, `sw.js` önbelleği `fc27-lig-v18-9`.


## v18.8 (Simülasyon Aşama 2 & 3: Otomatik Eleme Ağacı, Kadrolardan Gol Krallığı ve Turnuvayı Sonlandır)
- **Grup sıralamasından otomatik Eleme Ağacı (`buildInitialKoPairs`, `initKoBracket`, `koBracketCard`):** Grup aşaması tamamlandığında çıkan takımlar gerçek Dünya Kupası / Şampiyonlar Ligi çapraz eşleşme mantığıyla (*A1–B2, C1–D2 | B1–A2, D1–C2*) eleme ağacına (`s.sim.ko`) yerleştirilir; aynı gruptan çıkan iki takım finale kadar karşılaşmaz.
- **Eleme rakibinin bracket'tan otomatik gelmesi (`getAutoKoOpponent`):** Eleme turlarında maç sonucu girerken rakip seçimi bracket'taki eşleşmene göre otomatik gelir.
- **Elensen bile finale kadar tur simülasyonu (`simKoStage`, `simOneKoTie`):** Grupta veya ara turlarda elensen bile **"⚡ Turu Simüle Et"** ve **"⏩ Finale Kadar Simüle Et"** butonlarıyla tek/çift maç, uzatma (`UZ`) ve seri penaltı (`P`) kurallarıyla turnuvayı sonuna kadar simüle edebilirsin. Yapay zeka maçları senin kişisel maç geçmişini (`s.mt`) kirletmez.
- **Kadrolardan Turnuva Gol Krallığı (`pickSimScorer`, `tourneyTopScorers`, `topScorersCard`):** Simüle edilen maçlardaki goller `data.js` kadrolarındaki oyunculara mevki (*Forvet > Orta Saha > Defans*), ilk 11 durumu ve genel güç ağırlıklarına göre dağıtılır; senin oyuncularınla diğer takımların yıldızları tek **Turnuva Gol Krallığı** listesinde yarışır.
- **Turnuvayı Sonlandır (`finishTournament`, `getTourneyOutcome`):** Tüm maçlar tamamlandığında çıkan **"🏆 Turnuvayı Sonlandır ve Kaydet"** butonu şampiyonu, finalisti, gol kralını ve ulaştığın dereceyi otomatik olarak sezon sonucuna (`s.res`), Kupa Dolabına ve Geçmiş'e kaydeder.
- `VER` 18.8, `package.json` 18.8.0, `sw.js` önbelleği `fc27-lig-v18-8`.


## v18.6 (Simülasyon Aşama 1: Grup/Lig Haftalık Simülasyon ve Canlı Puan Tabloları)
- **Haftalık turnuva simülasyonu (`s.sim`, `simNextWeek`, `simUndoWeek`):** Sen grup veya lig maçını girdikten sonra **"⚡ X. Hafta Maçlarını Simüle Et"** butonu aktifleşir; kendi grubundaki diğer eşleşmeler ve diğer tüm grupların o haftaki maçları tek tıkla oynatılır. İstenirse **"↩ Geri Al"** ile son simüle edilen hafta geri alınabilir.
- **Gerçekçi Poisson skor motoru (`simMatchScore`):** Takımların anlık Genel, Hücum, Orta Saha ve Defans güçlerine (`RT(s, i)`) ve seçilen moda (*Gerçekçi / Dengeli / Sürprizli*) göre skor üretir. *Gerçekçi* modda 1-0, 2-1, 2-0, 1-1 gibi gerçek futbol skor dağılımları ağırlıklıdır (~2,68 maç başı gol).
- **Tam sütunlu canlı puan tablosu (`calcGroupTable`):** Grup ve lig kartlarında ilk maçtan itibaren **O (Oynanan), G (Galibiyet), B (Beraberlik), M (Mağlubiyet), AG (Attığı Gol), YG (Yediği Gol), AV (Averaj) ve P (Puan)** sütunları ile o haftanın toplu maç sonuçları gösterilir.
- **Otomatik grup çıkanları ve sıra tespiti:** Son grup haftası simüle edildiğinde tüm gruplarda ilk `q` sırayı alan takımlar otomatik olarak `s.gqs` içine işaretlenir; senin takımının grup sırası (`s.grk`) da sezon onay kutusuna hazır gelir.
- `VER` 18.6, `package.json` 18.6.0, `sw.js` önbelleği `fc27-lig-v18-6`.


## v18.5 (Görsel hiyerarşi ve sadeleştirme)
- **Yedek hatırlatması kompakt şerit oldu:** Büyük yeşil blok yerine, altın sol kenarlıklı tek satırlık şerit (`.bks`). Ana kart tek odak olarak kalır. Düğme metni "Yedek indir"; "Ayarlar › Yedekleme" bağlantısı metnin sonunda.
- **Sıfır değerli satırlar sönük ve ince:** Geçmiş > Toplu istatistik ve dağılım satırlarında değeri 0 olan satırlar soluk gösterilir. Hiç biten sezon yokken "Sonuç dağılımı / Lig sıralama dağılımı" kartı gizlenir. Boş durum çizimi küçültüldü.
- **Eleme yolu çizgisi:** Turlar dikey bir hat ve durum düğümleriyle bağlandı (altın: geçildi, yeşil: sürüyor, kırmızı: elendi, gri: oynanmadı). `koBox` artık `np` (oynanmadı) ve `lose` (elendi) sınıfları üretir.
- **Kart yüksekliği hiyerarşisi:** Ana kart (hero) daha belirgin gölge, ikincil satırlar (`.kord`, `.sbcard`) sakin gölge alır (`--gsh-hi`, `--gsh-lo`, her iki temada).
- `VER` 18.5, `package.json` 18.5.0, `sw.js` önbelleği `fc27-lig-v18-5`.

## v18.4 (Görsel iyileştirmeler ve önbellek düzeltmesi)
- **Önbellek sürümü düzeltildi (`sw.js`):** v18.3 paketinde `CACHE` adı güncellenmemişti; `sw.js` baytları değişmediği için mevcut kullanıcılar güncellemeyi alamazdı. Ad `fc27-lig-v18-4` yapıldı. Bundan sonra her sürümde `VER` ve `CACHE` birlikte artırılmalı.
- **İlk kurulum ekranı:** Boş alanı dolduran, temaya uyumlu çim sahası çizimi ve kısa açıklama (yalnızca kurulum yapılmamışken görünür).
- **Form noktalarında G/B/M harfi:** Renk körlüğü olan kullanıcılar için sonuç artık renkle birlikte harfle de gösterilir.
- **Sabit genişlikli rakamlar:** Tablo ve skorlarda sütunlar hizalı kalır (`font-variant-numeric: tabular-nums`).
- **Açılış iskeleti:** Veri yüklenirken boş ekran yerine hafif yer tutucu kartlar (hareket azaltma tercihine uyar).

## v18.3 (Hata düzeltmeleri: veri ezilmesi koruması ve ilk açılış bildirimi)
- **IndexedDB okuma hatasında veri ezilmesi engellendi (`storage.js` & `app.js`):** Ana kayıt okunurken geçici bir IndexedDB hatası olursa `kv.get` bunu "kayıt yok" gibi `null` döndürüp uygulamanın boş sezonla mevcut kaydı ezmesine yol açabiliyordu. Artık okuma hatası ayrı bayrakla (`hadMainReadFailure`) izlenir; bu durumda `st.readFail` kilidi devreye girer, hiçbir şey kaydedilmez ve kullanıcıya "Sayfayı Yenile" uyarısı gösterilir.
- **İlk açılışta yanlış "Yeni sürüm var" bildirimi giderildi (`app.js`):** Service worker ilk kurulumda `SW_UPDATED` mesajı gönderiyordu; mesaj dinleyicisi artık yalnızca sayfa zaten bir SW tarafından kontrol ediliyorsa (`had`) bildirimi gösterir.
- `VER` 18.3, `package.json` 18.3.0, `sw.js` önbelleği `fc27-lig-v18-3`.


## v18.2 (Aşama 4: Eski `localStorage` Kopyası Temizliği, Ölü Kod Temizliği ve Dokümantasyon)
- **Kullanıcı onaylı eski `localStorage` kopyası temizliği (`legacyLsInfo`, `clearLegacyLs`, `oldlsx`):** IndexedDB'ye geçiş bayrağı (`fc26lig4_idb=1`) aktifken `localStorage`'da hâlâ eski `fc26lig4` veya `fc26lig3` kopyası duruyorsa `Ayarlar › Depolama ve kota` kartında boyutuyla birlikte gösterilir. Kullanıcı **"Eski localStorage kopyasını sil"** butonuna bastığında onay penceresi açılır; silmeden hemen önce IndexedDB'deki `main` kaydının varlığı ve bütünlüğü doğrulanır, ardından eski kopya silinir.
- **Kullanılmayan (ölü) kodların temizliği (`app.js`):** Eski sürümlerden (v17.9 ve v17.11 öncesi) kalan ve artık hiçbir görünümde çağrılmayan `sqCard`, `sqBtn`, `prevSq`, `pnames`, `allPlayersList`, `stripes`, `scTot`, `asTot`, `cleanStats` fonksiyonları ile bunlara ait atıl olay dalları (`sqx`, `sqf`, `sqadd`, `sqxi`, `sqall`, `msn`, `masn`, `padd`, `psq`, `tsx` ve mükerrer `reload` dalı) temizlendi.
- **Kapsamlı depolama dokümantasyonu (`README.md`):** `storage.js` mimarisi, `kv` soyutlama katmanı, IndexedDB (`fc26lig4` / `kv` / `main`) yapısı, taşıma protokolü (`fc26lig4_idb=1`), sıralı yazma kuyruğu (`queueSave` / `flushSaveQueue`), `BroadcastChannel` çoklu sekme kilidi ve yedek plan (`localStorage` fallback) `README.md` içinde ayrıntılı olarak belgelendi.
- `VER` 18.2, `package.json` 18.2.0, `sw.js` önbelleği `fc27-lig-v18-2`.


## v18.1 (Aşama 3: Dayanıklılık – Çoklu Sekme `BroadcastChannel`, Kapanışta Yazma, Kota Göstergesi ve Yedek Hatırlatması)
- **`BroadcastChannel` ile çoklu sekme senkronizasyonu (`storage.js` & `app.js`):** IndexedDB yazmaları `storage` olayını tetiklemediği için `BroadcastChannel("fc26lig4_sync")` kanalı eklendi. Her sekme benzersiz bir `TAB_ID` alır; bir sekmede `fc26lig4` kaydedildiğinde diğer açık sekmelere anında bildirim gider ve `st.staleTab = true` kilidiyle eski sekmenin yeni veriyi ezmesi engellenir (`localStorage` yedek modu için `storage` dinleyicisi de korundu).
- **Sekme kapanırken / arka plana giderken anında yazma (`visibilitychange` & `pagehide`):** 200 ms biriktirmeli yazma kuyruğunda (`queueSave`) bekleyen bir değişiklik varsa, sekme kapatılırken (`pagehide`) veya arka plana atılırken (`visibilitychange` → `hidden`) zamanlayıcı iptal edilip `flushSaveQueue()` derhal çalıştırılır.
- **Gerçek depolama ve kota göstergesi (`estimateStorage` & `quotaCard`):** `Ayarlar` sekmesine `navigator.storage.estimate()` API'sini ve gerçek uygulama verisi boyutunu (ana veri + kurtarma kopyaları) kullanan **Depolama ve kota** kartı eklendi (aktif depolama motoru, kullanılan KB/MB, toplam tarayıcı kotası ve doluluk çubuğu).
- **Gelişmiş yedek hatırlatması (`bkRemind`):** Sezon tamamlandığında (`s.res` kaydedildiğinde ve son yedekten beri yeni veri varsa) veya son yedekten bu yana 10+ maç / 14+ gün (ya da maç girilmese bile 30+ gün) geçtiğinde ana ekranda doğrudan **"Hemen yedek indir"** butonlu hatırlatma kartı gösterilir.
- `VER` 18.1, `package.json` 18.1.0, `sw.js` önbelleği `fc27-lig-v18-1`.


## v18.0 (Aşama 2: IndexedDB Arka Ucu, Doğrulamalı Taşıma ve Yazma Kuyruğu)
- **IndexedDB arka ucu (`storage.js`):** Veritabanı adı `fc26lig4`, depo (object store) adı `kv` olarak kurgulandı. Ana uygulama verisi tek kayıtta (`main`) tutulur; 5 kurtarma kopyası (`RCV`) da aynı depoya yazılarak `localStorage`'ın 5 MB kota sınırından tamamen çıkarıldı.
- **Birebir doğrulamalı taşıma protokolü (`fc26lig4_idb=1`):** Açılışta önce IndexedDB'de `main` kaydı aranır; varsa doğrudan kullanılır. Yoksa ve `fc26lig4_idb=1` bayrağı henüz konulmamışsa `localStorage` içindeki `fc26lig4` (veya eski `fc26lig3`) verisi IndexedDB'ye kopyalanır, geri okunarak karakter karakter doğrulanır ve ancak doğrulama başarılı olduğunda `localStorage.setItem("fc26lig4_idb", "1")` bayrağı konulur. Eski `localStorage` ana kopyası güvenlik için silinmez; bayrak varken eski veriyle karışmaması için bir daha okunmaz.
- **Sıralı yazma kuyruğu (`queueSave` & `flushSaveQueue`):** `save()` bellekteki `store` nesnesini anında günceller ve disk yazımını ~200 ms biriktirmeli (batching) sıralı kuyruğa alır. Yedek dışa aktarma (`exportFile`) ve ilk açılış (`initApp`) gibi kritik anlarda `save(true)` ile beklemesiz anında yazım yapılır. Yazma hataları `setSaveStatusCallback` üzerinden `st.sf` uyarı şeridine (`sfBan`) bağlanır.
- **Yedek plan (Fallback) ve küçük tercihler:** Tarayıcıda IndexedDB kapalıysa veya açılamazsa (örn. kısıtlı özel sekme) otomatik olarak `localStorage` moduna düşer ve kullanıcıya kısa bir bildirim gösterir. Hata günlüğü (`fc26lig4_log`) ile tema/hareket tercihleri (`fc26lig4_theme`, `fc26lig4_motion`) hızlı erişim için `localStorage`'da tutulmaya devam eder.
- `VER` 18.0, `package.json` 18.0.0, `sw.js` önbelleği `fc27-lig-v18-0`.


## v17.20 (Aşama 1: Asenkron Depolama Katmanı – `storage.js` ve `kv` Soyutlaması)
- **`storage.js` modülü ve `kv` arayüzü:** IndexedDB geçişinin 1. aşaması olarak `kv.get(k)`, `kv.set(k, v)` ve `kv.del(k)` metodlarını Promise döndüren asenkron bir katman halinde sunan `storage.js` eklendi (arka uçta şimdilik `localStorage` çalışır).
- **Asenkron başlatma (`async initApp()`):** Üst düzeydeki senkron `localStorage` okuma bloğu `async initApp()` içine taşındı; ana kayıt (`fc26lig4`), eski sürüm geçişi (`fc26lig3`), bozuk kayıt kurtarma (`fc26lig4_bozuk`) ve takım listesi değişimi yedeği (`fc26lig4_liste_oncesi`) tamamen `await kv.*` üzerinden okunup yazıldıktan sonra `render()` çalıştırılır.
- **Yıkıcı 3 akışta asenkron `snapKeep()` güvencesi:** `snapKeep()` asenkron yapıya geçirildi; yedek birleştirme (`mergeBk`), yedekle tümünü değiştirme (`impr`) ve tüm verileri sıfırlama (`resetAll`) akışları `await snapKeep(...)` sonucunu bekleyecek şekilde güncellendi. Onay pencerelerinin (`a=="yes"`) asenkron geri çağrıları (`await f()`) desteklemesi sağlandı.
- **Kurtarma kopyaları önbelleği (`rcvCache`, `rcvGet`, `rcvRefresh`):** 5 kurtarma kopyasının (`RCV`) okunması ve silinmesi (`rcvx`, `rcv`) `kv` katmanına bağlandı; `render()` senkron akışının bozulmaması için bellek içi `rcvCache` senkronizasyonu eklendi.
- **Yükleme sırası ve çevrimdışı önbellek:** `index.html` betik sırası `data.js` → `storage.js` → `app.js` olarak güncellendi; `sw.js` `FILES` listesine `./storage.js` eklendi. Hata günlüğü (`fc26lig4_log`) senkron hata yakalama için `localStorage`'da bırakıldı.
- `VER` 17.20, `package.json` 17.20.0, `sw.js` önbelleği `fc27-lig-v17-20`.


## v17.19 (Hata Düzeltmesi: Lig → Saf Eleme Geçişi)
- **`isLg` düzeltmesi:** `q===0` tek başına lig sayılıyordu. Lig modunda `q=0` olduğundan, "Direkt eleme" moduna geçince `gs=0, q=0` kalıyor ve `fixC` ayarı yeniden lige çeviriyordu. Artık lig koşulu `c.lg` veya (`q===0` ve `gs>0`); `gs=0` olan saf eleme kupası lig sayılmaz. Eski (`lg` bayrağı olmayan) lig kayıtları `gs>0 ve q=0` ile hâlâ doğru tanınır.
- **`gmode` eleme dalı:** Eleme/grup moduna geçerken `q` değeri 0 ise 2'ye çekilir (daha önce yalnızca grup modunda yapılıyordu).
- **`genDraw`:** `tight` verilmezse `1` varsayılır (NaN'a düşmesin diye sigorta).
- **`matchTab`:** Yerel `cur` değişkeni `curS` olarak yeniden adlandırıldı (modül düzeyindeki `cur()` ile gölgelenme riski kalktı).
- `VER` 17.19, `package.json` 17.19.0, `sw.js` önbelleği `fc27-lig-v17-19`.

## v17.18 (3. Aşama: Monolith Yapıdan Çıkış – `style.css` ve `app.js` Fiziksel Ayrımı)
- **Fiziksel bölme:** Tek parça ~300 KB'lık `index.html`, üç dosyaya ayrıldı: `index.html` (yalnızca HTML iskeleti), `style.css` (tüm stiller ve gömülü yazı tipi) ve `app.js` (tüm uygulama mantığı). Kod satır satır aynıdır; davranış değişmemiştir.
- **`defer` yükleme sırası:** `<link rel="stylesheet" href="style.css">`, ardından `<script src="data.js" defer>` ve `<script src="app.js" defer>`. `defer` betikleri belge sırasıyla çalıştığından `RAW`/`SQ` verileri her zaman `app.js`'ten önce hazırdır. ES modülü kullanılmadı.
- **`initApp()` kurgusu:** Başlangıç kodu (sekme/hash okuma, liste yedeği, `save()`, ilk `render()`) `initApp()` içine alındı; `document.readyState === "loading"` ise `DOMContentLoaded` ile, değilse hemen çalışır.
- **`sw.js`:** `./style.css` ve `./app.js` önbellek listesine (`FILES`) eklendi; `CACHE` adı `fc27-lig-v17-18` yapıldı. Böylece çevrimdışı mod yeni yapıda da eksiksiz çalışır.
- **Dokümantasyon:** `README.md` dosya tablosu, `VER`/`ALIAS` yönlendirmeleri ve yayınlama adımları yeni yapıya göre güncellendi.
- `VER` 17.18, `package.json` 17.18.0. `localStorage` anahtarları (`fc26lig4`) değişmedi.

## v17.17 (2. Aşama: Asenkron Canvas UI Kilidi (`isGenerating`) ve iOS Safari Standalone Koruması)
- **Canvas UI kilidi (`st.isGenerating`) ve `render()` buton yönetimi:** Karne, Kura, Maç Kartı ve Kariyer Özeti görselleri oluşturulurken `st.isGenerating` durumu aktifleşir; `render()` fonksiyonu tüm görsel üretim butonlarını devre dışı (`disabled`) bırakır ve tıklanan butonun üzerinde `"⏳ Hazırlanıyor…"` durumunu gösterir. `requestAnimationFrame` ile tarayıcının bu durumu ekrana çizmesi garanti altına alındıktan sonra Canvas işlemi başlar ve `finally` bloğunda butonlar tekrar aktif edilir.
- **iOS / iPadOS Safari Standalone Tespiti:** `/iPad|iPhone|iPod/` ve iPadOS (`MacIntel` + `maxTouchPoints > 1`) cihazlarda `navigator.standalone !== true` ve `display-mode: standalone` kontrolü yapılarak, ana ekrana eklenmemiş Safari sekmelerinde *"Verilerinizin silinmemesi için uygulamayı ana ekranınıza ekleyin"* uyarısı gösterilir.

## v17.16 (1. Aşama: Tam Prototipsiz Nesne Denetimi ve Çoklu Sekme Veri Ezilmesi Kilidi)
- **`__proto__` (Prototype Pollution) tam kapanışı:** `msave` içindeki `Object.fromEntries` çıktıları (`m.sc`, `m.as`), `rePl` ve `getOrAddPl` içindeki oyuncu manuel düzeltme nesneleri (`p.b`), `msum` sonuç nesnesi (`r`), `avail` ve `chooseP` ülke sayaçları (`cnt`), `store.achd` rozet tarihleri ve tüm sıfırlama/başlangıç nesneleri `Object.create(null)` (`nob()` / `toNob()`) ile prototipsizleştirildi.
- **Çoklu sekme (Multi-tab) Race Condition kilidi (`st.staleTab` & `ntfReload`):** `window.addEventListener("storage", ...)` ile başka bir sekmede `fc26lig4` verisi değiştiğinde mevcut sekmede `st.staleTab = true` kilidi devreye girer, tüm yazma (`save()`) işlemleri durdurularak eski sekmenin yeni veriyi ezmesi engellenir ve kullanıcıya **"⚠️ Başka bir sekmede değişiklik yapıldı, veri kaybı yaşamamak için sayfayı yenileyin [Sayfayı Yenile]"** uyarısı gösterilir.

## v17.15 (Kademe 3: Doğal Modülerlik (`data.js`) ve Yasal Uyarı / Dokümantasyon)
- **Veritabanının `data.js` dosyasına ayrılması:** Hiçbir derleyici (build aracı) kullanmadan, 108 takım (`RAW`) ve ~3.200+ oyuncudan oluşan kadro veritabanı (`SQ`) ayrı bir `data.js` dosyasına taşındı. `index.html` boyutu ~88 KB hafifletilerek kod okunabilirliği, hata ayıklama (debug) ve gelecekteki oyun sürümleri (örn. FC 28) için veri güncelleme kolaylığı sağlandı.
- **Service Worker (`sw.js`) önbellek güncellemesi:** `data.js` dosyası çevrimdışı (offline) önbellek listesine (`FILES`) eklendi ve önbellek sürümü `fc27-lig-v17-15` yapıldı.
- **Yasal Uyarı (Disclaimer) ve README rehberi:** `README.md` ve uygulama içi `Ayarlar` sekmesine açık kaynak / ticari olmayan kullanım ve marka hakları için kapsamlı Yasal Uyarı (Disclaimer) ile yeni oyun çıktığında `data.js` güncelleme rehberi eklendi.

## v17.14 (Kademe 2: UX Ergonomisi, Görsel Üretim Hızı ve Mobil Deneyim)
- **Görsel üretim kilidi (`st.busy`) ve tekli Blob kodlaması:** Kura, karne, maç kartı ve kariyer özeti görselleri üretilirken çift tıklamayı önleyen `st.busy` kilidi ve *"Görsel hazırlanıyor…"* bildirimi eklendi; `toDataURL` + `toBlob` çift kodlaması kaldırılıp yalnızca `toBlob` + `URL.createObjectURL` kullanılarak görsel üretim süresi yarıya indirildi.
- **`[Asist yok ✓]` ile tek satıra daraltma:** Maç girişinde golcü seçildikten sonra asist olmayan goller için **Asist yok ✓** butonu eklendi; seçildiğinde gol kartı tek satıra daralarak bol gollü maçlarda dikey kaydırmayı kısaltır (istenirse `+ Asist ekle` ile tekrar açılabilir).
- **Kupa dolabı (`vitrinCard`) ve Sezonlar listesi sadeleştirmesi:** Kupa dolabı 3'ten fazla şampiyonluk olduğunda varsayılan olarak son 3 kupayı gösterir ve `"Tüm kupaları göster"` butonu sunar; `Geçmiş › Sezonlar` listesi de 12 sezondan fazlasını katlayarak DOM şişmesini önler.
- **iOS Safari 7 günlük veri silinmesi (ITP) rehberi ve odak/arama optimizasyonu:** iPhone/iPad Safari sekmesinden girildiğinde *"Paylaş › Ana Ekrana Ekle"* kurulum uyarısı gösterilir; kadro içi oyuncu araması (`tiBody`) ve ortalama puan kutusu odak korunumu hızlandırıldı.

## v17.13 (Kademe 1: Performans, Depolama Kotası, Çoklu Sekme ve Güvenlik Sertleştirmesi)
- **Salt-okunur tıklamalarda sıfır disk yazımı (`UI_ONLY`):** Akordeon açma/kapama, sekme içi filtreleme, maç detayı/oyuncu detayı açma ve gol/skor sayaçlarını artırma gibi yalnızca arayüz durumunu (`st.*`) değiştiren tıklamalarda `JSON.stringify(store)` ile yedek kopya alma ve `localStorage`'a yazma (`save()`) tamamen devre dışı bırakıldı.
- **Tek seferlik `save()` ve akıllı kurtarma kotası (`snapKeep`):** `save()` ve `achScan()` içindeki mükerrer `localStorage.setItem` çağrısı teke indirildi; 5 MB tarayıcı depolama sınırı dolduğunda `snapKeep()` en eski kurtarma kaydını otomatik temizleyerek yeni yedeğe yer açar.
- **Çoklu sekme senkronizasyonu (`storage` event):** Uygulama aynı anda birden fazla sekmede açıkken bir sekmede yapılan kayıt diğer sekmelerde anında güncellenir; eski sekmenin yeni veriyi ezmesi (race condition) engellendi.
- **Tam prototipsiz nesne (`nob`) koruması ve SW eşitlemesi:** Yedekten veya depolamadan okunan tüm dinamik haritalar (`m.sc`, `m.as`, `s.gqs`, `s.ts`, `s.tb`, `s.sn`) ve çalışma zamanı önbellekleri (`SQC`, `bsp`, `TM`, `SC`, `CO`) `Object.create(null)` ile güvenceye alındı; `sw.js` navigasyon önbelleği (`./` ve `./index.html`) eşitlendi.

## v17.12 (Kod Denetimi ve Uç Durum Düzeltmeleri)
- **Lig kariyeri grafik eksenleri:** `Geçmiş › Özet › Lig Kariyeri` seçildiğinde *Takım gücü ve sonuç* ile *Grafikler* kartlarının dikey eksen etiketleri kupa turları (`Grup, ÇF, YF, Final`) yerine lig dereceleri (`Alt, Orta, 3., 2., Şamp.`) olarak düzeltildi.
- **Lig sezonu ana ekran yönlendirmesi:** Puan usulü lig sezonunda tüm maçlar tamamlandığında ana ekranda *"Grup maçların bitti"* yerine *"Lig maçların tamamlandı! Aşağıdan lig dereceni kaydedip sezonu bitirebilirsin."* mesajı gösterilir.
- **Sezon karşılaştırma ve oynanan takımlar:** `Sezon karşılaştır` tablosunda lig sezonlarının `"16'lı grup"` yerine `"puan ligi"` olarak görünmesi ve `Oynanan takımlar` listesinde aynı takımla hem kupa hem lig oynandığında en iyi derecenin doğru format etiketiyle yazılması sağlandı.
- **Maç kartı görseli ve yedek doğrulaması (`vS`):** Paylaşılan maç kartında (`macCv`) gol-asist satırlarının yazı tipi ölçümü (`fit`) ve kutu yüksekliği hesabı iyileştirildi; yedek yüklemede `m.gls` ve `s.res.grk` alanları için doğrulama eklendi.

## v17.11 (3. Aşama: Adım adım Gol + Asist eşleştirmesi ve Kendi Kalesine / KK seçeneği)
- **Adım adım Gol ve Asist eşleştirmesi (`m.gls`):** Maç skoru girilirken golcü ve asistçileri ayrı listelerden seçmek yerine her gol için sırayla (`1. GOL`, `2. GOL`...) önce **"Golü kim attı?"**, golcü seçildiği anda ise hemen altında **"Asisti kim yaptı? (İsteğe bağlı)"** sorulur. Asist seçmek zorunlu değildir; boş bırakılabilir.
- **Kendi Kalesine (`KK`) seçeneği:** Golü atanlar listesine **⚽ Kendi Kalesine (KK)** butonu eklendi. KK seçildiğinde asist sorulmaz ve `KK` oyuncu listesine veya gol krallığına bir futbolcu gibi eklenmez.
- **Gerçek Altın İkili ve Maç Kartı gösterimi:** Maç kartlarında ve paylaşılan maç görsellerinde goller **`⚽ Vlahović (👟 Miretti)`** şeklinde asistçisiyle birlikte gösterilir; **Altın İkili** istatistiği doğrudan kimin kime asist yaptığına göre hesaplanır (eski maç kayıtlarıyla da geriye dönük tam uyumludur).

## v17.10 (2. Aşama: Kupa/Lig Kariyer Özeti ayrımı, Sezonlar filtresi ve anlamlı Rozetler)
- **Kupa / Lig Kariyer Özeti ayrımı:** `Geçmiş › Özet` ekranına **Tümü | 🏆 Kupa Kariyeri | 📋 Lig Kariyeri** seçicisi eklendi. Lig seçildiğinde lig şampiyonluğu, ilk 3 (podyum), lig sıralama dağılımı ve lig puan ortalamaları/rekorları ayrı gösterilir; paylaşılan kariyer özeti görseli de seçili moda göre üretilir.
- **Sezonlar sekmesine Kupa / Lig filtresi:** `Geçmiş › Sezonlar` filtre kartına **Tümü | 🏆 Kupa sezonları | 📋 Lig sezonları** filtre butonları ve sezon kartlarına `🏆 Kupa` / `📋 Lig` etiketleri eklendi.
- **Yenilenmiş anlamlı Rozetler:** Rozetler katlanır kartındaki mükerrer başlık kaldırıldı; tüm rozetlere ikon ve kazanma koşulu açıklaması eklendi. Ayrıca *Kupa Beyi*, *Lig Maratoncusu*, *Penaltı Ustası* ve *Büyük Maç Oyuncusu (Clutch)* rozetleri eklendi (toplam 20 rozet).

## v17.9 (1. Aşama: Ekran temizliği, grupta elenme sırası ve açıklayıcı Taktiksel DNA)
- **İstatistik (`İstat.`) sekmesi sadeleştirmesi:** Takım kartındaki manuel "Düzelt" butonu ile "Oyuncu ekle" ve "Kadrodan ekle" kartları kaldırıldı; maçlarda skora katkı veren oyuncular otomatik listeleniyor.
- **Grupta elenme sırası:** Grup aşamasında elenildiğinde seçilen sıra (`Grupta 3. oldun ve elendin`) sezon özetine, geçmiş listesine ve paylaşılan sezon karnesi görseline eklendi.
- **Sonuç dağılımı düzeltmesi:** Geçmiş sekmesindeki sonuç dağılımı tablosuna `Son 32'de elendi` satırı eklendi.
- **Açıklayıcı Taktiksel DNA & Menajer Kimliği:** Hücum Tehdidi, Top & Pas Kontrolü, Savunma Direnci & Pres ve Bitiricilik Verimi başlıklarının altına ne anlama geldiklerini ve nasıl yükseldiklerini anlatan açıklamalar eklendi; menajer kimliği eşikleri (`Tiki-Taka` için %53+ topa sahip olma şartı vb.) iyileştirildi.

## v17.8 (analitik istatistikler, güvenli birleştirme ve arayüz sadeleştirmesi)
- **Clutch (eleme maçı) yıldızları:** Eleme ve final turlarında (`m.rd != "Grup"`) en çok skor katkısı (G+A) ve MOTM üreten oyuncular sezon ödüllerine ve kariyer rekorlarına eklendi.
- **Kaleci kurtarış % ve şut dönüşümü:** Gelişmiş istatistik girilen maçlarda `(oppSot - ga) / oppSot` formülüyle kaleci kurtarış yüzdesi ve `gf / myShots` şut dönüşüm oranı eklendi.
- **Uzatma ve penaltı karnesi:** Uzatmaya (`m.et`) ve seri penaltılara (`m.pf`, `m.pa`) giden maçların toplu galibiyet/mağlubiyet ve kazanma yüzdesi kartı eklendi.
- **Mevki bazlı skor dağılımı:** Gol ve asistlerin Forvet, Orta Saha, Defans, Kaleci ve Bilinmiyor (özel/transfer) mevkilerine göre dağılım grafiği eklendi.
- **Silinen maç/sezon koruması (`delM` & `delS`):** Yerelde silinen maçların (`s.delM`) ve sezonların (`store.delS`) yedek birleştirme (`mergeBk`) sırasında geri gelmesi (hayalet veri) engellendi.
- **Geçmiş alt menüsü sadeleştirmesi:** `Rozetler` sekmesi alt menüden çıkarılıp `Özet` ekranının altına katlanabilir (accordion) kart olarak taşındı.

## v17.7 (performans ve güvenlik)
- `__proto__` düzeltmesi: oyuncu/takım adıyla anahtarlanan nesneler artık prototipsiz (`Object.create(null)`); `__proto__` adlı bir isim veriyi bozmaz.
- Hızlı skor paneli açılırken kasma azaltıldı: karartma katmanından blur kaldırıldı ve koyulaştırıldı, panelden `backdrop-filter` kaldırılıp gölge küçültüldü, panel opak yapıldı, `body.qo` iken arkadaki tüm bulanıklıklar kapatıldı.

## v17.6 (FC 27 adlandırması)
- Paylaşılan görsellerin dosya adı `fc26-…` yerine `fc27-…` oldu.
- Paket, klasör ve depo adı FC27 olarak düzenlendi. Depolama anahtarları (`fc26lig4`) kullanıcı verisi için bilerek korundu.

## v17.5 (temizlik sürümü)
- Depo düzeni: testler `tests/` klasörüne taşındı, eski `fc26-lig-v2.zip` ve fazlalık `_nojekyll` kaldırıldı.
- `npm test` komutu ve GitHub Actions ile otomatik test eklendi.
- Savunma: "Tümünü göster" (`all`) kura durumu yokken, "Sezon adı kaydet" (`rens`) ad penceresi yokken çökmez.
- README eklendi; sürüm ve önbellek adı 17.5 yapıldı.

## v17.0 – v17.4
1. xPts hızlandırıldı (önbellek, Poisson bir kez hesaplanır) ve doğruluğu artırıldı (16 gol, normalizasyon, xG tavanı 7).
2. Service worker: kurulumda HTTP önbelleği atlanır, arka plan güncellemesi `waitUntil` içinde, `?utm` gibi sorgular önbelleği bozmaz.
3. Yedek birleştirme: birleşen sezonda oyuncu ve takım toplamları maçlardan yeniden hesaplanır.
4. `cleanStats` yan etkisiz; erişilebilirlik (`:focus-visible`, en az 12 px metin).
5. İkonlar PNG-8'e sıkıştırıldı (~1 MB → ~260 KB).
6. Sahip adı, sürüm gösterimi, hata günlüğü ve yedek güvenliği eklendi.

## Bilinen sınırlar
- Gerçek telefonda ve tarayıcıda denenmedi; testler Node içinde sahte DOM ile çalışır.
