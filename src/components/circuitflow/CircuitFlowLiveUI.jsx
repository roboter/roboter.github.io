import React, { useState, useRef } from 'react';
import {
  Undo,
  Redo,
  Home,
  RotateCw,
  Trash2,
  Settings,
  Grid,
  Info,
  Search,
  Lock,
  Unlock,
  Layers,
  RefreshCw,
  X
} from 'lucide-react';

// Initial default board elements replicating public/circuitflow/images/mainwindow.png
const INITIAL_COMPONENTS = [
  // DISP1 OLED / Graphic LCD
  {
    id: 'disp1',
    designator: 'DISP1',
    type: 'Graphic Display 128x64',
    package: 'OLED_I2C_0.96',
    x: 195,
    y: 285,
    rotation: 0,
    locked: false,
    net: 'I2C_BUS',
    pins: 4,
    layer: 'Top Copper'
  },
  // Top Headers
  {
    id: 'j3',
    designator: 'J3',
    type: 'Header 10-Pin 2.54mm',
    package: 'HDR_1x10_MALE',
    x: 430,
    y: 48,
    rotation: 0,
    locked: true,
    net: 'DIGITAL_HIGH',
    pins: 10,
    layer: 'Through-Hole'
  },
  {
    id: 'j4',
    designator: 'J4',
    type: 'Header 10-Pin 2.54mm',
    package: 'HDR_1x10_MALE',
    x: 690,
    y: 48,
    rotation: 0,
    locked: true,
    net: 'DIGITAL_IO',
    pins: 10,
    layer: 'Through-Hole'
  },
  // Bottom Header
  {
    id: 'j2',
    designator: 'J2',
    type: 'Header 8-Pin 2.54mm',
    package: 'HDR_1x8_MALE',
    x: 580,
    y: 575,
    rotation: 0,
    locked: true,
    net: 'ANALOG_BUS',
    pins: 8,
    layer: 'Through-Hole'
  },
  // Mounting Holes H1..H4
  {
    id: 'h1',
    designator: 'H1',
    type: 'Mounting Hole M3',
    package: 'HOLE_M3_LOCKED',
    x: 235,
    y: 550,
    rotation: 0,
    locked: true,
    net: 'GND_CHASSIS',
    pins: 1,
    layer: 'Multi-Layer'
  },
  {
    id: 'h2',
    designator: 'H2',
    type: 'Mounting Hole M3',
    package: 'HOLE_M3_LOCKED',
    x: 240,
    y: 45,
    rotation: 0,
    locked: true,
    net: 'GND_CHASSIS',
    pins: 1,
    layer: 'Multi-Layer'
  },
  {
    id: 'h3',
    designator: 'H3',
    type: 'Mounting Hole M3',
    package: 'HOLE_M3_LOCKED',
    x: 825,
    y: 205,
    rotation: 0,
    locked: true,
    net: 'GND_CHASSIS',
    pins: 1,
    layer: 'Multi-Layer'
  },
  {
    id: 'h4',
    designator: 'H4',
    type: 'Mounting Hole M3',
    package: 'HOLE_M3_LOCKED',
    x: 825,
    y: 495,
    rotation: 0,
    locked: true,
    net: 'GND_CHASSIS',
    pins: 1,
    layer: 'Multi-Layer'
  },
  // Resistors R1..R5
  {
    id: 'r1',
    designator: 'R1',
    type: 'SMD Resistor 10kΩ',
    package: 'R_0805_2012Metric',
    x: 755,
    y: 195,
    rotation: 0,
    locked: false,
    net: 'PULLUP_ROW1',
    pins: 2,
    layer: 'Top Copper'
  },
  {
    id: 'r2',
    designator: 'R2',
    type: 'SMD Resistor 4.7kΩ',
    package: 'R_0805_2012Metric',
    x: 620,
    y: 125,
    rotation: 90,
    locked: false,
    net: 'PULLUP_ROW2',
    pins: 2,
    layer: 'Top Copper'
  },
  {
    id: 'r3',
    designator: 'R3',
    type: 'SMD Resistor 10kΩ',
    package: 'R_0805_2012Metric',
    x: 480,
    y: 190,
    rotation: 0,
    locked: false,
    net: 'PULLUP_ROW3',
    pins: 2,
    layer: 'Top Copper'
  },
  {
    id: 'r4',
    designator: 'R4',
    type: 'SMD Resistor 1kΩ',
    package: 'R_0805_2012Metric',
    x: 445,
    y: 320,
    rotation: 0,
    locked: false,
    net: 'SENSE_COL1',
    pins: 2,
    layer: 'Top Copper'
  },
  {
    id: 'r5',
    designator: 'R5',
    type: 'SMD Resistor 1kΩ',
    package: 'R_0805_2012Metric',
    x: 445,
    y: 450,
    rotation: 0,
    locked: false,
    net: 'SENSE_COL2',
    pins: 2,
    layer: 'Top Copper'
  },
  // Switches SW1..SW7
  {
    id: 'sw1',
    designator: 'SW1',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 620,
    y: 140,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_0',
    pins: 4,
    layer: 'Top Copper'
  },
  {
    id: 'sw3',
    designator: 'SW3',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 495,
    y: 315,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_1',
    pins: 4,
    layer: 'Top Copper'
  },
  {
    id: 'sw4',
    designator: 'SW4',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 615,
    y: 315,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_2',
    pins: 4,
    layer: 'Top Copper'
  },
  {
    id: 'sw5',
    designator: 'SW5',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 615,
    y: 440,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_3',
    pins: 4,
    layer: 'Top Copper'
  },
  {
    id: 'sw6',
    designator: 'SW6',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 735,
    y: 315,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_4',
    pins: 4,
    layer: 'Top Copper'
  },
  {
    id: 'sw7',
    designator: 'SW7',
    type: 'Tactile Switch 6x6mm',
    package: 'SW_SPST_TACT_6MM',
    x: 735,
    y: 440,
    rotation: 0,
    locked: false,
    net: 'KEY_SCAN_5',
    pins: 4,
    layer: 'Top Copper'
  }
];

