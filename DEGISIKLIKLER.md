## v26.5 (2026-11-28) — Kadro Röntgeni, Canlı Sezon Kıyas Şeridi, Mikro Analitikler & Fikstür/iOS Cilaları
- **Kadro Röntgeni (`analytics.js` `squadXrayCard`, `app.js` `teamView`):** Takım seçildiği anda HÜC/ORT/DEF hatlarını turnuva ortalaması ve sırasıyla kıyaslayan 3 çubuk, İlk 11 yaş ortalaması, İlk 11 / Yedek derinlik farkı, kadro lideri ve (2+ maç sonrası) potansiyel–üretim içgörüsü eklenmiştir.
- **Canlı Sezon Kıyas Şeridi (`analytics.js` `seasonPaceStrip`, `app.js` `homeView`):** 2. sezondan itibaren (en az 2 maç oynandığında) aktif sezonun gol, yenen gol ve puan/maç temposunu geçmiş kariyer ortalamasıyla 1 satırda kıyaslar.
- **Mevcut Kartlara Sıfır Şişkinlikli Mikro Analitikler (`analytics.js`, `app.js`, `posters.js`):**
  - **Sürpriz Takımlar (`tstatView`):** Güç sırasının belirgin biçimde üstünde yer alan kulüpleri (`Güç #X → #Y`) listeler.
  - **Yıldız Bağımlılığı % & Kazandıran Oyuncu (`posDistCard`):** 5+ gol kaydedildiğinde en skorer oyuncunun takım gollerindeki payını ve gol attığında en yüksek galibiyet oranını getiren oyuncuyu (tıklanabilir profil linkiyle) gösterir.
  - **Sezonun Maçı (`karneCv`):** 1080px+ Sezon Karnesi PNG posterindeki ödüller alanına sezonun en çarpıcı galibiyeti/sonucu otomatik eklenir.
- **Fikstür Hafta/Grup Başlığı Buzlu Cam Kontrastı (`style.css`):** Turnuva arka planlarında `.fwh` (*1. Hafta / X/Y maç*) ve `.fgh span` (*Grup A*) başlıklarına koyu buzlu cam yüzey eklendi.
- **iOS Yedek Paylaşımında Fazladan `metin.txt` Oluşması Giderildi (`app.js` `exportFile`):** `navigator.share({ files: [f] })` çağrısından `title` parametresi kaldırılarak iOS *Dosyalara Kaydet* ekranında yalnızca temiz `.json` yedeğinin kaydedilmesi sağlandı.

## v26.4 (2026-11-27) — Gerçek Cihaz Cilası (Koyu Cam Toast, Koyu Yerel Seçiciler, Not Kontrastı & MVP/Veri Akışı)
- **Koyu & Turnuva Temalarında Buzlu Cam Toast (`style.css`):** Koyu modda ve 3 turnuva atmosferinde beyaz parlayan bildirim çubuğu yerine aktif turnuva rengiyle çerçevelenmiş koyu buzlu cam `.toast` tasarımına geçildi.
- **Yerel Android/iOS `<select>` Koyu Tema Uyumu (`style.css`):** `:root[data-theme="dark"]` ve `:root[data-cup]` için `color-scheme: dark` ve opak koyu `<option>` zemini eklenerek MOTM/sezon açılır listelerinin beyaz parlaması giderildi.
- **Arka Plan Üstü Çıplak Metin Kontrastı (`style.css` `:root[data-cup]`):** Kura sayacı (`#app > .note`), takım kartı alt etiketi (`#app > .tcap`) ve çıplak bölüm başlıklarına koyu buzlu cam hap/gölge eklenerek parlak turnuva logolarının üstünde silikleşme önlendi.
- **MVP Satır Ayırıcısı & 5 Altın Veri Klavye Akışı (`app.js`, `coop.js`, `style.css`):** Turnuva MVP’si 2–5. sıralarında puan ile gol/asist/MOTM arasına ince dikey ayırıcı (`.mvpd`) eklendi; 5 Altın Veri kutularındaki `Enter`/`Next` odak atlaması hem modal hem satır içi Maç Merkezi’nde çalışacak ve sonraki kutuyu seçili açacak şekilde genişletildi.

## v26.3 (2026-11-27) — Ayarlar Sekmesi `s is not defined` Acil Düzeltmesi
- **Ayarlar Sekmesi Çökmesi Giderildi (`app.js` `setView`):** `v25.8`’de eklenen aktif turnuva bilgi notu `setView()` içinde tanımlı olmayan `s` parametresini (`activeCupOf(s)`) çağırdığı için **Ayarlar** sekmesine girildiğinde `s is not defined` hatası veriyordu; `activeCupOf(cur())` olarak düzeltildi.
- **Tüm Kod Tabanı Kapsam (Scope) Taraması:** 8 JS dosyasındaki tüm üst düzey fonksiyonlar ve olay dinleyicileri tanımsız değişken referanslarına karşı otomatik tarandı; başka hiçbir tanımsız referans olmadığı doğrulandı ve regresyon kontrolü `tests/smoke.mjs` içine eklendi.

## v26.2 (2026-11-27) — Native PWA Yakınlaştırma Kilidi, Temiz Havuz Filtresi & 2P Senkron Cilası
- **Yakınlaştırma Kilidi Yeniden Aktif (`index.html`):** `<meta name="viewport">` üzerine `maximum-scale=1, minimum-scale=1, user-scalable=no` geri alınarak iOS Safari’de hem parmakla yanlışlıkla yakınlaştırma hem de üst çubuk/Düello seçicilerinde odak büyütmesi tamamen engellendi; gerçek uygulama hissi korundu.
- **9-Takım Bekleme Notu Aktif Havuza Filtrelendi (`app.js`, `coop.js`):** Bireysel ve 2P takım seçimi ekranlarında son 9 takım kuralı notu artık yalnızca mevcut turnuva havuzunda (`s.P` / `t.P`) yer alıp hariç tutulan kulüpleri gösterir; başka lig/GEN havuzlarındaki ilgisiz takımlar ekranı kalabalıklaştırmaz.
- **2P Sezon Adı Değiştirmede Yazma Öncesi Senkron (`coop.js` `coopRenameSeason`):** Sunucuya `PUT` göndermeden önce `await coopPull(true)` ile güncel oda verisi çekilerek çoklu cihazda eski önbellek ezmesi önlendi.

## v26.1 (2026-11-27) — Son 9 Takım Bekleme Kuralı (1P + 2P) & Derin Denetim Kapanışı
- **Rastgele Takım Seçiminde Son 9 Takım Bekleme Kuralı (`app.js`, `coop.js`):**
  - Bireysel (*Benim İçin Takım Seç*) ve 2P (*Slot Çek*) rastgele takım çekilişlerinde bekleme sınırı **son 3 takımdan son 9 takıma** (`TEAM_COOLDOWN = 9`) çıkarıldı; arada takım seçilmeden bırakılan boş sezonlar hak yemez.
  - Küçük havuzlarda (ör. 8 takımlı Direkt Eleme veya dar GEN aralığı) tüm havuz son 9 takımla dolarsa kural tek seferde sıfırlanmak yerine `9 → 8 → … → 1` şeklinde kademeli gevşetilerek en son oynanan takımlar her koşulda öncelikli hariç tutulur.
- **Açık Tema 2P Misafir Satırı & Eleme Kutu Düzeltmesi (`style.css`):** `v26.0` ölü sınıf temizliğinde birleşen `:root[data-theme="light"] .cp-rg` ve `.bktie.cp-gtie` kuralı ayrı ve `!important` korumalı hâline geri alındı.
- **Evren Onur Listesi Eski Arşiv Profil Desteği (`app.js` `tourneyPlayerDetail`):** `s.res.topG` ve `s.res.mvp` kayıtları yedek veri kaynağı olarak eklendi; eski arşiv sezonlarından açılan oyuncu profillerinde gol/asist/MOTM sıfırlanmaz.
- **2P & Test Betiği İyileştirmeleri (`coop.js`, `style.css`, `tests/smoke.mjs`):** `cpcreate`/`cpjoin`/`cprejoin` öncesi eski hata şeridi temizlenir; `cpnew` yeni sezon adını *Son Odalar* listesine işler; uzun 2P sezon adları oda modalında `.cp-renlbl` ile temiz üç noktalanır; `tests/smoke.mjs` tüm Node sürümleri (16/18/20/22+) için `fileURLToPath` ile uyumlu hâle getirildi.

## v26.0 (2026-11-27) — Final Mükemmelleştirme Sürümü (Mühendislik, UI/Erişilebilirlik & 2P UX)
- **Otomatik Test Altyapısı (`tests/smoke.mjs`, `package.json`):** Kırık `npm test` komutu sıfır bağımlılıklı gerçek Node doğrulama betiğine (`node tests/smoke.mjs`) bağlandı; 9 JS sözdizimi, 108/108 kulüp-kadro-arma bütünlüğü, 0 sembol çakışması, CSS dengesi, `data-a` aksiyon kapsamı ve sürüm tutarlılığını tek komutta denetler.
- **Güvenlik & Savunma Sıkılaştırması (`coop.js`, `duel.js`):** `coopGenCode()` kriptografik `crypto.getRandomValues()` kullanacak şekilde güçlendirildi; `coopHasRoom()` oda kodu uzunluğu Firebase kuralıyla `>= 6` olarak eşitlendi; `duelBaseUrl()` yalnızca `*.firebasedatabase.app` / `*.firebaseio.com` alan adlarını kabul eder.
- **2P "Son Odalar" Geçmişi & Sezon Adı Düzenleme (`coop.js`, `app.js`, `style.css`):**
  - Katılınan/kurulan son 5 ortak oda (`fc27_coop_recent`) lobide **Son Odalar** kartında listelenir; tek dokunuşla geri bağlanma (`cprejoin`) ve kaydı silme (`cprecdel`) eklendi.
  - Kurucu artık Oda Yönetimi modalından aktif ortak sezonun adını düzenleyebilir (`cpren` → `coopRenameSeason`); ad Firebase’e ve ortak posterlere anında yansır.
- **Performans & CSS Hijyeni (`coop.js`, `app.js`, `style.css`):** 2P takım arama kutusu (`cp_q`) tam sayfa `render()` yerine yalnızca takım ızgarasını (`coopFilterPick`) günceller; 20 kullanılmayan eski CSS sınıfı temizlendi.
- **UI, Tipografi & Erişilebilirlik (`index.html`, `style.css`, `app.js`, `analytics.js`):**
  - `<meta name="viewport">` üzerinden `user-scalable=no` kilidi kaldırılarak erişilebilir yakınlaştırma açıldı (form alanları `16 px` ile iOS odak zoom’unu engellemeye devam eder).
  - `10 px` altındaki tüm metin rozetleri `10 px` tabanına yükseltildi; poster önizleme başlığı (`.pimg-t b`) ve 2P golcü/asist satırları (`.cp-grow`) kırpılmayacak biçimde sarılır; ince dikey kulüp armalarına (`.bd-tall`) optik denge eklendi.
  - **Evren › Gol Krallığı & MVP Onur Listesi** ve **TOTS Efsaneleri** satırları kulüp kadrosu yerine doğrudan oyuncu profil kartını (`pinfo` / `tpinfo`) açar.
- **Dokümantasyon Güncellemesi (`README.md`, `KILAVUZ.md`):** `coop.js`, 11 Broadcast poster, 3 dinamik turnuva arka planı, 108/108 arma ve güncel Otomatik MOTM mantığıyla birebir eşitlendi.

## v25.10 (2026-11-27) — CSS `:where()` Özgüllük Kapanışı & Final Cila Paketi
- **Akordeon İç Kartı & `Hareket: Kapalı` Özgüllük Düzeltmesi (`style.css`):** Turnuva arka planı kart seçicilerindeki `:not(...)` zincirleri sıfır özgüllüklü `:where(:not(...))` içine alındı; `:root[data-cup] .acbody > .card.pglass` şeffaflığı ve `data-motion="off"` `blur(10px)` azaltması artık hiçbir kural tarafından ezilmez.
- **Kura Vurgusu (`.card.hl`) & Eleme Ağacı Sahnesi (`.bkt-wrap`) Turnuva Uyumu (`style.css`):** Kurada son çekilen grubun vurgu çerçevesi turnuva arka planında korundu; Eleme Ağacı sahnesindeki sabit yeşil tepe ışığı aktif turnuva rengine (`var(--ac)`) bağlandı.
- **Poster Koyu Arma Halesi Gölge Sıfırlaması (`app.js` `drawBadge`):** Büyük poster armalarının arkasındaki yumuşak ışık halesi çizilirken dış gölge (`shadowColor`, `shadowBlur`, `shadowOffset`) sıfırlanarak temiz hale kenarı sağlandı.
- **Eski Yedek Yüklemede `cupBg` Korunması (`app.js` `impr`):** `cupBg` alanı içermeyen eski JSON yedekleri yüklendiğinde mevcut *Turnuva Arka Planı* tercihi korunur.

## v25.9 (2026-11-27) — Akordeon/Kart Özgüllük Kapanışı, `UI_ONLY`, 2P Açılış İzolasyonu & Kurulum Koruması
- **Akordeon Çift Kutu & İç Kart Çerçevesi Düzeltildi (`style.css`):** Turnuva arka planında (`:root[data-cup]`) buzlu cam yalnızca `.pfold .acbtn` ve `.pfold .acbody` yüzeylerine uygulandı; `.acbody > .card.pglass` şeffaf korunarak tüm akordeonlardaki sivri çift kutu ve iç çerçeve yığılması giderildi.
- **Maç Günü Hero, Sezon Kartı & Grup Çerçeveleri Korundu (`style.css`):** `:root[data-cup]` kart kuralı `.scard`, `.phero`, `.mine` ve `.dead` sınıflarını ezmeden buzlu cam uygular; Maç Günü Hero gradyanı, Sezonlar kulüp/altın ışıkları ve grup kartlarındaki altın/kırmızı çerçeveler birebir korundu.
- **Düello Aktif Sekme İkonu & Ölü Seçici Temizliği (`style.css`):** `:root[data-cup] .dl-ntab.on svg` turnuva vurgusuna (`var(--ac)`) bağlandı; kullanılmayan `.su-card` seçicisi temizlendi.
- **`uhon` Sekmesi `UI_ONLY` Kümesine Alındı (`app.js`):** Evren sekmesindeki *Gol Kralları | MVP’ler* geçişinde gereksiz IndexedDB kaydı, `ut` damgası ve Düello senkronizasyonu tetiklenmesi önlendi.
- **2P Odasının Soğuk Açılış Flaşını Kirletmesi Giderildi (`app.js`):** `localStorage["fc26lig4_cup"]` yalnızca Bireysel aktif sezona (`soloCup`) göre güncellenir; 2P odasından çıkılıp uygulama yeniden açıldığında yanlış arka plan flaşı oluşmaz.
- **`resetAll()` İçinde `store.cupBg` Korunması & Bireysel `gmin`/`gmax` Koruması (`app.js`):** Veri sıfırlamada *Turnuva Arka Planı* tercihi korunur; Bireysel kurulumda `Genel En Az > Genel En Çok` (veya tersi) seçildiğinde çakışan sınır 2P ile tutarlı biçimde otomatik açılır.

## v25.8 (2026-11-27) — Turnuva Atmosferi Renk Uyumu, Buzlu Cam Kura Çubuğu & 6 Hata Düzeltmesi
- **Alt Dock, CTA Butonları ve İlerleme Çubukları Turnuva Rengine Bağlandı (`style.css` `:root[data-cup]`):** Şampiyonlar Ligi (buz mavisi), Avrupa Ligi (amber-turuncu) ve Konferans Ligi (zümrüt) arka planları aktifken alt menü (`.nav`), aktif sekme alt çizgisi (`.ptabs`), ana CTA düğmeleri (`.pset-pri`, `.ph-cta`), adım/ilerleme çubukları ve kilit/grup başlıklarındaki sabit yeşil renk sızıntısı giderildi.
- **Kura Yapışkan Çubuğu Buzlu Cam Düzeltmesi (`style.css` `.dock`):** `:root[data-cup] .dock` kuralı `!important` önceliğiyle üst çubukla aynı yarı saydam buzlu cam yüzeyine alındı.
- **Ayarlar’da Aktif Turnuva Arka Planı Bilgi Notu (`app.js`):** Aktif sezonda turnuva arka planı açıkken **Ayarlar › Görünüm ve Deneyim** kartında tema/palet tercihlerinin diğer formatlarda veya *Turnuva Arka Planı* kapatıldığında devreye gireceğini belirten açıklayıcı bilgi satırı eklendi.
- **iOS Safari Overscroll Zemin Uyumu (`index.html`, `style.css`):** `<html>` zemin rengi de turnuva tonlarına (`#050c20`, `#130f0a`, `#05110d`) bağlanarak sayfa yaylanırken kenarda farklı ton siyah şerit görünmesi giderildi.
- **Kural Değişikliğinde `s.cup` / `S.t.cup` Otomatik Temizliği (`app.js`, `coop.js` `syncCupTag`):** Kurulumda format, takım sayısı, GEN veya ülke kuralları elle değiştirildiğinde şablon artık eşleşmiyorsa turnuva arka plan etiketi otomatik temizlenir; kilitlenmiş sezonların etiketi korunur.
- **Katlanır Liste Daraltma Metni (`analytics.js` `foldMoreBtn`):** Türkçe yönelme ekleri düzeltildi (*İlk 3 sezona daralt*, *İlk 5 kulübe daralt*, *İlk 5 oyuncuya daralt*).

## v25.7 (2026-11-27) — Dinamik Turnuva Arka Planı & Koyu Buzlu Cam Atmosferi (UCL · UEL · UECL)
- **3 Hazır Kupa Şablonuna Özel Tam Ekran Arka Plan (`bg-ucl.jpg`, `bg-uel.jpg`, `bg-uecl.jpg`):** Hem Bireysel hem 2P modda **Şampiyonlar Ligi**, **Avrupa Ligi** (dikey 9:16 mobil orana kayıpsız uyarlandı) veya **Konferans Ligi** şablonu seçildiğinde ilgili turnuvanın görseli iOS uyumlu sabit tam ekran katmanında (`#cupbg`) otomatik etkinleşir; diğer formatlarda normal tema geri döner.
- **Yüksek Kontrastlı Koyu Buzlu Cam Tasarımı (`style.css` `:root[data-cup]`):** Turnuva arka planı aktifken renk uyumlu koyu buzlu cam kartlar (`blur(16px)`), kontrast koruma perdesi (scrim), turnuvaya özel vurgu renkleri (UCL buz mavisi, UEL amber-turuncu, UECL zümrüt) ve kırık beyaz yüksek kontrastlı tipografi otomatik uygulanır; PWA durum çubuğu (`theme-color`) ve soğuk açılış betiği flaşsız uyum sağlar.
- **Tek Dokunuşluk Kontrol (`Ayarlar › Görünüm`, `app.js`):** İstenildiğinde kapatıp açılabilen **Turnuva Arka Planı (`cupbg`)** anahtarı eklendi; 3 arka plan görseli `sw.js` içinde çevrimdışı önbelleğe alındı.

## v25.6 (2026-11-27) — Tam Kadro Hizalama Düzeltmesi, Katlanabilir Uzun Listeler & Premium UI Cilası
- **Tam Kadro Satır Hizalama Hatası Giderildi (`style.css` `.sqr-btn`, `.sqr.hasst`, `.sqp/.sqa/.sqo`):** Sezon istatistiği (`1G`, `1A`, `★`) olan oyuncu satırlarında `width: 100%` + `margin: 0 -6px; padding: 5px 6px` birleşiminin sağ sütunları (mevki, yaş, GEN) 12 px sola kaydırması düzeltildi; tüm oyuncu satırları sabit sütun genişlikleriyle kusursuz dikey hizaya oturtuldu.
- **Uzayan Listeler Katlanabilir Hâle Getirildi (`analytics.js`, `app.js`, `style.css` `.pfold-more`):**
  - **Beklenene Göre Performans (`xpCard`):** Varsayılan son 3 sezon + tüm sezonları açan katlanır düğme (`xp_all`); ayrıca `Beklenen / Ulaşılan` kutularındaki üç noktalı metin kesilmeleri (`Lig aşamasında el...`) temiz kısa etiketlerle giderildi.
  - **Gol Krallığı & MVP Onur Listesi (`universeView`):** İki uzun listenin alt alta yığılması yerine **`Gol Kralları | MVP’ler`** 2’li sekme geçişi (`uhon`) ve ilk 5 + tümünü açma eklendi.
  - **TOTS Efsaneleri, Evrenin Devleri, Lanetli Finalistler & Şampiyonluk Kronolojisi (`universeView`):** İlk 5 / 4 / 3 kayıtla kompakt açılış ve tek dokunuşla genişletme/daraltma eklendi; `Sezonlar` ve `Rakiplerim` varsayılan sınırları 6’ya çekildi.
- **Premium Görsel Yükseltmeler (`analytics.js`, `app.js`, `style.css`):**
  - **Takım Gücü ve Sonuç (`powerCard`):** `ilk ü...` / `son üç...` kesilmeleri kaldırılıp 2 satırlı katman kartlarına (`.pwr-t`) ve ızgaralı/haleli grafik + gömülü renk lejantına geçildi.
  - **Lider Satır (`.hof-r.r1`) & Şampiyonluk Kronolojisi (`.uv-row`):** iOS’ta kavisli parantez izi bırakan `inset` gölge yerine keskin `::before` altın dikey şerit; Kronoloji kartlarına sol vurgu şeridi ve ayrı `2.` / `Gol` / `MVP` rozetleri eklendi.
  - **Poster Koyu Arma Kontrastı (`app.js` `drawBadge`):** Koyu poster zemininde `Wolfsburg`, `Juventus`, `PAOK` gibi koyu armaların arkasında yumuşak ışık halesi eklendi.

## v25.5 (2026-11-27) — Kadro Modalı Hizalama/Başlık Düzeltmeleri & Kadro Veri Temizliği
- **Kadro Modalı Kariyer Şeridi Çakışması Giderildi (`style.css` `.ti-mc`):** `Yönettiğin` ve `Karşılaşma` şerit kartlarının dar mobil ekranlarda yan yana sıkışıp `Lig aşaması` rozetinin `KARŞILAŞMA` yazısının üstüne binmesi (`flex: 1 1 240px`, `overflow: hidden` ve iç rozet taşma korumasıyla) tamamen çözüldü.
- **Kadro Modalı Alt Etiket Boyutu Düzeltildi (`style.css` `.tim > b`):** `.tim b` seçicisi `.tim > b` olarak daraltılarak kulüp adının altındaki `Grup rakibin` / `Senin takımın` etiketinin 22 px başlık boyutuna büyümesi giderildi; 13 px vurgulu alt metne alındı.
- **Kadro Veri Düzeltmeleri (`data.js` `SQ`):**
  - **Al Hilal:** `G. Silva` (`RW, 80, #7`) gerçek adına uygun biçimde **`G. Martinelli`** olarak güncellendi (Braga’daki `G. Silva` korundu).
  - **Frankfurt / Nice:** İki kulüpte birden kayıtlı olan **`N. Nkounkou`** Frankfurt’tan kaldırılarak yalnızca güncel kulübü **Nice** kadrosunda bırakıldı.
  - **Sassuolo:** Çakışan `#28` forma numarası düzeltilerek **`S. Cinquegrano`** boş `#33` numarasına alındı (`D. Bakola` `#28` olarak kaldı).

## v25.4 (2026-11-26) — Konferans Ligi ve Avrupa Ligi Şablon GEN Ayarları
- **Konferans Ligi (`app.js` `CUP_PRESETS`):** GEN üst sınırı **`≤76 GEN`** (`gmin: 0, gmax: 76`) olarak güncellendi; diğer tüm kurallar (32T · 4×8 · İlk 4, Tüm bölgeler, Ülke limiti 8, Aynı grupta 2, Rastgele seçim, Torbalı kura) korundu (54 uygun · 51/32 havuz).
- **Avrupa Ligi (`app.js` `CUP_PRESETS`):** GEN aralığı **`75–78 GEN`** (`gmin: 75, gmax: 78`) olarak güncellendi; diğer tüm kurallar (32T · 4×8 · İlk 4, Tüm bölgeler, Ülke limiti 8, Aynı grupta 2, Rastgele seçim, Torbalı kura) korundu (53 uygun · 52/32 havuz).
- **Şampiyonlar Ligi (`app.js` `CUP_PRESETS`):** Mevcut ayarları (36T · 8 Maç + PO · 77+ GEN · Avrupa · Ülke 10 · En Güçlü) aynen korundu.

## v25.3 (2026-11-25) — Bireysel & Poster İnce Cila Paketi
- **xG 2 Ondalık Hassasiyeti (`analytics.js` `xgSummaryCard`):** `Üretilen xG`, `Yenen xG`, xG paylaşım çubuğu ve koç özeti xG değerleri 2 ondalıklı (`xgN2`: `1,20`, `0,85`) biçime geçirildi; `xG Farkı` (`+0,35`) ve `Gol−xG` farklarıyla yuvarlama çelişkisi tamamen giderildi.
- **Slot Çekilişi Sonrası Otomatik Yukarı Kaydırma (`app.js`, `coop.js`):** Hem Bireysel hem 2P modda rastgele kulüp çekilişi tamamlandığında sayfa en üste (`scrollTo(0, 0)`) alınarak çıkan kulüp kartı doğrudan ekrana getirilir.
- **Poster Önizleme Siyah Kare & Hız İyileştirmesi (`posters.js`, `app.js`, `style.css`):** `mkImg` içinde gerçek bitmap `im.decode()` beklemesi düzeltildi, `imgIn` animasyonundaki `opacity: 0` siyah kutu parlaması giderildi, çift sayfalı Karne PNG kodlaması paralelleştirildi, geçici kanvas belleği bırakıldı ve `preloadLogos` zaman aşımı 1,2 sn’ye çekildi.
- **Kupa Şablon Kartlarında Kompakt 4 Rozet (`app.js` `CUP_PRESETS`):** Konferans, Avrupa ve Şampiyonlar Ligi kartlarındaki özellik rozetleri bilgi kaybı olmadan 4’lü kompakt düzene (`32T · 4×8 · İlk 4`, `≤80 GEN`, `Ülke 8 · Grup 2`, `Rastgele`) alınarak 2. satıra yalnız sarkan tek rozet giderildi.

## v25.2 (2026-11-25) — 108/108 Tam Kulüp Arması Seti (Son 9 Logo Eklendi)
- **Eksik 9 Kulüp PNG Arması Tamamlandı (`data.js` `LOGOS` + `logos/`):** **River Plate**, **Boca Juniors**, **Club América**, **Toluca**, **PAOK**, **Wolfsburg**, **Alavés**, **Estudiantes** ve **Girona** kulüplerinin şeffaf PNG armaları eklendi; veritabanındaki **108/108 kulübün tamamı** artık gerçek PNG armasıyla (puan tabloları, fikstür, kadro, eleme ağacı, TOTS ve 11 Broadcast posterin tamamında) görüntülenir.

## v25.1 (2026-11-25) — Bireysel Otomatik MOTM, Şablon Kural Sıfırlama, Poster Başlık Koruması & 2P Kilit/Misafir Düzeltmeleri
- **Bireysel Mod Otomatik MOTM Düzeltildi (`sim.js` `autoMatchMom`, `app.js` `msave`):** Bireysel maç kaydında `Maçın Adamı (MOTM)` **`Otomatik`** bırakıldığında artık doğrudan rakip takımdan (`pickOppMom`) değil, 2P ile ortak `pickSimMom` motorunu kullanan `autoMatchMom` ile iki takımın gol, asist ve temiz kasa katkısına göre gerçek en iyi oyuncu seçilir (`m.mom` veya `m.omom`).
- **Kupa Şablonu → Genel Format Geçişinde Kural Temizliği (`app.js` `a=="tmpl"`, `coop.js` `a==="cptpl"`):** Hem Bireysel hem 2P kurulumunda hazır kupa şablonlarından (Konferans/Avrupa/Şampiyonlar Ligi) üstteki 6 format kartına geçildiğinde önceki GEN/bölge/ülke sınırlarının yapışıp havuzu kilitlemesi (`21/36`, `46/64`, `54/64`) giderildi.
- **4 Poster Başlığına `fit()` Çarpışma Koruması (`posters.js`):** `karneCv`, `totsCv`, `koCv` ve `kariyerCv` başlıkları sağdaki rozetlerin genişliğine göre `fit()` ile sınırlandırılarak uzun sezon/menajer adlarında üst üste binme engellendi.
- **2P `cpmundo` Anlık Onay Kapanışı & Kilit (`app.js` `a=="yes"`, `coop.js` `cpmundo`):** 2P onay modallarında `Evet, Devam Et` dokunulduğu anda pencere kapanır ve `cpmundo` ağ işlemi boyunca `st.cpLock` tutularak çift dokunma/yenileme çakışması engellenir.
- **2P Grup Bitişinde Misafir Yönlendirmesi (`coop.js`):** Tüm grup/lig maçları bittiğinde Misafir ekranı *"Kurucunun eleme ağacını kurması bekleniyor"* mesajı ve **`↻ Durumu Yenile`** düğmesini gösterir.

