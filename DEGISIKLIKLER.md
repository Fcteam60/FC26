# Değişiklik listesi

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
