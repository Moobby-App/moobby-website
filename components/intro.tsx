"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
const words = ["berangkat", "naik KRL", "ubah rencana", "pulang"];

export function Intro() {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    });
    observer.observe(copyRef.current!);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduceMotion || !visible) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % words.length), 1200);
    return () => clearInterval(timer);
  }, [reduceMotion, visible]);
  useEffect(() => {
    if (reduceMotion) return;
    const animation = wordRef.current?.animate([
      { opacity: 0, transform: "translateY(18px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], { duration: 240, easing: "ease-out" });
    return () => animation?.cancel();
  }, [index, reduceMotion]);
  return (
    <section className={`intro${seen ? " is-seen" : ""}`} id="kenalan">
      <div className="intro-copy" ref={copyRef}>
        <span className="scribble" aria-hidden="true">bareng Moobby!</span>
        <h1><span>lebih siap</span><span className="rotator" aria-hidden="true" ref={wordRef}>{words[index]}</span><span className="sr"> berangkat</span></h1>
        <p>Cek kabar gangguan KRL terkurasi sebelum berangkat. Lihat laporan yang relevan dengan rutemu, pahami dampaknya, dan tentukan langkah berikutnya.</p>
        <a className="pill" href="#demo" aria-haspopup="dialog">Lihat kondisi perjalanan</a>
        <svg className="scribble-arrow" viewBox="0 0 118 92" aria-hidden="true"><path d="M3 6C39 6 88 29 82 80M60 61l23 21 25-20"/></svg>
      </div>
      <div className="showcase" aria-label="Tampilan aplikasi Moobby">
        <div className="showcase-rail" aria-hidden="true"></div>
        <img className="showcase-train" src="/assets/krl-side.svg" width="580" height="176" alt="" />
        <div className="iphone showcase-main">
          <div className="iphone-screen">
            <div className="app-screen screen-clear" role="img" aria-label="Beranda Moobby untuk perjalanan Cisauk ke Kebayoran"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
