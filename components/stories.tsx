"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const sceneIds = ["adegan-timeline", "simpan", "gangguan", "perjalanan-terhenti", "gangguan-sebelum-asal", "detail"];
const scenes = [
  ["cek kondisi rute sebelum berangkat.", "Buka rute harianmu dan lihat statusnya sekilas. Kalau ada gangguan, lihat letaknya langsung di timeline."],
  ["tentukan rute yang mau kamu cek.", "Pilih titik awal dan tujuan untuk melihat kabar yang berkaitan dengan perjalanan itu."],
  ["lihat dampak keterlambatan.", "Laporan antrean di Sudimara ditampilkan bersama perkiraan waktu tiba, supaya kamu bisa mempertimbangkan jam berangkat."],
  ["ketahui saat perjalanan terhenti.", "Jika layanan terhenti di Sudimara, lihat titik gangguannya dan pertimbangkan pilihan perjalanan lain."],
  ["cek gangguan sebelum stasiun asal.", "Gangguan sebelum stasiun asal juga bisa berpengaruh. Cek laporan Parung Panjang sebelum berangkat dari Cisauk."],
  ["buka detail langsung di timeline.", "Buka laporan di titik yang terdampak untuk melihat kejadian, lokasi, dan dampaknya pada perjalananmu."],
];

export function Stories() {
  const [index, setIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mobile = useMediaQuery("(max-width: 809px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let frame = 0;
    const showHash = () => {
      if (!mobile) return;
      const hash = location.hash === "#timeline" ? "#adegan-timeline" : location.hash;
      const next = sceneIds.indexOf(hash.slice(1));
      if (next < 0) return;
      setIndex(next);
      document.querySelector(".stories")?.scrollIntoView({ block: "start" });
    };
    const update = () => {
      frame = 0;
      if (mobile) return;
      let active = 0;
      sceneIds.forEach((id, i) => {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 48) active = i;
      });
      setIndex(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    document.addEventListener("click", event => {
      if (!mobile || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.hash === "#timeline" ? "#adegan-timeline" : link.hash;
      if (!sceneIds.includes(hash.slice(1))) return;
      event.preventDefault();
      if (location.hash !== hash) history.pushState(null, "", hash);
      showHash();
    }, { signal });
    window.addEventListener("hashchange", showHash, { signal });
    window.addEventListener("popstate", showHash, { signal });
    window.addEventListener("scroll", schedule, { passive: true, signal });
    window.addEventListener("resize", schedule, { signal });
    update();
    showHash();
    return () => { controller.abort(); cancelAnimationFrame(frame); };
  }, [mobile]);
  useEffect(() => {
    if (reduceMotion) return;
    const animation = titleRef.current?.animate([
      { opacity: .45, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], { duration: 330, easing: "ease-out" });
    return () => animation?.cancel();
  }, [index, reduceMotion]);
  return (
    <section className="stories" id="cerita" aria-label="Cara menggunakan Moobby">
      <div className="story-sticky">
        <div className="story-copy">
          <p className="eyebrow" id="scene-kicker">{`0${index + 1} / 06`}</p>
          <h2 id="scene-title" ref={titleRef}>{scenes[index][0]}</h2>
          <p id="scene-description">{scenes[index][1]}</p>
          <div className="scene-dots" aria-label="Pilih adegan">
            <a href="#adegan-timeline" aria-current={index === 0 ? "step" : undefined} aria-label="Perjalanan lancar"></a>
            <a href="#simpan" aria-current={index === 1 ? "step" : undefined} aria-label="Cari rute"></a>
            <a href="#gangguan" aria-current={index === 2 ? "step" : undefined} aria-label="Keterlambatan di Sudimara"></a>
            <a href="#perjalanan-terhenti" aria-current={index === 3 ? "step" : undefined} aria-label="Perjalanan terhenti"></a>
            <a href="#gangguan-sebelum-asal" aria-current={index === 4 ? "step" : undefined} aria-label="Gangguan sebelum stasiun asal"></a>
            <a href="#detail" aria-current={index === 5 ? "step" : undefined} aria-label="Detail gangguan di timeline"></a>
          </div>
        </div>
        <div className="story-visual">
          <div className="iphone story-phone">
            <div className="iphone-screen">
              <div className={`story-slide app-screen screen-clear${index === 0 ? " active" : ""}`} aria-hidden={index !== 0} role="img" aria-label="Timeline Green Line tanpa laporan gangguan"></div>
              <img className={`story-slide${index === 1 ? " active" : ""}`} aria-hidden={index !== 1} src="/assets/search.png" alt="Layar Cari Rute" width="1206" height="2622" loading="lazy" />
              <div className={`story-slide app-screen screen-delay${index === 2 ? " active" : ""}`} aria-hidden={index !== 2} role="img" aria-label="Status kuning, kereta tertunda sekitar 12 menit"></div>
              <div className={`story-slide app-screen screen-stop${index === 3 ? " active" : ""}`} aria-hidden={index !== 3} role="img" aria-label="Status merah, perjalanan terhenti di Sudimara"></div>
              <div className={`story-slide app-screen screen-earlier${index === 4 ? " active" : ""}`} aria-hidden={index !== 4} role="img" aria-label="Peringatan gangguan di Parung Panjang sebelum Cisauk"></div>
              <div className={`story-slide app-screen screen-expanded${index === 5 ? " active" : ""}`} aria-hidden={index !== 5} role="img" aria-label="Kartu gangguan di Parung Panjang terbuka di timeline"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="story-steps" aria-hidden="true">
        <div id="adegan-timeline" data-scene="0"></div>
        <div id="simpan" data-scene="1"></div>
        <div id="gangguan" data-scene="2"></div>
        <div id="perjalanan-terhenti" data-scene="3"></div>
        <div id="gangguan-sebelum-asal" data-scene="4"></div>
        <div id="detail" data-scene="5"></div>
      </div>
    </section>
  );
}