## v25.0 (2026-11-25) — Premium Kupa Şablonları Tasarımı & Konferans/Avrupa Ligi İlk 4 Çıkış Güncellemesi
- **Konferans Ligi & Avrupa Ligi Gruptan Çıkanlar `4` Yapıldı (`app.js` `CUP_PRESETS`):** İki şablonda da `q: 4` (4×8 grup, her gruptan ilk 4 takım → 16 takımlı Son 16 eleme ağacı) tanımlandı.
- **Broadcast-Kalite Kupa Şablon Kartları (`app.js`, `style.css`):**
  - Siyah dolguya düşen eski ikonlar yerine her turnuvaya özel ince çizgili vektörel amblemler (`CUP_SVGS`: zümrüt kalkan, turuncu Avrupa kupası, gökyüzü ŞL yıldız topu) eklendi; aktif seçili kartta renkli madalyon ve `✓ Seçili` rozetine dönüşür.
  - Satır sonundan kırılan düz metin açıklamaları kaldırılıp kırpılmayan yapılandırılmış mikro rozetlere (`32T · 4×8`, `İlk 4 Çıkar`, `≤80 GEN`, `Ülke 8 · Grup 2`, `Rastgele`) geçildi; her karta kupa renginde dikey sol vurgu şeridi ve hafif köşe ışıması eklendi.

## v24.10 (2026-11-25) — 3 Hazır Kupa Şablonu (Konferans · Avrupa · Şampiyonlar Ligi) & 2P İnce Cilalar
- **Hazır Kupa Şablonları (`app.js`, `coop.js`, `style.css`):** Hem Bireysel hem 2P kurulum ekranında 6 format kartının hemen altına tek dokunuşla format + GEN + ülke kurallarını birlikte uygulayan 3 hazır kupa şablonu eklendi:
  - **Konferans Ligi:** 32 takım · 4×8 grup · gruptan 2 çıkar · Grup tek maç / Eleme çift maç / Final tek maç · Tüm bölgeler · En çok 80 GEN · Ülke limiti 8 · Aynı grupta 2 · Rastgele seçim · Torbalı kura (68/32 kulüp).
  - **Avrupa Ligi:** 32 takım · 4×8 grup · gruptan 2 çıkar · Grup tek maç / Eleme çift maç / Final tek maç · Tüm bölgeler · En az 78 GEN · Ülke limiti 8 · Aynı grupta 2 · Rastgele seçim · Torbalı kura (32/32 kulüp).
  - **Şampiyonlar Ligi:** 36 takım UEFA formatı · Play-Off & Eleme çift maç / Final tek maç · Sadece Avrupa · En az 77 GEN · Ülke limiti 10 · Lig aşaması ülke koruması sınırsız · En güçlü seçim · Torbalı kura (46/36 kulüp).
- **2P Şampiyonlar Ligi Detay Kuralları (`coop.js`):** 2P kurulumunda `Turnuva Detay Ayarları (GEN & Ülke)` artık Şampiyonlar Ligi formatında da açık ve düzenlenebilir.
- **Bireysel Format Kartı & 2P İnce Cilalar (`app.js`, `coop.js`, `style.css`):** Bireysel `TPL` etiketleri kırpılmayacak biçimde kısaltıldı (`Şamp. Ligi`, `Puan Ligi`); `Ortak Maç Günlüğü` xG çipi 2 ondalıklı (`2,05`) biçime geçirildi ve 2P puan tablosunda Kurucu satırının sol dikey şeridi altın renge sabitlendi.

## v24.9 (2026-11-25) — 2P Kurulum Görsel Düzeltmeleri & UX Cilaları
- **Kurulum Onay Bandı Flex Dağılması Düzeltildi (`coop.js`, `style.css`):** `Kurulumu Onayla` içindeki yeşil/kırmızı havuz bilgi bandı ve Misafir H2H bilgilendirme şeridi tek `<span>` içine sarılarak `.pgmath` flex sütun bölünmesi giderildi.
- **`YZ Simülasyon` Orta Düğme Kırpılması Düzeltildi (`style.css`):** `.su-mrow .stabs.seg3` esnek genişliğe (`flex: 1; max-width: 236px`) alınarak `Gerçekçi` seçeneğinin `Gerç...` şeklinde kesilmesi giderildi.
- **2P Şablon Kartı Kısaltmaları (`coop.js` `COOP_TPL`):** `Şamp. Ligi` (`36T · 8 maç + PO`), `Puan Ligi` (`16T · 1–2 devre`) ve grup alt başlıkları (`32T · 8×4 grup`, `64T · 8×8 grup`, `16T · 4×4 grup`) 393 px ekranlarda üç nokta kesilmesi olmadan tek bakışta okunacak hâle getirildi.
- **`Topla Oynama` Sonrası Akıllı `Enter` Atlaması (`app.js`):** Sol `Topla Oynama (%)` kutusuna geçerli bir yüzde girilip sağ kutu otomatik dolduğunda klavyeden `Enter / İleri` tuşuna basınca doğrudan `Toplam Şut` kutusuna odaklanır.
- **Ortak Maç Günlüğü Rakip Golcüleri & Çoklu Gol Gruplama (`coop.js` `coopMatchLogCard`):** Yapay zekâ maçlarında rakip golcüleri de kompakt biçimde (`Real Madrid: K. Mbappé ×5, V. Jr.`) günlüğe yansıtılır.

## v24.8 (2026-11-25) — Otomatik MOTM Düzeltmesi, Kaleci MOTM Kalibrasyonu, 2P Pas İsabeti & UX Cilası
- **Otomatik MOTM Mantığı Düzeltildi (`coop.js` `coopAutoMom`, `cpmsave`):** 2P maç girişinde `Maçın Adamı (MOTM)` **`Otomatik`** bırakıldığında artık doğrudan rakip takımdan (`pickOppMom`) değil, iki takımın gol, asist ve temiz kasa katkısını değerlendiren `pickSimMom` motoruyla gerçek en iyi oyuncu seçilip doğru takıma (`mom`, `gMom` veya `omom`) kaydedilir.
- **Kaleci MOTM Kalibrasyonu (`sim.js` `pickSimMom`):** Gol yemeyen kaleci bonusu `+1,25/+1,45` seviyesinden `+0,85/+0,97` (sürpriz farkta `+0,30` ek) seviyesine dengelendi; `1–0` ve `2–0` maçlarda gol atan oyuncuların yerine sürekli kalecilerin MOTM seçilmesi giderildi (1–0 maçta kaleci MOTM oranı %91,6 → %24,2; genel kaleci MOTM payı %36,9 → %15,6).
- **2P `Pas İsabeti (%)` & Klavye `Enter` Geçişi (`coop.js`, `app.js`):** 2P maç istatistiklerine `Pas İsabeti (%)` satırı, `Ortak Maç Günlüğü` pas çipi ve `Menajer Kıyası` pas satırı eklendi; `.cp-adv` kutularında `Enter / İleri` tuşu otomatik olarak sonraki kutuya odaklanır.
- **2P Sekme Kaydırma & Kompakt MVP Satırları (`coop.js`, `app.js`):** `Genel / Tablo / Fikstür / Kıyas / Geçmiş` ve `Menajer Kıyası / Turnuva İstat.` geçişlerinde sayfa otomatik en üste (`scrollTo(0, 0)`) alınır; `Turnuva MVP’si` satır rozeti `22p 4G 2A 3★` biçimine daraltılarak kulüp adlarına yer açıldı ve `Ortak Maç Günlüğü` rakip MOTM çipini de tutarlı biçimde gösterir.

## v24.7 (2026-11-25) — 2P Tam Turnuva İstatistikleri & Kıyas 2’li Geçiş
- **Kıyas Sekmesinde 2’li Geçiş (`coop.js`, `style.css`):** Üstteki 5’li 2P sekme çubuğu sıkıştırılmadan **`Kıyas`** sekmesinin tepesine **`Menajer Kıyası | Turnuva İstat.`** geçişi eklendi.
- **2P Tam Turnuva İstatistikleri (`coop.js` `coopTourneyStatsView`):** Bireysel moddaki tüm istatistik kartları Kurucu (`★` altın) ve Misafir (`◆` gökyüzü mavisi) vurgularıyla 2P’ye taşındı: **En İyi 11 (TOTS)** + PNG paylaşımı, taçlı altın podyumlu **Turnuva MVP’si**, **Gol Krallığı** (ilk 10), **Asist Krallığı** (ilk 10), **Hat-Trick Yapanlar**, **En Golcü / En Az Gol Yiyen / En Çok Kazanan / En Çok Temiz Kasa / En İyi Averaj Takımlar** ve **Turnuva Özeti & Rekor Skorlar** (tüm oyuncu ve kulüp satırları tıklanabilir).
- **Kulüp Yıldızları Kıyası & MVP Formülü Eşitlemesi (`coop.js` `coopClubStarsCard`, `coopTourneyStats`):** `Menajer Kıyası` sekmesine iki takımın en golcü, asist lideri ve takım MVP’sini yan yana gösteren tıklanabilir kart eklendi; 2P MVP puan formülü bireysel mod ve oyuncu detay modalıyla (`3×G + 2×A + 2×MOTM`) birebir eşitlendi.

## v24.6 (2026-11-25) — iOS PWA Arka Plan Düello Gönderim Ertelemesi (`Load failed` Hata Raporu Temizliği)
- **`document.hidden` / `pagehide` Gönderim Ertelemesi (`duel.js`):** Ekran kilitlendiğinde veya uygulama arka plana alındığında `duelSchedulePush` ve sessiz `duelPush`/`duelPull`/`duelSyncNow` çağrıları ağ isteği başlatmak yerine gönderimi erteler (`st.duelPendingPush = true`), bekleyen zamanlayıcıları iptal eder.
- **1,5 sn Ağ Kararlılık Gecikmesi (`duel.js` `duelRetryLater`):** Telefon uyandığında (`visibilitychange` ön plana dönüş) veya bağlantı geri geldiğinde (`online`) iOS’un ağ rotasını oturtması için 1.500 ms beklenerek bekleyen Düello özeti güvenle gönderilir.
- **Uçuş Sırası Kesinti Filtresi (`duel.js` `duelHiddenSeq`):** Gönderim başladıktan sonra ekran kilitlenirse iOS Safari’nin ürettiği zararsız arka plan `Load failed` kesintileri hata günlüğünü (`elog`) kirletmez; gerçek ön plan/sunucu hataları kaydedilmeye devam eder.

## v24.5 (2026-11-25) — 2P Fikstür & Eleme Ağacında Golcüler, Asistler ve Maçın Adamı
- **2P Grup/Lig Fikstürü Tam Detay (`coop.js` `coopFxUserDet`, `coopPlayView`):** Bireysel moddakiyle birebir aynı sütunlu golcü, asist `(parantez içinde)`, kendi kalesine (`KK`) ve **★ Maçın Adamı** bloğu (`fxSimDet` / `fxDet`) tüm 2P YZ ve oyuncu maçlarına eklendi; ev/deplasman sütun hizalaması ve galibiyet/mağlubiyet/beraberlik skor vurguları (`win`/`lose`, `.w`/`.d`/`.l`) aktif edildi.
- **2P Eleme Ağacı Maç Detayları (`coop.js` `coopKoDet`):** Tamamlanan tüm eleme eşleşmelerinin altında çift ayak skorları, iki takımın golcü ve asist listesi ile Maçın Adamı (`.simdet`) gösterilir.

## v24.4 (2026-11-25) — 2P Uyarlanabilir Üst Çubuk (Oda Barı Temizliği), Oda Yönetimi Modalı & Seçili Maç Hapı Kontrast Düzeltmesi
- **Uyarlanabilir 2P Üst Çubuğu (`app.js`, `coop.js`, `style.css`):** 2P modu açıkken en üst başlıktaki bireysel `[Arma · Sezon ▾ · +]` alanı yerini doğrudan **`• CP-XXXXXX ▾`** oda düğmesine ve **`↻`** yenile ikonuna bırakır; sayfa tepesinde yer kaplayan 2 satırlık sabit oda bloğu (`.cp-top` + `.cp-meta`) tamamen kaldırıldı. 2P ekranı artık doğrudan 5’li sekme çubuğuyla başlar.
- **Oda Yönetimi Penceresi (`coop.js` `coopRoomDlg`):** Üst çubuktaki oda koduna dokununca rol, oyuncu adları, canlı eşitleme süresi, **Kodu Kopyala**, **Davet Paylaş**, **Yenile**, **Bireysel Mod** ve **Odadan Ayrıl** kontrollerini tek yerde toplayan modal açılır; takım seçimi aşamasında arkadaş henüz katılmadıysa Misafir kutusu tek dokunuşla davet gönderir.
- **Seçili Maç Hapı Kontrast Düzeltmesi (`style.css` `.cp-fpbtn.on`):** Aktif maç hapında (`H3 Lens`) global `.on` yeşil zeminiyle aynı renge boyanıp görünmez kalan hafta etiketi (`b`) artık `var(--acx)` kontrast rengiyle net görünür.

## v24.3 (2026-11-25) — Bellek Aynası Derin Kopya, 2 Ayaklı Eleme Geri Alma Kilidi & Poster Başlık Koruması
- **Bellek Aynası Sığ Referans Koruması (`coop.js` `coopClone`, `coopLoadCache`, `coopSaveCache`):** `localStorage` kota dolumu veya Gizli Sekme modunda kullanılan `_coopMemCache` artık her okuma/yazmada derin kopyalanır; sunucu yazma hatasında reddedilen verinin bellek önbelleğini kirletmesi tamamen engellendi.
- **2 Maçlı Elemede Üst Tur 1. Ayak Geri Alma Kilidi (`coop.js` `coopCanUndoLast`, `coopSyncKo`):** Üst eleme turunda 1. ayak maçı (`leg1`) veya herhangi bir insan maçı girildiyse alt turdaki maç artık geri alınamaz ve `coopSyncKo` oynanmaya başlanmış üst turu silmez.
- **Üst Çubuk `2P` Çıkışında Hayalet Modal Temizliği (`coop.js` `cpopen`):** Üst çubuktaki `2P` düğmesiyle bireysele dönüldüğünde açık kalmış 2P maç penceresi (`st.cpM`) ve hata mesajı (`st.cpErr`) temizlenir.
- **Poster Başlık–Alt Başlık Çarpışma Koruması (`posters.js` `kuraCv`, `karneDnaCv`):** ŞL Puan Durumu, ŞL Kura, Standart/Lig Tablo, Standart/Lig Kura ve Taktiksel DNA poster başlıkları `c.font` + güvenli `fit()` sınırlarına alınarak uzun sezon adlarında sağ alt başlıkla binme tamamen kapatıldı.
- **Şablon Geçişinde Özel `cap` Koruması & Akıllı Maç Günlüğü (`coop.js` `cptpl`, `coopMatchLogCard`):** Şampiyonlar Ligi dışındaki şablon geçişlerinde kullanıcının özel Ülke Limiti (`cap`) artık sıfırlanmaz; Ortak Maç Günlüğü aktif oyuncunun 0 maçı varsa otomatik olarak maçı bulunan tarafı açar.

## v24.2 (2026-11-25) — 2P Final Geri Alma, Maç Kartı Başlık Koruması, Çoklu Sekme Kilitleri & Bellek Yedeği
- **Final / Son Lig Maçı Geri Alma (`coop.js` `coopPlayView`):** Turnuva sonucu çıktıktan sonra Kurucu henüz **"Turnuvayı Sonlandır"** (`cpfin`) demeden yanlış girilen Final veya son lig maçı **`↩ Son Girdiğim Maçı Sil`** düğmesiyle silinip düzeltilebilir.
- **2P Maç Kartı Posteri Başlık Koruması (`posters.js` `macCv`):** Uzun 2P başlıklarının (`ORTAK SEZON X · MENAJER`) sağdaki tarih metnine binmesini önlemek için `c.font` + `fit(..., 800)` sınırı eklendi.
- **Kurucu Çoklu Sekme / Bayat Durum Koruması (`coop.js`):** `cpsimw`, `cpbuildko`, `cpsimko`/`cpsimall`, `cpfin` ve `cpsimm` işlemlerinin tamamı yazma öncesinde taze `coopPull(true)` + `S2.t.id === S.t.id` + `phase` doğrulamasından geçer; `cprlrst` de sunucu dönüş doğrulamasına bağlandı.
- **2P Maç Penceresi Hızlı Render (`app.js` `render()`):** `cpOnly` hızlı yolu sayesinde 2P maç girişi penceresinde `+1`/`-1`, golcü, asist veya MOTM değiştirirken arka plandaki tüm sayfa artık yeniden çizilmez.
- **`localStorage` Kota / Gizli Sekme Bellek Aynası (`coop.js`):** `coopSaveCfg` / `coopSaveCache` yazma hatasında (`QuotaExceededError` / Gizli Sekme) oturum içi bellek aynasına (`_coopMemCfg`, `_coopMemCache`) kesintisiz geçer.
- **Doğrulama & Kaçış Cilası (`coop.js`):** `cpmsave` artık `cleanStatsW` istatistik kırpma uyarılarını (`csr.warns`) kayıt bildiriminde gösterir; `coopMatchDlg` içindeki `glBlock` başlığı `esc()` ile sarıldı.

## v24.1 (2026-11-25) — 2P Mobil Taşma & Performans Düzeltmesi, YZ Modu, Maç Günlüğü & Ölü Kod Temizliği
- **Mobil `.cp-top` Tek Satır Sığdırma (`coop.js`, `style.css`):** `Kurucu`/`Misafir` rozeti alt `.cp-meta` durum satırına alınarak 360–410 px telefonlarda (2. sezon `🏆 Geçmiş` ikonu dahil) yatay taşma tamamen giderildi; bağlantı beklenirken gösterilen `!S` üst barı da aynı düzene hizalandı.
- **2P Render Performansı (`app.js`):** `render()` artık `st.coopMode` açıkken bireysel sekmelerin (`homeView`, `histView`, `tstatView`) HTML’ini boşa hesaplamaz.
- **Puan Ligi Kurulumu & Direkt Eleme 4 Sekme (`coop.js`):** Puan Ligi kurulumunda etkisiz olan `gcap` ve `dm` (Torbalı/Rastgele) alanları gizlendi; Direkt Eleme’de boş `Eşleş.` sekmesi kaldırılarak 4 dengeli sekme (`Genel`, `Eleme`, `Kıyas`, `Geçmiş`) düzenine geçildi.
- **Ortak Maç Günlüğü Geliştirmeleri (`coop.js`):** Uzun liglerde sayfanın şişmesini önlemek için varsayılan son 5 maç gösterimi + **`Tüm Maçları Göster`** aç/kapa eklendi; H2H maçlarda iki tarafın golcüleri birlikte gösterilir.
- **2P YZ Simülasyon Modu & Misafir Kura Posteri Simetrisi (`coop.js`, `posters.js`):** Kurucu hem kurulumda hem maç ekranında **Dengeli / Gerçekçi / Sürpriz** simülasyon modunu seçebilir; maç öncesi ŞL kura posteri Misafir tarafından açıldığında kendi 8 maçlık fikstürü çizilir, çok gruplu kura/puan durumu posterlerinde Misafir’in grup kartı gökyüzü mavisiyle vurgulanır.
- **Ölü Kod Temizliği (`duel.js`):** Hiç çağrılmayan `duelScoreboard` fonksiyonu temizlendi.

## v24.0 (2026-11-25) — 2P Flagship Broadcast Deneyimi (5 Paket Tamamlandı)
- **Ortak Maç Günlüğü & Maç Kartı Posteri (`coop.js`, `posters.js`):** 2P `Genel` sekmesine Kurucu/Misafir geçişli **Ortak Maç Günlüğü** eklendi; oynanan her maçın golcüleri, asistleri, MOTM rozeti ve xG/Topla Oynama/Şut çipleri görüntülenir, her maç için tek tıkla **Maç Kartı Posteri (PNG)** üretilir.
- **Canlı Otomatik Eşitleme & Tek Tıkla Davet Paylaşımı (`coop.js`, `app.js`):** Uygulamaya geri dönüldüğünde (`visibilitychange`) 2P odası 10 sn aralıkla sessizce yenilenir; üst çubuğa WhatsApp/sistem paylaşım menüsü destekli **Davet Paylaş** düğmesi eklendi.
- **Tam Etkileşim & Veri Tutarlılığı (`coop.js`, `app.js`):** 2P `Kıyas` sekmesindeki TOTS sahası perspektif saha çizgili ve tıklanabilir amiral gemisi `totsPitchHtml` bileşenine yükseltildi; Gol/Asist Krallığı satırları (`tpinfo`) ve Fikstür › Eleme Ağacı takımları (`tinfo`) tıklanabilir yapıldı; `tourneyPlayerDetail` ve `macCv` içinde H2H otomatik MOTM satır tutarlılığı eşitlendi; `setup/pick` aşamasında global arama izolasyonu tamamlandı.
- **Premium Broadcast Arayüz & Açık Tema Kontrastı (`coop.js`, `style.css`):** Tek satırlı kompakt `cp-top` oda barı, 5 sekmeli dengeli `.cp-tabs`, ham emojiler yerine çizgisel SVG ikonlu 2 sütunlu poster ızgarası (`.cp-pgrid`), `.cp-hero`, `.cp-rh` ve eksiksiz `[data-theme="light"]` yüksek kontrast renk paleti eklendi.
- **Eleme Ağacı Posteri Misafir Simetrisi (`posters.js` `koCv`):** Misafir şampiyon olduğunda altın şampiyonluk aurası aktif olur; Misafir eşleşme kart çerçevesi ve skor kutusu gökyüzü mavisiyle simetrik vurgulanır.

## v23.9 (2026-11-25) — 2P Turnuva Detay Ayarları (GEN & Ülke, CL Hariç) & 3 Görsel Hata Düzeltmesi
- **2P Turnuva Detay Ayarları (`coop.js`, `app.js`):** Şampiyonlar Ligi hariç tüm ortak turnuva formatlarında (Gruplu, Puan Ligi, Direkt Eleme) kurulum ekranına tam özelleştirme eklendi: Takım/Grup/Çıkan takım sayıları, Bölge (Tümü / Avrupa / Avrupa Dışı), Ülke Filtresi (ülke çıkar/ekle), Güç (GEN En Az/En Çok, Hücum, Orta Saha, Defans), Ülke Limiti, Grupta Aynı Ülke Koruması, Katılımcı Seçimi (En Güçlü / Rastgele), Kura Yöntemi (Torbalı / Rastgele) ve Varsayılana Sıfırla.
- **Dev Şimşek İkonu Düzeltmesi (`coop.js`, `style.css`):** `cpsimw`, `cpsimko`, `cpsimall`, `cpbuildko` ve `cpfin` butonlarına `ui-btn` ve `.btn.ui-btn svg` (`17×17px`) boyutu eklenerek simülasyon butonundaki SVG taşması giderildi.
- **Sağ Oyuncu Kartı `.g` Çakışması Düzeltmesi (`coop.js`, `style.css`):** Global `.g` rozet sınıfıyla çakışan tüm 2P `g` sınıfları `.cp-g` olarak ayrıştırıldı ve `.cp-gl` `minmax(0, 1fr)` ile sabitlendi.
- **Eleme Ağacı Tur Başlığı (`style.css`):** `.bkrh` başlık şeridine flex aralığı eklenerek `Play-Off8/8` bitişikliği giderildi.

## v23.8 (2026-11-24) — 2P Tepkisizlik Düzeltmesi (`t.rl.xc`), 2P Slot Takım Çekilişi & Takım Izgarası Taşma Düzeltmesi
- **2P Butonunun Tepki Vermemesi Düzeltildi (`coop.js`, `app.js`):** Firebase’in boş `rl.xc: []` dizisini silmesi nedeniyle kurulum ekranı (`avail` → `elig`) açılırken oluşan `TypeError` hatası `coopNormSim` içinde `t.rl` ve `t.rl.xc` varsayılanlarıyla onarıldı; ayrıca `coopView()` çağrısı `try/catch` korumasına alındı ve `cpopen` açık bireysel panelleri (`st.qs` vb.) temizleyecek şekilde güncellendi.
- **2P Takım Seçiminde 3 Makaralı Slot Çekilişi (`coop.js` `coopSpin`):** Ortak turnuvadaki **🎲 Rastgele** butonu artık bireysel moddaki 3 makaralı çekiliş animasyonunu (`.slotbox`, `Atla` destekli) rakibin seçtiği takımı dışlayarak çalıştırır ve bitince sunucuya kaydeder.
- **2 Sütunlu Takım Listesi Taşma & Etiket Düzeltmesi (`style.css`, `coop.js`):** `.cp-tgrid` ızgarası `minmax(0, 1fr) minmax(0, 1fr)` ve `.cp-tbtn` `min-width: 0; box-sizing: border-box` yapılarak sağ sütundaki GEN rozetlerinin kesilmesi giderildi; boş odadaki `Misafir (Misafir)` tekrarı `Misafir · Arkadaşın` olarak sadeleştirildi.

## v23.7 (2026-11-24) — 2P Firebase Düello Kuralı Uyumu (HTTP 401 Çözümü) & Mobil Üst Çubuk Ferahlığı
- **Mevcut Firebase Düello Kuralıyla %100 Uyum (`coop.js`):** Firebase kurallarına hiç dokunmadan `HTTP 401` hatasını gidermek için 2P oda yolu küçük harfe (`cp-xxxxxx`), oyuncu düğümleri `u_cphost01` / `u_cpguest1` formatına ve yük şeması `uid`, `name`, `ut`, `car` alanlarını içerecek şekilde `duel.js` ile birebir uyumlu hâle getirildi.
- **Mobil Üst Çubuk Düzeni (`style.css`):** 440 px ve altı telefon ekranlarında `2P` butonunun yanında sezon seçicisinin `"Se ▾"` şeklinde daralması giderildi (`min-width: 86px`, kompakt boşluklar).

## v23.6 (2026-11-24) — 2P Lejant CSS Düzeltmesi, Kulüp/Oyuncu İzolasyonu & UX Cilaları (Final)
- **2P Puan Tablosu Lejant Çakışması & Renk İzolasyonu (`coop.js`, `style.css`):** `.gleg i` (`3px`) kutusuyla `◆` simgesinin üst üste binmesi ve `.lgm` sınıfından bireysel kulüp rengi sızması giderildi; 2P tablosu için sabit altın (`.cp-lgh`) ve gökyüzü mavisi (`.cp-lgg`) lejant çubukları tanımlandı.
- **2P Kulüp & Oyuncu Penceresi Tam İzolasyonu (`app.js`, `coop.js`):** 2P modunda herhangi bir kulübe (`tiDlg`, `tiBody`, `teamPitchHtml`) veya oyuncuya (`tpDlg`, `tourneyPlayerDetail`) tıklandığında artık bireysel sezon yerine aktif 2P ortak turnuvanın kendi gol/asist/MOTM istatistikleri ve `★ Kurucu / ◆ Misafir` etiketleri gösterilir; bireysel kariyer profili sızıntısı kapatıldı.
- **Durum Temizliği & Savunma Korumaları (`coop.js`):** `cpnew` yeni sezon açmadan önce sunucudan taze veri (`coopPull`) çeker; `cpnew`, `cpleave`, `cpcreate` ve `cpjoin` işlemlerinde `st.cpQ`, `st.cpPickW` ve `st.cpFxw` sıfırlanır; `coopPlayView` girişine eksik `hTi`/`gTi` verisi için savunma koruması eklendi.
- **3 İnce UX Cilası (`coop.js`, `app.js`, `style.css`):** Çift maçlı eleme 2. ayağında **`1. Maç · Toplam`** skor şeridi (`.cp-agg`), `2P` modu açıkken bireysel alt menü vurgusunun sönmesi ve `Kıyas` kartının tepesinde iki sütunlu **`★ Kurucu VS ◆ Misafir`** başlık şeridi (`.cp-cmphd`) eklendi.

