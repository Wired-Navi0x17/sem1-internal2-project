# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Cinematic GSAP/Anime.js Alohomora Entrance Spell** (runs on every page load and refresh), a **Signature Hanging Marauder's Map** with physical pull-cord mechanics, multi-layered Web Audio sound design, animated alternating footprints, and an official Ministry Decree of Academic Distinction.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Cinematic Alohomora Spell Entrance (Plays on Every Load/Refresh)
- **Every Page Load & Refresh**: The 3D Alohomora spellbook entrance displays on every page load or refresh of `index.html`.
- **Multi-Phase Wand & Lock Mechanics**:
  1. **Phase 1 (Intent & Anticipation)**: Environment darkens, ambient dust pauses, lock emits a faint pulse, low magical hum & soft leather sound begins.
  2. **Phase 2 (Wand Trail & Energy Drawing)**: A curved golden spark trail arcs towards the lock, invisible wand stroke-animates magic circle (`strokeDashoffset`).
  3. **Phase 3 (Runes & Inward Streams)**: High crystal chimes & bell harmonics play as energy streams spiral inward to the lock.
  4. **Phase 4 (Lock Resistance & Unlocking)**: Lock vibrates with metal tension sound $\rightarrow$ heavy latch click $\rightarrow$ lock drops with bounce physics (`bounce.out`).
  5. **Phase 5 (Golden Burst & Pages Flutter)**: Warm golden light escapes, 3D leather cover opens, pages flutter open with paper sound.
  6. **Phase 6 (Camera Drift & Lingering Magic)**: Floating camera enters pages into storefront, leaving residual golden dust particles that fade after entry.

### 📜 2. Signature Hanging Marauder's Map (Strict Bug Fixed)
- **Strict Navigation Guard (`isMapAnimating`)**: Clicking `"Home"`, `"Contact"`, `"Delivery"`, product cards, or any other UI elements will **NEVER** trigger the map animation. The map ONLY activates when the upper-right hanging cord is physically pulled!
- **Hanging Mechanism Aesthetics**:
  - Engraved brass ceiling mount (`.ceilingMount`)
  - Braided golden rope with woven texture (`.ropeLine`)
  - Small rune ring (`.runeRingSmall`)
  - Suspended glowing crystal gem (`.crystalGem`) with soft golden aura
  - Layered fabric tassel (`.tasselHead`, `.tasselSkirt`)
  - Idle side-to-side swinging (`@keyframes cordSwayIdle`)
- **Pull Interaction & Audio Timeline**:
  - **Hover**: Crystal shimmer (`playHoverShimmer()`)
  - **Press & Drag**: Rope stretches downward, tension builds (`playRopeTensionSound()`)
  - **Release**: Spring bounce elasticity $\rightarrow$ ceiling mechanism unlocks with brass click (`playCeilingUnlockSound()`)
  - **Lowering**: Wood creak & parchment unfurling (`playScrollUnrollSound()`)
  - **Ink Drawing**: Quill scratching & sparkles (`playQuillInkSound()`)
  - **Footprints**: Soft alternating footsteps (`playFootstepSound()`)
  - **Reveal**: Warm orchestral swell (`playFinalSwellSound()`)
  - **Auto Retraction**: Parchment rolling & wind (`playRetractSound()`)
- **Sequential Footprint Reveal Destinations**:
  1. Title & Subtitle (`THE WIZARDING ASSIGNMENT SCROLL`)
  2. Decree Quote (*"The Ministry of Magical Education hereby records..."*)
  3. 🪶 Created By: Bhuvi Singhal & Navi...
  4. 🏰 Academy: RV University
  5. 📖 Course: B.Tech (Hons) CSE AIML
  6. ⌛ Semester: Semester I
  7. 🏆 Assessment: Internal Assessment II
  8. Official Ministry Approval Seal Stamp
- **Clean Auto Retraction**: Retracts back up into the ceiling after 5 seconds with no visible countdown timers, resetting the hanging cord cleanly for the next pull.

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
