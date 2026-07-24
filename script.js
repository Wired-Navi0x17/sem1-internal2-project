// The Wizarding Emporium - Diagon Alley Interactive E-Commerce & Signature Hanging Marauder's Map Engine

document.addEventListener('DOMContentLoaded', () => {
  initAlohomoraEntrance();
  initPullCordMechanism();
  initAssignmentScrollEvents();
  initAmbientSparkles();
  initCauldronCart();
  initContactForm();
  initMobileMenu();
  initProductModals();
});

// ==================== Web Audio API Multi-Layer Synthesizer ====================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Hover Crystal Shimmer
function playHoverShimmer() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1567.98, now);
    osc.frequency.exponentialRampToValueAtTime(2093.00, now + 0.2);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

// Rope Pull & Fabric Tension
function playRopeTensionSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(280, now + 0.3);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  } catch (e) {}
}

// Brass Ceiling Mechanism Click
function playCeilingUnlockSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {}
}

// Scroll Unrolling & Parchment Unfurling
function playScrollUnrollSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.5);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {}
}

// Quill Scratching & Sparkles
function playQuillInkSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    [1760, 2349, 2793].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.05, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3 + idx * 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 0.35 + idx * 0.08);
    });
  } catch (e) {}
}

// Soft Footstep Sound
function playFootstepSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

// Final Warm Swell & Resonance
function playFinalSwellSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    });
  } catch (e) {}
}

// Scroll Retraction Sound
function playRetractSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {}
}

// Wand Trail & Charging Sounds
function playSpellChargingSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.6);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  } catch (e) {}
}

function playHoverHumSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

function playRuneChimesSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    [1318.51, 1661.22, 1975.53, 2637.02].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.1, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + idx * 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 0.7);
    });
  } catch (e) {}
}

function playLockResistanceAndClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();

    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(360, now);
    oscClick.frequency.exponentialRampToValueAtTime(70, now + 0.15);

    gainClick.gain.setValueAtTime(0.25, now);
    gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);

    oscClick.start(now);
    oscClick.stop(now + 0.22);
  } catch (e) {}
}

function playPaperAndBurstSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2349.32, now);
    osc.frequency.exponentialRampToValueAtTime(3135.96, now + 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.55);
  } catch (e) {}
}

function createInwardSparks() {
  const sparkContainer = document.getElementById('sparkContainer');
  if (!sparkContainer) return;
  sparkContainer.innerHTML = '';

  const sparkCount = 16;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'inwardSpark';
    
    const angle = (i / sparkCount) * Math.PI * 2;
    const distance = 180 + Math.random() * 50;
    
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    
    spark.style.left = `calc(50% + ${startX}px)`;
    spark.style.top = `calc(50% + ${startY}px)`;
    
    sparkContainer.appendChild(spark);
  }
}

function createWandCastTrail(e) {
  const overlay = document.getElementById('spellbookOverlay');
  if (!overlay) return;

  const spark = document.createElement('div');
  spark.className = 'wandTrailSpark';
  
  const rect = overlay.getBoundingClientRect();
  const clickX = e ? e.clientX - rect.left : window.innerWidth / 2;
  const clickY = e ? e.clientY - rect.top : window.innerHeight / 2;
  
  spark.style.left = `${clickX}px`;
  spark.style.top = `${clickY}px`;
  
  overlay.appendChild(spark);

  if (typeof gsap !== 'undefined') {
    const lock = document.getElementById('spellbookLock');
    const lockRect = lock ? lock.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const targetX = lockRect.left + 38 - rect.left;
    const targetY = lockRect.top + 38 - rect.top;

    gsap.to(spark, {
      x: targetX - clickX,
      y: targetY - clickY,
      scale: 2.2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => spark.remove()
    });
  } else {
    setTimeout(() => spark.remove(), 600);
  }
}