## v23.5 (2026-11-24) — 2P Ağ-Hatası Koruma Kapıları, Esc Desteği, TOTS Aura & Sezon Arası Geçmiş (Final)
- **Ağ Kopmasında Veri Kaybı & Sahte Başarı Engeli (`coop.js`):** 12 kritik sunucu yazma noktasının tamamında (`cpmsave`, `cpsimw`, `cpbuildko`, `cpsimko`, `cpsimall`, `cpdraw`, `cpfin`, `cpnew`, `cppick`, `cpmundo`, `cplock`, `cpbacksetup`, `cpjoin`) `coopPushHost` / `coopPushGuest` dönüş değeri kontrol edilir. Bağlantı koptuğunda maç girişi modalı kapanmaz, hata mesajı doğrudan modal içinde görünür ve girilen tüm gol/asist/MOTM/xG verileri korunarak tek tıkla yeniden gönderilebilir.
- **Klavye `Escape` Desteği (`app.js`):** `Esc` tuşu artık 2P maç girişi penceresini (`st.cpM`) de temiz şekilde kapatır.
- **2P Şampiyonluk TOTS Aurası (`posters.js` `totsCv`):** Ortak turnuvada Kurucu veya Misafir şampiyon olduğunda TOTS posteri altın şampiyonluk arka planıyla çizilir.
- **2P ŞL Bölge Lejantı & Sezon Arası `🏆 Geçmiş` Erişimi (`coop.js`, `style.css`):** 36 takımlı 2P ŞL puan tablosu altına `1. Lider · 2–8 Son 16 · 9–24 Play-Off` renk açıklamaları eklendi; yeni sezon kurulumu veya takım seçimi aşamasında üst çubuktaki **`🏆 Geçmiş`** düğmesiyle `Ortak Kupa Geçmişi` ve PNG posterine kesintisiz erişim sağlandı.

## v23.4 (2026-11-24) — 2P Co-op Son 7 Bulgu Kapanışı (Nihai Sürüm)
- **Şablon Geçişinde `cap = 4` Kilidi Düzeltmesi (`coop.js` `cptpl`):** Şampiyonlar Ligi’nden Bölge değiştirilse bile başka şablona (ör. Klasik 64) geçildiğinde `rl.cap` artık her zaman `0`’a sıfırlanır; 47/64 havuz kilidi kapatıldı.
- **Adil Otomatik H2H MOTM (`coop.js` `coopTourneyStats`):** Doğrudan H2H maçlarında MOTM `"Otomatik"` bırakıldığında artık her zaman Misafir’e değil, maçı kazanan (veya golcü üstünlüğü olan) taraftan otomatik seçilir.
- **Kesin Kalan Maç Sayacı & Poster Hap Taşması (`coop.js`, `posters.js`):** Çift devreli lig/grupta `totRem` sayacı tüm oynanmamış H2H maçlarını (`filter(x => x.h2h).length`) doğru düşer; `coopHistCv` posterindeki `GOL KRALI` hapı uzun isimlerde taşmaması için `fit()` ile sınırlandı.
- **Takım Seçiminden Kuruluma Dönüş (`coop.js` `cpbacksetup`):** Kurucu kura çekmeden önce **`‹ Kuruluma Dön`** düğmesiyle format/bölge seçimine dönebilir; yeni oturum kimliğiyle eski takım seçimleri temizlenir.
- **2 Maçlı Eleme 1. Ayak, Misafir Bitiş Yönlendirmesi & Grup Başlıklı Fikstür (`coop.js`):** Çift maçlı elemenin 1. ayağında `Uzatma (UZ)` seçeneği gizlendi; turnuva bittiğinde Misafir ekranına net yönlendirme + `↻ Yenile` eklendi; çok gruplu turnuvalarda haftalık `Fikstür` artık `Grup A`, `Grup B`… başlıklarıyla gruplanır.

## v23.3 (2026-11-24) — 2P Yarış-Durumu Korumaları, 10 Sütunlu Tablo & Arayüz Cilaları
- **Eski İstemci & Çapraz Sezon Koruması (`coop.js` `cpmsave`, `cpmundo`):** Maç kaydetme ve son maç silme işlemleri sunucudan taze veri çektikten sonra aktif sezon kimliğini (`S2.t.id === S.t.id`), turnuva aşamasını (`phase === "play"`), eleme başlangıcını ve `coopCanUndoLast(S2)` şartını tekrar doğrular; eski ekrandan yanlış sezona veya kilitli tura yazma/silme tamamen kapatıldı.
- **Eşzamanlı Aynı Takım Seçimi Engeli (`coop.js` `cppick`, `cpdraw`):** Takım seçimi öncesinde taze durum çekilip arkadaşının az önce aldığı kulüp engellenir; kura çekiminde de `hTi === gTi` son savunma kontrolü eklendi.
- **2P Puan Tablosu 10 Sütun Uyumu (`coop.js` `sub === "tablo"`):** 480 px üzeri ekranlarda sütun kaymasını gidermek için `AG` ve `YG` (`.pt-ag`) sütunları ve mobil `+ AG·YG` geçiş düğmesi eklendi.
- **Elenen Oyuncu Durumu (`coop.js` `coopIsEliminated`, `coopPlayView`):** Elenen oyuncuya artık `"✓ Bu turdaki maçın tamamlandı"` yerine net `"Elendin · Turnuva devam ediyor"` uyarısı ve durum rozeti gösterilir.
- **Birleşik H2H MOTM Seçicisi & Lobi Girdi Koruması (`coop.js`, `app.js`):** Doğrudan karşılaşmalarda çelişkili çift MOTM kutusu iki takımın kadrosunu gruplayan tek bir **`Maçın Adamı (MOTM)`** seçicisine birleştirildi; lobi ekranında `Misafir / Kurucu Geri Dön` geçişinde yazılan oda kodu ve ad korunur.
- **Bireysel Sezon Geçişi & Onay Ayrımı (`app.js`):** Üst çubuktan bireysel sezon değiştirildiğinde (`#ss`) veya yeni bireysel sezon açıldığında (`＋`) `2P` modundan otomatik çıkılır; onay penceresi izolasyonu `st.ask.coop` bayrağıyla ayrıştırıldı.

## v23.2 (2026-11-24) — 2P Co-op Mühendislik Sertleştirmesi (7 Bulgu Kapanışı)
- **Firebase RTDB Seyrek/Boş Dizi Koruması (`coop.js` `coopNormSim`, `coopToArr`):** Firebase’in boş dizileri (`[]`) silip seyrek haftaları nesneye (`{"1":[...]}`) dönüştürmesinin `coopCalcTable` ve `coopTourneyStats` (`p.s1.slice`) içinde çökme yaratması tamamen engellendi.
- **2P Poster Doğruluğu & Misafir Vurgusu (`coop.js` `coopAsPosterSeason`, `posters.js` `koCv`, `kuraCv`):** Eleme Ağacı posteri öncesinde `coopSyncKo` çalışır ve tek oyunculu `initKoBracket` atlanır; Misafir’in maçları Kurucu’nun kulübüne kaymaz; maç öncesi kura ve eleme ağacı bağlantılarında Misafir (`◆`) gökyüzü mavisiyle vurgulanır.
- **Eleme Geri Alımında Hayalet Tur Temizliği (`coop.js` `coopSyncKo`):** Eleme maçı geri alındığında üst turda oynanmamış hayalet eşleşmeler otomatik temizlenir.
- **Kurucu Oda Kurtarma (`coop.js` `coopLobbyView`, `cpjoin`):** *"Mevcut Odaya Katıl"* kartına **`Misafir Katıl | Kurucu Geri Dön`** rol seçimi eklendi; Kurucu cihaz değiştirse veya odadan çıksa bile `guest.json`’a dokunmadan odasını geri alabilir.
- **Ortak Kupa Geçmişi Posteri Tipografi Düzeltmesi (`posters.js` `coopHistCv`):** Tüm `fit(c, ...)` ölçümleri öncesinde doğru `c.font` boyutu atanarak isimlerin erken/geç kesilmesi giderildi.
- **Onay İzolasyonu, Çift Tıklama Kilidi & Çift Ayak Gösterimi (`app.js`, `coop.js`):** Co-op onay pencereleri artık bireysel `store`’a dokunmaz ve yanıltıcı bireysel `"Geri al"` bildirimi çıkarmaz; ağ yazma işlemlerine `st.cpLock` kilidi, Misafir kaydına atomik `coopPull` ve Fikstür eleme eşleşmelerine çift ayak skorları eklendi.

## v23.1 (2026-11-24) — 2P Ortak Turnuvada Esnek / Asenkron Maç Sırası & H2H Erteleme
- **Serbest Maç Sırası ve H2H Erteleme (`coop.js`, `style.css`):** Grup, Puan Ligi ve 36T Şampiyonlar Ligi aşamalarında iki oyuncu aynı anda müsait değilse (örneğin 1. haftada doğrudan karşılaşma denk geldiyse) o maçı erteleyip kalan tüm yapay zekâ maçlarını diledikleri sırayla oynayabilirler.
- **Kilitlenmeyen YZ Hafta Simülasyonu (`coop.js` `cpsimw`):** Kurucu diğer yapay zekâ haftalarını arkadaşının veya ertelenmiş H2H maçının oynanmasını beklemeden simüle edebilir; Eleme Ağacı (`cpbuildko`) ve Lig Şampiyonluğu yalnızca tüm YZ haftaları ve iki oyuncunun ertelenmiş H2H dahil tüm maçları tamamlandığında kesinleşir.
- **Esnek Geri Alma & Mükerrer Kayıt Koruması (`coop.js` `coopCanUndoLast`, `cpmsave`):** Eleme aşaması başlamadığı sürece son girilen grup/lig maçı güvenle silinebilir; çift tıklamayla mükerrer maç kaydı engellendi.

## v23.0 (2026-11-24) — 2 Kişilik Online Ortak Turnuva Modülü (`coop.js`), Dual Posterler & Ortak Kupa Geçmişi Posteri
- **Çift Girişli İzole 2P Mimarisi (`coop.js`, `app.js`):** Üst çubuğa kompakt **`2P`** geçiş butonu (aktif odada yeşil noktalı) ve `Kurulum` ekranının tepesine **`Bireysel | Arkadaşla (2P)`** anahtarı eklendi. Tek kişilik `IndexedDB` veritabanına, JSON yedeklerine ve çevrimdışı çalışmaya hiç dokunmaz.
- **Çakışmasız 2 Düğümlü Firebase Eşitlemesi (`coop.js`):** Mevcut `/rooms/` altyapısı üzerinde **`host.json`** (Kurucu) ve **`guest.json`** (Misafir) ayrımıyla iki telefonun aynı anda birbirinin maçını ezmesi engellendi; 6 haneli oda kodu (`CP-XXXXXX`) ile anında katılım sağlanır.
- **4 Formatın Tamamında 2 Oyunculu Simülasyon (`coop.js`):** Gruplu (*Dünya Kupası, Klasik 64, Mini Lig*), **36 Takımlı Şampiyonlar Ligi**, **Puan Ligi** ve **Direkt Eleme** formatlarında her iki insan oyuncunun maçları ayrı ayrı girilir, birbirleriyle oynanan **Doğrudan Düello (H2H)** maçlarını Kurucu girip Misafir ekranına yansıtır, kalan yapay zekâ maçları iki oyuncu da hazır olduğunda Kurucu tarafından simüle edilir. Yanlış girilen son maç hafta/tur simüle edilmeden geri alınabilir (`↩ Son Girdiğim Maçı Sil`).
- **Detaylı Turnuva İçi Kıyas, TOTS & 4 Paylaşılabilir PNG Poster (`coop.js`, `posters.js`):**
  - Yan yana menajer kıyası (G-B-M, Puan/Maç, Gol, Temiz Kasa %, opsiyonel xG / Topla Oynama ve Taktiksel DNA), ortak Gol/Asist krallığı ve iki oyuncuyu farklı renklerle (*★ Kurucu Altın · ◆ Misafir Gökyüzü Mavisi*) vurgulayan **TOTS**, **Puan Durumu/Kura** ve **Eleme Ağacı** posterleri.
  - Tüm bitmiş ortak sezonları toplayan **Ortak Kupa Geçmişi** ekranı ve sıfırdan çizilen 1080×1460 **`coopHistCv` Ortak Kupa Geçmişi PNG Posteri**.

## v22.3 (2026-11-24) — ŞL Hafta–Silme Bütünlüğü & Son 4 İnce Cila
- **Şampiyonlar Ligi Hafta–Silme Eşleşmesi (`sim.js` `uclWeekOfOpp`, `uclHasPlayedWeek`, `app.js`):** ŞL’de geçmiş bir hafta maçı silinip sonradan yeniden eklendiğinde `s.mt` dizi sırasından bağımsız olarak fikstür haftası (`w`) baz alınır; eksik hafta oynanmadan simülasyon açılmaz, `Haftanın Bülteni` ve geri-alma indeksi her zaman doğru haftayı hedefler.
- **`Sonucu Sil` Onay Koruması (`app.js` `a == "unfin"`):** `Takımım › Sezon Sonucu` kartındaki sonuç silme butonuna onay penceresi eklendi.
- **Etiket Tutarlılığı (`app.js` `recCard`, `tourneyPlayerDetail`):** `Geçmiş › Rekorlar` ve oyuncu detay penceresindeki maç listelerinde ŞL/Lig maçları artık `"Lig Aşaması"` / `"Lig"` olarak gösterilir.
- **Çok Gollü Maç Kartı Posteri (`posters.js` `macCv`):** Rakibin 4+ gol attığı maçlarda golcü isimleri tek satırda kesilmek yerine otomatik çok satırlı kutuya sarılır.
- **Adil Kulüp vs. Kulüp Kıyaslaması (`duel.js`, `posters.js`):** `Kulüp vs. Kulüp` sekmesi ve PNG posteri `"Toplam Averaj"` yerine hacimden bağımsız `"Maç Başı Averaj"` (`gdpm`) üzerinden puanlar.

## v22.2 (2026-11-24) — Eleme/Final Penaltı Koruma, 1. Ayak Düzenleme & Etiket Bütünlüğü
- **Tek Maçlı Eleme & Final `P 0–0` Koruması (`app.js` `matchCard`, `msave`, `sim.js`):** Maç girişi `0–0` açıldığında `Penaltılar (P)` artık otomatik kilitlenmez; skor eşit değilken penaltı kutusu gizlenir ve `pf/pa` asla yazılmaz (`2–0 (P 0–0)` kirliliği tamamen kapatıldı). `syncUserMatchesToBracket` penaltıları yalnızca toplam skor gerçekten eşitken uygular.
- **Çift Maçlı Elemede 1. Ayak Düzenleme (`app.js` `msave`):** 2. maç oynandıktan sonra 1. maçı düzenlerken oluşan penaltı kilidi kaldırıldı; penaltı zorunluluğu yalnızca belirleyici ayakta (tek maç veya 2. ayak) aranır.
- **Eleme Turu Ayak Limiti (`app.js` `msave`):** Aynı eleme turunda izin verilen maç sayısından fazla (örn. 2. Final veya 3. ayak) yanlışlıkla yeni maç eklenmesi engellendi.
- **Direkt Eleme Ana Ekran Yönlendirmesi (`app.js` `homeView`):** Direkt Eleme formatında ana ekran aksiyon butonu artık doğrudan **`Fikstür / Eleme Ağacı`** sekmesine açılır.
- **Poster, Düello Etiketleri & Ölü Kod Temizliği (`posters.js`, `duel.js`, `app.js`):** `Maç Kartı`, `Sezon Karnesi` ve `Canlı Düello`’da ŞL/Lig maçları `"Lig Aşaması"` / `"Lig"`, Direkt Eleme kura posteri `"EŞLEŞMELER"` olarak güncellendi; kullanılmayan `lgchamp` yöneticisi temizlendi.

## v22.1 (2026-11-24) — 4 Format Uçtan Uca Doğrulama & 15 Hata Kapanışı (Final)
- **Şampiyonlar Ligi Eleme & Fikstür Koruması (`app.js`, `sim.js`):**
  - Play-Off maçı düzenlendiğinde veya silindiğinde `Son 16`’daki İlk 8 seri başı yerleşimi artık silinmez (`resetUclR16Results`); yalnızca sonuçlar sıfırlanıp sonraki turlar temizlenir.
  - İlk 8’de bay geçen kullanıcı için `Finale Kadar Simüle Et` gizlendi; ayrıca `simKoStage` bir turu simüle ettikten sonra kullanıcının maçında durduğunda yapılan simülasyonun `save()` ile kalıcı olarak yazılması garanti altına alındı.
  - ŞL Lig Aşamasında maç girişi o haftanın fikstür rakibine bağlandı; tablonun maç sayısı kayması önlendi.
  - İlk 8’deyken Play-Off tamamlanmadan ana ekranda doğrudan **`Play-Off Turunu Simüle Et`** aksiyonu sunulur; skor panelinde rastgele rakip açılması engellendi.
- **Yarı Final Büyük Maç & TOTS Düzeltmesi (`sim.js`, `app.js`):** `RN[1]` (`undefined`) hatası `RN[4]` (*Yarı final*) olarak düzeltildi; Yarı Final maçları artık hem simülasyon tecrübe/tempo etkisine hem TOTS derinlik puanlamasına doğru girer.
- **Direkt Eleme, Tek Grup & Puan Ligi Akış Düzeltmeleri (`app.js`):**
  - Direkt Eleme (`gs=0`) kura onayı sonrasında eleme ağacı otomatik kurulur ve doğrudan `Fikstür / Eleme Ağacı` ekranına geçilir.
  - Tek gruplu turnuvalarda (`16×16`, `32×32`) `gcap` kilidi kaldırıldı; `Puan Ligi` için tek dokunuşlu fikstür/tablo kurulumu ve son hafta simülasyon koruması eklendi.
  - Çift maçlı elemede toplam skor eşitken penaltı girilmeden kaydetme engellendi; eleme ağacı kuruluyken `↩ Geri Al` (`simu`) için onay eklendi.
- **ŞL İstatistik, Yedek Doğrulama & Canlı Düello Cilaları (`app.js`, `sim.js`, `duel.js`, `style.css`):**
  - ŞL `gInfo` artık 8 fikstür rakibinin ortalama gücünü ve 36 takım içindeki fikstür zorluk sırasını gösterir; Maç Günlüğü ve turnuva istatistikleri `"GRUP"` yerine `"Lig Aşaması"` / `"Lig"` etiketlerini kullanır.
  - `vS()` yedek doğrulayıcısına `s.ucl` doğrulaması, Canlı Düello ŞL tablosuna **8. ve 24. sıra** çizgileri ve `"Bekleniyor"` metni, `nm()` çıktısına `esc()` kaçış koruması eklendi.

## v22.0 (2026-11-24) — Gerçek 36 Takımlı UEFA Şampiyonlar Ligi Formatı (Lig Aşaması + Play-Off)
- **6. Özel Turnuva Formatı (`app.js`, `sim.js`):** Mevcut formatlardan tamamen izole (`cfg.ucl = 1`), gerçek UEFA kurallarına uygun **Şampiyonlar Ligi (36 Takım · 8 Maç + Play-Off)** şablonu eklendi. Varsayılan olarak Avrupa kulüpleri, ülke başına en fazla 4 takım, çift maçlı Play-Off/Eleme ve tek maçlı Final ile kurulur.
- **Matematiksel 4 Torba × 8 Hafta Kura & Fikstür Motoru (`sim.js` `genUclDraw`, `UCL_TPL`):** 36 takım 9’arlı 4 torbaya ayrılır; her takım her torbadan 1 iç saha + 1 deplasman olmak üzere toplam 8 farklı rakiple (4 EV / 4 DEP, 144 lig maçı) eşleşir; aynı ülke eşleşmesi ve yabancı ülke sınırı yerel aramayla optimize edilir. İnteraktif kura ekranında 8 rakibin tek tek çekilebilir.
- **3 Bölgeli Canlı Puan Tablosu (`app.js` `grpCard`, `style.css`):** 1–8. sıralar (**Doğrudan Son 16**), 9–24. sıralar (**Play-Off**) ve 25–36. sıralar (**Elenir**) renkli kenar çizgileri ve kesikli hatlarla ayrılır; üst şeritte kendi sıran ve İlk 8 / İlk 24 puan farkı canlı gösterilir; UEFA eşitlik kuralı (Puan → Averaj → Atılan Gol → Galibiyet → Güç) uygulanır.
- **Gerçek UEFA Play-Off + Son 16 Eleme Ağacı (`sim.js` `buildUclBracket`, `koTreeHtml`):** Lig Aşaması bitince İlk 8 doğrudan Son 16’da yerini alır; 9–24. sıralar resmi UEFA çiftli seri başı eşleşmeleriyle (`9/10 vs 23/24`, `11/12 vs 21/22`, `13/14 vs 19/20`, `15/16 vs 17/18`) Play-Off oynar ve kazananlar düz yatay bağlantıyla Son 16’ya bağlanır (1 ve 2 numaralı seri başları yalnızca Final’de karşılaşabilir).
- **Şampiyonlar Ligi Broadcast Posterleri (`posters.js` `kuraCv`, `koCv`):** Kura posteri **Senin 8 Rakibin + 4 Torba** düzeninde, Canlı Puan Durumu posteri **2 sütunlu (1–18 / 19–36)** broadcast düzeninde, Eleme Ağacı posteri ise 5 turlu **Play-Off → Son 16 → Çeyrek → Yarı → Final** yapısında çizilir.

## v21.3 (2026-11-24) — Final Doğrulama, Mantık & Veri Koruması ve Kusursuz Palet Cilası
- **0 Gollü Maçta MOTM Seçimi (`app.js` `motmUI`):** `Maçın Adamı (MOTM)` seçicisi gol atanlar bloğundan ayrıldı; 0–0 biten veya gol atılmayan maçlarda da kaleci/savunma oyuncusu MOTM olarak seçilebilir.
- **Ana Ekran Eleme & Bitiş Zekâsı (`app.js` `homeView`):** Eleme turunda elenildiğinde veya turnuvanın şampiyonu kesinleştiğinde ana ekran artık doğrudan **`Turnuvayı Sonlandır`** ya da **`Eleme Ağacını Takip Et ›`** aksiyonunu sunar.
- **Evren Şampiyon Koruması & Bitmiş Sezon Koruması (`app.js`, `sim.js`):** `Takımım › Sezonu Bitir` ile manuel kayıtta `getTourneyOutcome()` üzerinden şampiyon (`ch`) ve finalist (`ru`) otomatik devralınır; tamamlanmış bir sezonda maç düzenlerken/silerken onay alınır ve sezon ödülleri (`topG`, `mvp`, `tots`, `pts`) anında yenilenir; son 6 biten sezonun fikstür golcü detayları korunur.
- **Semantik `--ok` Sızıntı Kapanışı & Sıfır Flaşlı Kulüp Paleti (`style.css`, `index.html`, `app.js`):** Puan tablosu çıkış hattı, eleme turu kazananı, `Gruptan çıktın` şeridi, `Fikstür` galibiyet/mağlubiyet skor kutuları ve `Sezon Karşılaştır` sol sütunu tüm 5 renk paletinde tutarlı anlam renklerine oturtuldu; `Kulübümün Rengi` paleti açılış öncesi `localStorage` önbelleğiyle sıfır yeşil flaşla yüklenir.
- **Poster, Bülten, Düello & Kısayol Cilaları (`posters.js`, `sim.js`, `duel.js`, `app.js`, `manifest.webmanifest`):**
  - `Maç Kartı` posterinin ana şeridi gerçek maç sonucunu (`GALİBİYET`, `PENALTILARLA GALİBİYET` vb.) korur; Hak Ediş etiketi `MAÇ ANALİZİ` başlığına taşındı.
  - `Kulüp vs. Kulüp` posterindeki 7. `TOPLAM GOL` satırı nötr bilgi satırı yapılarak tepedeki 6 kriterli skorla birebir eşitlendi; xG verisi yoksa `1v1 Düello` posteri boş radar çizmek yerine kompakt yıldızlar bandına geçer.
  - `Haftanın Bülteni` artık kullanıcının kendi oynadığı hafta maçındaki sürpriz ve hat-trick’leri de yakalar.
  - Düello’da `Son sezonlara dön` ikonu düzeltildi, 0 maçlık boş sezon `Son Dönem Formu`ndan çıkarıldı, `Odadan Ayrıl`da manuel rakipler korundu ve çevrimdışı düşen eşitleme için `online` otomatik gönderim eklendi.
  - Üst çubuktaki `+` (Yeni Sezon) ve `#yenisezon` kısayoluna aktif sezon koruması eklendi; `Maç Merkezi` PWA kısayolu doğrudan `#mac` (Maç Merkezi + Hızlı Skor) akışına bağlandı.

## v21.2 (2026-11-24) — Semantik Renk Ayrımı (--ok), 108/108 Kulüp Rengi, Evren Filtresi, Kadro Hafızası & Haftanın Bülteni
- **Semantik Yeşil (`--ok`) ve Tema Vurgu Rengi (`--ac`) Ayrımı (`style.css`):** *Kızıl Arena* ve diğer renk paletlerinde galibiyet, pozitif averaj, temiz kasa, hak edilmiş sonuç ve üstünlük göstergelerinin palet rengiyle karışması engellendi; futbol anlam renkleri (Galibiyet = Yeşil, Mağlubiyet = Kırmızı) her palette sabit kaldı.
- **108/108 Kulüp Rengi Tamamlaması (`app.js` `CLBC`):** Eksik kalan 38 kulübün (*Rayo Vallecano, Girona, Como, Sassuolo, Sunderland, Brentford, Bournemouth, Leeds United, Fulham, Celta Vigo, Osasuna, Lens, Rennes, Torino, Werder Bremen, Köln, Union Berlin* vb.) gerçek forma renkleri eklendi; `Kulübümün Rengi` paleti, maç tabelaları ve poster ışıkları artık tüm kulüplerde gerçeğe uygun çalışır.
- **Ölüm Grubu Rozeti & DNA Radar Dolgusu (`style.css`, `analytics.js`):** Ölüm Grubu kartındaki harf karesi (`.kgl`) yakut kırmızısına, `Taktiksel DNA` radar grafiğinin iç dolgusu seçili renk paletine (`fill="var(--ac)"`) bağlandı.
- **Turnuva Evreni Kupa/Lig Filtresi (`analytics.js`, `app.js`):** `Geçmiş › Evren` sekmesine **`Tümü | Kupa | Lig`** kırılımı eklendi.
- **Kadroda Kariyer Hafızası (`app.js` `tiCareerStrip`, `style.css`):** Herhangi bir kulübün kadro penceresi açıldığında, o kulüple yönetilen sezon sayısı, en iyi derece ve karşılaşma bilançosu (`G-B-M` ve gol) tek satırlık özet şeridinde gösterilir.
- **Haftanın Bülteni (`sim.js` `weekBulletinData`, `app.js` `weekBulletinCard`, `style.css`):** Haftalık simülasyon sonrasında `Turnuva › Gruplar` ekranında kapatılabilir kompakt bülten kartı eklendi (senin grubundaki diğer maç skoru, haftanın GEN sürprizi ve hat-trick/en gollü maç öne çıkanları).
- **Rötuş & Kod Temizliği (`app.js`, `posters.js`, `style.css`):** `MOTM` varsayılanı kesilmeyecek şekilde `"Otomatik"` yapıldı, TOTS/İlk 11 sahasında uzun tireli isimler (`Gibbs-White` vb.) için esnek yazı boyutu eklendi, `Sezonlar` kartındaki etiket `"Turnuva MVP"` olarak netleştirildi; eski `"Kura › Gruplar"` metinleri ve kullanılmayan `gqy/gqn/grk/playKarne` ölü kodları temizlendi.

## v21.1 (2026-11-24) — Mobil Ergonomi, Tam Renk Paleti Uyumu & Görsel Pürüz Temizliği
- **Klavye & Placeholder İyileştirmesi (`app.js`, `style.css`):** Maç giriş panelinde metin/sayı girişine odaklanıldığında sabit `Maçı Kaydet` çubuğu otomatik olarak akış içine alınarak `xG` kutusunun üzerini kapatması önlendi; örnek placeholder sayıları silikleştirildi (`opacity: 0.34`), takım adlarındaki Türkçe büyük harf dönüşümü (`MAN UNİTED`) düzeltildi.
- **Tam Renk Paleti Uyumu (`style.css`):** *Şampiyonlar Gecesi, Kraliyet Altını, Kızıl Arena* ve *Kulübümün Rengi* seçildiğinde sabit yeşil kalan üst ilerleme rayı, `Grubum` ilerleme barı, `Kura onaylandı` kutusu, grup harf rozetleri (`A`, `B`), grup `GEN` bloğu ve çıkış hattı vurguları seçili palete tam uyumlu hale getirildi.
- **Takım Seçimi Sonrası Akış (`app.js` `teamView`):** Takım belirlendikten sonra doğrudan `Kuraya Geç ›` (Lig modunda `Lig Tablosunu Oluştur ›`) ana aksiyon butonu eklendi.
- **Okunabilirlik & Kart Dengesi (`app.js`, `analytics.js`, `posters.js`, `style.css`):**
  - `Sezonun MVP’si` kartında istatistik hapları ismin altına alınarak uzun oyuncu isimlerinin kesilmesi giderildi.
  - Dar mobil ekranlarda (`<480px`) puan tablosunda takım adlarının kesilmemesi için varsayılan 8 sütunlu ferah görünüm ve tek dokunuşlu **`+ AG·YG`** genişletme çipi eklendi.
  - Turnuva istatistiklerindeki `.g` rozetlerine boşluk (`gap: 5px`) eklenerek bitişik görünen skor/parantez metinleri ayrıştırıldı.
  - Kurulum şablon alt yazıları kısaltıldı; `Güç ve Ülke Sınırları` bölümünün varsayılan ayarda `"1 sınır aktif"` diyerek kendiliğinden açılması düzeltildi.
  - Kura çekimi yapışkan üst paneli (`.dock`) opak/buzlu cam zeminle arkadan sızmayı önleyecek şekilde güçlendirildi; sekme geçişlerindeki kısa boşluk flaşı kaldırıldı; `Simülasyon Merkezi` buton metni ve `Düello` oda kodu girişi mobilde tek satıra/tam genişliğe uyarlandı.

