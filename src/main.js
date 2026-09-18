const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const header = document.querySelector(".site-header");
const heroCta = document.querySelector(".hero .btn-lime");

function setNav(open) {
  document.body.classList.toggle("nav-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  const label = toggle?.querySelector(".visually-hidden");
  if (label) label.textContent = open ? "Close menu" : "Menu";
}

toggle?.addEventListener("click", () => {
  setNav(!document.body.classList.contains("nav-open"));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

function setNavCta(show) {
  document.body.classList.toggle("nav-cta-visible", show);
}

function headerOffset() {
  return Math.round(header?.getBoundingClientRect().height ?? 0);
}

setNavCta(false);

if (heroCta && "IntersectionObserver" in window) {
  let observer;
  const observeHeroCta = () => {
    observer?.disconnect();
    observer = new IntersectionObserver(
      ([entry]) => setNavCta(!entry.isIntersecting),
      { threshold: 0, rootMargin: `-${headerOffset()}px 0px 0px 0px` },
    );
    observer.observe(heroCta);
  };
  observeHeroCta();
  window.addEventListener("resize", observeHeroCta);
} else if (header) {
  const onScroll = () => setNavCta(window.scrollY > headerOffset());
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (nav?.contains(target) || toggle?.contains(target)) return;
  setNav(false);
});

const typedWords = [
  "PRODUCT",
  "CRIME",
  "CONTENT",
  "RESEARCH",
  "BRAND",
  "ILLUSTRATION",
  "WIREFRAMING",
  "UX DESIGN",
];

const heading = document.querySelector("#hero-heading");
const accent = document.querySelector(".hero-accent");
const typed = document.querySelector("[data-typewriter]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateTypewriterMinWidth() {
  if (!accent || !typed) return;

  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;pointer-events:none;";

  const accentStyle = getComputedStyle(accent);
  probe.style.font = accentStyle.font;
  probe.style.letterSpacing = accentStyle.letterSpacing;
  probe.style.textTransform = accentStyle.textTransform;

  document.body.appendChild(probe);

  let maxTextWidth = 0;
  for (const word of typedWords) {
    probe.textContent = word;
    maxTextWidth = Math.max(maxTextWidth, probe.getBoundingClientRect().width);
  }

  document.body.removeChild(probe);

  const caret = accent.querySelector(".hero-caret");
  let caretSpace = 0;
  if (caret) {
    const caretStyle = getComputedStyle(caret);
    caretSpace =
      caret.getBoundingClientRect().width +
      (parseFloat(caretStyle.marginLeft) || 0) +
      (parseFloat(caretStyle.marginRight) || 0);
  }

  accent.style.setProperty("--hero-typewriter-min", `${maxTextWidth + caretSpace}px`);
}

let typewriterResizeTimer;
function scheduleTypewriterMinWidthUpdate() {
  window.clearTimeout(typewriterResizeTimer);
  typewriterResizeTimer = window.setTimeout(updateTypewriterMinWidth, 80);
}

function wait(ms) {
  return new Promise((resolve) => {
    const tick = () => {
      if (document.hidden) {
        setTimeout(tick, 200);
        return;
      }
      setTimeout(resolve, ms);
    };
    tick();
  });
}

function setTypedWord(word) {
  if (typed) typed.textContent = word;
  heading?.setAttribute(
    "aria-label",
    `Hey! I’m Olivia. Your partner in ${word.toLowerCase()}.`,
  );
}

function startTypewriter() {
  if (!typed || !accent) return;

  if (reduceMotion.matches) {
    let index = 0;
    setTypedWord(typedWords[index]);
    setInterval(() => {
      index = (index + 1) % typedWords.length;
      setTypedWord(typedWords[index]);
    }, 2400);
    return;
  }

  let index = 0;

  const typeWord = async (word) => {
    accent.classList.remove("is-idle");
    for (let i = 1; i <= word.length; i += 1) {
      typed.textContent = word.slice(0, i);
      await wait(72);
    }
    setTypedWord(word);
    accent.classList.add("is-idle");
  };

  const eraseWord = async () => {
    accent.classList.remove("is-idle");
    const current = typed.textContent ?? "";
    for (let i = current.length; i >= 0; i -= 1) {
      typed.textContent = current.slice(0, i);
      await wait(42);
    }
  };

  const loop = async () => {
    accent.classList.add("is-idle");
    await wait(1600);

    while (true) {
      const word = typedWords[index];
      if ((typed.textContent ?? "").toUpperCase() !== word) {
        await eraseWord();
        await wait(220);
        await typeWord(word);
      }
      await wait(1600);
      index = (index + 1) % typedWords.length;
    }
  };

  loop();
}

updateTypewriterMinWidth();
window.addEventListener("resize", scheduleTypewriterMinWidthUpdate, { passive: true });
document.fonts?.ready?.then(updateTypewriterMinWidth).catch(() => {});

startTypewriter();

const eyeMarkup = `
  <span class="eye-plate"></span>
  <img class="eye-graphic" src="${import.meta.env.BASE_URL}assets/eye.svg" width="163" height="99" alt="" />
  <span class="eye-lid eye-lid-a"></span>
  <span class="eye-lid eye-lid-b"></span>
`;

const eyeLayouts = {
  about: [
    [20.42, 31.22, 38.21, 30.42],
    [50.77, 16.82, 22.38, 17.82],
    [56.58, 54.39, 27.17, 21.71],
    [79.76, 45.85, 15.99, 12.73],
    [80.24, 15.13, 10.58, 8.42],
    [21.08, 87.5, 10.58, 8.42],
    [66.27, 40.64, 7.21, 5.74],
    [91.42, 68.64, 7.21, 5.74],
    [76.33, 76.97, 12.32, 9.81],
    [75.04, 28.51, 7.21, 5.74],
    [11.75, 82.46, 7.21, 5.74],
    [19.25, 75.22, 7.21, 5.74],
  ],
  left: [
    [44.64, 21.02, 55.12, 39.75],
    [11.64, 51.38, 39.02, 28.14],
    [23.71, 2.21, 32.28, 23.28],
    [23.22, 33.34, 10.4, 7.5],
    [56.57, 69.5, 10.4, 7.5],
    [44.45, 79.15, 15.4, 11.11],
    [10.58, 17.48, 10.4, 7.5],
  ],
  right: [
    [0, 21.64, 58.64, 40.92],
    [49.87, 49.26, 41.69, 29.2],
    [41.9, 1.77, 34.11, 23.89],
    [70.37, 34.32, 11.07, 7.72],
    [34.88, 71.55, 11.07, 7.72],
    [46.31, 86.81, 18.91, 13.2],
  ],
};

const workMarkerFillPath =
  "M437.628 7.18643C437.573 5.06214 437.518 2.93786 437.463 0.813568C411.449 1.13477 385.251 2.09137 359.082 3.67642C250.42 12.7414 136.46 19.2423 38.9358 79.7746C15.7801 95.7335 -5.23198 125.058 1.39605 156.677C7.2536 186.739 26.7157 209.476 46.4407 229.362C86.6693 268.375 134.583 298.098 182.38 325.388C196.753 333.505 210.751 340.991 224.379 347.872C327.234 397.339 458.085 450.957 566.954 378.826C671.833 298.186 627.07 123.16 515.24 76.2807C490.882 65.3005 464.357 60.0124 437.614 59.8132C437.568 61.9377 437.522 64.0623 437.476 66.1868C463.427 67.0792 488.747 72.862 511.705 83.894C617.41 131.092 653.244 297.383 558.082 366.92C460.271 431.382 333.049 381.988 232.041 332.697C218.656 325.938 204.88 318.586 190.71 310.612C143.526 283.818 96.2203 254.551 57.7987 217.775C38.8901 199.213 21.3627 177.832 16.6549 153.921C11.3957 129.54 26.449 106.85 47.5924 91.4717C137.261 33.7407 252.308 23.2862 359.692 12.048C385.682 9.83672 411.735 8.21305 437.628 7.18643Z";

function mountWorkMarkerRings() {
  let markerIndex = 0;

  document.querySelectorAll(".work-list > li, .work-grid-b > li").forEach((item) => {
    if (item.querySelector(".work-marker")) return;

    const maskId = `work-marker-mask-${markerIndex++}`;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("work-marker");
    svg.setAttribute("viewBox", "0 0 627 414");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("id", maskId);

    const maskStroke = document.createElementNS("http://www.w3.org/2000/svg", "path");
    maskStroke.classList.add("work-marker-mask-stroke");
    maskStroke.setAttribute("pathLength", "1");
    maskStroke.setAttribute("d", workMarkerFillPath);
    maskStroke.setAttribute("fill", "none");
    maskStroke.setAttribute("stroke", "white");
    maskStroke.setAttribute("stroke-width", "54");
    maskStroke.setAttribute("stroke-linecap", "round");
    maskStroke.setAttribute("stroke-linejoin", "round");

    const fill = document.createElementNS("http://www.w3.org/2000/svg", "path");
    fill.classList.add("work-marker-fill");
    fill.setAttribute("d", workMarkerFillPath);
    fill.setAttribute("mask", `url(#${maskId})`);

    mask.append(maskStroke);
    defs.append(mask);
    svg.append(defs, fill);
    item.append(svg);

    const resetMarker = () => {
      item.classList.remove("is-marker-drawn");
    };

    maskStroke.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "stroke-dashoffset") return;
      if (item.matches(":hover") || item.matches(":focus-within")) {
        item.classList.add("is-marker-drawn");
      }
    });

    item.addEventListener("mouseleave", resetMarker);
    item.addEventListener("blur", resetMarker, true);
  });
}