// ==================== GSAP & Anime.js Alohomora Entrance Sequence ====================
function initAlohomoraEntrance() {
  const overlay = document.getElementById('spellbookOverlay');
  const mainContainer = document.getElementById('mainPageContainer');
  if (!overlay) return;

  const isSubPage = !window.location.pathname.endsWith('index.html') && window.location.pathname.endsWith('.html');

  if (isSubPage) {
    overlay.style.display = 'none';
    if (mainContainer) mainContainer.style.opacity = '1';
    return;
  }

  // Display spellbook entrance on EVERY page load / refresh of index.html!
  if (mainContainer) mainContainer.style.opacity = '0';

  const alohomoraBtn = document.getElementById('alohomoraBtn');
  const skipBtn = document.getElementById('skipEntrance');

  const revealHomepage = () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      if (mainContainer) {
        mainContainer.style.opacity = '1';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo('.mainHeader, .heroBanner, .productCard, .categoryCard', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }
          );
        }
      }
    }, 500);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      revealHomepage();
    });
  }

  if (!alohomoraBtn) return;

  let hoveredOnce = false;
  alohomoraBtn.addEventListener('mouseenter', () => {
    if (hoveredOnce) return;
    hoveredOnce = true;
    playHoverHumSound();

    if (typeof gsap !== 'undefined') {
      gsap.to('#spellbook3D', { x: 2, y: -2, duration: 0.25, yoyo: true, repeat: 1 });
      gsap.to('#spellbookLock', { boxShadow: '0 0 45px rgba(212, 175, 55, 0.95), 0 0 70px rgba(245, 234, 175, 0.8)', duration: 0.4 });
    }
  });

  let animationStarted = false;

  alohomoraBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (animationStarted) return;
    animationStarted = true;

    createWandCastTrail(e);
    playSpellChargingSound();

    if (typeof anime === 'undefined' || typeof gsap === 'undefined') {
      revealHomepage();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to('#spellbookOverlay', { backgroundColor: '#030007', duration: 0.35 })
    .to('#alohomoraBtn', { scale: 0.92, duration: 0.15 }, '<')
    .add(() => {
      createInwardSparks();
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
    .to('#spellbook3D', { x: -6, duration: 0.08, yoyo: true, repeat: 4, onStart: () => playLockResistanceAndClickSound() }, '+=0.4')
    .to('#spellbookLock', { rotate: 45, duration: 0.18 })
    .to('#spellbookLock', { y: 160, opacity: 0, duration: 0.65, ease: 'bounce.out' })
    .to('#spellbookFrontCover', { rotateY: -115, duration: 0.95, ease: 'power2.inOut', onStart: () => playPaperAndBurstSound() }, '-=0.3')
    .to('#spellbook3D', { scale: 3.5, opacity: 0, duration: 0.8, ease: 'power2.in', onComplete: revealHomepage }, '-=0.2');
  });
}

// ==================== Interactive Hanging Castle Pull Cord Mechanism & State Guard ====================
let isMapAnimating = false; // Strict guard preventing duplicate animations or navigation triggers!

