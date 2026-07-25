/**
 * js/alohomora.js
 * ================
 * Controls the Alohomora spellbook intro overlay.
 *
 * Rules:
 *  - Only shown on index.html
 *  - Only once per 24 hours (localStorage persistence)
 *  - Skippable via "Skip Animation" button
 *
 * Dependencies (must be loaded before this file):
 *   anime.min.js, gsap.min.js, js/audio.js
 */

'use strict';

function initAlohomoraEntrance() {
  const overlay       = document.getElementById('spellbookOverlay');
  const mainContainer = document.getElementById('mainPageContainer');
  if (!overlay) return;

  // Only run on index.html
  const path = window.location.pathname;
  const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '';

  // Replay entrance button binding
  const replayBtn = document.getElementById('replayAnimationBtn');
  if (replayBtn && !replayBtn.dataset.bound) {
    replayBtn.dataset.bound = 'true';
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      replayAlohomoraEntrance();
    });
  }

  // 24-hour gate
  const STORAGE_KEY    = 'alohomora_last_played_time';
  const TTL_MS         = 24 * 60 * 60 * 1000;
  const lastPlayed     = localStorage.getItem(STORAGE_KEY);
  const withinTtl      = lastPlayed && (Date.now() - parseInt(lastPlayed, 10)) < TTL_MS;

  if (!isIndex || withinTtl) {
    overlay.style.display = 'none';
    if (mainContainer) mainContainer.style.opacity = '1';
    return;
  }

  if (mainContainer) mainContainer.style.opacity = '0';

  // ── Reveal helper ────────────────────────────────────────────────────────
  const revealPage = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      if (mainContainer) {
        mainContainer.style.opacity = '1';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(
            '.mainHeader, .heroBanner, .productCard, .categoryCard',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }
          );
        }
      }
    }, 500);
  };

  // Skip button
  const skipBtn = document.getElementById('skipEntrance');
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => { e.preventDefault(); revealPage(); });
  }

  const alohomoraBtn = document.getElementById('alohomoraBtn');
  if (!alohomoraBtn) return;

  // Hover shimmer (once)
  let hoveredOnce = false;
  alohomoraBtn.addEventListener('mouseenter', () => {
    if (hoveredOnce) return;
    hoveredOnce = true;
    playHoverHumSound();
    if (typeof gsap !== 'undefined') {
      gsap.to('#spellbook3D',   { x: 2, y: -2, duration: 0.25, yoyo: true, repeat: 1 });
      gsap.to('#spellbookLock', { boxShadow: '0 0 45px rgba(212,175,55,.95), 0 0 70px rgba(245,234,175,.8)', duration: 0.4 });
    }
  });

  // Click → full sequence
  let animationStarted = false;
  alohomoraBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (animationStarted) return;
    animationStarted = true;

    _createWandCastTrail(e, overlay);
    playSpellChargingSound();

    if (typeof anime === 'undefined' || typeof gsap === 'undefined') {
      revealPage();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to('#spellbookOverlay', { backgroundColor: '#030007', duration: 0.35 })
      .to('#alohomoraBtn',     { scale: 0.92, duration: 0.15 }, '<')
      .add(() => {
        _createInwardSparks();
        playRuneChimesSound();
        anime({
          targets: '#outerCircle, #innerCircle, #starRune1',
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 1000,
          easing: 'easeInOutCubic'
        });
        anime({
          targets: '.runeTextPath',
          opacity: [0, 1],
          rotate: [0, 360],
          duration: 900,
          easing: 'easeOutQuad'
        });
      }, '+=0.1')
      .to('.magicCircleSVG', { opacity: 1, duration: 0.4 }, '<')
      .to('#spellbook3D',    { x: -6, duration: 0.08, yoyo: true, repeat: 4,
                               onStart: () => playLockResistanceAndClickSound() }, '+=0.4')
      .to('#spellbookLock',  { rotate: 45, duration: 0.18 })
      .to('#spellbookLock',  { y: 160, opacity: 0, duration: 0.65, ease: 'bounce.out' })
      .to('#spellbookFrontCover', { rotateY: -115, duration: 0.95, ease: 'power2.inOut',
                                    onStart: () => playPaperAndBurstSound() }, '-=0.3')
      .to('#spellbook3D',    { scale: 3.5, opacity: 0, duration: 0.8, ease: 'power2.in',
                               onComplete: revealPage }, '-=0.2');
  });
}

// ── Private helpers ───────────────────────────────────────────────────────────

function _createInwardSparks() {
  const container = document.getElementById('sparkContainer');
  if (!container) return;
  container.innerHTML = '';
  const count = 16;
  for (let i = 0; i < count; i++) {
    const spark    = document.createElement('div');
    spark.className = 'inwardSpark';
    const angle    = (i / count) * Math.PI * 2;
    const dist     = 180 + Math.random() * 50;
    spark.style.left = `calc(50% + ${Math.cos(angle) * dist}px)`;
    spark.style.top  = `calc(50% + ${Math.sin(angle) * dist}px)`;
    container.appendChild(spark);
  }
}

function _createWandCastTrail(e, overlay) {
  if (!overlay) return;
  const spark     = document.createElement('div');
  spark.className = 'wandTrailSpark';
  const rect      = overlay.getBoundingClientRect();
  const clickX    = e ? e.clientX - rect.left : window.innerWidth / 2;
  const clickY    = e ? e.clientY - rect.top  : window.innerHeight / 2;
  spark.style.left = `${clickX}px`;
  spark.style.top  = `${clickY}px`;
  overlay.appendChild(spark);

  if (typeof gsap !== 'undefined') {
    const lock     = document.getElementById('spellbookLock');
    const lRect    = lock ? lock.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const targetX  = lRect.left + 38 - rect.left;
    const targetY  = lRect.top  + 38 - rect.top;
    gsap.to(spark, { x: targetX - clickX, y: targetY - clickY, scale: 2.2, opacity: 0,
                     duration: 0.6, ease: 'power2.out', onComplete: () => spark.remove() });
  } else {
    setTimeout(() => spark.remove(), 600);
  }
}

function replayAlohomoraEntrance() {
  localStorage.removeItem('alohomora_last_played_time');
  const overlay       = document.getElementById('spellbookOverlay');
  const mainContainer = document.getElementById('mainPageContainer');
  if (!overlay) return;

  // Reset overlay display
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';
  overlay.style.backgroundColor = 'rgba(10, 3, 18, 0.95)';

  if (mainContainer) mainContainer.style.opacity = '0';

  // Reset GSAP elements back to initial state
  if (typeof gsap !== 'undefined') {
    gsap.set('#spellbookOverlay', { opacity: 1, backgroundColor: 'rgba(10, 3, 18, 0.95)' });
    gsap.set('#alohomoraBtn',     { scale: 1 });
    gsap.set('#spellbook3D',     { scale: 1, opacity: 1, x: 0, y: 0 });
    gsap.set('#spellbookLock',   { rotate: 0, y: 0, opacity: 1, boxShadow: '0 0 25px rgba(212,175,55,0.5)' });
    gsap.set('#spellbookFrontCover', { rotateY: 0 });
    gsap.set('.magicCircleSVG',  { opacity: 0 });
  }

  // Smooth scroll up to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-run entrance initialization logic
  initAlohomoraEntrance();
}
