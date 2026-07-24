# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Cinematic GSAP/Anime.js Alohomora Entrance Spell** (runs on every page load and refresh), an **Upper-Right Hanging Castle Pull Cord** mechanism, an authentic **Dense Marauder's Map Information Scroll** with animated footprints & hand-drawn SVG pathways, aged parchment aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Cinematic Alohomora Spell Entrance (Plays on Every Load/Refresh)
- **Every Page Load & Refresh**: The 3D Alohomora spellbook entrance displays on every page load or refresh of `index.html` without using localStorage or sessionStorage to skip.
- **Visual Anatomy of a Wand-Cast Spell**:
  1. **Phase 1 (Intent & Anticipation)**: Environment darkens, ambient dust pauses, lock emits a faint pulse, low magical hum & soft leather sound begins.
  2. **Phase 2 (Wand Trail & Energy Drawing)**: A curved golden spark trail arcs towards the lock, invisible wand stroke-animates magic circle (`strokeDashoffset`).
  3. **Phase 3 (Runes & Inward Streams)**: High crystal chimes & bell harmonics play as energy streams spiral inward to the lock.
  4. **Phase 4 (Lock Resistance & Unlocking)**: Lock vibrates with metal tension sound $\rightarrow$ crisp latch click $\rightarrow$ lock drops with bounce.
  5. **Phase 5 (Golden Burst & Pages Flutter)**: Warm golden light escapes, 3D leather cover opens, pages flutter open with paper sound.
  6. **Phase 6 (Camera Drift & Lingering Magic)**: Floating camera enters pages into storefront, leaving residual golden dust particles that fade after entry.

### 📜 2. Interactive Upper-Right Hanging Castle Pull Cord Mechanism
- **Upper-Right Corner Cord**: Replaces the footer button with an authentic hanging braided golden cord (`#pullCordContainer`), crystal gem, and tassel.
- **Idle Sway & Drag Physics**: Gently sways while idle (`@keyframes cordSwayIdle`). On click/drag, the rope stretches downward, playing crystal chimes. Releasing the cord triggers spring-bounce physics and unrolls the Marauder Map parchment.

### 📜 3. Authentic Dense Marauder's Map Information Scroll
- **Parchment Unroll & Retract**: Unrolls from the ceiling upon pulling the cord, sways gently while descending, and auto-retracts smoothly back up after 6 seconds with no visible countdown timers.
- **Dense Map Background (8% Opacity)**: Features castle floor plans, corridors, room outlines, hidden passage sketches, and Astronomy tower staircases.
- **25% Enlarged Compass Rose**: Positioned beneath pathways, softly glowing on hover.
- **Hand-Drawn SVG Pathways & Animated Footprints**: Footprints (`.walkingFootprint`) step across pathways sequentially, pausing at each landmark to illuminate it.
- **Wizarding Academic Decree Text & Map Landmarks**:
  - *"The Ministry of Magical Education hereby records that the apprentices named below have successfully completed the Second Internal Assignment of the First Semester..."*
  - 🪶 **Created By**: Bhuvi Singhal & Navi...
  - 🏰 **Academy**: RV University
  - 📖 **Course**: B.Tech (Hons) CSE AIML
  - ⌛ **Semester**: Semester I
  - 🏆 **Assessment**: Internal Assessment II

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page with Anime.js/GSAP 3D Alohomora spellbook overlay, pull cord & Marauder Map
├── contact.html      # Diagon Alley location details, owl post form & pull cord
├── deliv.html        # Delivery options & pull cord
├── favicon.svg       # Magical wizard hat & golden runes SVG favicon
├── style.css         # CSS 3D perspective rules, sepia parchment texture, & pull cord styles
├── script.js        # GSAP/Anime.js entrance timeline, Web Audio synth, pull cord & cart logic
├── background.svg    # Custom aged parchment & dark stone SVG texture
└── images/           # Magical item photography and webp backgrounds
```

---

## 🛠️ Getting Started & Local Setup

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Wired-Navi0x17/sem1-internal2-project.git
   cd sem1-internal2-project
   ```

2. **Run locally**:
   - Open `index.html` directly in any web browser, or serve with python HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## ✒️ Credits & Authors

Created by **Bhuvi Singhal & Navi...**  
*RV University &bull; B.Tech (Hons) CSE AIML &bull; Semester I, Internal II*