function initPullCordMechanism() {
  const pullCord = document.getElementById('pullCordContainer');
  const ropeLine = document.getElementById('ropeLine');
  const ropeCord = document.getElementById('ropeCord');
  if (!pullCord || !ropeLine || !ropeCord) return;

  // Hover Shimmer Event
  pullCord.addEventListener('mouseenter', () => {
    if (!isMapAnimating) playHoverShimmer();
  });

  let isDragging = false;
  let startY = 0;
  let currentY = 0;

  pullCord.addEventListener('mousedown', (e) => {
    if (isMapAnimating) return;
    isDragging = true;
    startY = e.clientY;
    playRopeTensionSound();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || isMapAnimating) return;
    const deltaY = Math.max(0, Math.min(80, e.clientY - startY));
    currentY = deltaY;

    ropeLine.style.height = `${125 + deltaY}px`;
    ropeCord.style.transform = `translateY(${deltaY}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;

    if (typeof gsap !== 'undefined') {
      gsap.to(ropeLine, { height: 125, duration: 0.4, ease: 'bounce.out' });
      gsap.to(ropeCord, { y: 0, duration: 0.4, ease: 'bounce.out' });
    } else {
      ropeLine.style.height = '125px';
      ropeCord.style.transform = 'translateY(0)';
    }

    if (currentY > 25 && !isMapAnimating) {
      playCeilingUnlockSound();
      triggerAssignmentScroll();
    }
    currentY = 0;
  });

  // Touch support
  pullCord.addEventListener('touchstart', (e) => {
    if (isMapAnimating) return;
    isDragging = true;
    startY = e.touches[0].clientY;
    playRopeTensionSound();
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || isMapAnimating) return;
    const deltaY = Math.max(0, Math.min(80, e.touches[0].clientY - startY));
    currentY = deltaY;

    ropeLine.style.height = `${125 + deltaY}px`;
    ropeCord.style.transform = `translateY(${deltaY}px)`;
  });

  window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    if (typeof gsap !== 'undefined') {
      gsap.to(ropeLine, { height: 125, duration: 0.4, ease: 'bounce.out' });
      gsap.to(ropeCord, { y: 0, duration: 0.4, ease: 'bounce.out' });
    } else {
      ropeLine.style.height = '125px';
      ropeCord.style.transform = 'translateY(0)';
    }

    if (currentY > 25 && !isMapAnimating) {
      playCeilingUnlockSound();
      triggerAssignmentScroll();
    }
    currentY = 0;
  });
}

// ==================== Authentic Marauder's Map Information Scroll Engine ====================
let scrollAutoTimer = null;

function initAssignmentScrollEvents() {
  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const closeBtn = document.getElementById('scrollCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismissAssignmentScroll();
    });
  }

  if (scrollOverlay) {
    scrollOverlay.addEventListener('click', (e) => {
      if (e.target === scrollOverlay) {
        dismissAssignmentScroll();
      }
    });
  }
}

function triggerAssignmentScroll() {
  if (isMapAnimating) return; // Strict state guard: ignore duplicate calls!
  isMapAnimating = true;

  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const marauderCard = document.getElementById('marauderCard');
  const rollerTop = document.getElementById('scrollRollerTop');
  const rollerBottom = document.getElementById('scrollRollerBottom');

  if (!scrollOverlay || !marauderCard) {
    isMapAnimating = false;
    return;
  }

  if (scrollAutoTimer) clearTimeout(scrollAutoTimer);

  scrollOverlay.classList.add('active');

  // Reset opacity of all reveal sections for footprint arrival
  const sectionIds = [
    '#revealTitle',
    '#revealSub',
    '#revealDecree',
    '#landmark1',
    '#landmark2',
    '#landmark3',
    '#landmark4',
    '#landmark5',
    '#revealSeal'
  ];
  sectionIds.forEach(id => {
    const el = document.querySelector(id);
    if (el) el.style.opacity = '0.05';
  });

  playScrollUnrollSound();

  if (typeof anime !== 'undefined') {
    const mapTimeline = anime.timeline({
      easing: 'easeInOutCubic'
    });

    // 1. Parchment Tube Descends from Ceiling & Sways Slightly
    mapTimeline.add({
      targets: [rollerTop, marauderCard, rollerBottom],
      translateY: ['-100vh', 0],
      rotateZ: [-5, 2, 0],
      duration: 1100,
      easing: 'easeOutBack'
    })
    // 2. SVG Pathways & Borders Draw Themselves (Quill Ink)
    .add({
      targets: '#mapPath1, #mapPath2, #mapPath3',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1200,
      easing: 'easeInOutQuad',
      changeBegin: () => playQuillInkSound()
    }, '-=300')
    // 3. Footprint Guided Sequential Section Reveals
    .add({
      targets: '#revealTitle, #revealSub',
      opacity: [0.05, 1],
      translateY: [10, 0],
      duration: 600,
      changeBegin: () => playFootstepSound()
    })
    .add({
      targets: '#revealDecree',
      opacity: [0.05, 1],
      translateY: [10, 0],
      duration: 700,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#landmark1',
      opacity: [0.05, 1],
      scale: [0.9, 1.05, 1],
      duration: 600,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#landmark2',
      opacity: [0.05, 1],
      scale: [0.9, 1.05, 1],
      duration: 600,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#landmark3',
      opacity: [0.05, 1],
      scale: [0.9, 1.05, 1],
      duration: 600,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#landmark4',
      opacity: [0.05, 1],
      scale: [0.9, 1.05, 1],
      duration: 600,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#landmark5',
      opacity: [0.05, 1],
      scale: [0.9, 1.05, 1],
      duration: 600,
      changeBegin: () => playFootstepSound()
    }, '+=150')
    .add({
      targets: '#revealSeal',
      opacity: [0.05, 1],
      scale: [0.8, 1.1, 1],
      duration: 700,
      changeBegin: () => {
        playFootstepSound();
        playFinalSwellSound();
      }
    }, '+=150');
  } else {
    sectionIds.forEach(id => {
      const el = document.querySelector(id);
      if (el) el.style.opacity = '1';
    });
  }

  // Auto Close after 5 seconds of full reveal
  scrollAutoTimer = setTimeout(() => {
    dismissAssignmentScroll();
  }, 5000);
}

function dismissAssignmentScroll() {
  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const marauderCard = document.getElementById('marauderCard');
  const rollerTop = document.getElementById('scrollRollerTop');
  const rollerBottom = document.getElementById('scrollRollerBottom');

  if (!scrollOverlay || !marauderCard) {
    isMapAnimating = false;
    return;
  }

  if (scrollAutoTimer) clearTimeout(scrollAutoTimer);
  playRetractSound();

  if (typeof anime !== 'undefined') {
    anime({
      targets: [rollerTop, marauderCard, rollerBottom],
      translateY: [0, '-100vh'],
      rotateZ: [0, 6],
      opacity: [1, 0],
      duration: 850,
      easing: 'easeInBack',
      complete: () => {
        scrollOverlay.classList.remove('active');
        isMapAnimating = false; // Reset state guard cleanly!
      }
    });
  } else {
    scrollOverlay.classList.remove('active');
    isMapAnimating = false;
  }
}

// Ambient Golden Sparkle Dust Particles
function initAmbientSparkles() {
  const sparklesContainer = document.createElement('div');
  sparklesContainer.className = 'ambientSparkles';
  document.body.appendChild(sparklesContainer);

  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'sparkleParticle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    sparklesContainer.appendChild(particle);
  }
}

// Cauldron Cart State Management
let cartState = {
  items: [],
  totalGalleons: 0,
  count: 0
};

function initCauldronCart() {
  const savedCart = localStorage.getItem('wizarding_cauldron_cart');
  if (savedCart) {
    try {
      cartState = JSON.parse(savedCart);
    } catch (e) {
      cartState = { items: [], totalGalleons: 0, count: 0 };
    }
  }
  updateCauldronBadge();

  const buyButtons = document.querySelectorAll('.buyButton');
  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productCard = button.closest('.productCard');
      if (!productCard) return;

      const productTitle = productCard.querySelector('.productTitle')?.textContent || 'Magical Item';
      const priceText = productCard.querySelector('.productPrice')?.textContent || '0 Galleons';
      
      const priceMatch = priceText.match(/([\d,]+)/);
      const galleons = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;

      addItemToCart(productTitle, galleons);
      showToast(`Added ${productTitle} (${galleons} Galleons) to your Cauldron!`);
    });
  });
}

function addItemToCart(title, galleons) {
  cartState.items.push({ title, galleons });
  cartState.count = cartState.items.length;
  cartState.totalGalleons += galleons;

  localStorage.setItem('wizarding_cauldron_cart', JSON.stringify(cartState));
  updateCauldronBadge();
}

function updateCauldronBadge() {
  const cartBadges = document.querySelectorAll('.cauldronCount');
  cartBadges.forEach(badge => {
    badge.textContent = cartState.count;
    badge.style.display = cartState.count > 0 ? 'inline-flex' : 'none';
  });

  const cartTotals = document.querySelectorAll('.cauldronTotal');
  cartTotals.forEach(totalSpan => {
    totalSpan.textContent = `${cartState.totalGalleons.toLocaleString()} Galleons`;
  });
}

// Toast Notification System
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toastContainer';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toastNotification';
  toast.innerHTML = `
    <svg class="toastIcon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Contact Form Submission Handling
function initContactForm() {
  const contactForm = document.querySelector('.contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const senderName = nameInput ? nameInput.value.trim() : 'Wizard';

    showToast(`Owl Post dispatched for ${senderName}! Expect a reply by return owl within 24 hours.`);
    contactForm.reset();
  });
}

// Responsive Mobile Menu Toggle
function initMobileMenu() {
  const nav = document.querySelector('.mainNav');
  if (!nav) return;

  if (!document.querySelector('.mobileNavToggle')) {
    const headerContent = document.querySelector('.headerContent');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobileNavToggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
    toggleBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;

    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('navOpen');
    });

    if (headerContent) {
      headerContent.appendChild(toggleBtn);
    }
  }
}

