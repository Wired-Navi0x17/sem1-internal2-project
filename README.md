# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Cinematic GSAP/Anime.js Alohomora Entrance Spell** (24-hour persistence), a **Signature Hanging Marauder's Map System** with exclusive pull-cord trigger, an interactive **Cauldron Cart Drawer GUI** with currency converter, multi-layered Web Audio sound design, sequential footprint reveals, and an official Ministry Decree of Academic Distinction.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Cinematic Alohomora Spell Entrance (24-Hour Persistence)
- **24-Hour Persistence**: Plays once every 24 hours (`localStorage.getItem('alohomora_last_played_time')`). Returning visitors within 24 hours open directly to the Diagon Alley storefront.
- **Multi-Phase Wand & Lock Mechanics**:
  1. **Phase 1 (Intent & Anticipation)**: Environment darkens, ambient dust pauses, lock emits a faint pulse, low magical hum & soft leather sound begins.
  2. **Phase 2 (Wand Trail & Energy Drawing)**: A curved golden spark trail arcs towards the lock, invisible wand stroke-animates magic circle (`strokeDashoffset`).
  3. **Phase 3 (Runes & Inward Streams)**: High crystal chimes & bell harmonics play as energy streams spiral inward to the lock.
  4. **Phase 4 (Lock Resistance & Unlocking)**: Lock vibrates with metal tension sound $\rightarrow$ heavy latch click $\rightarrow$ lock drops with bounce physics (`bounce.out`).
  5. **Phase 5 (Golden Burst & Pages Flutter)**: Warm golden light escapes, 3D leather cover opens, pages flutter open with paper sound.
  6. **Phase 6 (Camera Drift & Lingering Magic)**: Floating camera enters pages into storefront, leaving residual golden dust particles that fade after entry.

### 🧪 2. Interactive Cauldron Cart Drawer GUI
- **Slide-Over Dark Glassmorphic Drawer**: Triggered by clicking the top navigation Cauldron badge on any page.
- **Dynamic Quantity & Item Management**: Add items, increase/decrease quantities (`-` / `+`), and remove items with instant subtotal updates.
- **Magical Currency Converter**: Live calculation converting Galleons to Sickles and Knuts (1 Galleon = 17 Sickles = 493 Knuts).
- **Owl Post Express Checkout**: Triggers an official Ministry Dispatch Receipt modal with randomized order reference numbers (`#WIZ-XXXXX`) and sound effects.
- **`localStorage` Persistence**: Keeps cart state saved between page reloads and navigation.

### 📜 3. Signature Hanging Marauder's Map System (Exclusive Rope Trigger)
- **Exclusive Rope Trigger (`isMapAnimating`)**: Clicking `"Home"`, `"Contact"`, `"Delivery"`, product cards, or any other UI elements will **NEVER** trigger the map animation. The map ONLY activates when the upper-right hanging cord is physically pulled!
- **Physical Pull Cord Mechanism**:
  - Engraved brass ceiling mount (`.ceilingMount`)
  - Braided golden rope with woven texture (`.ropeLine`)
  - Small rune ring (`.runeRingSmall`)
  - Suspended glowing crystal gem (`.crystalGem`) with soft golden aura
  - Layered fabric tassel (`.tasselHead`, `.tasselSkirt`)
  - Idle side-to-side swinging (`@keyframes cordSwayIdle`)
- **Ceiling Scroll Tube & Rollers**:
  - Lowering parchment tube from ceiling (`scrollRollerTop`, `scrollRollerBottom`) attached to upper mechanism.
  - Rollers rotate open, paper unfolds, fold lines and curled corners settle into view.
- **Layered Web Audio API Sound Timeline**:
  - **Hover**: Crystal shimmer (`playHoverShimmer()`)
  - **Press & Drag**: Rope movement & fabric tension (`playRopeTensionSound()`)
  - **Release**: Elastic spring bounce $\rightarrow$ ceiling mechanism unlocks with brass click (`playCeilingUnlockSound()`)
  - **Lowering**: Wood creak & parchment unfurling (`playScrollUnrollSound()`)
  - **Ink Drawing**: Quill scratching & sparkles (`playQuillInkSound()`)
  - **Footprints**: Soft alternating footsteps (`playFootstepSound()`)
  - **Reveal**: Warm orchestral swell (`playFinalSwellSound()`)
  - **Dismissal**: Parchment rolling & wind (`playRetractSound()`)
- **Sequential Footprint Reveal Destinations**:
  1. Title & Subtitle (`THE WIZARDING ASSIGNMENT SCROLL`)
  2. Decree Quote (*"The Ministry of Magical Education hereby records..."*)
  3. 🪶 Created By: Bhuvi Singhal & Navi...
  4. 🏰 Academy: RV University
  5. 📖 Course: B.Tech (Hons) CSE AIML
  6. ⌛ Semester: Semester I
  7. 🏆 Assessment: Internal Assessment II
  8. Official Ministry Approval Seal Stamp
- **Manual Dismissal Only**: Dismissed via parchment close button (`#scrollCloseBtn`) or clicking outside the parchment overlay!

---

## 📁 Scalable Directory Structure

```
Assignment2/
├── static/
│   ├── css/
│   │   └── style.css                 # Master CSS stylesheet, design tokens & cart drawer GUI styles
│   ├── js/                           # Modular JS architecture
│   │   ├── alohomora.js              # 3D Alohomora spellbook entrance timeline
│   │   ├── audio.js                  # Web Audio API synth sound engine
│   │   ├── cart.js                   # Cauldron cart drawer GUI controller & state manager
│   │   ├── contact-form.js           # Owl post & prophet animations
│   │   ├── main.js                   # Entry point & HTMLLoader component orchestrator
│   │   ├── scroll-map.js             # Marauder's Map pull-cord & footprint reveal engine
│   │   └── ui.js                     # Ambient sparkles, particle canvas & mobile menu
│   ├── images/                       # High-res item photography (clean naming)
│   │   ├── deluminator.jpg
│   │   ├── golden-snitch.jpg
│   │   ├── invisibility-cloak.jpg
│   │   ├── marauders-map.jpg
│   │   ├── nimbus-2001.jpg
│   │   ├── pensieve.jpg
│   │   ├── time-turner.jpg
│   │   └── wand.jpg
│   └── assets/                       # SVG vector textures & favicons
│       ├── background.svg
│       └── favicon.svg
├── templates/
│   └── components/                   # Modular HTML templates & overlays
│       ├── alohomora-entrance.html   # 3D Spellbook entrance overlay
│       ├── assignment-scroll.html    # Marauder's Map & hanging pull-cord mechanism
│       └── cauldron-cart.html        # Interactive Cauldron Cart Drawer GUI
├── index.html                        # Storefront page entrypoint
├── contact.html                      # Owl Post / Contact page entrypoint
├── deliv.html                        # Delivery process page entrypoint
├── LICENSE                           # MIT License
└── README.md                         # Documentation
```

---

## 🛠️ Local Setup

1. **Serve locally**:
   - Open `index.html` directly in any web browser, or serve with python HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## ✒️ Credits & Authors

Created by **Bhuvi Singhal & Navi...**  
*RV University &bull; B.Tech (Hons) CSE AIML &bull; Semester I, Internal II*
