/**
 * ═══════════════════════════════════════════════════════════════
 * KKC — Kanata Keyboard Configurator (JavaScript Engine)
 * Single-file, vanilla JS. No build step required.
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ── Data: Standard US ANSI 60% layout key positions ───────────────────── */

const KEYBOARD_LAYOUT = [
  // Row 1 — numbers
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
  // Row 2 — QWERTY
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
  // Row 3 — ASDF
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
  // Row 4 — ZXCV
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
  // Row 5 — modifiers + space
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

/* Flat list of all key codes for defsrc ordering */
const DEFSRC_ORDER = KEYBOARD_LAYOUT.flat().map(k => k.code);

/* ── Data: Kanata action catalog ───────────────────────────────────────── */

const ACTION_CATALOG = [
  /* Basics */
  { id: 'transparent',  label: 'Transparent (_)',     action: '_',        category: 'Basic', desc: 'Fall through to base layer' },
  { id: 'noop',         label: 'No-op (XX)',          action: 'XX',       category: 'Basic', desc: 'Do nothing' },
  { id: 'key',          label: 'Key name…',            action: '',         category: 'Basic', desc: 'Type a literal key name',        prompt: 'Key name (e.g. esc, bspc, f1):' },

  /* Layer */
  { id: 'layer-switch', label: 'layer-switch',         action: '(layer-switch LAYER)', category: 'Layer', desc: 'Permanently switch base layer', prompt: 'Layer name:' },
  { id: 'layer-while-held', label: 'layer-while-held', action: '(layer-while-held LAYER)', category: 'Layer', desc: 'Momentary layer while held', prompt: 'Layer name:' },
  { id: 'layer-toggle', label: 'layer-toggle',         action: '(layer-toggle LAYER)', category: 'Layer', desc: 'Toggle layer on/off', prompt: 'Layer name:' },
  { id: 'lrld',         label: 'Live Reload (lrld)',   action: 'lrld',     category: 'Layer', desc: 'Reload config without restart' },
  { id: 'lrld-next',    label: 'lrld-next',            action: 'lrld-next', category: 'Layer', desc: 'Load next config file' },
  { id: 'lrld-prev',    label: 'lrld-prev',            action: 'lrld-prev', category: 'Layer', desc: 'Load previous config file' },

  /* Tap-hold */
  { id: 'tap-hold',           label: 'tap-hold',           action: '(tap-hold 200 200 TAP HOLD)',        category: 'Tap-Hold', desc: 'Classic tap-hold',        prompt: 'tap-ms hold-ms tap-action hold-action (space-separated):' },
  { id: 'tap-hold-press',     label: 'tap-hold-press',     action: '(tap-hold-press 200 200 TAP HOLD)',  category: 'Tap-Hold', desc: 'Hold on any key press',  prompt: 'tap-ms hold-ms tap-action hold-action:' },
  { id: 'tap-hold-release',   label: 'tap-hold-release',   action: '(tap-hold-release 200 200 TAP HOLD)', category: 'Tap-Hold', desc: 'Hold on key release',     prompt: 'tap-ms hold-ms tap-action hold-action:' },
  { id: 'tap-hold-release-keys', label: 'tap-hold-release-keys', action: '(tap-hold-release-keys 200 200 TAP HOLD KEYS)', category: 'Tap-Hold', desc: 'Hold on specific key releases', prompt: 'tap-ms hold-ms tap-action hold-action trigger-keys:' },

  /* One-shot */
  { id: 'one-shot',       label: 'one-shot',       action: '(one-shot 500 ACTION)',      category: 'One-Shot', desc: 'One-shot modifier/layer', prompt: 'timeout-ms action:' },
  { id: 'one-shot-press', label: 'one-shot-press', action: '(one-shot-press 500 ACTION)', category: 'One-Shot', desc: 'Cancels on press',        prompt: 'timeout-ms action:' },

  /* Macros */
  { id: 'macro',          label: 'macro',           action: '(macro spc spc)',           category: 'Macro', desc: 'Static key sequence',     prompt: 'Space-separated actions/delays:' },
  { id: 'dynamic-macro-record', label: 'dyn-macro-rec', action: '(dynamic-macro-record 0)', category: 'Macro', desc: 'Start recording macro slot', prompt: 'Slot number (0–?):' },
  { id: 'dynamic-macro-stop',   label: 'dyn-macro-stop',  action: 'dynamic-macro-record-stop', category: 'Macro', desc: 'Stop recording' },
  { id: 'dynamic-macro-play',   label: 'dyn-macro-play',  action: '(dynamic-macro-play 0)',    category: 'Macro', desc: 'Play recorded macro',       prompt: 'Slot number:' },

  /* Mouse */
  { id: 'movemouse-up',    label: 'movemouse-up',    action: '(movemouse-up 25)',    category: 'Mouse', desc: 'Move cursor up',     prompt: 'Distance (px):' },
  { id: 'movemouse-down',  label: 'movemouse-down',  action: '(movemouse-down 25)',  category: 'Mouse', desc: 'Move cursor down',   prompt: 'Distance (px):' },
  { id: 'movemouse-left',  label: 'movemouse-left',  action: '(movemouse-left 25)',  category: 'Mouse', desc: 'Move cursor left',   prompt: 'Distance (px):' },
  { id: 'movemouse-right', label: 'movemouse-right', action: '(movemouse-right 25)', category: 'Mouse', desc: 'Move cursor right',  prompt: 'Distance (px):' },
  { id: 'scroll-up',       label: 'scroll-up',       action: '(scroll-up 25)',       category: 'Mouse', desc: 'Scroll up',          prompt: 'Distance:' },
  { id: 'scroll-down',     label: 'scroll-down',     action: '(scroll-down 25)',     category: 'Mouse', desc: 'Scroll down',        prompt: 'Distance:' },
  { id: 'scroll-left',     label: 'scroll-left',     action: '(scroll-left 25)',     category: 'Mouse', desc: 'Scroll left',        prompt: 'Distance:' },
  { id: 'scroll-right',    label: 'scroll-right',    action: '(scroll-right 25)',    category: 'Mouse', desc: 'Scroll right',       prompt: 'Distance:' },

  /* Combinations */
  { id: 'multi',  label: 'multi',  action: '(multi ACTION1 ACTION2)', category: 'Combination', desc: 'Execute multiple actions', prompt: 'Space-separated actions:' },
  { id: 'fork',   label: 'fork',   action: '(fork LEFT RIGHT TRIGGERS)', category: 'Combination', desc: 'Choose action by trigger keys', prompt: 'left-action right-action trigger-keys:' },
  { id: 'switch', label: 'switch', action: '(switch (KEY ACTION) …)', category: 'Combination', desc: 'Conditional action selection', prompt: 'Pairs of key action (e.g. a esc b tab):' },
  { id: 'chord',  label: 'chord',  action: '(chord NAME ACTION1 ACTION2)', category: 'Combination', desc: 'Simultaneous key chord', prompt: 'chord-name action1 action2:' },

  /* Sequence */
  { id: 'sequence', label: 'sequence', action: '(sequence KEY1 KEY2 ACTION)', category: 'Sequence', desc: 'Leader-key sequence', prompt: 'key1 key2 … action:' },

  /* Special */
  { id: 'unicode',       label: 'unicode',       action: '(unicode 😀)',      category: 'Special', desc: 'Emit Unicode character',    prompt: 'Character:' },
  { id: 'cmd',           label: 'cmd',           action: '(cmd PROGRAM)',      category: 'Special', desc: 'Run external program',      prompt: 'Program [args…]:' },
  { id: 'caps-word',     label: 'caps-word',     action: 'caps-word',          category: 'Special', desc: 'Activate caps-word mode' },
  { id: 'tap-dance',     label: 'tap-dance',     action: '(tap-dance 200 (TAP1) (TAP2))', category: 'Special', desc: 'Different action per tap count', prompt: 'timeout-ms (tap1) (tap2) …:' },
  { id: 'arbitrary-code', label: 'arbitrary-code', action: '(arbitrary-code 0)', category: 'Special', desc: 'Emit arbitrary scancode',   prompt: 'Scancode number:' },
  { id: 'release-key',   label: 'release-key',   action: '(release-key KEY)',  category: 'Special', desc: 'Release a held key',        prompt: 'Key name:' },
  { id: 'release-layer', label: 'release-layer', action: '(release-layer LAYER)', category: 'Special', desc: 'Deactivate a layer',        prompt: 'Layer name:' },
  { id: 'push-msg',      label: 'push-msg',      action: '(push-msg "hello")', category: 'Special', desc: 'Push message to TCP clients', prompt: 'Message string:' },
];

/* ── State ──────────────────────────────────────────────────────────────── */

const state = {
  layers: {
    base: {
      name: 'base',
      // Map from key-code → action string
      bindings: {},
    },
  },
  activeLayer: 'base',
  selectedAction: null,
  aliases: {}, // alias name → action string
  nextAliasNum: 1,
};

/* ── Helpers ──────────────────────────────────────────────────────────── */

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

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
  if (document.getElementById('cfg-danger-cmd').checked)        cfg.push('  danger-enable-cmd yes');
  const seqTimeout = document.getElementById('cfg-seq-timeout').value;
  if (seqTimeout && seqTimeout !== '1000') cfg.push(`  sequence-timeout ${seqTimeout}`);
  const tapHoldMs = document.getElementById('cfg-tap-hold-ms').value;
  if (tapHoldMs && tapHoldMs !== '200') cfg.push(`  ;; Default tap-hold ms: ${tapHoldMs}`);
  const linuxDev = document.getElementById('cfg-linux-dev').value.trim();
  if (linuxDev) cfg.push(`  linux-dev ${linuxDev}`);

  if (cfg.length > 0) {
    lines.push('(defcfg');
    lines.push(...cfg);
    lines.push(')');
    lines.push('');
  }

  // defsrc (always the same layout)
  lines.push('(defsrc');
  for (const row of KEYBOARD_LAYOUT) {
    const rowStr = row.map(k => k.code).join('  ');
    lines.push(`  ${rowStr}`);
  }
  lines.push(')');
  lines.push('');

  // defalias (collect all unique non-trivial actions)
  const aliasEntries = [];
  const usedAliases = new Set();
  const layerNames = Object.keys(state.layers);
  for (const lname of layerNames) {
    const layer = state.layers[lname];
    for (const kcode of DEFSRC_ORDER) {
      const act = layer.bindings[kcode] || '_';
      if (act === '_') continue;
      // Generate alias for complex actions
      if (act.startsWith('(') || act.includes(' ')) {
        const aliasName = `_a${state.nextAliasNum++}`;
        aliasEntries.push(`  ${aliasName} ${act}`);
        layer.bindings[kcode] = `@${aliasName}`;
        usedAliases.add(aliasName);
      }
    }
  }

  if (aliasEntries.length > 0) {
    lines.push('(defalias');
    lines.push(...aliasEntries);
    lines.push(')');
    lines.push('');
  }

  // deflayer for each layer
  for (const lname of layerNames) {
    const layer = state.layers[lname];
    lines.push(`(deflayer ${lname}`);
    for (const row of KEYBOARD_LAYOUT) {
      const rowActs = row.map(k => layer.bindings[k.code] || '_');
      lines.push(`  ${rowActs.join('  ')}`);
    }
    lines.push(')');
    lines.push('');
  }

  return lines.join('\n');
}

