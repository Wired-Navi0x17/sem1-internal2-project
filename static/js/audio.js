/**
 * js/audio.js
 * ============
 * Web Audio API synthesiser — all sound effects for the site.
 * No external audio files; every sound is generated programmatically.
 *
 * Exports (via globalThis so plain <script> tags can call them):
 *   playHoverShimmer, playHoverHumSound, playRopeTensionSound,
 *   playCeilingUnlockSound, playScrollUnrollSound, playRetractSound,
 *   playQuillInkSound, playQuillFocusChime, playFootstepSound,
 *   playFinalSwellSound, playSpellChargingSound, playRuneChimesSound,
 *   playLockResistanceAndClickSound, playPaperAndBurstSound,
 *   playPaperUnfoldSound, playPaperFoldSound,
 *   playWaxSealSound, playOwlHootSound, playWindWhooshSound
 */

'use strict';

// ── Shared AudioContext ──────────────────────────────────────────────────────

let _audioCtx = null;

function getAudioContext() {
  if (!_audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (Ctor) _audioCtx = new Ctor();
  }
  if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Create a one-shot oscillator with automatic gain envelope. */
function osc(type, freqStart, freqEnd, freqTime, vol, decay, start = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + start;
  try {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freqStart, now);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, now + freqTime);
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + decay);
    o.connect(g); g.connect(ctx.destination);
    o.start(now); o.stop(now + decay + 0.05);
  } catch (_) {}
}

/** Create a band-limited noise burst. */
function noise(filterType, freq, Q, vol, decay, start = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + start;
  try {
    const size   = ctx.sampleRate * (decay + 0.05);
    const buf    = ctx.createBuffer(1, size, ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    const src  = ctx.createBufferSource();
    src.buffer = buf;
    const flt  = ctx.createBiquadFilter();
    flt.type            = filterType;
    flt.frequency.value = freq;
    if (Q) flt.Q.value  = Q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + decay);
    src.connect(flt); flt.connect(g); g.connect(ctx.destination);
    src.start(now); src.stop(now + decay + 0.05);
  } catch (_) {}
}

// ── Sound functions ───────────────────────────────────────────────────────────

function playHoverShimmer() {
  osc('sine', 1567.98, 2093, 0.2, 0.04, 0.25);
}

function playHoverHumSound() {
  osc('sine', 110, null, 0, 0.04, 0.6);
}

function playRopeTensionSound() {
  osc('triangle', 120, 280, 0.3, 0.06, 0.35);
}

function playCeilingUnlockSound() {
  osc('square', 440, 110, 0.12, 0.2, 0.15);
}

function playScrollUnrollSound() {
  osc('sine', 320, 680, 0.5, 0.08, 0.55);
}

function playRetractSound() {
  osc('sine', 650, 220, 0.5, 0.08, 0.55);
}

function playFootstepSound() {
  osc('sine', 180, 90, 0.08, 0.06, 0.1);
}

function playFinalSwellSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    osc('sine', freq, null, 0, 0.02, 1.2, i * 0.05);
  });
}

function playSpellChargingSound() {
  osc('triangle', 140, 550, 0.6, 0.02, 0.75);
}

function playRuneChimesSound() {
  [1318.51, 1661.22, 1975.53, 2637.02].forEach((freq, i) => {
    osc('sine', freq, null, 0, 0.1, 0.6, i * 0.08);
  });
}

function playLockResistanceAndClickSound() {
  osc('square', 360, 70, 0.15, 0.25, 0.2);
}

function playPaperAndBurstSound() {
  osc('sine', 2349.32, 3135.96, 0.3, 0.08, 0.5);
}

function playQuillInkSound() {
  [1760, 2349, 2793].forEach((freq, i) => {
    osc('sine', freq, null, 0, 0.05, 0.3, i * 0.08);
  });
}

function playQuillFocusChime() {
  osc('sine', 2093, 2637, 0.06, 0.055, 0.22);
}

function playPaperUnfoldSound() {
  noise('bandpass', 1200, 0.5, 0.07, 0.38);
}

function playWaxSealSound() {
  // Thud
  osc('sawtooth', 75, 38, 0.12, 0.28, 0.18);
  // Sizzle
  noise('highpass', 3000, null, 0.045, 0.25);
}

function playPaperFoldSound() {
  noise('bandpass', 800, 1.2, 0.06, 0.32);
}

function playOwlHootSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  [[220, 0.12], [330, 0.07]].forEach(([freq, vol]) => {
    const now  = ctx.currentTime;
    try {
      const lfo     = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 5.5;
      lfoGain.gain.value  = 8;
      lfo.connect(lfoGain);

      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now);
      o.frequency.exponentialRampToValueAtTime(freq * 0.88, now + 0.5);
      lfoGain.connect(o.frequency);

      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(vol,   now + 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      o.connect(g); g.connect(ctx.destination);
      lfo.start(now); lfo.stop(now + 0.7);
      o.start(now);   o.stop(now + 0.7);
    } catch (_) {}
  });
}

function playWindWhooshSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now  = ctx.currentTime;
  const dur  = 0.7;
  try {
    const size = ctx.sampleRate * dur;
    const buf  = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    const src  = ctx.createBufferSource();
    src.buffer = buf;
    const flt  = ctx.createBiquadFilter();
    flt.type = 'bandpass';
    flt.frequency.setValueAtTime(180, now);
    flt.frequency.exponentialRampToValueAtTime(2800, now + 0.55);
    flt.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.09, now);
    g.gain.linearRampToValueAtTime(0.14, now + 0.2);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    src.connect(flt); flt.connect(g); g.connect(ctx.destination);
    src.start(now); src.stop(now + dur + 0.05);
  } catch (_) {}
}

function playBearPatronusSwellSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const dur = 5.5;

  // Stereo Panner
  let panner = null;
  if (typeof ctx.createStereoPanner === 'function') {
    try {
      panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.88, now);
      panner.pan.linearRampToValueAtTime(0.88, now + dur);
      panner.connect(ctx.destination);
    } catch (_) {}
  }
  const dest = panner || ctx.destination;

  // 1. Deep Resonant Sub-Bass Rumble (Bear's immense power)
  try {
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(40, now);
    bassOsc.frequency.exponentialRampToValueAtTime(105, now + 2.5);
    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.40, now + 1.2);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    bassOsc.connect(bassGain);
    bassGain.connect(dest);
    bassOsc.start(now);
    bassOsc.stop(now + dur + 0.1);
  } catch (_) {}

  // 2. Harmonic Orchestral Swell Chord (A-Major: A3, A4, C#5, E5, A5)
  const freqs = [110, 220, 440, 554.37, 659.25, 880];
  freqs.forEach((f, idx) => {
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, now + idx * 0.08);
      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.18 / (idx + 1), now + 1.5 + idx * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.connect(g);
      g.connect(dest);
      o.start(now);
      o.stop(now + dur + 0.1);
    } catch (_) {}
  });

  // 3. High Crystal Chime / Shimmer Glissando
  try {
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(1200, now + 0.4);
    chimeOsc.frequency.exponentialRampToValueAtTime(2800, now + 3.8);
    chimeGain.gain.setValueAtTime(0.001, now + 0.4);
    chimeGain.gain.exponentialRampToValueAtTime(0.09, now + 1.8);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + dur - 0.2);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(dest);
    chimeOsc.start(now + 0.4);
    chimeOsc.stop(now + dur);
  } catch (_) {}
}

