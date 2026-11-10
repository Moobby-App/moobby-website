const nav = document.querySelector("[data-nav]");
const menu = document.querySelector(".nav-toggle");
const features = document.querySelector(".nav-features");
const video = document.querySelector("#hero-video");
const demo = document.querySelector("#demo");
const play = document.querySelector("#play-toggle");
const sound = document.querySelector("#sound-toggle");
const mobile = matchMedia("(max-width: 809px)");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    features.open = false;
    setMenu(false);
  });
});
document.addEventListener("click", event => {
  if (!nav.contains(event.target)) {
    features.open = false;
    setMenu(false);
  }
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (demo.open) {
    event.preventDefault();
    demo.close();
  } else if (features.open) {
    features.open = false;
    features.querySelector("summary").focus();
  } else if (nav.classList.contains("open")) {
    setMenu(false);
    menu.focus();
  }
});

let videoVisible = true;
let playbackRequested = !reduceMotion.matches;

function updateVideo() {
  if (videoVisible && playbackRequested) {
    video.play().catch(() => {
      play.setAttribute("aria-label", "Putar video");
      play.setAttribute("aria-pressed", "false");
    });
  } else {
    video.pause();
  }
}

function selectVideo() {
  const position = video.currentTime;
  video.src = mobile.matches ? "assets/peron-mobile.mp4" : "assets/peron-desktop.mp4";
  video.addEventListener("loadedmetadata", () => {
    if (position > 0 && position < video.duration) video.currentTime = position;
  }, { once: true });
  updateVideo();
}

function syncPlaybackControl() {
  play.setAttribute("aria-pressed", String(!video.paused));
  play.setAttribute("aria-label", video.paused ? "Putar video" : "Jeda video");
}

play.addEventListener("click", () => {
  playbackRequested = video.paused;
  updateVideo();
});
sound.addEventListener("click", () => {
  video.muted = !video.muted;
  sound.setAttribute("aria-pressed", String(!video.muted));
  sound.setAttribute("aria-label", video.muted ? "Aktifkan suara" : "Bisukan suara");
});
video.addEventListener("play", syncPlaybackControl);
video.addEventListener("pause", syncPlaybackControl);
mobile.addEventListener("change", selectVideo);
reduceMotion.addEventListener("change", () => {
  playbackRequested = !reduceMotion.matches;
  updateVideo();
});
new IntersectionObserver(([entry]) => {
  videoVisible = entry.isIntersecting;
  updateVideo();
}, { threshold: 0.15 }).observe(video);
selectVideo();

const intro = document.querySelector(".intro");
const rotator = document.querySelector(".rotator");
const words = ["berangkat", "naik KRL", "ubah rencana", "pulang"];
let wordIndex = 0;
let introVisible = false;
new IntersectionObserver(([entry]) => {
  introVisible = entry.isIntersecting;
  if (introVisible) intro.classList.add("is-seen");
}).observe(document.querySelector(".intro-copy"));

setInterval(() => {
  if (reduceMotion.matches || !introVisible) return;
  wordIndex = (wordIndex + 1) % words.length;
  rotator.textContent = words[wordIndex];
  rotator.animate([
    { opacity: 0, transform: "translateY(18px)" },
    { opacity: 1, transform: "translateY(0)" },
  ], { duration: 240, easing: "ease-out" });
}, 1200);

const scenarioRows = [
  [
    ["✓", "Perjalanan lancar", "Cek status di rute tersimpan sebelum berangkat ke stasiun."],
    ["◷", "Kereta terlambat", "Lihat titik keterlambatan dan pengaruhnya pada waktu tiba."],
    ["⚠", "Gangguan persinyalan", "Baca lokasi dan dampak gangguan untuk menentukan langkah berikutnya."],
    ["⇄", "Moda alternatif", "Pertimbangkan moda lain kalau perjalanan perlu disesuaikan."],
  ],
  [
    ["↔", "Rute pergi dan pulang", "Simpan perjalanan harian agar kabar di rute itu mudah dicek."],
    ["⌕", "Cari rute baru", "Pilih lokasi dan stasiun tujuan yang berbeda."],
    ["⌖", "Stasiun sekitar", "Temukan stasiun yang dekat dengan posisi kamu."],
    ["◎", "Timeline perjalanan", "Lihat di mana laporan gangguan muncul dalam urutan stasiunmu."],
  ],
];