## v21.0 (2026-11-24) — Canlı Puan Durumu Posteri, Turnuva Evreni Tarihi, 5 Renk Paleti & UX Cilası
- **Canlı Puan Durumu Posteri (`posters.js` `kuraCv`, `app.js` `groupsView`):** Maç oynanmadan önce kura posteri, grup/lig maçları başladıktan sonra ise `calcGroupTable` üzerinden canlı sıralamayı (`O, G, B, M, AV, P`; Lig modunda `AG, YG` dahil), hafta bilgisini ve çıkış çizgisini çizen broadcast puan durumu posteri eklendi.
- **Manuel "Gruptan çıktın mı?" Temizliği (`app.js` `grpBox`, `homeView`):** Simülasyon motoruyla çakışan manuel sıra seçimi ve `Evet, çıktım / Hayır, elendim` kutusu kaldırıldı; son grup maçı sonrası doğrudan son hafta simülasyonuna ve otomatik eleme ağacına yönlendirildi.
- **Maç Düzenleme & Silme Koruması + Skor Senkronizasyonu (`app.js` `msave`, `mdel`):** Geçmiş grup veya eleme maçlarını düzenlerken/silerken sonraki haftaların simülasyonları ya da eleme ağacı etkilenecekse önce onay alınır; grup maçı skoru değişip gruptan çıkanları etkiliyorsa eleme ağacı yeni sıralamaya göre otomatik yeniden kurulur.
- **Turnuva Evreni Tarihi (`analytics.js` `universeData`, `universeView`, `app.js` `histView`):** `Geçmiş` altına 7. sekme olarak **Evren** eklendi: en çok şampiyon olan kulüpler (Sen vs. YZ kırılımı), en çok final kaybeden lanetli finalistler, TOTS’a en çok seçilen efsane oyuncular, çoklu Gol Kralı / MVP onur listesi ve sezon kronolojisi.
- **5 Küratörlü Stadyum Renk Paleti & Tek Koyu Zemin (`style.css`, `app.js`, `index.html`):** *Zümrüt Saha, Şampiyonlar Gecesi, Kraliyet Altını, Kızıl Arena* ve kontrast korumalı *Kulübümün Rengi* paletleri eklendi; otomatik ve manuel koyu mod tek obsidyen zeminde (`#090c10`) eşitlendi.
- **Görsel Bütünlük & Temizlik (`app.js`, `style.css`, `posters.js`):**
  - Maç giriş paneline alta sabitlenen (`sticky`) kaydet çubuğu ve kompakt broadcast başlık eklendi.
  - Onay, ad değiştirme, sahip ve yedek modalları cam/obsidiyen modal diline yükseltildi (`z-index: 35`).
  - Boş kura kartlarındaki `.kcard` hatası `.kgc` olarak düzeltildi; sezon bitince `Takımım › Sezon Sonucu` sade özet + `Düzenle` görünümüne kavuşturuldu.
  - Tekrar eden öğretici notlar, `Oyun Ayarları` çift başlığı ve sarı butonun sonsuz yanıp sönme animasyonu kaldırıldı.
  - Teknik Ayarlar kartları katlanır **Sistem & Tanılama** bölümünde toplandı; `Yedek Zamanı` şeridine 7 gün erteleme (`✕`) eklendi.
  - iOS’ta poster görseli üzerinde basılı tutarak kaydetme kilidi açıldı; Sezon Karnesi açılışındaki takılan kare-kare yeniden çizim kaldırılıp yumuşak anında PNG önizlemeye geçildi; üst çubuğa aktif kulüp arması ve `Geçmiş` yatay sekmelerine sağ kenar kaydırma solması eklendi.

## v20.48 (2026-11-23) — Teknik Dayanıklılık, Önbellekleme & Dokümantasyon Güncellemesi
- **Firebase Ağ Zaman Aşımı (`duel.js` `duelFetch`):** Tüm bulut isteklerine (`duelPush`, `duelPull`, `duelDeleteRemote`) 8 saniyelik `AbortController` zaman aşımı eklendi; yarı kopuk mobil bağlantılarda eşitleme düğmesinin kilitli kalması önlendi.
- **Düello Özeti Önbelleklemesi (`duel.js` `buildDuelSummary`, `app.js` `save`):** `buildDuelSummary()` çıktısı `store` değişikliklerine bağlı olarak önbelleklendi; 50–100 sezonluk arşivlerde sekme ve filtre geçişleri sıfır yeniden tarama yüküyle anında çalışır.
- **Güncel Dokümantasyon (`README.md`, `KILAVUZ.md`):** Tüm 8 JS modülü, 99 kulüp arması, Canlı Menajer Düellosu, 100 sezonluk arşiv ve 9 PNG poster türü eksiksiz belgelendi.

## v20.47 (2026-11-23) — 3 Katmanlı Navigasyon Hiyerarşisi (Obsidiyen Alt Dock · Alt Çizgili Sekmeler · İnce Filtreler)
- **Katman 1 — Obsidiyen Yüzen Alt Dock (`style.css` `.nav`):** En alttaki ana menü (*Sezon · Turnuva · İstat. · Geçmiş · Ayarlar*) yarı saydam beyaz kutudan çıkarılarak koyu obsidiyen yüzen dock tasarımına geçirildi; aktif sekme zümrüt yeşili ışık ve üst altın-zümrüt çizgiyle vurgulanır.
- **Katman 2 — Alt Çizgili Sayfa Sekmeleri (`app.js`, `style.css` `.ptabs`):** *Turnuva*, *İstat.* ve *Geçmiş* sayfa alt sekmeleri kutu tasarımından çıkarılıp ince alt çizgili (underline) modern sekme şeridine dönüştürüldü; *Geçmiş* ekranındaki 6 sekme 2 satırlık blok yerine tek satırlık yatay kaydırmalı şerit oldu.
- **Katman 3 — İnce Filtre Çipleri & Düello Stüdyo Ayrımı (`style.css` `.stabs`, `.dl-nav`, `.dl-mbar`):** Sayfa içi filtreler (`Tümü / Kupa / Lig`, `Gerçekçi / Dengeli / Sürprizli`) inceltilerek belirginleştirildi; Düello ekranındaki 4 sekmeli stüdyo çubuğu obsidiyen aktif rozete, altındaki mod filtresi ise sade ince çipe geçirilerek çift yeşil bar karmaşası giderildi.

## v20.46 (2026-11-23) — Tek Kaynaklı 10 Kriterli Değerlendirme Sistemi, Sezon Sayacı & Kısa Derece Etiketleri
- **Tek Kaynaklı 10 Kriterli Kariyer Motoru (`duel.js` `duelCareerCriteria`, `posters.js` `duelloCv`):** Hero VS skoru, *Kariyer & Kupa Karnesi* ve *1v1 Düello PNG Posteri* artık birebir aynı **10 puanlı kriterden** (*Şampiyonluk, Kupa Oranı, Final/İlk 2, Galibiyet Oranı, Maç Başı Puan, Atılan Gol/Maç, Yenilen Gol/Maç, Temiz Kasa %, En Uzun Seri, Beklenti Üstü*) ve 1 nötr *Ort. Takım GEN* satırından beslenir; ekran ile poster arasında skor/satır uyuşmazlığı sıfırlandı.
- **Tek Kaynaklı Sezon Kıyaslama & Maç Başı Averaj (`duel.js` `duelSeasonCriteria`, `posters.js` `duelloSezonCv`):** Kümülatif *Sezon Averajı* yerine farklı maç sayılarında da adil olan **Maç Başı Averaj** getirildi; *Sezon vs. Sezon* ekranı ile posteri aynı motoru kullanır.
- **Aktif Sezon Sayacı & Kısa Tarafsız Derece Etiketleri (`duel.js` `duelModeStats`, `duelPickMode`, `duelShortRes`):** Devam eden sezonlar da sezon sayacına dahil edildi (`2 SEZON · 13 MAÇ`, Kupa Oranı yine yalnızca bitmiş sezonlardan hesaplanır); `"Grupta 8. oldun ve elendin"` gibi kesilen ifadeler **`Grup 8. Sıra`**, **`Finalist`**, **`Yarı Final`** gibi kısa ve tarafsız etiketlere dönüştürüldü.

## v20.45 (2026-11-23) — Adil GEN Kıyaslaması (Nötr Bilgi Satırı)
- **GEN Puanlamadan Çıkarıldı (`duel.js`, `posters.js`):** *Sezon vs. Sezon Stüdyosu* ve *Sezon vs. Sezon PNG Posteri* skor hesabından `Takım Gücü (GEN)` puanı kaldırıldı; daha güçlü takım çekmek artık `+1` üstünlük kazandırmaz.
- **Nötr GEN Bilgi Satırı (`duel.js`, `posters.js`, `style.css`):** *Takım Gücü (GEN)* ve *Ortalama Takım GEN* satırları tüm ekranlarda ve 1v1 PNG posterlerde kazanan noktası (`•`) veya yeşil/altın vurgu olmadan nötr gri bilgi satırı (`.dl-trow.neu`) olarak gösterilir.

## v20.44 (2026-11-23) — Düello Okunurluk & Kontrast Düzeltmeleri
- **Sarı Zemin / `.lead` Sınıf Çakışması Giderildi (`duel.js`, `style.css`):** Düello skorları ve KPI şeridindeki kazanan vurgusu küresel `.lead` sınıfından ayrılarak `.dlhi` sınıfına taşındı; sarı zemin üzerinde sarı rakam çıkması tamamen bitti.
- **Koyu Zeminde Siyah Kulüp Arması Kontrastı (`duel.js`, `style.css`, `posters.js`):** Hero sahnesi, Sezon/Kulüp mini sahneleri, Canlı Sezon başlığı ve tüm 1v1 PNG posterlerindeki arma yuvalarına yumuşak platin-buzlu zemin eklendi; Juventus, Newcastle gibi koyu armalar artık net görünür.
- **DNA Radar Etiket Kırpılması (`duel.js`, `style.css`):** `duelRadarSvg` genişliği `344px` yapılarak sol eksendeki `BİTİRİCİLİK` yazısının kesilmesi giderildi.
- **Sezon Yıldızı, Kulüp Skoru & Son Dönem Formu (`duel.js`, `style.css`):** Sezon yıldızı kartında oyuncu adı ile istatistik iki ayrı satıra bölündü; **Kulüp vs. Kulüp** kartına canlı `X–Y` kategori skoru eklendi; **Son Dönem Formu** çipleri `S1 · Bitti`, `S2 · Devam`, `S3 · 🏆` şeklinde okunur etiketlere geçirildi.

## v20.43 (2026-11-23) — Final Sürüm: Uzun Ömürlü Düello, Yeni Posterler & Kapsamlı Estetik Cilalama
- **100 Sezonluk Arşiv & Son 5 Sezon Trendi (`duel.js`, `style.css`):** Buluta eşitlenen sezon arşivi sınırı 36’dan **100 sezona** çıkarıldı; Düello › Genel sekmesine son 5 sezonun P/M trend grafiğini, kupa, galibiyet % ve puan/maç kıyasını gösteren **Son Dönem Formu** paneli eklendi.
- **Sezon vs. Sezon & Kulüp vs. Kulüp PNG Posterleri (`posters.js`, `duel.js`, `app.js`):** Sezonlar ve Takımlar stüdyolarından seçili iki sezonu (`duelloSezonCv`) veya iki kulübü (`duelloKulupCv`) gerçek kulüp armalarıyla tek tıkla 1080px PNG poster olarak paylaşma eklendi.
- **Görsel Pürüz & Metin Düzeltmeleri (`app.js`, `analytics.js`, `style.css`):**
  - *Kariyer Yıldızları* KPI kutularında sayı + etiket dikey ortalama düzeltildi.
  - *İstat. › Analiz* akordeon alt başlıkları ve *Maç Girişi › MOTM* (`Otomatik (Rakip)`) metni kesilmeyecek şekilde kısaltıldı.
  - *İlk 11 Saha* 4'lü hatlarda kenar boşluğu ve oyuncu rozet aralığı ferahlatıldı.
  - *Kurulum* özetindeki *"ülke sınırından sonra X takım turnuvaya katılabilir"* ifadesi düzeltildi ve 15 ülke çipi açılır **Ülke Filtresi (X/Y)** paneline alındı.
- **Obsidiyen Slot Çekilişi, Açık Tema Kontrastı & Maç Günlüğü Başlığı (`app.js`, `style.css`):** Takım çekilişi penceresi koyu obsidiyen + altın/zümrüt stadyum temasıyla yenilendi; açık tema arka planı ve kart gölgeleri belirginleştirildi; Maç Günlüğü kart üstüne hafta numarası ve kısa tarih etiketi eklendi.

## v20.42 (2026-11-23) — Final Denetim Düzeltmeleri, Kulüp Armalı 1v1 Poster & Rehber Güncellemesi
- **6 Uç Durum Düzeltmesi (`duel.js`, `app.js`):**
  - `Lig` filtresinde sezon yokken **Sezonlar** sekmesinin gizlice Kupa sezonlarını göstermesi giderildi (`duelFilterSeasons`); **Takımlar** sekmesine açıklayıcı boş durum paneli eklendi.
  - Güncel olmayan rakip uyarısı ile seçili modda sezon bulunmaması durumu ayrıştırıldı (`Array.isArray(opp.seasons)`).
  - 0 maçlı yeni sezonlarda GEN kademeleri ve Ortak Kulüpler kartlarında `0,00 P/M` / `%0G` yerine `—` / `0 maç` gösterilmesi sağlandı.
  - Hero 3'lü KPI şeridinde **Şampiyonluk** kazanan parlaması iki tarafın da sezonu olması koşuluna (`c1.n && c2.n`) bağlandı.
  - 1v1 PNG poster üretilirken **1v1 Poster** düğmesinin kilitlenmesi (`actMap.duello = "dlposter"`) eklendi.
- **3 Tamamlayıcı İyileştirme (`posters.js`, `app.js`):**
  - 1v1 Düello PNG posteri (`duelloCv`) `async` yapılarak `preloadLogos` ve `drawBadge` ile gerçek kulüp armalarını obsidiyen çerçeveler içinde çizecek şekilde güncellendi.
  - *Ayarlar › Kayıt Sahibi* adı değiştirildiğinde Düello odasındaki menajer adı (`cfg.name`) otomatik eşitlenir.
  - Uygulama içi *Kullanım Kılavuzu* (`guideDlg`) içine **Canlı Menajer Düellosu (VS)** ve 7. poster türü eklendi.

## v20.41 (2026-11-23) — Flagship Broadcast Düello Stüdyosu (Obsidiyen & Şampanya Altın)
- **Obsidiyen Broadcast Hero Sahnesi (`duel.js`, `style.css`):** Açık temada dahi yüksek kontrastlı ve yayın kalitesinde duran derin obsidiyen skor tabelası tasarlandı: saha orta yuvarlak filigranı, zümrüt yeşili & şampanya altın spot ışıkları, kulüp arması çerçeveleri, özel vektör lider tacı, büyütülmüş `tabular-nums` VS skoru, kategori hakimiyet göstergesi, 3'lü anlık KPI şeridi ve doğrudan sahne içi **Canlı Sezon** + **1v1 Poster** eylem barı.
- **4 Sekmeli Düello Stüdyosu (`Genel · Sezonlar · Takımlar · DNA & xG`):** Uzun dikey kart yığını yerine her biri kendi amacına göre tasarlanmış 4 özel stüdyo sekmesi kuruldu; **Sezon vs. Sezon** ve **Kulüp vs. Kulüp** ekranları kendi obsidiyen mini sahneleriyle, **DNA & xG** ise karanlık telemetri radar laboratuvarıyla yenilendi.
- **Vektör İkonografi & Kompakt Oda Şeridi (`duel.js`, `style.css`):** Tüm emojiler temiz vektör SVG ikonlarla değiştirildi; kaba üst oda kartı tek satırlık canlı telemetri şeridine (dönen eşitleme ikonu + sunucu onay rozeti) indirildi.

## v20.40 (2026-11-23) — Broadcast Arena Tasarımı, Sezon vs. Sezon & Alınan Takımlara Göre Kıyaslama
- **Sezonları Kıyasla (`duel.js` `duelSeasonCompareCard`, `app.js`):** İki açılır menüyle kendi istediğin sezonunu arkadaşının istediğin sezonuyla (varsayılan son sezonlar) yan yana çarpıştır: takım armaları, GEN gücü, turnuva bitiş derecesi, Beklenti Üstü farkı, galibiyet/puan/gol/averaj oranları, xG metrikleri ve sezon MVP/yıldızları.
- **Alınan Takımlara Göre Kıyas (`duel.js` `duelClubCompareCard`):** Alınan kulüpleri **Elit Devler (83+ GEN)**, **Güçlü Kadrolar (79–82 GEN)** ve **Orta & Sürpriz (≤78 GEN)** kademelerine göre kıyaslar; iki menajerin de yönettiği **Ortak Alınan Kulüpleri** otomatik bulup yan yana getirir ve özel **Kulüp vs. Kulüp** seçicisi sunar.
- **Broadcast Arena Elit Görsel Yükseltme (`duel.js`, `style.css`):** Stadyum spot ışıklı hero kartı, aktif kulüp arması çerçeveleri, `LİDER` taç rozeti, canlı çekişme çubuğu (Dominance Bar), parlayan kazanan barları ve zenginleştirilmiş DNA/Canlı Nabız kartları eklendi.

## v20.39 (2026-11-23) — Tutarlı Düello VS Skoru & Ayrı DNA Skoru
- **Ana VS Skoru Sadeleştirildi (`duel.js` `duelScoreboard`):** Ana kafa kafaya skor artık yalnızca **Kariyer & Kupa Düellosu** kartındaki satırlardan (Şampiyonluk, Kupa Oranı, Final/İlk 2, Yarı Final+, Galibiyet %, Puan/Maç, Atılan/Yenilen Gol, Averaj, Temiz Kasa %, En Uzun Seri) hesaplanır. Böylece Lig sezonu yokken **Tümü** ve **Kupa** sekmeleri birebir aynı skoru gösterir ve karttaki kazanan satır sayıları skorla tam örtüşür.
- **Ayrı DNA Kıyaslama Rozeti (`duel.js` `duelDnaScore`):** Taktiksel DNA kıyaslaması ana skordan ayrılarak kendi kartının başlığında (`DNA X–Y`, 4 eksen üzerinden) bağımsız olarak gösterilir.

## v20.38 (2026-11-23) — Düello Eşitleme Hata Koruması & iOS Önbellek Kırıcı
- **Sessiz Gönderim Hatası Düzeltmesi (`duel.js`):** `duelPush` başarısız olduğunda ardından gelen `duelPull` işleminin hata mesajını silmesi giderildi; artık Firebase'in döndürdüğü gerçek HTTP hata detayı ekranda net olarak gösterilir ve `buildDuelSummary` tam `try/catch` korumasına alındı.
- **Sunucu Kayıt Durumu Göstergesi (`duel.js`):** Canlı Oda üst çubuğunda *"Senin kaydın sunucuda ✓"* / *"Kaydın henüz sunucuda değil!"* bilgisi görünür.
- **iOS Önbellek Kırıcı (`duel.js`):** `duelPull` isteğine `?t=...` parametresi eklenerek mobil PWA/Safari önbellek takılması engellendi.

## v20.37 (2026-11-23) — Canlı Sezon & Düello Son Cilalama (5 Uç Durum Düzeltmesi)
- **iOS Safari Tablo Hizalaması (`duel.js`, `style.css`):** Canlı Puan Durumu tablosunda `td.tm` hücresindeki `display: flex` kaldırılarak iç `.dl-tmcell` sarmalayıcısına taşındı; satır çizgileri ve hücre yükseklikleri tüm tarayıcılarda hizalandı.
- **Akıllı Açılış Sekmesi (`duel.js`):** Canlı Sezon İnceleme artık Direkt Eleme sezonlarında boş puan tablosu yerine otomatik olarak **Eleme** (veya **Maçlar**) sekmesiyle açılır.
- **3+ Kişilik Oda Kişi Anahtarı Sabitleme (`duel.js`):** İncelenen rakibin kimliği (`oppUid`) sabit tutularak üst anahtarda Sen ↔ Rakip geçişinde başka rakibe kayma engellendi.
- **PNG Poster Averaj Bar Tutarlılığı (`posters.js`):** `duelloCv` içindeki `ATILAN / YENİLEN` satırının çubuk genişliği yalnızca atılan gole değil maç başı gol averajına (`gpm − gapm`) bağlandı.
- **Klavye Enter & Çift Maçlı Ayak Skorları (`app.js`, `duel.js`, `style.css`):** Oda kodu/ad alanında Enter tuşuyla anında bağlanma ve çift maçlı eleme eşleşmelerinde `1.M / 2.M` ayak skorları eklendi.

## v20.36 (2026-11-23) — Canlı Sezon İnceleme (Puan Durumu, Fikstür, Eleme Yolu & Sezon DNA)
- **Canlı Sezon Paketi (`duel.js` `buildDuelLiveSeason`, şema `v:3`):** Firebase’e gönderilen özete aktif sezonun canlı puan tablosu (kendi grubu veya tüm lig), oynanan maç geçmişi (skor, uzatma/penaltı, xG), kalan rakipler, eleme ağacı eşleşmeleri, sezon yıldızları (ilk 3 gol/asist/MOTM) ve bu sezona ait Menajer DNA özeti kompakt biçimde (~4–5 KB) eklendi.
- **4 Sekmeli Canlı Sezon İnceleme Modalı (`duel.js` `duelLiveDlg`, `app.js`, `style.css`):** Düello ekranındaki *Canlı Sezon Nabzı* kartından açılan tam ekran panelle arkadaşının (veya kendinin) aktif sezonu 4 sekmede incelenebilir: **Puan Durumu** (çıkış çizgisi ve takım vurgulu), **Maçlar & Kalan Fikstür**, **Eleme Yolu** ve **Yıldız & DNA**.

## v20.35 (2026-11-23) — Menajer Düellosu Hata Düzeltmeleri & Genişletilmiş Kıyaslama Seçenekleri
- **Uç Durum & Hata Düzeltmeleri (`duel.js`, `posters.js`):** Negatif değerlerde (`Gol − xG`, `Puan − xPts`, `Beklenti Üstü`, `Averaj`) ters çubuk genişliği `duelBarCalc` ile düzeltildi; 0 maçlı veya verisiz (`—`) profillerin `lowerBetter` kategorilerde haksız puan alması engellendi; **Odadan Ayrıl** artık Firebase'deki kendi kaydını `DELETE` ile temizler; kendi kıyas kodunu yapıştırma engellendi; sekme geçişlerinde 10 saniyelik ağ koruması eklendi.
- **Tümü / Kupa / Lig Filtresi (`duel.js`, `app.js`, `posters.js`):** Düello ekranına ve 1v1 PNG posterine **Tümü · Kupa · Lig** kırılımı eklendi (eski v1 özetlerle geri uyumlu).
- **Genişletilmiş Kariyer, Savunma, Yıldız & DNA Kıyaslaması (`duel.js`, `posters.js`):** Kupa Oranı %, Yarı Final / Podyum, Toplam Averaj, Temiz Kasa (Clean Sheet %), En Uzun Galibiyet Serisi, **Kariyer Yıldızı Düellosu** (`G+A`), Topla Oynama %, Pas İsabeti %, Üretilen xG/Maç, Hak Ediş (Şanslı/Şanssız) ve Canlı Sezon Nabzında takım GEN + averaj bilgisi eklendi.

## v20.34 (2026-11-23) — Canlı Menajer Düellosu (VS), Firebase REST Eşitleme & 1v1 Düello Posteri
- **Yeni Modül (`duel.js`):** Sıfır harici SDK ile doğrudan Firebase Realtime Database REST API’sine bağlanan çevrimdışı öncelikli canlı düello motoru eklendi. Maç kaydedildikçe arka planda yalnızca ~1,5 KB’lık kariyer özeti eşitlenir; ana kayıtlar tamamen cihazdaki IndexedDB’de kalır.
- **Geçmiş › Düello Sekmesi (`app.js`, `style.css`):** Geçmiş ekranına 6. sekme olarak **Düello** eklendi. Ortak **Oda Kodu** ile 2 veya daha fazla arkadaşın kariyerini canlı kıyaslar: Kafa Kafaya Skor, Kariyer & Kupa Barları, Adil Güç (Ortalama GEN & Beklenti Üstü), Çift Renkli Taktiksel DNA Radarı, xG/xPts & Kaleci Kurtarış kıyaslaması ve Canlı Sezon Nabzı (son 5 maç formu).
- **Çevrimdışı Manuel Kıyas Kodu (`duel.js`):** Oda kullanmadan tek seferlik kod kopyala/yapıştır ile çevrimdışı karşılaştırma desteği eklendi.
- **1v1 Düello Posteri (`posters.js` `duelloCv`):** Çift renkli DNA radarı, kafa kafaya kategori skoru ve karşılaştırma barlarıyla WhatsApp’a atmalık yüksek çözünürlüklü PNG poster eklendi.

## v20.33 (2026-11-23) — 16 Profilli Menajer DNA Motoru, Rakip xG Savunma Direnci & Tam Sezon Analizi
- **Tam Sezon Kapsamı (`analytics.js` `calcTacticalDNA`):** Sezonluk Menajer Profili’ndeki son 15 maç sınırı kaldırıldı; artık o sezondaki istatistik girilmiş tüm maçlar (genel kariyerde tüm sezonlar) eksiksiz analiz edilir.
- **Rakip xG Tabanlı Savunma Direnci (`analytics.js`):** Savunma puanı düşük topla oynama yerine **Rakip xG (%50)**, **Rakip Şut Kalitesi (%25)** ve **Rakip İsabetli Şut (%25)** metriklerine bağlandı.
- **16 Profilli Uygunluk Matrisi + İkincil Tarz Etiketi (`analytics.js`, `style.css`):** Eski 8’li sıralı `if/else` yapısı yerine 16 özgün menajer kimliği (Toplam Futbol Mimarı, Tiki-Taka, Pozisyon Oyunu, Gegenpressing, Heavy Metal, Kontra Atak, Catenaccio, Duvar Arkası, Klinik Bitirici, Pragmatist, İsrafçı Dominant, Kısır/Kilitli Oyun, Kırılgan Yapı vb.), ikincil tarz rozeti (`.dnasub`) ve `<3` maç için *Erken sinyal* uyarısı eklendi.
- **Tutarlı Bitiricilik & Orantılı Hak Ediş (`analytics.js` `matchDeserve`, `xgSummaryCard`):** Bitiricilik değerlendirmesi sabit toplam yerine maç başı sapmaya (`±0.18 Gol/M`) bağlanarak Menajer Profili ile xG Özeti arasındaki çelişki giderildi; Hak Ediş eşiği toplam xG’ye orantılandı ve toplam xG maçı sayacı dengeli/beklenen maçları da kapsayacak şekilde düzeltildi.

