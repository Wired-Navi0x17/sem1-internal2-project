# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Anime.js Alohomora Entrance Spell** (runs on every page load/refresh), an authentic **Dense Marauder's Map Information Scroll** with animated footprints & hand-drawn SVG pathways, aged parchment aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Alohomora 3D Entrance Spell (Every Refresh)
- **Runs on Every Load/Refresh**: The Alohomora spell entrance activates every time `index.html` is visited or refreshed.
- **12-Step Anime.js Choreography**:
  1. Environment darkens slightly, ambient magical particles become visible.
  2. Glowing golden magic circle drawn via SVG `strokeDashoffset` animation.
  3. Ancient runes (`○ ✧ ᚠ ☽ ✦`) rotate smoothly around circle.
  4. Golden sparks swirl inward toward lock from surrounding coordinates.
  5. Spellbook vibrates as magical energy builds.
  6. Lock glows with warm golden aura.
  7. Multi-layered synthesized Web Audio API sound plays.
  8. Lock unlocks with click sound, rotates open, falls with realistic bounce physics (`easing: 'easeOutBounce'`).
  9. Warm golden light escapes from inside book cover.
  10. 3D front cover flips open (`rotateY: -115deg`).
  11. Pages illuminate and expand smoothly into storefront background.
  12. Storefront elements stagger into view using Anime.js (`anime.stagger(100)`).

### 📜 2. Authentic Dense Marauder's Map Information Scroll
- **Zoom & Scale Fix**: Optimized scroll scaling (`max-width: 820px`, `width: 92%`) ensuring comfortable, unzoomed viewing when summoned.
- **Dense Map Background (8% Opacity)**: Features castle floor plans, corridors, room outlines, hidden passage sketches, and Astronomy tower staircases.
- **25% Enlarged Compass Rose**: Positioned beneath pathways, softly glowing on hover.
- **Hand-Drawn SVG Pathways & Animated Footprints**:
  - Anime.js `strokeDashoffset` path inking.
  - Footprints (`.walkingFootprint`) step across pathways sequentially, pausing at each landmark to illuminate it.
- **Wizarding Academic Decree Text & Map Landmarks**:
  - *"The Ministry of Magical Education hereby records that the apprentices named below have successfully completed the Second Internal Assignment of the First Semester..."*
  - 🪶 **Created By**: Bhuvi Singhal & Navi...
  - 🏰 **Academy**: RV University
  - 📖 **Course**: B.Tech (Hons) CSE AIML
  - ⌛ **Semester**: Semester I
  - 🏆 **Assessment**: Internal Assessment II
- **Tilted Wax Seal**: Tilted by -8 degrees over the paper border with realistic drop shadow.
- **Faint Fold Lines & Burnt Edges**: Includes vertical/horizontal parchment crease lines and dark burnt vignette edges.

### 📜 3. Frequency Rules & Footer Integration
- Marauder Map Scroll auto-triggers **once per day** on initial entry via `localStorage.getItem('marauderScrollLastShownDate')`.
- Includes a `"📜 View Assignment Scroll"` button in the Diagon Alley notice board footer on all pages for manual replay at any time.

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page with Anime.js 3D Alohomora spellbook overlay & Marauder Map
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Delivery options (Owl Post, Floo Network, Apparition Direct)
├── favicon.svg       # Magical wizard hat & golden runes SVG favicon
├── style.css         # CSS 3D perspective rules, sepia parchment texture, & responsive styles
├── script.js        # Anime.js entrance timeline, Web Audio synth, Marauder Map & cart logic
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
