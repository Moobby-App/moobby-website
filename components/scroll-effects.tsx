"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

/** Decorative transforms only; content and interactive state belong to React. */
export function ScrollEffects() {
  useEffect(() => {
    const showcase = document.querySelector<HTMLElement>(".showcase")!;
    const timeline = document.querySelector<HTMLElement>(".timeline-stage")!;
    const phone = document.querySelector<HTMLElement>(".timeline-sticky")!;
    const wordStory = document.querySelector<HTMLElement>(".word-story")!;
    const lines = [...wordStory.querySelectorAll("p")];
    const cards = [...document.querySelectorAll<HTMLElement>(".flight-slot")].map(slot => ({
      element: slot.querySelector<SVGElement>(".flight-card")!,
      direction: Number(slot.style.getPropertyValue("--direction")),
      drift: Number(slot.style.getPropertyValue("--drift")),
    }));
    const mobile = matchMedia("(max-width: 809px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    let frame = 0;
    let trainProgress: number | undefined;
    let flightProgress: number | undefined;
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function follow(current: number | undefined, target: number, rate = .24): number {
      if (current === undefined || Math.abs(target - current) < .001) return target;
      schedule();
      return current + (target - current) * rate;
    }
    function update() {
      frame = 0;
      if (motion.matches) {
        lines.forEach(line => line.style.removeProperty("transform"));
        return;
      }
      const target = clamp((innerHeight * .94 - showcase.getBoundingClientRect().top) / (innerHeight + showcase.offsetHeight * .28));
      trainProgress = follow(trainProgress, target, .14);
      showcase.style.setProperty("--train-remaining", String(1 - ease(trainProgress)));
      if (mobile.matches) return;
      const entry = innerHeight * .83;
      const stickyOffset = Number.parseFloat(getComputedStyle(phone).top);
      const distance = Math.max(1, entry + timeline.offsetHeight - phone.offsetHeight - stickyOffset);
      flightProgress = follow(flightProgress, clamp((entry - timeline.getBoundingClientRect().top) / distance));
      const spread = Math.min(345, innerWidth * .22);
      cards.forEach(({ element, direction, drift }, index) => {
        const position = ease(clamp((flightProgress! - index * .044) / .64));
        const remaining = 1 - position;
        const arc = Math.sin(Math.PI * position) * 24;
        element.style.setProperty("--flight-x", `${direction * spread * remaining}px`);
        element.style.setProperty("--flight-y", `${drift * remaining - arc}px`);
        element.style.setProperty("--flight-scale", String(1 + remaining * .19));
        element.style.setProperty("--flight-shadow", String(remaining * .32));
      });
      const progress = clamp(-wordStory.getBoundingClientRect().top / Math.max(1, wordStory.offsetHeight - innerHeight));
      lines.forEach((line, index) => {
        line.style.transform = `translateX(${(index % 2 === 0 ? 1 : -1) * (progress - .5) * 48}vw)`;
      });
    }
    window.addEventListener("scroll", schedule, { passive: true, signal: controller.signal });
    window.addEventListener("resize", schedule, { signal: controller.signal });
    motion.addEventListener("change", schedule, { signal: controller.signal });
    update();
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      showcase.style.removeProperty("--train-remaining");
      lines.forEach(line => line.style.removeProperty("transform"));
      cards.forEach(({ element }) => {
        ["--flight-x", "--flight-y", "--flight-scale", "--flight-shadow"].forEach(property => element.style.removeProperty(property));
      });
    };
  }, []);
  return null;
}