function updatePreview() {
  const out = document.getElementById('kbd-output');
  out.textContent = generateKbd();
}

/* ── UI: Layer list ────────────────────────────────────────────────────── */

function renderLayerList() {
  const container = document.getElementById('layer-list');
  container.innerHTML = '';
  Object.values(state.layers).forEach(layer => {
    const btn = document.createElement('button');
    btn.className = 'layer-btn' + (layer.name === state.activeLayer ? ' active' : '');
    btn.textContent = layer.name;
    btn.onclick = () => {
      state.activeLayer = layer.name;
      renderLayerList();
      renderKeyboard();
      document.getElementById('current-layer-name').textContent = layer.name;
    };
    container.appendChild(btn);
  });
}

/* ── UI: Action list ───────────────────────────────────────────────────── */

function renderActionList(filter = '') {
  const container = document.getElementById('action-list');
  container.innerHTML = '';

  const groups = {};
  for (const act of ACTION_CATALOG) {
    if (filter && !act.label.toLowerCase().includes(filter.toLowerCase()) && !act.category.toLowerCase().includes(filter.toLowerCase())) continue;
    if (!groups[act.category]) groups[act.category] = [];
    groups[act.category].push(act);
  }

  for (const [cat, items] of Object.entries(groups)) {
    const h3 = document.createElement('h3');
    h3.className = 'action-category';
    h3.textContent = cat;
    container.appendChild(h3);

    for (const item of items) {
      const div = document.createElement('div');
      div.className = 'action-item' + (state.selectedAction === item.id ? ' selected' : '');
      div.title = item.desc;
      div.innerHTML = `<strong>${esc(item.label)}</strong><br><small>${esc(item.desc)}</small>`;
      div.onclick = () => {
        state.selectedAction = item.id;
        renderActionList(filter);
      };
      container.appendChild(div);
    }
  }
}

