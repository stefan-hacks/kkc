/**
 * ═══════════════════════════════════════════════════════════════
 * KKC v3 — Kanata Keyboard Configurator
 * Refactored: validation, JSON project, Catppuccin theming,
 * plain-language UX, PDF export, per-key colors.
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ────────────────────────────────────────────────────────────────
   1. CONSTANTS
   ──────────────────────────────────────────────────────────────── */

const KEYBOARD_LAYOUT = [
  /* Function row */
  [
    { code: 'esc',  label: 'Esc',  width: 1.5 },
    { code: 'f1',   label: 'F1',   width: 1 },
    { code: 'f2',   label: 'F2',   width: 1 },
    { code: 'f3',   label: 'F3',   width: 1 },
    { code: 'f4',   label: 'F4',   width: 1 },
    { code: 'f5',   label: 'F5',   width: 1 },
    { code: 'f6',   label: 'F6',   width: 1 },
    { code: 'f7',   label: 'F7',   width: 1 },
    { code: 'f8',   label: 'F8',   width: 1 },
    { code: 'f9',   label: 'F9',   width: 1 },
    { code: 'f10',  label: 'F10',  width: 1 },
    { code: 'f11',  label: 'F11',  width: 1 },
    { code: 'f12',  label: 'F12',  width: 1.5 },
  ],
  /* Number row */
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
  /* QWERTY */
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
  /* ASDF */
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
  /* ZXCV */
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
  /* Bottom row */
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

/* Catppuccin accent names for per-key coloring */
const CATPPUCCIN_ACCENT_NAMES = [
  'rosewater','flamingo','pink','mauve','red','maroon','peach',
  'yellow','green','teal','sky','sapphire','blue','lavender'
];
const CATPPUCCIN_ACCENT_HEX = {
  rosewater:'#f5e0dc', flamingo:'#f2cdcd', pink:'#f5c2e7', mauve:'#cba6f7',
  red:'#f38ba8', maroon:'#eba0ac', peach:'#fab387', yellow:'#f9e2af',
  green:'#a6e3a1', teal:'#94e2d5', sky:'#89dceb', sapphire:'#74c7ec',
  blue:'#89b4fa', lavender:'#b4befe',
};

/* ── Action Catalog (with plain-language labels) ─────────────── */

const ACTION_CATEGORIES = [
  { id: 'basic',    label: 'Basic Remapping' },
  { id: 'layer',    label: 'Layers' },
  { id: 'taphold',  label: 'Dual-Purpose Keys (Tap-Hold)' },
  { id: 'oneshot',  label: 'One-Shot' },
  { id: 'macro',    label: 'Typing Shortcuts' },
  { id: 'mouse',    label: 'Mouse Control' },
  { id: 'combo',    label: 'Combinations' },
  { id: 'special',  label: 'Special / Scripting' },
  { id: 'advanced', label: 'Advanced' },
];

const ACTION_OPTIONS = [
  /* ── BASIC ──────────────────────────────────────────────────── */
  { id:'transparent', category:'basic', friendly:'Transparent (pass through)', keyword:'_', desc:'Fall through to base layer. The key does nothing on this layer but lets lower layers handle it.', build:()=>'_' },
  { id:'noop', category:'basic', friendly:'No-op (do nothing)', keyword:'XX', desc:'The key does absolutely nothing when pressed.', build:()=>'XX' },
  { id:'key', category:'basic', friendly:'Send a single key', keyword:'key', desc:'Press any key: letters, numbers, modifiers, F-keys, symbols, etc.', config:[
    { type:'keyinput', id:'key', label:'Key to send', default:'esc', placeholder:'Type any key name…' },
  ], build:(c)=>c.key?.trim()||'esc' },
  { id:'lrld', category:'basic', friendly:'Reload config live', keyword:'lrld', desc:'Tell Kanata to reload its configuration file without restarting.', build:()=>'lrld' },

  /* ── LAYERS ─────────────────────────────────────────────────── */
  { id:'layer-switch', category:'layer', friendly:'Switch to layer permanently', keyword:'layer-switch', desc:'Change the active base layer. Stays there until another switch.', config:[
    { type:'text', id:'layer', label:'Layer name', placeholder:'e.g. symbols' },
  ], build:(c)=>`(layer-switch ${c.layer||'base'})` },
  { id:'layer-toggle', category:'layer', friendly:'Hold for momentary layer', keyword:'layer-while-held', desc:'Hold this key to activate a layer. Release to return to the previous layer.', config:[
    { type:'text', id:'layer', label:'Layer name', placeholder:'e.g. nav' },
  ], build:(c)=>`(layer-while-held ${c.layer||'base'})` },

  /* ── TAP-HOLD ──────────────────────────────────────────────── */
  { id:'tap-hold', category:'taphold', friendly:'Tap-Hold (standard)', keyword:'tap-hold', desc:'Tap = one key, Hold = modifier or layer switch. Standard timing behavior.', config:[
    { type:'number', id:'tap_ms', label:'Tap timeout (ms)', default:200, min:50, max:1000 },
    { type:'number', id:'hold_ms', label:'Hold timeout (ms)', default:200, min:50, max:1000 },
    { type:'keyinput', id:'tap_key', label:'Tap action', default:'esc', placeholder:'Type any key name…' },
    { type:'keyinput', id:'hold_mod', label:'Hold action (modifier, layer, or key)', default:'lctl', placeholder:'e.g. lctl, lsft, or symbols' },
  ], build:(c)=>{
    const tap=c.tap_key?.trim()||'esc', hold=c.hold_mod?.trim()||'lctl';
    return `(tap-hold ${c.tap_ms||200} ${c.hold_ms||200} ${tap} ${hold})`;
  }},
  { id:'tap-hold-press', category:'taphold', friendly:'Tap-Hold (press-responsive)', keyword:'tap-hold-press', desc:'Hold activates as soon as another key is pressed — more responsive than standard.', config:[
    { type:'number', id:'tap_ms', label:'Tap timeout (ms)', default:200, min:50, max:1000 },
    { type:'number', id:'hold_ms', label:'Hold timeout (ms)', default:200, min:50, max:1000 },
    { type:'keyinput', id:'tap_key', label:'Tap action', default:'esc', placeholder:'Type any key name…' },
    { type:'keyinput', id:'hold_mod', label:'Hold action (modifier, layer, or key)', default:'lctl', placeholder:'e.g. lctl, lsft, or symbols' },
  ], build:(c)=>{
    const tap=c.tap_key?.trim()||'esc', hold=c.hold_mod?.trim()||'lctl';
    return `(tap-hold-press ${c.tap_ms||200} ${c.hold_ms||200} ${tap} ${hold})`;
  }},
  { id:'tap-hold-release', category:'taphold', friendly:'Tap-Hold (release-responsive)', keyword:'tap-hold-release', desc:'Hold activates only when another key is released.', config:[
    { type:'number', id:'tap_ms', label:'Tap timeout (ms)', default:200 },
    { type:'number', id:'hold_ms', label:'Hold timeout (ms)', default:200 },
    { type:'keyinput', id:'tap_key', label:'Tap action', default:'esc', placeholder:'Type any key name…' },
    { type:'keyinput', id:'hold_mod', label:'Hold action', default:'lctl', placeholder:'e.g. lctl or lsft' },
  ], build:(c)=>`(tap-hold-release ${c.tap_ms||200} ${c.hold_ms||200} ${c.tap_key?.trim()||'esc'} ${c.hold_mod?.trim()||'lctl'})` },

  /* ── ONE-SHOT ──────────────────────────────────────────────── */
  { id:'one-shot', category:'oneshot', friendly:'One-Shot Modifier', keyword:'one-shot', desc:'Modifier stays active until next key is pressed (or timeout).', config:[
    { type:'number', id:'timeout', label:'Timeout (ms)', default:500, min:100, max:5000 },
    { type:'keyinput', id:'mod', label:'Modifier', default:'lctl', placeholder:'e.g. lctl, lalt, lsft…' },
  ], build:(c)=>`(one-shot ${c.timeout||500} ${c.mod?.trim()||'lctl'})` },
  { id:'one-shot-layer', category:'oneshot', friendly:'One-Shot Layer', keyword:'one-shot', desc:'Layer stays active until next key is pressed (or timeout).', config:[
    { type:'number', id:'timeout', label:'Timeout (ms)', default:500, min:100, max:5000 },
    { type:'text', id:'layer', label:'Layer name', placeholder:'e.g. symbols' },
  ], build:(c)=>`(one-shot ${c.timeout||500} (layer-while-held ${c.layer||'base'}))` },

  /* ── MACROS ─────────────────────────────────────────────────── */
  { id:'macro', category:'macro', friendly:'Type a macro sequence', keyword:'macro', desc:'Automatically press a series of keys. Separate with spaces.', config:[
    { type:'text', id:'sequence', label:'Key sequence (space-separated)', placeholder:'e.g. lctl c lctl v' },
  ], build:(c)=>{
    const seq=(c.sequence||'').trim(); if(!seq) return '(macro spc)';
    return `(macro ${seq.split(/\s+/).join(' ')})`;
  }},
  { id:'dynamic-macro-record', category:'macro', friendly:'Record a macro (start)', keyword:'dynamic-macro-record', desc:'Start recording keystrokes into a numbered slot.', config:[
    { type:'number', id:'slot', label:'Slot number', default:0, min:0, max:9 },
  ], build:(c)=>`(dynamic-macro-record ${c.slot??0})` },
  { id:'dynamic-macro-play', category:'macro', friendly:'Play recorded macro', keyword:'dynamic-macro-play', desc:'Replay a macro from a numbered slot.', config:[
    { type:'number', id:'slot', label:'Slot number', default:0, min:0, max:9 },
  ], build:(c)=>`(dynamic-macro-play ${c.slot??0})` },
  { id:'dynamic-macro-stop', category:'macro', friendly:'Stop macro recording', keyword:'dynamic-macro-record-stop', desc:'End the current recording session.', build:()=>'dynamic-macro-record-stop' },

  /* ── MOUSE ──────────────────────────────────────────────────── */
  { id:'movemouse', category:'mouse', friendly:'Move mouse cursor', keyword:'movemouse', desc:'Move the mouse cursor in a direction by pixels.', config:[
    { type:'select', id:'dir', label:'Direction', options:['up','down','left','right'], default:'up' },
    { type:'number', id:'dist', label:'Distance (px)', default:25, min:1, max:200 },
  ], build:(c)=>`(movemouse-${c.dir||'up'} ${c.dist||25})` },
  { id:'scroll', category:'mouse', friendly:'Scroll wheel', keyword:'scroll', desc:'Scroll in a direction by lines.', config:[
    { type:'select', id:'dir', label:'Direction', options:['up','down','left','right'], default:'up' },
    { type:'number', id:'dist', label:'Distance', default:25, min:1, max:200 },
  ], build:(c)=>`(scroll-${c.dir||'up'} ${c.dist||25})` },
  { id:'movemouse-accel', category:'mouse', friendly:'Accelerated mouse movement', keyword:'mousemove-accel', desc:'Mouse movement with acceleration curve (up/down/left/right multipliers).', config:[
    { type:'number', id:'up', label:'Up accel', default:1, min:0, max:10 },
    { type:'number', id:'down', label:'Down accel', default:1, min:0, max:10 },
    { type:'number', id:'left', label:'Left accel', default:1, min:0, max:10 },
    { type:'number', id:'right', label:'Right accel', default:1, min:0, max:10 },
  ], build:(c)=>`(mousemove-accel ${c.up||1} ${c.down||1} ${c.left||1} ${c.right||1})` },

  /* ── COMBINATIONS ────────────────────────────────────────────── */
  { id:'multi', category:'combo', friendly:'Multiple actions at once', keyword:'multi', desc:'Trigger several actions simultaneously (e.g. Ctrl+C).', config:[
    { type:'text', id:'actions', label:'Actions (space-separated)', placeholder:'e.g. lctl c' },
  ], build:(c)=>`(multi ${(c.actions||'lctl c').trim().split(/\s+/).join(' ')})` },
  { id:'tap-dance', category:'combo', friendly:'Tap Dance', keyword:'tap-dance', desc:'Different action per tap count (double-tap, triple-tap, etc.).', config:[
    { type:'number', id:'timeout', label:'Timeout (ms)', default:200, min:50, max:1000 },
    { type:'text', id:'tap1', label:'1st tap action', placeholder:'e.g. esc' },
    { type:'text', id:'tap2', label:'2nd tap action', placeholder:'e.g. caps' },
  ], build:(c)=>{
    const t1=c.tap1?.trim()||'esc', t2=c.tap2?.trim()||'caps';
    return `(tap-dance ${c.timeout||200} (${t1}) (${t2}))`;
  }},
  { id:'fork', category:'combo', friendly:'Fork (conditional action)', keyword:'fork', desc:'Choose action based on whether another key is held.', config:[
    { type:'text', id:'left', label:'Default action', placeholder:'e.g. a' },
    { type:'text', id:'right', label:'Alternate action', placeholder:'e.g. b' },
    { type:'text', id:'triggers', label:'Trigger keys (space-separated)', placeholder:'e.g. lsft rsft' },
  ], build:(c)=>`(fork ${c.left||'a'} ${c.right||'b'} ${(c.triggers||'lsft').trim().split(/\s+/).join(' ')})` },
  { id:'chord', category:'combo', friendly:'Chord (simultaneous keys)', keyword:'chord', desc:'Multiple keys pressed at the same time trigger an action.', config:[
    { type:'text', id:'name', label:'Chord name', placeholder:'e.g. mychord' },
    { type:'text', id:'keys', label:'Chord keys (space-separated)', placeholder:'e.g. j k' },
    { type:'text', id:'action', label:'Result action', placeholder:'e.g. esc' },
  ], build:(c)=>`(chord ${c.name||'chord1'} ${(c.keys||'j k').trim().split(/\s+/).join(' ')} ${c.action||'esc'})` },

  /* ── SPECIAL ────────────────────────────────────────────────── */
  { id:'unicode', category:'special', friendly:'Type Unicode character', keyword:'unicode', desc:'Type any Unicode symbol or emoji.', config:[
    { type:'text', id:'char', label:'Character', placeholder:'e.g. 😀 or €' },
  ], build:(c)=>`(unicode ${c.char||' '})` },
  { id:'cmd', category:'special', friendly:'Run a command', keyword:'cmd', desc:'Launch a program. Requires danger-enable-cmd in global config.', config:[
    { type:'text', id:'program', label:'Program', placeholder:'e.g. alacritty' },
    { type:'text', id:'args', label:'Arguments (optional)', placeholder:'e.g. -e vim' },
  ], build:(c)=>{
    const prog=c.program?.trim()||'alacritty', args=c.args?.trim();
    return args?`(cmd ${prog} ${args})`:`(cmd ${prog})`;
  }},
  { id:'caps-word', category:'special', friendly:'Caps Word', keyword:'caps-word', desc:'Capitalize the next word (Shift on steroids).', build:()=>'caps-word' },
  { id:'arbitrary-code', category:'special', friendly:'Custom OS scancode', keyword:'arbitrary-code', desc:'Emit a raw OS scancode number.', config:[
    { type:'number', id:'code', label:'Scancode number', default:0, min:0, max:999 },
  ], build:(c)=>`(arbitrary-code ${c.code??0})` },
  { id:'release-key', category:'special', friendly:'Release a held key', keyword:'release-key', desc:'Force-release a key that is being held down.', config:[
    { type:'keyinput', id:'key', label:'Key to release', default:'lctl', placeholder:'Type any key name…' },
  ], build:(c)=>`(release-key ${c.key?.trim()||'lctl'})` },
  { id:'sequence', category:'special', friendly:'Key sequence (leader)', keyword:'sequence', desc:'Vim-like leader: press a sequence of keys to trigger an action.', config:[
    { type:'text', id:'keys', label:'Sequence keys (space-separated)', placeholder:'e.g. j k' },
    { type:'text', id:'action', label:'Result action', placeholder:'e.g. esc' },
  ], build:(c)=>`(sequence ${(c.keys||'j k').trim().split(/\s+/).join(' ')} ${c.action||'esc'})` },
  { id:'push-msg', category:'special', friendly:'Send TCP message', keyword:'push-msg', desc:'Send a message to TCP clients listening on the Kanata port.', config:[
    { type:'text', id:'msg', label:'Message', placeholder:'e.g. layer-changed' },
  ], build:(c)=>`(push-msg "${c.msg||'hello'}")` },

  /* ── ADVANCED ───────────────────────────────────────────────── */
  { id:'tap-hold-release-keys', category:'advanced', friendly:'Tap-Hold (trigger on key release)', keyword:'tap-hold-release-keys', desc:'Hold activates only when specific keys are released.', config:[
    { type:'number', id:'tap_ms', label:'Tap timeout (ms)', default:200, min:50, max:1000 },
    { type:'number', id:'hold_ms', label:'Hold timeout (ms)', default:200, min:50, max:1000 },
    { type:'keyinput', id:'tap_key', label:'Tap action', default:'esc', placeholder:'Type any key name…' },
    { type:'keyinput', id:'hold_mod', label:'Hold action', default:'lctl', placeholder:'e.g. lctl or lsft' },
    { type:'text', id:'triggers', label:'Trigger keys (space-separated)', placeholder:'e.g. a s d f' },
  ], build:(c)=>`(tap-hold-release-keys ${c.tap_ms||200} ${c.hold_ms||200} ${c.tap_key?.trim()||'esc'} ${c.hold_mod?.trim()||'lctl'} ${(c.triggers||'').trim().split(/\s+/).join(' ')})` },
  { id:'switch', category:'advanced', friendly:'Switch (conditional routing)', keyword:'switch', desc:'Choose action based on which other keys are currently held.', config:[
    { type:'text', id:'pairs', label:'Key/Action pairs (space-separated)', placeholder:'e.g. a esc b tab' },
  ], build:(c)=>{
    const parts=(c.pairs||'a esc').trim().split(/\s+/); const pairs=[];
    for(let i=0;i<parts.length;i+=2){ pairs.push(`(${parts[i]} ${parts[i+1]||'_'})`); }
    return `(switch ${pairs.join(' ')})`;
  }},
  { id:'release-layer', category:'advanced', friendly:'Force-release a layer', keyword:'release-layer', desc:'Immediately deactivate a layer.', config:[
    { type:'text', id:'layer', label:'Layer name', placeholder:'e.g. nav' },
  ], build:(c)=>`(release-layer ${c.layer||'base'})` },
  { id:'delegate-to-first', category:'advanced', friendly:'Delegate to first layer', keyword:'delegate-to-first-layer', desc:'Pass unhandled keys to the first (base) layer.', config:[
    { type:'select', id:'val', label:'Enable', options:['yes','no'], default:'no' },
  ], build:(c)=>`delegate-to-first-layer ${c.val||'no'}` },
  { id:'log-layer-changes', category:'advanced', friendly:'Log layer changes', keyword:'log-layer-changes', desc:'Write layer transitions to the system log.', config:[
    { type:'select', id:'val', label:'Enable', options:['yes','no'], default:'no' },
  ], build:(c)=>`log-layer-changes ${c.val||'no'}` },
  { id:'lrld-next', category:'advanced', friendly:'Load next config file', keyword:'lrld-next', desc:'Cycle to the next config file from startup arguments.', build:()=>'lrld-next' },
  { id:'lrld-prev', category:'advanced', friendly:'Load previous config file', keyword:'lrld-prev', desc:'Cycle to the previous config file from startup arguments.', build:()=>'lrld-prev' },
  { id:'lrld-num', category:'advanced', friendly:'Load config by number', keyword:'lrld-num', desc:'Load a specific config file by its 1-based index.', config:[
    { type:'number', id:'n', label:'Config number', default:1, min:1, max:10 },
  ], build:(c)=>`(lrld-num ${c.n||1})` },
];

/* Valid key names for validation */
const VALID_KEY_NAMES = new Set([
  'esc','bspc','tab','ret','spc','caps','grv','home','end','pgup','pgdn','left','up','down','rght','insert','del',
  'lctl','lalt','lmet','lsft','rctl','ralt','rmet','rsft',
  'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12',
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  '1','2','3','4','5','6','7','8','9','0',
  '-','=','[',']','\\',';','\'',',','.','/',
  '!','@','#','$','%','^','&','*','(',')','_','+','{','}','|',':','"','<','>','`','~',
]);

/* ────────────────────────────────────────────────────────────────
   2. STATE
   ──────────────────────────────────────────────────────────────── */

const PROJECT_SCHEMA = 1;

function createEmptyProject() {
  return {
    schema: PROJECT_SCHEMA,
    name: 'Untitled Layout',
    theme: 'mocha',
    layers: {
      base: { name: 'base', bindings: {}, labels: {}, keyColors: {} },
    },
    globalConfig: {
      processUnmapped: true,
      dangerCmd: false,
      seqTimeout: 1000,
      linuxDev: '',
    },
  };
}

const state = {
  project: loadProjectFromStorage() || createEmptyProject(),
  activeLayer: 'base',
  // Modal state
  editingKey: null,
  modalCategory: 'basic',
  modalSelection: null,
  modalConfig: {},
};

function loadProjectFromStorage() {
  try {
    const raw = localStorage.getItem('kkc-project');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.schema !== PROJECT_SCHEMA) return null;
    return parsed;
  } catch { return null; }
}

