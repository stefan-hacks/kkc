/**
 * ═══════════════════════════════════════════════════════════════
 * KKC v2 — Kanata Keyboard Configurator (ZSA-style popup)
 * Click any key → category tabs → human-friendly options →
 * contextual configurator → generates proper Kanata syntax.
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   DATA: Keyboard layout
   ═══════════════════════════════════════════════════════════════ */

const KEYBOARD_LAYOUT = [
  [
    { code: 'grv',  label: '`',   width: 1 },
    { code: '1',    label: '1',   width: 1 },
    { code: '2',    label: '2',   width: 1 },
    { code: '3',    label: '3',   width: 1 },
    { code: '4',    label: '4',   width: 1 },
    { code: '5',    label: '5',   width: 1 },
    { code: '6',    label: '6',   width: 1 },
    { code: '7',    label: '7',   width: 1 },
    { code: '8',    label: '8',   width: 1 },
    { code: '9',    label: '9',   width: 1 },
    { code: '0',    label: '0',   width: 1 },
    { code: '-',    label: '-',   width: 1 },
    { code: '=',    label: '=',   width: 1 },
    { code: 'bspc', label: '⌫',   width: 2 },
  ],
  [
    { code: 'tab',  label: 'Tab', width: 1.5 },
    { code: 'q',    label: 'Q',   width: 1 },
    { code: 'w',    label: 'W',   width: 1 },
    { code: 'e',    label: 'E',   width: 1 },
    { code: 'r',    label: 'R',   width: 1 },
    { code: 't',    label: 'T',   width: 1 },
    { code: 'y',    label: 'Y',   width: 1 },
    { code: 'u',    label: 'U',   width: 1 },
    { code: 'i',    label: 'I',   width: 1 },
    { code: 'o',    label: 'O',   width: 1 },
    { code: 'p',    label: 'P',   width: 1 },
    { code: '[',    label: '[',   width: 1 },
    { code: ']',    label: ']',   width: 1 },
    { code: '\\',   label: '\\',  width: 1.5 },
  ],
  [
    { code: 'caps', label: 'Caps', width: 1.75 },
    { code: 'a',    label: 'A',    width: 1 },
    { code: 's',    label: 'S',    width: 1 },
    { code: 'd',    label: 'D',    width: 1 },
    { code: 'f',    label: 'F',    width: 1 },
    { code: 'g',    label: 'G',    width: 1 },
    { code: 'h',    label: 'H',    width: 1 },
    { code: 'j',    label: 'J',    width: 1 },
    { code: 'k',    label: 'K',    width: 1 },
    { code: 'l',    label: 'L',    width: 1 },
    { code: ';',    label: ';',    width: 1 },
    { code: "'",    label: "'",    width: 1 },
    { code: 'ret',  label: '⏎',    width: 2.25 },
  ],
  [
    { code: 'lsft', label: 'Shift', width: 2.25 },
    { code: 'z',    label: 'Z',     width: 1 },
    { code: 'x',    label: 'X',     width: 1 },
    { code: 'c',    label: 'C',     width: 1 },
    { code: 'v',    label: 'V',     width: 1 },
    { code: 'b',    label: 'B',     width: 1 },
    { code: 'n',    label: 'N',     width: 1 },
    { code: 'm',    label: 'M',     width: 1 },
    { code: ',',    label: ',',     width: 1 },
    { code: '.',    label: '.',     width: 1 },
    { code: '/',    label: '/',     width: 1 },
    { code: 'rsft', label: 'Shift', width: 2.75 },
  ],
  [
    { code: 'lctl', label: 'Ctrl',  width: 1.25 },
    { code: 'lmet', label: 'Meta',  width: 1.25 },
    { code: 'lalt', label: 'Alt',   width: 1.25 },
    { code: 'spc',  label: 'Space', width: 6.25 },
    { code: 'ralt', label: 'AltGr', width: 1.25 },
    { code: 'rmet', label: 'Meta',  width: 1.25 },
    { code: 'rctl', label: 'Ctrl',  width: 1.25 },
  ],
];

