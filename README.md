# Moobby Website

Website branding Moobby untuk memperkenalkan aplikasi pendamping komuter KRL. Pesan utamanya adalah **lebih siap berangkat** dengan kabar gangguan terkurasi yang relevan dengan rute perjalanan.

## Menjalankan di lokal

Website ini memakai HTML, CSS, dan JavaScript statis. Jalankan dari direktori repo:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Buka `http://127.0.0.1:8080/` di browser. Untuk hosting statis, gunakan `dist/` sebagai direktori publik.

## Struktur proyek

| Lokasi | Isi |
| --- | --- |
| `dist/index.html` | Struktur halaman, copy branding, navigasi, FAQ, dan dialog kondisi perjalanan |
| `dist/site.css` | Tata letak responsif, palet biru, frame perangkat, ilustrasi tim, dan animasi |
| `dist/site.js` | Pemilihan video responsif, animasi scroll, pergantian adegan, dialog, dan interaksi tim |
| `dist/assets/` | Video KRL versi desktop dan ponsel, poster, layar Moobby, frame iPhone, ilustrasi, ikon aplikasi, dan font |
| `CHANGELOG.md` | Ringkasan urutan iterasi website |

## Bagian yang bisa ditinjau

| Bagian | Anchor | Perilaku |
| --- | --- | --- |
| Video pembuka | `#top` | Video peron KRL responsif dengan kontrol putar dan suara |
| Lebih siap berangkat | `#kenalan` | Headline berganti dan satu kereta melintas di belakang iPhone saat scroll |
| Fitur unggulan | `#overview-heading` | Lima ikon bulat dengan gradasi biru yang menaut ke fitur terkait |
| Timeline | `#timeline` | Enam kartu meluncur ke posisi masing-masing di layar iPhone pada desktop |
| Kondisi perjalanan | `#cerita` | Enam adegan aplikasi, berganti saat scroll di desktop atau lewat titik navigasi di ponsel |
| Fitur lanjutan | `#fitur` | Pratinjau layar dan tautan ke adegan terkait |
| Skenario | `#skenario` | Dua baris kapsul bertekstur yang bergerak berlawanan arah |
| Tim | `#tentang` | Lima ilustrasi. Nama dan peran muncul saat hover, fokus keyboard, atau ketuk |
| FAQ | `#faq` | Jawaban yang dapat dibuka dari tiap pertanyaan |

Tombol **Lihat kondisi perjalanan** membuka pilihan kondisi lancar, terlambat, dan terganggu. Status dan waktu yang tampil berasal dari cuplikan aplikasi Moobby. Data kondisi KRL terkini tersedia melalui aplikasi sesuai ketersediaan laporan.

## Aset

Video peron bersumber dari rekaman yang diberikan untuk proyek. Tampilan aplikasi memakai materi Moobby, termasuk screenshot Simulator dan cuplikan kondisi perjalanan. Frame iPhone berasal dari PNG yang diberikan. Ilustrasi tim merupakan karakter bergaya gouache yang dibuat dengan ImageGen. Font Inter disertai [lisensi SIL Open Font License](dist/assets/inter-OFL.txt).

## Pemeriksaan sebelum merilis perubahan

- Cek video dan tombol putar serta suara di desktop dan ponsel.
- Gulir bagian kereta dan timeline. Pastikan keenam kartu mendarat di posisi yang sesuai.
- Coba perpindahan adegan, tiga kondisi perjalanan, label tim, dan FAQ.
- Cek ulang layout pada layar sempit serta preferensi kurangi gerakan.