function saveProjectToStorage() {
  try { localStorage.setItem('kkc-project', JSON.stringify(state.project)); } catch {}
}

/* ────────────────────────────────────────────────────────────────
   3. GENERATOR + VALIDATION
   ──────────────────────────────────────────────────────────────── */

function generateKbd() {
  const proj = state.project;
  const lines = [];
  lines.push(';; ═══════════════════════════════════════════════════════════════');
  lines.push(';; Generated by KKC — Kanata Keyboard Configurator');
  lines.push(';; https://github.com/jtroo/kanata');
  lines.push(';; ═══════════════════════════════════════════════════════════════');
  lines.push('');

  // defcfg
  const cfg = [];
  if (proj.globalConfig.processUnmapped) cfg.push('  process-unmapped-keys yes');
  if (proj.globalConfig.dangerCmd) cfg.push('  danger-enable-cmd yes');
  if (proj.globalConfig.seqTimeout !== 1000) cfg.push(`  sequence-timeout ${proj.globalConfig.seqTimeout}`);
  if (proj.globalConfig.linuxDev) cfg.push(`  linux-dev ${proj.globalConfig.linuxDev}`);
  if (cfg.length) {
    lines.push('(defcfg');
    lines.push(...cfg);
    lines.push(')');
    lines.push('');
  }

  // defsrc
  lines.push('(defsrc');
  for (const row of KEYBOARD_LAYOUT) {
    lines.push('  ' + row.map(k => k.code).join(' '));
  }
  lines.push(')');
  lines.push('');

  // defalias
  const aliasMap = new Map();
  let aliasIdx = 0;
  for (const layer of Object.values(proj.layers)) {
    for (const [kcode, action] of Object.entries(layer.bindings)) {
      if (action.includes(' ') && !action.startsWith('(layer') && !action.startsWith('(tap') && !action.startsWith('(one') && !action.startsWith('(macro') && !action.startsWith('(multi') && !action.startsWith('(fork') && !action.startsWith('(chord') && !action.startsWith('(sequence') && !action.startsWith('(switch') && !action.startsWith('(move') && !action.startsWith('(scroll') && !action.startsWith('(tap-hold') && !action.startsWith('(unicode') && !action.startsWith('(cmd') && !action.startsWith('(arbitrary') && !action.startsWith('(release') && !action.startsWith('(push')) {
        // Simple key — no alias needed
        continue;
      }
      if (action !== '_' && action !== 'XX') {
        const aliasName = `a${aliasIdx}`;
        aliasMap.set(action, aliasName);
        aliasIdx++;
      }
    }
  }

  if (aliasMap.size) {
    lines.push('(defalias');
    for (const [action, name] of aliasMap) {
      lines.push(`  ${name} ${action}`);
    }
    lines.push(')');
    lines.push('');
  }

  // deflayer for each layer
  for (const [lname, layer] of Object.entries(proj.layers)) {
    lines.push(`(deflayer ${lname}`);
    for (const row of KEYBOARD_LAYOUT) {
      const tokens = row.map(k => {
        const act = layer.bindings[k.code] || '_';
        const alias = aliasMap.get(act);
        return alias ? `@${alias}` : act;
      });
      lines.push('  ' + tokens.join(' '));
    }
    lines.push(')');
    lines.push('');
  }

  return lines.join('\n').trim() + '\n';
}

