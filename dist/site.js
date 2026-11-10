const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector(".nav-toggle");
const motionToggle = document.querySelector(".motion-toggle");
const phone = document.querySelector(".phone");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const steps = [...document.querySelectorAll("[data-scene]")].filter(step => step.matches(".step"));
const scenes = [
  ["Perjalanan pagi", "Rute pergi tersimpan"],
  ["Timeline Green Line", "Lihat stasiun di rute ini"],
  ["Perjalanan berubah", "Contoh gangguan · lihat opsi lain"],
];
const scenarios = [
  ["ok", "Perjalanan berjalan lancar", "Ikuti timeline Green Line menuju Tanah Abang.", "Tetap naik KRL sesuai rute yang tersimpan."],
  ["delay", "Ada keterlambatan di rute", "Dalam simulasi ini, perjalanan memerlukan waktu tambahan.", "Tetap di rute KRL jika waktumu fleksibel, atau pertimbangkan moda lain."],
  ["disrupt", "Ada gangguan dalam perjalanan", "Dalam simulasi ini, perjalanan pada sebagian rute terganggu.", "Bandingkan opsi tetap naik KRL dan mencari angkutan alternatif."],
];

function setMenu(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    navToggle.focus();
  }
});

motionToggle.addEventListener("click", () => {
  const paused = document.documentElement.toggleAttribute("data-paused");
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.setAttribute("aria-label", paused ? "Lanjutkan animasi" : "Jeda animasi");
});

function updateStory() {
  nav.classList.toggle("scrolled", scrollY > innerHeight * 0.66);
  const threshold = innerHeight * (innerWidth <= 720 ? 0.71 : 0.55);
  let index = 0;
  steps.forEach((step, stepIndex) => {
    if (step.getBoundingClientRect().top < threshold) index = stepIndex;
  });
  if (phone.dataset.scene === String(index)) return;
  phone.dataset.scene = index;
  const [title, alert] = scenes[index];
  document.querySelector("#story-title").textContent = title;
  document.querySelector("#story-alert").textContent = alert;
  if (!motionPreference.matches && !document.documentElement.hasAttribute("data-paused")) {
    phone.animate([{opacity: 0.75, transform: "translateY(7px)"}, {opacity: 1, transform: "translateY(0)"}], {duration: 285, easing: "ease-out"});
  }
}

let frame;
function scheduleStoryUpdate() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(updateStory);
}

addEventListener("scroll", scheduleStoryUpdate, {passive: true});
addEventListener("resize", scheduleStoryUpdate);
updateStory();

const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const demoResult = document.querySelector(".demo-result");
scenarioButtons.forEach(button => {
  button.addEventListener("click", () => {
    const [tone, title, copy, option] = scenarios[Number(button.dataset.scenario)];
    scenarioButtons.forEach(candidate => candidate.setAttribute("aria-pressed", String(candidate === button)));
    demoResult.dataset.tone = tone;
    document.querySelector("#demo-title").textContent = title;
    document.querySelector("#demo-copy").textContent = copy;
    document.querySelector("#demo-option").textContent = option;
  });
});