const DEFSRC_ORDER = KEYBOARD_LAYOUT.flat().map(k => k.code);

/* ═══════════════════════════════════════════════════════════════
   DATA: User-friendly action catalog
   Each entry has a simple title, description, optional configurator fields,
   and a build() function that returns the Kanata action string.
   ═══════════════════════════════════════════════════════════════ */

const ACTION_CATEGORIES = [
  { id: 'basic',    icon: '🔤', label: 'Basic' },
  { id: 'layer',    icon: '🔀', label: 'Layers' },
  { id: 'taphold',  icon: '⏱️', label: 'Tap-Hold' },
  { id: 'oneshot',  icon: '👆', label: 'One-Shot' },
  { id: 'macro',    icon: '📼', label: 'Macros' },
  { id: 'mouse',    icon: '🖱️', label: 'Mouse' },
  { id: 'combo',    icon: '🔧', label: 'Combinations' },
  { id: 'special',  icon: '✨', label: 'Special' },
];

const COMMON_KEYS = ['esc','bspc','tab','ret','spc','lsft','rsft','lctl','rctl','lalt','ralt','lmet','rmet','caps','grv','home','end','pgup','pgdn','left','up','down','rght','f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'];
const MOD_KEYS = ['lctl','lalt','lmet','lsft','rctl','ralt','rmet','rsft'];

