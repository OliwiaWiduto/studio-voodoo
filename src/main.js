import "./style.css";

const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");

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
  "USER EXPERIENCE",
];

const heading = document.querySelector("#hero-heading");
const accent = document.querySelector(".hero-accent");
const typed = document.querySelector("[data-typewriter]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

function blinkAllEyes() {
  document.querySelectorAll(".eye-blink").forEach((el) => {
    window.setTimeout(() => blinkEye(el), Math.random() * 160);
  });
}

function startEyeBlinks() {
  mountEyes();
  if (reduceMotion.matches) return;

  const cycle = () => {
    if (!document.hidden) blinkAllEyes();
    window.setTimeout(cycle, 5400);
  };

  window.setTimeout(cycle, 900);
}

startEyeBlinks();

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
};

function easeInOut(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, t)));
}

function swirlAmount(elapsed) {
  const p = elapsed % ORB.period;
  if (p < 1400) return 0;
  if (p < 4200) return easeInOut((p - 1400) / 2800);
  if (p < 5600) return 1;
  if (p < 8400) return 1 - easeInOut((p - 5600) / 2800);
  return 0;
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
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let source = null;
  let srcData = null;
  let dest = null;
  let lastAmount = -1;
  let playing = !reduceMotion.matches;
  let start = performance.now();
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
    if (Math.abs(amount - lastAmount) < 0.002) return;
    lastAmount = amount;
    if (amount < 0.004) paintReadable();
    else paintSwirl(amount);
  }

  function play() {
    if (frame || !playing || !srcData) return;
    start = performance.now();
    lastAmount = -1;
    frame = window.requestAnimationFrame(render);
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

function centerReelTrack() {
  const scroller = document.querySelector(".reels");
  if (!scroller) return;
  const extra = scroller.scrollWidth - scroller.clientWidth;
  scroller.scrollLeft = extra > 0 ? extra / 2 : 0;
}

function startReelPlayers() {
  const figures = document.querySelectorAll(".reels figure");
  if (!figures.length) return;

  centerReelTrack();
  window.addEventListener("resize", centerReelTrack);

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  const play = (video) => {
    const playback = video.play();
    if (playback) playback.catch(() => {});
  };

  const pause = (video) => {
    video.pause();
    video.currentTime = 0;
  };

  figures.forEach((figure) => {
    const video = figure.querySelector("video.reel-player");
    if (!video) return;

    figure.addEventListener("pointerenter", () => {
      if (reduceMotion.matches || !canHover.matches) return;
      play(video);
    });
    figure.addEventListener("pointerleave", () => {
      pause(video);
    });
  });

  if (reduceMotion.matches || canHover.matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video.reel-player");
        if (!video) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) play(video);
        else pause(video);
      });
    },
    { threshold: [0.6] },
  );

  figures.forEach((figure) => io.observe(figure));
}

startReelPlayers();
