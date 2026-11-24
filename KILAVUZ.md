# FC 27 Grup Ligi — Kullanım Kılavuzu (v23.6)

FC 27 Grup Ligi; çevrimdışı çalışabilen (PWA), kupa ve lig turnuvalarını takip etmeni ve arkadaşlarınla canlı kariyer düellosu yapmanı sağlayan kapsamlı bir futbol takip uygulamasıdır.

---

## 1. Hızlı Başlangıç (5 Adım)
1. **Kurulum (`Sezon › Kurulum`):** Hazır şablonlardan (*Dünya Kupası, Klasik 64, Mini Lig, Direkt Eleme, Lig, Şampiyonlar Ligi 36 Takım*) birini seç veya **Gelişmiş Kurallar** altından bölge, açılır **Ülke Filtresi**, güç aralığı ve kura yöntemini özelleştirip onayla.
2. **Takım Seçimi (`Sezon › Takım`):** *Benim İçin Takım Seç* ile obsidiyen slot çekilişi üzerinden zorluk seviyesine göre rastgele kulüp çek (son 3 sezonda oynadığın takımlar tekrar gelmez) veya kulübünü kendin seç.
3. **Kura (`Turnuva › Kura`):** *Yeni kura hazırla* ile takımları torba torba çek veya *En dengeli kurayı otomatik kur* ile grupları tek dokunuşta oluştur.
4. **Oyna (`Turnuva › Gruplar`):** Sıradaki maçını **Maç Merkezi**nden gir, ardından diğer maçları **Haftayı Simüle Et** ile oynat.
5. **Bitir:** Tüm turlar tamamlandığında **Turnuvayı Sonlandır** ile şampiyonu, Turnuva MVP'sini ve 4-3-3 En İyi 11'ini arşive kaydet.

---

## 2. Simülasyon & Eleme Ağacı
* **3 Simülasyon Modu:** *Gerçekçi* (İlk 11 ortalaması, hücum yıldızları ve kaleci gücüne dayalı futbol skorları), *Dengeli* ve *Sürprizli*.
* **Geri Alma:** Yanlışlıkla simüle edilen son haftayı **↩ Geri Al** ile geri alabilirsin.
* **Otomatik Eleme Ağacı:** Grup aşaması bitince gerçek çapraz eşleşme mantığıyla eleme ağacı kurulur. Grupta veya ara turlarda elensen bile **Finale Kadar Simüle Et** ile turnuvanın şampiyonunu görebilirsin.
* **Ağaç / Liste Geçişi:** *Turnuva › Fikstür* altında bağlantı çizgili yatay **Ağaç Görünümü** veya gol/asist dökümlü **Detaylı Liste** arasında geçiş yapabilirsin.

---

## 3. Maç Girişi & Gelişmiş Analitik
* **Gol, Asist ve KK:** Kendi attığın her gol için golcüyü ve isteğe bağlı asistçiyi seçebilir, rakibin kendi kalesine golünü **KK** olarak işaretleyebilirsin.
* **Otomatik Maçın Adamı (MOTM):** Kendi takımından MOTM seçmezsen sistem rakipten en etkili oyuncuyu otomatik belirler (`Otomatik (Rakip)`).
* **5 Altın Veri (Opsiyonel):** Maç formundaki *Gelişmiş İstatistik Ekle* bölümünden **Topla Oynama, Toplam Şut, İsabetli Şut, Pas İsabeti ve xG** girerek şunları açabilirsin:
  * **xG & xPts Analizi:** Gol beklentisi, puan beklentisi, şut kalitesi, kaleci kurtarış oranı ve xG trendi.
  * **Hak Ediş:** Her maçın *Hak Edilmiş*, *Şanslı* veya *Şanssız* olarak sınıflandırılması.
  * **Taktiksel DNA & Menajer Kimliği:** 4 eksenli radar grafiği ve sezonlar arası gelişim karşılaştırması.

---

## 4. Canlı Menajer Düellosu (VS)
* **Ortak Oda:** `Geçmiş › Düello` ekranında arkadaşınla aynı 6+ karakterli oda kodunu gir. Maç kaydettikçe son 100 sezonunu içeren hafif özetin arka planda otomatik eşitlenir; ana kayıtların telefonunda kalır.
* **4 Sekmeli Düello Stüdyosu:**
  * **Genel:** Tek kaynaklı **10 kriterli** kariyer & kupa karnesi (*Ort. Takım GEN* nötr bağlam satırıdır, puan eklemez), **Son Dönem Formu** (son 5 sezon P/M trend grafiği), kariyer yıldızları ve canlı sezon nabzı.
  * **Sezonlar:** Kendi istediğin sezonu arkadaşının istediğin sezonuyla (*Maç Başı Averaj*, xG, Beklenti Üstü ve Sezon Yıldızı dahil) yan yana çarpıştır.
  * **Takımlar:** Adil Güç Endeksi, **GEN Kademeleri** (*Elit Devler 83+ · Güçlü Kadrolar 79–82 · Orta & Sürpriz ≤78*), **Ortak Alınan Kulüpler** ve özel **Kulüp vs. Kulüp** düellosu.
  * **DNA & xG:** Çift renkli Taktiksel DNA radar laboratuvarı ve gelişmiş xG/bitiricilik/kaleci telemetrisi.
