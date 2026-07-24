// The Wizarding Emporium - Diagon Alley Interactive E-Commerce & Anime.js Alohomora Entrance Logic

document.addEventListener('DOMContentLoaded', () => {
  initAlohomoraEntrance();
  initAmbientSparkles();
  initCauldronCart();
  initContactForm();
  initMobileMenu();
  initProductModals();
});

// ==================== Web Audio API Layered Sound Synthesizer ====================
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

function playSpellCastSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Layer 1: Soft Whoosh (Subtle Noise / Sweep)
  try {
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.exponentialRampToValueAtTime(600, now + 0.3);

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(800, now);

    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.15);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.5);
  } catch (e) {}

  // Layer 2: Magical Bell (High Sine Chimes in E-major)
  try {
    [1318.51, 1661.22, 1975.53].forEach((freq, idx) => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.05);

      gain2.gain.setValueAtTime(0.12, now + 0.1 + idx * 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7 + idx * 0.05);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.1 + idx * 0.05);
      osc2.stop(now + 0.8);
    });
  } catch (e) {}

  // Layer 3: Low Resonance Warmth
  try {
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(110, now);
    osc3.frequency.exponentialRampToValueAtTime(55, now + 0.6);

    gain3.gain.setValueAtTime(0.15, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);

    osc3.start(now);
    osc3.stop(now + 0.75);
  } catch (e) {}
}

function playLockClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

// ==================== Anime.js 3D Alohomora Entrance Timeline ====================
function initAlohomoraEntrance() {
  const overlay = document.getElementById('spellbookOverlay');
  const mainContainer = document.getElementById('mainPageContainer');
  if (!overlay) return;

  const isAlreadyOpened = sessionStorage.getItem('spellbookOpened') === 'true';
  const isSubPage = !window.location.pathname.endsWith('index.html') && window.location.pathname.endsWith('.html');

  if (isAlreadyOpened || isSubPage) {
    overlay.style.display = 'none';
    if (mainContainer) mainContainer.style.opacity = '1';
    return;
  }

  if (mainContainer) mainContainer.style.opacity = '0';

  const alohomoraBtn = document.getElementById('alohomoraBtn');
  const skipBtn = document.getElementById('skipEntrance');

  const revealHomepage = () => {
    sessionStorage.setItem('spellbookOpened', 'true');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      if (mainContainer) {
        mainContainer.style.opacity = '1';
        // Staggered Anime.js entrance for homepage elements
        if (typeof anime !== 'undefined') {
          anime({
            targets: '.mainHeader, .heroBanner, .productCard, .categoryCard',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutCubic'
          });
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

  let animationStarted = false;

  alohomoraBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (animationStarted) return;
    animationStarted = true;

    // Step 1: Click & Sound
    playSpellCastSound();

    if (typeof anime === 'undefined') {
      revealHomepage();
      return;
    }

    const timeline = anime.timeline({
      easing: 'easeInOutCubic'
    });

    // Step 1: Depress Button
    timeline.add({
      targets: '#alohomoraBtn',
      scale: 0.92,
      duration: 150,
      easing: 'easeOutQuad'
    })
    // Step 2: 200ms Anticipation delay & SVG Magic Circle Stroke Animation
    .add({
      targets: '#outerCircle, #innerCircle, #starRune1',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1100,
      easing: 'easeInOutCubic'
    }, '+=200')
    // Runes Fade & Rotate
    .add({
      targets: '.runeTextPath',
      opacity: [0, 1],
      rotate: [0, 360],
      duration: 1000,
      easing: 'easeOutQuad'
    }, '-=800')
    // Step 3: Spellbook Shake & Lock Glow
    .add({
      targets: '#spellbook3D',
      translateX: [-8, 8, -6, 6, -3, 3, 0],
      duration: 500,
      easing: 'easeInOutSine'
    }, '-=200')
    .add({
      targets: '#spellbookLock',
      boxShadow: [
        '0 0 20px rgba(212, 175, 55, 0.4)',
        '0 0 50px rgba(212, 175, 55, 0.95), 0 0 80px rgba(245, 234, 175, 0.8)'
      ],
      duration: 400
    }, '-=400')
    // Step 4: Lock Click & Drop with Bounce
    .add({
      targets: '#spellbookLock',
      rotate: 45,
      duration: 180,
      complete: () => playLockClickSound()
    })
    .add({
      targets: '#spellbookLock',
      translateY: [0, 160],
      opacity: [1, 0],
      duration: 650,
      easing: 'easeOutBounce'
    })
    // Step 5: Book Cover Opens 3D
    .add({
      targets: '#spellbookFrontCover',
      rotateY: [0, -115],
      duration: 950,
      easing: 'easeInOutQuad'
    }, '-=300')
    // Golden Light Glow Emerges from Pages Layer
    .add({
      targets: '.spellbookPagesLayer::after',
      opacity: [0, 1],
      duration: 500
    }, '-=600')
    // Step 6: Pages Expand to Fill Viewport & Reveal Homepage
    .add({
      targets: '#spellbook3D',
      scale: [1, 3.5],
      opacity: [1, 0],
      duration: 800,
      easing: 'easeInCubic',
      complete: () => {
        revealHomepage();
      }
    }, '-=200');
  });
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
