/**
 * js/contact-form.js
 * ===================
 * Owl Post desk interactions and the 9-step cinematic form submission sequence.
 * Also handles the Daily Prophet newspaper unfold animation.
 *
 * Dependencies (must be loaded before this file):
 *   anime.min.js, gsap.min.js, js/audio.js
 */

'use strict';

// ── Daily Prophet unfold (contact page) ───────────────────────────────────────

function initProphetAnimation() {
  const panel = document.getElementById('prophetPanel');
  if (!panel || typeof anime === 'undefined') return;

  if (window.innerWidth >= 900) {
    panel.style.transformOrigin = 'top center';
    panel.style.transform       = 'scaleY(0.15) perspective(600px) rotateX(30deg)';
    panel.style.opacity         = '0';
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();

    playPaperUnfoldSound();

    anime.timeline({ easing: 'easeOutBack' })
      .add({ targets: panel, scaleY: [0.15, 1.04], rotateX: [30, -2], opacity: [0, 1], duration: 750, easing: 'easeOutBack' })
      .add({ targets: panel, scaleY: [1.04, 0.99, 1], rotateX: [-2, 1, 0], duration: 350, easing: 'easeInOutQuad' })
      .add({ targets: '.prophetNameplate, .prophetMeta', opacity: [0, 1], duration: 400 }, '-=100')
      .add({ targets: '#prophetGrid .prophetArticle', opacity: [0, 1], translateY: [10, 0],
             duration: 500, delay: anime.stagger(90), easing: 'easeOutCubic' }, '-=200')
      .add({ targets: '.prophetSVGPath', strokeDashoffset: [anime.setDashoffset, 0],
             duration: 1000, delay: anime.stagger(160), easing: 'easeInOutSine',
             changeBegin: () => playQuillInkSound() }, '-=100');

    _spawnProphetDust(panel);
  }, { threshold: 0.2 });

  observer.observe(panel);
}

function _spawnProphetDust(panel) {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const dust      = document.createElement('div');
      dust.className  = 'prophetDust';
      const size      = Math.random() * 5 + 2;
      dust.style.width            = `${size}px`;
      dust.style.height           = `${size}px`;
      dust.style.left             = `${10 + Math.random() * 80}%`;
      dust.style.bottom           = `${10 + Math.random() * 60}%`;
      dust.style.animationDuration = `${2 + Math.random() * 2}s`;
      dust.style.animationDelay   = `${Math.random() * 0.5}s`;
      panel.appendChild(dust);
      setTimeout(() => dust.remove(), 4000);
    }, i * 80);
  }
}

// ── Desk ambient load (contact page) ─────────────────────────────────────────

function initDeskLoadSequence() {
  const desk      = document.getElementById('owlDeskPanel');
  const parchment = document.getElementById('deskParchment');
  if (!desk || !parchment) return;

  if (window.innerWidth < 900) {
    parchment.style.opacity = '1';
    return;
  }

  const objs = desk.querySelectorAll('.deskObj');
  objs.forEach(o => { o.style.opacity = '0'; });

  setTimeout(() => {
    if (typeof anime === 'undefined') {
      objs.forEach(o => { o.style.opacity = '1'; });
      parchment.style.opacity   = '1';
      parchment.style.transform = 'none';
      return;
    }
    anime.timeline({ easing: 'easeOutCubic' })
      .add({ targets: '.deskObj--candle',   opacity: [0, 1], duration: 500, changeBegin: () => playHoverHumSound() })
      .add({ targets: '.deskObj--quill',    opacity: [0, 1], translateY: [-8, 0], duration: 600 }, '-=100')
      .add({ targets: '.deskObj--inkpot, .deskObj--key', opacity: [0, 1], duration: 450 }, '-=200')
      .add({ targets: '.deskObj--parchment, .deskObj--crystal, .deskObj--spectacles, .deskObj--feather',
             opacity: [0, 1], duration: 500, delay: anime.stagger(75) }, '-=200')
      .add({ targets: parchment, opacity: [0, 1], translateY: [8, 0], duration: 550,
             changeBegin: () => playHoverShimmer() }, '-=100');
  }, window.innerWidth >= 900 ? 1300 : 0);
}

// ── Owl Post desk form interactions ──────────────────────────────────────────

