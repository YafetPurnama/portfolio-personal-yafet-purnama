## Portfolio Yafet Purnama

Portfolio pribadi yang dibuat dengan React untuk menampilkan profil, proyek, keahlian, dan resume. Ringan, responsif, dan mudah dikustomisasi.

<div align="center">
  <img alt="Preview" src="./Images/readme-img1.png" />
  <br/>
</div>

---

### Demo

- My personal portfolio: <a href="" target="https://portfolio-yafetpurnama.vercel.app/">Link</a>

## Teknologi

- React 17 (Create React App)
- React Bootstrap 2 + CSS3
- React Router DOM 6
- React TSParticles
- React Icons
- React GitHub Calendar
- Typewriter Effect
- Vercel (deployment)

## Fitur

- Tata letak multi-halaman (Home, About, Projects, Resume)
- Tema modern, responsif untuk mobile/desktop
- Komponen mudah disesuaikan (React + Bootstrap)
- Siap deploy di Vercel (konfigurasi SPA sudah tersedia)

## Struktur Proyek (ringkas)

```
src/
  components/
    Home/, About/, Projects/, Resume/ ...
  Assets/              # Gambar & dokumen (CV, logo, dll.)
  context/ThemeContext.js
  translations/translations.js
```

## Mulai Cepat

Prasyarat: Node.js 16+ dan npm.

1. Install dependencies

```
npm install
```

2. Jalankan pengembangan

```
npm start
```

Lalu buka `http://localhost:3000`.

3. Build untuk produksi

```
npm run build
```

## Skrip NPM

- `start`: Menjalankan dev server CRA
- `dev`: Menjalankan dev server tanpa auto-open browser
- `build`: Build produksi
- `test`: Menjalankan pengujian

## Kustomisasi Konten

- Profil & hero: `src/components/Home/Home.js`
- Tentang saya: `src/components/About/About.js` dan `AboutCard.js`
- Proyek: `src/components/Projects/Projects.js` dan `ProjectCards.js`
- Resume: `src/components/Resume/ResumeNew.js` (file PDF ada di `src/Assets/`)
- Navigasi & footer: `src/components/Navbar.js`, `src/components/Footer.js`
- Tema/konteks: `src/context/ThemeContext.js`
- Terjemahan: `src/translations/translations.js`
- Aset: `src/Assets/` (gambar, ikon, PDF)

## Deploy ke Vercel

Konfigurasi SPA sudah disiapkan di `vercel.json`.

Langkah cepat:

1. Push ke repository GitHub/GitLab
2. Import project di Vercel
3. Build Command: `npm run build`
4. Output Directory: `build`

## Kredit

Proyek ini terinspirasi dan diadaptasi dari karya open-source milik Soumyajit (soumyajit4419). Terima kasih untuk fondasi proyek yang solid.

## Dukung

Jika suka proyek ini, silakan beri ⭐ dan bagikan. Terima kasih!