* **Canlı Sezon İnceleme:** Arkadaşının aktif sezonundaki puan durumunu, oynadığı ve kalan maçlarını, eleme eşleşmelerini ve sezon DNA'sını tek dokunuşla aç.
* **Çevrimdışı Yedek:** Oda kullanmadan tek seferlik **Manuel Kıyas Kodu** ile çevrimdışı karşılaştırma yapabilirsin.

---

## 5. Paylaşılabilir PNG Posterler (9 Tür)
Uygulama 1080px+ yüksek çözünürlükte, gerçek kulüp armalı 9 farklı Broadcast PNG posteri üretir:
* **Kura / Canlı Puan Durumu:** `Turnuva › Gruplar` (maçlar oynandıkça canlı sıralamayı, O/G/B/M/AV/P ve eleme çizgisini çizer)
* **Eleme Ağacı (Bracket):** `Turnuva › Fikstür › Eleme Ağacı`
* **Turnuvanın En İyi 11'i (TOTS):** `Turnuva › İstatistik` ve `Geçmiş › Sezonlar` arşivi
* **Maç Kartı:** `İstat. › Maçlar` (her maç kartının görsel simgesi)
* **Sezon Karnesi:** `Takımım › Sezonu Bitir` ve `Geçmiş › Sezonlar`
* **Kariyer Özeti:** `Geçmiş › Özet`
* **1v1 Menajer Düellosu Posteri:** `Geçmiş › Düello` ana sahnesi
* **Sezon vs. Sezon Posteri:** `Geçmiş › Düello › Sezonlar`
* **Kulüp vs. Kulüp Posteri:** `Geçmiş › Düello › Takımlar`

---

## 6. Kadro İnceleme, Oyuncu Profili & Arama
* **İlk 11 Saha & Kadro:** Herhangi bir takım adına dokunarak İlk 11 saha dizilişini, yedekleri, renkli mevki rozetlerini ve o sezonki gol/asist/MOTM katkılarını inceleyebilirsin.
* **Oyuncu Profili:** *Sezon Ödülleri*, *Kariyer Yıldızları* ve *TOTS* kartlarında kendi oyuncularına dokunarak sezon ivmesi grafiği, en çok gol attığı rakipler ve asist partnerlerini görebilirsin.
* **Turnuva Evreni Tarihi:** `Geçmiş › Evren` sekmesinden tüm sezonların şampiyonlarını (Sen + Yapay Zekâ), en çok final kaybeden lanetli kulüpleri, TOTS efsanelerini ve sezon kronolojisini inceleyebilirsin.
* **Renk Paletleri:** `Ayarlar › Görünüm ve Deneyim` altından 5 küratörlü stadyum paleti (*Zümrüt Saha, Şampiyonlar Gecesi, Kraliyet Altını, Kızıl Arena, Kulübümün Rengi*) seçebilirsin.
* **Global Arama:** Sağ üstteki büyüteç simgesiyle 108 kulüp ve 3.200+ oyuncu arasında anında arama yapabilirsin.

---

## 7. Yedekleme & Telefon Kurulumu (PWA)
* **Ana Ekrana Ekleme:** iOS Safari'de *Paylaş › Ana Ekrana Ekle*, Android Chrome'da *Uygulamayı Yükle* seçeneğiyle tam ekran yerel uygulama deneyimi ve iOS 7 günlük veri silinmesine karşı koruma sağla.
* **Hızlı Kısayollar:** Ana ekrandaki uygulama ikonuna uzun basarak *Maç Merkezi*, *İstatistikler* veya *Yeni Sezon* ekranına doğrudan geçebilirsin.
* **Yedekleme & Birleştirme:** Tüm kayıtların cihazındaki `IndexedDB` veritabanında saklanır. `Ayarlar › Yedeği İndir` ile düzenli JSON yedeği alabilir, başka bir cihazda *Birleştir* seçeneğiyle sezonlarını kayıpsız eşitleyebilirsin.