/* ── UI: Keyboard renderer ─────────────────────────────────────────────── */

function renderKeyboard() {
  const container = document.getElementById('keyboard');
  container.innerHTML = '';
  const layer = state.layers[state.activeLayer];

  for (const row of KEYBOARD_LAYOUT) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    for (const key of row) {
      const kbtn = document.createElement('button');
      kbtn.className = 'key';
      kbtn.style.flex = key.width;
      const act = layer.bindings[key.code] || '_';
      kbtn.innerHTML = `<span class="key-label">${esc(key.label)}</span><span class="key-action">${esc(act === '_' ? '' : act)}</span>`;
      kbtn.title = `${key.code}\n${act}`;
      kbtn.onclick = () => onKeyClicked(key.code);
      rowDiv.appendChild(kbtn);
    }
    container.appendChild(rowDiv);
  }
}

function onKeyClicked(keyCode) {
  if (!state.selectedAction) {
    // No action selected — maybe enter raw text
    const raw = prompt(`Enter raw action for ${keyCode} (or leave blank for transparent):`);
    if (raw !== null) {
      state.layers[state.activeLayer].bindings[keyCode] = raw.trim() || '_';
      renderKeyboard();
      updatePreview();
    }
    return;
  }

  const actDef = ACTION_CATALOG.find(a => a.id === state.selectedAction);
  if (!actDef) return;

  // If action has a prompt, show modal
  if (actDef.prompt) {
    openModal(actDef, keyCode);
  } else {
    // Simple action — apply directly
    state.layers[state.activeLayer].bindings[keyCode] = actDef.action;
    renderKeyboard();
    updatePreview();
  }
}

