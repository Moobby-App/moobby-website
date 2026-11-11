"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDetailsElement>(null);
  function closeOnLink(event: MouseEvent) {
    if (!(event.target as Element).closest("a")) return;
    setOpen(false);
    if (featuresRef.current) featuresRef.current.open = false;
  }
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const update = () => setScrolled(window.scrollY > window.innerHeight * .7);
    update();
    window.addEventListener("scroll", update, { passive: true, signal });
    document.addEventListener("click", event => {
      if (navRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      if (featuresRef.current) featuresRef.current.open = false;
    }, { signal });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || document.querySelector("dialog[open]")) return;
      if (featuresRef.current?.open) {
        featuresRef.current.open = false;
        featuresRef.current.querySelector("summary")?.focus();
      } else if (navRef.current?.classList.contains("open")) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }, { signal });
    return () => controller.abort();
  }, []);
  return (
  <header className={`nav${open ? " open" : ""}${scrolled ? " scrolled" : ""}`} ref={navRef}>
    <a href="#top" className="brand"><img src="/assets/app-icon.png" width="44" height="44" alt="" />Moobby</a>
    <button className="nav-toggle round" type="button" aria-expanded={open} aria-controls="nav-links" aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen(!open)} ref={toggleRef}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <nav id="nav-links" onClick={closeOnLink} aria-label="Navigasi utama">
      <details className="nav-features" ref={featuresRef}><summary>fitur <span aria-hidden="true">⌄</span></summary><div><a href="#timeline">timeline stasiun</a><a href="#simpan">cari rute</a><a href="#gangguan">detail gangguan</a><a href="#detail">detail di timeline</a></div></details>
      <a href="#skenario">skenario</a><a href="#tentang">tim</a><a href="#faq">FAQ</a>
      <a className="pill nav-cta" href="#demo" aria-haspopup="dialog">Lihat kondisi perjalanan</a>
    </nav>
  </header>
  );
}
