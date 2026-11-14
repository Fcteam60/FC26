# Değişiklik listesi

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
