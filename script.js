// The Wizarding Emporium - Diagon Alley Interactive E-Commerce & Cinematic GSAP/Anime.js Entrance Logic

document.addEventListener('DOMContentLoaded', () => {
  initAlohomoraEntrance();
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

// Soft Mystical Hover Hum Sound
function playHoverHumSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {}
}

function playSpellCastSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Layer 1: Soft Magical Whoosh (Lowpass Sweep)
  try {
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(550, now + 0.35);

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(750, now);

    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.15);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.55);
  } catch (e) {}

  // Layer 2: Shimmering Bell Tones (E-Major Chimes)
  try {
    [1318.51, 1661.22, 1975.53, 2637.02].forEach((freq, idx) => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.06);

      gain2.gain.setValueAtTime(0.12, now + 0.1 + idx * 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75 + idx * 0.06);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.1 + idx * 0.06);
      osc2.stop(now + 0.85);
    });
  } catch (e) {}

  // Layer 3: Low Mystical Resonance Sub-Tone
  try {
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(110, now);
    osc3.frequency.exponentialRampToValueAtTime(55, now + 0.65);

    gain3.gain.setValueAtTime(0.15, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);

    osc3.start(now);
    osc3.stop(now + 0.8);
  } catch (e) {}

  // Layer 4: High Sparkling Chimes
  try {
    const osc4 = ctx.createOscillator();
    const gain4 = ctx.createGain();

    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(2349.32, now + 0.25);
    osc4.frequency.exponentialRampToValueAtTime(3135.96, now + 0.5);

    gain4.gain.setValueAtTime(0.08, now + 0.25);
    gain4.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc4.connect(gain4);
    gain4.connect(ctx.destination);

    osc4.start(now + 0.25);
    osc4.stop(now + 0.75);
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

// Inward Swirling Sparks Generator
function createInwardSparks() {
  const sparkContainer = document.getElementById('sparkContainer');
  if (!sparkContainer) return;
  sparkContainer.innerHTML = '';

  const sparkCount = 14;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'inwardSpark';
    
    const angle = (i / sparkCount) * Math.PI * 2;
    const distance = 160 + Math.random() * 40;
    
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    
    spark.style.left = `calc(50% + ${startX}px)`;
    spark.style.top = `calc(50% + ${startY}px)`;
    
    sparkContainer.appendChild(spark);
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
      
      // Auto-trigger Marauder Assignment Scroll ONLY ONCE PER DAY
      const todayStr = new Date().toDateString();
      const lastShownDate = localStorage.getItem('marauderScrollLastShownDate');
      if (lastShownDate !== todayStr) {
        localStorage.setItem('marauderScrollLastShownDate', todayStr);
        setTimeout(() => triggerAssignmentScroll(true), 500);
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

  // Dormant Book Hover Interaction (First Hover)
  let hoveredOnce = false;
  alohomoraBtn.addEventListener('mouseenter', () => {
    if (hoveredOnce) return;
    hoveredOnce = true;
    playHoverHumSound();

    if (typeof gsap !== 'undefined') {
      gsap.to('#spellbook3D', { x: 2, y: -2, duration: 0.25, yoyo: true, repeat: 1 });
      gsap.to('#spellbookLock', { boxShadow: '0 0 45px rgba(212, 175, 55, 0.95), 0 0 70px rgba(245, 234, 175, 0.8)', duration: 0.4 });
      gsap.to('.engravedSymbolsSVG path', { opacity: 0.35, duration: 0.4, yoyo: true, repeat: 1 });
    }
  });

  let animationStarted = false;

  alohomoraBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (animationStarted) return;
    animationStarted = true;

    // Play Multi-Layer Sound & Create Sparks
    playSpellCastSound();
    createInwardSparks();

    if (typeof anime === 'undefined' || typeof gsap === 'undefined') {
      revealHomepage();
      return;
    }

    // GSAP Orchestrated Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    // Step 1: Depress Button
    tl.to('#alohomoraBtn', { scale: 0.92, duration: 0.15 })
    // Step 2: Ignite Engravings & Reveal Magic Circle
    .to('.engravedSymbolsSVG path', { opacity: 0.45, duration: 0.5 }, '+=0.1')
    .to('.magicCircleSVG', { opacity: 1, duration: 0.4 }, '<')
    // Step 3: SVG Magic Circle Stroke Animation
    .add(() => {
      anime({
        targets: '#outerCircle, #innerCircle, #starRune1',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1100,
        easing: 'easeInOutCubic'
      });
      anime({
        targets: '.runeTextPath',
        opacity: [0, 1],
        rotate: [0, 360],
        duration: 950,
        easing: 'easeOutQuad'
      });
      anime({
        targets: '.inwardSpark',
        opacity: [0, 1, 0],
        scale: [1, 0.2],
        translateX: (el, i) => [0, -parseInt(el.style.left) + window.innerWidth / 2],
        translateY: (el, i) => [0, -parseInt(el.style.top) + window.innerHeight / 2],
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeInCubic'
      });
    }, '-=0.2')
    // Step 4 & 5: Book Vibrates & Lock Glows
    .to('#spellbook3D', { x: -6, duration: 0.08, yoyo: true, repeat: 5 }, '+=0.4')
    .to('#spellbookLock', { boxShadow: '0 0 60px rgba(212, 175, 55, 1), 0 0 90px rgba(245, 234, 175, 0.9)', duration: 0.3 }, '<')
    // Step 6 & 7: Lock Unlocks & Drops with Bounce
    .to('#spellbookLock', { rotate: 45, duration: 0.18, onComplete: () => playLockClickSound() })
    .to('#spellbookLock', { y: 160, opacity: 0, duration: 0.65, ease: 'bounce.out' })
    // Step 8 & 9: Book Cover Opens 3D & Golden Light Escapes
    .to('#spellbookFrontCover', { rotateY: -115, duration: 0.95, ease: 'power2.inOut' }, '-=0.3')
    .to('.spellbookPagesLayer::after', { opacity: 1, duration: 0.5 }, '-=0.6')
    // Step 10 & 11: Pages Expand to Reveal Homepage
    .to('#spellbook3D', { scale: 3.5, opacity: 0, duration: 0.8, ease: 'power2.in', onComplete: revealHomepage }, '-=0.2');
  });
}

