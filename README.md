# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Anime.js 12-Step Alohomora Entrance Spell**, an **Animated Marauder-Style Assignment Scroll** (RV University, B.Tech CSE AIML), aged parchment aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Cinematic 12-Step Alohomora Entrance Spell
- **12-Step Anime.js Choreography**:
  1. Environment darkens slightly, ambient magical particles become visible.
  2. Glowing golden magic circle drawn via SVG `strokeDashoffset` animation.
  3. Ancient runes (`○ ✧ ᚠ ☽ ✦`) rotate smoothly around circle.
  4. Golden sparks swirl inward toward lock from surrounding coordinates.
  5. Spellbook vibrates as magical energy builds.
  6. Lock glows with warm golden aura.
  7. Multi-layered synthesized Web Audio API sound plays (whoosh sweep, E-major bell chimes, low resonance sub-tone, high sparkling chimes).
  8. Lock unlocks with click sound, rotates open, falls with realistic bounce physics (`easing: 'easeOutBounce'`).
  9. Warm golden light escapes from inside book cover.
  10. 3D front cover flips open (`rotateY: -115deg`).
  11. Pages illuminate and expand smoothly into storefront background.
  12. Storefront elements stagger into view using Anime.js (`anime.stagger(100)`).

### 📜 2. Animated Marauder-Style Assignment Scroll
- **Enchanted Presentation**: Immediately after homepage reveal (and replayable via footer), an enchanted parchment scroll flies into screen with 3D rotation, settles in center, and unfolds.
- **Academic Credentials & Wizarding Text**:
  - *Title*: The Wizarding Assignment Scroll
  - *Body*: "This enchanted catalogue was carefully crafted as the Second Internal Assignment for Semester One. Our objective was to create a fully static magical storefront using only the fundamental arts of HTML, CSS, and JavaScript, without relying upon backend enchantments."
  - **Created By**: Bhuvi Singhal & Navi...
  - **Academy**: RV University
  - **Course**: B.Tech (Hons) CSE AIML
  - **Semester**: Semester I
  - **Assessment**: Internal II
- **Auto-Exit & Fold**: Automatically folds, rotates, lifts upward, shrinks, and dissolves after 5 seconds, or closes instantly via the close button.

### 📜 3. Footer Integration & Replay Ability
- Includes a `"📜 View Assignment Scroll"` button in the Diagon Alley notice board footer on all pages.
- Clicking it replays the exact Marauder Map scroll animation timeline dynamically without page reload.

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page with Anime.js 3D Alohomora spellbook overlay & Assignment Scroll
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Delivery options (Owl Post, Floo Network, Apparition Direct)
├── style.css         # CSS 3D perspective rules, typography, border fixes, & scroll styling
├── script.js        # Anime.js entrance timeline, Web Audio synth, Marauder Scroll & cart logic
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
