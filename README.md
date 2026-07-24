# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, old parchment/dark stone aesthetics, Cormorant & EB Garamond typography, Reicon vector icons, and real-time Cauldron purchasing state.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminator Devices**.
- Calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 📜 1. Aged Parchment & Dark Stone Aesthetic
- Built with a custom, tileable SVG background texture ([background.svg](background.svg)) featuring aged stone noise, dark violet stain patches (`#250d3a`), and subtle gold star runes.
- Enhanced with a full-viewport **candlelight vignette overlay** in CSS (`radial-gradient` around page boundaries).

### 📖 2. Old Novel Typography & Ornaments
- Headings: **Cinzel** & **Cormorant Garamond** (magical serif display typography).
- Body Text: **EB Garamond** & **Crimson Text** (styled to resemble an old novel).
- Section Dividers: Golden decorative glyph dividers (`✧ ☽ ✧`) with subtle radial fade lines instead of plain hr rules.

### 🦉 3. Reicon Vector SVGs (Zero Emoji Policy)
- Replaced all front-end emojis with clean, responsive vector SVGs sourced from the **Reicon** icon system:
  - **Standard Owl Post**: `send` vector SVG.
  - **Floo Network Express**: `flame` vector SVG.
  - **Apparition Direct**: `bolt-lightning` vector SVG.
  - **Cauldron Shopping Bag**: `shopping-bag` vector SVG.

### 🌟 4. Ambient Sparkles & Floating Animations
- Automatic background golden dust particle generator in [script.js](script.js).
- Floating product card micro-animations and embossed 3D golden buttons with gold gradient sweep on hover.

### 🧪 5. Interactive Cauldron Purchasing Cart & Quick-View Modal
- Real-time cart state management in [script.js](script.js):
  - Add items to Cauldron with live Galleons total calculation.
  - Item count badge in header.
  - `localStorage` persistence across pages.
  - Floating toast notifications and interactive product quick-view modal drawer.

### 📜 6. Diagon Alley Notice Board Footer
- Footer styled into a Ministry of Magic Approved Supplier Notice Board with parchment cards, gold borders, and Hogwarts credentials.

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Storefront page featuring dramatic hero title & product grid
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Delivery options (Owl Post, Floo Network, Apparition Direct)
├── style.css         # CSS design system, typography scales, floating animations & responsive rules
├── script.js        # Ambient sparkle particles, Cauldron cart logic, modals & toasts
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