function validateKbdOutput(text) {
  const errors = [];
  // Balanced parens
  let depth = 0;
  for (const ch of text) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (depth < 0) { errors.push('Unmatched closing parenthesis'); break; }
  }
  if (depth !== 0) errors.push('Unmatched opening parenthesis');

  // Check defsrc vs deflayer sizes
  const srcMatch = text.match(/\(defsrc\s+([\s\S]*?)\s*\)/);
  if (srcMatch) {
    const srcKeys = srcMatch[1].trim().split(/\s+/).filter(Boolean);
    const layerMatches = [...text.matchAll(/\(deflayer\s+\S+\s+([\s\S]*?)\s*\)/g)];
    for (const m of layerMatches) {
      const layerKeys = m[1].trim().split(/\s+/).filter(Boolean);
      if (layerKeys.length !== srcKeys.length) {
        errors.push(`Layer has ${layerKeys.length} keys but defsrc has ${srcKeys.length}`);
      }
    }
  }

  // No duplicate layer names
  const layerNames = [...text.matchAll(/\(deflayer\s+(\S+)/g)].map(m => m[1]);
  const seen = new Set();
  for (const n of layerNames) {
    if (seen.has(n)) errors.push(`Duplicate layer name: "${n}"`);
    seen.add(n);
  }

  return errors;
}

