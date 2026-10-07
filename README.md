# A Little Universe for Nadya ✦

Website ucapan ulang tahun ke-20 untuk **NADYA ULYA OCTAVIANISA**. Desain midnight blue / dusty rose, responsif untuk HP dan desktop. HTML, CSS, dan JavaScript tanpa dependency runtime.

## Fitur

- Bintang berkelip dan orbit dekoratif.
- Amplop interaktif dengan surat personal berbahasa Indonesia.
- Kue ilustrasi CSS: padamkan dan nyalakan kembali lilinnya.
- Confetti dan tombol perayaan ulang.
- Musik instrumental sintetis lembut, hanya diputar setelah tombol ditekan.
- Navigasi keyboard, dialog dengan Escape, dan dukungan prefers-reduced-motion.
- Tidak memerlukan API key, database, atau environment variable.

## Menjalankan di komputer

Gunakan Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Jalankan `npm run build` untuk menghasilkan folder `dist/`.

## Repository

https://github.com/fauzysan/Happy-birthday-Web

## Deploy ke Vercel

1. Masuk https://vercel.com/new.
2. Hubungkan akun GitHub, beri akses repository `Happy-birthday-Web`, lalu Import.
3. Root Directory: root repository (biarkan default).
4. Framework Preset: **Other**.
5. Build Command: **npm run build**.
6. Output Directory: **dist**.
7. Environment Variables: tidak diperlukan.
8. Klik Deploy, kemudian buka URL yang diberikan Vercel.

`vercel.json` sudah mendefinisikan build dan output directory. Commit selanjutnya akan memicu deployment otomatis setelah integrasi Git terhubung.

Alternatif dari folder proyek: `npx vercel` untuk preview, lalu `npx vercel --prod` untuk production (memerlukan login Vercel).

Referensi resmi:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/git
- https://vercel.com/docs/project-configuration/vercel-json

## Mengubah isi

| Perubahan | Lokasi |
| --- | --- |
| Nama, ucapan, surat, judul tab | `index.html` |
| Warna, ukuran, animasi, layout | `style.css` |
| Melodi, confetti, interaksi lilin | `app.js` |
| Ikon tab | `favicon.svg` |
| Build / deployment | `build.mjs`, `vercel.json` |

Google Fonts dimuat untuk Italiana dan DM Sans; jika akses font tidak tersedia, situs tetap memakai Georgia dan Arial. Musik dibuat dengan Web Audio API dan tidak membutuhkan file lagu. Usia ulang tahun: 20 tahun. Tanggal lahir, foto, dan identitas pengirim tidak diasumsikan.