/* ── Modal for parameterized actions ──────────────────────────────────── */

function openModal(actDef, keyCode) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body');
  body.innerHTML = '';

  const p = document.createElement('p');
  p.textContent = actDef.prompt;
  body.appendChild(p);

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'modal-input';
  input.placeholder = actDef.action;
  body.appendChild(input);

  // Show a hint with the template
  const hint = document.createElement('pre');
  hint.className = 'modal-hint';
  hint.textContent = `Template: ${actDef.action}`;
  body.appendChild(hint);

  overlay.classList.remove('hidden');
  input.focus();

  // Handler
  const apply = () => {
    const val = input.value.trim();
    if (!val) { overlay.classList.add('hidden'); return; }
    let resolved = actDef.action;
    // Simple template replacement
    if (resolved.includes('LAYER')) resolved = resolved.replace('LAYER', val);
    else if (resolved.includes('TAP') && resolved.includes('HOLD')) {
      const parts = val.split(/\s+/);
      if (parts.length >= 4) {
        resolved = resolved.replace('200', parts[0]).replace('200', parts[1]).replace('TAP', parts[2]).replace('HOLD', parts.slice(3).join(' '));
      } else {
        resolved = val; // user typed full expression
      }
    } else if (resolved.includes('ACTION')) resolved = resolved.replace('ACTION', val);
    else if (resolved.includes('KEYS')) resolved = resolved.replace('KEYS', val);
    else if (resolved.includes('PROGRAM')) resolved = resolved.replace('PROGRAM', val);
    else if (resolved.includes('KEY')) resolved = resolved.replace('KEY', val);
    else {
      // Generic positional replacements or full override
      const placeholders = (resolved.match(/[A-Z]+/g) || []);
      if (placeholders.length > 0) {
        const parts = val.split(/\s+/);
        placeholders.forEach((ph, i) => {
          resolved = resolved.replace(ph, parts[i] !== undefined ? parts[i] : ph);
        });
      } else {
        resolved = val;
      }
    }
    state.layers[state.activeLayer].bindings[keyCode] = resolved;
    overlay.classList.add('hidden');
    renderKeyboard();
    updatePreview();
  };

  document.getElementById('modal-apply').onclick = apply;
  document.getElementById('modal-cancel').onclick = () => overlay.classList.add('hidden');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });
}