/* ────────────────────────────────────────────────────────────────
   4. KBD PARSER (import)
   ──────────────────────────────────────────────────────────────── */

function parseKbdFile(text) {
  const lines = text.split('\n');
  let i = 0;
  const proj = createEmptyProject();
  const warnings = [];

  function nextTokenLine() {
    while (i < lines.length) {
      const line = lines[i].trim(); i++;
      if (!line || line.startsWith(';;')) continue;
      return line.split(';;')[0].trim();
    }
    return null;
  }

  let srcKeys = [];
  const aliases = {};

  while (i < lines.length) {
    const line = nextTokenLine();
    if (!line) break;

    if (line.startsWith('(defcfg')) {
      let depth = 1; const cfgLines = [];
      while (i < lines.length && depth > 0) {
        const cl = lines[i].trim(); i++;
        if (!cl || cl.startsWith(';;')) continue;
        const clean = cl.split(';;')[0];
        for (const ch of clean) { if (ch === '(') depth++; if (ch === ')') depth--; }
        cfgLines.push(clean.trim());
        if (depth <= 0) break;
      }
      const cfgText = cfgLines.join(' ');
      proj.globalConfig.processUnmapped = /process-unmapped-keys\s+yes/.test(cfgText);
      proj.globalConfig.dangerCmd = /danger-enable-cmd\s+yes/.test(cfgText);
      const st = cfgText.match(/sequence-timeout\s+(\d+)/);
      if (st) proj.globalConfig.seqTimeout = parseInt(st[1]);
      const ld = cfgText.match(/linux-dev\s+(\S+)/);
      if (ld) proj.globalConfig.linuxDev = ld[1];

    } else if (line.startsWith('(defsrc')) {
      while (i < lines.length) {
        const srcLine = lines[i].trim(); i++;
        if (!srcLine || srcLine.startsWith(';;')) continue;
        const clean = srcLine.split(';;')[0].trim();
        if (clean === ')') break;
        const tokens = clean.match(/[^\s\(\)]+/g) || [];
        srcKeys.push(...tokens);
      }

    } else if (line.startsWith('(defalias')) {
      let depth = 1; const aliasLines = [];
      while (i < lines.length && depth > 0) {
        const al = lines[i].trim(); i++;
        if (!al || al.startsWith(';;')) continue;
        const clean = al.split(';;')[0];
        for (const ch of clean) { if (ch === '(') depth++; if (ch === ')') depth--; }
        aliasLines.push(clean.trim());
        if (depth <= 0) break;
      }
      const inner = aliasLines.join(' ').replace(/^\)/, '').replace(/\)$/, '').trim();
      const tokens = inner.match(/(?:\([^\)]*\)|[^\s\(\)]+)/g) || [];
      for (let j = 0; j < tokens.length; j += 2) {
        const name = tokens[j], action = tokens[j + 1];
        if (name && action) aliases[name] = action;
      }

    } else if (line.startsWith('(deflayer')) {
      const layerName = line.match(/\(deflayer\s+(\S+)/)?.[1] || 'unnamed';
      const layerBindings = {};
      let keyIdx = 0;
      while (i < lines.length) {
        const lyrLine = lines[i].trim(); i++;
        if (!lyrLine || lyrLine.startsWith(';;')) continue;
        const clean = lyrLine.split(';;')[0].trim();
        if (clean === ')') break;
        const tokens = clean.match(/(?:\([^\)]*\)|[^\s\(\)]+)/g) || [];
        for (const tok of tokens) {
          if (keyIdx >= srcKeys.length) break;
          let action = tok;
          if (action.startsWith('@')) {
            const aname = action.slice(1);
            action = aliases[aname] || action;
          }
          layerBindings[srcKeys[keyIdx]] = action;
          keyIdx++;
        }
      }
      proj.layers[layerName] = { name: layerName, bindings: layerBindings, labels: {}, keyColors: {} };
    }
  }

  if (Object.keys(proj.layers).length === 0) {
    throw new Error('No deflayer blocks found in file');
  }
  return { project: proj, warnings };
}

