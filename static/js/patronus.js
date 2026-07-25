/**
 * static/js/patronus.js
 * =====================
 * Expecto Patronum Secret Incantation Easter Egg — Anatomical Grizzly Bear Patronus
 * with Secret Runic 'B' (Berkana ᛒ) Constellation Signature.
 *
 * Typing 'EXPECTO PATRONUM' or 'PATRONUM' anywhere on the page (outside text inputs)
 * summons a majestic, anatomically accurate silvery Grizzly Bear Patronus charging
 * slowly (5.5s) across the screen with long slanted muzzle, shoulder hump, rounded ears,
 * ground paw shockwaves, floating mist particles, stereo-panned Web Audio synth swell,
 * and a secret glowing Runic 'B' (Berkana ᛒ) constellation signature at mid-charge.
 */

'use strict';

let _keyBuffer = '';
let _isPatronusActive = false;

function initPatronusListener() {
  window.addEventListener('keydown', (e) => {
    // Ignore keypresses inside form inputs and editable elements
    const tag = document.activeElement ? document.activeElement.tagName.toUpperCase() : '';
    const isEditable = document.activeElement ? document.activeElement.isContentEditable : false;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || isEditable) {
      return;
    }

    if (e.key && e.key.length === 1) {
      _keyBuffer = (_keyBuffer + e.key.toUpperCase()).slice(-30);
      if (_keyBuffer.includes('EXPECTOPATRONUM') || _keyBuffer.includes('PATRONUM')) {
        _keyBuffer = '';
        castPatronusCharm();
      }
    }
  });
}

