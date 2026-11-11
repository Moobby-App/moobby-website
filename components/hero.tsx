"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const positionRef = useRef(0);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [requested, setRequested] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const video = videoRef.current!;
    const mobile = matchMedia("(max-width: 809px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const { signal } = controller;
    const select = () => {
      positionRef.current = video.currentTime;
      setSource(mobile.matches ? "/assets/peron-mobile.mp4" : "/assets/peron-desktop.mp4");
    };
    const motionChanged = () => setRequested(!motion.matches);
    select();
    motionChanged();
    mobile.addEventListener("change", select, { signal });
    motion.addEventListener("change", motionChanged, { signal });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    observer.observe(video);
    return () => { controller.abort(); observer.disconnect(); video.pause(); };
  }, []);
  useEffect(() => {
    const video = videoRef.current!;
    const update = () => {
      if (requested && visible) void video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    update();
    video.addEventListener("loadeddata", update);
    return () => video.removeEventListener("loadeddata", update);
  }, [requested, visible, source]);
  function togglePlayback() {
    const video = videoRef.current!;
    if (video.paused) {
      setRequested(true);
      // Retry directly in the user gesture if autoplay was previously blocked.
      void video.play().catch(() => setPlaying(false));
    } else {
      setRequested(false);
      video.pause();
    }
  }
  function restorePosition() {
    const video = videoRef.current!;
    if (positionRef.current > 0 && positionRef.current < video.duration) video.currentTime = positionRef.current;
  }
  return (
    <section className="hero" aria-label="Video suasana peron KRL">
      <video ref={videoRef} src={source} onLoadedMetadata={restorePosition} id="hero-video" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} playsInline muted={muted} loop preload="none" poster="/assets/peron-poster.jpg" aria-label="Cuplikan di peron KRL pada malam hari"></video>
      <div className="hero-shade"></div>
      <a className="hero-down round" href="#kenalan" aria-label="Gulir untuk mengenal Moobby"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v17m-7-7 7 7 7-7"/></svg></a>
      <div className="hero-controls">
        <button className="round" id="play-toggle" onClick={togglePlayback} type="button" aria-label={playing ? "Jeda video" : "Putar video"} aria-pressed={playing}><svg viewBox="0 0 24 24" aria-hidden="true"><path className="pause-icon" d="M9 5v14m6-14v14"/><path className="play-icon" d="m9 5 11 7-11 7z"/></svg></button>
        <button className="round" id="sound-toggle" onClick={() => setMuted(!muted)} type="button" aria-label={muted ? "Aktifkan suara" : "Bisukan suara"} aria-pressed={!muted}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path className="sound-off" d="m16 10 5 5m0-5-5 5"/><path className="sound-on" d="M16 8c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/></svg></button>
      </div>
    </section>
  );
}