function makeScenarioRow(row) {
  const ticker = document.createElement("div");
  ticker.className = "ticker";
  ticker.dataset.ticker = "";
  const track = document.createElement("div");
  track.className = "ticker-track";
  const group = document.createElement("div");
  group.className = "ticker-group";
  for (const [symbol, title, copy] of row) {
    const card = document.createElement("article");
    card.className = "scenario-card";
    const heading = document.createElement("b");
    const mark = document.createElement("span");
    mark.className = "scenario-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = symbol;
    heading.textContent = title;
    const body = document.createElement("p");
    body.textContent = copy;
    card.append(mark, heading, body);
    group.append(card);
  }
  track.append(group);
  ticker.append(track);
  return ticker;
}

document.querySelector("[data-scenario-rows]").append(...scenarioRows.map(makeScenarioRow));
const tickers = [...document.querySelectorAll("[data-ticker]")];
function fitTickers() {
  for (const ticker of tickers) {
    const track = ticker.firstElementChild;
    const group = track.firstElementChild;
    track.querySelectorAll("[data-copy]").forEach(copy => copy.remove());
    if (reduceMotion.matches) continue;
    const cards = [...group.children];
    while (group.scrollWidth < ticker.clientWidth) {
      for (const card of cards) {
        const copy = card.cloneNode(true);
        copy.dataset.copy = "";
        copy.setAttribute("aria-hidden", "true");
        group.append(copy);
      }
    }
    const copy = group.cloneNode(true);
    copy.dataset.copy = "";
    copy.setAttribute("aria-hidden", "true");
    track.append(copy);

  }
}

const timeline = document.querySelector(".timeline-stage");
const stickyPhone = document.querySelector(".timeline-sticky");
const cards = [...document.querySelectorAll(".flight-slot")].map(slot => ({
  element: slot.querySelector(".flight-card"),
  direction: Number(slot.style.getPropertyValue("--direction")),
  drift: Number(slot.style.getPropertyValue("--drift")),
}));
const showcase = document.querySelector(".showcase");
const steps = [...document.querySelectorAll(".story-steps > div")];
const slides = [...document.querySelectorAll(".story-slide")];
const dots = [...document.querySelectorAll(".scene-dots a")];
const title = document.querySelector("#scene-title");
const description = document.querySelector("#scene-description");
const kicker = document.querySelector("#scene-kicker");
const scenes = [
  ["cek kondisi rute sebelum berangkat.", "Buka rute harianmu dan lihat statusnya sekilas. Kalau ada gangguan, lihat letaknya langsung di timeline."],
  ["tentukan rute yang mau kamu cek.", "Pilih titik awal dan tujuan untuk melihat kabar yang berkaitan dengan perjalanan itu."],
  ["lihat dampak keterlambatan.", "Laporan antrean di Sudimara ditampilkan bersama perkiraan waktu tiba, supaya kamu bisa mempertimbangkan jam berangkat."],
  ["ketahui saat perjalanan terhenti.", "Jika layanan terhenti di Sudimara, lihat titik gangguannya dan pertimbangkan pilihan perjalanan lain."],
  ["cek gangguan sebelum stasiun asal.", "Gangguan sebelum stasiun asal juga bisa berpengaruh. Cek laporan Parung Panjang sebelum berangkat dari Cisauk."],
  ["buka detail langsung di timeline.", "Buka laporan di titik yang terdampak untuk melihat kejadian, lokasi, dan dampaknya pada perjalananmu."],
];
let sceneIndex = -1;
const wordStory = document.querySelector(".word-story");
const wordLines = [...wordStory.querySelectorAll("p")];
const teamMembers = [...document.querySelectorAll(".team-member")];
teamMembers.forEach(member => {
  member.addEventListener("click", () => {
    const wasSelected = member.getAttribute("aria-pressed") === "true";
    teamMembers.forEach(other => {
      other.setAttribute("aria-pressed", String(other === member && !wasSelected));
    });
  });
});

function showMobileScene() {
  const index = steps.findIndex(step => `#${step.id}` === location.hash);
  if (index < 0 || !mobile.matches) return;
  setScene(index);
  document.querySelector(".stories").scrollIntoView({ block: "start" });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const hash = link.hash === "#timeline" ? "#adegan-timeline" : link.hash;
    if (!mobile.matches || !steps.some(step => `#${step.id}` === hash)) return;
    event.preventDefault();
    if (location.hash !== hash) history.pushState(null, "", hash);
    showMobileScene();
  });
});
addEventListener("hashchange", showMobileScene);
mobile.addEventListener("change", showMobileScene);


function setScene(index) {
  if (index === sceneIndex) return;
  sceneIndex = index;
  kicker.textContent = `0${index + 1} / 06`;
  [title.textContent, description.textContent] = scenes[index];
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    slide.setAttribute("aria-hidden", String(i !== index));
  });
  dots.forEach((dot, i) => {
    if (i === index) dot.setAttribute("aria-current", "step");
    else dot.removeAttribute("aria-current");
  });
  if (!reduceMotion.matches) {
    title.animate([{ opacity: .45, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 330, easing: "ease-out" });
  }
}

