"use client";

import { useState, type CSSProperties } from "react";

export function Team() {
  const [selected, setSelected] = useState<number | null>(null);
  const toggle = (index: number) => setSelected(current => current === index ? null : index);
  return (
    <section className="team" id="tentang" aria-labelledby="team-heading">
      <h2 className="section-heading" id="team-heading"><strong>tim</strong><br />di balik Moobby</h2>
      <div className="team-lineup">
        <button className="team-member" type="button" onClick={() => toggle(0)} aria-label="stepoy, Designer" aria-pressed={selected === 0} style={{"--portrait": "0%"} as CSSProperties}>
          <span className="team-name" aria-hidden="true">stepoy</span>
          <span className="team-figure" aria-hidden="true"></span>
          <span className="team-role" aria-hidden="true">Designer</span>
        </button>
        <button className="team-member" type="button" onClick={() => toggle(1)} aria-label="taqwoy, Designer / PM" aria-pressed={selected === 1} style={{"--portrait": "25%"} as CSSProperties}>
          <span className="team-name" aria-hidden="true">taqwoy</span>
          <span className="team-figure" aria-hidden="true"></span>
          <span className="team-role" aria-hidden="true">Designer / PM</span>
        </button>
        <button className="team-member" type="button" onClick={() => toggle(2)} aria-label="zizoy, Tech" aria-pressed={selected === 2} style={{"--portrait": "50%"} as CSSProperties}>
          <span className="team-name" aria-hidden="true">zizoy</span>
          <span className="team-figure" aria-hidden="true"></span>
          <span className="team-role" aria-hidden="true">Tech</span>
        </button>
        <button className="team-member" type="button" onClick={() => toggle(3)} aria-label="salim, Tech" aria-pressed={selected === 3} style={{"--portrait": "75%"} as CSSProperties}>
          <span className="team-name" aria-hidden="true">salim</span>
          <span className="team-figure" aria-hidden="true"></span>
          <span className="team-role" aria-hidden="true">Tech</span>
        </button>
        <button className="team-member" type="button" onClick={() => toggle(4)} aria-label="yuki ganteng, Tech" aria-pressed={selected === 4} style={{"--portrait": "100%"} as CSSProperties}>
          <span className="team-name" aria-hidden="true">yuki ganteng</span>
          <span className="team-figure" aria-hidden="true"></span>
          <span className="team-role" aria-hidden="true">Tech</span>
        </button>
      </div>
    </section>
  );
}
