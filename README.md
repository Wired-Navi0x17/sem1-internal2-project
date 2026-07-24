# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, an interactive **Anime.js "Cast Alohomora" 3D Spellbook Entrance**, aged parchment aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🪄 1. Anime.js "Cast Alohomora" 3D Spellbook Entrance
- **Full Viewport Dark Screen**: Completely obscures the storefront upon initial visit until the spell sequence completes.
- **3D Book Architecture**: Layered 3D book cover, metal lock, leather texture, gold corner plates, and embossed gold typography.
- **SVG Path & Dash Animation**: SVG magic circle paths animated via Anime.js `strokeDashoffset` (`Outer Circle` $\rightarrow$ `Inner Circle` $\rightarrow$ `Runes`).
- **Anticipation Delays & Lock Physics**: 200ms spell casting pause, lock vibration, gold glow pulse, and realistic bounce drop (`easing: 'easeOutBounce'`).
- **3D Cover Flip & Page Transformation**: 3D front cover flips open (`rotateY: -115deg`), emitting a golden light burst while pages expand to reveal the storefront.
- **SessionStorage Memory & Skip Link**: Includes `sessionStorage.setItem('spellbookOpened', 'true')` so returning to Home during the same browsing session skips the entrance, plus a discrete `"Skip Animation"` button.
- **Staggered Homepage Entrance**: Upon opening, storefront elements (header, hero title, product cards) stagger into place using Anime.js (`anime.stagger(100)`).

### 🎶 2. Multi-Layer Web Audio API Sound Synthesizer
- Generates 100% self-contained sound effects with **zero external audio dependencies**:
  - **Spell Sweep**: Filtered noise oscillator frequency ramp.
  - **Magical Chimes**: Layered E-major high sine wave bells.
  - **Lock Release**: Square wave impulse click sound.

### 📜 3. Uniform Border System (Left Yellow Border Removed)
- Removed asymmetric 5px yellow left borders on card components ([style.css](style.css)), replacing them with a uniform `1px solid var(--border-gold)` border with subtle corner radii.

### 📖 4. Old Novel Typography & Ornaments
- Headings: **Cinzel** & **Cormorant Garamond** (magical serif display typography).
- Body Text: **EB Garamond** & **Crimson Text** (styled to resemble an old novel).
- Section Dividers: Golden decorative glyph dividers (`✧ ☽ ✧`).

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page with Anime.js 3D Alohomora spellbook overlay
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Delivery options (Owl Post, Floo Network, Apparition Direct)
├── style.css         # CSS 3D perspective rules, typography, border fixes, & responsive styles
├── script.js        # Anime.js entrance timeline, Web Audio synth, Cauldron cart & modals
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
*Diagon Alley, London &bull; Opposite Gringotts Wizarding Bank*