/* ── Toolbar actions ──────────────────────────────────────────────────── */

function addLayer() {
  const name = prompt('New layer name:');
  if (!name || state.layers[name]) return alert('Layer name invalid or already exists.');
  state.layers[name] = { name, bindings: {} };
  state.activeLayer = name;
  renderLayerList();
  renderKeyboard();
  document.getElementById('current-layer-name').textContent = name;
  updatePreview();
}

function renameLayer() {
  const oldName = state.activeLayer;
  const newName = prompt('Rename layer to:', oldName);
  if (!newName || newName === oldName || state.layers[newName]) return;
  state.layers[newName] = state.layers[oldName];
  state.layers[newName].name = newName;
  delete state.layers[oldName];
  state.activeLayer = newName;
  renderLayerList();
  document.getElementById('current-layer-name').textContent = newName;
  updatePreview();
}

function deleteLayer() {
  if (Object.keys(state.layers).length <= 1) return alert('Cannot delete the only layer.');
  if (!confirm(`Delete layer "${state.activeLayer}"?`)) return;
  delete state.layers[state.activeLayer];
  state.activeLayer = Object.keys(state.layers)[0];
  renderLayerList();
  renderKeyboard();
  document.getElementById('current-layer-name').textContent = state.activeLayer;
  updatePreview();
}

function clearLayer() {
  if (!confirm(`Clear all bindings on layer "${state.activeLayer}"?`)) return;
  state.layers[state.activeLayer].bindings = {};
  renderKeyboard();
  updatePreview();
}

function loadSample() {
  // Load a sample home-row-mods + layers config
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
  renderLayerList();
  renderKeyboard();
  document.getElementById('current-layer-name').textContent = 'base';
  updatePreview();
}

function downloadKbd() {
  const blob = new Blob([generateKbd()], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanata.kbd';
  a.click();
  URL.revokeObjectURL(url);
}

function copyToClipboard() {
  navigator.clipboard.writeText(generateKbd()).then(() => {
    const btn = document.getElementById('btn-copy');
    const old = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = old, 1500);
  });
}

/* ── Quick-assign buttons ──────────────────────────────────────────────── */

function setupQuickAssign() {
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      state.selectedAction = null; // quick assign overrides catalog selection
      // Apply to currently selected key? No — we need to know which key.
      // Instead, set selectedAction to a synthetic quick-action.
      // We'll create a temporary action entry.
      const tmpId = '__quick__' + Date.now();
      ACTION_CATALOG.push({ id: tmpId, label: 'Quick', action, category: 'Quick' });
      state.selectedAction = tmpId;
      renderActionList();
    };
  });
}

/* ── Event wiring ──────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderLayerList();
  renderActionList();
  renderKeyboard();
  updatePreview();
  setupQuickAssign();

  document.getElementById('btn-add-layer').onclick = addLayer;
  document.getElementById('btn-rename-layer').onclick = renameLayer;
  document.getElementById('btn-delete-layer').onclick = deleteLayer;
  document.getElementById('btn-clear-layer').onclick = clearLayer;
  document.getElementById('btn-load-sample').onclick = loadSample;
  document.getElementById('btn-download').onclick = downloadKbd;
  document.getElementById('btn-copy').onclick = copyToClipboard;

  document.getElementById('action-search').addEventListener('input', e => {
    renderActionList(e.target.value);
  });

  // Re-render preview when config toggles change
  ['cfg-process-unmapped', 'cfg-danger-cmd'].forEach(id => {
    document.getElementById(id).addEventListener('change', updatePreview);
  });
  ['cfg-seq-timeout', 'cfg-tap-hold-ms', 'cfg-linux-dev'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });
});
