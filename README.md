# KKC — Kanata Keyboard Configurator

A visual, interactive web editor for creating [Kanata](https://github.com/jtroo/kanata) keyboard configuration files (`.kbd`).

Inspired by the [ZSA Configurator](https://configure.zsa.io), KKC lets you click keys on a virtual ANSI keyboard, assign Kanata actions (layers, tap-hold, macros, mouse, etc.), and instantly generate a valid `kanata.kbd` file ready for download.

---

## Features

| Feature | Description |
|---------|-------------|
| **Visual keyboard** | Interactive ANSI 60% layout with real-time action labels per key |
| **Multi-layer editing** | Create, rename, delete, and switch between unlimited layers |
| **Action catalog** | 30+ Kanata actions organized by category with inline documentation |
| **Quick assign** | One-click common patterns (transparent, no-op, live reload, home-row mods, layer toggles) |
| **Parameterized actions** | Modal builder for tap-hold, macros, mouse movement, sequences, etc. |
| **Global config panel** | Toggle `process-unmapped-keys`, `danger-enable-cmd`, sequence timeouts, Linux device path |
| **Live preview** | Real-time generated `.kbd` output with syntax highlighting ready for copy/download |
| **Sample config loader** | Instantly load a home-row-mods + symbols layer example |
| **No build step** | Pure HTML/CSS/JS — open `index.html` in any browser |

---

## Quick start

```bash
# Clone or download the repo
git clone https://github.com/YOURNAME/kkc.git
cd kkc

# Option 1: Open directly
xdg-open index.html

# Option 2: Serve via HTTP (for clipboard API permissions)
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## File layout

```
kkc/
├── index.html              # Main page
├── css/
│   └── style.css           # Dark-themed stylesheet
├── js/
│   └── kanata-generator.js # Core state + UI + .kbd generator
├── sample-configs/
│   └── home-row-mods.kbd   # Example output
└── README.md
```

---

## Usage workflow

1. **Open** `index.html` in a browser.
2. **Add layers** via the sidebar (e.g. `base`, `symbols`, `nav`).
3. **Select an action** from the catalog or quick-assign bar.
4. **Click a key** on the keyboard to assign the action.
5. If the action needs parameters (e.g. `layer-switch mylayer`), a modal prompts you.
6. **Switch layers** and repeat.
7. Adjust **global config** toggles (optional).
8. **Copy** or **download** the generated `kanata.kbd`.

---

## Supported Kanata actions (v1.12.x)

### Layer
- `layer-switch`, `layer-while-held`, `layer-toggle`
- `lrld`, `lrld-next`, `lrld-prev`

### Tap-Hold
- `tap-hold`, `tap-hold-press`, `tap-hold-release`, `tap-hold-release-keys`

### One-Shot
- `one-shot`, `one-shot-press`

### Macro
- `macro`, `dynamic-macro-record`, `dynamic-macro-record-stop`, `dynamic-macro-play`

### Mouse
- `movemouse-{up,down,left,right}`, `scroll-{up,down,left,right}`

### Combination
- `multi`, `fork`, `switch`, `chord`

### Sequence
- `sequence`

### Special
- `unicode`, `cmd`, `caps-word`, `tap-dance`, `arbitrary-code`, `release-key`, `release-layer`, `push-msg`

---

## Global config options

| Option | Description |
|--------|-------------|
| `process-unmapped-keys yes` | Process keys not listed in `defsrc` |
| `danger-enable-cmd` | Allow `(cmd …)` action (security opt-in) |
| `sequence-timeout` | Leader-sequence timeout in ms |
| `tap-hold default` | Visual reminder for default timing |
| `linux-dev` | Explicit evdev input device path |

---

## Browser compatibility

- Chrome / Edge / Firefox / Safari (modern versions)
- Clipboard API requires **HTTPS or localhost**
- No WebAssembly, no build tools, no bundler

---

## License

MIT — same as the Kanata project spirit.

---

## Contributing

1. Fork the repo
2. Edit `js/kanata-generator.js` or `css/style.css`
3. Test in-browser
4. Open a PR with screenshots

---

## Acknowledgements

- [jtroo/kanata](https://github.com/jtroo/kanata) — the keyboard remapper this tool generates configs for
- [ZSA Configurator](https://configure.zsa.io) — UI inspiration
