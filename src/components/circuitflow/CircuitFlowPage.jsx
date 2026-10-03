import React, { useState, useMemo } from 'react';
import CircuitFlowLiveUI from './CircuitFlowLiveUI';
import {
  Cpu,
  Layers,
  ShieldCheck,
  Download,
  Check,
  ExternalLink,
  Monitor,
  Apple,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Wrench,
  Search,
  Keyboard,
  MousePointer,
  Eye,
  Box,
  Share2,
  Copy
} from 'lucide-react';

export default function CircuitFlowPage() {
  const [heroView, setHeroView] = useState('screenshot'); // 'live' | 'screenshot'
  const [activePlatform, setActivePlatform] = useState('windows');
  const [activeLayer, setActiveLayer] = useState('topCopper');
  const [selectedCanvasItem, setSelectedCanvasItem] = useState('u1');
  const [shortcutFilter, setShortcutFilter] = useState('');
  const [shortcutCategory, setShortcutCategory] = useState('all');
  const [drcPassed, setDrcPassed] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      badge: 'WinUI 3 Modern Desktop',
      osVersion: 'Windows 10 (1809+) & Windows 11',
      architecture: 'x64 & ARM64 Native',
      highlights: [
        'Hardware-accelerated SkiaSharp rendering engine',
        'Multi-monitor and ultra-high-DPI display scaling support',
        'Precision mouse navigation, smooth scroll zoom, and snap-to-grid',
        'Self-contained installation with zero runtime dependencies'
      ],
      packageType: 'MSIX Installer & Portable .zip',
      status: 'Coming in v0.1 Release'
    },
    {
      id: 'macos',
      name: 'macOS',
      icon: Apple,
      badge: 'Mac Catalyst Native',
      osVersion: 'macOS Sonoma (14) & Sequoia (15+)',
      architecture: 'Apple Silicon (M1/M2/M3/M4) & Intel 64-bit',
      highlights: [
        'Fluid trackpad pinch-to-zoom and inertial panning',
        'Full macOS menu bar commands and native keyboard shortcuts',
        'Retina display subpixel vector rendering clarity',
        'Signed universal application bundle'
      ],
      packageType: 'Universal Disk Image (.dmg) & Signed App',
      status: 'Live Capture Verified • Packaging Release'
    },
  ];

  const shortcuts = [
    { input: 'Left-click + drag', action: 'Select, move, route traces, or marquee-select', category: 'canvas' },
    { input: 'Right-click + drag', action: 'Pan the canvas seamlessly', category: 'navigation' },
    { input: 'Scroll wheel / pinch', action: 'Zoom at the pointer location', category: 'navigation' },
    { input: 'Ctrl + Z', action: 'Undo last layout action', category: 'history' },
    { input: 'Ctrl + Y', action: 'Redo previously reverted action', category: 'history' },
    { input: 'Ctrl + S', action: 'Save PCB project to JSON format', category: 'project' },
    { input: 'Ctrl + O', action: 'Open existing JSON project', category: 'project' },
    { input: 'Ctrl + A', action: 'Select all components and traces', category: 'canvas' },
    { input: 'Ctrl + D', action: 'Duplicate selected components', category: 'canvas' },
    { input: 'Delete / Backspace', action: 'Delete selected items', category: 'canvas' },
    { input: 'R', action: 'Switch to Selection Tool', category: 'tools' },
    { input: 'T', action: 'Switch to Interactive Route Tool', category: 'tools' },
    { input: '+ / - / 0', action: 'Zoom in / out / reset 100% view', category: 'navigation' },
    { input: 'Escape', action: 'Clear selection or cancel active operation', category: 'tools' },
  ];

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((s) => {
      const matchesSearch =
        s.input.toLowerCase().includes(shortcutFilter.toLowerCase()) ||
        s.action.toLowerCase().includes(shortcutFilter.toLowerCase());
      const matchesCategory =
        shortcutCategory === 'all' || s.category === shortcutCategory;
      return matchesSearch && matchesCategory;
    });
  }, [shortcutFilter, shortcutCategory]);

  const componentsList = {
    u1: {
      name: 'U1 (ATtiny85-20PU)',
      type: 'DIP-8 Microcontroller',
      footprint: 'DIP8_W7.62mm_P2.54mm',
      pins: 8,
      position: 'X: 35.00mm, Y: 22.50mm',
      rotation: '0°',
      nets: ['Pin 1: RESET', 'Pin 4: GND', 'Pin 5: PB0 (PWM)', 'Pin 8: VCC (+5V)'],
      status: 'Clean (Clearance: 0.35mm)',
    },
    r1: {
      name: 'R1 (Current Limiting)',
      type: 'Resistor (0.25W THT)',
      footprint: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
      pins: 2,
      position: 'X: 54.00mm, Y: 18.00mm',
      rotation: '90°',
      nets: ['Pin 1: Net-U1-Pin5', 'Pin 2: Net-D1-Anode'],
      status: 'Clean (Clearance: 0.40mm)',
    },
    d1: {
      name: 'D1 (Status Indicator)',
      type: 'LED 5mm (Emerald)',
      footprint: 'LED_D5.0mm_P2.54mm',
      pins: 2,
      position: 'X: 54.00mm, Y: 32.00mm',
      rotation: '90°',
      nets: ['Pin 1 (Anode): Net-R1-Pin2', 'Pin 2 (Cathode): GND'],
      status: 'Clean (Clearance: 0.40mm)',
    },
    c1: {
      name: 'C1 (Decoupling Cap)',
      type: 'Capacitor Ceramic 100nF',
      footprint: 'C_Disc_D5.0mm_W2.5mm_P5.00mm',
      pins: 2,
      position: 'X: 22.00mm, Y: 22.50mm',
      rotation: '0°',
      nets: ['Pin 1: VCC (+5V)', 'Pin 2: GND'],
      status: 'Clean (Clearance: 0.38mm)',
    },
    j1: {
      name: 'J1 (Power & ISP Header)',
      type: 'PinHeader 1x04',
      footprint: 'PinHeader_1x04_P2.54mm_Vertical',
      pins: 4,
      position: 'X: 12.00mm, Y: 22.50mm',
      rotation: '0°',
      nets: ['Pin 1: VCC', 'Pin 2: GND', 'Pin 3: MOSI', 'Pin 4: SCK'],
      status: 'Clean (Clearance: 0.50mm)',
    }
  };

  return (
    <div className="w-full text-zinc-800 dark:text-zinc-100 selection:bg-emerald-500 selection:text-black">
      {/* BACKGROUND CIRCUIT ACCENT */}
      <div className="relative overflow-hidden pt-4 pb-12">
        <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-30 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 10 10 L 30 10 L 40 20 L 50 20 M 10 30 L 20 30 L 30 40 L 30 50 M 50 40 L 40 40 L 30 50" fill="none" stroke="#10b981" strokeWidth="0.75" strokeOpacity="0.4" />
                <circle cx="10" cy="10" r="2" fill="#10b981" fillOpacity="0.5" />
                <circle cx="50" cy="20" r="2" fill="#10b981" fillOpacity="0.5" />
                <circle cx="30" cy="50" r="2" fill="#10b981" fillOpacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>CircuitFlow.NET • Modern Cross-Platform PCB Editor</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-500">v0.1.0 Preview</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Design, Route &amp; Verify PCBs with{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Modern Precision
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
            A lightweight, cross-platform PCB layout CAD editor powered by <span className="font-semibold text-zinc-900 dark:text-white">SkiaSharp</span>.
            Engineered with interactive vector routing, real-time Design Rule Checking (DRC), transparent JSON project files, and manufacturing-grade Gerber &amp; GRBL export.
          </p>

          {/* ACTIVE DEVELOPMENT CALLOUT */}
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-sm flex items-start gap-3 shadow-inner">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <span className="font-semibold block text-amber-950 dark:text-amber-100">Active Development Preview</span>
              This project is under rapid active development. Export output (Gerber/GRBL) and design-rule checks should be reviewed before fabricating physical circuit boards.
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <a
              href="#downloads"
              className="px-6 py-3 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 group"
            >
              <Download className="w-4 h-4" />
              <span>Download Releases</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#features"
              className="px-6 py-3 rounded-lg font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Explore Features</span>
            </a>

            <a
              href="#platforms"
              className="px-5 py-3 rounded-lg font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span>Supported Platforms</span>
            </a>
          </div>

          {/* VIEW MODE TOGGLE */}
          {/* <div className="mt-8 flex items-center justify-center gap-2">
            <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl backdrop-blur-md">
              <button
                onClick={() => setHeroView('live')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition flex items-center gap-2 ${
                  heroView === 'live'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>macOS Live UI (Interactive)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-sans font-bold animate-pulse">
                  Live
                </span>
              </button>
              <button
                onClick={() => setHeroView('screenshot')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition flex items-center gap-2 ${
                  heroView === 'screenshot'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>macOS Native App (Original Screenshot)</span>
              </button>
            </div>
          </div> */}
        </div>

        {/* SCREENSHOT HERO VIEW */}
        {heroView === 'screenshot' && (
          <div className="mt-10 max-w-5xl mx-auto px-4">
            <div className="rounded-2xl border border-zinc-700/80 bg-zinc-950 shadow-2xl overflow-hidden">
              {/* Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-zinc-400">
                    CircuitFlow — Native macOS Desktop (Mac Catalyst / SkiaSharp)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Native App
                  </span>
                </div>
              </div>

              {/* Screenshot Image */}
              <div className="relative overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img
                  src="/circuitflow/images/mainwindow.png"
                  alt="CircuitFlow.NET main window running on macOS"
                  className="w-full h-auto object-cover select-none"
                  loading="eager"
                />
              </div>

              {/* Feature Annotations Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-zinc-950 border-t border-zinc-800/80 text-xs">
                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold block text-zinc-100 font-mono text-[11px]">Library Palette</span>
                    <span className="text-[11px] text-zinc-400">Passives, Actives, Switches &amp; IC footprint tiles.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold block text-zinc-100 font-mono text-[11px]">Export &amp; DRC Tools</span>
                    <span className="text-[11px] text-zinc-400">One-click Gerber RS-274X, SVG, and JSON saves.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold block text-zinc-100 font-mono text-[11px]">SkiaSharp Canvas</span>
                    <span className="text-[11px] text-zinc-400">Dotted grid, board boundary, and zoom controls.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold block text-zinc-100 font-mono text-[11px]">Properties Inspector</span>
                    <span className="text-[11px] text-zinc-400">Real-time parameters, rotation, and netlists.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIVE UI HERO VIEW (BASED ON MACOS SCREENSHOT) */}
        {heroView === 'live' && (
          <div className="mt-10 max-w-6xl mx-auto px-4">
            <CircuitFlowLiveUI />
          </div>
        )}
      </div>

      {/* CORE FEATURES DEEP DIVE */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Engineered for Modern PCB Layout
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            CircuitFlow combines hardware-accelerated SkiaSharp rendering with a high-efficiency CAD design workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FEATURE 1 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <MousePointer className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Interactive Vector Canvas</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Ultra-responsive SkiaSharp canvas with intuitive component placement, interactive trace routing, multi-item marquee selection, drag-and-drop movement, resizing, and rock-solid undo/redo (<code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">Ctrl+Z</code> / <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">Ctrl+Y</code>).
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-teal-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Built-in Footprint Library</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Comprehensive footprint catalogue ready out-of-the-box: Resistors, Capacitors, LEDs, Diodes, Pin Headers, DIP IC packages (DIP-8, DIP-14, DIP-16), Transistors (TO-92), and dev boards like Arduino Nano.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-cyan-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Custom Footprint Designer</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Integrated Component Editor empowering engineers to craft custom SMD and through-hole footprints. Define arbitrary pin arrangements, drill sizes, silk labels, and pitch with persistent library storage.
            </p>
          </div>

          {/* FEATURE 4 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-amber-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Real-Time DRC Engine</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Comprehensive Design-Rule Checking catches mistakes before ordering: component collision, uninsulated trace crossings, pin proximity thresholds, missing pin net connections, and minimum copper width violations.
            </p>
          </div>

          {/* FEATURE 5 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-purple-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Clean JSON Project Format</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Transparent, version-controllable JSON file format. No proprietary black-box binaries. Version-control your PCB schematics, share templates, and customize geometries directly with scriptable ease.
            </p>
          </div>

          {/* FEATURE 6 */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/50 transition shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Multi-Format Exports</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Built-in production exporters for industry standard <span className="font-semibold text-zinc-900 dark:text-white">Gerber RS-274X</span>, CNC isolation milling <span className="font-semibold text-zinc-900 dark:text-white">GRBL G-code</span>, and publication-ready vector <span className="font-semibold text-zinc-900 dark:text-white">SVG</span> artwork.
            </p>
          </div>
        </div>
      </section>

      {/* OPEN JSON PROJECT FORMAT SHOWCASE */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-2">
              <FileCode className="w-3.5 h-3.5" /> Open File Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
              Projects Saved in Transparent JSON
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              CircuitFlow stores all project data — board outline, placed components, and routed copper traces — in clean, human-readable JSON format (<code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-emerald-600 dark:text-emerald-400">.json</code>). The board outline is encoded as a standard SVG path string (<code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-emerald-600 dark:text-emerald-400">BoardOutlinePath</code>), supporting arbitrary shapes including chamfers and fillets. Each component entry carries its footprint ID, position, rotation, lock state, optional junction geometry, and a display color.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Zero Vendor Lock-In</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    No opaque proprietary binary databases. Your designs remain fully readable, inspectable, and editable in any standard text editor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Seamless Git Version Control</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Track hardware revisions with meaningful line-by-line git diffs. Review component additions, net reassignments, and clearance changes directly in your commit history.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Scriptable &amp; Automatable</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Automate board generation, extract Bill of Materials (BOM), or run automated custom DRC validation using standard JSON tooling in Python, Node, or C#.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2 text-zinc-200">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  Arduino_Uno_Shield.json
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Standard JSON
                </span>
              </div>
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed max-h-[380px]">
                {`{
  "BoardWidth": 685.8,
  "BoardHeight": 533.4,
  "BoardOutlinePath": "M 7.62 0 L 635 0 L 660.4 25.4 L 660.4 127 L 685.8 152.4 L 685.8 495.3 L 660.4 520.7 L 660.4 525.78 A 7.62 7.62 0 0 1 652.78 533.4 L 7.62 533.4 A 7.62 7.62 0 0 1 0 525.78 L 0 7.62 A 7.62 7.62 0 0 1 7.62 0 Z",
  "Components": [
    {
      "Id": "POWER",
      "FootprintId": "header_1x8",
      "Name": "POWER",
      "Value": null,
      "X": 368.3,
      "Y": 508.0,
      "Rotation": 0,
      "Locked": true,
      "JunctionType": "Smooth",
      "Width": 188,
      "Height": 20,
      "Color": "#10B981"
    },
    {
      "Id": "DIGITAL_LOW",
      "FootprintId": "header_1x8",
      "Name": "DIGITAL_LOW",
      "Value": null,
      "X": 546.1,
      "Y": 25.4,
      "Rotation": 0,
      "Locked": true,
      "JunctionType": "Smooth",
      "Width": 188,
      "Height": 20,
      "Color": "#10B981"
    },
    {
      "Id": "H1",
      "FootprintId": "hole",
      "Name": "H1",
      "Value": null,
      "X": 139.7,
      "Y": 508.0,
      "Rotation": 0,
      "Locked": true,
      "JunctionType": null,
      "Width": 0,
      "Height": 0,
      "Color": "#10B981"
    }
  ],
  "Traces": []
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS & GALLERY SECTION */}
      <section className="py-12 bg-zinc-100 dark:bg-zinc-900/40 rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto my-8 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-1">
              <Eye className="w-3.5 h-3.5" /> Visual Showcase &amp; UI Previews
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Application Screenshots
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
            High-res captures &amp; feature previews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SCREENSHOT 1 - MAIN WINDOW */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col justify-between group hover:border-emerald-500/50 transition shadow-sm overflow-hidden">
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/circuitflow/images/mainwindow.png"
                alt="CircuitFlow.NET main window — PCB canvas, library drawer, and properties inspector"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-zinc-900/90 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                macOS Native App
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                Main Canvas, Library &amp; Inspector
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Live macOS desktop execution showing the component drawer, floating SkiaSharp canvas, board boundaries, and real-time properties inspector.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live Capture
                </span>
                <a
                  href="/circuitflow/images/mainwindow.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Full Resolution <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* SCREENSHOT 2 - COMPONENT EDITOR */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col justify-between group hover:border-teal-500/50 transition shadow-sm overflow-hidden">
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/circuitflow/images/componenteditor.png"
                alt="CircuitFlow.NET custom component footprint editor"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-zinc-900/90 text-teal-400 font-mono text-[10px] border border-teal-500/30">
                Component Studio
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                Custom Footprint &amp; Package Editor
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Visual editor for DIP, QFP, SOIC, SMD pads, custom silkscreen dimensions, and pitch calibration with persistent JSON-backed storage.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-teal-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live Capture
                </span>
                <a
                  href="/circuitflow/images/componenteditor.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Full Resolution <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* GIF 3 - CAPACITOR PLACEMENT */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col justify-between group hover:border-amber-500/50 transition shadow-sm overflow-hidden">
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/circuitflow/images/capacitor.gif"
                alt="CircuitFlow.NET — placing a capacitor component on the PCB canvas"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-zinc-900/90 text-amber-400 font-mono text-[10px] border border-amber-500/30">
                ▶ Animated
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                Component Placement in Action
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Placing a capacitor from the built-in library directly onto the SkiaSharp canvas with snap-to-grid precision.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Recording
              </span>
            </div>
          </div>

          {/* GIF 4 - COMPONENT MOVE */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col justify-between group hover:border-cyan-500/50 transition shadow-sm overflow-hidden">
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/circuitflow/images/componentmove.gif"
                alt="CircuitFlow.NET — moving components on the PCB canvas"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-zinc-900/90 text-cyan-400 font-mono text-[10px] border border-cyan-500/30">
                ▶ Animated
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                Drag-and-Drop Component Movement
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Fluid drag-and-drop repositioning of placed components with live trace updates and undo/redo support.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-500">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Recording
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section id="platforms" className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Supported Operating Systems
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            CircuitFlow runs as a high-performance native desktop application on Windows and macOS workstations.
          </p>
        </div>

        {/* PLATFORM TABS */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 overflow-x-auto">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition border-b-2 whitespace-nowrap ${activePlatform === p.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-900'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{p.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {platforms.map((p) => {
              if (p.id !== activePlatform) return null;
              return (
                <div key={p.id} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 block text-[10px] uppercase font-mono">Compatible OS</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{p.osVersion}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 block text-[10px] uppercase font-mono">Architecture</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{p.architecture}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 block text-[10px] uppercase font-mono">Distribution Package</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{p.packageType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">Platform Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono">
                    <span className="text-zinc-500">Release Stage: <span className="text-emerald-500 font-semibold">{p.status}</span></span>
                    <a href="#downloads" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold">
                      View Download Slots <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KEYBOARD & MOUSE SHORTCUTS TABLE */}
      <section id="shortcuts" className="py-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-1">
              <Keyboard className="w-3.5 h-3.5" /> Fast Ergonomics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Keyboard &amp; Mouse Shortcuts
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* SEARCH */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={shortcutFilter}
                onChange={(e) => setShortcutFilter(e.target.value)}
                placeholder="Filter shortcuts..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* CATEGORY TABS */}
            <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700 p-0.5 bg-zinc-100 dark:bg-zinc-900 text-xs">
              {['all', 'tools', 'navigation', 'canvas', 'history', 'project'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShortcutCategory(cat)}
                  className={`px-2 py-1 rounded capitalize transition ${shortcutCategory === cat
                    ? 'bg-emerald-600 text-white font-medium shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/70 text-xs font-mono text-zinc-500 uppercase">
                  <th className="py-3 px-4">Input Gesture / Shortcut</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4 text-right">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredShortcuts.map((sc, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition">
                    <td className="py-2.5 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      <kbd className="px-2 py-1 text-xs rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-xs">
                        {sc.input}
                      </kbd>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
                      {sc.action}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-[11px] text-zinc-400 capitalize">
                      {sc.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CUSTOM COMPONENT EDITOR FEATURE */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto my-8 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-1">
              <Wrench className="w-3.5 h-3.5" /> Component Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Visual Component &amp; Footprint Editor
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              Need a footprint that is not in the default library? Use the built-in <span className="font-semibold text-zinc-900 dark:text-white">Component Editor</span> to visually place pads, set drill diameters, define pin spacing, and draw silkscreen outlines.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              Saved footprints are permanently preserved in your personal library and can be used immediately across any project.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Footprints are stored in clean JSON format, allowing you to easily share custom component definitions with colleagues or export them to other designs.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2 text-zinc-200">
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  Component &amp; Footprint Editor
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Live Screenshot</span>
              </div>
              <img
                src="/circuitflow/images/componenteditor.png"
                alt="CircuitFlow.NET Component &amp; Footprint Editor"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS & RELEASES */}
      <section id="downloads" className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-1">
            <Download className="w-3.5 h-3.5" /> Distribution Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Releases &amp; Downloads
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Pre-compiled standalone packages and installer bundles for every supported operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* WINDOWS RELEASE CARD */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                  45 MB
                </span>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">Windows</h3>
              <span className="text-xs font-mono text-zinc-500 block mb-3">x64 Native • WinUI 3 Desktop</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
                Standalone portable release package for Windows 10 &amp; 11 workstations. Extract and run directly without complex prerequisites.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/circuitflow/artifacts/CircuitFlow-win-x64-Release.zip"
                download="CircuitFlow-win-x64-Release.zip"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs flex items-center justify-center gap-2 shadow-md transition font-semibold"
              >
                <Download className="w-4 h-4" /> Download CircuitFlow-win-x64-Release.zip
              </a>

              {/* SHA256 BOX */}
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">SHA-256 Checksum</span>
                  <button
                    onClick={() => copyToClipboard('a482e9ca5b3885e7b7b1312a8ae37bef20beae5aabcfa17b85fdc4d406c49eb3', 'sha-win')}
                    className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 text-[10px]"
                    title="Copy SHA-256"
                  >
                    {copiedKey === 'sha-win' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'sha-win' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-zinc-700 dark:text-zinc-300 break-all select-all font-mono text-[10px] leading-tight">
                  a482e9ca5b3885e7b7b1312a8ae37bef20beae5aabcfa17b85fdc4d406c49eb3
                </div>
              </div>
            </div>
          </div>

          {/* MACOS RELEASE CARD */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Apple className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  11 MB
                </span>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">macOS</h3>
              <span className="text-xs font-mono text-zinc-500 block mb-3">Apple Silicon (arm64) • Mac Catalyst</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
                Native release bundle optimized for Apple Silicon (M1/M2/M3/M4) running macOS Sonoma (14) &amp; Sequoia (15+).
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/circuitflow/artifacts/CircuitFlow-macOS-arm64-Release.zip"
                download="CircuitFlow-macOS-arm64-Release.zip"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs flex items-center justify-center gap-2 shadow-md transition font-semibold"
              >
                <Download className="w-4 h-4" /> Download CircuitFlow-macOS-arm64-Release.zip
              </a>

              {/* SHA256 BOX */}
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">SHA-256 Checksum</span>
                  <button
                    onClick={() => copyToClipboard('ac607950e9ebd4bf5f3bea2c9ccf04ca2f7c98694abc431ef92145fd717f76ee', 'sha-mac')}
                    className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 text-[10px]"
                    title="Copy SHA-256"
                  >
                    {copiedKey === 'sha-mac' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'sha-mac' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-zinc-700 dark:text-zinc-300 break-all select-all font-mono text-[10px] leading-tight">
                  ac607950e9ebd4bf5f3bea2c9ccf04ca2f7c98694abc431ef92145fd717f76ee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 font-mono">
        <p className="mb-2">
          CircuitFlow.NET is a closed-source cross-platform PCB layout editor currently under active development.
        </p>
        <p>
          All rights reserved © 2026 Robby Roboter. Contact the author for licensing and beta access inquiries.
        </p>
      </section>
    </div>
  );
}
