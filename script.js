// The Wizarding Emporium - Diagon Alley Interactive E-Commerce Logic

document.addEventListener('DOMContentLoaded', () => {
  initAmbientSparkles();
  initCauldronCart();
  initContactForm();
  initMobileMenu();
  initProductModals();
});

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
