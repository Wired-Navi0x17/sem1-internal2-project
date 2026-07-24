# 🧹 The Wizarding Emporium - Diagon Alley Magical Supplies

> **Diagon Alley's Premier Magical Supplier Since 1298**  
> An immersive, responsive Harry Potter themed e-commerce web application featuring authentic magical supplies, real-time Cauldron purchasing state, custom SVG micro-backgrounds, and Reicon vector icon integration.

---

## ⚡ Project Overview

**The Wizarding Emporium** is a 3-page web platform designed for magical witches, wizards, and Hogwarts students to browse and purchase high-quality magical supplies:
- **Phoenix Feather Wands**, **Invisibility Cloaks**, **Nimbus 2001 Racing Brooms**, **Time-Turners**, **Pensieves**, **Marauder's Maps**, **Golden Snitches**, and **Deluminators**.
- All transactions are calculated in authentic **Galleons**, **Sickles**, and **Knuts**.

---

## ✨ Key Features & Technical Highlights

### 🎨 1. Custom Small-Square Magical Background SVG
- Built with a custom, tileable SVG background pattern ([background.svg](background.svg)) featuring a dark violet 40x40px micro-square grid accented with 4-point gold (`#d4af37`) star sparkles.

### 🦉 2. Reicon Vector SVGs (Zero Emoji Policy)
- Replaced all front-end emojis with clean, responsive vector SVGs sourced from the **Reicon** icon system:
  - **Standard Owl Post**: `send` vector SVG.
  - **Floo Network Express**: `flame` vector SVG.
  - **Apparition Direct**: `bolt-lightning` vector SVG.
  - **Cauldron Shopping Bag**: `shopping-bag` vector SVG.

### 🧪 3. Interactive Cauldron Purchasing Cart
- Real-time cart state management in [script.js](script.js):
  - Add items to Cauldron with immediate price tallying in Galleons.
  - Live item count badge in header.
  - `localStorage` persistence between navigation pages.
  - Floating toast notifications upon item selection.

### 🔮 4. Item Quick-View Modal
- Interactive preview drawer for magical items displaying item lore, Ministry approval status, stock status, and single-click purchase actions.

### 📱 5. Responsive Diagon Alley Design System
- Built with CSS Custom Properties (`:root` variables) in [style.css](style.css).
- Typography powered by Google Fonts: **Cinzel** (magic display serif) & **Inter** (sans-serif body).
- Responsive navigation drawer for mobile and desktop viewports.

---

## 📁 Repository Structure

```
Assignment2/
├── index.html        # Main storefront page featuring magical product grid & category catalog
├── contact.html      # Diagon Alley location details & Owl Post message dispatch form
├── deliv.html        # Enchanted delivery options (Owl Post, Floo Network, Apparition)
├── style.css         # Complete CSS design system, typography, animations, & responsive rules
├── script.js        # Client-side JavaScript for Cauldron cart, modals, toasts, & mobile menu
├── background.svg    # Custom small-square magical grid SVG tile
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
   - Open `index.html` directly in any web browser, or serve with live-server / python HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## ✒️ Credits & Authors

Created by **Bhuvi & Harshul**  
*Diagon Alley, London &bull; Opposite Gringotts Wizarding Bank*