/* ────────────────────────────────────────────────────────────────
   5. UI RENDERERS
   ──────────────────────────────────────────────────────────────── */

function esc(str) {
  const d = document.createElement('div'); d.textContent = String(str); return d.innerHTML;
}

function toast(msg, type='info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

/* Theme */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.project.theme = theme;
  document.querySelectorAll('.theme-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

/* Keyboard */
function renderKeyboard() {
  const container = document.getElementById('keyboard');
  container.innerHTML = '';
  const layer = state.project.layers[state.activeLayer];

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

      const label = layer.labels?.[key.code] || key.label;
      btn.innerHTML = `<span class="key-label">${esc(label)}</span><span class="key-action">${esc(act === '_' ? '' : act)}</span>`;

      // Per-key color
      const kc = layer.keyColors?.[key.code];
      if (kc && CATPPUCCIN_ACCENT_HEX[kc]) {
        btn.style.setProperty('--key-accent', CATPPUCCIN_ACCENT_HEX[kc]);
        btn.setAttribute('style', btn.getAttribute('style') + '; --key-accent: ' + CATPPUCCIN_ACCENT_HEX[kc]);
      }

      btn.onclick = () => openKeyModal(key);
      rowDiv.appendChild(btn);
    }
    container.appendChild(rowDiv);
  }
}

/* Layer tabs */
function renderLayerTabs() {
  const container = document.getElementById('layer-tabs');
  container.innerHTML = '';
  Object.values(state.project.layers).forEach(layer => {
    const btn = document.createElement('button');
    btn.className = 'layer-tab' + (layer.name === state.activeLayer ? ' active' : '');
    btn.innerHTML = esc(layer.name);
    btn.onclick = () => {
      state.activeLayer = layer.name;
      renderLayerTabs();
      renderKeyboard();
      updatePreview();
    };
    container.appendChild(btn);
  });
}

/* Modal */
function openKeyModal(keyObj) {
  state.editingKey = keyObj.code;
  state.modalCategory = 'basic';
  state.modalSelection = null;
  state.modalConfig = {};
  renderKeyboard();

  document.getElementById('modal-key-badge').textContent = keyObj.label;
  document.getElementById('modal-title').textContent = `Key: ${keyObj.code}`;
  document.getElementById('modal').classList.add('open');

  renderCatalogTabs();
  renderCatalogOptions();
  renderConfigurator();
  renderKeyColorPicker();
  updateModalPreview();
}

