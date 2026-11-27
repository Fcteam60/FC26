# FC 27 Grup Ligi — Kullanım Kılavuzu (v26.4)

FC 27 Grup Ligi; 108 kulüplü güncel kadro veritabanı, çevrimdışı PWA desteği, 3 hazır Avrupa kupası atmosferi, 2 Kişilik Ortak Turnuva (2P) ve Canlı Menajer Düellosu (VS) sunan futbol turnuva takip uygulamasıdır.

---

## 1. Hızlı Başlangıç (5 Adım)
1. **Kurulum (`Sezon › Kurulum`):** **Hazır Kupa Şablonları**ndan (*Konferans Ligi*, *Avrupa Ligi*, *Şampiyonlar Ligi*) ya da klasik formatlardan (*Dünya Kupası, Klasik 64, Mini Lig, Direkt Eleme, Puan Ligi*) birini seç; istersen **Güç ve Ülke Sınırları**ndan GEN aralığı, bölge ve ülke limitlerini ayarla.
2. **Takım Seçimi (`Sezon › Takım`):** *Benim İçin Takım Seç* ile slot çekilişi yap (son 9 takımın tekrar gelmez) veya 108 kulüp arasından takımını kendin seç.
3. **Kura (`Turnuva › Kura`):** Torba torba çekiliş yap veya *En dengeli kurayı otomatik kur* ile grupları tek dokunuşta oluştur.
4. **Oyna (`Turnuva › Gruplar` / `Maç Merkezi`):** Kendi maçını gir, ardından diğer maçları **Haftayı Simüle Et** ile oynat.
5. **Bitir:** Tüm turlar bitince **Turnuvayı Sonlandır** ile şampiyonu, Gol Kralı’nı, MVP’yi ve 4-3-3 En İyi 11’i arşive ekle.

---

## 2. Hazır Kupa Şablonları & Dinamik Turnuva Arka Planı
* **Konferans Ligi (UECL):** 32T · 4×8 grup · İlk 4 · `≤76 GEN` · Zümrüt arka plan & koyu cam atmosferi.
* **Avrupa Ligi (UEL):** 32T · 4×8 grup · İlk 4 · `75–78 GEN` · Amber-turuncu arka plan & koyu cam atmosferi.
* **Şampiyonlar Ligi (UCL):** 36T İsviçre · 8 maç + Play-Off · `77+ GEN` · Buz mavisi arka plan & koyu cam atmosferi.
* Bu şablonlardan biri aktifken yüksek okunurluk için koyu buzlu cam devreye girer; diğer formatlara geçince kişisel teman geri döner. İstersen **Ayarlar › Görünüm ve Deneyim › Turnuva Arka Planı** üzerinden tek dokunuşla kapatıp açabilirsin.

---

## 3. Maç Girişi & Otomatik Maçın Adamı (MOTM)
* **Gol & Asist:** Her gol için oyuncuyu kadrodan seç (kendi kalesine için `KK` veya kadro dışı oyuncu için `+ Başka`).
* **Otomatik MOTM:** Maçın Adamı seçiminde **`Otomatik`** bırakıldığında maç sonucuna, gol/asist katkılarına ve takım performansına göre hem kendi takımından hem rakipten en yüksek etkiyi yapan oyuncu otomatik belirlenir; dilersen kendi takımından bir oyuncuyu elle seçebilirsin.
* **Eleme Kuralları:** Tek veya çift maçlı elemelerde toplam skor eşitse **Penaltılar (P)** girişi otomatik açılır.

---

## 4. 2 Kişilik Ortak Turnuva (2P)
* Üst çubuktaki **2P** düğmesiyle arkadaşınla aynı turnuvada yarış.
* **Son Odalar:** Katıldığın veya kurduğun son 5 ortak oda lobide saklanır; oda kodunu yeniden yazmadan tek dokunuşla geri bağlanabilirsin.
* **Sezon Adı Düzenleme:** Kurucu, üstteki oda koduna dokunup **Sezon Adını Düzenle** seçeneğiyle ortak turnuvaya özel ad verebilir (*Şampiyonlar Ligi 2026* vb.).
* **Doğrudan Karşılaşmalar:** İki oyuncunun birbirine denk geldiği maçları Kurucu girer; skorlar, golcüler ve asistler her iki menajerin ekranına otomatik işlenir.

---

## 5. Turnuva Evreni, Analitik & 11 Broadcast Poster
* **Katlanabilir Uzun Listeler:** *Beklenene Göre Performans*, *TOTS Efsaneleri*, *Evrenin Devleri*, *Lanetli Finalistler*, *Şampiyonluk Kronolojisi*, *Sezonlar* ve *Rakiplerim* kompakt açılır; tek dokunuşla tüm sezonlar genişletilir.
* **Gol Krallığı & MVP Onur Listesi:** 2’li sekme geçişiyle görüntülenir; bir oyuncuya dokunduğunda doğrudan oyuncu profil kartı açılır.
* **11 Poster Türü:** Kura, Grup/Lig Tablosu, Eleme Ağacı, Maç Kartı, 2 Sayfalık Sezon Karnesi, Kariyer Özeti, Turnuvanın En İyi 11’i (TOTS), Menajer Düellosu ve 2P Ortak Turnuva posterleri (Tablo, Karne, Maç, Kupa Geçmişi) 1080px+ PNG olarak indirilebilir veya paylaşılabilir.

---

## 6. Yedekleme & Kurtarma
* Tüm bireysel veriler cihazındaki **IndexedDB** içinde saklanır. **Ayarlar › Yedekleme** üzerinden sezon sonlarında `.json` yedeği alman önerilir; kritik işlemler öncesi alınan son 5 otomatik kopyaya **Ayarlar › Sistem & Tanılama** içinden ulaşabilirsin.
