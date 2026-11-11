"use client";

import { useState } from "react";
const rows = [
  [
    ["Sebelum berangkat", "Perjalanan lancar", "Cek status di rute tersimpan sebelum berangkat ke stasiun."],
    ["Perkiraan tiba", "Kereta terlambat", "Lihat titik keterlambatan dan pengaruhnya pada waktu tiba."],
    ["Kondisi jalur", "Gangguan persinyalan", "Baca lokasi dan dampak gangguan untuk menentukan langkah berikutnya."],
    ["Ubah rencana", "Moda alternatif", "Pertimbangkan moda lain kalau perjalanan perlu disesuaikan."],
  ],
  [
    ["Perjalanan harian", "Rute pergi dan pulang", "Simpan perjalanan harian agar kabar di rute itu mudah dicek."],
    ["Cari perjalanan", "Cari rute baru", "Pilih lokasi dan stasiun tujuan yang berbeda."],
    ["Titik berangkat", "Stasiun sekitar", "Temukan stasiun yang dekat dengan posisi kamu."],
    ["Urutan stasiun", "Timeline perjalanan", "Lihat di mana laporan gangguan muncul dalam urutan stasiunmu."],
  ],
];

export function Scenarios() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="scenarios" id="skenario" aria-labelledby="scenario-heading">
      <h2 className="section-heading" id="scenario-heading">berangkat sekarang<br /><strong>atau ubah rencana?</strong></h2>
      <button type="button" className="ticker-toggle" aria-pressed={paused} aria-controls="scenario-rows" onClick={() => setPaused(!paused)}>
        {paused ? "Putar animasi skenario" : "Jeda animasi skenario"}
      </button>
      <div id="scenario-rows" className={`scenario-rows${paused ? " is-paused" : ""}`}>
        {rows.map((row, i) => <div className="ticker" key={i}><div className="ticker-track">
          {[false, true].map(duplicate => <div className="ticker-group" key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
            {row.map(([label, title, copy]) => <article className="scenario-card" key={title}>
              <span className="scenario-kicker">{label}</span><b>{title}</b><p>{copy}</p>
            </article>)}
          </div>)}
        </div></div>)}
      </div>
    </section>
  );
}
