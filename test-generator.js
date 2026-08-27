const fs = require('fs');
const js = fs.readFileSync('js/kanata-generator.js','utf8');

const mockEl = () => {
  const el = {
    tagName: 'div', className: '', textContent: '', innerHTML: '', style: {},
    dataset: {}, value: '', checked: false, placeholder: '',
    appendChild: function(c) {
      el._children = el._children || [];
      el._children.push(c);
      return c;
    },
    addEventListener: function(){},
    focus: function(){},
    onclick: null,
    _children: [],
  };
  return el;
};

const els = {};
global.document = {
  getElementById: function(id) {
    if (!els[id]) els[id] = mockEl();
    return els[id];
  },
  querySelectorAll: function() { return []; },
  querySelector: function() { return mockEl(); },
  createElement: function(tag) { return mockEl(); },
  addEventListener: function(){},
};
global.navigator = { clipboard: { writeText: function() { return Promise.resolve(); } } };
global.Blob = class Blob { constructor(c,o) { this.c = c; } };
global.URL = { createObjectURL: function() { return ''; } };
global.window = {};

eval(js);

console.log('JS loaded OK');
console.log('DEFSRC keys:', DEFSRC_ORDER.length);
console.log('Actions catalog:', ACTION_CATALOG.length);
console.log('Layout rows:', KEYBOARD_LAYOUT.length);

// Simulate state
state.layers = {
  base: { name: 'base', bindings: { caps: '(tap-hold-press 200 200 esc lctl)' } }
};
state.activeLayer = 'base';
state.nextAliasNum = 1;
state.aliases = {};

els['cfg-process-unmapped'].checked = true;
els['cfg-danger-cmd'].checked = false;
els['cfg-seq-timeout'].value = '1000';
els['cfg-tap-hold-ms'].value = '200';
els['cfg-linux-dev'].value = '';

const output = generateKbd();
console.log('--- Generated KBD (first 25 lines) ---');
console.log(output.split('\n').slice(0,25).join('\n'));
console.log('--- Total lines:', output.split('\n').length);
