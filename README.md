# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Cinematic GSAP/Anime.js Alohomora Entrance Spell** (session-based, only triggers on initial load, NOT when clicking Home link), an authentic **Dense Marauder's Map Information Scroll** with animated footprints & hand-drawn SVG pathways, aged parchment aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Cinematic Alohomora Spell Entrance (Session-Scoped & Bug Fixed)
- **Session-Based & Navigation Fixed**: The Alohomora spell entrance activates **only on initial site visit or browser refresh**. Clicking `"Home"` in the main navigation menu cleanly displays the storefront without re-triggering the entrance animation overlay.
- **Visual Anatomy of a Wand-Cast Spell**:
  1. **Phase 1 (Intent & Anticipation)**: Environment darkens, ambient dust pauses, lock emits a faint pulse, low magical hum & soft leather sound begins.
  2. **Phase 2 (Wand Trail & Energy Drawing)**: A curved golden spark trail arcs towards the lock, invisible wand stroke-animates magic circle (`strokeDashoffset`).
  3. **Phase 3 (Runes & Inward Streams)**: High crystal chimes & bell harmonics play as energy streams spiral inward to the lock.
  4. **Phase 4 (Lock Resistance & Unlocking)**: Lock vibrates with metal tension sound $\rightarrow$ crisp latch click $\rightarrow$ lock drops with bounce.
  5. **Phase 5 (Golden Burst & Pages Flutter)**: Warm golden light escapes, 3D leather cover opens, pages flutter open with paper sound.
  6. **Phase 6 (Camera Drift & Lingering Magic)**: Floating camera enters pages into storefront, leaving residual golden dust particles that fade after 2 seconds.

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

### 📜 3. Footer Integration
- Includes a `"📜 View Assignment Scroll"` button in the Diagon Alley notice board footer on all pages for manual replay at any time.

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page with Anime.js/GSAP 3D Alohomora spellbook overlay & Marauder Map
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Delivery options (Owl Post, Floo Network, Apparition Direct)
├── favicon.svg       # Magical wizard hat & golden runes SVG favicon
├── style.css         # CSS 3D perspective rules, sepia parchment texture, & responsive styles
├── script.js        # GSAP/Anime.js entrance timeline, Web Audio synth, Marauder Map & cart logic
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
