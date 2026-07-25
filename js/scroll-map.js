/**
 * js/scroll-map.js
 * =================
 * Controls the hanging pull-cord mechanism and the
 * Marauder's Map / Assignment Scroll overlay animation.
 *
 * Updated with the enhanced animation sequence from info.html:
 *   - Crystal gem pulse & sparkle burst on pull
 *   - Unrolling top & bottom scroll rollers
 *   - Ink path stroke drawing & compass spin
 *   - Animated footprint step sequence along coordinates
 *   - Elastic landmark bounce & ministry seal animation
 *   - Click, drag, close button, ESC key, and backdrop dismiss
 *
 * Dependencies (must be loaded before this file):
 *   anime.min.js, gsap.min.js (optional), js/audio.js (optional)
 */

'use strict';

let _isMapAnimating = false;

// ── Sparkle Burst Helper ──────────────────────────────────────────────────────

function burstSparklesAt(x, y, count = 20) {
  if (typeof anime === 'undefined') return;
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div');
    sp.style.position = 'fixed';
    sp.style.left = x + 'px';
    sp.style.top = y + 'px';
    const size = 3 + Math.random() * 4;
    sp.style.width = size + 'px';
    sp.style.height = size + 'px';
    sp.style.background = Math.random() > 0.5 ? '#f5eaaf' : '#d4af37';
    sp.style.borderRadius = '50%';
    sp.style.boxShadow = '0 0 8px #f5eaaf, 0 0 16px rgba(212,175,55,0.6)';
    sp.style.pointerEvents = 'none';
    sp.style.zIndex = '9999';
    document.body.appendChild(sp);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;

    anime({
      targets: sp,
      translateX: Math.cos(angle) * dist,
      translateY: Math.sin(angle) * dist,
      scale: [1, 0],
      opacity: [1, 0],
      duration: 1000 + Math.random() * 500,
      easing: 'easeOutQuad',
      complete: () => sp.remove(),
    });
  }
}

// ── Pull-cord Mechanism ───────────────────────────────────────────────────────

function initPullCordMechanism() {
  const pullCord = document.getElementById('pullCordContainer');
  const ropeLine = document.getElementById('ropeLine');
  const ropeCord = document.getElementById('ropeCord');
  const hint     = document.getElementById('pullHint');
  const centerHint = document.getElementById('pageCenterHint');
  if (!pullCord) return;

  pullCord.addEventListener('mouseenter', () => {
    if (!_isMapAnimating && typeof playHoverShimmer === 'function') playHoverShimmer();
  });

  const executePull = () => {
    const overlay = document.getElementById('assignmentScrollOverlay');
    if (_isMapAnimating || (overlay && overlay.classList.contains('active'))) return;

    if (typeof playRopeTensionSound === 'function') playRopeTensionSound();
    if (typeof playCeilingUnlockSound === 'function') playCeilingUnlockSound();

    // Cord bounce
    if (typeof anime !== 'undefined' && ropeCord) {
      anime({
        targets: ropeCord,
        translateY: [0, 30, 0],
        duration: 600,
        easing: 'easeOutBounce',
      });
      if (ropeLine) {
        anime({
          targets: ropeLine,
          translateY: [0, 10, 0],
          duration: 600,
          easing: 'easeOutBounce',
        });
      }
    }

    // Fade out hints
    if (hint && typeof anime !== 'undefined') {
      anime({ targets: hint, opacity: 0, duration: 300, easing: 'easeOutQuad' });
    }
    if (centerHint && typeof anime !== 'undefined') {
      anime({ targets: centerHint, opacity: 0, duration: 400, easing: 'easeOutQuad' });
    }

    // Crystal gem pulse
    const gem = document.getElementById('crystalGem');
    if (gem && typeof anime !== 'undefined') {
      anime({
        targets: gem,
        scale: [1, 1.6, 1],
        boxShadow: [
          '0 0 12px #f5eaaf, 0 0 25px rgba(212,175,55,0.8)',
          '0 0 40px #ffffff, 0 0 80px rgba(212,175,55,1), 0 0 120px rgba(245,234,175,0.8)',
          '0 0 12px #f5eaaf, 0 0 25px rgba(212,175,55,0.8)',
        ],
        duration: 800,
        easing: 'easeInOutSine',
      });

      const gemRect = gem.getBoundingClientRect();
      burstSparklesAt(gemRect.left + gemRect.width / 2, gemRect.top + gemRect.height / 2, 20);
    }

    setTimeout(() => triggerAssignmentScroll(), 400);
  };

  // Support both direct click and drag-release
  pullCord.addEventListener('click', executePull);

  let isDragging = false;
  let startY     = 0;
  let currentY   = 0;

  const onDragStart = (y) => {
    if (_isMapAnimating) return;
    isDragging = true;
    startY     = y;
  };

  const onDragMove = (y) => {
    if (!isDragging || _isMapAnimating) return;
    const delta = Math.max(0, Math.min(80, y - startY));
    currentY    = delta;
    if (ropeLine) ropeLine.style.height = `${125 + delta}px`;
    if (ropeCord) ropeCord.style.transform = `translateY(${delta}px)`;
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    if (ropeLine) ropeLine.style.height = '125px';
    if (ropeCord) ropeCord.style.transform = 'translateY(0)';
    if (currentY > 25 && !_isMapAnimating) {
      executePull();
    }
    currentY = 0;
  };

  pullCord.addEventListener('mousedown', (e) => onDragStart(e.clientY));
  window.addEventListener('mousemove',  (e) => onDragMove(e.clientY));
  window.addEventListener('mouseup',    ()  => onDragEnd());
  pullCord.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientY), { passive: true });
  window.addEventListener('touchmove',   (e) => onDragMove(e.touches[0].clientY),   { passive: true });
  window.addEventListener('touchend',    ()  => onDragEnd());
}