const ACTION_OPTIONS = [
  /* ── BASIC ──────────────────────────────────────────────────── */
  {
    id: 'transparent', category: 'basic',
    title: 'Transparent', desc: 'Fall through to base layer',
    build: () => '_',
  },
  {
    id: 'noop', category: 'basic',
    title: 'No-op', desc: 'Do nothing when pressed',
    build: () => 'XX',
  },
  {
    id: 'key', category: 'basic',
    title: 'Type a key', desc: 'Send a single key press',
    config: [
      { type: 'select', id: 'key', label: 'Key', options: COMMON_KEYS, default: 'esc' },
      { type: 'text',   id: 'key_custom', label: 'Or type custom key name', placeholder: 'e.g. prnt' },
    ],
    build: (c) => c.key_custom?.trim() || c.key || 'esc',
  },
  {
    id: 'lrld', category: 'basic',
    title: 'Live Reload', desc: 'Reload config without restarting',
    build: () => 'lrld',
  },

  /* ── LAYERS ─────────────────────────────────────────────────── */
  {
    id: 'layer-switch', category: 'layer',
    title: 'Switch Layer', desc: 'Permanently change base layer',
    config: [
      { type: 'text', id: 'layer', label: 'Layer name', placeholder: 'e.g. symbols' },
    ],
    build: (c) => `(layer-switch ${c.layer || 'base'})`,
  },
  {
    id: 'layer-toggle', category: 'layer',
    title: 'Momentary Layer', desc: 'Hold key to activate layer, release to return',
    config: [
      { type: 'text', id: 'layer', label: 'Layer name', placeholder: 'e.g. nav' },
    ],
    build: (c) => `(layer-while-held ${c.layer || 'base'})`,
  },

  /* ── TAP-HOLD ───────────────────────────────────────────────── */
  {
    id: 'tap-hold', category: 'taphold',
    title: 'Tap-Hold (basic)', desc: 'Tap = one key, Hold = modifier/layer',
    config: [
      { type: 'number', id: 'tap_ms', label: 'Tap timeout (ms)', default: 200, min: 50, max: 1000 },
      { type: 'number', id: 'hold_ms', label: 'Hold timeout (ms)', default: 200, min: 50, max: 1000 },
      { type: 'select', id: 'tap_key', label: 'Tap action', options: COMMON_KEYS, default: 'esc' },
      { type: 'select', id: 'hold_mod', label: 'Hold action', options: [...MOD_KEYS,'layer-toggle'], default: 'lctl' },
      { type: 'text', id: 'hold_layer', label: 'Or hold layer name (if above = layer-toggle)', placeholder: 'e.g. symbols' },
    ],
    build: (c) => {
      const tap = c.tap_key || 'esc';
      const hold = c.hold_layer?.trim()
        ? `(layer-while-held ${c.hold_layer.trim()})`
        : (c.hold_mod || 'lctl');
      return `(tap-hold ${c.tap_ms || 200} ${c.hold_ms || 200} ${tap} ${hold})`;
    },
  },
  {
    id: 'tap-hold-press', category: 'taphold',
    title: 'Tap-Hold (press variant)', desc: 'Hold activates on any other key press (more responsive)',
    config: [
      { type: 'number', id: 'tap_ms', label: 'Tap timeout (ms)', default: 200, min: 50, max: 1000 },
      { type: 'number', id: 'hold_ms', label: 'Hold timeout (ms)', default: 200, min: 50, max: 1000 },
      { type: 'select', id: 'tap_key', label: 'Tap action', options: COMMON_KEYS, default: 'esc' },
      { type: 'select', id: 'hold_mod', label: 'Hold action', options: [...MOD_KEYS,'layer-toggle'], default: 'lctl' },
      { type: 'text', id: 'hold_layer', label: 'Or hold layer name', placeholder: 'e.g. symbols' },
    ],
    build: (c) => {
      const tap = c.tap_key || 'esc';
      const hold = c.hold_layer?.trim()
        ? `(layer-while-held ${c.hold_layer.trim()})`
        : (c.hold_mod || 'lctl');
      return `(tap-hold-press ${c.tap_ms || 200} ${c.hold_ms || 200} ${tap} ${hold})`;
    },
  },
  {
    id: 'tap-hold-release', category: 'taphold',
    title: 'Tap-Hold (release variant)', desc: 'Hold activates only when another key is released',
    config: [
      { type: 'number', id: 'tap_ms', label: 'Tap timeout (ms)', default: 200 },
      { type: 'number', id: 'hold_ms', label: 'Hold timeout (ms)', default: 200 },
      { type: 'select', id: 'tap_key', label: 'Tap action', options: COMMON_KEYS, default: 'esc' },
      { type: 'select', id: 'hold_mod', label: 'Hold action', options: MOD_KEYS, default: 'lctl' },
    ],
    build: (c) => `(tap-hold-release ${c.tap_ms || 200} ${c.hold_ms || 200} ${c.tap_key || 'esc'} ${c.hold_mod || 'lctl'})`,
  },

  /* ── ONE-SHOT ───────────────────────────────────────────────── */
  {
    id: 'one-shot', category: 'oneshot',
    title: 'One-Shot Modifier', desc: 'Modifier stays active until next key press',
    config: [
      { type: 'number', id: 'timeout', label: 'Timeout (ms)', default: 500, min: 100, max: 5000 },
      { type: 'select', id: 'mod', label: 'Modifier', options: MOD_KEYS, default: 'lctl' },
    ],
    build: (c) => `(one-shot ${c.timeout || 500} ${c.mod || 'lctl'})`,
  },
  {
    id: 'one-shot-layer', category: 'oneshot',
    title: 'One-Shot Layer', desc: 'Layer stays active until next key press',
    config: [
      { type: 'number', id: 'timeout', label: 'Timeout (ms)', default: 500, min: 100, max: 5000 },
      { type: 'text', id: 'layer', label: 'Layer name', placeholder: 'e.g. symbols' },
    ],
    build: (c) => `(one-shot ${c.timeout || 500} (layer-while-held ${c.layer || 'base'}))`,
  },

  /* ── MACROS ─────────────────────────────────────────────────── */
  {
    id: 'macro', category: 'macro',
    title: 'Static Macro', desc: 'Type a sequence of keys automatically',
    config: [
      { type: 'text', id: 'sequence', label: 'Key sequence (space-separated)', placeholder: 'e.g. lctl c lctl v' },
    ],
    build: (c) => {
      const seq = (c.sequence || '').trim();
      if (!seq) return '(macro spc)';
      return `(macro ${seq.split(/\s+/).join(' ')})`;
    },
  },
  {
    id: 'dynamic-macro-record', category: 'macro',
    title: 'Record Macro', desc: 'Start recording a macro into a slot',
    config: [
      { type: 'number', id: 'slot', label: 'Slot number', default: 0, min: 0, max: 9 },
    ],
    build: (c) => `(dynamic-macro-record ${c.slot ?? 0})`,
  },
  {
    id: 'dynamic-macro-play', category: 'macro',
    title: 'Play Macro', desc: 'Replay a recorded macro',
    config: [
      { type: 'number', id: 'slot', label: 'Slot number', default: 0, min: 0, max: 9 },
    ],
    build: (c) => `(dynamic-macro-play ${c.slot ?? 0})`,
  },

  /* ── MOUSE ──────────────────────────────────────────────────── */
  {
    id: 'movemouse', category: 'mouse',
    title: 'Mouse Movement', desc: 'Move cursor in a direction',
    config: [
      { type: 'select', id: 'dir', label: 'Direction', options: ['up','down','left','right'], default: 'up' },
      { type: 'number', id: 'dist', label: 'Distance (px)', default: 25, min: 1, max: 200 },
    ],
    build: (c) => `(movemouse-${c.dir || 'up'} ${c.dist || 25})`,
  },
  {
    id: 'scroll', category: 'mouse',
    title: 'Scroll Wheel', desc: 'Scroll in a direction',
    config: [
      { type: 'select', id: 'dir', label: 'Direction', options: ['up','down','left','right'], default: 'up' },
      { type: 'number', id: 'dist', label: 'Distance', default: 25, min: 1, max: 200 },
    ],
    build: (c) => `(scroll-${c.dir || 'up'} ${c.dist || 25})`,
  },

  /* ── COMBINATIONS ─────────────────────────────────────────────── */
  {
    id: 'multi', category: 'combo',
    title: 'Multi Action', desc: 'Trigger several actions at once',
    config: [
      { type: 'text', id: 'actions', label: 'Actions (space-separated)', placeholder: 'e.g. lctl c' },
    ],
    build: (c) => `(multi ${(c.actions || 'lctl c').trim().split(/\s+/).join(' ')})`,
  },
  {
    id: 'tap-dance', category: 'combo',
    title: 'Tap Dance', desc: 'Different action per tap count',
    config: [
      { type: 'number', id: 'timeout', label: 'Timeout (ms)', default: 200, min: 50, max: 1000 },
      { type: 'text', id: 'tap1', label: '1st tap action', placeholder: 'e.g. esc' },
      { type: 'text', id: 'tap2', label: '2nd tap action', placeholder: 'e.g. caps' },
    ],
    build: (c) => {
      const t1 = c.tap1?.trim() || 'esc';
      const t2 = c.tap2?.trim() || 'caps';
      return `(tap-dance ${c.timeout || 200} (${t1}) (${t2}))`;
    },
  },
  {
    id: 'fork', category: 'combo',
    title: 'Fork (Conditional)', desc: 'Choose action based on another key',
    config: [
      { type: 'text', id: 'left', label: 'Default action', placeholder: 'e.g. a' },
      { type: 'text', id: 'right', label: 'Alternate action', placeholder: 'e.g. b' },
      { type: 'text', id: 'triggers', label: 'Trigger keys (space-separated)', placeholder: 'e.g. lsft rsft' },
    ],
    build: (c) => `(fork ${c.left || 'a'} ${c.right || 'b'} ${(c.triggers || 'lsft').trim().split(/\s+/).join(' ')})`,
  },

  /* ── SPECIAL ────────────────────────────────────────────────── */
  {
    id: 'unicode', category: 'special',
    title: 'Unicode Character', desc: 'Type any Unicode symbol',
    config: [
      { type: 'text', id: 'char', label: 'Character', placeholder: 'e.g. 😀 or €' },
    ],
    build: (c) => `(unicode ${c.char || ' '})`,
  },
  {
    id: 'cmd', category: 'special',
    title: 'Run Command', desc: 'Launch a program (requires danger-enable-cmd)',
    config: [
      { type: 'text', id: 'program', label: 'Program', placeholder: 'e.g. alacritty' },
      { type: 'text', id: 'args', label: 'Arguments (optional)', placeholder: 'e.g. -e vim' },
    ],
    build: (c) => {
      const prog = c.program?.trim() || 'alacritty';
      const args = c.args?.trim();
      return args ? `(cmd ${prog} ${args})` : `(cmd ${prog})`;
    },
  },
  {
    id: 'caps-word', category: 'special',
    title: 'Caps Word', desc: 'Capitalize next word (like Shift on steroids)',
    build: () => 'caps-word',
  },
  {
    id: 'arbitrary-code', category: 'special',
    title: 'Custom Scancode', desc: 'Emit a raw OS scancode',
    config: [
      { type: 'number', id: 'code', label: 'Scancode number', default: 0, min: 0, max: 999 },
    ],
    build: (c) => `(arbitrary-code ${c.code ?? 0})`,
  },
  {
    id: 'release-key', category: 'special',
    title: 'Release Key', desc: 'Force-release a held key',
    config: [
      { type: 'select', id: 'key', label: 'Key to release', options: COMMON_KEYS, default: 'lctl' },
    ],
    build: (c) => `(release-key ${c.key || 'lctl'})`,
  },
  {
    id: 'sequence', category: 'special',
    title: 'Key Sequence', desc: 'Vim-like leader sequence to trigger action',
    config: [
      { type: 'text', id: 'keys', label: 'Sequence keys (space-separated)', placeholder: 'e.g. j k' },
      { type: 'text', id: 'action', label: 'Result action', placeholder: 'e.g. esc' },
    ],
    build: (c) => `(sequence ${(c.keys || 'j k').trim().split(/\s+/).join(' ')} ${c.action || 'esc'})`,
  },
];