function castPatronusCharm() {
  if (_isPatronusActive) return;
  _isPatronusActive = true;

  // 1. Play deep Bear Web Audio synth swell (5.5s duration)
  if (typeof playBearPatronusSwellSound === 'function') {
    playBearPatronusSwellSound();
  }

  // 2. Create Overlay Backdrop
  let overlay = document.getElementById('patronusOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'patronusOverlay';
    overlay.className = 'patronusOverlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = '';
  overlay.classList.add('active');

  // 3. Create Bear Container with Anatomically Accurate Grizzly Bear SVG & Secret Runic 'B'
  const bearWrap = document.createElement('div');
  bearWrap.className = 'patronusBearContainer';
  bearWrap.innerHTML = `
    <svg class="patronusBearSVG" viewBox="0 0 460 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Silvery Moon Core Gradient -->
        <linearGradient id="bearCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
          <stop offset="30%" stop-color="#e0f7fa" stop-opacity="0.90" />
          <stop offset="70%" stop-color="#80deea" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#26c6da" stop-opacity="0.40" />
        </linearGradient>

        <!-- Multi-stage Soft Aura Glow Filter -->
        <filter id="bearAuraGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur1" />
          <feGaussianBlur stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Anatomical Grizzly Bear Silhouette -->
      <path d="M 50 150 
               C 42 142, 38 132, 42 125 
               C 48 118, 62 105, 90 92 
               C 120 78, 145 55, 172 48 
               C 195 44, 220 58, 245 62 
               C 255 52, 264 46, 272 48 
               C 278 50, 278 58, 275 66 
               C 285 70, 300 80, 320 90 
               C 335 96, 342 98, 340 104 
               C 336 109, 320 114, 305 115 
               C 290 116, 272 126, 260 142 
               C 268 165, 280 190, 288 212 
               C 275 215, 262 212, 255 195 
               C 248 180, 242 160, 235 152 
               C 215 155, 190 162, 168 172 
               C 155 188, 142 208, 130 215 
               C 118 218, 110 210, 115 195 
               C 122 178, 126 165, 110 158 
               C 95 175, 88 198, 78 208 
               C 68 212, 58 202, 65 185 
               C 72 168, 78 158, 50 150 Z" 
            fill="url(#bearCoreGrad)" filter="url(#bearAuraGlow)" />

      <!-- Facial & Anatomical Constellation Contour Lines -->
      <path d="M 285 75 L 332 97 M 320 110 L 275 66" 
            stroke="rgba(255, 255, 255, 0.95)" stroke-width="2" stroke-dasharray="4 2" />
      <path d="M 172 48 C 190 70, 220 95, 260 142" 
            stroke="rgba(255, 255, 255, 0.85)" stroke-width="1.8" stroke-dasharray="5 3" />
      <path d="M 90 92 Q 150 110, 235 152" 
            stroke="rgba(255, 255, 255, 0.80)" stroke-width="1.8" stroke-dasharray="4 2" />

      <!-- Secret Runic 'B' (Berkana ᛒ) Constellation Group -->
      <g class="runicConstellationB">
        <!-- Vertical Stem of Rune ᛒ -->
        <path d="M 190 95 L 190 145" stroke="#ffffff" stroke-width="2" stroke-dasharray="3 2" class="runicStroke" />
        <!-- Upper Lobe of Rune ᛒ -->
        <path d="M 190 95 L 212 110 L 190 120" stroke="#ffffff" stroke-width="2" stroke-dasharray="3 2" class="runicStroke" />
        <!-- Lower Lobe of Rune ᛒ -->
        <path d="M 190 120 L 215 132 L 190 145" stroke="#ffffff" stroke-width="2" stroke-dasharray="3 2" class="runicStroke" />

        <!-- Runic Star Nodes -->
        <circle cx="190" cy="95"  r="3.5" class="runicNode" />
        <circle cx="190" cy="120" r="3.8" class="runicNode" />
        <circle cx="190" cy="145" r="3.5" class="runicNode" />
        <circle cx="212" cy="110" r="4.0" class="runicNode glow" />
        <circle cx="215" cy="132" r="4.0" class="runicNode glow" />
      </g>

      <!-- Constellation Star Nodes -->
      <circle cx="335" cy="98"  r="4.5" fill="#ffffff" filter="url(#bearAuraGlow)" /> <!-- Nose Star -->
      <circle cx="295" cy="78"  r="3.5" fill="#ffffff" /> <!-- Eye Star -->
      <circle cx="272" cy="48"  r="3.5" fill="#ffffff" /> <!-- Ear Star -->
      <circle cx="172" cy="48"  r="5"   fill="#ffffff" filter="url(#bearAuraGlow)" /> <!-- Hump Star -->
      <circle cx="90"  cy="92"  r="4"   fill="#ffffff" /> <!-- Flank Star -->
      <circle cx="288" cy="212" r="3.5" fill="#ffffff" filter="url(#bearAuraGlow)" /> <!-- Lead Paw Star -->
      <circle cx="130" cy="215" r="3.5" fill="#ffffff" filter="url(#bearAuraGlow)" /> <!-- Rear Paw Star -->
    </svg>
  `;
  overlay.appendChild(bearWrap);

  // 4. Spawn trailing mist particles & paw shockwaves continuously during the 5.5s charge
  const mistInterval = setInterval(() => {
    if (!_isPatronusActive) {
      clearInterval(mistInterval);
      return;
    }
    const bRect = bearWrap.getBoundingClientRect();
    const bearX = bRect.left + bRect.width * 0.45;
    const bearY = bRect.top + bRect.height * 0.65;

    // Mist particle
    const mist = document.createElement('div');
    mist.className = 'patronusMistParticle';
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 50;
    mist.style.left = `${bearX + offsetX}px`;
    mist.style.top  = `${bearY + offsetY}px`;
    const size = 16 + Math.random() * 30;
    mist.style.width = `${size}px`;
    mist.style.height = `${size}px`;
    overlay.appendChild(mist);

    setTimeout(() => mist.remove(), 1600);

    // Ground Paw Shockwave Ring
    if (Math.random() > 0.35) {
      const spark = document.createElement('div');
      spark.className = 'bearFootstepSpark';
      spark.style.left = `${bearX - 30 + Math.random() * 60}px`;
      spark.style.top  = `${bearY + 50 + Math.random() * 20}px`;
      overlay.appendChild(spark);
      setTimeout(() => spark.remove(), 1100);
    }
  }, 110);

  // 5. Cleanup after majestic 5.5-second charge animation finishes
  setTimeout(() => {
    clearInterval(mistInterval);
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.innerHTML = '';
      _isPatronusActive = false;
    }, 600);
  }, 5600);
}