// ── Trigger Assignment Scroll Sequence ────────────────────────────────────────

function triggerAssignmentScroll() {
  if (_isMapAnimating) return;
  _isMapAnimating = true;

  const overlay     = document.getElementById('assignmentScrollOverlay');
  const rollerTop   = document.getElementById('scrollRollerTop');
  const rollerBottom = document.getElementById('scrollRollerBottom');
  const card        = document.getElementById('marauderCard');

  if (!overlay || !card) { _isMapAnimating = false; return; }

  overlay.classList.add('active');
  if (typeof playScrollUnrollSound === 'function') playScrollUnrollSound();

  if (typeof anime === 'undefined') {
    _isMapAnimating = false;
    return;
  }

  // 1. Unroll top roller
  anime({
    targets: rollerTop,
    scaleY: [0, 1],
    duration: 400,
    easing: 'easeOutQuad',
  });

  // 2. Expand card parchment
  anime({
    targets: card,
    scaleY: [0, 1],
    duration: 800,
    delay: 300,
    easing: 'easeOutExpo',
    complete: () => {
      // 3. Unroll bottom roller
      anime({
        targets: rollerBottom,
        scaleY: [0, 1],
        duration: 400,
        easing: 'easeOutQuad',
      });
      _revealScrollContents();
    },
  });
}

function _revealScrollContents() {
  if (typeof anime === 'undefined') return;

  // Background SVG layers
  anime({
    targets: '.marauderDenseSVG',
    opacity: [0, 0.12],
    duration: 1200,
    easing: 'easeOutQuad',
  });

  anime({
    targets: '.marauderMapPathsSVG',
    opacity: [0, 1],
    duration: 1000,
    delay: 300,
    easing: 'easeOutQuad',
  });

  // Animate map path strokes
  document.querySelectorAll('.mapPathStroke').forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    anime({
      targets: path,
      strokeDashoffset: [length, 0],
      duration: 2000,
      delay: 500 + i * 400,
      easing: 'easeOutQuad',
      changeBegin: () => { if (typeof playQuillInkSound === 'function') playQuillInkSound(); },
      complete: () => {
        path.style.strokeDasharray = '6 5';
        path.style.strokeDashoffset = '0';
      },
    });
  });

  // Compass animation
  anime({
    targets: '.compassGroup',
    opacity: [0, 0.45],
    scale: [0, 1.3, 1],
    rotate: [-180, 0],
    duration: 1200,
    delay: 1400,
    easing: 'easeOutElastic(1, .6)',
  });

  // Title & Subtitle
  anime({
    targets: '#revealTitle',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 800,
    delay: 600,
    easing: 'easeOutExpo',
    changeBegin: () => { if (typeof playFootstepSound === 'function') playFootstepSound(); }
  });

  anime({
    targets: '#revealSub',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: 800,
    easing: 'easeOutExpo',
  });

  // Decree quote
  anime({
    targets: '#revealDecree',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 1000,
    delay: 1100,
    easing: 'easeOutExpo',
    changeBegin: () => { if (typeof playFootstepSound === 'function') playFootstepSound(); }
  });

  // Landmark cards
  anime({
    targets: '.mapLandmarkCard',
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.9, 1],
    delay: anime.stagger(150, { start: 1500 }),
    duration: 700,
    easing: 'easeOutElastic(1, .6)',
    changeBegin: () => { if (typeof playFootstepSound === 'function') playFootstepSound(); }
  });

  // Ministry seal
  anime({
    targets: '#revealSeal',
    opacity: [0, 1],
    scale: [0.5, 1.2, 1],
    rotate: [-15, 0],
    duration: 800,
    delay: 2400,
    easing: 'easeOutElastic(1, .5)',
    changeBegin: () => {
      if (typeof playFootstepSound === 'function') playFootstepSound();
      if (typeof playFinalSwellSound === 'function') playFinalSwellSound();
    }
  });

  // Animated Footprints Step Sequence
  setTimeout(() => _animateFootprints(), 2800);
}

