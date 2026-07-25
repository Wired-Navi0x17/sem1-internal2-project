/**
 * static/js/cart.js
 * ==================
 * Interactive Cauldron Cart Drawer GUI controller, state management,
 * currency conversion, toast notifications, and product quick-view modal.
 */

'use strict';

let cartState = { items: [], totalGalleons: 0, count: 0 };

function initCauldronCart() {
  const saved = localStorage.getItem('wizarding_cauldron_cart');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.items)) {
        cartState.items = parsed.items;
      }
    } catch (_) {
      cartState = { items: [], totalGalleons: 0, count: 0 };
    }
  }
  recalculateCartTotals();
  updateCauldronBadge();
  setupCartEventListeners();

  document.querySelectorAll('.buyButton').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.productCard');
      if (!card) return;
      const title    = card.querySelector('.productTitle')?.textContent?.trim() || 'Magical Item';
      const priceStr = card.querySelector('.productPrice')?.textContent?.trim() || '0 Galleons';
      const match    = priceStr.match(/([\d,]+)/);
      const galleons = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
      const imgSrc   = card.querySelector('.productImage img')?.getAttribute('src') || 'static/images/wand.jpg';

      addItemToCart(title, galleons, imgSrc);
      showToast(`Added ${title} (${galleons} Galleons) to your Cauldron!`);
      
      if (typeof playSparkleSound === 'function') {
        playSparkleSound();
      }
    });
  });
}

function setupCartEventListeners() {
  // Bind cauldron badge to open cart drawer
  document.querySelectorAll('.cauldronBadge').forEach(badge => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      openCauldronCartDrawer();
    });
  });

  // Delegate events inside component injection container
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('#closeCartBtn') || e.target.id === 'cauldronCartOverlay') {
      closeCauldronCartDrawer();
    }
    if (e.target.closest('#clearCartBtn')) {
      clearCauldronCart();
    }
    if (e.target.closest('#checkoutCartBtn')) {
      triggerOwlPostCheckout();
    }
    if (e.target.closest('#closeCheckoutModalBtn') || e.target.closest('#finishCheckoutBtn')) {
      closeCheckoutReceiptModal();
    }
  });
}

function recalculateCartTotals() {
  let count = 0;
  let total = 0;
  cartState.items.forEach(item => {
    count += item.quantity;
    total += item.galleons * item.quantity;
  });
  cartState.count = count;
  cartState.totalGalleons = total;
  localStorage.setItem('wizarding_cauldron_cart', JSON.stringify(cartState));
}

function addItemToCart(title, galleons, imgSrc) {
  const existing = cartState.items.find(item => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartState.items.push({
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      title,
      galleons,
      imgSrc,
      quantity: 1
    });
  }
  recalculateCartTotals();
  updateCauldronBadge();
  if (document.getElementById('cauldronCartOverlay')?.classList.contains('active')) {
    renderCartDrawer();
  }
}

function updateItemQuantity(id, delta) {
  const item = cartState.items.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cartState.items = cartState.items.filter(i => i.id !== id);
  }
  recalculateCartTotals();
  updateCauldronBadge();
  renderCartDrawer();
}

function removeItemFromCart(id) {
  cartState.items = cartState.items.filter(i => i.id !== id);
  recalculateCartTotals();
  updateCauldronBadge();
  renderCartDrawer();
}

function clearCauldronCart() {
  cartState.items = [];
  recalculateCartTotals();
  updateCauldronBadge();
  renderCartDrawer();
  showToast('Cauldron emptied!');
}

function updateCauldronBadge() {
  document.querySelectorAll('.cauldronCount').forEach(badge => {
    badge.textContent = cartState.count;
    badge.style.display = cartState.count > 0 ? 'inline-flex' : 'none';
  });
  document.querySelectorAll('.cauldronTotal').forEach(span => {
    span.textContent = `${cartState.totalGalleons.toLocaleString()} Galleons`;
  });
}

// ── Cart Drawer GUI ─────────────────────────────────────────────────────────

function openCauldronCartDrawer() {
  const overlay = document.getElementById('cauldronCartOverlay');
  if (!overlay) return;
  renderCartDrawer();
  overlay.classList.add('active');
}