function mountEyes() {
  Object.entries(eyeLayouts).forEach(([name, boxes]) => {
    const cluster = document.querySelector(`[data-eyes="${name}"]`);
    if (!cluster) return;
    boxes.forEach(([left, top, width, height]) => {
      const eye = document.createElement("span");
      eye.className = "eye-blink";
      eye.setAttribute("aria-hidden", "true");
      eye.style.left = `${left}%`;
      eye.style.top = `${top}%`;
      eye.style.width = `${width}%`;
      eye.style.height = `${height}%`;
      eye.innerHTML = eyeMarkup;
      cluster.append(eye);
    });
  });
}

function blinkEye(el) {
  el.classList.add("is-closed");
  window.setTimeout(() => el.classList.remove("is-closed"), 220);
}

function startEyeBlinks() {
  mountEyes();
  if (reduceMotion.matches) return;

  const aboutEyes = [
    ...document.querySelectorAll('[data-eyes="about"] .eye-blink'),
  ];
  const otherEyes = [...document.querySelectorAll(".eye-blink")].filter(
    (el) => !el.closest('[data-eyes="about"]'),
  );

  const blinkGroup = (eyes, stagger) => {
    eyes.forEach((el) => {
      window.setTimeout(() => blinkEye(el), Math.random() * stagger);
    });
  };

  const cycleOthers = () => {
    if (!document.hidden) blinkGroup(otherEyes, 160);
    window.setTimeout(cycleOthers, 5400);
  };

  const cycleAbout = () => {
    if (!document.hidden) blinkGroup(aboutEyes, 280);
    window.setTimeout(cycleAbout, 18000);
  };

  window.setTimeout(cycleOthers, 900);
  window.setTimeout(cycleAbout, 6500);
}

