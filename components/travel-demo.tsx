"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
const scenarios = [
  ["ok", "screen-clear", "Tidak ada laporan gangguan", "Kereta berjalan sesuai jadwal pada cuplikan perjalanan ini.", "Lanjutkan dengan KRL pada rute yang tersimpan."],
  ["delay", "screen-delay", "Kereta tertunda ±12 menit", "Antrean masuk Sudimara menambah waktu perjalanan.", "Tetap di rute KRL jika waktumu fleksibel, atau cek pilihan moda lain."],
  ["disrupt", "screen-stop", "Perjalanan terhenti di Sudimara", "Gangguan persinyalan menghentikan perjalanan sementara.", "Buka rekomendasi perjalanan untuk melihat rute alternatif."],
];

export function TravelDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [tone, screen, heading, copy, option] = scenarios[index];
  useEffect(() => {
    const dialog = dialogRef.current!;
    let trigger: HTMLElement | null = null;
    const open = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href="#demo"]');
      if (!link) return;
      event.preventDefault();
      trigger = link;
      if (!dialog.open) dialog.showModal();
    };
    const restoreFocus = () => trigger?.focus();
    document.addEventListener("click", open);
    dialog.addEventListener("close", restoreFocus);
    return () => {
      document.removeEventListener("click", open);
      dialog.removeEventListener("close", restoreFocus);
      if (dialog.open) dialog.close();
    };
  }, []);
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
  }
  return (
<dialog className="demo" ref={dialogRef} onClick={closeOnBackdrop} aria-describedby="demo-notice" id="demo" aria-labelledby="demo-heading">
        <form method="dialog"><button className="demo-close" aria-label="Tutup tampilan aplikasi" autoFocus>×</button></form>
        <div className="demo-copy">
          <p className="eyebrow">CISAUK → KEBAYORAN</p>
          <h3 id="demo-heading">Cek sebelum berangkat</h3>
          <div className="iphone conditions-phone"><div className="iphone-screen">
            <div id="conditions-screen" className={`app-screen ${screen}`} role="img" aria-label={`Tampilan Moobby: ${heading}`}></div>
          </div></div>
        </div>
        <div className="demo-card"><p className="demo-notice" id="demo-notice">Contoh tampilan aplikasi, bukan kondisi KRL terkini.</p>
          <div className="demo-controls" aria-label="Pilih kondisi perjalanan"><button type="button" onClick={() => setIndex(0)} aria-pressed={index === 0}>Lancar</button><button type="button" onClick={() => setIndex(1)} aria-pressed={index === 1}>Terlambat</button><button type="button" onClick={() => setIndex(2)} aria-pressed={index === 2}>Terganggu</button></div>
          <div className="demo-result" data-tone={tone} aria-live="polite"><h3 id="demo-title">{heading}</h3><p id="demo-copy">{copy}</p></div>
          <details className="alternatives"><summary>Lihat pilihan perjalanan</summary><p id="demo-option">{option}</p></details>
        </div>
      </dialog>
  );
}
