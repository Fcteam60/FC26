# Değişiklik listesi

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