function closeModal(save=false) {
  if (save && state.modalSelection) {
    const opt = ACTION_OPTIONS.find(o => o.id === state.modalSelection);
    if (opt) {
      const action = opt.build(state.modalConfig);
      state.project.layers[state.activeLayer].bindings[state.editingKey] = action;
    }
  }
  state.editingKey = null;
  document.getElementById('modal').classList.remove('open');
  renderKeyboard();
  updatePreview();
}

/* Catalog tabs in modal */
function renderCatalogTabs() {
  const container = document.getElementById('catalog-tabs');
  container.innerHTML = '';
  ACTION_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'catalog-tab' + (cat.id === state.modalCategory ? ' active' : '');
    btn.textContent = cat.label;
    btn.onclick = () => {
      state.modalCategory = cat.id;
      state.modalSelection = null;
      state.modalConfig = {};
      renderCatalogTabs();
      renderCatalogOptions();
      renderConfigurator();
      updateModalPreview();
    };
    container.appendChild(btn);
  });
}

/* Catalog options */
function renderCatalogOptions() {
  const container = document.getElementById('catalog-options');
  container.innerHTML = '';
  const search = (document.getElementById('catalog-search')?.value || '').toLowerCase();
  const opts = ACTION_OPTIONS.filter(o => {
    if (o.category !== state.modalCategory) return false;
    if (!search) return true;
    return (o.friendly + ' ' + o.keyword + ' ' + o.desc).toLowerCase().includes(search);
  });
  opts.forEach(opt => {
    const div = document.createElement('button');
    div.className = 'catalog-option' + (opt.id === state.modalSelection ? ' selected' : '');
    div.innerHTML = `<span class="opt-title">${esc(opt.friendly)}</span>
      <span class="opt-desc">${esc(opt.desc)}</span>
      <span class="opt-keyword">${esc(opt.keyword)}</span>`;
    div.onclick = () => {
      state.modalSelection = opt.id;
      state.modalConfig = {};
      renderCatalogOptions();
      renderConfigurator();
      updateModalPreview();
    };
    container.appendChild(div);
  });
}

/* Configurator fields */
function renderConfigurator() {
  const container = document.getElementById('configurator');
  container.innerHTML = '';

  if (!state.modalSelection) {
    container.innerHTML = '<p style="color:var(--fg-muted);font-size:var(--text-sm)">Select an action above to configure it.</p>';
    return;
  }

  const opt = ACTION_OPTIONS.find(o => o.id === state.modalSelection);
  if (!opt || !opt.config) {
    container.innerHTML = `<p style="color:var(--fg-muted);font-size:var(--text-sm)">"${esc(opt.friendly)}" needs no configuration. Click Save to apply.</p>`;
    return;
  }

  opt.config.forEach(field => {
    const lbl = document.createElement('label');
    lbl.className = 'field-label';
    lbl.textContent = field.label;
    container.appendChild(lbl);

    if (field.type === 'text') {
      const input = document.createElement('input');
      input.type = 'text'; input.className = 'field-input';
      input.placeholder = field.placeholder || '';
      input.value = state.modalConfig[field.id] || '';
      input.oninput = (e) => {
        state.modalConfig[field.id] = e.target.value;
        // Inline validation
        validateField(field, e.target.value, input);
        updateModalPreview();
      };
      container.appendChild(input);
    } else if (field.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number'; input.className = 'field-input';
      input.min = field.min ?? ''; input.max = field.max ?? '';
      input.value = state.modalConfig[field.id] ?? (field.default ?? '');
      input.oninput = (e) => {
        state.modalConfig[field.id] = e.target.value;
        validateField(field, e.target.value, input);
        updateModalPreview();
      };
      container.appendChild(input);
    } else if (field.type === 'select') {
      const select = document.createElement('select');
      select.className = 'field-select';
      field.options.forEach(optVal => {
        const o = document.createElement('option');
        o.value = optVal; o.textContent = optVal;
        if ((state.modalConfig[field.id] || field.default) === optVal) o.selected = true;
        select.appendChild(o);
      });
      select.onchange = (e) => {
        state.modalConfig[field.id] = e.target.value;
        updateModalPreview();
      };
      container.appendChild(select);
    } else if (field.type === 'keyinput') {
      renderKeyInput(container, field);
    }
  });
}

function validateField(field, value, el) {
  let msg = '';
  if (field.type === 'number') {
    const n = parseFloat(value);
    if (isNaN(n)) msg = 'Must be a number';
    else if (field.min !== undefined && n < field.min) msg = `Minimum ${field.min}`;
    else if (field.max !== undefined && n > field.max) msg = `Maximum ${field.max}`;
  }
  if (field.type === 'text' && field.id === 'layer') {
    if (value && /\s/.test(value)) msg = 'Layer name cannot contain spaces';
  }
  // Remove/add validation message
  let err = el.nextElementSibling;
  if (err && err.classList.contains('validation-msg')) err.remove();
  if (msg) {
    err = document.createElement('div');
    err.className = 'validation-msg';
    err.textContent = msg;
    el.parentNode.insertBefore(err, el.nextSibling);
  }
}