function _animateFootprints() {
  const card = document.getElementById('marauderCard');
  const container = document.getElementById('footprintContainer');
  if (!card || !container || typeof anime === 'undefined') return;

  const cardRect = card.getBoundingClientRect();
  const scaleX = cardRect.width / 820;
  const scaleY = cardRect.height / 540;

  const positions = [
    { x: 80,  y: 105, side: 'left' },
    { x: 180, y: 75,  side: 'right' },
    { x: 290, y: 80,  side: 'left' },
    { x: 400, y: 110, side: 'right' },
    { x: 510, y: 105, side: 'left' },
    { x: 620, y: 90,  side: 'right' },
    { x: 730, y: 92,  side: 'left' },
    { x: 680, y: 150, side: 'right' },
    { x: 580, y: 200, side: 'left' },
    { x: 480, y: 240, side: 'right' },
    { x: 380, y: 265, side: 'left' },
    { x: 270, y: 280, side: 'right' },
    { x: 160, y: 310, side: 'left' },
    { x: 90,  y: 340, side: 'right' },
    { x: 180, y: 400, side: 'left' },
    { x: 290, y: 440, side: 'right' },
    { x: 400, y: 445, side: 'left' },
    { x: 510, y: 445, side: 'right' },
    { x: 620, y: 455, side: 'left' },
    { x: 730, y: 460, side: 'right' },
  ];

  const templates = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
  ];
  if (!templates[0]) return;

  positions.forEach((pos, i) => {
    const fp = templates[i % 3].cloneNode(true);
    fp.removeAttribute('id');
    fp.style.opacity = '0';
    fp.style.left = (pos.x * scaleX - 5) + 'px';
    fp.style.top  = (pos.y * scaleY - 8) + 'px';
    fp.style.transform = pos.side === 'left' ? 'rotate(-8deg)' : 'scaleX(-1) rotate(-8deg)';
    container.appendChild(fp);

    anime({
      targets: fp,
      opacity: [0, 0.7, 0.7, 0],
      scale: [0.5, 1, 1, 0.8],
      duration: 1500,
      delay: i * 200,
      easing: 'easeOutQuad',
    });
  });
}

// ── Dismiss Assignment Scroll Sequence ────────────────────────────────────────

function dismissAssignmentScroll() {
  const overlay     = document.getElementById('assignmentScrollOverlay');
  const card        = document.getElementById('marauderCard');
  const rollerTop   = document.getElementById('scrollRollerTop');
  const rollerBottom = document.getElementById('scrollRollerBottom');
  const hint        = document.getElementById('pullHint');
  const centerHint  = document.getElementById('pageCenterHint');

  if (!overlay || !card) { _isMapAnimating = false; return; }

  if (typeof playRetractSound === 'function') playRetractSound();

  if (typeof anime === 'undefined') {
    overlay.classList.remove('active');
    _isMapAnimating = false;
    return;
  }

  // Close roller bottom
  anime({
    targets: rollerBottom,
    scaleY: [1, 0],
    duration: 300,
    easing: 'easeInQuad',
  });

  // Close card
  anime({
    targets: card,
    scaleY: [1, 0],
    duration: 500,
    delay: 200,
    easing: 'easeInQuad',
  });

  // Close roller top
  anime({
    targets: rollerTop,
    scaleY: [1, 0],
    duration: 300,
    delay: 600,
    easing: 'easeInQuad',
  });

  // Fade overlay
  anime({
    targets: overlay,
    opacity: 0,
    duration: 400,
    delay: 800,
    easing: 'easeOutQuad',
    complete: () => {
      overlay.classList.remove('active');
      overlay.style.opacity = '';
      card.style.transform = '';
      rollerTop.style.transform = '';
      rollerBottom.style.transform = '';
      _isMapAnimating = false;

      // Remove cloned footprints
      const container = document.getElementById('footprintContainer');
      if (container) {
        container.querySelectorAll('.walkingFootprint:not([id])').forEach((c) => c.remove());
      }

      _resetScrollContentStyles();

      // Fade hints back in
      setTimeout(() => {
        if (hint) {
          anime({ targets: hint, opacity: 0.85, duration: 600, easing: 'easeOutQuad' });
        }
        if (centerHint) {
          anime({ targets: centerHint, opacity: 0.7, duration: 600, easing: 'easeOutQuad' });
        }
      }, 400);
    },
  });
}

function _resetScrollContentStyles() {
  const elementsToReset = [
    '.marauderDenseSVG',
    '.marauderMapPathsSVG',
    '#revealTitle',
    '#revealSub',
    '#revealDecree',
    '#revealSeal',
    '.mapLandmarkCard',
    '.compassGroup',
  ];

  elementsToReset.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.scale = '';
      el.style.rotate = '';
    });
  });

  document.querySelectorAll('.mapPathStroke').forEach((path) => {
    path.style.strokeDasharray = '6 5';
    path.style.strokeDashoffset = '0';
  });
}

// ── Event Listener Registration ───────────────────────────────────────────────

function initAssignmentScrollEvents() {
  const overlay  = document.getElementById('assignmentScrollOverlay');
  const closeBtn = document.getElementById('scrollCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissAssignmentScroll();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismissAssignmentScroll();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      dismissAssignmentScroll();
    }
  });
}