function closeCauldronCartDrawer() {
  const overlay = document.getElementById('cauldronCartOverlay');
  if (overlay) overlay.classList.remove('active');
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const grandTotalEl = document.getElementById('cartGrandTotalGalleons');
  const sicklesEl    = document.getElementById('cartTotalSickles');
  const knutsEl      = document.getElementById('cartTotalKnuts');

  if (!body) return;

  const galleons = cartState.totalGalleons;
  const sickles  = galleons * 17;
  const knuts    = galleons * 493;

  if (grandTotalEl) grandTotalEl.textContent = `${galleons.toLocaleString()} Galleons`;
  if (sicklesEl)    sicklesEl.textContent    = sickles.toLocaleString();
  if (knutsEl)      knutsEl.textContent      = knuts.toLocaleString();

  if (cartState.items.length === 0) {
    body.innerHTML = `
      <div class="cartEmptyState">
        <svg class="emptyCauldronIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8.4 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51C4 22 3.24 19.99 3.54 17.53L4.44 10.03C4.66 8.09 5 6.5 8.4 6.5Z"/>
        </svg>
        <h3>Your Cauldron is Empty</h3>
        <p>Browse Diagon Alley's finest magical supplies and add wands, brooms, or rare artefacts to your cauldron.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="cartItemList">`;
  cartState.items.forEach(item => {
    const itemTotal = item.galleons * item.quantity;
    html += `
      <div class="cartItemRow" data-id="${item.id}">
        <div class="cartItemThumb">
          <img src="${item.imgSrc}" alt="${item.title}" />
        </div>
        <div class="cartItemDetails">
          <h4 class="cartItemTitle">${item.title}</h4>
          <span class="cartItemPrice">${item.galleons.toLocaleString()} Galleons each</span>
          <div class="cartItemControls">
            <div class="qtySelector">
              <button class="qtyBtn minus" onclick="updateItemQuantity('${item.id}', -1)">&minus;</button>
              <span class="qtyVal">${item.quantity}</span>
              <button class="qtyBtn plus" onclick="updateItemQuantity('${item.id}', 1)">&plus;</button>
            </div>
            <span class="cartItemSubtotal">${itemTotal.toLocaleString()} Gal.</span>
          </div>
        </div>
        <button class="cartItemRemove" onclick="removeItemFromCart('${item.id}')" title="Remove Item">&times;</button>
      </div>
    `;
  });
  html += `</div>`;
  body.innerHTML = html;
}

// ── Checkout Flow ─────────────────────────────────────────────────────────────

function triggerOwlPostCheckout() {
  if (cartState.items.length === 0) {
    showToast('Your Cauldron is empty! Add items before checkout.');
    return;
  }

  const orderRef = 'WIZ-' + Math.floor(10000 + Math.random() * 90000);
  const receiptItemsList = document.getElementById('receiptItemsList');
  const receiptTotal     = document.getElementById('receiptTotalGalleons');
  const receiptOrderRef  = document.getElementById('receiptOrderRef');

  if (receiptOrderRef) receiptOrderRef.textContent = '#' + orderRef;
  if (receiptTotal)    receiptTotal.textContent    = `${cartState.totalGalleons.toLocaleString()} Galleons`;

  if (receiptItemsList) {
    let html = ``;
    cartState.items.forEach(item => {
      html += `
        <div class="receiptRow">
          <span>${item.quantity}x ${item.title}</span>
          <strong>${(item.galleons * item.quantity).toLocaleString()} Gal.</strong>
        </div>
      `;
    });
    receiptItemsList.innerHTML = html;
  }

  closeCauldronCartDrawer();
  const checkoutModal = document.getElementById('checkoutModalOverlay');
  if (checkoutModal) checkoutModal.classList.add('active');

  // Clear cart after dispatch
  cartState.items = [];
  recalculateCartTotals();
  updateCauldronBadge();

  if (typeof playFinalSwellSound === 'function') {
    playFinalSwellSound();
  }
}

function closeCheckoutReceiptModal() {
  const checkoutModal = document.getElementById('checkoutModalOverlay');
  if (checkoutModal) checkoutModal.classList.remove('active');
  showToast('Owl Post dispatched! Your order will arrive via Barn Owl.');
}

// ── Toast Notifications ───────────────────────────────────────────────────────

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container            = document.createElement('div');
    container.id         = 'toastContainer';
    container.className  = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast      = document.createElement('div');
  toast.className  = 'toastNotification';
  toast.innerHTML  = `
    <svg class="toastIcon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── Product Quick-View Modal ──────────────────────────────────────────────────

function initProductModals() {
  document.querySelectorAll('.productCard').forEach(card => {
    ['.productImage', '.productTitle'].forEach(sel => {
      const el = card.querySelector(sel);
      if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => openQuickView(card));
      }
    });
  });
}

function openQuickView(card) {
  const title  = card.querySelector('.productTitle')?.textContent || 'Magical Item';
  const desc   = card.querySelector('.productDesc')?.textContent  || '';
  const price  = card.querySelector('.productPrice')?.textContent || '';
  const stock  = card.querySelector('.productStock')?.textContent || '';
  const imgSrc = card.querySelector('.productImage img')?.src     || '';

  const overlay       = document.createElement('div');
  overlay.className   = 'modalOverlay';
  overlay.innerHTML   = `
    <div class="modalContent">
      <button class="modalClose">&times;</button>
      <div class="modalBody">
        <div class="modalImage"><img src="${imgSrc}" alt="${title}" /></div>
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
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('active'), 10);

  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };

  overlay.querySelector('.modalClose').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.modalBuyBtn').addEventListener('click', () => {
    card.querySelector('.buyButton')?.click();
    close();
  });
}