## v20.32 (2026-11-23) — 4 Katmanlı Gerçekçi Simülasyon Motoru & Clean-Sheet TOTS
- **Katman 1 — İlk 11 Diziliş, Yedek Kulübesi & Yaş Profili (`sim.js` `squadMetricsOf`):** Her takımın İlk 11 mevkilerinden otomatik diziliş karakteri (3'lü stoper/kanat bek, çift ön libero, çift forvet, kanat+10 numara), en iyi 5 yedek ortalaması (normal sürede %10, uzatmada %25 ağırlık) ve yaş/tecrübe profili (genç kadro varyansı, tecrübeli kadro kritik maç soğukkanlılığı) hesaplanır.
- **Katman 2 — Hat Bazlı Çarpışma, Kaleci Duvarı, S-Eğrisi & Canlı Form (`sim.js` `simMatchScore`, `simTeamForm`):** Tarafsız saha (sıfır ev sahibi avantajı) korunarak orta saha hakimiyeti, ayrı kaleci duvarı, takım karakterine göre maç temposu, son 3 maça bağlı canlı form (`±1.2` GEN) ve aşırı farkı törpüleyen yumuşak `tanh` S-eğrisi eklendi.
- **Katman 3 — Eleme Psikolojisi, Rövanş Riski & Gerçek FIFA Penaltı Kuralı (`sim.js` `simOneKoTie`):** Yarı Final/Final maçlarında temkinli tempo (%10 düşüş), çift maçlı rövanşta geride olan takımın risk artışı, uzatmada %25 kulübe derinliği ve matematiksel olarak yetişilemeyecek fark oluştuğunda erken biten gerçek penaltı kuralı uygulandı.
- **Katman 4 — Maç Reytingi Tabanlı MOTM, Sıcak Ayak & Clean-Sheet TOTS (`sim.js`, `app.js`):** Sanal maç reytingiyle (`6.0–9.8`) gol, asist, galibiyet ve temiz kasa ödüllendirilir; `0–0` maçlarda kaleci/stoper `★ Maçın adamı` olarak görünür; duble/hat-trick için sıcak ayak çarpanı ve 3'lü stoperde kanat bek asist bonusu eklendi; TOTS seçiminde temiz kasa ve eleme turu derinliği güçlendirildi.

## v20.31 (2026-11-21) — Mobil Klavye Akışı, Kompakt Boş Kura Kartları & Okunabilirlik
- **Mobil Klavye Akışı (`analytics.js`, `app.js`, `style.css`):** Gelişmiş istatistik alanlarına `enterkeyhint="next"` / `"done"` eklendi; Enter tuşuyla bir sonraki alana geçiş, odaklanınca yumuşak ortalama (`scrollIntoView`) ve `#qs .sheet` altına klavye boşluğu eklendi.
- **Katlanabilir Güç ve Ülke Sınırları (`app.js`, `style.css`):** Kurulumdaki 7 güç/ülke seçicisi varsayılan kapalı `Güç ve Ülke Sınırları` paneline alınarak ekran uzunluğu kısaltıldı (aktif sınır varsa otomatik açılır).
- **Kırpılmayan MOTM Etiketi (`app.js`):** Maçın Adamı varsayılan seçeneği `"Otomatik (rakip)"` olarak kısaltıldı.
- **Kompakt Boş Kura Kartları & Buton Hiyerarşisi (`app.js`, `style.css`):** Kura çekilmeden önceki boş grup kartları 2 sütunlu kompakt ızgaraya (`.grid.dr-empty`) alındı; kura üst aksiyonları eşit genişlikte birincil/ikincil cam buton standardına çekildi.
- **11px+ Kontrast Artışı (`style.css`):** Koyu mod `--mut` rengi `#a0b0bf` tonuna aydınlatıldı; `HÜC/ORT/DEF` etiketleri, tablo başlıkları ve kurulum alt başlıkları en az `11px` boyutuna yükseltildi.

## v20.30 (2026-11-21) — Final Görsel Cila & Sürüm Kilidi
- **Gelişmiş İstatistik Açma Şeridi (`analytics.js`, `style.css`):** `.advbtn.on` sınıfının genel `.on` kuralıyla çakışıp tüm şeridi parlak nane yeşiline boyaması `.advbtn.open` ile giderilerek koyu cam + ince zümrüt kenarlık standardına eşitlendi.
- **Sezon Ödülleri Başlık Düzeni (`style.css`):** 2 sütunlu ödül kartlarında ikon ve değer rozeti üst satırda hizalanıp ödül başlığı (`ALTIN AYAKKABI`, `OYUN KURUCU` vb.) tam genişlikte alt satıra alınarak harf kesilmesi tamamen ortadan kaldırıldı.
- **Takım Gücü ve Sonuç Kartı (`analytics.js`):** `Geçmiş › Özet` altındaki son eski `cd()` kartı da ikonlu `psetCard` cam kart ve kesikli kılavuzlu `.svgbox` grafik sahnesine yükseltildi.

## v20.29 (2026-11-21) — Son 4 Görsel Cila (Maç İstatistikleri Çubuğu, Sıfır Sıçramalı Poster, Gruplar & Segment Eşitleme)
- **Maç İstatistikleri Açma Çubuğu (`app.js`, `style.css`):** `.sbtog.on` sınıfının genel `.on` kuralıyla çakışıp tüm satırı parlak yeşile boyaması `.sbtog.open` sınıfına geçilerek düzeltildi.
- **Sıfır Sıçramalı Poster Önizleme (`posters.js`, `style.css`):** `mkImg()` görseli modalı açmadan önce bellekte ön-çözümler (`decode`), `imgDlg()` ise `width`, `height` ve `aspect-ratio` özniteliklerini doğrudan vererek pencerenin açılışta boyut sıçraması yapmasını engeller.
- **Gruplar Ekranı Hiyerarşisi & Başlık Kırılması (`app.js`, `style.css`):** *Kurayı Görsel Olarak Paylaş* düğmesi altın ana aksiyonla yarışmaması için ikincil cam paylaşım düğmesine (`pset-sec`) alındı; `★ Senin grubun` etiketi `.kgm { white-space: nowrap }` ile tek satıra sabitlendi.
- **Segmentli Kontrol Eşitlemesi (`style.css`):** Tüm `.stabs .chip.on` segmentli seçicileri koyu cam + zümrüt metin standardında eşitlendi.

## v20.28 (2026-11-21) — Anında Açılış (Cache-First) & Beyaz Ekran Parlaması Kaldırıldı
- **Sıfır Beyaz Parlama (`index.html`):** `<head>` bölümüne satır içi ön-tema betiği ve kritik koyu zemin stili eklendi. Kullanıcının `fc26lig4_theme` tercihi daha ilk piksel çizilmeden uygulanarak açılışta görünen beyaz ekran parlaması tamamen ortadan kaldırıldı.
- **Anında Açılış (`sw.js`):** Sürüm etiketli (`?v=20.28`) JS ve CSS dosyaları **Cache-First**, `index.html` navigasyon istekleri ise **Stale-While-Revalidate** stratejisine geçirildi. Uygulama her açılışta ağ yanıtı beklemeden cihaz önbelleğinden anında açılır; yeni sürümler arka planda otomatik denetlenmeye devam eder.

## v20.27 (2026-11-21) — Yeni Altın Kanatlı FC 27 Uygulama Logosu & Son İnce Ayarlar
- **Yeni Uygulama İkon Seti (`icon-512.png`, `icon-192.png`, `apple-touch-icon.png`, `icon-maskable-512.png`):** Gönderilen 3B altın kanatlı FC 27 amblemi yüksek çözünürlüklü kaynak üzerinden merkezlenip keskinleştirilerek tüm PWA ve iOS/Android ikon boyutlarına uyarlandı; Android `maskable` güvenli çemberi (%66 doluluk) ve splash ekran arka planı (`#0d1016`) birebir eşleştirildi.
- **Önbellek Yenileme (`index.html`, `manifest.webmanifest`, `sw.js`):** İkon ve varlık yolları `?v=20.27` ve `fc27-lig-v20-27` önbelleğiyle güncellenerek tarayıcıların eski logoyu tutması engellendi.
- **Son İnce Ayarlar (`style.css`):** iPhone'da üst sezon seçicisinde (`header .sel`) otomatik yakınlaştırmayı önlemek için yazı boyutu `16px` yapıldı; koyu mod logo halosu tüm açık zeminli FUT takım kartlarında (`.tc .bd-img`) kapatıldı.

## v20.26 (2026-11-21) — Aşama 3: Sakin Kart Hiyerarşisi, Müze Kupa Dolabı & Modern Grafik Sahnesi
- **Sakin Yüzey Hiyerarşisi (`style.css`):** Ekranda yalnızca ana odak kartlarının (Sıradaki Maç, Kulüp Kartı, MVP, Şampiyonluk) parlaması için ikincil KPI kutuları ve akordeon yüzeylerindeki fazla radyal parlamalar sadeleştirilip ince `1px` saç teli kenarlıklı sakin yüzey katmanına çekildi.
- **Müze Vitrini Kupa Dolabı (`app.js` `vitrinCard`, `style.css` `.shelf.pshelf`):** Kalın gri metal raf çıtası kaldırıldı; koyu obsidyen zemin, sıcak üst spot, ince ışıklı pirinç alt çizgi ve her kupanın altında pirinç plaket kartı (`.plq`) eklendi.
- **Modern Alan Dolgulu SVG Grafikler (`app.js` `chartCard`, `analytics.js` `formCard`, `xgTrendSvg`):** Form grafiğine yumuşak saydam alan dolgusu (`fmArea`), sezon ve xG grafiklerine dikey gradyanlı yuvarlatılmış çubuklar ve kesikli yatay kılavuz çizgileri eklendi.
- **`Geçmiş › Maçlar` Tam Eşitleme (`analytics.js` `matchTab`, `etPkCard`, `surCard`, `app.js` `oyFilter`, `oyDiff`):** Kalan tüm eski düz `cd()` kartları özel çizgi SVG ikonlu `psetCard` cam kart tasarımına geçirildi.

## v20.25 (2026-11-21) — Aşama 2: Monokrom Çizgi SVG İkon Sistemi & Koyu Mod Logo Zeminleri
- **Birleşik Çizgi SVG İkon Sistemi (`analytics.js`, `sim.js`, `app.js`):** Arayüz butonları, segmentli sekmeler (*Eleme Ağacı / Grup Fikstürü*, *Ağaç Görünümü / Detaylı Liste*, *İlk 11 Saha / Tam Kadro*), simülasyon aksiyonları, maç günlüğü rozetleri, hak ediş etiketleri ve Taktiksel DNA kimlik kartlarındaki tüm sistem emojileri (`🏆`, `⚽`, `⚡`, `🌳`, `📋`, `📊`, `📖`, `🔥`, `☠`, `👟`, `🧬` vb.) `1.9px` çizgi kalınlığındaki monokrom SVG ikon setine (`UICO` + `uiIco`) dönüştürüldü.
- **Koyu Mod Kulüp Logo Görünürlüğü (`style.css`):** Koyu temada koyu renkli kulüp logolarının (`Juventus`, `Tottenham`, `Beşiktaş`, `Newcastle` vb.) arka planda kaybolmasını önlemek için `.bd-img` öğelerine ince dairesel buzlu cam halo ve yumuşak gölge eklendi (altın şampiyonluk kartlarında otomatik devre dışı kalır).

## v20.24 (2026-11-21) — Aşama 1: Stüdyo Premium İkon, Mat Zemin & Buzlu Cam Üst Çubuk
- **Yeni Minimalist Uygulama İkonu (`icon-512.png`, `icon-192.png`, `icon-maskable-512.png`, `apple-touch-icon.png`):** Eski neon ve `</>` kod sembollü top görseli kaldırılarak koyu zümrüt-obsidyen zemin üzerinde şampanya-altın çerçeveli, geometrik `27 · FC LİG` kalkan amblemine geçildi.
- **Çizgisiz Mat Zemin & Nötr Karbon Koyu Tema (`style.css`):** Arka plandaki 44px dikey şeritler ve `.big` kutularındaki çim çizgileri kaldırıldı; koyu tema mavi alt tondan nötr karbon obsidyen (`#090c10`) yüzeyine, açık tema sakin kırık taş beyazına (`#f3f5f4`) çekildi.
- **Buzlu Cam Üst Çubuk (`style.css`, `app.js`, `index.html`, `manifest.webmanifest`):** Yeşil şeritli üst çubuk kaldırılıp alttaki yüzen cam dock (`.nav`) ile birebir uyumlu yarı saydam buzlu cam üst çubuk ve 1px saç teli ayırıcıya geçildi; mobil durum çubuğu (`theme-color`) yeni zemin renkleriyle senkronize edildi.
- **Tipografi & Nefes Alanı (`style.css`):** Alt navigasyon etiketleri sıkışık yoğun fonttan temiz sistem sans-serif yazı tipine alındı; ana kart iç/dış boşlukları ferahlatıldı.

## v20.23 (2026-11-21) — Derin Denetim, Uzun Vadeli Kararlılık & Bellek Güvenliği
- **IndexedDB Otomatik Yeniden Bağlanma & Kuyruk Garantisi (`storage.js`):** Tarayıcının arka planda IndexedDB bağlantısını kapatması (`db.onclose` / `onversionchange`) durumunda sessizce `localStorage` koluna düşme riski kapatıldı; `ensureIdbConn()` ve `withIdbRetry()` ile otomatik yeniden bağlanma eklendi. `flushSaveQueue()` yarış durumu `qActivePromise` ile giderildi.
- **Service Worker Önbellek Güvenliği & Kalıcı Logo Önbelleği (`sw.js`):** `fetch` içinde `r.clone()` zamanlama hatası ve `new Request(req, { cache: "no-cache" })` uyumluluk riski düzeltildi; `install` aşamasında eksik dosya yutulması engellendi. Kulüp logoları ayrı `fc27-logos-v1` önbelleğine alınarak sürüm güncellemelerinde tekrar indirilmesi önlendi.
- **Simülasyon & Eleme Ağacı Tutarlılığı (`sim.js`):** Direkt Eleme turnuvalarında sezon bittikten sonra `rebuildSimScorers` yüzünden gol/asist/MOTM krallığının sıfırlanması düzeltildi; çift maçlı eleme turları `m.lg` sırasına göre dizildi ve erken sezon bitirişinde yapay zekâ eşleşme tekrarı engellendi.
- **Maç Düzenleme/Silme, Bozuk Veri Koruması & Akıcılık (`app.js`, `style.css`):** Grup maçı silindiğinde (`mdel`) veya rakibi/aşaması değiştirildiğinde (`msave`) ilgili hafta simülasyonu geri alınarak fikstür kayması önlendi; kurtarılamayan bozuk veride `st.readFail = true` ile ezilme engellendi; `impr` çift tıklama yarışı ve `m.on` isim senkronizasyonu düzeltildi; manuel sezon bitirişine `pruneSimDetails(s)` eklendi; global pasif olmayan `touchstart`/`touchmove` dinleyicileri kaldırılıp CSS `touch-action: pan-x pan-y` ile kaydırma akıcılığı artırıldı.
- **Analitik & Canvas Bellek Güvenliği (`analytics.js`, `posters.js`):** `playKarne()` animasyonunun her karede yeni 1080p Canvas oluşturması yerine `#kcv` tuvalini yeniden kullanması sağlandı (iOS Safari bellek koruması); 64 takımlı eleme posterine `4096px` ölçekleme sınırı getirildi; tüm poster ve başlıklarda `.toLocaleUpperCase("tr")` kullanıldı; `calcTacticalDNA()` xG hesabı yalnızca `myXg` girilen maçlara sabitlendi; oyuncu anahtarlarında `nz()` Türkçe normalizasyonu tamamlandı.

## v20.22 (2026-11-21) — Ölüm Grubu Mantığı Güncellemesi
- **Tek Ölüm Grubu (`app.js` `deadGrpIdx`, `grpCard`, `gInfo`):** `☠ Ölüm Grubu` rozeti ve derin yakut vurgu artık yalnızca senin grubunda ve ilk 2'de değil, hangi grup olursa olsun turnuvadaki **1. en güçlü grupta** (GEN ortalaması en yüksek, eşitlikte bileşik güç ortalaması en yüksek grupta) gösterilir.
- **PWA Önbellek Yenileme (`index.html`, `sw.js`, `app.js`, `package.json`):** Sürüm `v20.22` ve önbellek anahtarı `fc27-lig-v20-22` olarak güncellendi.

## v20.21 (2026-11-21) — Grup Eleme Sınırı (qcut) Kesik Çizgi Düzeltmesi
- **Eleme Sınırı Çizgisi (`style.css`):** Kura/grup kartlarında çıkan son takımın üst kenarına kayan kesik çizgi (`qcut`) çakışması giderildi; eski `.row.tb.kr+.row.tb.kr::before` kuralı kaldırılarak çizgi çıkan son takımın altındaki boşluğa tam hizalandı.
- **PWA Önbellek Yenileme (`index.html`, `sw.js`, `app.js`):** Sürüm `v20.21` ve önbellek anahtarı `fc27-lig-v20-21` olarak güncellendi.

## v20.20 (2026-11-21) — Grup Kartı Derinlikli Premium UI Yenilemesi
- **Grup Ortalamaları Telemetri Barı (`app.js`, `style.css`):** Alt kısımdaki kopuk güç çubuğu kaldırıldı. Sol `GEN` sütunu derin zümrüt obsidyen (kendi grubunda yanık altın, ölüm grubunda derin yakut) odak bloğuna, sağdaki `HÜC / ORT / DEF` sütunları ise cam efektli zeminde ince dikey ayırıcılı ve bireysel 2.5px mikro ölçek çizgili mimari şeride dönüştürüldü.
- **6 Seviyeli Pastel Enamel OVR Rozetleri (`app.js` `rb`, `style.css` `.g.t1..t6`):** Metalik gümüş/kahverengi 3D kutular kaldırılarak tüm uygulamada (Grup, Kadro, Rakip Analizi, Arama) 6 kademeli (`85+`, `82–84`, `80–81`, `78–79`, `75–77`, `≤74`) ışık yansımalı pastel enamel rozet sistemine geçildi; karanlık tema için yarı saydam mücevher cam tonları eklendi.
- **Minimalist HÜC / ORT / DEF Şeridi (`app.js`, `style.css`):** Takım satırlarındaki büyük çerçeveli kapsüller kaldırılıp ince dikey ayırıcılı, kompakt tipografik şeride indirildi; her takımın en güçlü istatistiği otomatik olarak zümrüt (85+ ise altın) rengiyle vurgulanıyor.

## v20.19 (2026-11-21) — Premium Plus Görsel & Broadcast Poster Yenilemesi (5 Bölüm)
- **Kura & Grup Kartları Scouting Güç Kapsülleri (`app.js` `grpCard`, `style.css`):** Grup üst telemetrisi 4 sütuna (`GEN · HÜC · ORT · DEF`) çıkarıldı; her takım satırının altındaki düz `HÜC · ORT · DEF` metinleri, değere göre renklenen (85+ altın, 80–84 zümrüt) ve mini güç çubuklu 3'lü scouting kapsüllerine dönüştürüldü.
- **Sezon Ödülleri Vitrini (`analytics.js` `awardsCard`, `style.css`):** Altın MVP kartına oyuncu mevki/yaş/GEN alt bilgisi ve 3B stat kapsülleri eklendi; tüm ödül kartlarına sağ üstte renkli stat rozeti (`8 GOL`, `4 ASİST`, `9 G+A`) getirildi ve `Altın İkili` (veya çoklu isimler) tam genişlikte açılarak isim kesilmesi tamamen giderildi.
- **Kariyer Özeti Posteri (`posters.js` `kariyerCv`):** Üst vitrin 3 sütuna (`Şampiyonluk | Toplam Sezon | Dairesel Galibiyet Oranı Halkası`) yükseltildi; her G/B/M kartına kendi yüzdesi ve liderler ızgarasına sağa yaslı renkli stat kapsülleri eklendi.
- **Maç Kartı Posteri (`posters.js` `macCv`):** Buzlu dairesel arma zemini, çerçeveli Broadcast skor kapsülü (`2 | 3`), daha kalın ve okunaklı analiz çubukları, rakip golcü bandı eklendi; `MAÇ ANALİZİ` başlığındaki mükerrer hak ediş rozeti kaldırıldı.
- **Sezon Karnesi Sayfa 1 (`posters.js` `karneCv`):** Kulüp armasının arkasına buzlu halo, altına mini güç barlı `HÜC / ORT / DEF` kartları, sağa yaslı renkli ödül stat kapsülleri ve çerçeveli skor kapsülleri eklendi.

## v20.18 (2026-11-21) — Premium Broadcast Eleme Ağacı Paylaşım Posteri (`koCv`)
- **Şampiyon Vitrin Kartı (`posters.js` `koCv`):** Turnuva tamamlandığında Final kartının üzerindeki boş alana dev armalı, altın ışıklı **🏆 Turnuva Şampiyonu** vitrin kartı ve sağ üstte metalik altın şampiyon rozeti eklendi.
- **Koyu Zemin Logo Netliği (`drawCrestPlate`):** Tottenham ve Juventus gibi koyu renkli kulüp logolarının koyu cam üzerinde kaybolması giderildi; her kulüp armasının arkasına zarif buzlu dairesel zemin eklendi.
- **Broadcast Skor Kapsülleri & Kart İçi Meta Bandı:** Havada duran düz skor rakamları zümrüt/altın skor kapsüllerine alındı; `PEN 5–4` ve `UZATMA` etiketleri kart kenarına ve alt bilgiye taşmayacak şekilde kart içine entegre edildi.
- **Yumuşak Dirsekli & Işıltılı Bağlantı Yolları (`drawConnector`):** Keskin 90° çizgiler yuvarlatılmış dirsekli ve birleşim noktalı broadcast hatlarına dönüştürüldü; şampiyonun finale giden yolu altın parıltıyla vurgulanır.

## v20.17 (2026-11-21) — Premium Broadcast Eleme Ağacı (Bracket Stage)
- **Broadcast Sahne & Tur Başlıkları (`sim.js` `koTreeHtml`, `style.css`):** Eleme ağacı nokta dokulu derinlikli bir sahneye alındı; tur başlıkları (`SON 16`, `ÇEYREK FİNAL`, `YARI FİNAL`, `🏆 FİNAL`) canlı ilerleme sayaçlı (`8/8`, `4/4`) rozetlere dönüştürüldü.
- **Skor Kapsülleri & 22px Kulüp Armaları (`.bkt-sc`, `.bkt-cr`):** Havada duran düz skor rakamları kazanan/şampiyon renkli skor kapsüllerine alındı; kulüp armaları `16px`'ten `22px`'e büyütüldü.
- **Açık Tema Kontrast & Elenen Takım Düzeltmesi (`.bkt-tm.me`, `.bkt-tm.l`):** Açık temada elenen kullanıcı takımının (`Real Madrid`) soluk sarı metin yüzünden okunamaz hale gelmesi giderildi; yüksek kontrastlı kehribar/altın ton ve `★` yıldız işareti eklendi.
- **Penaltı, Uzatma & Rövanş Rozetleri (`.bkt-tag`):** Alt satırdaki soluk `P 5-4` metni, altın `PEN 5–4` ve gök mavisi `UZATMA` broadcast rozetlerine dönüştürüldü.

## v20.16 (2026-11-21) — Premium Kura & Grup Kartları (Sıfır Kesilme, Broadcast Tipografi)
- **DEF değeri kesilme hatası giderildi (`app.js` `grpCard`, `style.css`):** Geniş `1. Çıktı ✓` hapının orta sütunu sıkıştırıp `DEF 80` rakamını kesmesi düzeltildi. Çıkış rozeti (`✓ Çıktı`) üst satıra takım adının yanına alındı; alt satır (`Bayrak · HÜC · ORT · DEF`) tam genişlikte ve kesilmeden okunur.
- **3 Bölgeli Editorial Satır Düzeni (`.kr`):** Solda sıra rozeti (`1–8`) + `30px` kulüp arması, ortada 2 satırlı net tipografi, sağda metalik `GEN` rozeti ve hafif ok.
- **Bozuk C-şekilli altın kenarlık düzeltildi (`.kr.kme`):** `inset box-shadow` kaynaklı köşe bükülmesi kaldırılıp temiz düz dikey vurgu çubuğuna geçildi; kendi takımının altın vurgusunun yeşil `qrow` tarafından ezilmesi engellendi.
- **Birleşik Telemetri Şeridi & Çıkış Hattı (`.kgs-wrap`, `.qcut`, `.kg-dead`):** 3 ayrı kaba kutu tek cam telemetri şeridinde birleştirildi; çıkan takımlarla elenenler arasına kesikli çıkış hattı eklendi; ölüm grubu için kaba kırmızı dış çerçeve yerine zarif `☠ Ölüm Grubu` rozeti konuldu.

## v20.15 (2026-11-20) — Tam Denetim Düzeltmeleri (Eleme Posteri Logoları, TOTS/MVP Arşiv Eşitlemesi & Bracket Temizliği)
- **Eleme Ağacı PNG Posteri Kulüp Logoları (`posters.js` `koCv`):** Eşleşme düğümlerindeki hatalı `m.h / m.a / m.b` referansları `p.t1 / p.t2` olarak düzeltildi; Eleme Ağacı PNG posterinde artık tüm takımların gerçek PNG armaları eksiksiz ön-yüklenip çizilir.
- **Hızlı Sezon Bitişlerinde TOTS & MVP Arşivi (`app.js` `lgchamp`, `gqn`):** Lig şampiyonluğu (`lgchamp`) ve grupta elenme (`gqn`) kısayol butonları da artık `snapshotSeasonAwards(s)` çağırarak sezonun MVP'sini, Gol Kralı'nı ve En İyi 11'ini (`tots`) arşive kaydeder.
- **Eleme Maçı Silme Senkronizasyonu (`app.js` `mdel`, `sim.js` `syncUserMatchesToBracket`):** Bir eleme maçı silindiğinde eleme ağacındaki ilgili eşleşmenin skoru/galibi temizlenir ve oynanmamış üst tur düğümleri senkronize edilir.
- **Veri Tutarlılığı (`app.js` `wipeS`, `mergeSeasons`):** `wipeS` içinde `s.sim.as` ve `s.sim.mom` alanları eksiksiz sıfırlanır; yedek birleştirmede (`mergeSeasons`) karma fikstür bayrağı (`fxMix`) korunur.

## v20.14 (2026-11-20) — Karma (Rastgele) Grup & Lig Fikstürü
- **Güç sırasına göre fikstür düzeltildi (`app.js` `mixG`, `grpRivals`):** Torbalı kura sonrası grupların `1. torba → son torba` (en güçlüden en güçsüze) sırasıyla saklanması nedeniyle fikstürün hep en güçlü rakiplerle başlayıp zayıflara doğru gitmesi sorunu giderildi.
- **Yeni kuralar (`use`, `bal`):** Grup veya lig kurası onaylandığında her grubun fikstür sırası otomatik karıştırılır (`s.fxMix = 1`). Puan tablosu ve Kura ekranı görsel olarak güç/puan sırasını korurken, maç fikstürü tamamen karma akar.
- **Mevcut sezonlarla tam uyum:** Henüz grup maçı başlamamış eski kuralar otomatik karıştırılır; yarıda olan eski sezonlarda ise diğer grupların oynanmış eşleşmeleri bozulmadan senin kalan rakiplerin deterministik karma sıraya geçer.

## v20.13 (2026-11-20) — Genel Menajer Profili, Kupa Dolabı & Gereksiz Tekrar Temizliği
- **Genel Menajer Profili (`analytics.js` `calcTacticalDNA`, `tacticalDnaCard`, `matchTab`):** `Geçmiş › Maçlar` sekmesindeki Taktiksel DNA kartı artık tek sezonu değil, tüm kariyerdeki (ve varsa seçili zorluk filtresindeki) tüm istatistikli maçları baz alarak **Genel Menajer Profili** üretir. `İstat. › Analiz` ve Karne 2. sayfa aktif/ilgili sezon bazlı çalışmaya devam eder.
- **Kupa Dolabı Yalnızca `Geçmiş › Özet`'te (`app.js` `histView`):** Kupa Dolabı (`vitrinCard`) üst alt-sekme çubuğunun altına ve yalnızca `Özet` sekmesine alındı; `Rekorlar`, `Sezonlar`, `Rakipler` ve `Maçlar` sekmelerinde ekranın üst alanı rahatlatıldı.
- **Akıllı Gruptan Çıkanlar Kutusu (`app.js` `qualSummary`):** 8'den az gruplu turnuvalarda eleme ağacı oluştuktan sonra `Turnuva › Gruplar` ekranındaki mükerrer Gruptan Çıkanlar kutusu gizlenir; 8+ gruplu turnuvalarda veya eleme ağacı henüz oluşmadığında gösterilmeye devam eder.
- **En İyi Derece Tekrarı Kaldırıldı (`app.js` `histView` `A1`):** `Rekorlar` sekmesinde zaten yer alan En İyi Sezon/Derece bandı `Geçmiş › Özet › Toplu İstatistik` kartından kaldırıldı.
- **Ölü Kod & CSS Temizliği (`app.js`, `style.css`):** Kullanılmayan `R2`, `R3`, `chp`, `drawView.info`, `histView.card/R`, `a=="cp"` dalı ve 16 satır eski CSS kuralı (`.xpr`, `.xpt`, `.xpd`, `.xps`, `.xhr3`, `.sbstats`, `.sbpill`, `.sbbot`, `.sbleg`, `.sbwhy`) temizlendi.

## v20.12 (2026-11-20) — 2 Sayfalık Sezon Karnesi (Menajer Kimliği) & Metin Özeti Temizliği
- **2 Sayfalık Sezon Karnesi (`posters.js` `karneDnaCv`, `mkImg`, `imgDlg`):** Sezon tamamlandıktan sonra (`x.res`) ve o sezonda gelişmiş maç istatistikleri girildiyse **Karne** artık 2 sayfalık Broadcast PNG olarak üretilir:
  - **Sayfa 1 · Sezon Karnesi:** Kulüp kartı, G-B-M, gol/averaj/puan, Sezon Ödülleri ve maç sonuçları.
  - **Sayfa 2 · Menajer Kimliği:** O sezona özel Menajer Kimliği unvanı, 4 eksenli Broadcast Radar Grafiği (Hücum, Kontrol, Direnç, Bitiricilik), xG/xPts/Kaleci telemetrisi ve Hak Ediş dağılımı.
  - Önizleme penceresinden **`1 · Sezon Karnesi`** / **`2 · Menajer Kimliği`** arasında anında geçiş yapıp her sayfayı ayrı ayrı paylaşabilir veya indirebilirsin.
- **Metin Özeti (`Özet`) Kaldırıldı (`app.js`):** `Geçmiş › Sezonlar` kartlarındaki mükerrer metin özeti butonu ve penceresi kaldırılarak kart alt çubuğu sadeleştirildi (`Aç · Karne · En İyi 11 · ✎ · 🗑`).
- **Sezona Özel Taktiksel DNA (`analytics.js` `calcTacticalDNA(s, onlySeason)`):** 2. sayfa yalnızca ilgili sezonun istatistikli maçlarını baz alır; başka sezonların verisiyle karışmaz.

## v20.11 (2026-11-20) — Sezon Numaralandırma Düzeltmesi
- **Sezon Silme Sonrası Numara Atlama Düzeltildi (`app.js` `nextNo`, `delSeason`):** Yeni sezon numarası artık hep ileri giden `store.nx` sayacı yerine mevcut sezonların en büyük numarasına göre (`Math.max(0, ...L) + 1`) hesaplanır ve sezon silindiğinde `store.nx` mevcut sezonlara göre güncellenir. Böylece Sezon 3 eklenip silindiğinde sıradaki sezon tekrar **Sezon 3** olarak açılır.
- **Önbellek Güncellemesi (`sw.js` `fc27-lig-v20-11` + `?v=20.11`):** Güncellemenin anında yansıması için sürüm `20.11` yapıldı.

## v20.10 (2026-11-20) — İdeal İlk 11 Optimizasyonu (Sakatlık/Rotasyon Düzeltmesi)
- **59 Takımda 110 As Oyuncu İlk 11'e Çekildi (`data.js`):** Gerçek hayat sakatlığı, cezası veya hafta sonu rotasyonu nedeniyle yedekte kalmış yıldızlar (Musiala, Saliba, Gyökeres, Kvaratskhelia, Balogun, Thuram, Çalhanoğlu, Svilar, Orkun Kökçü, Asensio, Kenan Yıldız, Locatelli, Aspas, Orsolini, Kleindienst vb.) her takımın mevcut dizilişi (`D-M-F`) hiç bozulmadan İlk 11'e (`S`), yerlerindeki düşük güçlü yedekler ise kulübeye (`B`) alındı.
- **Önbellek Güncellemesi (`sw.js` `fc27-lig-v20-10` + `?v=20.10`):** Yeni kadro verilerinin anında yansıması için sürüm `20.10` yapıldı.

## v20.9 (2026-11-20) — Gerçek Kulüp Logoları + Güncel İlk 11'ler + Anında Güncelleme
- **99 Kulüp PNG Logosu Eklendi (`logos/` + `data.js` `LOGOS`):** Puan tablosu, fikstür, eleme ağacı, takım kartı, TOTS, maç günlüğü ve tüm paylaşılan PNG posterlerde (`kuraCv`, `karneCv`, `totsCv`, `koCv`, `macCv`) gerçek kulüp armaları gösterilir.
- **Otomatik SVG Kalkan Yedeği:** Logosu bulunmayan 9 takım (`River Plate`, `Boca Juniors`, `Club América`, `Toluca`, `PAOK`, `Wolfsburg`, `Alavés`, `Estudiantes`, `Girona`) ve çevrimdışı durumlar için mevcut SVG kalkan armaları otomatik devreye girer.
- **75 Takımın Güncel İlk 11 & Mevki Verileri (`data.js`):** EA FC 27 kadro görsellerine göre 75 takımın ilk 11, yedek ve mevki bilgileri güncellendi.
- **Anında Güncelleme (`sw.js` `fc27-lig-v20-9` + `?v=20.9`):** Önbellek sürümü yükseltildi ve kod/veri dosyaları (`html`, `js`, `css`) *Network-First* stratejisine geçirilerek GitHub Pages güncellemelerinin eski önbelleğe takılmadan anında yansıması sağlandı.

# Değişiklik listesi

## v20.8 (Takım İnceleme: İlk 11 Broadcast Saha Görünümü & Yedek Kulübesi)
- **İlk 11 Saha Görünümü (`teamXiData`, `teamPitchHtml`, `tiDlg`):**
  - Herhangi bir takıma dokununca açılan **Takım İncele** penceresi artık varsayılan olarak kulübün gerçek İlk 11’ini (`t === "S"`) otomatik tespit edilen dizilişle (`4-3-3`, `4-4-2`, `4-5-1`, `3-5-2` vb.) perspektif yeşil saha üzerinde gösterir.
  - Her oyuncu kartı seviyeye göre renkli **GEN madalyonu** (altın 85+, gümüş 80–84, bronz 75–79), forma numarası, renk kodlu mevki rozeti, kesilmeyen isim kapsülü ve varsa bu sezonki gol/asist/MOTM istatistiğiyle sunulur.
  - Sahanın hemen altında kulübün **Yedek Kulübesi (`B`)** kompakt mevki rozetli çiplerle listelenir.
- **Tam Etkileşim & Akıllı Geçiş (`tiv`, `tiBody`, `gsgo`):**
  - Üstteki segmentli **⚽ İlk 11 Saha | 📋 Tam Kadro** anahtarıyla sıfır disk yazımıyla (`UI_ONLY`) anında geçiş yapılır; Global Arama’dan doğrudan bir oyuncu seçildiğinde kadro listesi o oyuncuya süzülmüş olarak açılır.
  - Hem saha üzerindeki oyunculardan hem yedek kulübesinden hem de Tam Kadro listesindeki herhangi bir satırdan oyuncuya dokunarak o sezonki maç bazlı gol/asist dökümüne (`tpDlg`) ulaşılabilir.
- Sürüm `20.8` (`VER`, `package.json` 20.8.0, `sw.js` `fc27-lig-v20-8`).

## v20.7 (Rol Uyumlu TOTS Motoru, Turnuva Oyuncu Maç Dökümü & Broadcast Okunaklık Cilası)
- **Rol (Slot) Bazlı Gerçekçi En İyi 11 (`TOTS_FMTS`, `TOTS_ALT`, `tourneyTots`):**
  - Artık her mevki slotuna yalnızca kendi rolüne uygun oyuncular seçilir: 3’lü savunmada yalnız `CB`, 4’lü/5’li savunmada gerçek `LB/LWB` ve `RB/RWB` bekler, 3’lü merkez orta sahada yalnız `CDM/CM/CAM` (kanatlar merkeze düşmez).
  - `LM/RM` oyuncuları `4-3-3` ve `3-4-3` dizilişlerinde hücum kanadı (`LW/RW`) olarak da değerlendirilebilir.
  - Dar havuzlu turnuvalarda eksik mevki çıkarsa komşu mevki sigortası (`TOTS_ALT`) küçük puan cezasıyla devreye girer.
- **Tıklanabilir Turnuva Oyuncu Detay Penceresi (`tourneyPlayerDetail`, `tpDlg`, `tpinfo`):**
  - En İyi 11 sahasındaki veya `Turnuva › İstatistik` liderlik listelerindeki **herhangi bir oyuncuya** (hem kendi oyuncularına hem rakip kulüp oyuncularına) dokununca o sezonki **Gol, Asist, MOTM, Hat-Trick, Temiz Kasa** toplamları ve **kime karşı gol/asist/MOTM ürettiğini gösteren maç maç döküm** açılır.
  - Tek dokunuşla kendi oyuncularında *Kariyer Profili*’ne, rakip oyuncularda *Takım Kadrosu*’na geçilebilir.
- **Broadcast Okunaklık ve Premium Görsel Cila (`.tots-pitch`, `totsDispName`, `totsCv`):**
  - Akıllı soyadı kısaltması (`totsDispName`) ve kendi oyuncuları için arma üstü altın yıldız işareti (`.tots-mine-pip`) sayesinde 4’lü hatlarda dahi isimler (`J. Bell...` gibi) kesilmez.
  - Daha net saha çizgileri, üst stadyum ışığı, yüksek kontrastlı cam isim kapsülleri, daha büyük kulüp armaları, mevkiye özel renk kodlu pozisyon rozetleri (`GK` kehribar, `DEF` çivit, `MID` gök mavisi, `FWD` zümrüt) ve dengeli altın `MVP` kartıyla okunaklık ve kalite hissi üst seviyeye taşındı.
- Sürüm `20.7` (`VER`, `package.json` 20.7.0, `sw.js` `fc27-lig-v20-7`).

## v20.6 (Dinamik Formasyonlu & Mevki Dengeli Turnuvanın En İyi 11’i)
- **7 Farklı Otomatik Formasyon (`TOTS_FMTS`, `tourneyTots`):** Turnuvanın En İyi 11’i artık sabit `4-3-3` yerine **4-3-3, 4-4-2, 4-5-1, 3-5-2, 3-4-3, 5-3-2 ve 5-4-1** dizilişlerinden o turnuvadaki oyuncu performanslarına en uygun olanı otomatik seçer.
- **Mevkiler Arası Puan Dengesi (Robust Z-Skor Normalizasyonu):** Defansların temiz kasa ve gol katsayılarının diğer mevkileri ezmemesi için her saha oyuncusunun puanı kendi mevki grubunun gövde ortalaması ve standart sapmasına göre normalize edilir (`z`). Böylece orta sahaların parladığı turnuvada `3-5-2` / `4-5-1`, savunmaların öne çıktığı turnuvada `5-3-2` / `5-4-1`, hücumcuların şov yaptığı turnuvada `3-4-3` / `4-3-3` doğal olarak seçilir.
- **5’li Hatlar İçin 2 Kademeli Taktiksel Yerleşim (`.tots-row.r5`, `totsCv`):** 5 orta sahalı dizilişlerde üstte `LM–CAM–RM`, altta çift pivot (`3+2` W dizilimi); 5 savunmalı dizilişlerde kanat bekler önde, 3 stoper arkada konumlanır. Hem mobil ekranda hem 1080×1460 PNG posterde sıfır taşma ve sıfır çakışma sağlanır.
- **Arşiv & Geriye Dönük Uyumluluk (`snapshotSeasonAwards`, `remap`):** Sezon sonu arşivine seçilen formasyon (`fmt`) kaydedilir; eski sezon kayıtları sorunsuz şekilde `4-3-3` olarak açılmaya devam eder.
- Sürüm `20.6` (`VER`, `package.json` 20.6.0, `sw.js` `fc27-lig-v20-6`).

## v20.5 (Broadcast Perspektif TOTS Sahası & Altın MVP Vitrin Kartı)
- **Turnuvanın En İyi 11’i (`totsPitchHtml`, `totsCv`, `.tots-pitch`):**
  - **Perspektif 3B Saha:** Düz dikdörtgen yerine üste doğru daralan yamuk (trapezoid) perspektif saha çizgileri, perspektif ceza sahaları, elips orta yuvarlak ve dikey çim şeritleri eklendi.
  - **Yüzen Broadcast Oyuncular:** Kutu görünümü kaldırıldı; oyuncular saha üzerinde yüzen kulüp arması, sağ alt köşede hap mevki rozeti (`ST`, `LW`, `CDM`, `GK` vb.), buzlu koyu yeşil isim kapsülü ve altın yıldızlı (`★`) kompakt stat hapıyla gösterilir.
  - **Doğal 4-3-3 Kademesi & Mevki Sıralaması (`totsOrderLine`):** Kanatlar, forvet, ön libero ve bekler gerçek saha kademesine göre konumlanır.
  - **Altın MVP Vitrin Kartı (`totsFindMvp`):** En İyi 11 içindeki en yüksek performanslı oyuncu sağ üst köşede `MVP` etiketli, altın ışıklı buzlu cam kartla öne çıkarılır.
  - **PNG Poster Eşitlemesi (`totsCv`):** Paylaşılan yüksek çözünürlüklü TOTS PNG posteri de birebir aynı perspektif saha ve MVP vitrin tasarımına geçirildi.
- Sürüm `20.5` (`VER`, `package.json` 20.5.0, `sw.js` `fc27-lig-v20-5`).

## v20.4 (Elit Görsel Yenileme — Geçmiş › Özet, Rakip Analizi & Rozet Vitrini)
- **Geçmiş › Özet (`careerCard`, `xpCard`, `tsCard`, `A1`/`A2`/`A3`):**
  - *Kariyer Özeti* semantik 3'lü cam KPI kartları, orantılı G-B-M çubuğu ve renk kodlu telemetri şeridiyle yenilendi.
  - *Beklenene Göre Performans* kartı `psetCard` cam başlığı, kulüp armalı sezon kartları ve `Beklenen → Ulaşılan` iki kutulu akışla baştan tasarlandı.
  - *Toplu İstatistik*, *Sonuç Dağılımı*, *Puan İstatistikleri* ve *Takım Toplamları* kartları da aynı premium cam kart diline geçirildi.
- **Sezon › Rakip Analizi (`analCard`):**
  - Akordeon içindeki mükerrer başlık kaldırıldı; üstte **En Tehlikeli / En Kolay** ikili spot kartı eklendi.
  - Takım adlarının kesilmesini önleyen 2 katmanlı cam rakip satırlarına geçildi: üstte bayrak + arma + tam kulüp adı + genel fark hapı + `GEN` rozeti, altta 3'lü renk kodlu `HÜC / ORT / DEF` fark hapları.
- **Rozet Vitrini (`achCard`):**
  - Üstte genel tamamlanma yüzdesi, gradyan ilerleme çubuğu ve `Kazanıldı / İlerliyor / Kilitli` özet hapları eklendi.
  - Her rozet; durumuna göre altın/zümrüt veya kilitli görünümlü madalya amblemi (`.ach-em`), yüzdeli ilerleme hapı ve ince `5px` gradyan ilerleme çubuğuyla dokunsal vitrin kartına dönüştürüldü.
- Sürüm `20.4` (`VER`, `package.json` 20.4.0, `sw.js` `fc27-lig-v20-4`).

## v20.3 (Premium Sezon Karşılaştırma — Broadcast H2H)
- **Sezon Karşılaştır kartı baştan tasarlandı (`cmpCard`, `cmpsw`, `.cmp-vs`, `.cmp-bars`):**
  - Düz metin satırları ve kesilen (`...`) metinler yerine çift kulüp ışıklı **Broadcast VS** sahnesi eklendi: her iki sezonun kulüp arması, `GEN` puanı, kısa format etiketi, tam okunur durum hapı, `G-B-M` özeti ve orantılı form çubuğu.
  - İki sezon arasında tek dokunuşla yer değiştiren **⇄ Swap** (`cmpsw`, sıfır disk yazımlı `UI_ONLY`) düğmesi eklendi.
  - **Orantılı Karşılaştırma Çubukları:** Galibiyet Oranı, Maç Başı Puan, Atılan Gol/Maç, Yenen Gol/Maç (düşük olan önde), Gol Averajı, Oyuncu Katkısı (G+A) ve her iki sezonda veri varsa Ortalama xG/Maç otomatik renk kodlu çubuklarla kıyaslanır.
  - Alt bantta her iki sezonun **En Golcü** oyuncusu ve varsa **Oyun Ayarı** yan yana gösterilir.
- Sürüm `20.3` (`VER`, `package.json` 20.3.0, `sw.js` `fc27-lig-v20-3`).

## v20.2 (Simülasyon Gol & Asist Kalibrasyonu)
- **Mevkiye özel gerçekçi gol & asist ağırlıkları (`sim.js` — `SIM_GW`, `SIM_AW`, `pickSimScorer`, `simAssistsFor`):**
  - Genel `F / M / D` katsayıları yerine her mevki ayrı ağırlıklandırıldı: golde `ST/CF (6.5) > Kanat (4.6–4.8) > CAM (3.4) > LM/RM (2.6) > CM (1.5) > CDM (0.55) > Defans (0.30–0.42)`; asistte `CAM (5.0) > Kanat (4.0–4.2) > CM (3.0) > ST/CF (2.4–2.8) > Bek (1.7–2.0) > CDM (1.1) > CB (0.25)`.
  - **İlk 11 / Yedek dengesi:** İlk 11 (`1.00`) ve yedek (`0.22`) oranı gerçek futbola uyarlandı (gollerin ~%82–85'i İlk 11'den, ~%15–18'i sonradan giren yedeklerden gelir).
  - **Yıldız etkisi (`OVR`):** Güç çarpanı `1.06` yerine `1.10` tabanına yükseltildi; yüksek reytingli yıldız forvet ve 10 numaralar gol/asist krallığında ağırlığını hissettirir.
- Sürüm `20.2` (`VER`, `package.json` 20.2.0, `sw.js` `fc27-lig-v20-2`).

## v20.1 (Final Kapanış — Uygulama İçi Kullanım Kılavuzu & TOTS/Özet Cila)
- **Uygulama İçi Kullanım Kılavuzu (`Ayarlar › Kullanım Kılavuzu`, `guideDlg`):** Arayüzü kalabalıklaştırmadan `Ayarlar` sekmesine eklenen 6 bölümlük çevrimdışı rehber modalı (Hızlı Başlangıç, Simülasyon & Eleme Ağacı, Maç Girişi & xG Analizi, 6 PNG Poster, Kadro/Oyuncu Profili, Yedekleme & PWA Kurulumu) ve GitHub deposu için `KILAVUZ.md`.
- **Manuel Sezon Bitirişinde TOTS & MVP Arşivi (`snapshotSeasonAwards`, `a=="fin"`):** Yalnızca otomatik turnuva bitişinde değil, `Takımım › Sezonu Bitir` üzerinden manuel kayıt yapıldığında da o sezonun Turnuva MVP'si (`s.res.mvp`) ve 4-3-3 En İyi 11'i (`s.res.tots`) otomatik arşivlenir.
- **`Geçmiş › Sezonlar` kartında Özet + En İyi 11 erişimi:** Arşivli TOTS verisi olan sezon kartlarında **En İyi 11** düğmesinin yanında metin özetini kopyalamak için kompakt **Özet** ikon düğmesi de korunur.
- Sürüm `20.1` (`VER`, `package.json` 20.1.0, `sw.js` `fc27-lig-v20-1`).

## v20.0 (Final Sürüm — Native PWA Cilası, Eleme Ağacı PNG Posteri, Sezon TOTS/MVP Arşivi & Modüler Mimari)
- **Modüler Mimari (`sim.js`, `analytics.js`, `posters.js`, `app.js`):** 399 KB'lık tek parça `app.js`, sıfır kütüphane ve sıfır derleyici (`<script defer>`) korunarak 4 temiz modüle ayrıldı:
  - `sim.js`: Poisson simülasyon motoru, canlı puan tablosu, eleme ağacı ve turnuva bitişi.
  - `analytics.js`: Maç istatistikleri, rakipler, tahminler, xG/xPts, Taktiksel DNA, derin analitik kartları ve kariyer özeti.
  - `posters.js`: Kura, Maç Kartı, Sezon Karnesi, Kariyer Özeti, TOTS ve yeni Eleme Ağacı Canvas PNG poster motoru.
  - `app.js`: Çekirdek veri/durum yönetimi, görünümler, olay dinleyicileri ve PWA yaşam döngüsü.
- **Eleme Ağacı (Bracket) PNG Posteri (`koCv`, `kog`):** `Turnuva › Fikstür › Eleme Ağacı` kartına **Eleme Ağacını Görsel Olarak Paylaş** düğmesi eklendi. Tüm eleme turlarını bağlantı çizgileri, kulüp armaları, skorlar ve uzatma/penaltı rozetleriyle yüksek çözünürlüklü gece stadyumu PNG posterine dönüştürür.
- **Sezon Arşivinde TOTS & Turnuva MVP'si (`finishTournament`, `totsDlg`, `totsv`):** Turnuva sonlandırıldığında o sezonun **Turnuva MVP'si** (`s.res.mvp`) ve **4-3-3 En İyi 11'i** (`s.res.tots`) sezon kaydına kalıcı olarak arşivlenir (`remap` uyumlu). `Geçmiş › Sezonlar` kartlarında MVP rozeti ve eski sezonun En İyi 11'ini açıp paylaşmaya yarayan **En İyi 11** düğmesi yer alır.
- **Tam Yerel Uygulama (Native PWA) Cilası:**
  - **Dinamik `theme-color` (`syncThemeColor`):** Tema değiştiğinde veya sistem açık/koyu moda geçtiğinde tarayıcı üst durum çubuğu rengi anında `#2f8f5b` / `#0b1622` olarak güncellenir.
  - **Metin seçimi & esneme kilidi (`style.css`):** Form alanları hariç basılı tutunca metin seçimi kapatıldı ve `overscroll-behavior-y: none` ile web esneme etkisi giderildi.
  - **Ana Ekran Kısayolları (`manifest.webmanifest` & `initApp`):** Uygulama ikonuna uzun basıldığında açılan *Maç Merkezi* (`#gruplar`), *İstatistikler* (`#istat`) ve *Yeni Sezon* (`#yenisezon`) kısayolları eklendi.
- Sürüm `20.0` (`VER`, `package.json` 20.0.0, `sw.js` `fc27-lig-v20-0`).

## v19.3 (Mobil Yakınlaştırma Engeli — Çift Dokunuş, İki Parmak & iOS Form Odak Koruması)
- **Viewport sabitlendi (`index.html`):** `maximum-scale=1, minimum-scale=1, user-scalable=no` eklenerek yerel uygulama ölçeği sabitlendi.
- **Çift dokunuş & form odak yakınlaştırması kapatıldı (`style.css`):** Tüm sayfa ve etkileşimli öğelere `touch-action: pan-x pan-y` ve `-webkit-text-size-adjust: 100%` uygulandı; iOS Safari'nin form alanına dokununca otomatik yakınlaştırmasını önlemek için tüm `input`, `select` ve `textarea` yazı boyutları en az `16px` yapıldı.
- **İki parmakla (pinch-zoom) yakınlaştırma koruması (`app.js`):** iOS Safari `gesturestart/change/end` ve çoklu dokunuşlu (`touches.length > 1`) `touchstart/touchmove` olayları engellenerek tek parmak kaydırma ve hızlı buton tıklamaları bozulmadan iki parmak yakınlaştırma kapatıldı.
- Sürüm `19.3` (`VER`, `package.json` 19.3.0, `sw.js` `fc27-lig-v19-3`).

## v19.2 (Gruptan Çıkanlar Mobil Taşma Düzeltmesi & TOTS PNG Posteri)
- **Gruptan Çıkanlar (`.pg`, `qualSummary`) mobil taşma düzeltmesi:** Sağ sütundaki takım adlarının ve GEN rozetlerinin ekran kenarından kesilmesine yol açan `grid-template-columns: 1fr 1fr` hatası `repeat(2, minmax(0, 1fr))` ile düzeltildi; her çıkan takım taşmasız, kompakt cam kart olarak dizilir ve senin takımın altın çerçeveyle vurgulanır.
- **Turnuvanın En İyi 11'i (TOTS) PNG Posteri (`totsCv`, `totsg`):** `Turnuva › İstatistik › Turnuvanın En İyi 11'i` kartına **En İyi 11'i Görsel Olarak Paylaş** düğmesi eklendi. 1080×1460 yüksek çözünürlüklü gece stadyumu ışıklı yeşil saha üzerinde 4-3-3 dizilişi, kulüp armaları, renkli mevki etiketleri ve performans haplarıyla indirilebilir/paylaşılabilir PNG poster üretir.
- Sürüm `19.2` (`VER`, `package.json` 19.2.0, `sw.js` `fc27-lig-v19-2`).

## v19.1 (Broadcast Saha Dizilişi TOTS, Bağlantı Çizgili Eleme Ağacı, Oyuncu Profili Işığı/Grafiği & Mevki Rozetleri)
- **Turnuvanın En İyi 11'i — Broadcast Saha Dizilişi (`tourneyTots`, `totsPitchCard`, `.tots-pitch`):** `Turnuva › İstatistik` sekmesinin en üstüne, gece stadyumu ışıklı perspektif yeşil saha üzerinde otomatik **4-3-3** dizilişi eklendi. Gol, asist, MOTM ve temiz kasa performansına göre seçilen 11 oyuncu kulüp arması, mevki rozeti ve stat hapıyla gösterilir; kendi oyuncularına dokununca Oyuncu Profili, rakip oyunculara dokununca Kadro penceresi açılır.
- **Gerçek Bağlantı Çizgili Eleme Ağacı (`koTreeHtml`, `koBracketCard`, `bkv`):** 2+ turlu eleme aşamalarında yatay kaydırmalı, eşleşmeleri üst tura altın/zümrüt kollarla bağlayan gerçek turnuva ağacı (**🌳 Ağaç Görünümü**) varsayılan oldu; gol/asist dökümü için **📋 Detaylı Liste** görünümüne tek dokunuşla geçilebilir.
- **Oyuncu Profili Kulüp Işığı & Mini Sezon Grafiği (`plDlg`, `plSeasonChartSvg`, `.plsheet`):** Tıklanabilir Oyuncu Profili penceresi oyuncunun kulübünün renklerinden (`--pc1`/`--pc2`) üst stadyum ışığı alır; 2+ sezon verisi olan oyuncularda sezonlara göre yığılmış **Gol + Asist** çubuk grafiği (`Sezon İvmesi`) gösterilir.
- **Kadro İnceleme Mevki Renk Kodları (`tiBody`, `.sqp.p-*`):** Kadro penceresindeki pozisyon etiketleri (`GK`, `CB`, `CM`, `ST` vb.) *Mevki Dağılımı* ile uyumlu renk kodlu hap rozetlere (Kaleci kehribar, Defans çivit, Orta saha gök mavisi, Forvet zümrüt) geçirildi.
- Sürüm `19.1` (`VER`, `package.json` 19.1.0, `sw.js` `fc27-lig-v19-1`).

## v19.0 (Gelişmiş İstatistik Formu Sadeleştirmesi & Büyük Sürüm)
- **Gelişmiş İstatistik formundaki hızlı çipler ve şut stepper düğmeleri kaldırıldı (`advFormUI`, `mstp`, `mstd`):**
  - *Topla Oynama* altındaki `%40–%65` hızlı çipleri ve *Toplam Şut / İsabetli Şut* yanındaki `−/+` adım düğmeleri çıkarıldı; 5 Altın Veri alanı sade, doğrudan sayısal giriş düzenine döndürüldü (topla oynama otomatik tamamlaması korunur).
  - İlgili `mstp` / `mstd` olay dalları, `UI_ONLY` kayıtları ve `.advq` / `.advinp.stp` / `.advst` CSS kuralları temizlendi.
- Sürüm `19.0` (`VER`, `package.json` 19.0.0, `sw.js` `fc27-lig-v19-0`).

## v18.43 (Paket 3: Derin Analitik Motoru — Rakip Katmanı, Yakın Maç/Clutch, Oyuncu Profili & Canlı Grup Matematiği)
- **Rakip Güç Katmanı Performansı (`oppTierCard`):** Oynanan maçları rakibin `GEN` gücüne göre 4 katmana (**85+ Elit**, **80–84 Güçlü**, **75–79 Orta**, **<75 Zayıf**) ayırıp her katmandaki G-B-M, galibiyet %, gol ortalaması ve xG farkını gösterir (`İstat. › Analiz` & `Geçmiş › Maçlar`).
- **Soğukkanlılık & Skor Farkı Analizi (`marginCard`):** 1 gol farklı / penaltılı yakın maçlardaki kazanma oranını (Clutch Endeksi), 2+ farklı rahat galibiyetleri ve ağır yenilgileri orantılı çubuk ve yorumla özetler.
- **Çift Maçlı Rövanş Karnesi (`twoLegCard`):** 2 ayaklı eleme turlarında ilk maçı kaybedip rövanşta turu çevirdiğin *Geri Dönüşler*, ilk maçı kazanıp elendiğin *Elden Kaçan* seriler ve toplam tur geçme oranı eklendi (`Geçmiş › Maçlar`).
- **Tıklanabilir Oyuncu Profili Modalı (`plDlg`, `plProfileData`, `pinfo`):** `Sezon Ödülleri` ve `Geçmiş › Rekorlar › Kariyer Yıldızları` içindeki oyunculara dokununca kariyer toplamları (G/A/MOTM/G+A-Maç), eleme katkısı, en çok gol attığı rakipler, en uyumlu asist partnerleri ve sezon bazlı döküm açılır.
- **Canlı Gruptan Çıkış Matematiği (`grpBox`, `.pgmath`):** Grup aşamasında matematiksel olarak garantilenen çıkış, matematiksel elenme veya son 1–2 haftada gereken puan durumu canlı şerit olarak gösterilir.
- **Sezonlar Arası Taktiksel Gelişim (`tacticalDeltaHtml`):** `Oyun Tarzın` kartında mevcut sezon ile önceki istatistikli sezonun *Topla Oynama*, *Pas İsabeti*, *xG/Şut* ve *Bitiricilik* farkları `↑`/`↓` oklarıyla kıyaslanır.
- **Turnuva İstatistikleri Klasikleri (`tourneyStats`, `tstatView`):** **En Çok Temiz Kasa** ve **En İyi Averaj** liderlik kartları eklendi.
- Sürüm `18.43` (`VER`, `package.json` 18.43.0, `sw.js` `fc27-lig-v18-43`).

## v18.42 (Paket 2: Hızlı Skor Paneli, Canlı Kadro Rozetleri & Eleme/Fikstür Geçişi)
- **Kompakt tamamlanan gol şeritleri (`scorerUI`, `.glbox.compact`):** Maç girişinde golcüsü ve asist durumu belirlenen (veya Kendi Kalesine seçilen) goller tek satırlık kompakt özet şeridine daralır; 4–5 gollü maçlarda form dikeyde uzamaz. Tek dokunuşla `+ Asist`, `👟✕` veya `✎` ile yeniden düzenlenebilir.
- **Hızlı Gelişmiş İstatistik Girişi (`advFormUI`, `mstp`, `mstd`):** Topla oynama için tek dokunuşlu `%40–%65` hızlı çipler (rakip yüzdesini otomatik tamamlar) ve Toplam Şut / İsabetli Şut alanlarına akıllı `−/+` adım düğmeleri eklendi (isabetli şut toplam şutu geçtiğinde toplam şutu otomatik yükseltir).
- **Canlı Kadro Sezon Rozetleri (`tiSeasonStats`, `tiBody`, `tiDlg`):** Kadro inceleme modalında kendi takımının (ve turnuvadaki rakip takımların) oyuncularının yanında bu sezondaki **Gol (`G`), Asist (`A`) ve MOTM (`★`)** sayıları renkli rozetler halinde gösterilir; üstte kulübün sezon gol/asist lideri şeridi yer alır.
- **Fikstür › Eleme Ağacı | Grup Fikstürü geçişi (`fixtureView`, `fxv`):** Eleme turları başladığında uzun kaydırmayı önlemek için üstte segmentli `Eleme Ağacı | Grup Fikstürü` geçiş anahtarı eklendi. Tüm yeni etkileşimler (`fxv`, `mstp`, `mstd`) sıfır disk yazımlı `UI_ONLY` kümesine eklendi.
- Sürüm `18.42` (`VER`, `package.json` 18.42.0, `sw.js` `fc27-lig-v18-42`).

## v18.41 (Paket 1: Görsel Bütünlük Kapanışı — Tüm Ekranlar & Posterler)
- **Global cam kart eşitliği (`cd`, `histView`, `qualSummary`, `koBracketCard`, `matchLog`, `.mtl`):** `Geçmiş › Özet`, `Geçmiş › Maçlar`, `İstat. › Analiz` ve `Turnuva` ekranlarında kalan tüm eski kutusuz/çizgili kartlar `.card.pglass` cam kart tasarımına geçirildi; akordeon içindeki (`.acbody`) kartlarda çift çerçeve oluşumu engellendi.
- **Turnuva alt-sekme çubuğu (`tabPre`, `.stabs.ttabs`) & Geçmiş mod seçicisi:** `Kura | Gruplar | Fikstür | İstatistik` ve `Tümü | Kupa | Lig` çubukları modern segmentli cam dock tasarımına geçirildi; `‹ Sezon` geri dönüşü hap stile (`.backpill`) alındı.
- **Turnuva Simülasyon Merkezi (`simBarHtml`) & Turnuva İstatistikleri (`tstatView`):** Simülasyon merkezi SVG ikonlu cam karta ve segmentli mod seçiciye (`Gerçekçi | Dengeli | Sürprizli`), `Turnuva › İstatistik` sekmesindeki tüm liderlik kartları özel SVG ikonlu `psetCard` yapısına ve 3'lü KPI özetine kavuşturuldu.
- **Kura & Kariyer Özeti Posterleri (`kuraCv`, `kariyerCv`):** `v18.40` Broadcast Poster motoruna (`dkBg`, `glassBox`, `drawPill`, `drawPosterFooter`) taşındı; başlık ayırıcı çizgisi çakışması giderildi, grup harfi rozetleri ve 2 sütunlu kariyer liderleri cam ızgarası eklendi.
- Sürüm `18.41` (`VER`, `package.json` 18.41.0, `sw.js` `fc27-lig-v18-41`).

## v18.40 (Premium Broadcast Maç Kartı, Sezon Karnesi & Poster Önizleme Modalı)
- **Sezon Karnesi (`karneCv`) baştan tasarlandı:**
  - **Kulüp renkli stadyum ışığı (`dkBg`, `glassBox`):** Senin kulübünün renklerinden (`c1`/`c2`) veya şampiyonlukta metalik altından beslenen çift taraflı stadyum ışığı, hafif saha geometrisi filigranı ve cam paneller eklendi.
  - **Kulüp Vitrini & HÜC/ORT/DEF rozetleri:** Gölgeli arma, kulüp adı altında `HÜC / ORT / DEF` hapları ve sağda seviyeye göre altın/gümüş/bronz `GENEL` amblemi yer alır.
  - **Telemetri & Ödüller Vitrini:** Galibiyet oranlı (`%`) 3'lü G-B-M cam kartları, orantılı G-B-M çubuğu, 4'lü gol/averaj/puan kutuları ve havada duran eski emojili satırlar yerine altın vurgulu **MVP** bandı + 2 sütunlu **Sezon Ödülleri** cam ızgarası tasarlandı.
  - **Maç Sonuçları & G/B/M Form:** Maç listesi başlığına harfli (`G`/`B`/`M`) form daireleri, her satıra renkli sonuç ve skor kapsülleri eklendi.
- **Maç Kartı (`macCv`) baştan tasarlandı:**
  - **Çift kulüp ışıklı skor tabelası:** Sol taraf senin, sağ taraf rakibinin kulüp rengiyle aydınlanır; gölgeli armalar, dev parıltılı skor, uzatma/penaltı rozeti ve gradyan sonuç/hak ediş hapı yer alır.
  - **Broadcast Maç Analizi & Detaylar:** Önde olan tarafı vurgulayan bölünmüş istatistik çubukları, `Gol − xG` verimlilik hapı, numaralı gol rozetleri, sağda hizalı `ASİST` kapsülleri ve altın **★ MOTM** bandı eklendi.
- **Poster Önizleme Modalı (`imgDlg`, `.pimgdlg`):** Görselin iki yanında çıkan beyaz boşluk (`background:#fff`) tamamen kaldırıldı; koyu sahne çerçevesi ve özel SVG ikonlu **Paylaş / İndir** çubuğuna geçirildi.
- Sürüm `18.40` (`VER`, `package.json` 18.40.0, `sw.js` `fc27-lig-v18-40`).

## v18.39 (Premium Puan Tablosu & Takımım / Sezonu Bitir Yeniden Tasarımı)
- **Gruplar canlı puan tablosu baştan tasarlandı (`grpCard`, `.card.ptbl`):**
  - **Sıra (`#`) ve Puan (`P`) hizalama hatası giderildi:** Sol kenar şeridinin sıra rozetini kesmesi ve `.row.tb` kuralı yüzünden rakamların sola yapışması düzeltildi; tüm sayısal sütunlar ve puan kapsülleri tam ortalandı.
  - **Broadcast Standings görünümü:** Kura sayfasıyla uyumlu büyük harf rozetli başlık (`.pt-hd`) ve canlı hafta hapı (`5. Hafta`), yumuşak cam sütun başlığı (`.pt-col`), renkli averaj (`+` zümrüt / `−` mercan), gruptan çıkış sınırını netleştiren kesikli **eleme hattı** (`.qcut`) ve özel SVG ikonlu **Hafta sonuçları ve fikstür** düğmesi eklendi.
- **Takımım & Sezonu Bitir sayfası yenilendi (`teamView`, `lockNote`, `#fincard`):**
  - **Kadro İnceleme & Kilit Kartı:** FUT kartının altındaki düz buton kulüp renkli cam karta (`.tm-sqbtn`), kilit metni ve *Takımı değiştir* bloğu Kura sayfasıyla uyumlu kilit kartına (`.klock.tlock`) dönüştürüldü.
  - **Sezonu Bitir (`#fincard`):** Düz form alanları yerine kupa ikonlu cam karta taşındı; *Gruptaki Sıran* ve *Puan* yan yana 2 sütunlu ızgarada (`.su-fgrid`), kayıtlı sonuç ise altın/zümrüt özet bandında (`.fin-ban`) gösterilir.
- Sürüm `18.39` (`VER`, `package.json` 18.39.0, `sw.js` `fc27-lig-v18-39`).

## v18.38 (Premium Kurulum Sayfası — Turnuva Mimarı)
- **Kurulum sayfası baştan tasarlandı (`setupView`, `lockedView`, `setupBlueprint`, `suTeamGrid`):**
  - **Turnuva Mimarı Başlık Kartı (`.su-hero`):** Üstte radyal ışıklı cam başlık ve canlı sezon rozeti eklendi.
  - **İkonlu Hazır Şablonlar (`.su-tpl` / `.su-tcard`):** 5 şablonun her biri özel çizgi SVG ikonlu cam karta dönüştürüldü; 5. şablon (*Lig*) tam genişliğe yayılarak boşluk sorunu giderildi.
  - **Segmentli Kontroller:** *Aşamalar/Mod*, *Takım Sayısı*, *Grup Büyüklüğü*, *Gruptan Çıkacak Takım* ve *Grup / Eleme / Final Maçları* göz yoran parlak yeşil kutular yerine zarif segmentli kontrollere (`.stabs`, `.su-mrow`) geçirildi.
  - **Gelişmiş Kurallar Katlanır Paneli (`.pfold`):** *Varsayılan / Özel* durum hapı, 3'lü bölge segmenti, bayraklı ülke çipleri ve 2 sütunlu güç/sınır seçicileriyle (`.su-fgrid`) derli toplu hale getirildi.
  - **Kurulum Özeti Blueprint & Havuz Göstergesi:** 8 satırlık düz liste yerine 3'lü KPI kutuları (*Takım / Grup / Toplam Maç*), görsel **Eleme Yolu** zinciri (`.su-chain`), aktif kural hapları ve renkli **Takım Havuzu Doluluk Çubuğu** (`.su-pool`) eklendi.
  - **Uygun Takımlar Taşma Düzeltmesi (`.su-tgrid`):** Mobil ekranlarda 2. sütundaki GEN rozetlerinin sağ kenardan kesilmesine yol açan grid taşması `repeat(2, minmax(0, 1fr))` ile giderildi; her takım satırına dokunarak kadro inceleme (`tinfo`) eklendi.
- Sürüm `18.38` (`VER`, `package.json` 18.38.0, `sw.js` `fc27-lig-v18-38`).

## v18.37 (Premium Sezon Ana Ekranı — Broadcast Matchday Hub & Anında Güncelleme)
- **Sezon ana ekranı baştan tasarlandı (`homeView`, `stkPill`, `bkRemind`, `.pprog`, `.phero`, `.ph-vs`, `.pbks`):**
  - **Cam İlerleme Çubuğu (`.prog.pprog`):** Üstteki 5 adımlı akış (*Kurulum → Takım → Kura → Oyna → Bitir*), cam kapsül içine alındı; tamamlanan adımlar zümrüt gradyanlı, aktif adım halkalı vurguyla gösterilir.
  - **Broadcast Matchday Hub (`.big.hero.phero`):** Düz yeşil çizgili eski kart kaldırıldı; senin kulübün (`--club1`) ve sıradaki rakibinin (`--op1`) renklerinden çift taraflı stadyum ışığı alan cam kart tasarlandı. Sıradaki maçta iki takımın `50px` armaları, `GEN` puanları, merkez `VS` rozeti ve güç farkı / H2H özeti gösterilir; rakibe dokununca doğrudan kadrosu açılır.
  - **Dengeli Aksiyon Satırı (`.ph-acts`):** İri neon buton ve solda boşta kalan *Sezonu bitir* düğmesi yerine özel SVG ikonlu zümrüt gradyanlı **Maç Merkezi · Skoru Gir** ve yanında dengeli **Sezonu Bitir** (bitmiş sezonda **Yeni Sezon Başlat / Karneyi Paylaş**) cam düğmeleri yerleştirildi.
  - **Zarif Yedekleme Şeridi (`.bks.pbks`):** Kehribar cam ikon rozeti, sadeleştirilmiş metin ve altın tonlu kompakt **Yedekle** butonuyla yenilendi.
- **Anında PWA Güncelleme (`sw.js` & `app.js`):**
  - `app.js` içindeki Service Worker kaydına `{ updateViaCache: "none" }` ve açılışta `r.update()` eklendi; GitHub Pages'in 10 dakikalık HTTP önbelleğine takılmadan yeni sürüm algılanır.
  - `sw.js` (`CACHE = "fc27-lig-v18-37"`) bundan böyle her sürüm ZIP paketine doğrudan dahil edilir.
- Sürüm `18.37` (`VER`, `package.json` 18.37.0, `sw.js` `fc27-lig-v18-37`).

## v18.36 (Aşama 2: Premium Sezonlar & Rakipler Sayfaları)
- **Geçmiş › Sezonlar yenilendi (`seasonsView`, `A6c`, `.sf-box`, `.scard`):**
  - Ekranın tamamını kaplayan eski açık filtre bloğu, tek satırlık segmentli **Tümü | Kupa | Lig** barı + **Liste | Galeri** anahtarı + katlanabilir **Filtrele** çekmecesine (`st.sfopen`, sıfır disk yazımlı `UI_ONLY`) dönüştürüldü.
  - **Kulüp ışıklı sezon kartları (`.card.scard`):** Her sezon kartı kulübün renklerinden (`--sc1`/`--sc2`) hafif ışık alır; aktif sezon zümrüt çerçeve ve `Aktif` etiketi, şampiyonluk sezonu altın parıltı alır. Armalı başlık, durum rozeti, `G-B-M` / Gol / Oyuncu mikro hapları ve ikonlu kompakt aksiyon çubuğu (*Aç*, *Karne*, *Özet*, *Adı değiştir*, *Sil*) eklendi.
- **Geçmiş › Rakipler yenilendi (`oppCard`, `revCard`, `rivBlk`, `.pop-r`, `.rev-r`):**
  - **Rakiplerim KPI özeti:** Düz iki satırlık özet yerine 3'lü KPI kutusu (*Farklı Rakip*, *Toplam Maç*, *Galibiyet %*) ve renkli vurgu şeritleri (*En çok yendiğin*, *En çok kaybettiğin*, *Seni en çok eleyen*) eklendi.
  - **Kızıl vurgulu İntikam Listesi (`.rev-r`):** Soluk gri skor metinleri yerine alev ikonlu cam kart içinde kırmızı skor kapsülleri (`.rec-sc.l`) ve tur/eleme notları yerleştirildi.
  - **Akıllı G-B-M rozetleri (`.gbm.pgbm`) & açılır H2H çekmecesi (`.podt`):** Sıfır değerli (`0G`/`0B`/`0M`) kutuların parlak neon gürültüsü giderilip soluklaştırıldı; rakibe dokununca açılan H2H paneli seri hapları, skor kapsüllü maç satırları ve averaj özetine yükseltildi.
- Sürüm `18.36` (`VER`, `package.json` 18.36.0; `sw.js` önbelleği `fc27-lig-v18-36` olarak güncellenmelidir).

## v18.35 (Aşama 1: Premium Akordeonlar, Sezon Ödülleri Vitrini & Ayarlar Yeniden Tasarımı)
- **Sezon ekranı akordeonları ve Sezon Ödülleri yenilendi (`homeView`, `awardsCard`, `.pfold`, `.awd`):**
  - Açık akordeon başlığını parlak neon yeşile boyayan `.acbtn.on` çakışması giderildi; tüm akordeonlar (Sezon Ödülleri, Rakip Analizi, Oyun Ayarları, Rozetler, Veri Sıfırlama) özel SVG ikon rozetli, canlı özet haplı (`.xfpill`) ve dairesel açma oklu (`.acc`) cam panellere geçirildi.
  - **Sezon Ödülleri (`awardsCard`):** Akordeon içindeki mükerrer "Sezon ödülleri" başlığı kaldırıldı. *Sezonun MVP'si* üstte tam genişlikte altın ışıklı hero kart oldu; altındaki ödüller kategoriye özel renkli SVG ikonlarla 2 sütunlu dizilir ve tek sayıda ödül kaldığında son kart (örn. *Altın İkili*) tam genişliğe yayılarak boşluk ve isim kesilmesi önlenir.
- **Ayarlar sayfası baştan tasarlandı (`setView`, `quotaCard`, `appCard`, `rcvCard`, `trashCard`, `resetCard`):**
  - Düz ayırıcı çizgiler ve iri neon butonlar yerine her bölüm özel SVG ikonlu ve durum haplı gruplanmış cam kartlara (`.card.pglass.pset`) taşındı.
  - **Görünüm ve Deneyim:** Tema (*Otomatik | Taktik Tahtası | Gece Stadyumu*) ve Hareket (*Açık | Kapalı*) seçimleri zarif segmentli kontrollere (`.stabs.seg3` / `.seg2`) dönüştürüldü.
  - **Yedekleme & Depolama:** İkonlu yan yana *Yedeği İndir / Dosyadan Yükle* aksiyonları, 3'lü depolama KPI kutusu ve gradyan doluluk göstergesi eklendi; yasal uyarı metni katlanabilir alana alındı.
- Sürüm `18.35` (`VER`, `package.json` 18.35.0; `sw.js` önbelleği `fc27-lig-v18-35` olarak güncellenmelidir).

## v18.34 (Katlanabilir Analiz Panelleri Hizalama Düzeltmesi & Premium Rekorlar / Hall of Fame)
- **Katlanabilir analiz panelleri (`.xfold`) düzeltildi ve yükseltildi (`xgSec`, `xgSummaryCard`, `style.css`):**
  - Eski `v18.30` kuralının (`details.xfold>summary.xsh span:first-child`) ikon kutusunu başlığın üstüne iten CSS çakışması giderildi.
  - Her katlanabilir başlık artık solda `36px` cam ikon rozeti, ortada başlık + tek satır alt başlık, sağda ise açmadan canlı özet gösteren metrik hapı (`.xfpill`, ör. `%50`, `%52 top`, `5 maç`) ve dairesel ok düğmesiyle (`.xfc`) hizalanır.
- **Geçmiş › Rekorlar sayfası baştan tasarlandı (`recCard`, `histView`, `posDistCard`, `cmpCard`):**
  - **Üst alt-sekme çubuğu (`.stabs.htabs`):** `Özet | Rekorlar | Sezonlar | Rakipler | Maçlar` çubuğu, `İstat.` sekmesindeki segmentli cam dock tasarımına geçirildi.
  - **Rekorlar (`.card.prec`):** Düz metin listesi yerine ikonlu ve skor kapsüllü maç rekoru kartları (`.rec-tile`), 3'lü seri/kilometre taşı KPI şeridi (`.rec-kpi`: Galibiyet Serisi, Yenilmezlik, Temiz Kasa) ve altın vurgulu *En İyi Sezon* bandı eklendi.
  - **Kariyer Yıldızları / Hall of Fame (`.card.phof`):** Üstte 3'lü kariyer toplamı KPI kutuları (Gol / Asist / MOTM), altın/gümüş/bronz madalyalı (`.mdl`) liderlik tabloları ve ikincil listeler (Clutch, Altın İkililer, Çift Yönlü Yıldızlar, MOTM, Maç Başı Verimlilik) için önizleme haplı katlanabilir paneller eklendi.
  - **Mevki Dağılımı (`.card.ppos`) & Oynanan Takımlar (`.card.ptms`):** Mevkiye özel renkli etiket ve gradyan çubuklar; oynanan takımlarda kulüp arması (`badge`) ve sezon rozeti eklendi.
- Sürüm `18.34` (`VER`, `package.json` 18.34.0; `sw.js` önbelleği `fc27-lig-v18-34` olarak güncellenmelidir).

## v18.33 (Premium xG, xPts & Verimlilik Analizi)
- **xG, xPts & Verimlilik Analizi yeniden tasarlandı (`xgSummaryCard`, `.pxvd`, `.xinsbox`, `.xt`, `.xbarbox`):**
  - Üst durum bandı (`.xvd.pxvd`) soluk uyarı kutusundan çıkarılıp ikonlu, hafif radyal ışıklı ve `xG / xPts / Gol−xG` kapsam haplı hero karta dönüştürüldü.
  - 4–5 ayrı kutu halinde yığılan emojili koç notları, özel SVG ikonlu tek birleşik cam **Koç Özeti** kartında (`.xinsbox`) toplandı.
  - Tüm KPI kutuları (`.xt`) üstte büyük harf etiket, ortada `34px` semantik renkli sayı, altında delta hapı (`.xtsub`) ve ince ayraçlı yorum içeren katmanlı cam kartlara yükseltildi; tekrar eden uzun xG/xPts ders kitabı notları temizlendi (terimler sözlüğünde zaten mevcut).
  - Tüm alt bölümlere ve katlanabilir analiz modüllerine (`details.xfold`) özel SVG ikonlar (`XGI`), `xG Payı` çubuğuna yüzdeli karşılaştırma kutusu (`.xbarbox`) eklendi.
- Sürüm `18.33` (`VER`, `package.json` 18.33.0; `sw.js` önbelleği `fc27-lig-v18-33` olarak güncellenmelidir).

## v18.32 (Premium Oyun Tarzın / Taktiksel DNA & 3'lü Hak Ediş Dashboard)
- **Taktiksel DNA eksen kartları yeniden tasarlandı (`tacticalDnaCard`, `.dnaitem`):**
  - Numaralandırma (`1., 2., 3., 4.`) kaldırıldı; her eksene özel çizgi SVG ikon (`DNAI`) eklendi.
  - **Seviye bazlı renk sistemi (`l1`–`l5`):** Geliştirilmeli (mercan), Orta (kehribar), İyi (mavi-yeşil), Çok iyi (zümrüt), Elit (altın-zümrüt gradyan + hafif altın parıltı) olarak tüm kart, ikon, puan ve çubuk renklendirildi.
  - **Büyük puan ve mikro metrik hapları:** Sağda `31px` vurgulu puan (`/100` etiketli), başlık altında ham istatistikler için sarmalanan mikro haplar (`.dnamets`), `35 / 50 / 65 / 80` eşik çentikli gradyan çubuk (`.dnabar`) eklendi.
  - **Aşamalı bilgi (Progressive Disclosure):** "Yükseltmek için..." metni her kartın altında katlanabilir `"Nasıl yükselir?"` (`<details class="dnatip">`) alanına, 0–100 puan ölçeği açıklaması ise alttaki `"Puanlar nasıl hesaplanıyor?"` bölümüne taşındı.
- **"Maç sonuçların hak edildi mi?" 3'lü dashboard oldu (`.dhkbox`, `.dhk3`):**
  - Üç uzun yatay satır yerine üstte orantılı 3 renkli şerit (`.dhkbar`), altında yan yana 3 ikonlu KPI kutusu (*Hak Edilmiş*, *Şanslı*, *Şanssız*) yerleştirildi; değeri `0` olan kutu soluklaşır.
- Sürüm `18.32` (`VER`, `package.json` 18.32.0; `sw.js` önbelleği `fc27-lig-v18-32` olarak güncellenmelidir).

## v18.31 (İstatistik Sekmesi Sadeleştirmesi: 3 Alt Sekme & Mevki Dağılımı Taşınması)
- **Kadro / Manuel Oyuncu Düzenleme alanı kaldırıldı (`statView`):** Maç girişlerinden otomatik hesaplanan oyuncu istatistikleri için manuel giriş/düzenleme kartı ve `Kadro` alt sekmesi kaldırıldı.
- **Mevki dağılımı `Analiz` sekmesine taşındı:** `posDistCard([s])` artık `İstat. › Analiz` altında, *Oyun Tarzın* ve *xG, xPts & Verimlilik Analizi* kartlarının devamında gösterilir.
- **Üst alt-sekme çubuğu 3'lü yapıya geçti (`.stabs`):** `İstat.` sekmesinde yalnızca **Maçlar | Analiz | Ödüller** kalır (`repeat(3, 1fr)`).
- **Ölü kod ve CSS temizliği:** Kaldırılan manuel oyuncu düzenleme paneline ait `CF`, `st.px`, `a=="px"`, `a=="pm"`, `a=="pdel"`, `d.pr` olay dalları, `aePr` odak takibi ve `.pq` / `.prow` / `.pst` CSS kuralları temizlendi. Mevcut kayıtlı veriler (`s.pl`, `p.r`, `p.b`) geriye dönük uyumluluk için korunur.
- Sürüm `18.31` (`VER`, `package.json` 18.31.0; `sw.js` önbelleği `fc27-lig-v18-31` olarak güncellenmelidir).

## v18.30 (Premium Sezon Ekranı & Kompakt İstatistik Sekmesi)
- **Sezon ekranı yeniden tasarımı (`tmini`, `grpBox`, `seasonStatBox`, `homeView`):**
  - **Kulüp kartı (`tmini`):** Koyu temada parlayan düz açık zemin kaldırıldı; kulübün kendi renklerinden (`--club1`/`--club2`) hafif ışık alan cam kart tasarımına geçildi. Sağda seviyeye göre (altın/gümüş/bronz) `GEN` rozeti, altta `HÜC / ORT / DEF` güç çubukları yer alır. Kart sezon akışında en üste alındı.
  - **Grubum / Lig kartı (`grpBox`):** Grup harfi rozeti, canlı sıralama rozeti (`calcGroupTable` üzerinden `1. Sıra` vb.), oynanan maç ilerleme çubuğu, renk kodlu KPI kutuları (Oynanan / Puan / Averaj) ve kadrosu tek dokunuşla açılabilen armalı kalan rakip hapları eklendi.
  - **Sezon Performansı (`seasonStatBox`):** Düz 4 satırlık "Sezon durumu" listesi yerine orantılı `G-B-M` çubuğu, galibiyet yüzdesi rozeti, renkli `G / B / M` sayaçları, `Atılan / Yenen Gol` (averajlı) ve `Son Form` kutuları eklendi.
- **İstatistik (`İstat.`) sekmesi uzunluk çözümü (`statView`, `sbRow`, `xgSummaryCard`):**
  - Sayfa üstten 4 alt sekmeye bölündü: **Maçlar**, **Analiz**, **Kadro**, **Ödüller** (`st.stab`).
  - Maç günlüğündeki 5 barlık istatistik paneli yalnızca en son maçta varsayılan açık, önceki maçlarda kompakt özet şeridiyle (`xG · top · şut`) tek dokunuşla açılır (`st.mexp`) hale getirildi.
  - `xG, xPts & Verimlilik Analizi` kartında *Gol Beklentisi* ve *Puan Beklentisi* açık kalırken *Şut Kalitesi*, *Savunma & Kaleci*, *Oyun Kontrolü*, *Hak Ediş Dağılımı* ve *xG Trendi* katlanabilir `<details>` bloklarına alındı.
  - `stab` ve `mexp` etkileşimleri `UI_ONLY` kümesine eklendi (sıfır disk yazımı).
- **CSS temizliği (`style.css`):** Eski `.tmini` kuralları temizlenip yeni `v18.30` stilleri açık/koyu tema ve 320 px ekran uyumlu olarak eklendi.
- Sürüm `18.30` (`VER`, `package.json` 18.30.0; `sw.js` önbelleği `fc27-lig-v18-30` olarak güncellenmelidir).

## v18.29 (Temizlik)
- **Kullanılmayan kod kaldırıldı:** `app.js` içindeki hiçbir yerden çağrılmayan `userMetaLine` ve `storage.js` içindeki `hasPendingSave` silindi. Davranış değişmedi.
- **Ölü kulüp renk verisi:** Takım havuzunda bulunmayan dört kulübün (Rangers, Inter Miami, Shakhtar Donetsk, Anderlecht) `CLBC` kayıtları silindi.
- **Depo temizliği:** Noktasız yinelenen `gitignore` dosyası kaldırıldı (geçerli olan `.gitignore` duruyor).
- Sürüm `18.29` (`VER`, `package.json` 18.29.0, `sw.js` önbelleği `fc27-lig-v18-29`).

## v18.28 (Premium Kura Sayfası)
- **"Kura onaylandı" bandı:** Düz not ve buton yerine kilit simgeli, yeşil tonlu durum kartı. Kaçıncı denemede kesinleştiği altında yazar; "Kurayı ve takımı sıfırla" tam genişlikte, kırmızı tonlu ve simgeli bir buton oldu (işlevi aynı).
- **Kura bilgi kartı:** Eski düz metin kutusu, "Torbalı kura / Rastgele kura" başlıklı karta dönüştü; takım, grup, torba sayısı ve aynı ülke kuralı rozet olarak gösterilir.
- **Grup kartları:** Büyük harf rozetli başlık (senin grubun altın renkli, "★ Senin grubun" etiketli), gradyan güç çubuğu ve GEN / HÜC / DEF için üç ayrı istatistik kutusu. Eski "Gen 78,8 · Hüc 79,4 · Def 77,4" tek satırı kalktı.
- **Takım satırları:** Daha büyük bayrak ve arma, takım adının altında HÜC / ORT / DEF değerleri, parlak gradyanlı genel puan rozeti. Senin takımın altın vurgulu satırla öne çıkar; satırlar arası ince ayraçlar, dokunma ve üzerine gelme geri bildirimi eklendi.
- Gruplar sekmesinde maç oynanmadan önce görünen liste de aynı tasarımı kullanır. Veri yapısı ve işlevler değişmedi; açık/koyu tema ve 320 px ekran desteklenir.

## v18.27 (Premium Maç Günlüğü Kartları)
- **Maç kartı yeniden tasarlandı (İstat. › Maç günlüğü):** Üstte sonuç renginde ince vurgu şeridi, tur etiketi ve düzenle / maç kartı / sil için tutarlı çizgi simgeli (SVG) butonlar (34 px dokunma alanı). "Kart" yazılı geniş buton kalktı, işlevleri aynı.
- **Skor tablosu:** Takım armaları adın üstünde büyük ve ortalı; skor kapsülü daha büyük, gölgeli. Uzun takım adları kesilir, taşma olmaz. Armasız takımlar için yer tutucu eklendi.
- **Karşılaştırmalı istatistik paneli:** Dağınık rozetlerin yerine "Sen – Rakip" çubuklu satırlar: xG, Topla oynama, Şut, İsabetli şut, Pas isabeti. Üstün olan taraf renkli vurgulanır, çubuk iki tarafın oranını gösterir. "parantez: isabetli şut" açıklamasına gerek kalmadı; isabetli şut ayrı satır. Kurtarış ve Gol − xG panelin altında rozet olarak durur.
- **Hak ediş kutusu:** "Hak edilmiş galibiyet / Şanslı / Şanssız" durumu ve gerekçe cümlesi, renk kodlu (yeşil / mavi / turuncu) tek bir açıklama kutusunda birleşti. Eski sol kenar çizgisi kaldırıldı.
- **Goller ve asistler:** Tek satırda "…" ile kesilen metin yerine sarmalanan rozetler: ⚽ golcü + 👟 asist, kendi kalesine goller kırmızı çerçeveli, maçın adamı altın rozetli (rakip oyuncuysa takımıyla).
- **"Son maçlar" başlığı** ince çizgili bölüm başlığına dönüştü.
- Veri yapısı ve işlevler değişmedi; açık/koyu tema ve 320 px ekran desteklenir.

## v18.26 (Premium Alt Gezinme Çubuğu)
- **Yüzen cam dock:** Alt çubuk kenarlara yapışık düz şeritten, ekrandan ayrılmış yuvarlak köşeli (26 px) cam efektli bir dock'a dönüştü: bulanık arka plan, ince kenarlık, yumuşak gölge ve üst kenar ışığı. Geniş ekranlarda en fazla 520 px genişlikte ortalanır.
- **Aktif sekme:** Üstteki ince çizgi kaldırıldı; seçili sekme vurgu renginde degrade dolgulu, ince halkalı bir hap içinde gösterilir. Simge hafifçe büyür ve kalınlaşır, geçişler animasyonludur (hareket kapalıyken animasyon yok).
- **Okunurluk:** Simgeler 24 px, etiketler başlıklarla uyumlu yoğun yazı tipinde ve tek satır. Soldaki "Sezon" ile sağdaki "Ayarlar" yazılarının kenarlardan kesilmesi giderildi; çok dar ekranda (≤339 px) boşluklar küçülür.
- **Dokunma geri bildirimi:** Basılınca hafif küçülme, klavye ile gezinmede odak halkası, fare olan cihazlarda üzerine gelince renk değişimi.
- **Tema:** Açık ve koyu tema için ayrı renk değişkenleri (`--nvBg`, `--nvA`, `--nvRing` vb.).
- Sayfa alt boşluğu ve bildirim (toast) konumu yeni yüksekliğe göre ayarlandı. Sekme etiketleri artık `<span>` içinde; kayıtlı veri etkilenmez.

## v18.25 (Açıklayıcı İstatistikler: Oyun Tarzın ve xG/xPts Analizi Yeniden Tasarımı)
- **xG, xPts & Verimlilik Analizi kartı** bölümlere ayrıldı: Gol Beklentisi, Puan Beklentisi, Şut Kalitesi, Savunma & Kaleci, Oyun Kontrolü, Hak Ediş Dağılımı ve xG Trendi. Her kutu artık değerin altında düz Türkçe bir yorum gösterir (ör. "Beklentinin üstünde gol attın: bitiricilik çok iyi") ve yoruma göre renklenir.
- **Koç notları:** Veriden otomatik üretilen 5 maddeye kadar özet (bitiricilik, puan şansı, savunma, şut kalitesi, şut üstünlüğü, kaleci).
- **Yeni istatistikler:** Yenen xG, xG Farkı (maç başı), Pozisyon Payı (+ karşılaştırma çubuğu), Maç Başı Puan, Maç Başı Şut ve isabetli şut, Rakip Şutu, Önlenen Gol (yenen xG − yenen gol), Temiz Kasa, Pas Üstünlüğü, beklenen şut dönüşümü kıyası, hak ediş dağılım çubuğu ve maç maç xG çubuk grafiği (son 10 maç, G/B/M işaretli).
- **Oyun Tarzın kartı:** Her eksen için seviye etiketi (Geliştirilmeli / Orta / İyi / Çok iyi / Elit), ham değerler, "bu ne demek" yorumu ve "nasıl yükselir" ipucu. En güçlü ve geliştirilecek eksen özeti, veri güven düzeyi (maç sayısına göre) ve girilmeyen veriler için uyarı eklendi. "Puanlar nasıl hesaplanıyor?" bölümü ağırlıkları açıkça gösterir.
- **Hak ediş kutuları** yeniden adlandırıldı: Hak Edilmiş Galibiyet, Şanslı Sonuç, Şanssız Sonuç; her birinin ne anlama geldiği açıklandı.
- **Terimler sözlüğü:** xG, Yenen xG, xG Farkı, xPts, Şut Dönüşümü, Kaleci Kurtarış, Önlenen Gol, Top Verimi ve Hak Ediş açıklamaları (katlanır).
- **Maç günlüğü satırları:** "Sen – Rakip" göstergesi, Kurtarış rozeti, "Gol − xG" etiketi ve her maç için hak ediş gerekçesi cümlesi (ör. "Rakipten 0,70 xG fazla pozisyon bulmana rağmen kaybettin (beklenen 1,6 puan, alınan 0)").
- Hesap formülleri ve veri yapısı değişmedi; mevcut kayıtlar olduğu gibi çalışır.

## v18.24 (Fikstür Ekranı Yeniden Tasarımı: Okunurluk ve Premium Görünüm)
- **Maç kartları:** Her maç artık ayrı bir kart. Üstte takım armaları ve adları, ortada skor tabelası; kazanan takım kalın, kaybeden soluk gösterilir. Senin maçın tabelası vurgu renginde, kart kenarı sonuca göre (galibiyet yeşil, beraberlik altın, mağlubiyet kırmızı) renklenir.
- **Gol ve asist dökümü:** Tek satırda `·` ile birleşen metin kaldırıldı. Goller iki sütunda, her takım kendi tarafında; asist oyuncusu soluk renkte parantez içinde. Kendi kalesine goller kırmızı işaretle ayrılır.
- **Maçın adamı:** Ayrı, ortalanmış bir satırda (★ Maçın adamı · isim).
- **Hafta başlığı:** Emoji takvim simgesi kaldırıldı; büyük hafta başlığı, `oynanan/toplam` sayacı ve ilerleme çubuğu eklendi.
- **Grup başlıkları:** İnce çizgili ayraçla; tek gruplu turnuvalarda başlık gizlenir.
- **Hafta sekmeleri:** Hap biçiminde, daha büyük dokunma alanı; oynanmamış haftalar kesik çizgili.
- Tüm renkler tema değişkenlerinden gelir (açık/koyu tema ve kulüp renkleri uyumlu). `simMetaLine` / `userMetaLine` eleme ağacı için korundu.

## v18.23 (Görsel Cila: Kulüp Ambiyansı, Hedef Şeritleri, Podyum, Broadcast Skor Tabelası, Eleme Ağacı ve Müze Vitrini)
- **Kulüp renklerine duyarlı dinamik stadyum ışıklandırması (Ambient Club Glow):** `render()` seçili takımın `bspec(s.my)` renklerini (`c1`, `c2`) kök elemana `--club1` / `--club2` CSS değişkenleri ve `data-club` özniteliği olarak aktarır. Üst bar, ana ekran durum kartı (`.hero`) ve hızlı skor paneli (`.sheet`) bu renklerle hafif spot ışığı alır (Beşiktaş siyah-beyaz, Galatasaray kırmızı-sarı, Real Madrid beyaz-altın). Takım seçilmediyse efekt kapalıdır; altın şampiyonluk kartı değişmeden kalır.
- **Puan tablosunda sol kenar hedef şeritleri (`.gtbl`):** 1. sıra altın, gruptan çıkan diğer sıralar zümrüt yeşili 3px dikey şerit ve hafif gradyan alır; 1. sıra rank kutusu altın olur. Senin takımının satırı kulüp renklerinden parlak 4px şerit ve gradyan geçişi alır. Tablonun altına renk açıklaması (`.gleg`) eklendi.
- **Turnuva İstatistik › Podyum tasarımı:** Turnuva MVP'si, Gol Krallığı ve Asist Krallığı listelerinde lider oyuncu altın taç rozetli, kulüp armalı, sağda büyük parlak rakamlı "Lider Kartı" olarak gösterilir; 2. ve 3. sıralar gümüş ve bronz madalya rozeti alır (`.lead`, `.mdl`).
- **Hızlı skor panelinde Broadcast skor tabelası:** Armalar 36px'ten 48px'e çıktı, iki takımın renkleri ortada buluşan VS stadyum gradyanı ve "VS" etiketi eklendi. Skor artırıldığında skor kutusunun etrafında kısa bir altın "Gol Parlaması" halkası çalışır (azaltılmış hareket tercihine saygı gösterir).
- **Eleme ağacı:** Turu geçen takımın yanına altın ✓ rozeti, elenen takıma `opacity:.6` soluklaştırma, çift maçlı eşleşmelere "RÖVANŞLI" rozeti ve Final turuna altın çerçeveli "🏆 FİNAL" başlık şeridi eklendi.
- **Kupa dolabı müze vitrini:** Raf koyu cam/metalik vitrine çevrildi (metal raf çıtası), her kupanın arkasına yukarıdan vuran altın spot ışığı ve kupa silüeti üzerinde yavaşça kayan parlama (foil) efekti eklendi.
- Yeni dosya eklenmedi; `VER` 18.23, `package.json` 18.23.0, `sw.js` önbelleği `fc27-lig-v18-23`.

## v18.22 (Fikstür & Eleme Ağacı Maç Detayları, Özel FUT Kartlarının Temel Güce Çekilmesi, Maç Kartı Rakip MOTM ve Ölü Kod/CSS Temizliği)
- **Fikstür ve Eleme Ağacında simüle edilen maçların golcü, asist ve Maçın Adamı detayları (`simMetaLine`, `userMetaLine`, `.simdet`):**
  - `Turnuva › Fikstür` sekmesindeki tüm grup/lig maçlarının ve `Eleme Ağacı (Bracket)` eşleşmelerinin altında o maçta gol atan oyuncular, parantez içinde asist yapanlar, çift ayaklı turlarda 1. ve 2. maç skorları (`1.M / 2.M`) ve o maçın **Maçın Adamı (`★`)** kompakt bir bilgi satırı olarak gösterilir.
- **Paylaşılan Maç Kartı görselinde (`macCv`) rakip Maçın Adamı (`m.omom`) gösterimi:**
  - Kullanıcı kendi takımından MOTM seçmediğinde otomatik olarak rakipten seçilen Maçın Adamı (`m.omom`), artık paylaşılan PNG maç kartı görselinde de `★ Maçın Adamı (MOTM): Oyuncu (Rakip)` şeklinde yer alır.
- **Kadro veritabanında (`data.js`) şişirilmiş 4 özel FUT (Future Stars / TOTW) kartı gerçek temel gücüne çekildi:**
  - *Beşiktaş:* `I. Fakili` (84 Future Stars → 64 temel güç, Rezerv; yerine `F. Miretti` İlk 11'e alındı),
  - *Lombardia FC (Inter):* `Y. Bisseck` (85 Destined for Glory → 79 temel güç, Yedek; yerine `B. Pavard` İlk 11'e alındı),
  - *Sporting:* `F. Gonçalves` (84 Future Stars → 65 temel güç, Rezerv; yerine `Altimira` İlk 11'e alındı),
  - *Latium (Lazio):* `O. Provstgaard` (80 TOTW → 72 temel güç, Rezerv; yerine `J. Šutalo` İlk 11'e alındı).
- **Gruplar ekranına puan eşitliği (tie-breaker) bilgi notu eklendi:** Canlı puan tablosu aktifken üst bilgi satırında puan eşitliğinde sırasıyla genel averaj (`AV`), atılan gol (`AG`) ve takım gücünün baz alındığı belirtilir.
- **Ölü kod ve mükerrer CSS temizliği (`app.js`, `style.css`):**
  - Otomatik simülasyondan sonra atıl kalan manuel gruptan çıkan seçme (`st.gqm`, `gqm`, `gogqm`, `gqt`, `gqclr`), `matchCard` içindeki kullanılmayan sayfa içi (`sheet===false`) dalı, `statView` içindeki mükerrer `topScorersCard`, atıl `iosdismiss` ve `d.ts` dalları ile `style.css` içindeki mükerrer `.simm`, `.ball` ve `.qbdg.off` kuralları temizlendi.
- `VER` 18.22, `package.json` 18.22.0, `sw.js` önbelleği `fc27-lig-v18-22`.

## v18.21 (Turnuva MVP / Otomatik Maçın Adamı Seçimi ve Çift Devreli Rakip Sırası Düzeltmesi)
- **Simüle edilen maçlarda ve rakip takımlarda otomatik Maçın Adamı (`MA` / `MOTM`) seçimi (`pickSimMom`, `pickOppMom`):**
  - Simüle edilen tüm grup, lig ve eleme maçlarında maç içi skora en çok katkı veren (`3×gol + 2×asist`, eşitlikte galip takım / gol sayısı / oyuncu gücü; golsüz maçlarda kaleci) oyuncu otomatik olarak o maçın **Maçın Adamı (`MA`)** seçilir ve `Turnuva › İstatistik › Turnuva MVP'si` puanına (`+2p`) eklenir.
  - Kullanıcının kendi maçlarında, kullanıcı kendi takımından bir Maçın Adamı seçmezse (`Seçilmedi (Otomatik rakipten seçilir)`), rakip takımdan o maçta en çok katkı veren oyuncu (`m.omom`) otomatik olarak Maçın Adamı seçilir. Mevcut devam eden sezonlardaki geçmiş maçlar için de geriye dönük otomatik hesaplanır.
- **Çift maçlı (2 devreli) grup ve liglerde devre bazlı rakip sırası (`nextGrpOpp`):**
  - Çift maçlı (`c.gl === 2`) grup veya lig modunda bir takımla 1. maçı oynadıktan sonra hemen aynı takımla 2. maça geçmesi hatası düzeltildi. Artık önce gruptaki/ligdeki tüm takımlarla 1. devre maçları sırayla tamamlanır, ardından tekrar başa dönülerek 2. devre (rövanş) maçlarına geçilir (`matchCard`, `homeView` ve `fixtureView` birebir uyumlu).
- `VER` 18.21, `package.json` 18.21.0, `sw.js` önbelleği `fc27-lig-v18-21`.

## v18.20 (Aşama 3: Güvenli Yedek/Simülasyon Birleştirme, `remap` Asist Korunumu, Hızlı Skor Paneli DOM ve `Intl.Collator` Optimizasyonu)
- **`mergeSeasons` simülasyon (`s.sim`) ve manuel oyuncu baz puanları (`p.b`) birleştirmesi:** İki yedek birleştirilirken artık yalnızca son zaman damgalı sezonun simülasyonu veya oyuncu kaydı ezilmez; her iki yedekteki oynanmış grup haftaları (`sim.gm`), tamamlanmış eleme eşleşmeleri (`sim.ko`), budanmış gol/asist özetleri (`sim.sc`, `sim.as`), gruptan çıkanlar (`gqs`) ve oyunculara elle eklenen baz istatistikler (`p.b`) ile oyuncu puanları (`p.r`) kayıpsız birleştirilir, ardından `syncUserMatchesToBracket` ve `rebuildSimScorers` ile tam tutarlılık sağlanır.
- **`remap` asist verisi (`m[6], m[7]`) ve özet haritası korunumu:** Takım listesi geçişlerinde (`remap`) 8 elemanlı grup maç dizilerindeki asist indeksleri (`a[6], a[7]`) ile budanmış sezonlardaki `sim.sc` ve `sim.as` takım indisleri (`"Oyuncu|takımİndisi"`) korunarak yeni takım indislerine aktarılır.
- **Hızlı skor paneli (`#qs`) açıkken arka plan (`#app`) DOM çiziminin atlanması (`qsOnly`):** Maç giriş/düzenleme panelinde skor (`+`/`−`), golcü, asistçi, uzatma/penaltı veya gelişmiş istatistik girilirken arka plandaki ana görünümün (`#app`) gereksiz yere `innerHTML` ile baştan çizilmesi önlendi; yalnızca açık olan `#qs` paneli ve diyalog katmanı güncellenir.
- **`Intl.Collator("tr")` (`TR_CMP`) sıralama optimizasyonu:** Turnuva istatistikleri, gol krallığı, rakipler ve takım/ülke filtrelerindeki tekrarlı `localeCompare(..., "tr")` çağrıları tek bir önbellekli `Intl.Collator("tr").compare` (`TR_CMP`) fonksiyonuna geçirildi.
- `VER` 18.20, `package.json` 18.20.0, `sw.js` önbelleği `fc27-lig-v18-20`.

## v18.19 (Aşama 2: Çift Maçlı Eleme İstatistikleri, Asist/Golcü Senkronizasyonu ve Gol Krallığı Eşitlemesi)
- **Çift maçlı (2 ayaklı) eleme turlarında ayak bazlı golcü ve asist üretimi (`simOneKoTie`):** Çift maçlı eleme turlarında 1. ayak (`p.leg1`), 2. ayak (`p.leg2`) ve uzatma (`et`) golleri ile asistleri her ayak için ayrı ayrı üretilip birleştirilir; uzatmada atılan goller 2. ayak skoruna (`p.leg2`) da yansıtılır.
- **Kullanıcı eleme maçlarının eleme ağacına tam senkronizasyonu (`syncUserMatchesToBracket`):** Kullanıcının oynadığı tek veya çift ayaklı eleme maçlarındaki golcüler (`m.gls` / `m.sc`), asistçiler (`m.as`), rakip golcü/asistçileri (`m.og`) ile 1. ve 2. ayak skorları (`p.leg1`, `p.leg2`) eleme ağacı düğümüne (`p.s1, p.s2, p.a1, p.a2`) eksiksiz aktarılır.
- **`tourneyStats` içinde çift maçlı eleme turlarının 2 ayrı maç sayılması:** Yapay zekâ eleme eşleşmelerinde `p.leg1` ve `p.leg2` mevcutsa toplam skoru tek maç saymak yerine 1. Maç ve 2. Maç olarak ayrı ayrı işlenir. Böylece oynanan maç sayısı (`o`), maç başına yenilen gol ("En Az Gol Yiyen Takımlar"), galibiyet/mağlubiyet sayıları, en gollü/en farklı maç rekorları ve ayak bazlı hat-trick sayımları doğru hesaplanır.
- **`tourneyTopScorers` rakip golcü (`m.og`) eşitlemesi:** Kullanıcının maçlarında rakip takımın attığı goller (`m.og`) `İstat. › Turnuva Gol Krallığı` ve sezon sonu Gol Kralı (`topG`) hesabına da dahil edilerek `Turnuva › İstatistik` sekmesiyle birebir eşitlendi.
- `VER` 18.19, `package.json` 18.19.0, `sw.js` önbelleği `fc27-lig-v18-19`.

## v18.18 (Aşama 1: Kadro Veritabanı Klon/Transfer Temizliği)
- **Çift takımda unutulmuş 146 klon oyuncu temizlendi (`data.js`):** Transfer sonrası hem eski hem yeni kulübünde kayıtlı kalan 146 oyuncu (`fc27_players_database.csv` güncel EA ID referans alınarak) yalnızca güncel kulüplerinde bırakıldı ve eski kulüplerinden çıkarıldı (farklı kısa adla kalan *G. Martinelli / G. Silva*, *M. Casadó / M. Torras*, *N. González / N. Iglesias* vb. 14 oyuncu dahil).
- **Genç ve rezerv kadro derinliği korundu:** CSV dosyasında yer almayan düşük OVR'li genç ve rezerv (`R`) oyunculara dokunulmadı; eski kulübünden ayrılan İlk 11 (`S`) oyuncularının yerine aynı mevkiden en yüksek güçlü yedek oyuncular otomatik İlk 11'e (`S`) yükseltilerek 108 takımın tamamında 11 as oyuncu (1 GK + 10 saha oyuncusu) bütünlüğü korundu.
- `VER` 18.18, `package.json` 18.18.0, `sw.js` önbelleği `fc27-lig-v18-18`.

## v18.17 (Turnuva İstatistikleri + Rakip Golcü/Asistçileri)
- **Yeni sekme: Turnuva › İstatistik** (üst çubuk: Kura | Gruplar | Fikstür | İstatistik). İçerik: Turnuva MVP'si (puan = 3×gol + 2×asist + 2×maçın adamı), Gol Krallığı, **Asist Krallığı**, hat-trick yapanlar, en golcü / en az gol yiyen / en çok kazanan takımlar, turnuva özeti (maç, gol, ortalama, en farklı skor, en gollü maç). Gol Krallığı kartı Gruplar'dan buraya taşındı.
- **Simülasyona asist eklendi:** yapay zekâ maçlarında her gol için (≈%78 olasılıkla) golü atandan farklı, orta saha/forvet ağırlıklı bir asistçi seçilir. Eski haftalarda asist verisi yoktur; sayım bu sürümden sonraki maçlarla başlar.
- **Rakip golleri otomatik:** maç kaydederken rakip skoru girilince rakibin golcüleri ve asistçileri kadro gücü/mevkiine göre otomatik belirlenir (`m.og`). Rakip skoru sonradan değiştirilirse yalnızca fark kadar gol eklenir/çıkarılır. Eski kayıtlar etkilenmez.
- Geçmiş sezon budaması ve özet (`sim.sc`, yeni `sim.as`) asisti de kapsar. Depolama anahtarları değişmedi.
- `VER` 18.17, `package.json` 18.17.0, `sw.js` önbelleği `fc27-lig-v18-17`.

## v18.16 (Hata Düzeltmesi: Fikstür Rakip Tutarlılığı)
- **Fikstürde oynanmamış hafta maçlarında senin rakibin artık maç giriş ekranıyla aynı sırayla belirlenir** (sıradaki, lig/grup tur sayısını henüz doldurmamış grup rakibi). Önceden Fikstür dairesel çizelgeden farklı bir rakip gösteriyordu (örn. 5. hafta).
- Gruptaki diğer maçlar bu rakibe göre yeniden eşleştirilir; bir takım aynı haftada iki kez görünmez.
- `VER` 18.16, `package.json` 18.16.0, `sw.js` önbelleği `fc27-lig-v18-16`.

## v18.15 (Fikstür Geliştirmeleri)
- **Fikstür artık gerçek fikstür:** hafta seçici toplam hafta sayısı kadar sekme gösterir; oynanmamış maçlar «vs» ile listelenir (planlanan eşleşme), oynananlar skorla. Kart başlığında «oynanan/toplam» sayacı.
- **Takım adlarına dokununca kadro açılır** (`tinfo`).
- **Eleme ağacı Gruplar'dan Fikstür'e taşındı;** Gruplar'da, ağaç oluştuğunda «Eleme Ağacı ve Maç Girişi › Fikstür» düğmesi çıkar. Önceki sürümdeki tekrarlanan eleme sonuç kartları kaldırıldı.
- **Grup kartına «Hafta sonuçları ve fikstür ›» bağlantısı** eklendi.
- **Hafta çipleri tek satır, yatay kaydırmalı;** seçili hafta görünür alana kaydırılır. Uzun takım adları kesilir (ellipsis).
- **Alt menü «Kura» → «Turnuva»** (yeni simge); üst alt-sekme çubuğuna `aria-current` eklendi.
- Kullanılmayan CSS (`.wkbtn`, `.wkpop`, `.simwk`) temizlendi.
- `VER` 18.15, `package.json` 18.15.0, `sw.js` önbelleği `fc27-lig-v18-15`.

## v18.14 (Arayüz: Fikstür Sekmesi)
- **Kura › Gruplar üst çubuğuna üçüncü sekme eklendi: «Fikstür».** Çubuk artık Kura | Gruplar | Fikstür. Maç sonuçları buradan takip edilir: hafta seçiciyle (1. Hafta … Tümü) tüm grupların sonuçları, senin maçın ★ ile vurgulu, ayrıca oynanan eleme turu sonuçları.
- **Grup kartından «Hafta Sonuçları» bloğu kaldırıldı;** kartta yalnızca puan durumu tablosu kalır.
- `VER` 18.14, `package.json` 18.14.0, `sw.js` önbelleği `fc27-lig-v18-14`. Depolama anahtarları değişmedi.

## v18.13 (Arayüz: Maç Girişi Tek Noktada Toplandı)
- **Maç sonucu girişi yalnızca Kura › Gruplar ekranındaki Turnuva Simülasyon Merkezi'nde (ve eleme ağacı kartındaki rakip düğmesinde) kaldı.** Sıra sendeyken düğme altın renkli, daha büyük ve hafif parlayan (`.qgo`) bir düğmeye dönüştü; kart da altın çerçeveyle vurgulanır (`.needme`).
- **Kaldırılan giriş noktaları:** sağ alttaki yüzen **«+ Maç»** düğmesi (`#fab`), **İstat. › Maç günlüğü** içindeki «+ Maç sonucunu gir» düğmesi.
- **Sezon sekmesi:** ana düğme, «Eleme yolu» kartındaki giriş düğmeleri ve üstteki adım çubuğundaki **«4 Oyna»** adımı artık maç formunu açmak yerine **Kura › Gruplar** ekranına yönlendirir.
- Mevcut maçları düzenleme (✎) aynen çalışır.
- `VER` 18.13, `package.json` 18.13.0, `sw.js` önbelleği `fc27-lig-v18-13`.


## v18.12 (Hata Düzeltmesi: Grup Kartı `wk is not defined`)
- **Grup/lig kartı çökmesi giderildi (`grpCard`):** Puan tablosu başlığında tanımsız `wk` değişkeni kullanılıyordu (`ReferenceError: wk is not defined`); bu yüzden maç girildikten sonra Gruplar ekranı render edilemiyordu. Başlıktaki hafta bilgisi artık gerçekten hesaplanan `maxW` (oynanan hafta sayısı) değerinden gelir.
- `VER` 18.12, `package.json` 18.12.0, `sw.js` önbelleği `fc27-lig-v18-12`.


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