export default function CircuitFlowLiveUI() {
  const [components, setComponents] = useState(INITIAL_COMPONENTS);
  const [selectedId, setSelectedId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(125);
  const [showGrid, setShowGrid] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 309.8, y: 186.1 });
  const [drcStatus, setDrcStatus] = useState('PASS');
  const [drcRunning, setDrcRunning] = useState(false);
  const [drcMessage, setDrcMessage] = useState(null);
  const [showComponentEditor, setShowComponentEditor] = useState(false);
  const [history, setHistory] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  const selectedItem = components.find((c) => c.id === selectedId);

  // Track coordinates when hovering canvas
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Map to 1000x650 SVG viewBox space
    const svgX = (clientX / rect.width) * 1000;
    const svgY = (clientY / rect.height) * 650;

    setCursorPos({
      x: Number(svgX.toFixed(1)),
      y: Number(svgY.toFixed(1))
    });

    if (draggingId) {
      setComponents((prev) =>
        prev.map((item) => {
          if (item.id === draggingId && !item.locked) {
            return {
              ...item,
              x: Math.round(svgX - dragOffset.x),
              y: Math.round(svgY - dragOffset.y)
            };
          }
          return item;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const startDrag = (e, item) => {
    e.stopPropagation();
    setSelectedId(item.id);
    if (item.locked) return;

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 1000;
    const svgY = ((e.clientY - rect.top) / rect.height) * 650;

    setDraggingId(item.id);
    setDragOffset({
      x: svgX - item.x,
      y: svgY - item.y
    });
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(200, z + 15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(75, z - 15));
  const handleResetZoom = () => setZoomLevel(125);

  // Rotate selected component 90 degrees
  const handleRotateSelected = () => {
    if (!selectedId) return;
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id === selectedId && !c.locked) {
          return { ...c, rotation: (c.rotation + 90) % 360 };
        }
        return c;
      })
    );
  };

  // Delete selected component
  const handleDeleteSelected = () => {
    if (!selectedId) return;
    const toDelete = components.find((c) => c.id === selectedId);
    if (toDelete?.locked) return;
    setHistory((h) => [...h, components]);
    setComponents((prev) => prev.filter((c) => c.id !== selectedId));
    setSelectedId(null);
  };

  // Undo
  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setComponents(last);
    setHistory((h) => h.slice(0, -1));
  };

  // Toggle lock on selected
  const handleToggleLock = () => {
    if (!selectedId) return;
    setComponents((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, locked: !c.locked } : c))
    );
  };

  // Run Design Rule Check
  const handleRunDrc = () => {
    setDrcRunning(true);
    setDrcStatus('CHECKING...');
    setTimeout(() => {
      setDrcRunning(false);
      setDrcStatus('PASS');
      setDrcMessage(`DRC Check Complete: 0 Errors, 0 Warnings, 23 Components, 32 Nets`);
      setTimeout(() => setDrcMessage(null), 3500);
    }, 600);
  };

  // Clear DRC flags
  const handleClearDrc = () => {
    setDrcStatus('CLEAR');
    setDrcMessage('DRC status reset.');
    setTimeout(() => setDrcMessage(null), 2000);
  };

  // Add component from library
  const handleAddFromLibrary = (type, prefix = 'U') => {
    const id = `${prefix.toLowerCase()}_${Date.now().toString().slice(-4)}`;
    const newComp = {
      id,
      designator: `${prefix}${components.length + 1}`,
      type: type,
      package: `${prefix}_PKG`,
      x: 350 + Math.floor(Math.random() * 80),
      y: 200 + Math.floor(Math.random() * 80),
      rotation: 0,
      locked: false,
      net: 'UNCONNECTED',
      pins: prefix === 'SW' ? 4 : prefix === 'R' || prefix === 'C' ? 2 : 8,
      layer: 'Top Copper'
    };
    setHistory((h) => [...h, components]);
    setComponents((prev) => [...prev, newComp]);
    setSelectedId(id);
  };

  // Export RS-274X Gerber dummy download
  const handleExportGerber = () => {
    const gerberContent = `%FSLAX36Y36*%\n%MOMM*%\n%TF.GenerationSoftware,CircuitFlow,v0.1.0*%\nG04 Layer: F.Cu (Top Copper)*\n%LPD*%\n${components
      .map((c) => `G04 Component ${c.designator} ${c.type} at X=${c.x} Y=${c.y}*\nD10* X${c.x * 1000}Y${c.y * 1000}D03*`)
      .join('\n')}\nM02*`;
    const blob = new Blob([gerberContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CircuitFlow_TopCopper.gbr';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export SVG download
  const handleExportSvg = () => {
    if (!canvasRef.current) return;
    const svgData = canvasRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CircuitFlow_Board.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save project JSON
  const handleSaveProject = () => {
    const projectData = {
      project: 'CircuitFlow_Board',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      components,
      status: drcStatus
    };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CircuitFlow_Project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load Example Project
  const handleLoadExample = () => {
    setComponents(INITIAL_COMPONENTS);
    setSelectedId(null);
    setZoomLevel(125);
    setDrcStatus('PASS');
    setDrcMessage('Loaded example project (Blink Shield / Switch Matrix)');
    setTimeout(() => setDrcMessage(null), 2500);
  };

  return (
    <div className="w-full select-none rounded-2xl border border-zinc-800 bg-[#0b0b0e] text-zinc-200 shadow-2xl overflow-hidden font-sans">
      {/* 1. macOS WINDOW TOP BAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131318] border-b border-[#222228] select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer hover:opacity-80 transition" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] cursor-pointer hover:opacity-80 transition" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] cursor-pointer hover:opacity-80 transition" />
          <span className="ml-3 text-[11px] font-mono text-zinc-400 font-medium tracking-wide">
            CircuitFlow — Native macOS Desktop (SkiaSharp Canvas)
          </span>
        </div>

        {/* Live UI Indicator Tag */}
        <div className="flex items-center gap-3">
          {drcMessage && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded animate-fade-in">
              {drcMessage}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live SkiaSharp Interactive Clone
          </span>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px] bg-[#050505]">
        {/* LEFT SIDEBAR: LIBRARY */}
        <div className="md:col-span-3 lg:col-span-2 bg-[#0b0b0e] border-r border-[#26262b] p-3 flex flex-col justify-between overflow-y-auto max-h-[640px]">
          <div>
            {/* Header */}
            <div className="text-[#10b981] font-mono font-bold text-xs tracking-widest uppercase mb-3">
              LIBRARY
            </div>

            {/* Section: ICS & MODULES */}
            <div className="mb-4">
              <div className="text-[#10b981] font-mono font-bold text-[10px] tracking-wider uppercase mb-2">
                ICS &amp; MODULES
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { letter: 'U', label: 'Arduino Na...', type: 'Arduino Nano V3' },
                  { letter: 'U', label: 'DIP-8', type: 'DIP-8 IC Package' },
                  { letter: 'A', label: 'art', type: 'Custom Art Module' },
                  { letter: 'A', label: 'ass', type: 'Assembly Sub-circuit' },
                  { letter: 'S', label: 'smd', type: 'SMD Dual IC' },
                  { letter: 'U', label: 'unn', type: 'Generic IC (UNN)' },
                  { letter: 'U', label: 'uno', type: 'Arduino Uno R3' },
                  { letter: 'U', label: 'uno1', type: 'Arduino Uno Header' },
                  { letter: 'U', label: 'unoo', type: 'Extended Uno Shield' },
                  { letter: 'W', label: 'white', type: 'White LED Indicator' }
                ].map((mod, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddFromLibrary(mod.type, mod.letter)}
                    title={`Add ${mod.type} to board`}
                    className="p-1.5 rounded-lg border border-[#163826] bg-[#0d1712] hover:border-emerald-500/80 hover:bg-emerald-950/50 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <span className="text-emerald-400 font-mono font-bold text-sm leading-none group-hover:scale-110 transition-transform">
                      {mod.letter}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 truncate w-full mt-1">
                      {mod.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section: SWITCHES */}
            <div className="mb-4">
              <div className="text-[#10b981] font-mono font-bold text-[10px] tracking-wider uppercase mb-2">
                SWITCHES
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleAddFromLibrary('Tactile Switch 6x6mm', 'SW')}
                  title="Add Tactile Button to board"
                  className="p-1.5 rounded-lg border border-[#163826] bg-[#0d1712] hover:border-emerald-500/80 hover:bg-emerald-950/50 transition flex flex-col items-center justify-center text-center group cursor-pointer col-span-1"
                >
                  <span className="text-emerald-400 font-mono font-bold text-sm leading-none group-hover:scale-110 transition-transform">
                    SW
                  </span>
                  <span className="text-[8px] font-mono text-zinc-400 truncate w-full mt-1">
                    Tactile Butt...
                  </span>
                </button>
              </div>
            </div>

            {/* Section: PASSIVES */}
            <div className="mb-4">
              <div className="text-[#10b981] font-mono font-bold text-[10px] tracking-wider uppercase mb-2">
                PASSIVES
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { letter: 'C', label: 'Capacitor', type: 'Ceramic Cap 100nF' },
                  { letter: 'C+', label: 'Polarized', type: 'Electrolytic Cap 10uF' },
                  { letter: 'L', label: 'Inductor', type: 'Ferrite Inductor' }
                ].map((pas, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddFromLibrary(pas.type, pas.letter.replace('+', ''))}
                    title={`Add ${pas.label} to board`}
                    className="p-1.5 rounded-lg border border-[#163826] bg-[#0d1712] hover:border-emerald-500/80 hover:bg-emerald-950/50 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <span className="text-emerald-400 font-mono font-bold text-sm leading-none group-hover:scale-110 transition-transform">
                      {pas.letter}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 truncate w-full mt-1">
                      {pas.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section: TOOLS */}
            <div className="mb-4">
              <div className="text-[#10b981] font-mono font-bold text-[10px] tracking-wider uppercase mb-2">
                TOOLS
              </div>
              <button
                onClick={() => setShowComponentEditor(true)}
                className="w-full py-2 px-2 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wider uppercase text-center transition cursor-pointer shadow-sm hover:shadow-emerald-950/50"
              >
                COMPONENT EDITOR
              </button>
            </div>

            {/* Section: DRC STATUS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#10b981] font-mono font-bold text-[10px] tracking-wider uppercase">
                  DRC STATUS
                </span>
                <button
                  onClick={handleRunDrc}
                  title="Run Design Rule Check"
                  className="text-emerald-400 hover:text-emerald-200 transition"
                >
                  <RefreshCw className={`w-3 h-3 ${drcRunning ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleClearDrc}
                className="w-full py-1.5 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-xs tracking-wider uppercase transition cursor-pointer text-center"
              >
                CLEAR
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleExportGerber}
                  title="Export RS-274X Gerber file"
                  className="py-1.5 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wider uppercase transition cursor-pointer text-center"
                >
                  GERBER
                </button>
                <button
                  onClick={handleExportSvg}
                  title="Export Scalable Vector Graphics"
                  className="py-1.5 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wider uppercase transition cursor-pointer text-center"
                >
                  SVG
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleSaveProject}
                  title="Save current layout as JSON"
                  className="py-1.5 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wider uppercase transition cursor-pointer text-center"
                >
                  SAVE
                </button>
                <button
                  onClick={handleLoadExample}
                  title="Reload default project"
                  className="py-1.5 rounded-lg border border-[#10b981] bg-[#091811] hover:bg-emerald-900/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wider uppercase transition cursor-pointer text-center"
                >
                  LOAD
                </button>
              </div>

              <button
                onClick={handleLoadExample}
                className="w-full py-2 rounded-lg border border-[#143e2e] bg-[#08150f] hover:bg-emerald-950 text-emerald-400 font-mono font-bold text-[10px] tracking-wider uppercase transition cursor-pointer text-center"
              >
                LOAD EXAMPLE PROJECT
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: INTERACTIVE SKIASHARP PCB CANVAS */}
        <div
          className="md:col-span-6 lg:col-span-7 relative bg-[#050505] flex flex-col items-center justify-center overflow-hidden min-h-[520px]"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => setSelectedId(null)}
        >
          {/* FLOATING TOP TOOLBAR (matching public/circuitflow/images/mainwindow.png) */}
          <div className="absolute top-4 z-20 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#0f1014] border border-[#23252b] shadow-2xl backdrop-blur-md">
            {/* Undo */}
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              title="Undo last change"
              className="text-zinc-400 hover:text-white disabled:opacity-30 transition p-1"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>

            {/* Redo */}
            <button
              title="Redo"
              className="text-zinc-500 hover:text-white transition p-1"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>

            {/* Home / Fit */}
            <button
              onClick={handleResetZoom}
              title="Fit to screen"
              className="text-zinc-400 hover:text-white transition p-1"
            >
              <Home className="w-3.5 h-3.5" />
            </button>

            {/* Rotate */}
            <button
              onClick={handleRotateSelected}
              disabled={!selectedId}
              title="Rotate selected component (90°)"
              className="text-zinc-400 hover:text-emerald-400 disabled:opacity-30 transition p-1"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Delete */}
            <button
              onClick={handleDeleteSelected}
              disabled={!selectedId || selectedItem?.locked}
              title="Delete selected component"
              className="text-zinc-400 hover:text-red-400 disabled:opacity-30 transition p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-[#1e3a2b]" />

            {/* Zoom Controls Container */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border border-[#16432b] bg-[#0b1c13]">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="text-emerald-400 hover:text-white text-xs font-mono font-bold leading-none"
              >
                +
              </button>
              <span className="text-emerald-400 font-mono font-bold text-xs min-w-[38px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="text-emerald-400 hover:text-white text-xs font-mono font-bold leading-none"
              >
                -
              </button>
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-[#1e3a2b]" />

            {/* Settings */}
            <button
              title="Preferences"
              className="text-zinc-400 hover:text-white transition p-1"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Dot Grid"
              className={`p-1 transition ${showGrid ? 'text-emerald-400' : 'text-zinc-500'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            {/* DRC Pill Badge */}
            <button
              onClick={handleRunDrc}
              title="Run Design Rule Check"
              className="px-2 py-0.5 rounded-md border border-emerald-600/80 bg-[#0c2619] hover:bg-emerald-900/60 text-emerald-300 font-mono font-bold text-[9px] leading-tight text-center transition cursor-pointer"
            >
              <div>DR</div>
              <div>C</div>
            </button>

            {/* Layers / Board view */}
            <button
              title="Toggle Layers"
              className="text-zinc-400 hover:text-white transition p-1"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Info */}
            <button
              onClick={() =>
                setDrcMessage(
                  'CircuitFlow SkiaSharp Canvas: Click to select, drag to reposition, use Library to add parts.'
                )
              }
              title="Keyboard & Canvas Info"
              className="text-zinc-400 hover:text-white transition p-1"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG PCB CANVAS (Scaleable with zoomLevel) */}
          <div
            className="w-full h-full flex items-center justify-center p-4 transition-transform duration-150 ease-out"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <svg
              ref={canvasRef}
              viewBox="0 0 1000 650"
              className="w-full max-w-[960px] h-auto aspect-[1000/650] overflow-visible select-none"
            >
              <defs>
                {/* Dotted Grid Pattern */}
                <pattern
                  id="canvas-dot-grid"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="0.8" fill="#10b981" opacity="0.35" />
                </pattern>

                {/* Copper Track Glow Filter */}
                <filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Dot Grid */}
              {showGrid && (
                <rect width="1000" height="650" fill="url(#canvas-dot-grid)" />
              )}

              {/* PCB BOARD BOUNDARY (Dashed green outline with chamfered top-right corner) */}
              <path
                d="M 50,40 L 900,40 L 940,80 L 940,610 L 50,610 Z"
                fill="#030805"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="8,6"
                strokeLinejoin="round"
                className="transition-colors"
              />

              {/* TOP HEADERS BACKGROUND HOUSING */}
              {/* Left Header Housing (J3 - DIGITAL HIGH) */}
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId('j3');
                }}
                className="cursor-pointer group"
              >
                <rect
                  x="290"
                  y="36"
                  width="275"
                  height="26"
                  rx="13"
                  fill="#061a12"
                  stroke={selectedId === 'j3' ? '#34d399' : '#10b981'}
                  strokeWidth={selectedId === 'j3' ? 2.5 : 1.5}
                />
                <text
                  x="280"
                  y="52"
                  transform="rotate(-90 280 52)"
                  fill="#10b981"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  DIGITAL HIGH
                </text>
                <text
                  x="572"
                  y="52"
                  fill="#10b981"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  J3
                </text>
                {/* 10 Pin Pads */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <g key={i} transform={`translate(${305 + i * 26}, 49)`}>
                    <circle r="7" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                    <circle r="4.5" fill="#eab308" />
                    <circle r="2" fill="#000000" />
                  </g>
                ))}
              </g>

              {/* Right Header Housing (J4) */}
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId('j4');
                }}
                className="cursor-pointer group"
              >
                <rect
                  x="590"
                  y="36"
                  width="275"
                  height="26"
                  rx="13"
                  fill="#061a12"
                  stroke={selectedId === 'j4' ? '#34d399' : '#10b981'}
                  strokeWidth={selectedId === 'j4' ? 2.5 : 1.5}
                />
                {/* 10 Pin Pads */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <g key={i} transform={`translate(${605 + i * 26}, 49)`}>
                    <circle r="7" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                    <circle r="4.5" fill="#eab308" />
                    <circle r="2" fill="#000000" />
                  </g>
                ))}
              </g>

              {/* BOTTOM HEADER (J2 - ANALOG) */}
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId('j2');
                }}
                className="cursor-pointer group"
              >
                <rect
                  x="480"
                  y="565"
                  width="235"
                  height="26"
                  rx="13"
                  fill="#061a12"
                  stroke={selectedId === 'j2' ? '#34d399' : '#10b981'}
                  strokeWidth={selectedId === 'j2' ? 2.5 : 1.5}
                />
                <text
                  x="470"
                  y="582"
                  transform="rotate(-90 470 582)"
                  fill="#10b981"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  ANALOG
                </text>
                <text
                  x="722"
                  y="582"
                  fill="#10b981"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  J2
                </text>
                {/* 8 Pin Pads */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={i} transform={`translate(${496 + i * 28}, 578)`}>
                    <circle r="7" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                    <circle r="4.5" fill="#eab308" />
                    <circle r="2" fill="#000000" />
                  </g>
                ))}
              </g>

              {/* THICK BLUE COPPER TRACES (Smooth routing matching screenshot) */}
              <g stroke="#2860a4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Trace 1: DISP1 Pin 1 -> J3 Pin 1 */}
                <path d="M 180,165 C 180,105 305,95 305,49" />
                {/* Trace 2: DISP1 Pin 2 -> J3 Pin 2 */}
                <path d="M 210,165 C 210,110 331,100 331,49" />
                {/* Trace 3: DISP1 Pin 3 -> J3 Pin 3 */}
                <path d="M 240,165 C 240,115 357,105 357,49" />
                {/* Trace 4: DISP1 Pin 4 -> J3 Pin 4 */}
                <path d="M 270,165 C 270,120 383,110 383,49" />

                {/* Net Trace: R3 -> SW1 */}
                <path d="M 480,175 C 530,175 560,135 600,135" />
                {/* Net Trace: SW1 -> R1 -> SW6 */}
                <path d="M 640,135 C 700,135 730,165 745,185 C 760,205 760,270 745,295" />
                {/* Net Trace: R3 to SW3 */}
                <path d="M 480,205 C 480,250 480,280 480,300" />
                {/* Net Trace: SW3 to SW4 to SW5 */}
                <path d="M 515,315 C 550,315 570,315 600,315" />
                <path d="M 615,335 C 615,380 615,400 615,425" />
                {/* Net Trace: SW4 to SW5 to Bottom Header J2 */}
                <path d="M 630,455 C 630,510 650,540 664,578" />
                {/* Net Trace: SW6 to SW7 */}
                <path d="M 735,335 C 735,380 735,400 735,425" />
                {/* Net Trace: SW7 to Bottom Header */}
                <path d="M 750,455 C 750,510 720,545 692,578" />
                {/* Net Trace: R4 to R5 */}
                <path d="M 445,340 C 445,380 445,400 445,430" />
                {/* Net Trace: R5 to J2 */}
                <path d="M 445,470 C 445,530 520,550 552,578" />
              </g>

              {/* COPPER TRACE VIAS / JUNCTIONS (cyan centers with annular rings) */}
              {[
                { x: 180, y: 165 },
                { x: 210, y: 165 },
                { x: 240, y: 165 },
                { x: 270, y: 165 },
                { x: 305, y: 49 },
                { x: 331, y: 49 },
                { x: 357, y: 49 },
                { x: 383, y: 49 },
                { x: 480, y: 175 },
                { x: 600, y: 135 },
                { x: 745, y: 185 },
                { x: 745, y: 295 },
                { x: 480, y: 300 },
                { x: 600, y: 315 },
                { x: 615, y: 425 },
                { x: 664, y: 578 },
                { x: 735, y: 425 },
                { x: 692, y: 578 },
                { x: 445, y: 340 },
                { x: 445, y: 470 },
                { x: 552, y: 578 }
              ].map((via, idx) => (
                <circle
                  key={idx}
                  cx={via.x}
                  cy={via.y}
                  r="4.5"
                  fill="#60a5fa"
                  stroke="#1e3a8a"
                  strokeWidth="1.5"
                />
              ))}

              {/* 1. DISP1 (Graphic Display Module on the Left) */}
              <g
                onClick={(e) => startDrag(e, components.find((c) => c.id === 'disp1'))}
                className="cursor-pointer group"
                transform={`translate(${components.find((c) => c.id === 'disp1')?.x - 195 || 0}, ${components.find((c) => c.id === 'disp1')?.y - 285 || 0})`}
              >
                {/* Outer Board / Bezel */}
                <rect
                  x="55"
                  y="150"
                  width="280"
                  height="270"
                  rx="4"
                  fill="#05120a"
                  stroke={selectedId === 'disp1' ? '#34d399' : '#10b981'}
                  strokeWidth={selectedId === 'disp1' ? 3 : 2}
                  className="transition-colors"
                />

                {/* 4 Corner Mounting Holes */}
                <circle cx="75" cy="170" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="315" cy="170" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="75" cy="400" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="315" cy="400" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />

                {/* Display Screen Area */}
                <rect
                  x="80"
                  y="210"
                  width="230"
                  height="160"
                  rx="2"
                  fill="#030905"
                  stroke="#10b981"
                  strokeWidth="1.5"
                />

                {/* Simulated OLED Graphics: Waveform & Status */}
                <text x="95" y="235" fill="#10b981" fontSize="10" fontFamily="monospace" opacity="0.9">
                  CIRCUITFLOW v0.1.0
                </text>
                <path
                  d="M 95,290 Q 130,250 160,290 T 225,290 T 290,290"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <text x="95" y="345" fill="#34d399" fontSize="9" fontFamily="monospace">
                  CH1: 3.3V  •  128x64 OLED
                </text>

                {/* Pin Header at Top */}
                <text x="185" y="142" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  DISP1
                </text>
                {[180, 210, 240, 270].map((px, i) => (
                  <g key={i} transform={`translate(${px}, 165)`}>
                    <circle r="6" fill="#08281b" stroke="#10b981" strokeWidth="1" />
                    <circle r="3.5" fill="#eab308" />
                    <circle r="1.5" fill="#000000" />
                  </g>
                ))}
              </g>

              {/* 2. MOUNTING HOLES H1..H4 WITH LOCK BADGES */}
              {['h1', 'h2', 'h3', 'h4'].map((hId) => {
                const hole = components.find((c) => c.id === hId);
                if (!hole) return null;
                const isSel = selectedId === hId;
                return (
                  <g
                    key={hId}
                    transform={`translate(${hole.x}, ${hole.y})`}
                    onClick={(e) => startDrag(e, hole)}
                    className="cursor-pointer"
                  >
                    {/* Silkscreen square with rounded corners */}
                    <rect
                      x="-14"
                      y="-14"
                      width="28"
                      height="28"
                      rx="6"
                      fill="#061c12"
                      stroke={isSel ? '#34d399' : '#10b981'}
                      strokeWidth={isSel ? 2.5 : 1.5}
                    />
                    <circle r="9" fill="#020a06" stroke="#10b981" strokeWidth="1" />
                    <circle r="5" fill="#000000" />
                    {/* Lock Icon */}
                    <g transform="translate(-5, -6) scale(0.7)">
                      <rect x="2" y="5" width="10" height="8" rx="2" fill="#f59e0b" />
                      <path
                        d="M 4,5 L 4,3 C 4,1.5 10,1.5 10,3 L 10,5"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      />
                    </g>
                    {/* Label */}
                    <text
                      x="0"
                      y="-17"
                      fill="#10b981"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {hole.designator}
                    </text>
                  </g>
                );
              })}

              {/* 3. RESISTORS R1..R5 */}
              {['r1', 'r2', 'r3', 'r4', 'r5'].map((rId) => {
                const res = components.find((c) => c.id === rId);
                if (!res) return null;
                const isSel = selectedId === rId;
                const isHorizontal = res.rotation === 90;
                return (
                  <g
                    key={rId}
                    transform={`translate(${res.x}, ${res.y})`}
                    onClick={(e) => startDrag(e, res)}
                    className="cursor-pointer group"
                  >
                    {isHorizontal ? (
                      // Horizontal Resistor Footprint
                      <>
                        <rect
                          x="-24"
                          y="-10"
                          width="48"
                          height="20"
                          rx="3"
                          fill="#05140c"
                          stroke={isSel ? '#34d399' : '#10b981'}
                          strokeWidth={isSel ? 2 : 1}
                        />
                        <rect x="-22" y="-8" width="10" height="16" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                        <rect x="12" y="-8" width="10" height="16" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                        <text
                          x="0"
                          y="4"
                          fill="#10b981"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {res.designator}
                        </text>
                      </>
                    ) : (
                      // Vertical Resistor Footprint
                      <>
                        <rect
                          x="-10"
                          y="-24"
                          width="20"
                          height="48"
                          rx="3"
                          fill="#05140c"
                          stroke={isSel ? '#34d399' : '#10b981'}
                          strokeWidth={isSel ? 2 : 1}
                        />
                        <rect x="-8" y="-22" width="16" height="10" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                        <rect x="-8" y="12" width="16" height="10" fill="#0c2b1e" stroke="#10b981" strokeWidth="1" />
                        <text
                          x="-14"
                          y="4"
                          fill="#10b981"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {res.designator}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* 4. TACTILE SWITCHES SW1, SW3..SW7 */}
              {['sw1', 'sw3', 'sw4', 'sw5', 'sw6', 'sw7'].map((swId) => {
                const sw = components.find((c) => c.id === swId);
                if (!sw) return null;
                const isSel = selectedId === swId;
                return (
                  <g
                    key={swId}
                    transform={`translate(${sw.x}, ${sw.y})`}
                    onClick={(e) => startDrag(e, sw)}
                    className="cursor-pointer group"
                  >
                    {/* Switch Silkscreen Outline */}
                    <rect
                      x="-25"
                      y="-25"
                      width="50"
                      height="50"
                      rx="4"
                      fill="#061910"
                      stroke={isSel ? '#34d399' : '#10b981'}
                      strokeWidth={isSel ? 2.5 : 1.2}
                    />

                    {/* Central Button Plunger Circle */}
                    <circle cx="0" cy="0" r="11" fill="#030c07" stroke="#10b981" strokeWidth="1" />

                    {/* 4 Corner Pads */}
                    <circle cx="-19" cy="-19" r="4.5" fill="#0d2e20" stroke="#10b981" strokeWidth="1" />
                    <circle cx="19" cy="-19" r="4.5" fill="#0d2e20" stroke="#10b981" strokeWidth="1" />
                    <circle cx="-19" cy="19" r="4.5" fill="#0d2e20" stroke="#10b981" strokeWidth="1" />
                    <circle cx="19" cy="19" r="4.5" fill="#0d2e20" stroke="#10b981" strokeWidth="1" />

                    {/* Label */}
                    <text
                      x="0"
                      y="-30"
                      fill="#10b981"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {sw.designator}
                    </text>
                  </g>
                );
              })}

              {/* Dynamically Added Components */}
              {components
                .filter(
                  (c) =>
                    !['disp1', 'j2', 'j3', 'j4', 'h1', 'h2', 'h3', 'h4', 'r1', 'r2', 'r3', 'r4', 'r5', 'sw1', 'sw3', 'sw4', 'sw5', 'sw6', 'sw7'].includes(
                      c.id
                    )
                )
                .map((comp) => {
                  const isSel = selectedId === comp.id;
                  return (
                    <g
                      key={comp.id}
                      transform={`translate(${comp.x}, ${comp.y}) rotate(${comp.rotation})`}
                      onClick={(e) => startDrag(e, comp)}
                      className="cursor-pointer"
                    >
                      <rect
                        x="-20"
                        y="-20"
                        width="40"
                        height="40"
                        rx="4"
                        fill="#0b2417"
                        stroke={isSel ? '#34d399' : '#10b981'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                      />
                      <text
                        x="0"
                        y="4"
                        fill="#34d399"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {comp.designator}
                      </text>
                      <circle cx="-15" cy="-15" r="3" fill="#eab308" />
                      <circle cx="15" cy="-15" r="3" fill="#eab308" />
                      <circle cx="-15" cy="15" r="3" fill="#eab308" />
                      <circle cx="15" cy="15" r="3" fill="#eab308" />
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>

        {/* RIGHT SIDEBAR: PROPERTIES INSPECTOR */}
        <div className="md:col-span-3 lg:col-span-3 bg-[#0b0b0e] border-l border-[#26262b] p-4 flex flex-col justify-between overflow-y-auto max-h-[640px]">
          <div>
            {/* Header */}
            <div className="text-[#10b981] font-mono font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>PROPERTIES INSPECTOR</span>
            </div>

            {selectedItem ? (
              /* Selected State: Full Live Parameter Panel */
              <div className="space-y-4">
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {selectedItem.designator}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-600/40">
                      {selectedItem.layer}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-300 font-medium mt-1">
                    {selectedItem.type}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    Package: {selectedItem.package}
                  </div>
                </div>

                {/* Coordinates & Geometry */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                    Position &amp; Orientation
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block">X POS</span>
                      <span className="text-zinc-200 font-bold">{selectedItem.x} mm</span>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block">Y POS</span>
                      <span className="text-zinc-200 font-bold">{selectedItem.y} mm</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                    <span className="text-zinc-400">Rotation</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{selectedItem.rotation}°</span>
                      <button
                        onClick={handleRotateSelected}
                        disabled={selectedItem.locked}
                        className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40 transition"
                      >
                        +90°
                      </button>
                    </div>
                  </div>
                </div>

                {/* Electrical Net */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                    Netlist &amp; Connectivity
                  </span>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono flex items-center justify-between">
                    <span className="text-zinc-400">Assigned Net:</span>
                    <span className="text-emerald-400 font-bold">{selectedItem.net}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono flex items-center justify-between">
                    <span className="text-zinc-400">Pins / Pads:</span>
                    <span className="text-zinc-200 font-bold">{selectedItem.pins} Pins</span>
                  </div>
                </div>

                {/* Actions & Lock Toggle */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={handleToggleLock}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition ${
                      selectedItem.locked
                        ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {selectedItem.locked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Locked on Canvas</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Unlocked (Drag to Move)</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleDeleteSelected}
                      disabled={selectedItem.locked}
                      className="py-1.5 px-2 rounded-lg text-xs font-mono font-medium bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 disabled:opacity-30 transition flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="py-1.5 px-2 rounded-lg text-xs font-mono font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition text-center"
                    >
                      Deselect
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State (matching screenshot: centered magnifying glass & SELECT AN ITEM TO INSPECT) */
              <div className="my-auto flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full border border-emerald-900/40 bg-emerald-950/10 flex items-center justify-center mb-4 text-zinc-500">
                  <Search className="w-8 h-8 text-zinc-600 opacity-60" />
                </div>
                <div className="text-[#10b981] font-mono font-bold text-xs tracking-wider uppercase">
                  SELECT AN ITEM TO INSPECT
                </div>
                <p className="text-[11px] text-zinc-500 max-w-[180px] mt-2 leading-relaxed">
                  Click any switch, resistor, header, display, or trace on the PCB board.
                </p>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-zinc-600 border-t border-zinc-800/60 pt-3">
            SkiaSharp Hardware Canvas v1.0
          </div>
        </div>
      </div>

      {/* 3. BOTTOM STATUS BAR (matching screenshot) */}
      <div className="px-4 py-2 bg-[#000000] border-t border-[#262626] flex items-center justify-between text-xs font-mono">
        {/* Left: Apple / Ready status with dynamic coordinates */}
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">🍎</span>
          <span className="text-zinc-300">
            READY - {cursorPos.x.toFixed(1)},{cursorPos.y.toFixed(1)}
          </span>
        </div>

        {/* Right: Component count, trace count, and DRC status pill */}
        <div className="flex items-center gap-4">
          <span className="text-emerald-400">
            Components: {components.length}
          </span>
          <span className="text-emerald-400">
            Traces: 32
          </span>
          <button
            onClick={handleRunDrc}
            className="px-2.5 py-0.5 rounded-full bg-[#10b981] text-[#000000] font-bold text-xs hover:bg-emerald-400 transition cursor-pointer"
          >
            {drcStatus}
          </button>
        </div>
      </div>

      {/* COMPONENT EDITOR MODAL (Replicating public/circuitflow/images/componenteditor.png) */}
      {showComponentEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-[#09150e] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d2116] border-b border-emerald-800/60">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                  Component Footprint Studio
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300">
                  SVG &amp; Pad Editor
                </span>
              </div>
              <button
                onClick={() => setShowComponentEditor(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
              <div className="md:col-span-2 p-6 flex items-center justify-center bg-[#050e09] border-r border-emerald-900/40 relative">
                {/* SVG Outline Display matching componenteditor.png */}
                <svg viewBox="-200 -200 400 400" className="w-full max-w-[340px] aspect-square">
                  {/* Outer Footprint Silk */}
                  <rect
                    x="-150"
                    y="-150"
                    width="300"
                    height="300"
                    rx="8"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  {/* Inner arrow indicator */}
                  <polygon
                    points="0,-80 80,40 -80,40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                  <rect x="-15" y="-120" width="30" height="40" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  {/* Through-hole and SMD pads */}
                  <circle cx="-110" cy="-70" r="14" fill="#082b1d" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="-110" cy="-70" r="6" fill="#f59e0b" />
                  <circle cx="-110" cy="0" r="8" fill="#10b981" />
                  <circle cx="-110" cy="50" r="8" fill="#10b981" />
                  <circle cx="-100" cy="-110" r="6" fill="#f59e0b" />
                  <text x="-90" y="-115" fill="#10b981" fontSize="9" fontFamily="monospace">
                    SMD Pad (Pin 1)
                  </text>
                  <text x="0" y="80" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    SVG Outline (0.0, 0.0)
                  </text>
                </svg>
              </div>

              <div className="p-4 bg-[#09150e] space-y-4 overflow-y-auto text-xs font-mono">
                <div>
                  <span className="text-zinc-400 block text-[10px] mb-1">Part Name</span>
                  <input
                    type="text"
                    defaultValue="Tactile_Button_6x6mm"
                    className="w-full px-2.5 py-1.5 rounded bg-zinc-900 border border-emerald-900 text-zinc-200 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-zinc-400 block text-[10px] mb-1">Width (mm)</span>
                    <input
                      type="text"
                      defaultValue="685.80"
                      className="w-full px-2 py-1 rounded bg-zinc-900 border border-emerald-900 text-zinc-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] mb-1">Height (mm)</span>
                    <input
                      type="text"
                      defaultValue="533.40"
                      className="w-full px-2 py-1 rounded bg-zinc-900 border border-emerald-900 text-zinc-200 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-900/60 space-y-1.5">
                  <span className="text-emerald-400 block text-[10px] uppercase font-bold">
                    Pad Configuration
                  </span>
                  <div className="p-2 rounded bg-zinc-900/80 border border-emerald-900/40 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-300">Pin 1 (SMD)</span>
                    <span className="text-amber-400">(-279.4, -228.6)</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/80 border border-emerald-900/40 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-300">Pin 2 (TH)</span>
                    <span className="text-emerald-400">(-312.4, -195.6)</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/80 border border-emerald-900/40 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-300">Pin 3 (TH)</span>
                    <span className="text-emerald-400">(-304.8, -203.2)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowComponentEditor(false)}
                    className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase transition"
                  >
                    Save &amp; Insert into Board
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
