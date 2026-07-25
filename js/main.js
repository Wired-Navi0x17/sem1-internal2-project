/**
 * js/main.js
 * ===========
 * Entry point — orchestrates everything.
 *
 * Load order (in HTML):
 *   1. anime.min.js
 *   2. gsap.min.js
 *   3. reicon CDN
 *   4. js/audio.js
 *   5. js/ui.js
 *   6. js/cart.js
 *   7. js/alohomora.js
 *   8. js/scroll-map.js
 *   9. js/contact-form.js
 *  10. js/main.js  ← this file, defer
 *
 * HTMLLoader: fetches component HTML fragments from /components/
 * and injects them into the body before initialising anything.
 * Falls back silently if fetch is unavailable (e.g. file:// protocol).
 */

'use strict';

// ── HTMLLoader ────────────────────────────────────────────────────────────────

/**
 * Resolves the base URL for components relative to this script file.
 * Works with both http:// and file:// origins.
 */
function _componentsBase() {
  const scripts = document.querySelectorAll('script[src]');
  for (const s of scripts) {
    if (s.src.includes('js/main.js')) {
      return s.src.replace('js/main.js', 'components/');
    }
  }
  return 'components/';
}

/**
 * Fetch an HTML component file and insert it at the top of <body>
 * (before all existing children) using a <div data-component> wrapper.
 */
async function loadComponent(filename) {
  const base = _componentsBase();
  try {
    const res  = await fetch(base + filename);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const wrap = document.createElement('div');
    wrap.setAttribute('data-component', filename.replace('.html', ''));
    wrap.innerHTML = html;
    // Insert before first child of body
    document.body.insertBefore(wrap, document.body.firstChild);
  } catch (err) {
    // Silently skip — page still works, just without the component
    console.warn(`[HTMLLoader] Could not load component "${filename}":`, err.message);
  }
}

// ── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {

  // 1. Inject shared HTML components
  await Promise.all([
    loadComponent('assignment-scroll.html'),
    loadComponent('alohomora-entrance.html'),
  ]);

  // 2. Shared UI (runs on every page)
  if (typeof initAmbientSparkles     === 'function') initAmbientSparkles();
  if (typeof initMobileMenu         === 'function') initMobileMenu();
  if (typeof initCauldronCart       === 'function') initCauldronCart();
  if (typeof initTraceAnimations    === 'function') initTraceAnimations();
  if (typeof initCategoryHoverEffects === 'function') initCategoryHoverEffects();
  if (typeof initOrbitParticles     === 'function') initOrbitParticles();

  // 3. Pull-cord + Marauder's Map (injected on every page)
  if (typeof initPullCordMechanism      === 'function') initPullCordMechanism();
  if (typeof initAssignmentScrollEvents === 'function') initAssignmentScrollEvents();

  // 4. Alohomora entrance (index.html only — guarded inside the function)
  if (typeof initAlohomoraEntrance === 'function') initAlohomoraEntrance();

  // 5. Contact-page features (no-ops on other pages — guarded inside)
  if (typeof initContactForm      === 'function') initContactForm();
  if (typeof initProphetAnimation === 'function') initProphetAnimation();
  if (typeof initDeskLoadSequence === 'function') initDeskLoadSequence();
  if (typeof initOwlPostDesk      === 'function') initOwlPostDesk();

  // 6. Product page features (no-ops on other pages — guarded inside)
  if (typeof initProductModals === 'function') initProductModals();
});