startEyeBlinks();
mountWorkMarkerRings();

const HAND = { x: 52, y: 198 };

function setHeroIconPaths() {
  const stage = document.querySelector(".hero-visual");
  if (!stage) return;
  const { width, height } = stage.getBoundingClientRect();
  if (width < 8 || height < 8) return;

  const sx = width / 500;
  const sy = height / 343;
  const hx = HAND.x * sx;
  const hy = HAND.y * sy;

  stage.querySelectorAll(".hero-icon").forEach((icon) => {
    const ex = Number(icon.dataset.x) * sx;
    const ey = Number(icon.dataset.y) * sy;
    const lift = Math.max(48 * sy, Math.abs(ex - hx) * 0.28);
    const cx = (hx + ex) / 2 + (hx - ex) * 0.12;
    const cy = Math.min(hy, ey) - lift;
    icon.style.offsetPath = `path("M ${hx.toFixed(1)} ${hy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}")`;
  });

  stage.classList.add("is-ready");
}

setHeroIconPaths();
window.addEventListener("resize", setHeroIconPaths);

const ORB = {
  pink: [255, 66, 93],
  period: 10000,
  srcSize: 900,
  swirlStart: 1400,
  swirlEnd: 8400,
};

function easeInOut(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, t)));
}

function swirlAmount(elapsed) {
  const p = elapsed % ORB.period;
  if (p < ORB.swirlStart) return 0;
  if (p < 4200) return easeInOut((p - ORB.swirlStart) / 2800);
  if (p < 5600) return 1;
  if (p < ORB.swirlEnd) return 1 - easeInOut((p - 5600) / 2800);
  return 0;
}

