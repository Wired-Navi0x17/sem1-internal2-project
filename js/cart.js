/**
 * js/cart.js
 * ===========
 * Cauldron cart state management, toast notifications,
 * and product quick-view modal.
 *
 * No dependencies on animation libraries — plain DOM manipulation.
 */

'use strict';

// ── Cart state ────────────────────────────────────────────────────────────────

let cartState = { items: [], totalGalleons: 0, count: 0 };

function initCauldronCart() {
  const saved = localStorage.getItem('wizarding_cauldron_cart');
  if (saved) {
    try { cartState = JSON.parse(saved); } catch (_) {
      cartState = { items: [], totalGalleons: 0, count: 0 };
    }
  }
  updateCauldronBadge();

  document.querySelectorAll('.buyButton').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card  = btn.closest('.productCard');
      if (!card) return;
      const title    = card.querySelector('.productTitle')?.textContent  || 'Magical Item';
      const priceStr = card.querySelector('.productPrice')?.textContent  || '0 Galleons';
      const match    = priceStr.match(/([\d,]+)/);
      const galleons = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
      addItemToCart(title, galleons);
      showToast(`Added ${title} (${galleons} Galleons) to your Cauldron!`);
    });
  });
}

function addItemToCart(title, galleons) {
  cartState.items.push({ title, galleons });
  cartState.count          = cartState.items.length;
  cartState.totalGalleons += galleons;
  localStorage.setItem('wizarding_cauldron_cart', JSON.stringify(cartState));
  updateCauldronBadge();
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

// ── Toast notifications ───────────────────────────────────────────────────────

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

// ── Product quick-view modal ──────────────────────────────────────────────────

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
