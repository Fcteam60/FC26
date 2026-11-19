# FC 27 Grup Ligi — Kullanım Kılavuzu (v20.1)

FC 27 Grup Ligi; tamamen cihazında çalışan (sunucusuz, çevrimdışı uyumlu), kupa ve lig turnuvalarını takip etmeni sağlayan bir PWA uygulamasıdır.

---

## 1. Hızlı Başlangıç (5 Adım)
1. **Kurulum (`Sezon › Kurulum`):** Hazır şablonlardan (*Dünya Kupası, Klasik 64, Mini Lig, Direkt Eleme, Lig*) birini seç veya **Gelişmiş Kurallar** altından bölge, ülke, güç aralığı ve kura yöntemini özelleştirip onayla.
2. **Takım Seçimi (`Sezon › Takım`):** *Benim İçin Takım Seç* ile zorluk seviyesine göre rastgele kulüp çek (son 3 sezonda oynadığın takımlar tekrar gelmez) veya kulübünü kendin seç.
3. **Kura (`Turnuva › Kura`):** *Yeni kura hazırla* ile takımları torba torba çek veya *En dengeli kurayı otomatik kur* ile grupları tek dokunuşta oluştur.
4. **Oyna (`Turnuva › Gruplar`):** Sıradaki maçını **Maç Merkezi**nden gir, ardından diğer maçları **Haftayı Simüle Et** ile oynat.
5. **Bitir:** Tüm turlar tamamlandığında **Turnuvayı Sonlandır** ile şampiyonu, Turnuva MVP'sini ve 4-3-3 En İyi 11'ini arşive kaydet.

---

## 2. Simülasyon & Eleme Ağacı
* **3 Simülasyon Modu:** *Gerçekçi* (İlk 11 ortalaması, hücum yıldızları ve kaleci gücüne dayalı gerçekçi futbol skorları), *Dengeli* ve *Sürprizli*.
* **Geri Alma:** Yanlışlıkla simüle edilen son haftayı **↩ Geri Al** ile geri alabilirsin.
* **Otomatik Eleme Ağacı:** Grup aşaması bitince gerçek çapraz eşleşme mantığıyla eleme ağacı kurulur. Grupta veya ara turlarda elensen bile **Finale Kadar Simüle Et** ile turnuvanın şampiyonunu görebilirsin.
* **Ağaç / Liste Geçişi:** *Turnuva › Fikstür* altında bağlantı çizgili yatay **Ağaç Görünümü** veya gol/asist dökümlü **Detaylı Liste** arasında geçiş yapabilirsin.

---

## 3. Maç Girişi & Gelişmiş Analitik
* **Gol, Asist ve KK:** Kendi attığın her gol için golcüyü ve isteğe bağlı asistçiyi seçebilir, rakibin kendi kalesine golünü **KK** olarak işaretleyebilirsin.
* **Otomatik Maçın Adamı (MOTM):** Kendi takımından MOTM seçmezsen sistem rakipten en etkili oyuncuyu otomatik belirler.
* **5 Altın Veri (Opsiyonel):** Maç formundaki *Gelişmiş İstatistik Ekle* bölümünden **Topla Oynama, Toplam Şut, İsabetli Şut, Pas İsabeti ve xG** girerek şunları açabilirsin:
  * **xG & xPts Analizi:** Gol beklentisi, puan beklentisi, şut kalitesi, kaleci kurtarış oranı ve xG trendi.
  * **Hak Ediş:** Her maçın *Hak Edilmiş*, *Şanslı* veya *Şanssız* olarak sınıflandırılması.
  * **Taktiksel DNA & Menajer Kimliği:** 4 eksenli radar grafiği ve sezonlar arası gelişim karşılaştırması.

---

## 4. Paylaşılabilir PNG Posterler (6 Tür)
Uygulama 1080px+ yüksek çözünürlükte, paylaşmaya hazır 6 farklı Broadcast PNG posteri üretir:
* **Kura / Lig Tablosu:** `Turnuva › Gruplar`
* **Eleme Ağacı (Bracket):** `Turnuva › Fikstür › Eleme Ağacı`
* **Turnuvanın En İyi 11'i (TOTS):** `Turnuva › İstatistik` ve `Geçmiş › Sezonlar` arşivi
* **Maç Kartı:** `İstat. › Maçlar` (her maç kartının görsel simgesi)
* **Sezon Karnesi:** `Takımım › Sezonu Bitir` ve `Geçmiş › Sezonlar`
* **Kariyer Özeti:** `Geçmiş › Özet`

---

## 5. Kadro İnceleme, Oyuncu Profili & Arama
* **Kadro İnceleme:** Herhangi bir takım adına dokunarak İlk 11, yedekler, renkli mevki rozetleri ve o sezonki gol/asist/MOTM katkılarını inceleyebilirsin.
* **Oyuncu Profili:** *Sezon Ödülleri*, *Kariyer Yıldızları* ve *TOTS* kartlarında kendi oyuncularına dokunarak sezon ivmesi grafiği, en çok gol attığı rakipler ve asist partnerlerini görebilirsin.
* **Global Arama:** Sağ üstteki büyüteç simgesiyle 108 kulüp ve 3.200+ oyuncu arasında anında arama yapabilirsin.

---

## 6. Yedekleme & Telefon Kurulumu (PWA)
* **Ana Ekrana Ekleme:** iOS Safari'de *Paylaş › Ana Ekrana Ekle*, Android Chrome'da *Uygulamayı Yükle* seçeneğiyle tam ekran yerel uygulama gibi kullanabilirsin.
* **Hızlı Kısayollar:** Ana ekrandaki uygulama ikonuna uzun basarak *Maç Merkezi*, *İstatistikler* veya *Yeni Sezon* ekranına doğrudan geçebilirsin.
* **Yedekleme & Birleştirme:** Tüm kayıtların cihazındaki `IndexedDB` veritabanında saklanır. `Ayarlar › Yedeği İndir` ile düzenli JSON yedeği alabilir, başka bir cihazda *Birleştir* seçeneğiyle sezonlarını kayıpsız eşitleyebilirsin.
