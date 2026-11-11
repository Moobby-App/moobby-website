import type { CSSProperties } from "react";

export function Overview() {
  return (
    <section className="overview" aria-labelledby="overview-heading">
      <h2 className="section-heading" id="overview-heading">cepat tahu kabarnya,<br /><strong>lebih siap berangkat</strong></h2>
      <div className="overview-links" aria-label="Fitur Moobby">
        <a className="overview-link" href="#timeline">
          <span className="overview-orb" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M15 13h28a5 5 0 0 1 5 5v26a7 7 0 0 1-7 7H17a7 7 0 0 1-7-7V18a5 5 0 0 1 5-5Z"/><path className="orb-cut" d="M19 23h19M19 31h19M19 39h12"/></svg></span>
          <span><strong>kabar</strong><br />gangguan</span>
        </a>
        <a className="overview-link" href="#gangguan">
          <span className="overview-orb" aria-hidden="true"><svg viewBox="0 0 64 64"><path className="orb-line" d="M17 49V21a6 6 0 0 1 6-6h17m-23 19h19"/><circle cx="17" cy="48" r="7"/><circle cx="41" cy="15" r="7"/><circle cx="41" cy="34" r="7"/></svg></span>
          <span><strong>sesuai</strong><br />rutemu</span>
        </a>
        <a className="overview-link" href="#detail">
          <span className="overview-orb" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M27 12a6 6 0 0 1 10 0l18 31a6 6 0 0 1-5 9H14a6 6 0 0 1-5-9l18-31Z"/><path className="orb-cut" d="M32 23v11m0 7h.01"/></svg></span>
          <span><strong>dampak</strong><br />perjalanan</span>
        </a>
        <a className="overview-link" href="#simpan">
          <span className="overview-orb" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M19 11h26a4 4 0 0 1 4 4v36a3 3 0 0 1-5 2l-12-8-12 8a3 3 0 0 1-5-2V15a4 4 0 0 1 4-4Z"/><path className="orb-cut" d="m25 28 5 5 9-10"/></svg></span>
          <span><strong>rute</strong><br />tersimpan</span>
        </a>
        <a className="overview-link" href="#demo" aria-haspopup="dialog">
          <span className="overview-orb" aria-hidden="true"><svg viewBox="0 0 64 64"><path className="orb-line" d="M12 45h8a12 12 0 0 0 12-12V27a10 10 0 0 1 10-10h9m-7-7 7 7-7 7M32 33a12 12 0 0 0 12 12h7m-7-7 7 7-7 7"/></svg></span>
          <span><strong>pilihan</strong><br />moda</span>
        </a>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section className="timeline" id="timeline" aria-labelledby="timeline-heading">
      <h2 className="section-heading" id="timeline-heading">kabar yang penting,<br /><strong>tepat di rutemu</strong></h2>
      <div className="timeline-stage">
        <div className="timeline-sticky">
          <div className="iphone timeline-phone">
            <div className="iphone-screen">
              <div className="app-screen screen-clear" role="img" aria-label="Timeline perjalanan Cisauk ke Kebayoran"></div>
            </div>
          </div>
          <div className="flight-deck" aria-hidden="true">
            <div className="flight-slot slot-route" style={{"--slot-x": "4.9751%", "--slot-y": "12.4424%", "--slot-w": "47.0149%", "--slot-h": "3.8018%", "--direction": "-1", "--drift": "-90"} as CSSProperties}>
              <svg className="flight-card" viewBox="40 216 378 66" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
            <div className="flight-slot slot-status" style={{"--slot-x": "0.0000%", "--slot-y": "25.8065%", "--slot-w": "100.0000%", "--slot-h": "8.0645%", "--direction": "1", "--drift": "-64"} as CSSProperties}>
              <svg className="flight-card" viewBox="0 448 804 140" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
            <div className="flight-slot slot-service" style={{"--slot-x": "5.0995%", "--slot-y": "35.8871%", "--slot-w": "90.5473%", "--slot-h": "4.8387%", "--direction": "-1", "--drift": "-12"} as CSSProperties}>
              <svg className="flight-card" viewBox="41 623 728 84" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
            <div className="flight-slot slot-earlier" style={{"--slot-x": "30.0995%", "--slot-y": "57.4885%", "--slot-w": "65.6716%", "--slot-h": "3.2258%", "--direction": "1", "--drift": "26"} as CSSProperties}>
              <svg className="flight-card" viewBox="242 998 528 56" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
            <div className="flight-slot slot-station" style={{"--slot-x": "5.4726%", "--slot-y": "63.1912%", "--slot-w": "90.2985%", "--slot-h": "3.1682%", "--direction": "-1", "--drift": "60"} as CSSProperties}>
              <svg className="flight-card" viewBox="44 1097 726 55" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
            <div className="flight-slot slot-station" style={{"--slot-x": "22.8856%", "--slot-y": "69.7005%", "--slot-w": "72.8856%", "--slot-h": "3.1682%", "--direction": "1", "--drift": "95"} as CSSProperties}>
              <svg className="flight-card" viewBox="184 1210 586 55" preserveAspectRatio="none" aria-hidden="true">
                <image href="/assets/kondisi-moobby.png" width="4980" height="1736"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="features" id="fitur" aria-labelledby="features-heading">
      <h2 className="section-heading" id="features-heading">dari kabar gangguan<br /><strong>ke keputusan berangkat</strong></h2>
      <div className="feature-grid">
        <a href="#adegan-timeline"><div className="iphone feature-phone"><div className="iphone-screen"><div className="app-screen screen-clear" aria-hidden="true"></div></div></div><span>status rutemu ↗</span></a>
        <a href="#simpan"><div className="iphone feature-phone"><div className="iphone-screen"><img src="/assets/search.png" alt="" loading="lazy" /></div></div><span>cari rute ↗</span></a>
        <a href="#gangguan"><div className="iphone feature-phone"><div className="iphone-screen"><div className="app-screen screen-delay" aria-hidden="true"></div></div></div><span>dampak keterlambatan ↗</span></a>
        <a href="#perjalanan-terhenti"><div className="iphone feature-phone"><div className="iphone-screen"><div className="app-screen screen-stop" aria-hidden="true"></div></div></div><span>perjalanan terhenti ↗</span></a>
        <a href="#detail"><div className="iphone feature-phone"><div className="iphone-screen"><div className="app-screen screen-expanded" aria-hidden="true"></div></div></div><span>detail gangguan ↗</span></a>
      </div>
    </section>
  );
}