function triggerOrbSparkles() {
  document.querySelectorAll(".orb-sparkle").forEach((el) => {
    el.classList.remove("is-sparkling");
    void el.getBoundingClientRect();
    el.classList.add("is-sparkling");
    el.addEventListener(
      "animationend",
      () => el.classList.remove("is-sparkling"),
      { once: true },
    );
  });
}

function loadLetterImage() {
  return fetch(`${import.meta.env.BASE_URL}assets/orb/studio-voodoo.svg`)
    .then((res) => res.text())
    .then((markup) => {
      const recolored = markup
        .replaceAll("#F9405A", "#FF7F92")
        .replace('width="300"', 'width="900"')
        .replace('height="300"', 'height="900"');
      const blob = new Blob([recolored], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    });
}

function startOrbSwirl() {
  const canvas = document.querySelector(".orb-swirl");
  if (!canvas || canvas.dataset.orbBound) return;
  canvas.dataset.orbBound = "1";
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let source = null;
  let srcData = null;
  let dest = null;
  let lastAmount = -1;
  let lastSparkleAmount = 0;
  let lastSparkleKind = "";
  let playing = !reduceMotion.matches;
  let start = 0;
  let frame = 0;

  function sizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const css = Math.min(rect.width, rect.height);
    const side = Math.max(1, Math.round(Math.min(css * dpr, 520)));
    if (canvas.width !== side || canvas.height !== side) {
      canvas.width = side;
      canvas.height = side;
      dest = ctx.createImageData(side, side);
      lastAmount = -1;
    }
    if (!dest || dest.width !== side) dest = ctx.createImageData(side, side);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }

  function paintReadable() {
    sizeCanvas();
    const { width: w, height: h } = canvas;
    const cx = w / 2;
    const cy = h / 2;
    const radius = w / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff425d";
    ctx.fill();
    ctx.clip();
    if (source) ctx.drawImage(source, 0, 0, w, h);
    ctx.restore();
  }

  function paintSwirl(amount) {
    sizeCanvas();
    const w = canvas.width;
    const out = dest.data;
    out.fill(0);
    const src = srcData.data;
    const srcSize = ORB.srcSize;
    const pink = ORB.pink;
    const cx = w / 2;
    const radius = cx;
    const radiusSq = radius * radius;
    const twist = amount * Math.PI * 2.15;
    const pull = amount * 0.12;
    const scale = srcSize / w;

    for (let y = 0; y < w; y += 1) {
      const dy = y - cx;
      const dySq = dy * dy;
      for (let x = 0; x < w; x += 1) {
        const dx = x - cx;
        const rSq = dx * dx + dySq;
        if (rSq > radiusSq) continue;

        const r = Math.sqrt(rSq);
        const t = 1 - r / radius;
        const falloff = t * t * (3 - 2 * t);
        const theta = Math.atan2(dy, dx) + twist * Math.pow(falloff, 1.15);
        const r2 = r * (1 - pull * falloff);
        const sx = (cx + r2 * Math.cos(theta)) * scale;
        const sy = (cx + r2 * Math.sin(theta)) * scale;
        const i = (y * w + x) * 4;
        out[i] = pink[0];
        out[i + 1] = pink[1];
        out[i + 2] = pink[2];
        out[i + 3] = 255;

        if (sx < 0 || sy < 0 || sx >= srcSize - 1 || sy >= srcSize - 1) continue;

        const x0 = sx | 0;
        const y0 = sy | 0;
        const fx = sx - x0;
        const fy = sy - y0;
        const i00 = (y0 * srcSize + x0) * 4;
        const i10 = (y0 * srcSize + x0 + 1) * 4;
        const i01 = ((y0 + 1) * srcSize + x0) * 4;
        const i11 = ((y0 + 1) * srcSize + x0 + 1) * 4;
        const w00 = (1 - fx) * (1 - fy);
        const w10 = fx * (1 - fy);
        const w01 = (1 - fx) * fy;
        const w11 = fx * fy;
        const a = src[i00 + 3] * w00 + src[i10 + 3] * w10 + src[i01 + 3] * w01 + src[i11 + 3] * w11;
        if (a < 2) continue;
        const lr = src[i00] * w00 + src[i10] * w10 + src[i01] * w01 + src[i11] * w11;
        const lg = src[i00 + 1] * w00 + src[i10 + 1] * w10 + src[i01 + 1] * w01 + src[i11 + 1] * w11;
        const lb = src[i00 + 2] * w00 + src[i10 + 2] * w10 + src[i01 + 2] * w01 + src[i11 + 2] * w11;
        const aa = a / 255;
        out[i] = lr * aa + pink[0] * (1 - aa);
        out[i + 1] = lg * aa + pink[1] * (1 - aa);
        out[i + 2] = lb * aa + pink[2] * (1 - aa);
      }
    }

    ctx.putImageData(dest, 0, 0);
  }

  function render(now) {
    if (!playing || document.hidden || !srcData) {
      frame = 0;
      return;
    }
    frame = window.requestAnimationFrame(render);
    const amount = swirlAmount(now - start);
    if (lastSparkleAmount < 0.02 && amount >= 0.02 && lastSparkleKind !== "start") {
      lastSparkleKind = "start";
      triggerOrbSparkles();
    } else if (lastSparkleAmount < 0.98 && amount >= 0.98 && lastSparkleKind !== "end") {
      lastSparkleKind = "end";
      triggerOrbSparkles();
    }
    lastSparkleAmount = amount;
    if (Math.abs(amount - lastAmount) < 0.002) return;
    lastAmount = amount;
    if (amount < 0.004) paintReadable();
    else paintSwirl(amount);
  }

  function play() {
    if (!playing || !srcData) return;
    if (!start) start = performance.now();
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  loadLetterImage()
    .then((img) => {
      source = img;
      const off = document.createElement("canvas");
      off.width = ORB.srcSize;
      off.height = ORB.srcSize;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      offCtx.imageSmoothingEnabled = true;
      offCtx.imageSmoothingQuality = "high";
      offCtx.drawImage(img, 0, 0, ORB.srcSize, ORB.srcSize);
      srcData = offCtx.getImageData(0, 0, ORB.srcSize, ORB.srcSize);
      paintReadable();
      play();
    })
    .catch(() => {
      paintReadable();
    });

  const host = canvas.closest(".about-stage") || canvas;
  new IntersectionObserver(
    ([entry]) => {
      playing = Boolean(entry?.isIntersecting) && !reduceMotion.matches;
      if (playing) play();
      else if (!srcData) return;
      else paintReadable();
    },
    { threshold: 0.25 }
  ).observe(host);

  reduceMotion.addEventListener("change", () => {
    playing = !reduceMotion.matches;
    if (playing) play();
    else {
      window.cancelAnimationFrame(frame);
      frame = 0;
      paintReadable();
    }
  });
}

startOrbSwirl();

function wheelDelta(event, axis) {
  const raw = axis === "x" ? event.deltaX : event.deltaY;
  if (event.deltaMode === 1) return raw * 16;
  if (event.deltaMode === 2) return raw * window.innerHeight;
  return raw;
}

function bindReelsSectionWheel(section) {
  const scroller = section.querySelector(".reels-scroll");
  if (!scroller) return;

  section.addEventListener(
    "wheel",
    (event) => {
      if (scroller.scrollWidth <= scroller.clientWidth) return;

      const dx = wheelDelta(event, "x");
      const dy = wheelDelta(event, "y");

      if (event.shiftKey && Math.abs(dy) > Math.abs(dx)) {
        scroller.scrollLeft += dy;
        event.preventDefault();
        return;
      }

      if (Math.abs(dx) <= Math.abs(dy) * 1.15 || dx === 0) return;

      scroller.scrollLeft += dx;
      event.preventDefault();
    },
    { passive: false },
  );
}

function centerReelTrack() {
  document.querySelectorAll(".reels-scroll").forEach((scroller) => {
    const extra = scroller.scrollWidth - scroller.clientWidth;
    const left = extra > 0 ? extra / 2 : 0;
    if (scroller.scrollTop !== 0) scroller.scrollTop = 0;
    if (Math.abs(scroller.scrollLeft - left) > 1) {
      scroller.scrollTo({ left, top: 0, behavior: "instant" });
    }
  });
}

const REEL_CONTROL_ICON = `<svg class="reel-control-icon" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
  <path class="reel-control-play" d="M19 14.5v19l16-9.5-16-9.5z" fill="currentColor" />
  <path class="reel-control-pause" d="M17 15h5v18h-5V15zm9 0h5v18h-5V15z" fill="currentColor" />
</svg>`;

function setReelPlaying(figure, playing) {
  figure.classList.toggle("is-playing", playing);
  const btn = figure.querySelector(".reel-control");
  if (btn) btn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
}

function stopReel(figure, { reset = true } = {}) {
  const video = figure.querySelector("video.reel-player");
  if (!video) return;
  video.muted = true;
  video.pause();
  if (reset) video.currentTime = 0;
  setReelPlaying(figure, false);
}

function startReelPlayers() {
  const figures = document.querySelectorAll(".reels figure");
  if (!figures.length) return;

  const scheduleCenterReelTrack = () => {
    requestAnimationFrame(() => centerReelTrack());
  };
  scheduleCenterReelTrack();
  window.addEventListener("resize", scheduleCenterReelTrack);
  window.addEventListener("load", scheduleCenterReelTrack, { once: true });

  document.querySelectorAll(".reels").forEach((section) => bindReelsSectionWheel(section));

  figures.forEach((figure) => {
    const video = figure.querySelector("video.reel-player");
    if (!video) return;

    video.preload = "none";
    video.pause();
    video.currentTime = 0;

    const posterSrc = video.getAttribute("poster");
    if (posterSrc) {
      const poster = document.createElement("img");
      poster.className = "reel-poster";
      poster.src = posterSrc;
      poster.alt = "";
      poster.setAttribute("aria-hidden", "true");
      poster.decoding = "async";
      poster.loading = "lazy";
      figure.insertBefore(poster, video);
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reel-control";
    btn.setAttribute("aria-label", "Play video");
    btn.innerHTML = REEL_CONTROL_ICON;
    figure.append(btn);

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!video.paused) {
        video.pause();
        setReelPlaying(figure, false);
        return;
      }

      figures.forEach((other) => {
        if (other !== figure) stopReel(other, { reset: true });
      });

      video.muted = false;
      video.volume = 1;
      const playback = video.play();
      if (playback) {
        playback.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    });

    video.addEventListener("playing", () => setReelPlaying(figure, true));
    video.addEventListener("pause", () => setReelPlaying(figure, false));
    video.addEventListener("ended", () => setReelPlaying(figure, false));
  });
}