/* ═══════════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════════ */

const state = {
  layers: {
    base: { name: 'base', bindings: {} },
  },
  activeLayer: 'base',
  // Popup state
  editingKey: null,       // key code currently being edited
  popupCategory: 'basic', // active tab in popup
  popupSelection: null,   // selected option ID
  popupConfig: {},        // current configurator values
};

/* ═══════════════════════════════════════════════════════════════
   GENERATOR
   ═══════════════════════════════════════════════════════════════ */

function generateKbd() {
  const lines = [];
  lines.push(';; ═══════════════════════════════════════════════════════════════');
  lines.push(';; Generated by KKC — Kanata Keyboard Configurator');
  lines.push(';; https://github.com/jtroo/kanata');
  lines.push(';; ═══════════════════════════════════════════════════════════════');
  lines.push('');

  // defcfg
  const cfg = [];
  if (document.getElementById('cfg-process-unmapped').checked) cfg.push('  process-unmapped-keys yes');
  if (document.getElementById('cfg-danger-cmd').checked) cfg.push('  danger-enable-cmd yes');
  const seqTimeout = document.getElementById('cfg-seq-timeout').value;
  if (seqTimeout !== '1000') cfg.push(`  sequence-timeout ${seqTimeout}`);
  const linuxDev = document.getElementById('cfg-linux-dev').value.trim();
  if (linuxDev) cfg.push(`  linux-dev ${linuxDev}`);

  if (cfg.length > 0) {
    lines.push('(defcfg');
    lines.push(...cfg);
    lines.push(')');
    lines.push('');
  }

  // defsrc
  lines.push('(defsrc');
  for (const row of KEYBOARD_LAYOUT) {
    lines.push(`  ${row.map(k => k.code).join('  ')}`);
  }
  lines.push(')');
  lines.push('');

  // Collect aliases
  const aliasEntries = [];
  let aliasCounter = 1;
  const layerNames = Object.keys(state.layers);

  for (const lname of layerNames) {
    const layer = state.layers[lname];
    for (const kcode of DEFSRC_ORDER) {
      const act = layer.bindings[kcode];
      if (!act || act === '_') continue;
      if (act.includes(' ') || act.startsWith('(')) {
        const aliasName = `_a${aliasCounter++}`;
        aliasEntries.push(`  ${aliasName} ${act}`);
        layer.bindings[kcode] = `@${aliasName}`;
      }
    }
  }

  if (aliasEntries.length > 0) {
    lines.push('(defalias');
    lines.push(...aliasEntries);
    lines.push(')');
    lines.push('');
  }

  // deflayer
  for (const lname of layerNames) {
    const layer = state.layers[lname];
    lines.push(`(deflayer ${lname}`);
    for (const row of KEYBOARD_LAYOUT) {
      const acts = row.map(k => layer.bindings[k.code] || '_');
      lines.push(`  ${acts.join('  ')}`);
    }
    lines.push(')');
    lines.push('');
  }

  return lines.join('\n');
}