/* KeyInput renderer */
function renderKeyInput(container, field) {
  const wrap = document.createElement('div');
  wrap.className = 'keyinput-wrap';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = field.placeholder || 'Type any key name…';
  input.value = state.modalConfig[field.id] || field.default || '';
  input.className = 'field-input';
  input.oninput = (e) => {
    state.modalConfig[field.id] = e.target.value;
    grid.querySelectorAll('.mini-key').forEach(k => k.classList.remove('selected'));
    updateModalPreview();
  };
  wrap.appendChild(input);

  // Dropdown
  const dropdownWrap = document.createElement('div');
  dropdownWrap.className = 'keyinput-dropdown-wrap';
  const dropdown = document.createElement('select');
  dropdown.className = 'field-select';
  const blankOpt = document.createElement('option');
  blankOpt.value = ''; blankOpt.textContent = 'Common keys…';
  dropdown.appendChild(blankOpt);
  const QUICK_KEYS = [
    'lctl','lalt','lmet','lsft','rctl','ralt','rmet','rsft','caps',
    'tab','ret','spc','bspc','del','insert','home','end','pgup','pgdn','left','down','up','rght',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    '0','1','2','3','4','5','6','7','8','9',
    '!','@','#','$','%','^','&','*','(',')','-','=','_','+','[',']','{','}','\\','|','/','?',';',':','\'','"',',','<','.','>','`','~','grv',
    'esc','f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12',
  ];
  QUICK_KEYS.forEach(k => {
    const o = document.createElement('option');
    o.value = k; o.textContent = k;
    if ((state.modalConfig[field.id] || field.default) === k) o.selected = true;
    dropdown.appendChild(o);
  });
  dropdown.onchange = (e) => {
    if (!e.target.value) return;
    input.value = e.target.value;
    state.modalConfig[field.id] = e.target.value;
    grid.querySelectorAll('.mini-key').forEach(k => {
      k.classList.toggle('selected', k.dataset.key === e.target.value);
    });
    updateModalPreview();
  };
  dropdownWrap.appendChild(dropdown);
  wrap.appendChild(dropdownWrap);

  // Mini grid: Letters → Numbers → Symbols
  const grid = document.createElement('div');
  grid.className = 'keyinput-mini-grid';

  const LETTER_KEYS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const NUMBER_KEYS = ['0','1','2','3','4','5','6','7','8','9'];
  const SYMBOL_KEYS = [
    '!','@','#','$','%','^','&','*','(',')','-','=','_','+',
    '[',']','{','}','\\','|','/','?',';',':','\'','"',',','<','.','>','`','~','grv',
  ];

  function makeSection(title, keys) {
    const sec = document.createElement('div');
    sec.className = 'keyinput-section';
    sec.innerHTML = `<div class="keyinput-section-title">${esc(title)}</div><div class="keyinput-section-grid"></div>`;
    const sg = sec.querySelector('.keyinput-section-grid');
    keys.forEach(k => {
      const btn = document.createElement('button');
      btn.className = 'mini-key';
      btn.textContent = k;
      btn.dataset.key = k;
      if ((state.modalConfig[field.id] || field.default) === k) btn.classList.add('selected');
      btn.onclick = () => {
        input.value = k;
        state.modalConfig[field.id] = k;
        grid.querySelectorAll('.mini-key').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        updateModalPreview();
      };
      sg.appendChild(btn);
    });
    return sec;
  }

  grid.appendChild(makeSection('Letters', LETTER_KEYS));
  grid.appendChild(makeSection('Numbers', NUMBER_KEYS));
  grid.appendChild(makeSection('Symbols', SYMBOL_KEYS));
  wrap.appendChild(grid);

  container.appendChild(wrap);
}

function updateModalPreview() {
  const opt = ACTION_OPTIONS.find(o => o.id === state.modalSelection);
  const code = document.getElementById('modal-preview-action');
  if (opt) {
    code.textContent = opt.build(state.modalConfig);
  } else {
    code.textContent = '_';
  }
}

/* Key color picker inside modal */
function renderKeyColorPicker() {
  const container = document.getElementById('color-options');
  if (!container) return;
  container.innerHTML = '';
  const layer = state.project.layers[state.activeLayer];
  const currentColor = layer.keyColors?.[state.editingKey];

  // None option
  const noneBtn = document.createElement('button');
  noneBtn.textContent = 'None';
  noneBtn.style.cssText = 'padding:4px 8px;font-size:var(--text-xs);border:1px solid var(--border-default);border-radius:var(--radius-sm);background:var(--bg-elevated);color:var(--fg-secondary);cursor:pointer;transition:var(--transition);';
  if (!currentColor) noneBtn.style.borderColor = 'var(--accent)';
  noneBtn.onclick = () => {
    if (layer.keyColors) delete layer.keyColors[state.editingKey];
    renderKeyColorPicker(); renderKeyboard();
  };
  container.appendChild(noneBtn);

  CATPPUCCIN_ACCENT_NAMES.forEach(name => {
    const btn = document.createElement('button');
    btn.style.cssText = `width:24px;height:24px;border-radius:var(--radius-sm);border:2px solid transparent;cursor:pointer;background:${CATPPUCCIN_ACCENT_HEX[name]};transition:var(--transition);`;
    if (currentColor === name) btn.style.borderColor = 'var(--fg-primary)';
    btn.title = name;
    btn.onclick = () => {
      if (!layer.keyColors) layer.keyColors = {};
      layer.keyColors[state.editingKey] = name;
      renderKeyColorPicker(); renderKeyboard();
    };
    container.appendChild(btn);
  });
}

/* Preview panel */
function updatePreview() {
  const text = generateKbd();
  document.getElementById('kbd-output').textContent = text;
  const errors = validateKbdOutput(text);
  const status = document.getElementById('validation-status');
  if (errors.length) {
    status.innerHTML = `<span style="color:var(--danger);font-size:var(--text-xs)">⚠ ${esc(errors[0])}</span>`;
  } else {
    status.innerHTML = `<span style="color:var(--success);font-size:var(--text-xs)">✓ Valid</span>`;
  }
  saveProjectToStorage();

  // Show/hide onboarding
  const layer = state.project.layers[state.activeLayer];
  const hasBindings = Object.keys(layer.bindings).length > 0;
  document.getElementById('onboarding').style.display = hasBindings ? 'none' : 'flex';
}