// Product Quick-View Modal
function initProductModals() {
  const cards = document.querySelectorAll('.productCard');
  cards.forEach(card => {
    const imageContainer = card.querySelector('.productImage');
    const titleElem = card.querySelector('.productTitle');
    
    [imageContainer, titleElem].forEach(elem => {
      if (elem) {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', () => {
          openQuickView(card);
        });
      }
    });
  });
}

function openQuickView(card) {
  const title = card.querySelector('.productTitle')?.textContent || 'Magical Item';
  const desc = card.querySelector('.productDesc')?.textContent || '';
  const price = card.querySelector('.productPrice')?.textContent || '';
  const stock = card.querySelector('.productStock')?.textContent || '';
  const imgSrc = card.querySelector('.productImage img')?.src || '';

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modalOverlay';
  modalOverlay.innerHTML = `
    <div class="modalContent">
      <button class="modalClose">&times;</button>
      <div class="modalBody">
        <div class="modalImage">
          <img src="${imgSrc}" alt="${title}" />
        </div>
        <div class="modalDetails">
          <h2>${title}</h2>
          <p class="modalDesc">${desc}</p>
          <div class="modalMeta">
            <span class="modalPrice">${price}</span>
            <span class="modalStock">${stock}</span>
          </div>
          <p class="modalGuarantee">Verified by Diagon Alley Craftsmen Guild &bull; Ministry Approved</p>
          <button class="modalBuyBtn buyButton">Add to Cauldron</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  setTimeout(() => modalOverlay.classList.add('active'), 10);

  const closeBtn = modalOverlay.querySelector('.modalClose');
  const modalBuyBtn = modalOverlay.querySelector('.modalBuyBtn');

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => modalOverlay.remove(), 300);
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalBuyBtn.addEventListener('click', () => {
    const buyButtonInCard = card.querySelector('.buyButton');
    if (buyButtonInCard) buyButtonInCard.click();
    closeModal();
  });
}
