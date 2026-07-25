/**
 * js/ui.js
 * =========
 * Ambient UI utilities:
 *  - Ambient golden sparkle dust
 *  - Responsive mobile navigation toggle
 *  - Shop by Category interactive wand-trace animations & orbit particles
 */

'use strict';

function initAmbientSparkles() {
  if (document.querySelector('.ambientSparkles')) return;
  const container     = document.createElement('div');
  container.className = 'ambientSparkles';
  document.body.appendChild(container);

  const count = 18;
  for (let i = 0; i < count; i++) {
    const p      = document.createElement('div');
    p.className  = 'sparkleParticle';
    const size   = Math.random() * 4 + 2;
    p.style.width             = `${size}px`;
    p.style.height            = `${size}px`;
    p.style.left              = `${Math.random() * 100}vw`;
    p.style.top               = `${Math.random() * 100}vh`;
    p.style.animationDuration = `${Math.random() * 6 + 6}s`;
    p.style.animationDelay    = `${Math.random() * 5}s`;
    container.appendChild(p);
  }
}

function initMobileMenu() {
  const nav = document.querySelector('.mainNav');
  if (!nav || document.querySelector('.mobileNavToggle')) return;

  const headerContent = document.querySelector('.headerContent');
  const btn           = document.createElement('button');
  btn.className       = 'mobileNavToggle';
  btn.setAttribute('aria-label', 'Toggle Navigation Menu');
  btn.innerHTML       = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6"  x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `;
  btn.addEventListener('click', () => nav.classList.toggle('navOpen'));
  if (headerContent) headerContent.appendChild(btn);
}

// ── Category Trace & Sparkle Animations ───────────────────────────────────────

function initTraceAnimations() {
  const tracePaths = document.querySelectorAll('.traceMotionPath');
  tracePaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray  = length;
    path.style.strokeDashoffset = length;
    path.dataset.traceLength    = length;
  });
}

function initCategoryHoverEffects() {
  const cards = document.querySelectorAll('.categoryCardOuter');
  if (!cards.length) return;

  cards.forEach((card) => {
    const tracePath    = card.querySelector('.traceMotionPath');
    const traceBg      = card.querySelector('.categoryTraceBg');
    const cornerSparks = card.querySelectorAll('.cornerSpark');
    const traceLength  = tracePath ? parseFloat(tracePath.dataset.traceLength) : 600;

    card.addEventListener('mouseenter', () => {
      if (tracePath && typeof anime !== 'undefined') {
        anime({
          targets: tracePath,
          strokeDashoffset: [traceLength, 0],
          duration: 800,
          easing: 'easeInOutQuad',
        });
      }

      if (traceBg && typeof anime !== 'undefined') {
        anime({
          targets: traceBg,
          opacity: [0.18, 0.4],
          duration: 500,
          easing: 'easeOutQuad',
        });
      }

      const rect = card.getBoundingClientRect();
      if (typeof burstSparklesAt === 'function') {
        burstSparklesAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
      }

      cornerSparks.forEach((spark, i) => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: spark,
            opacity: [0, 1, 0],
            scale: [0, 2.5, 0],
            duration: 600,
            delay: i * 150,
            easing: 'easeOutQuad',
          });
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      if (tracePath && typeof anime !== 'undefined') {
        anime({
          targets: tracePath,
          strokeDashoffset: [0, traceLength],
          duration: 500,
          easing: 'easeInQuad',
        });
      }
      if (traceBg && typeof anime !== 'undefined') {
        anime({
          targets: traceBg,
          opacity: [0.4, 0.18],
          duration: 500,
          easing: 'easeOutQuad',
        });
      }
    });

    card.addEventListener('click', () => {
      const rect = card.getBoundingClientRect();
      if (typeof burstSparklesAt === 'function') {
        burstSparklesAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
      }

      if (typeof anime !== 'undefined') {
        anime({
          targets: card,
          scale: [1, 0.93, 1.04, 1],
          duration: 600,
          easing: 'easeOutElastic(1, .5)',
        });
      }

      if (tracePath && typeof anime !== 'undefined') {
        const len = parseFloat(tracePath.dataset.traceLength);
        tracePath.style.strokeDashoffset = len;
        anime({
          targets: tracePath,
          strokeDashoffset: [len, 0],
          duration: 700,
          easing: 'easeInOutQuad',
        });
      }
    });
  });
}

function initOrbitParticles() {
  const cards = document.querySelectorAll('.categoryCardOuter');
  cards.forEach((card) => {
    const particles = card.querySelectorAll('.orbitParticle');
    const traceArea = card.querySelector('.categoryTraceArea');
    if (!traceArea) return;

    particles.forEach((p, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const dist = 55 + Math.random() * 35;
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.marginLeft = '-1.5px';
      p.style.marginTop = '-1.5px';

      let currentAngle = angle;
      const orbitInterval = setInterval(() => {
        if (!traceArea.isConnected) {
          clearInterval(orbitInterval);
          return;
        }
        currentAngle += 0.015;
        const x = 50 + Math.cos(currentAngle) * ((dist / (traceArea.offsetWidth || 250)) * 100);
        const y = 50 + Math.sin(currentAngle) * ((dist / (traceArea.offsetHeight || 260)) * 100);
        p.style.left = x + '%';
        p.style.top = y + '%';
        p.style.opacity = 0.25 + 0.35 * Math.sin(currentAngle * 2);
      }, 50);
    });

    card.addEventListener('mouseenter', () => {
      particles.forEach((p, i) => {
        const burstAngle = (i / particles.length) * Math.PI * 2;
        const burstDist = 80 + Math.random() * 50;
        const tx = Math.cos(burstAngle) * burstDist;
        const ty = Math.sin(burstAngle) * burstDist;
        if (typeof anime !== 'undefined') {
          anime({
            targets: p,
            translateX: [0, tx, 0],
            translateY: [0, ty, 0],
            opacity: [0, 1, 0.5],
            scale: [0.5, 2, 1],
            duration: 1200 + Math.random() * 400,
            easing: 'easeOutElastic(1, .5)',
          });
        }
      });
    });
  });
}
