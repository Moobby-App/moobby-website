# Moobby Website

Landing page Moobby, aplikasi pendamping komuter KRL. Website ini memakai **Next.js 16 App Router, React 19, dan TypeScript**, dengan CSS responsif dan aset lokal.

## Menjalankan di lokal

Butuh Node.js 20.9 atau lebih baru dan npm. Dari folder proyek:

```sh
npm install
npm run dev
```

Buka **http://127.0.0.1:3000**. Tidak perlu login, API key, atau database. Biarkan Terminal terbuka; tekan **Control + C** untuk menghentikan server.

Jika port 3000 dipakai:

```sh
npm run dev -- --port 3001
```

Lalu buka http://127.0.0.1:3001.

## Build produksi dan pemeriksaan

```sh
npm run check
npm run build
npm run test:migration
```

`test:migration` memerlukan hasil build terbaru. Pemeriksaan memastikan anchor lama tetap tersedia, struktur konten penting tetap ada, serta aset yang dipindahkan identik dan dapat ditemukan. Ini tidak menggantikan pengujian interaksi atau tampilan di browser.

Untuk menjalankan hasil build:

```sh
npm start
```

Halaman utama dirender statis saat build. Deployment Next.js menggunakan `npm run build` dan `npm start`; folder `dist/` adalah versi lama, bukan hasil build Next.js.

## Struktur proyek

| Lokasi | Isi |
| --- | --- |
| `app/page.tsx` | Susunan bagian landing page |
| `app/layout.tsx` | Bahasa, metadata SEO, Open Graph, dan stylesheet |
| `app/globals.css` | Tampilan, responsivitas, dan reduced motion |
| `components/navigation.tsx` | Menu desktop/ponsel dan keyboard |
| `components/hero.tsx` | Video responsif, putar/jeda, dan suara |
| `components/intro.tsx` | Headline berganti |
| `components/stories.tsx` | Enam adegan dan navigasi hash |
| `components/travel-demo.tsx` | Dialog tiga kondisi perjalanan |
| `components/scenarios.tsx` | Kartu skenario dan kontrol jeda |
| `components/team.tsx` | Nama dan peran anggota tim |
| `components/scroll-effects.tsx` | Animasi kereta, kartu timeline, dan teks |
| `components/sections.tsx` | Bagian statis, FAQ native, dan footer |
| `lib/use-media-query.ts` | Preferensi media yang aman untuk server rendering |
| `public/assets/` | Video, poster, screenshot, ilustrasi, dan font |
| `dist/` | Cadangan website statis sebelum migrasi |

Interaksi memakai state React. Event listener, observer, timer, dan animation frame dibersihkan saat komponen dilepas agar tidak berlipat saat development/Fast Refresh. Transformasi dekoratif saat scroll diperbarui lewat requestAnimationFrame.

## Pemeriksaan manual sebelum rilis

- Desktop dan ponsel: video, putar/jeda, suara, serta perpindahan ukuran layar.
- Menu: buka/tutup, pilih tautan, klik di luar, dan Escape.
- Desktop: posisi kartu timeline dan perpindahan keenam adegan saat scroll.
- Ponsel: titik navigasi, tautan fitur, deep link, serta Back/Forward browser.
- Dialog: semua tombol pembuka, tiga kondisi, pilihan perjalanan, Escape, klik backdrop, dan fokus kembali ke pemicu.
- Jeda animasi skenario lewat keyboard dan sentuhan, label tim, dan FAQ.
- Layar sempit, zoom, serta reduced motion sejak awal maupun saat halaman terbuka.

Status dan waktu pada demo adalah cuplikan aplikasi, bukan data kondisi KRL terkini. Website tidak terhubung ke API perjalanan.

## Cadangan sebelum migrasi

Versi asli di `dist/` tidak diubah. Untuk membandingkan atau memakai versi lama sementara:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Buka http://127.0.0.1:8080. Perubahan di komponen Next.js tidak disalin ke cadangan ini.

## Aset

Video peron dan screenshot berasal dari materi proyek Moobby. Frame iPhone memakai PNG yang diberikan. Ilustrasi tim dibuat dengan ImageGen. Font Inter disertai [lisensi SIL Open Font License](public/assets/inter-OFL.txt).

Referensi framework: [instalasi Next.js](https://nextjs.org/docs/app/getting-started/installation).
