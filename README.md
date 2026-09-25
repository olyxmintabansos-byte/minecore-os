# MineCore OS (Titan #19)
### Heavy Open-Pit Fleet Dispatch, 60 FPS Pit Elevation Canvas, Stockpile Ore Blending & Minerba ESDM COA ERP

![MineCore Architecture](https://img.shields.io/badge/Architecture-Client--Side%20Local--First-amber?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-ESDM%20Minerba%20%26%20Sucofindo%20COA-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)

---

## 🌐 Live Production Deployments
- **Open-Pit Fleet Dispatch HUD:** [https://olyxmintabansos-byte.github.io/minecore-os/](https://olyxmintabansos-byte.github.io/minecore-os/)
- **Stockpile Dome & Ore Blending Desk:** [https://olyxmintabansos-byte.github.io/minecore-os/stockpile/](https://olyxmintabansos-byte.github.io/minecore-os/stockpile/)
- **Drill & Blast Engineering Studio:** [https://olyxmintabansos-byte.github.io/minecore-os/blast/](https://olyxmintabansos-byte.github.io/minecore-os/blast/)
- **Minerba ESDM Official COA A4 Studio:** [https://olyxmintabansos-byte.github.io/minecore-os/assay/](https://olyxmintabansos-byte.github.io/minecore-os/assay/)

---

## 📐 Arsitektur & Fitur Utama

1. **Open-Pit Fleet Dispatch HUD (`/`)**:
   - Pemantauan telemetri 8 unit truk pengangkut kelas berat *Ultra-Class* (Komatsu 930E-5 kapasitas 320 ton dan CAT 797F kapasitas 360 ton).
   - Pengaturan tujuan penumpahan (*Dump Destination*): Primary Gyratory Crusher, High-Grade Dome A, Medium-Grade Dome B, atau Overburden Waste Dump.
   - Layar profil kontur elevasi tambang berkecepatan **60 FPS** berbasis HTML5 Canvas yang menampilkan pergerakan truk menaiki jalan angkut (*haul ramp* gradien 8.2%) dari dasar pit (-120m RL) ke permukaan (+85m RL).
   - Tombol penanganan darurat cuaca ekstrem (*Muster Emergency Halt*) untuk peringatan bahaya petir.

2. **Stockpile Dome & Ore Blending Desk (`/stockpile/`)**:
   - Pemantauan 4 kubah stockpile hasil survei fotogrametri/LiDAR: volume kubik ($m^3$), densitas curah (*bulk density*), dan total tonase.
   - Solver pencampuran bijih nikel (*RKEF Smelter Feed Solver*) dengan slider interaktif untuk memenuhi spesifikasi tungku smelter: kadar nikel $1.75\\% \\pm 0.05\\%$, kadar besi $Fe < 20\\%$, dan rasio silika-magnesia $SiO_2/MgO$ pada rentang ideal $1.85 - 2.10$.

3. **Drill & Blast Engineering Studio (`/blast/`)**:
   - Pola pemboran dan peledakan batuan *staggered* 24 lubang ledak (Burden 4.5m, Spacing 5.5m, Kedalaman 11.5m, Isian 148 kg Bulk Emulsion).
   - Kalkulator *Powder Factor* (0.44 kg/BCM) dan simulasi perambatan gelombang getaran tanah (*Peak Particle Velocity* - PPV 2.84 mm/s) sesuai Kepmen ESDM No. 1827 K/30/MEM/2018.

4. **Minerba ESDM Official COA A4 Studio (`/assay/`)**:
   - Format cetak A4 presisi untuk Sertifikat Analisis Kualitas (*Certificate of Sampling and Analysis* - COA) dari surveyor independen terakreditasi KAN (Sucofindo / Carsurin).
   - Perhitungan konversi tonase basah (*Wet Metric Tons* - WMT) ke tonase kering (*Dry Metric Tons* - DMT) berdasarkan kadar air (*Moisture Content* - MC).
   - Kalkulasi nilai kargo bijih nikel menggunakan acuan Harga Patokan Mineral (HPM) ESDM serta tagihan royalti PNBP 10% resmi.
   - Tiga blok tanda tangan resmi: Surveyor Independen Sucofindo, Kepala Teknik Tambang (KTT), dan Perwakilan Smelter RKEF.

---

## 🛠️ Stack Teknologi
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
- **State & Storage:** React Context + LocalStorage Persistence
- **Graphics & FX:** HTML5 Canvas (60 FPS Telemetry) + Canvas-Confetti
- **Iconography:** Lucide React
- **Static Export:** GitHub Pages (`output: 'export'`, `trailingSlash: true`, `.nojekyll`)