/* ────────────────────────────────────────────────────────────────
   6. EVENT WIRING
   ──────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Theme
  applyTheme(state.project.theme || 'mocha');
  document.querySelectorAll('.theme-switcher button').forEach(btn => {
    btn.onclick = () => applyTheme(btn.dataset.theme);
  });

  // Initial render
  renderLayerTabs();
  renderKeyboard();
  updatePreview();

  // Global config
  document.getElementById('cfg-process-unmapped').addEventListener('change', (e) => {
    state.project.globalConfig.processUnmapped = e.target.checked;
    updatePreview();
  });
  document.getElementById('cfg-danger-cmd').addEventListener('change', (e) => {
    state.project.globalConfig.dangerCmd = e.target.checked;
    updatePreview();
  });
  document.getElementById('cfg-seq-timeout').addEventListener('input', (e) => {
    state.project.globalConfig.seqTimeout = e.target.value;
    updatePreview();
  });
  document.getElementById('cfg-linux-dev').addEventListener('input', (e) => {
    state.project.globalConfig.linuxDev = e.target.value;
    updatePreview();
  });

  // Sync global config UI to state
  document.getElementById('cfg-process-unmapped').checked = state.project.globalConfig.processUnmapped;
  document.getElementById('cfg-danger-cmd').checked = state.project.globalConfig.dangerCmd;
  document.getElementById('cfg-seq-timeout').value = state.project.globalConfig.seqTimeout;
  document.getElementById('cfg-linux-dev').value = state.project.globalConfig.linuxDev;

  // Catalog search in modal
  const catSearch = document.getElementById('catalog-search');
  if (catSearch) {
    catSearch.oninput = () => { renderCatalogOptions(); };
  }

  // Layer add
  document.getElementById('btn-add-layer').onclick = () => {
    const name = prompt('New layer name:');
    if (!name || state.project.layers[name]) return toast('Invalid or duplicate layer name.', 'error');
    state.project.layers[name] = { name, bindings: {}, labels: {}, keyColors: {} };
    state.activeLayer = name;
    renderLayerTabs();
    renderKeyboard();
    updatePreview();
  };

  // Load .kbd
  document.getElementById('btn-load-file').onclick = () => {
    document.getElementById('file-input').click();
  };
  document.getElementById('file-input').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const result = parseKbdFile(ev.target.result);
        state.project.layers = result.project.layers;
        state.project.globalConfig = result.project.globalConfig;
        state.activeLayer = Object.keys(state.project.layers)[0];
        renderLayerTabs();
        renderKeyboard();
        updatePreview();
        toast(`Loaded "${file.name}" successfully!`);
      } catch (err) {
        toast('Error parsing file: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Save JSON project
  document.getElementById('btn-save-json').onclick = () => {
    const blob = new Blob([JSON.stringify(state.project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kkc-project.json';
    a.click(); URL.revokeObjectURL(url);
    toast('Project saved as JSON');
  };

  // Clear all
  document.getElementById('btn-clear-all').onclick = () => {
    if (!confirm('Clear all bindings on ALL layers?')) return;
    Object.values(state.project.layers).forEach(l => { l.bindings = {}; l.labels = {}; });
    renderKeyboard();
    updatePreview();
  };

  // Copy
  document.getElementById('btn-copy').onclick = () => {
    const text = generateKbd();
    const errors = validateKbdOutput(text);
    if (errors.length) { toast('Cannot copy: ' + errors[0], 'error'); return; }
    navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard!'));
  };

  // Download .kbd
  document.getElementById('btn-download').onclick = () => {
    const text = generateKbd();
    const errors = validateKbdOutput(text);
    if (errors.length) { toast('Cannot download: ' + errors[0], 'error'); return; }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kanata.kbd';
    a.click(); URL.revokeObjectURL(url);
  };

  // PDF export
  document.getElementById('btn-export-pdf').onclick = () => {
    exportPdfViaPrintWindow();
  };

  // Modal controls
  document.getElementById('modal-close').onclick = () => closeModal(false);
  document.getElementById('modal-save').onclick = () => closeModal(true);
  document.getElementById('modal-clear').onclick = () => {
    state.project.layers[state.activeLayer].bindings[state.editingKey] = '_';
    closeModal(false);
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modal').classList.contains('open')) {
      closeModal(false);
    }
  });

  // Drag and drop for .kbd files
  const keyboard = document.getElementById('keyboard');
  keyboard.addEventListener('dragover', (e) => { e.preventDefault(); keyboard.style.borderColor = 'var(--accent)'; });
  keyboard.addEventListener('dragleave', () => { keyboard.style.borderColor = ''; });
  keyboard.addEventListener('drop', (e) => {
    e.preventDefault();
    keyboard.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!file.name.endsWith('.kbd') && !file.name.endsWith('.json')) { toast('Drop a .kbd or .json file', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(ev.target.result);
          if (parsed.schema !== PROJECT_SCHEMA) throw new Error('Invalid project JSON');
          state.project = parsed;
          state.activeLayer = Object.keys(state.project.layers)[0];
        } else {
          const result = parseKbdFile(ev.target.result);
          state.project.layers = result.project.layers;
          state.project.globalConfig = result.project.globalConfig;
          state.activeLayer = Object.keys(state.project.layers)[0];
        }
        applyTheme(state.project.theme || 'mocha');
        renderLayerTabs(); renderKeyboard(); updatePreview();
        toast(`Loaded "${file.name}"`);
      } catch (err) { toast('Error: ' + err.message, 'error'); }
    };
    reader.readAsText(file);
  });
});

/* ────────────────────────────────────────────────────────────────
   7. PDF EXPORT
   ──────────────────────────────────────────────────────────────── */

function exportPdfViaPrintWindow() {
  const win = window.open('', '_blank');
  if (!win) return toast('Popup blocked — allow popups for this site.', 'error');

  const layerNames = Object.keys(state.project.layers);
  const catColors = CATPPUCCIN_ACCENT_HEX;

  let html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>KKC PDF Export</title>
<style>
@page { size: A4 landscape; margin: 14mm; }
body { font-family: system-ui, sans-serif; margin: 0; background: #fff; color: #222; }
.layer-page { page-break-after: always; padding: 10mm; box-sizing: border-box; }
.layer-page:last-child { page-break-after: auto; }
.layer-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 8mm; text-align: center; }
.keyboard { display: flex; flex-direction: column; gap: 3px; max-width: 260mm; margin: 0 auto; }
.keyboard-row { display: flex; gap: 3px; justify-content: center; }
.key { flex: 1; min-width: 0; height: 14mm; background: #f8f8f8; border: 0.5px solid #bbb; border-top: 2.5mm solid var(--accent, #999); border-radius: 2px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.7rem; color: #333; overflow: hidden; padding: 1px; }
.key .key-label { font-weight: 600; font-size: 0.75rem; }
.key .key-action { font-size: 0.55rem; color: #555; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.key.assigned { background: #fff; }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head><body>`;

  layerNames.forEach((lname, idx) => {
    const layer = state.project.layers[lname];
    const accent = catColors[CATPPUCCIN_ACCENT_NAMES[idx % CATPPUCCIN_ACCENT_NAMES.length]] || '#999';
    html += `\n<div class="layer-page">\n  <div class="layer-title" style="color:${esc(accent)}">Layer: ${esc(lname)}</div>\n  <div class="keyboard">`;
    for (const row of KEYBOARD_LAYOUT) {
      html += '    <div class="keyboard-row">\n';
      for (const key of row) {
        const act = layer.bindings[key.code] || '_';
        const label = layer.labels?.[key.code] || key.label;
        const assigned = act !== '_' ? ' assigned' : '';
        const w = key.width || 1;
        const flexStyle = w > 1 ? ` style="flex:${w}"` : '';
        html += `      <div class="key${assigned}"${flexStyle} style="--accent:${esc(accent)}">`;
        html += `<span class="key-label">${esc(label)}</span>`;
        html += `<span class="key-action">${esc(act === '_' ? '' : act)}</span>`;
        html += `</div>\n`;
      }
      html += '    </div>\n';
    }
    html += '  </div>\n</div>\n';
  });

  html += `
<script>window.onload=function(){setTimeout(function(){if(typeof window.print==='function')window.print();},400);};</script>
</body></html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