const clampUnit = value => Math.max(0, Math.min(1, value));
const ease = value => value * value * (3 - 2 * value);
let trainProgress;
let flightProgress;

function follow(current, target, rate = .24) {
  if (current === undefined || Math.abs(target - current) < .001) return target;
  scheduleScroll();
  return current + (target - current) * rate;
}

function updateScroll() {
  nav.classList.toggle("scrolled", scrollY > innerHeight * .7);
  if (!reduceMotion.matches) {
    const stageTop = showcase.getBoundingClientRect().top;
    const entry = innerHeight * .94;
    const travelDistance = innerHeight + showcase.offsetHeight * .28;
    const target = clampUnit((entry - stageTop) / travelDistance);
    trainProgress = follow(trainProgress, target, .14);
    showcase.style.setProperty("--train-remaining", 1 - ease(trainProgress));
  }

  if (mobile.matches) {
    if (sceneIndex === -1) setScene(0);
    return;
  }

  if (!reduceMotion.matches) {
    const entry = innerHeight * .83;
    const stickyOffset = Number.parseFloat(getComputedStyle(stickyPhone).top);
    const distance = Math.max(1, entry + timeline.offsetHeight - stickyPhone.offsetHeight - stickyOffset);
    const target = clampUnit((entry - timeline.getBoundingClientRect().top) / distance);
    flightProgress = follow(flightProgress, target);
    const spread = Math.min(345, innerWidth * .22);
    cards.forEach(({ element, direction, drift }, index) => {
      const position = ease(clampUnit((flightProgress - index * .044) / .64));
      const remaining = 1 - position;
      const arc = Math.sin(Math.PI * position) * 24;
      element.style.setProperty("--flight-x", `${direction * spread * remaining}px`);
      element.style.setProperty("--flight-y", `${drift * remaining - arc}px`);
      element.style.setProperty("--flight-scale", 1 + remaining * .19);
      element.style.setProperty("--flight-shadow", remaining * .32);
    });
    const scroll = Math.min(1, Math.max(0, -wordStory.getBoundingClientRect().top / (wordStory.offsetHeight - innerHeight)));
    wordLines.forEach((line, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      line.style.transform = `translateX(${direction * (scroll - .5) * 48}vw)`;
    });

  }
  let active = 0;
  for (const [i, step] of steps.entries()) {
    if (step.getBoundingClientRect().top <= 48) active = i;
  }
  setScene(active);
}

let scrollFrame = 0;
function scheduleScroll() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    updateScroll();
  });
}
addEventListener("scroll", scheduleScroll, { passive: true });
addEventListener("resize", () => {
  fitTickers();
  scheduleScroll();
});
reduceMotion.addEventListener("change", fitTickers);
fitTickers();
updateScroll();
showMobileScene();

document.querySelectorAll('a[href="#demo"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    if (!demo.open) demo.showModal();
  });
});
demo.addEventListener("click", event => {
  if (event.target !== demo) return;
  const bounds = demo.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) demo.close();
});

const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const result = document.querySelector(".demo-result");
const conditionsScreen = document.querySelector("#conditions-screen");
const scenarios = [
  ["ok", "screen-clear", "Tidak ada laporan gangguan", "Kereta berjalan sesuai jadwal pada cuplikan perjalanan ini.", "Lanjutkan dengan KRL pada rute yang tersimpan."],
  ["delay", "screen-delay", "Kereta tertunda ±12 menit", "Antrean masuk Sudimara menambah waktu perjalanan.", "Tetap di rute KRL jika waktumu fleksibel, atau cek pilihan moda lain."],
  ["disrupt", "screen-stop", "Perjalanan terhenti di Sudimara", "Gangguan persinyalan menghentikan perjalanan sementara.", "Buka rekomendasi perjalanan untuk melihat rute alternatif."],
];
scenarioButtons.forEach(button => {
  button.addEventListener("click", () => {
    const [tone, screen, heading, copy, option] = scenarios[Number(button.dataset.scenario)];
    scenarioButtons.forEach(candidate => candidate.setAttribute("aria-pressed", String(candidate === button)));
    result.dataset.tone = tone;
    conditionsScreen.className = `app-screen ${screen}`;
    conditionsScreen.setAttribute("aria-label", `Tampilan Moobby: ${heading}`);
    document.querySelector("#demo-title").textContent = heading;
    document.querySelector("#demo-copy").textContent = copy;
    document.querySelector("#demo-option").textContent = option;
  });
});
