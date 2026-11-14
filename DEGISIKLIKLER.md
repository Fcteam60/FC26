# FC26 Lig v17: değişiklik listesi

## Dağıtım
Bu klasördeki dosyaları GitHub Pages kök dizinindeki eskileriyle değiştir (index.html, sw.js, 4 PNG).
manifest.webmanifest ve _nojekyll değişmedi. tests/ klasörü yayına gerekmez, yerel kontrol içindir.
sw.js içindeki CACHE adı v17-0 olduğu için uygulama açılışta güncelleme banner'ı gösterir.
Sonraki her yayında CACHE adını bir artır (örn. v17-1).

## Düzeltmeler
1. xPts hızı: sonuçlar önbelleğe alınıyor, Poisson olasılıkları bir kez hesaplanıyor.
   İstatistik ekranı 500 maçta ~59 → ~7 ms, 2000 maçta ~173 → ~19 ms.
2. xPts doğruluğu: Poisson 16 gole uzatıldı, olasılıklar normalize ediliyor, xG tavanı 12 → 7.
   (Eski: xG 12-0 maçı için xPts 1,04 çıkıyordu.)
3. Service worker: kurulumda HTTP önbelleği atlanıyor (cache:"reload"), arka plan güncellemesi
   waitUntil içinde, gezinmede ?utm gibi sorgu dizeleri önbellek eşleşmesini bozmuyor.
4. Yedek birleştirme: birleşen sezonda oyuncu ve takım toplamları maçlardan yeniden hesaplanıyor.
   Önceki durum saklanamazsa mesaj artık bunu açıkça söylüyor. Diyalog, yerelde silinen maçın
   yedekte varsa geri geleceğini belirtiyor.
5. cleanStats yan etkisiz: cleanStatsW {s, warns} döndürür, uyarı yalnızca kayıt anında gösterilir.
6. Erişilebilirlik: klavye odak halkası (:focus-visible), 11 px metinler 12 px.
7. İkonlar PNG-8'e sıkıştırıldı: toplam ~1 MB → ~260 KB (görsel fark yok).
8. Testler: tests/run.js (37 test) ve tests/sw-test.js (11 test). Çalıştırma: node tests/run.js

## Bilinen sınırlar
- Birleştirme bir "birleşim"dir: yerelde sildiğin maç yedekte varsa geri gelir.
- Gerçek telefonda ve tarayıcıda denenmedi; testler Node içinde sahte DOM ile çalışır.