// ==================== Authentic Marauder's Map Information Scroll Modal ====================
let scrollTimer = null;

function initAssignmentScrollEvents() {
  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const closeBtn = document.getElementById('scrollCloseBtn');
  const footerBtn = document.getElementById('footerScrollBtn');

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

  if (footerBtn) {
    footerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAssignmentScroll(false); // Manual footer replay always runs!
    });
  }
}

function triggerAssignmentScroll(isAutoClose = true) {
  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const marauderCard = document.getElementById('marauderCard');
  if (!scrollOverlay || !marauderCard) return;

  if (scrollTimer) clearTimeout(scrollTimer);

  marauderCard.style.transform = 'scale(1)';
  scrollOverlay.classList.add('active');

  if (typeof anime !== 'undefined') {
    const mapTimeline = anime.timeline({
      easing: 'easeInOutCubic'
    });

    // Step 1: Unfold Parchment
    mapTimeline.add({
      targets: marauderCard,
      scale: [0.85, 1],
      rotateZ: [-6, 0],
      rotateX: [15, 0],
      opacity: [0, 1],
      duration: 850,
      easing: 'easeOutBack'
    })
    // Step 2: Compass & Hand-Drawn SVG Pathways Inking
    .add({
      targets: '#mapPath1, #mapPath2, #mapPath3',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1100,
      easing: 'easeInOutQuad'
    }, '-=300')
    // Step 3: Footprints Walking Sequential Journey
    .add({
      targets: '.walkingFootprint',
      opacity: [0, 0.9, 0],
      translateX: (el, i) => [i * 60, (i + 1) * 140],
      translateY: (el, i) => [i * 20, (i + 1) * 45],
      duration: 1200,
      delay: anime.stagger(180),
      easing: 'easeInOutQuad'
    }, '-=700')
    // Step 4: Landmarks Sequential Illumination
    .add({
      targets: '.mapLandmarkCard',
      opacity: [0.3, 1],
      scale: [0.95, 1.05, 1],
      delay: anime.stagger(140),
      duration: 700,
      changeBegin: () => {
        const landmarks = document.querySelectorAll('.mapLandmarkCard');
        landmarks.forEach(lm => lm.classList.add('activeLandmark'));
      }
    }, '-=800');
  } else {
    marauderCard.style.opacity = '1';
  }

  if (isAutoClose) {
    scrollTimer = setTimeout(() => {
      dismissAssignmentScroll();
    }, 6500);
  }
}

function dismissAssignmentScroll() {
  const scrollOverlay = document.getElementById('assignmentScrollOverlay');
  const marauderCard = document.getElementById('marauderCard');
  if (!scrollOverlay || !marauderCard) return;

  if (scrollTimer) clearTimeout(scrollTimer);

  if (typeof anime !== 'undefined') {
    anime({
      targets: marauderCard,
      translateY: [0, '-70vh'],
      rotateZ: [0, 10],
      scale: [1, 0.75],
      opacity: [1, 0],
      duration: 750,
      easing: 'easeInBack',
      complete: () => {
        scrollOverlay.classList.remove('active');
        const landmarks = document.querySelectorAll('.mapLandmarkCard');
        landmarks.forEach(lm => lm.classList.remove('activeLandmark'));
      }
    });
  } else {
    scrollOverlay.classList.remove('active');
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