startReelPlayers();

function initScrollReveal() {
  const targets = [];

  const addReveal = (elements, { delay = 0, media = false } = {}) => {
    elements.forEach((el, index) => {
      el.classList.add("scroll-reveal");
      if (media) el.classList.add("scroll-reveal--media");
      el.style.setProperty("--reveal-delay", `${delay + index * 0.08}s`);
      targets.push(el);
    });
  };

  document.querySelectorAll(".work-list").forEach((list) => {
    addReveal(list.querySelectorAll(":scope > li"));
  });

  document.querySelectorAll(".work-grid-b").forEach((grid) => {
    addReveal(grid.querySelectorAll(":scope > li"), { delay: 0.05, media: true });
  });

  const aboutVisual = document.querySelector(".about-visual");
  const aboutCopy = document.querySelector(".about-copy");
  if (aboutCopy) {
    aboutCopy.classList.add("scroll-reveal");
    targets.push(aboutCopy);
  }
  if (aboutVisual) {
    aboutVisual.classList.add("scroll-reveal", "scroll-reveal--media");
    aboutVisual.style.setProperty("--reveal-delay", "0.1s");
    targets.push(aboutVisual);
  }

  document.querySelectorAll(".reels-track").forEach((track) => {
    addReveal(track.querySelectorAll(":scope > figure"), { delay: 0.04 });
  });

  document.querySelectorAll(".cta").forEach((cta) => {
    addReveal(cta.querySelectorAll(":scope > h2, :scope > .btn"), { delay: 0.06 });
  });

  addReveal(document.querySelectorAll(".contact-intro, .contact-form"));

  addReveal(document.querySelectorAll(".case-title"));
  addReveal(document.querySelectorAll(".case-hero"), { media: true });
  addReveal(
    document.querySelectorAll(
      ".case-aside, main.case .case-body > .case-prose, main.case .case-block, .case-panel",
    ),
  );
  addReveal(document.querySelectorAll(".case-feature, .case-compare figure"), {
    delay: 0.04,
    media: true,
  });

  if (!targets.length) return;

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -7% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

initScrollReveal();

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm instanceof HTMLFormElement) {
  const submitButton = contactForm.querySelector(".contact-submit");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!(submitButton instanceof HTMLButtonElement)) return;

    const honey = contactForm.querySelector('input[name="_honey"]');
    if (honey instanceof HTMLInputElement && honey.value.trim()) return;

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    submitButton.disabled = true;
    if (contactStatus) {
      contactStatus.textContent = "Sending…";
      contactStatus.dataset.state = "pending";
    }

    const body = {
      name,
      email,
      message,
      _subject: "Work with Olivia — studio-voodoo.com",
    };
    if (company) body.company = company;

    try {
      const response = await fetch("https://formsubmit.co/ajax/olivia@studio-voodoo.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Request failed");

      contactForm.reset();
      if (contactStatus) {
        contactStatus.textContent = "Thanks — your message is on its way. I’ll reply soon.";
        contactStatus.dataset.state = "success";
      }
    } catch {
      if (contactStatus) {
        contactStatus.textContent =
          "Something went wrong. Email me directly at olivia@studio-voodoo.com.";
        contactStatus.dataset.state = "error";
      }
    } finally {
      submitButton.disabled = false;
    }
  });
}