function updatePreview() {
  document.getElementById('kbd-output').textContent = generateKbd();
}

/* ═══════════════════════════════════════════════════════════════
   KEYBOARD RENDERER
   ═══════════════════════════════════════════════════════════════ */

function renderKeyboard() {
  const container = document.getElementById('keyboard');
  container.innerHTML = '';
  const layer = state.layers[state.activeLayer];

  for (const row of KEYBOARD_LAYOUT) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    for (const key of row) {
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.style.flex = key.width;
      const act = layer.bindings[key.code] || '_';
      if (act !== '_') btn.classList.add('assigned');
      if (state.editingKey === key.code) btn.classList.add('editing');

      btn.innerHTML = `<span class="key-label">${esc(key.label)}</span><span class="key-action">${esc(act === '_' ? '' : act)}</span>`;
      btn.onclick = () => openKeyPopup(key);
      rowDiv.appendChild(btn);
    }
    container.appendChild(rowDiv);
  }
}

/* ═══════════════════════════════════════════════════════════════
   LAYER TABS
   ═══════════════════════════════════════════════════════════════ */

function renderLayerTabs() {
  const container = document.getElementById('layer-tabs');
  container.innerHTML = '';
  Object.values(state.layers).forEach(layer => {
    const btn = document.createElement('button');
    btn.className = 'layer-tab' + (layer.name === state.activeLayer ? ' active' : '');
    btn.textContent = layer.name;
    btn.onclick = () => {
      state.activeLayer = layer.name;
      renderLayerTabs();
      renderKeyboard();
      updatePreview();
    };
    container.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════════════════
   KEY POPUP — ZSA-style category picker
   ═══════════════════════════════════════════════════════════════ */

function openKeyPopup(keyObj) {
  state.editingKey = keyObj.code;
  state.popupCategory = 'basic';
  state.popupSelection = null;
  state.popupConfig = {};
  renderKeyboard();

  const popup = document.getElementById('key-popup');
  document.getElementById('popup-key-badge').textContent = keyObj.label;
  document.getElementById('popup-key-name').textContent = `Key: ${keyObj.code}`;
  document.getElementById('popup-search').value = '';
  popup.classList.remove('hidden');

  // Pre-fill if key already has a binding
  const current = state.layers[state.activeLayer].bindings[keyObj.code];
  if (current && current !== '_') {
    // Try to find matching option
    const match = ACTION_OPTIONS.find(opt => {
      const test = opt.build ? opt.build({}) : '';
      return test === current;
    });
    if (match) {
      state.popupCategory = match.category;
      state.popupSelection = match.id;
    }
  }

  renderPopupTabs();
  renderPopupOptions();
  renderPopupConfigurator();
  updatePopupPreview();
}

function closeKeyPopup(save = false) {
  if (save && state.popupSelection) {
    const opt = ACTION_OPTIONS.find(o => o.id === state.popupSelection);
    if (opt) {
      const action = opt.build(state.popupConfig);
      state.layers[state.activeLayer].bindings[state.editingKey] = action;
    }
  }
  state.editingKey = null;
  document.getElementById('key-popup').classList.add('hidden');
  renderKeyboard();
  updatePreview();
}

function renderPopupTabs() {
  const container = document.getElementById('popup-tabs');
  container.innerHTML = '';
  ACTION_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'popup-tab' + (cat.id === state.popupCategory ? ' active' : '');
    btn.innerHTML = `<span>${cat.icon}</span><span>${esc(cat.label)}</span>`;
    btn.onclick = () => {
      state.popupCategory = cat.id;
      state.popupSelection = null;
      state.popupConfig = {};
      renderPopupTabs();
      renderPopupOptions();
      renderPopupConfigurator();
      updatePopupPreview();
    };
    container.appendChild(btn);
  });
}

function renderPopupOptions() {
  const container = document.getElementById('popup-options');
  container.innerHTML = '';
  const search = document.getElementById('popup-search').value.toLowerCase();

  const opts = ACTION_OPTIONS.filter(opt => {
    if (opt.category !== state.popupCategory) return false;
    if (!search) return true;
    return opt.title.toLowerCase().includes(search) || opt.desc.toLowerCase().includes(search);
  });

  opts.forEach(opt => {
    const div = document.createElement('div');
    div.className = 'popup-option' + (opt.id === state.popupSelection ? ' selected' : '');
    div.innerHTML = `<span class="opt-title">${esc(opt.title)}</span><span class="opt-desc">${esc(opt.desc)}</span>`;
    div.onclick = () => {
      state.popupSelection = opt.id;
      state.popupConfig = {};
      renderPopupOptions();
      renderPopupConfigurator();
      updatePopupPreview();
    };
    container.appendChild(div);
  });

  if (opts.length === 0) {
    container.innerHTML = '<div class="opt-desc" style="grid-column:1/-1;text-align:center;padding:20px;">No actions match your search.</div>';
  }
}

function renderPopupConfigurator() {
  const container = document.getElementById('popup-configurator');
  container.innerHTML = '';

  if (!state.popupSelection) {
    container.innerHTML = '<p class="cfg-desc">Select an action from the grid to configure it.</p>';
    return;
  }

  const opt = ACTION_OPTIONS.find(o => o.id === state.popupSelection);
  if (!opt || !opt.config) {
    container.innerHTML = `<p class="cfg-desc">"${esc(opt.title)}" needs no configuration. Click Save to apply.</p>`;
    return;
  }

  const title = document.createElement('h4');
  title.textContent = opt.title;
  container.appendChild(title);

  opt.config.forEach(field => {
    const lbl = document.createElement('label');
    lbl.textContent = field.label;
    container.appendChild(lbl);

    if (field.type === 'text') {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = field.placeholder || '';
      input.value = state.popupConfig[field.id] || '';
      input.oninput = (e) => {
        state.popupConfig[field.id] = e.target.value;
        updatePopupPreview();
      };
      container.appendChild(input);
    } else if (field.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = field.min ?? '';
      input.max = field.max ?? '';
      input.value = state.popupConfig[field.id] ?? (field.default ?? '');
      input.oninput = (e) => {
        state.popupConfig[field.id] = e.target.value;
        updatePopupPreview();
      };
      container.appendChild(input);
    } else if (field.type === 'select') {
      const select = document.createElement('select');
      field.options.forEach(optVal => {
        const o = document.createElement('option');
        o.value = optVal;
        o.textContent = optVal;
        if ((state.popupConfig[field.id] || field.default) === optVal) o.selected = true;
        select.appendChild(o);
      });
      select.onchange = (e) => {
        state.popupConfig[field.id] = e.target.value;
        updatePopupPreview();
      };
      container.appendChild(select);
    }
  });

  // Show current preview
  const preview = document.createElement('div');
  preview.className = 'cfg-desc';
  preview.style.marginTop = '10px';
  preview.innerHTML = `<strong>Preview:</strong> <code style="color:var(--accent)">${esc(opt.build(state.popupConfig))}</code>`;
  container.appendChild(preview);
}

function updatePopupPreview() {
  const opt = ACTION_OPTIONS.find(o => o.id === state.popupSelection);
  const code = document.getElementById('popup-preview-action');
  if (opt) {
    code.textContent = opt.build(state.popupConfig);
  } else {
    code.textContent = '_';
  }
}

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════ */

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   EVENT WIRING
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderLayerTabs();
  renderKeyboard();
  updatePreview();

  // Toolbar
  document.getElementById('btn-add-layer').onclick = () => {
    const name = prompt('New layer name:');
    if (!name || state.layers[name]) return alert('Invalid or duplicate layer name.');
    state.layers[name] = { name, bindings: {} };
    state.activeLayer = name;
    renderLayerTabs();
    renderKeyboard();
    updatePreview();
  };

  document.getElementById('btn-load-sample').onclick = () => {
    state.layers = {
      base: {
        name: 'base',
        bindings: {
          caps: '(tap-hold-press 200 200 esc lctl)',
          a: '(tap-hold-press 200 200 a lctl)',
          s: '(tap-hold-press 200 200 s lalt)',
          d: '(tap-hold-press 200 200 d lsft)',
          f: '(tap-hold-press 200 200 f lmet)',
          j: '(tap-hold-press 200 200 j rmet)',
          k: '(tap-hold-press 200 200 k rsft)',
          l: '(tap-hold-press 200 200 l ralt)',
          ';': '(tap-hold-press 200 200 ; rctl)',
          grv: '(layer-while-held symbols)',
        },
      },
      symbols: {
        name: 'symbols',
        bindings: {
          '1': 'f1', '2': 'f2', '3': 'f3', '4': 'f4', '5': 'f5',
          '6': 'f6', '7': 'f7', '8': 'f8', '9': 'f9', '0': 'f10',
          q: '!', w: '@', e: '#', r: '$', t: '%',
          y: '^', u: '&', i: '*', o: '(', p: ')',
          a: '-', s: '=', d: '[', f: ']', g: '\\',
          h: ';', j: "'", k: ',', l: '.', ';': '/',
          z: '_', x: '+', c: '{', v: '}', b: '|',
        },
      },
    };
    state.activeLayer = 'base';
    renderLayerTabs();
    renderKeyboard();
    updatePreview();
  };

  document.getElementById('btn-clear-all').onclick = () => {
    if (!confirm('Clear all bindings on ALL layers?')) return;
    Object.values(state.layers).forEach(l => l.bindings = {});
    renderKeyboard();
    updatePreview();
  };

  document.getElementById('btn-copy').onclick = () => {
    navigator.clipboard.writeText(generateKbd()).then(() => {
      const btn = document.getElementById('btn-copy');
      const old = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = old, 1500);
    });
  };

  document.getElementById('btn-download').onclick = () => {
    const blob = new Blob([generateKbd()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kanata.kbd';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Popup controls
  document.getElementById('popup-close').onclick = () => closeKeyPopup(false);
  document.getElementById('popup-save').onclick = () => closeKeyPopup(true);
  document.getElementById('popup-clear').onclick = () => {
    state.layers[state.activeLayer].bindings[state.editingKey] = '_';
    closeKeyPopup(false);
  };
  document.getElementById('popup-search').oninput = () => {
    renderPopupOptions();
  };

  // Close popup on backdrop click or Escape
  document.getElementById('key-popup').addEventListener('click', (e) => {
    if (e.target.classList.contains('popup-backdrop')) closeKeyPopup(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('key-popup').classList.contains('hidden')) {
      closeKeyPopup(false);
    }
  });

  // Config change triggers
  ['cfg-process-unmapped', 'cfg-danger-cmd'].forEach(id => {
    document.getElementById(id).addEventListener('change', updatePreview);
  });
  ['cfg-seq-timeout', 'cfg-linux-dev'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });
});