function initOwlPostDesk() {
  const form = document.getElementById('owlPostForm');
  if (!form) return;

  // Per-keystroke quill chime
  form.querySelectorAll('.parchmentInput, .parchmentTextarea').forEach(field => {
    field.addEventListener('keydown', (e) => { if (e.key.length === 1) playQuillFocusChime(); });
    field.addEventListener('focus',   ()  => _spawnParchmentSparkle(field));
  });

  // 9-step cinematic submission
  const btn = document.getElementById('waxSealBtn');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    btn.disabled = true;

    // 1. Wax glows
    await _animeP({ targets: btn,
      boxShadow: ['0 0 0 5px rgba(139,60,30,.42), 0 8px 24px rgba(0,0,0,.72)',
                  '0 0 0 14px rgba(192,57,43,.5), 0 0 55px rgba(200,60,40,.75), 0 8px 24px rgba(0,0,0,.85)'],
      duration: 420 });

    // 2. Seal presses
    playWaxSealSound();
    await _animeP({ targets: btn, scale: [1, 0.76, 1.08, 1], duration: 580, easing: 'easeInOutBack' });

    // 3. Letter folds
    playPaperFoldSound();
    const parchment = document.getElementById('deskParchment');
    await _animeP({ targets: parchment, scaleY: [1, 0.02], opacity: [1, 0], duration: 680, easing: 'easeInBack' });

    // 4. Envelope seals
    _spawnEnvelopeSeal();
    await _sleep(480);

    // 5. Owl lands
    const owlWrap = document.getElementById('owlFlyWrap');
    if (owlWrap) {
      owlWrap.style.cssText = 'display:block;position:fixed;top:38%;left:50%;transform:translate(-50%,-50%);';
      playOwlHootSound();
      await _animeP({ targets: owlWrap, translateY: ['-62vh', 0], opacity: [0, 1], duration: 750, easing: 'easeOutBack' });

      // 6. Head scan
      await _animeP({ targets: owlWrap, rotate: [-9, 9, -5, 0], duration: 850, easing: 'easeInOutSine' });

      // 7. Wings flap, depart
      await _animeP({ targets: '#owlWingL', rotate: [0, -42, 0, -36, 0], duration: 500 });
      playWindWhooshSound();
      await _animeP({ targets: owlWrap, translateX: [0, '-145vw'], translateY: [0, '-38vh'],
                      rotate: [0, -18], opacity: [1, 0], duration: 1150, easing: 'easeInCubic' });
      owlWrap.style.display = 'none';
    }

    // 8. Feather falls
    _spawnFallingFeather();
    await _sleep(850);

    // 9. Confirmation
    const conf = document.getElementById('owlConfirmation');
    if (conf) {
      conf.style.display = 'flex';
      conf.setAttribute('aria-hidden', 'false');
      await _animeP({ targets: conf, opacity: [0, 1], translateY: [20, 0], duration: 650 });
    }

    form.reset();
    btn.disabled = false;
  });
}

// ── Private helpers ───────────────────────────────────────────────────────────

function _spawnParchmentSparkle(field) {
  const wrap = field.closest('.parchmentField') || field.closest('.parchmentTextareaWrap');
  if (!wrap) return;
  const spark         = document.createElement('div');
  spark.className     = 'parchSparkle';
  spark.style.cssText = 'position:absolute;left:0;bottom:0;z-index:10;';
  wrap.style.position = 'relative';
  wrap.appendChild(spark);
  if (typeof anime !== 'undefined') {
    anime({ targets: spark, left: ['0%','100%'], opacity: [0.9, 0], duration: 600,
            easing: 'easeOutCubic', complete: () => spark.remove() });
  } else {
    setTimeout(() => spark.remove(), 700);
  }
}

function _spawnEnvelopeSeal() {
  const parchment = document.getElementById('deskParchment');
  if (!parchment) return;
  const flash     = document.createElement('div');
  flash.className = 'envelopeSealFlash';
  parchment.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

function _spawnFallingFeather() {
  const feather      = document.createElement('div');
  feather.className  = 'fallingFeather';
  feather.style.top  = '35%';
  feather.style.left = `${45 + Math.random() * 10}%`;
  feather.innerHTML  = `<svg width="14" height="55" viewBox="0 0 14 55">
    <path d="M7 0 C3 14 2 26 5 42 L7 55" stroke="#c8a870" stroke-width="1.1" fill="none"/>
    <path d="M7 6  C4 10 1 14 0 22" stroke="#c8a870" stroke-width="0.65" fill="none" opacity="0.55"/>
    <path d="M7 15 C4 19 1 23 0 31" stroke="#c8a870" stroke-width="0.65" fill="none" opacity="0.55"/>
    <path d="M7 6  C10 10 13 14 14 22" stroke="#c8a870" stroke-width="0.65" fill="none" opacity="0.55"/>
    <path d="M7 15 C10 19 13 23 14 31" stroke="#c8a870" stroke-width="0.65" fill="none" opacity="0.55"/>
  </svg>`;
  document.body.appendChild(feather);
  setTimeout(() => feather.remove(), 2800);
}

function _animeP(params) {
  return new Promise(resolve => anime({ ...params, complete: resolve }));
}

function _sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Legacy contact form fallback (non-parchment pages)
function initContactForm() {
  const form = document.querySelector('.contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim() || 'Wizard';
    showToast(`Owl Post dispatched for ${name}! Expect a reply within 24 hours.`);
    form.reset();
  });
}
