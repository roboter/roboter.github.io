import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CircuitBoard,
  Cpu,
  Globe,
  GitFork,
  ShieldCheck,
  Download,
  Check,
  ExternalLink,
  Monitor,
  Apple,
  Tablet,
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
  Copy,
} from 'lucide-react';

const repositoryUrl = 'https://github.com/roboter/CircuitFlow.NET';

const readmeBadges = [
  {
    label: '.NET 10',
    href: 'https://dotnet.microsoft.com/download/dotnet/10.0',
    image: 'https://img.shields.io/badge/.NET-10.0-512BD4?style=flat&logo=dotnet&logoColor=white',
  },
  {
    label: 'C# 13',
    href: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    image: 'https://img.shields.io/badge/C%23-13-239120?style=flat&logo=csharp&logoColor=white',
  },
  {
    label: 'SkiaSharp',
    href: 'https://github.com/mono/SkiaSharp',
    image: 'https://img.shields.io/badge/Canvas-SkiaSharp-orange?style=flat',
  },
  {
    label: '.NET MAUI',
    href: 'https://dotnet.microsoft.com/apps/maui',
    image: 'https://img.shields.io/badge/Platform-.NET_MAUI-blueviolet?style=flat&logo=dotnet',
  },
  {
    label: 'WebAssembly',
    href: '/circuitflow/app/',
    image: 'https://img.shields.io/badge/Web-WebAssembly-654FF0?style=flat&logo=webassembly&logoColor=white',
  },
  {
    label: 'License: MIT',
    href: `${repositoryUrl}/blob/main/LICENSE`,
    image: 'https://img.shields.io/badge/license-MIT-blue?style=flat',
  },
];

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
        'Self-contained installation with zero runtime dependencies',
      ],
      packageType: 'MSIX Installer & Portable .zip',
      status: 'v1.0.3 Released',
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
        'Signed universal application bundle',
      ],
      packageType: 'Universal Disk Image (.dmg) & Signed App',
      status: 'v1.0.3 Released',
    },
    {
      id: 'ipad',
      name: 'iPad',
      icon: Tablet,
      badge: 'Apple TestFlight Beta',
      osVersion: 'iPadOS 17 & iPadOS 18+',
      architecture: 'Apple Silicon (M-series) & A-series Native',
      highlights: [
        'Multi-touch canvas manipulation with smooth pinch-to-zoom and pan',
        'Apple Pencil precision routing and component placement support',
        'Optimized SkiaSharp vector rendering on Liquid Retina displays',
        'Over-the-air continuous updates and beta feedback via TestFlight',
      ],
      packageType: 'Apple TestFlight Public Beta',
      status: 'Available on TestFlight',
      testFlightUrl: 'https://testflight.apple.com/join/U9AfcNk2',
    },
    {
      id: 'wasm',
      name: 'Web App',
      icon: Globe,
      badge: 'WebAssembly',
      osVersion: 'Any modern browser (Chrome, Edge, Firefox, Safari)',
      architecture: 'WASM • Platform-independent',
      highlights: [
        'Runs entirely in the browser with no installation required',
        'Same SkiaSharp rendering and simulation engine compiled to WebAssembly',
        'Works on Windows, macOS, Linux, ChromeOS, and tablets',
        'Always up to date, so every visit loads the latest build',
      ],
      packageType: 'Hosted WebAssembly Web App',
      status: 'Live',
      localUrl: '/circuitflow/app/',
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
    { input: '+ / - / 0', action: 'Zoom in / out / reset 100% view', category: 'navigation' },
    { input: 'Escape', action: 'Clear selection or cancel active operation', category: 'tools' },
  ];

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((s) => {
      const matchesSearch =
        s.input.toLowerCase().includes(shortcutFilter.toLowerCase()) ||
        s.action.toLowerCase().includes(shortcutFilter.toLowerCase());
      const matchesCategory = shortcutCategory === 'all' || s.category === shortcutCategory;
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
    },
  };

  return (
    <main className="relative pb-16 text-zinc-800 selection:bg-emerald-500 selection:text-white dark:text-zinc-100">
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-36 w-36 overflow-hidden">
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto absolute -right-10 top-7 block w-44 rotate-45 border-y border-white/20 bg-zinc-900 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition hover:scale-105 hover:bg-emerald-600"
        >
          View on GitHub
        </a>
      </div>

      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Software Catalog
        </a>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-5 py-12 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-700 shadow-sm backdrop-blur-sm dark:text-emerald-300">
            <CircuitBoard className="h-3.5 w-3.5 text-emerald-500" />
            <span>CircuitFlow.NET • Modern Cross-Platform PCB Editor</span>
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-200">
              v1.0.3 Release
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            Design, Route &amp; Verify PCBs with{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Modern Precision
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            A lightweight, cross-platform PCB layout CAD editor powered by{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">SkiaSharp</span>. Engineered with interactive
            vector routing, real-time Design Rule Checking (DRC), transparent JSON project files, and
            manufacturing-grade Gerber &amp; GRBL exports.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-1.5">
            {readmeBadges.map((badge) => (
              <a key={badge.label} href={badge.href} target="_blank" rel="noopener noreferrer" title={badge.label}>
                <img src={badge.image} alt={badge.label} className="h-5" loading="lazy" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#downloads"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              <Download className="h-4 w-4" />
              Download Releases
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-emerald-500 dark:hover:text-emerald-300"
            >
              <GitFork className="h-4 w-4" />
              Source on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href="/circuitflow/app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-300"
            >
              <Globe className="h-4 w-4 text-emerald-500" />
              Test in Browser (WASM)
            </a>
            <a
              href="https://testflight.apple.com/join/U9AfcNk2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-300"
            >
              <Tablet className="h-4 w-4 text-purple-400" />
              iPad TestFlight Beta
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>

          <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-xs text-amber-900 shadow-inner dark:text-amber-200 sm:text-sm">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <div>
              <span className="mb-0.5 block font-semibold text-amber-950 dark:text-amber-100">
                Active Development Preview
              </span>
              This project is under rapid active development. Export output (Gerber/GRBL) and design-rule checks should
              be reviewed before fabricating physical circuit boards.
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOT HERO VIEW */}
      {heroView === 'screenshot' && (
        <div className="mx-auto mt-10 max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950 shadow-2xl">
            {/* Window Top Bar */}
            <div className="flex select-none items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  CircuitFlow — Native macOS Desktop (Mac Catalyst / SkiaSharp)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Native App
                </span>
              </div>
            </div>

            {/* Screenshot Image */}
            <div className="relative flex items-center justify-center overflow-hidden bg-zinc-950">
              <img
                src="/circuitflow/images/mainwindow.png"
                alt="CircuitFlow.NET main window running on macOS"
                className="h-auto w-full select-none object-cover"
                loading="eager"
              />
            </div>

            {/* Feature Annotations Bar */}
            <div className="grid grid-cols-1 gap-3 border-t border-zinc-800/80 bg-zinc-950 p-4 text-xs sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400"></span>
                <div>
                  <span className="block font-mono text-[11px] font-semibold text-zinc-100">Library Palette</span>
                  <span className="text-[11px] text-zinc-400">
                    Passives, Actives, Switches &amp; IC footprint tiles.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-teal-400"></span>
                <div>
                  <span className="block font-mono text-[11px] font-semibold text-zinc-100">
                    Export &amp; DRC Tools
                  </span>
                  <span className="text-[11px] text-zinc-400">One-click Gerber RS-274X, SVG, and JSON saves.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></span>
                <div>
                  <span className="block font-mono text-[11px] font-semibold text-zinc-100">SkiaSharp Canvas</span>
                  <span className="text-[11px] text-zinc-400">Dotted grid, board boundary, and zoom controls.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400"></span>
                <div>
                  <span className="block font-mono text-[11px] font-semibold text-zinc-100">Properties Inspector</span>
                  <span className="text-[11px] text-zinc-400">Real-time parameters, rotation, and netlists.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CORE FEATURES DEEP DIVE */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Engineered for Modern PCB Layout
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            CircuitFlow combines hardware-accelerated SkiaSharp rendering with a high-efficiency CAD design workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* FEATURE 1 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <MousePointer className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Interactive Vector Canvas</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Ultra-responsive SkiaSharp canvas with intuitive component placement, interactive trace routing,
              multi-item marquee selection, drag-and-drop movement, resizing, and rock-solid undo/redo (
              <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">Ctrl+Z</code> /{' '}
              <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">Ctrl+Y</code>).
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-teal-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
              <Box className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Built-in Footprint Library</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Comprehensive footprint catalogue ready out-of-the-box: Resistors, Capacitors, LEDs, Diodes, Pin Headers,
              DIP IC packages (DIP-8, DIP-14, DIP-16), Transistors (TO-92), and dev boards like Arduino Nano.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-cyan-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Custom Footprint Designer</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Integrated Component Editor empowering engineers to craft custom SMD and through-hole footprints. Define
              arbitrary pin arrangements, drill sizes, silk labels, and pitch with persistent library storage.
            </p>
          </div>

          {/* FEATURE 4 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-amber-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Real-Time DRC Engine</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Comprehensive Design-Rule Checking catches mistakes before ordering: component collision, uninsulated
              trace crossings, pin proximity thresholds, missing pin net connections, and minimum copper width
              violations.
            </p>
          </div>

          {/* FEATURE 5 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-purple-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <FileCode className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Clean JSON Project Format</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Transparent, version-controllable JSON file format. No proprietary black-box binaries. Version-control
              your PCB schematics, share templates, and customize geometries directly with scriptable ease.
            </p>
          </div>

          {/* FEATURE 6 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Multi-Format Exports</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Built-in production exporters for industry standard{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">Gerber RS-274X</span>, CNC isolation milling{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">GRBL G-code</span>, and publication-ready
              vector <span className="font-semibold text-zinc-900 dark:text-white">SVG</span> artwork.
            </p>
          </div>
        </div>
      </section>

      {/* OPEN JSON PROJECT FORMAT SHOWCASE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <FileCode className="h-3.5 w-3.5" /> Open File Architecture
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Projects Saved in Transparent JSON
            </h2>
            <p className="mb-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              CircuitFlow stores all project data — board outline, placed components, and routed copper traces — in
              clean, human-readable JSON format (
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-emerald-600 dark:bg-zinc-800 dark:text-emerald-400">
                .json
              </code>
              ). The board outline is encoded as a standard SVG path string (
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-emerald-600 dark:bg-zinc-800 dark:text-emerald-400">
                BoardOutlinePath
              </code>
              ), supporting arbitrary shapes including chamfers and fillets. Each component entry carries its footprint
              ID, position, rotation, lock state, optional junction geometry, and a display color.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Zero Vendor Lock-In</h4>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    No opaque proprietary binary databases. Your designs remain fully readable, inspectable, and
                    editable in any standard text editor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Seamless Git Version Control</h4>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    Track hardware revisions with meaningful line-by-line git diffs. Review component additions, net
                    reassignments, and clearance changes directly in your commit history.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Scriptable &amp; Automatable</h4>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    Automate board generation, extract Bill of Materials (BOM), or run automated custom DRC validation
                    using standard JSON tooling in Python, Node, or C#.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-400">
                <span className="flex items-center gap-2 text-zinc-200">
                  <FileCode className="h-4 w-4 text-emerald-400" />
                  Arduino_Uno_Shield.json
                </span>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400">
                  Standard JSON
                </span>
              </div>
              <pre className="max-h-[380px] overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
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
      <section className="mx-auto my-8 max-w-6xl rounded-2xl border border-zinc-200 bg-zinc-100 p-6 py-12 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Eye className="h-3.5 w-3.5" /> Visual Showcase &amp; UI Previews
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">Application Screenshots</h2>
          </div>
          <span className="rounded-full border border-zinc-300 bg-zinc-200 px-3 py-1 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            High-res captures &amp; feature previews
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* SCREENSHOT 1 - MAIN WINDOW */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-900 dark:border-zinc-800">
              <img
                src="/circuitflow/images/mainwindow.png"
                alt="CircuitFlow.NET main window — PCB canvas, library drawer, and properties inspector"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute right-2 top-2 rounded border border-emerald-500/30 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                macOS Native App
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                Main Canvas, Library &amp; Inspector
              </h3>
              <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                Live macOS desktop execution showing the component drawer, floating SkiaSharp canvas, board boundaries,
                and real-time properties inspector.
              </p>
              <div className="flex items-center justify-between font-mono text-[11px] text-emerald-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Live Capture
                </span>
                <a
                  href="/circuitflow/images/mainwindow.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  Full Resolution <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* SCREENSHOT 2 - COMPONENT EDITOR */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-teal-500/50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-900 dark:border-zinc-800">
              <img
                src="/circuitflow/images/componenteditor.png"
                alt="CircuitFlow.NET custom component footprint editor"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute right-2 top-2 rounded border border-teal-500/30 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-teal-400">
                Component Studio
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                Custom Footprint &amp; Package Editor
              </h3>
              <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                Visual editor for DIP, QFP, SOIC, SMD pads, custom silkscreen dimensions, and pitch calibration with
                persistent JSON-backed storage.
              </p>
              <div className="flex items-center justify-between font-mono text-[11px] text-teal-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Live Capture
                </span>
                <a
                  href="/circuitflow/images/componenteditor.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  Full Resolution <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* GIF 3 - CAPACITOR PLACEMENT */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-amber-500/50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-900 dark:border-zinc-800">
              <img
                src="/circuitflow/images/capacitor.gif"
                alt="CircuitFlow.NET — placing a capacitor component on the PCB canvas"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-2 top-2 rounded border border-amber-500/30 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                ▶ Animated
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                Component Placement in Action
              </h3>
              <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                Placing a capacitor from the built-in library directly onto the SkiaSharp canvas with snap-to-grid
                precision.
              </p>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-500">
                <CheckCircle2 className="h-3.5 w-3.5" /> Live Recording
              </span>
            </div>
          </div>

          {/* GIF 4 - COMPONENT MOVE */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-cyan-500/50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-900 dark:border-zinc-800">
              <img
                src="/circuitflow/images/componentmove.gif"
                alt="CircuitFlow.NET — moving components on the PCB canvas"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-2 top-2 rounded border border-cyan-500/30 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                ▶ Animated
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                Drag-and-Drop Component Movement
              </h3>
              <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                Fluid drag-and-drop repositioning of placed components with live trace updates and undo/redo support.
              </p>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-500">
                <CheckCircle2 className="h-3.5 w-3.5" /> Live Recording
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section id="platforms" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Supported Operating Systems
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            CircuitFlow runs as a high-performance native application across Windows, macOS, and iPad also via
            WebAssembly in browser.
          </p>
        </div>

        {/* PLATFORM TABS */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex w-full border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/80">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`flex min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 border-b-2 px-2 py-3 text-xs font-medium transition sm:px-3 sm:text-sm ${
                    activePlatform === p.id
                      ? 'border-emerald-500 bg-white text-emerald-600 dark:bg-zinc-900 dark:text-emerald-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{p.name}</span>
                  <span className="hidden truncate rounded bg-zinc-200 px-1 py-px font-mono text-[9px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 lg:inline">
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
                  <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                      <span className="block font-mono text-[10px] uppercase text-zinc-500">Compatible OS</span>
                      <span className="mt-0.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {p.osVersion}
                      </span>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                      <span className="block font-mono text-[10px] uppercase text-zinc-500">Architecture</span>
                      <span className="mt-0.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {p.architecture}
                      </span>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                      <span className="block font-mono text-[10px] uppercase text-zinc-500">Distribution Package</span>
                      <span className="mt-0.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {p.packageType}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-bold text-zinc-900 dark:text-white">Platform Highlights</h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-200 pt-2 font-mono text-xs dark:border-zinc-800">
                    <span className="text-zinc-500">
                      Release Stage: <span className="font-semibold text-emerald-500">{p.status}</span>
                    </span>
                    {p.testFlightUrl ? (
                      <a
                        href={p.testFlightUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        Join TestFlight Beta <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : p.localUrl ? (
                      <a
                        href={p.localUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        Launch Web App <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <a
                        href="#downloads"
                        className="flex items-center gap-1 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        View Download Slots <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KEYBOARD & MOUSE SHORTCUTS TABLE */}
      <section id="shortcuts" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Keyboard className="h-3.5 w-3.5" /> Fast Ergonomics
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Keyboard &amp; Mouse Shortcuts
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={shortcutFilter}
                onChange={(e) => setShortcutFilter(e.target.value)}
                placeholder="Filter shortcuts..."
                className="rounded-lg border border-zinc-300 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              />
            </div>

            {/* CATEGORY TABS */}
            <div className="flex items-center rounded-lg border border-zinc-300 bg-zinc-100 p-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-900">
              {['all', 'tools', 'navigation', 'canvas', 'history', 'project'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShortcutCategory(cat)}
                  className={`rounded px-2 py-1 capitalize transition ${
                    shortcutCategory === cat
                      ? 'bg-emerald-600 font-medium text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 font-mono text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <th className="px-4 py-3">Input Gesture / Shortcut</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3 text-right">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredShortcuts.map((sc, i) => (
                  <tr key={i} className="dark:hover:bg-zinc-850/50 transition hover:bg-zinc-50">
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      <kbd className="shadow-xs rounded border border-zinc-300 bg-zinc-100 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800">
                        {sc.input}
                      </kbd>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 sm:text-sm">{sc.action}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[11px] capitalize text-zinc-400">
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
      <section className="mx-auto my-8 max-w-6xl rounded-2xl border border-zinc-200 bg-zinc-50 p-6 py-12 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Wrench className="h-3.5 w-3.5" /> Component Studio
            </div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Visual Component &amp; Footprint Editor
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Need a footprint that is not in the default library? Use the built-in{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">Component Editor</span> to visually place
              pads, set drill diameters, define pin spacing, and draw silkscreen outlines.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Saved footprints are permanently preserved in your personal library and can be used immediately across any
              project.
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Footprints are stored in clean JSON format, allowing you to easily share custom component definitions with
              colleagues or export them to other designs.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-400">
                <span className="flex items-center gap-2 text-zinc-200">
                  <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                  Component &amp; Footprint Editor
                </span>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400">
                  Live Screenshot
                </span>
              </div>
              <img
                src="/circuitflow/images/componenteditor.png"
                alt="CircuitFlow.NET Component &amp; Footprint Editor"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS & RELEASES */}
      <section id="downloads" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Download className="h-3.5 w-3.5" /> Distribution Packages
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Releases &amp; Downloads
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Pre-compiled standalone packages and installer bundles for every supported operating system.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* WINDOWS RELEASE CARD */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Monitor className="h-5 w-5" />
                </div>
                <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-blue-400">
                  42 MB
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">Windows</h3>
              <span className="mb-3 block font-mono text-xs text-zinc-500">x64 Native • WinUI 3 Desktop • v1.0.3</span>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Standalone portable release package for Windows 10 &amp; 11 workstations. Extract and run directly
                without complex prerequisites.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/circuitflow/artifacts/CircuitFlow-win-x64-v1.0.3.zip"
                download="CircuitFlow-win-x64-v1.0.3.zip"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition hover:bg-emerald-500"
              >
                <Download className="h-4 w-4" /> Download CircuitFlow-win-x64-v1.0.3.zip
              </a>

              {/* SHA256 BOX */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-2.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-1 flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">SHA-256 Checksum</span>
                  <button
                    onClick={() =>
                      copyToClipboard('5a65149a5ee080f9c4b7fda7b096986b6278e995a7a71cbd3558c0c631ea6b91', 'sha-win')
                    }
                    className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400"
                    title="Copy SHA-256"
                  >
                    {copiedKey === 'sha-win' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'sha-win' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="select-all break-all font-mono text-[10px] leading-tight text-zinc-700 dark:text-zinc-300">
                  5a65149a5ee080f9c4b7fda7b096986b6278e995a7a71cbd3558c0c631ea6b91
                </div>
              </div>
            </div>
          </div>

          {/* MACOS RELEASE CARD */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Apple className="h-5 w-5" />
                </div>
                <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                  23 MB
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">macOS</h3>
              <span className="mb-3 block font-mono text-xs text-zinc-500">
                Apple Silicon (arm64) • Mac Catalyst • v1.0.3
              </span>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Native release bundle optimized for Apple Silicon (M1/M2/M3/M4) running macOS Sonoma (14) &amp; Sequoia
                (15+).
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/circuitflow/artifacts/CircuitFlow-maccatalyst-arm64-v1.0.3.zip"
                download="CircuitFlow-maccatalyst-arm64-v1.0.3.zip"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition hover:bg-emerald-500"
              >
                <Download className="h-4 w-4" /> Download CircuitFlow-maccatalyst-arm64-v1.0.3.zip
              </a>

              {/* SHA256 BOX */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-2.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-1 flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">SHA-256 Checksum</span>
                  <button
                    onClick={() =>
                      copyToClipboard('71bbf46c1ac9448a68fa74522a58c124d0cc007ff341b7d5fc399f664eb668da', 'sha-mac')
                    }
                    className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400"
                    title="Copy SHA-256"
                  >
                    {copiedKey === 'sha-mac' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'sha-mac' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="select-all break-all font-mono text-[10px] leading-tight text-zinc-700 dark:text-zinc-300">
                  71bbf46c1ac9448a68fa74522a58c124d0cc007ff341b7d5fc399f664eb668da
                </div>
              </div>
            </div>
          </div>

          {/* IPAD RELEASE CARD */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <Tablet className="h-5 w-5" />
                </div>
                <span className="rounded border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-purple-400">
                  TestFlight Beta
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">iPad</h3>
              <span className="mb-3 block font-mono text-xs text-zinc-500">iPadOS 17+ • Apple TestFlight</span>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Native iPad build featuring multi-touch canvas navigation, pinch-to-zoom, and Apple Pencil precision.
                Install via TestFlight.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://testflight.apple.com/join/U9AfcNk2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition hover:bg-emerald-500"
              >
                <ExternalLink className="h-4 w-4" /> Join TestFlight Public Beta
              </a>

              {/* TESTFLIGHT LINK BOX */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-2.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-1 flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">TestFlight Link</span>
                  <button
                    onClick={() => copyToClipboard('https://testflight.apple.com/join/U9AfcNk2', 'link-ipad')}
                    className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400"
                    title="Copy TestFlight URL"
                  >
                    {copiedKey === 'link-ipad' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'link-ipad' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="select-all break-all font-mono text-[10px] leading-tight text-zinc-700 dark:text-zinc-300">
                  https://testflight.apple.com/join/U9AfcNk2
                </div>
              </div>
            </div>
          </div>

          {/* WASM WEB APP RELEASE CARD */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="rounded border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-sky-400">
                  WebAssembly
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">Web App</h3>
              <span className="mb-3 block font-mono text-xs text-zinc-500">Any modern browser • WASM</span>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Run CircuitFlow directly in your browser with no install required. Same simulation engine compiled to
                WebAssembly for near-native performance.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/circuitflow/app/"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition hover:bg-emerald-500"
              >
                <ExternalLink className="h-4 w-4" /> Launch Web App
              </a>

              {/* WEB APP LINK BOX */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-2.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-1 flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Web App Link</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        typeof window !== 'undefined'
                          ? `${window.location.origin}/circuitflow/app/`
                          : '/circuitflow/app/',
                        'link-wasm'
                      )
                    }
                    className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400"
                    title="Copy Web App URL"
                  >
                    {copiedKey === 'link-wasm' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'link-wasm' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div
                  suppressHydrationWarning
                  className="select-all break-all font-mono text-[10px] leading-tight text-zinc-700 dark:text-zinc-300"
                >
                  /circuitflow/app/
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section className="border-t border-zinc-200 py-12 text-center font-mono text-xs text-zinc-500 dark:border-zinc-800">
        <p className="mb-2">
          CircuitFlow.NET is a closed-source cross-platform PCB layout editor currently under active development.
        </p>
        <p>All rights reserved © 2026 Robby Roboter. Contact the author for licensing and beta access inquiries.</p>
      </section>
    </main>
  );
}