export function Commute() {
  return (
    <section className="commute" aria-label="Konteks perjalanan">
      <h2 className="section-heading">cek sebelum keluar,<br /><strong>sesuaikan bila perlu</strong></h2>
      <span className="commute-badge badge-one">🚉 &nbsp; Green Line</span>
      <span className="commute-badge badge-two">⌖ &nbsp; Cisauk</span>
      <span className="commute-badge badge-three">◎ &nbsp; Kebayoran</span>
      <span className="commute-badge badge-four">↔ &nbsp; Pergi &amp; pulang</span>
    </section>
  );
}

export function WordStory() {
  return (
    <section className="word-story" aria-label="Ringkasan alur perjalanan">
      <div className="word-sticky">
        <p>cek kabar KRL <img src="/assets/app-icon.png" alt="" /> lihat yang relevan</p>
        <p>lihat lokasi gangguan <img src="/assets/app-icon.png" alt="" /> pahami dampaknya</p>
        <p>pilih langkah berikutnya <img src="/assets/app-icon.png" alt="" /> berangkat lebih siap</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq" id="faq">
      <h2 className="section-heading">yang sering<br /><strong>ditanyakan</strong></h2>
      <div className="questions">
        <details><summary>Apa itu Moobby?</summary><p>Moobby membantu kamu siap berangkat dengan menampilkan kabar gangguan KRL yang berkaitan dengan rutemu. Kamu bisa melihat dampaknya di timeline stasiun dan mempertimbangkan pilihan perjalanan.</p></details>
        <details><summary>Apa maksud kabar gangguan terkurasi?</summary><p>Kabar ditampilkan berdasarkan jalur dan stasiun yang berkaitan dengan perjalananmu. Detail laporan membantu kamu memahami lokasi gangguan dan dampaknya pada rute.</p></details>
        <details><summary>Di mana saya bisa mengecek kondisi KRL terkini?</summary><p>Buka Moobby untuk mengecek kondisi perjalanan. Status dan waktu di halaman ini berasal dari cuplikan tampilan aplikasi.</p></details>
        <details><summary>Apakah saya perlu mengaktifkan lokasi?</summary><p>Kamu bisa memilih stasiun secara manual. Izin lokasi membantu Moobby mengenali stasiun di sekitarmu.</p></details>
        <details><summary>Bagaimana jika ada gangguan di rute saya?</summary><p>Buka detail gangguan untuk melihat dampaknya pada perjalanan dan mempertimbangkan opsi perjalanan lain.</p></details>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final">
      <h2 className="section-heading">cek kabarnya dulu,<br /><strong>berangkat lebih siap</strong></h2>
      <div className="final-decoration" aria-hidden="true"><span>✦</span><span>✧</span><img src="/assets/app-icon.png" width="128" height="128" alt="" /><span>✦</span><span>✧</span></div>
      <a className="pill" href="#demo" aria-haspopup="dialog">Lihat kondisi perjalanan</a>
    </section>
  );
}

export function Footer() {
  return (
  <footer>
    <div className="footer-brand"><a className="brand" href="#top"><img src="/assets/app-icon.png" width="40" height="40" alt="" />Moobby</a><p>Kabar KRL yang relevan sebelum kamu berangkat.</p></div>
    <div><h3>fitur</h3><a href="#timeline">Timeline</a><a href="#gangguan">Gangguan</a><a href="#perjalanan-terhenti">Perjalanan terhenti</a></div>
    <div><h3>jelajahi</h3><a href="#demo">Tampilan aplikasi</a><a href="#tentang">Tim</a><a href="#faq">FAQ</a></div>
    <div><h3>Moobby</h3><a href="#top">Kembali ke atas ↑</a></div>
  </footer>
  );
}
