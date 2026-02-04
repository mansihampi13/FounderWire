// ====== EDIT THESE ======
const CONFIG = {
  updatedText: "today (verified by vibes)",
  readsText: "69,420", // nice
  // Put your boyfriend's name / nickname here if you want:
  // headlinePersonalization: "BREAKING: [Name] accused of being too lovable"
  headlinePersonalization: "",
};

// Add as many pics as you want.
// Make sure these exact files exist in your repo at /assets/pics/
const PHOTOS = [
  { src: "assets/pics/pic01.jpg", caption: "BREAKING: Founders spotted being cute (allegedly)." },
  { src: "assets/pics/pic02.jpg", caption: "Exclusive: Happiness metrics exceed forecast." },
  { src: "assets/pics/pic03.jpg", caption: "Insiders confirm: this is not a PR stunt." },
  { src: "assets/pics/pic04.jpg", caption: "Investor deck updated: ‘she’s the moat’." },
  { src: "assets/pics/pic05.jpg", caption: "Leaked roadmap: more dates, more memories." },
  { src: "assets/pics/pic06.jpg", caption: "Breaking: chemistry confirmed (lab pending)." },
  { src: "assets/pics/pic07.jpg", caption: "Market reaction: heart rate up 📈" },
  { src: "assets/pics/pic08.jpg", caption: "Internal email: ‘stop being this adorable’ (ignored)." },
  { src: "assets/pics/pic09.jpg", caption: "Security note: affection encryption cannot be cracked." },
  { src: "assets/pics/pic10.jpg", caption: "Rumor: co-founder is also the love of my life." },
  { src: "assets/pics/pic11.jpg", caption: "Update: vibes remain immaculate." },
  { src: "assets/pics/pic12.jpg", caption: "Final report: long-term hold. No exits." },
];
// ========================

const $ = (id) => document.getElementById(id);

function scrollToEl(el) {
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setTopMeta() {
  $("updatedAt").textContent = CONFIG.updatedText;
  $("readsCounter").textContent = CONFIG.readsText;
}

function buildGallery() {
  const grid = $("galleryGrid");
  grid.innerHTML = "";

  PHOTOS.forEach((p, idx) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.setAttribute("aria-label", `Open photo ${idx + 1}`);

    const img = document.createElement("img");
    img.src = p.src;
    img.alt = `Photo ${idx + 1}`;

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.textContent = p.caption;

    tile.appendChild(img);
    tile.appendChild(cap);
    tile.addEventListener("click", () => openLightbox(idx));

    grid.appendChild(tile);
  });
}

let currentIndex = 0;

function openLightbox(idx) {
  currentIndex = idx;
  const lb = $("lightbox");
  lb.classList.add("show");
  lb.setAttribute("aria-hidden", "false");
  renderLightbox();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = $("lightbox");
  lb.classList.remove("show");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderLightbox() {
  const p = PHOTOS[currentIndex];
  const img = $("lightboxImg");
  img.src = p.src;
  $("lightboxCaption").textContent = `${currentIndex + 1}/${PHOTOS.length} — ${p.caption}`;
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
  renderLightbox();
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % PHOTOS.length;
  renderLightbox();
}

function setupButtons() {
  $("openStoryBtn").addEventListener("click", () => scrollToEl($("story")));
  $("openGalleryBtn").addEventListener("click", () => scrollToEl($("gallery")));
  $("scrollGalleryBtn").addEventListener("click", () => scrollToEl($("gallery")));
  $("scrollRapBtn").addEventListener("click", () => scrollToEl($("rap")));
  $("skipToRapBtn").addEventListener("click", () => scrollToEl($("rap")));

  $("revealRapBtn").addEventListener("click", () => {
    const box = $("rapContent");
    box.hidden = false;
    $("confettiNote").classList.add("show");
    scrollToEl($("rap"));
  });

  $("collapseRapBtn").addEventListener("click", () => {
    $("rapContent").hidden = true;
    $("confettiNote").classList.remove("show");
  });

  $("copyLyricsBtn").addEventListener("click", async () => {
    const text = $("lyrics").innerText;
    try {
      await navigator.clipboard.writeText(text);
      $("confettiNote").textContent = "✅ Copied. Now go drop it like it’s a product launch.";
      $("confettiNote").classList.add("show");
      setTimeout(() => {
        $("confettiNote").textContent = "✅ Lyrics deployed. Side effects: blushing.";
      }, 2200);
    } catch {
      $("confettiNote").textContent = "Couldn’t auto-copy on this device — just select and copy manually ❤️";
      $("confettiNote").classList.add("show");
    }
  });

  // Lightbox controls
  $("lightboxBackdrop").addEventListener("click", closeLightbox);
  $("lightboxClose").addEventListener("click", closeLightbox);
  $("lightboxPrev").addEventListener("click", prevPhoto);
  $("lightboxNext").addEventListener("click", nextPhoto);

  window.addEventListener("keydown", (e) => {
    const lbOpen = $("lightbox").classList.contains("show");
    if (!lbOpen) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  });
}

function tickerLoopFix() {
  // Duplicate ticker content so the animation feels seamless.
  const track = $("tickerTrack");
  const clone = track.cloneNode(true);
  clone.removeAttribute("id");
  track.parentElement.appendChild(clone);
}

function init() {
  setTopMeta();
  buildGallery();
  setupButtons();
  tickerLoopFix();
}

init();
