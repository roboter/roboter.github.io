import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

const OLEDSimulator = () => {
  const canvasRef = useRef(null);
  const [buffer, setBuffer] = useState(new Array(1024).fill(0));
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [contrast, setContrast] = useState(200);
  const [inverted, setInverted] = useState(false);
  const [xFlip, setXFlip] = useState(false);
  const [yFlip, setYFlip] = useState(false);
  const [displayOn, setDisplayOn] = useState(true);
  const [yellowTop, setYellowTop] = useState(false);
  const [code, setCode] = useState(`OLED_init();
OLED_clear();
OLED_print("Hello OLED!");
OLED_newline();
OLED_print("SSD1306 128x64");`);
  const [copied, setCopied] = useState(false);
  const executeTimeoutRef = useRef(null);

  // Complete 5x7 font
  const font = {
    ' ': [0x00, 0x00, 0x00, 0x00, 0x00],
    '!': [0x00, 0x00, 0x5f, 0x00, 0x00],
    '"': [0x00, 0x07, 0x00, 0x07, 0x00],
    '#': [0x14, 0x7f, 0x14, 0x7f, 0x14],
    $: [0x24, 0x2a, 0x7f, 0x2a, 0x12],
    '%': [0x23, 0x13, 0x08, 0x64, 0x62],
    '&': [0x36, 0x49, 0x55, 0x22, 0x50],
    "'": [0x00, 0x05, 0x03, 0x00, 0x00],
    '(': [0x00, 0x1c, 0x22, 0x41, 0x00],
    ')': [0x00, 0x41, 0x22, 0x1c, 0x00],
    '*': [0x14, 0x08, 0x3e, 0x08, 0x14],
    '+': [0x08, 0x08, 0x3e, 0x08, 0x08],
    ',': [0x00, 0x50, 0x30, 0x00, 0x00],
    '-': [0x08, 0x08, 0x08, 0x08, 0x08],
    '.': [0x00, 0x60, 0x60, 0x00, 0x00],
    '/': [0x20, 0x10, 0x08, 0x04, 0x02],
    0: [0x3e, 0x51, 0x49, 0x45, 0x3e],
    1: [0x00, 0x42, 0x7f, 0x40, 0x00],
    2: [0x42, 0x61, 0x51, 0x49, 0x46],
    3: [0x21, 0x41, 0x45, 0x4b, 0x31],
    4: [0x18, 0x14, 0x12, 0x7f, 0x10],
    5: [0x27, 0x45, 0x45, 0x45, 0x39],
    6: [0x3c, 0x4a, 0x49, 0x49, 0x30],
    7: [0x01, 0x71, 0x09, 0x05, 0x03],
    8: [0x36, 0x49, 0x49, 0x49, 0x36],
    9: [0x06, 0x49, 0x49, 0x29, 0x1e],
    ':': [0x00, 0x36, 0x36, 0x00, 0x00],
    ';': [0x00, 0x56, 0x36, 0x00, 0x00],
    '<': [0x08, 0x14, 0x22, 0x41, 0x00],
    '=': [0x14, 0x14, 0x14, 0x14, 0x14],
    '>': [0x00, 0x41, 0x22, 0x14, 0x08],
    '?': [0x02, 0x01, 0x51, 0x09, 0x06],
    '@': [0x32, 0x49, 0x79, 0x41, 0x3e],
    A: [0x7e, 0x11, 0x11, 0x11, 0x7e],
    B: [0x7f, 0x49, 0x49, 0x49, 0x36],
    C: [0x3e, 0x41, 0x41, 0x41, 0x22],
    D: [0x7f, 0x41, 0x41, 0x41, 0x3e],
    E: [0x7f, 0x49, 0x49, 0x49, 0x41],
    F: [0x7f, 0x09, 0x09, 0x09, 0x01],
    G: [0x3e, 0x41, 0x49, 0x49, 0x7a],
    H: [0x7f, 0x08, 0x08, 0x08, 0x7f],
    I: [0x00, 0x41, 0x7f, 0x41, 0x00],
    J: [0x20, 0x40, 0x41, 0x3f, 0x01],
    K: [0x7f, 0x08, 0x14, 0x22, 0x41],
    L: [0x7f, 0x40, 0x40, 0x40, 0x40],
    M: [0x7f, 0x02, 0x0c, 0x02, 0x7f],
    N: [0x7f, 0x04, 0x08, 0x10, 0x7f],
    O: [0x3e, 0x41, 0x41, 0x41, 0x3e],
    P: [0x7f, 0x09, 0x09, 0x09, 0x06],
    Q: [0x3e, 0x41, 0x51, 0x21, 0x5e],
    R: [0x7f, 0x09, 0x19, 0x29, 0x46],
    S: [0x46, 0x49, 0x49, 0x49, 0x31],
    T: [0x01, 0x01, 0x7f, 0x01, 0x01],
    U: [0x3f, 0x40, 0x40, 0x40, 0x3f],
    V: [0x1f, 0x20, 0x40, 0x20, 0x1f],
    W: [0x3f, 0x40, 0x38, 0x40, 0x3f],
    X: [0x63, 0x14, 0x08, 0x14, 0x63],
    Y: [0x07, 0x08, 0x70, 0x08, 0x07],
    Z: [0x61, 0x51, 0x49, 0x45, 0x43],
    '[': [0x00, 0x7f, 0x41, 0x41, 0x00],
    '\\': [0x02, 0x04, 0x08, 0x10, 0x20],
    ']': [0x00, 0x41, 0x41, 0x7f, 0x00],
    '^': [0x04, 0x02, 0x01, 0x02, 0x04],
    _: [0x40, 0x40, 0x40, 0x40, 0x40],
    '`': [0x00, 0x01, 0x02, 0x04, 0x00],
    a: [0x20, 0x54, 0x54, 0x54, 0x78],
    b: [0x7f, 0x48, 0x44, 0x44, 0x38],
    c: [0x38, 0x44, 0x44, 0x44, 0x20],
    d: [0x38, 0x44, 0x44, 0x48, 0x7f],
    e: [0x38, 0x54, 0x54, 0x54, 0x18],
    f: [0x08, 0x7e, 0x09, 0x01, 0x02],
    g: [0x0c, 0x52, 0x52, 0x52, 0x3e],
    h: [0x7f, 0x08, 0x04, 0x04, 0x78],
    i: [0x00, 0x44, 0x7d, 0x40, 0x00],
    j: [0x20, 0x40, 0x44, 0x3d, 0x00],
    k: [0x7f, 0x10, 0x28, 0x44, 0x00],
    l: [0x00, 0x41, 0x7f, 0x40, 0x00],
    m: [0x7c, 0x04, 0x18, 0x04, 0x78],
    n: [0x7c, 0x08, 0x04, 0x04, 0x78],
    o: [0x38, 0x44, 0x44, 0x44, 0x38],
    p: [0x7c, 0x14, 0x14, 0x14, 0x08],
    q: [0x08, 0x14, 0x14, 0x18, 0x7c],
    r: [0x7c, 0x08, 0x04, 0x04, 0x08],
    s: [0x48, 0x54, 0x54, 0x54, 0x20],
    t: [0x04, 0x3f, 0x44, 0x40, 0x20],
    u: [0x3c, 0x40, 0x40, 0x20, 0x7c],
    v: [0x1c, 0x20, 0x40, 0x20, 0x1c],
    w: [0x3c, 0x40, 0x30, 0x40, 0x3c],
    x: [0x44, 0x28, 0x10, 0x28, 0x44],
    y: [0x0c, 0x50, 0x50, 0x50, 0x3c],
    z: [0x44, 0x64, 0x54, 0x4c, 0x44],
  };

  useEffect(() => {
    drawScreen();
  }, [buffer, contrast, inverted, xFlip, yFlip, displayOn, yellowTop]);

  useEffect(() => {
    // Auto-execute on code change with debounce
    if (executeTimeoutRef.current) {
      clearTimeout(executeTimeoutRef.current);
    }

    executeTimeoutRef.current = setTimeout(() => {
      executeCode();
    }, 500);

    return () => {
      if (executeTimeoutRef.current) {
        clearTimeout(executeTimeoutRef.current);
      }
    };
  }, [code]);

  const drawScreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const scale = 6;

    // Background
    ctx.fillStyle = displayOn ? '#000' : '#111';
    ctx.fillRect(0, 0, 768, 384);

    if (!displayOn) return;

    // Draw grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 128; x++) {
      ctx.beginPath();
      ctx.moveTo(x * scale, 0);
      ctx.lineTo(x * scale, 64 * scale);
      ctx.stroke();
    }
    for (let y = 0; y <= 64; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * scale);
      ctx.lineTo(128 * scale, y * scale);
      ctx.stroke();
    }

    // Draw pixels
    for (let page = 0; page < 8; page++) {
      for (let col = 0; col < 128; col++) {
        const bufferIndex = page * 128 + col;
        const byte = buffer[bufferIndex];

        for (let bit = 0; bit < 8; bit++) {
          const pixelOn = (byte >> bit) & 1;
          let shouldDraw = inverted ? !pixelOn : pixelOn;

          if (shouldDraw) {
            let x = xFlip ? 127 - col : col;
            let y = yFlip ? 63 - (page * 8 + bit) : page * 8 + bit;

            const alpha = contrast / 255;
            // Use yellow for upper 16 pixels if enabled
            if (yellowTop && y < 16) {
              ctx.fillStyle = `rgba(255, 220, 0, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
            }
            ctx.fillRect(x * scale + 0.5, y * scale + 0.5, scale - 1, scale - 1);
          }
        }
      }
    }
  };

  const clearBuffer = () => {
    const newBuffer = new Array(1024).fill(0);
    setBuffer(newBuffer);
    setCursorX(0);
    setCursorY(0);
  };

  const writeChar = (char, x, y, bufferRef) => {
    const charData = font[char] || font[' '];

    for (let i = 0; i < 5; i++) {
      if (x + i >= 128) break;
      const col = charData[i];
      const bufferIndex = y * 128 + x + i;
      bufferRef[bufferIndex] = col;
    }

    return x + 6;
  };

  const printText = (text, bufferRef, startX, startY) => {
    let x = startX;
    let y = startY;

    for (let char of text) {
      if (char === '\n') {
        x = 0;
        y = (y + 1) % 8;
      } else {
        x = writeChar(char, x, y, bufferRef);
        if (x >= 128) {
          x = 0;
          y = (y + 1) % 8;
        }
      }
    }

    return { x, y };
  };

  const drawPixel = (bufferRef, x, y, color) => {
    if (x < 0 || x >= 128 || y < 0 || y >= 64) return;

    const page = Math.floor(y / 8);
    const bit = y % 8;
    const bufferIndex = page * 128 + x;

    if (color) {
      bufferRef[bufferIndex] |= 1 << bit;
    } else {
      bufferRef[bufferIndex] &= ~(1 << bit);
    }
  };

  const drawLine = (bufferRef, x0, y0, x1, y1, color) => {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      drawPixel(bufferRef, x0, y0, color);

      if (x0 === x1 && y0 === y1) break;

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  };

  const drawRect = (bufferRef, x, y, w, h, color) => {
    drawLine(bufferRef, x, y, x + w - 1, y, color);
    drawLine(bufferRef, x + w - 1, y, x + w - 1, y + h - 1, color);
    drawLine(bufferRef, x + w - 1, y + h - 1, x, y + h - 1, color);
    drawLine(bufferRef, x, y + h - 1, x, y, color);
  };

  const fillRect = (bufferRef, x, y, w, h, color) => {
    for (let i = 0; i < h; i++) {
      drawLine(bufferRef, x, y + i, x + w - 1, y + i, color);
    }
  };

  const executeCode = () => {
    const newBuffer = new Array(1024).fill(0);
    let x = 0;
    let y = 0;

    const lines = code.split('\n');
    for (let line of lines) {
      line = line.trim();

      if (line.includes('OLED_clear()')) {
        newBuffer.fill(0);
        x = 0;
        y = 0;
      } else if (line.includes('OLED_println(')) {
        const match = line.match(/OLED_println\("([^"]*)"\)/);
        if (match) {
          const result = printText(match[1], newBuffer, x, y);
          x = 0;
          y = (result.y + 1) % 8;
        }
      } else if (line.includes('OLED_print(')) {
        const match = line.match(/OLED_print\("([^"]*)"\)/);
        if (match) {
          const result = printText(match[1], newBuffer, x, y);
          x = result.x;
          y = result.y;
        }
      } else if (line.includes('OLED_newline()')) {
        x = 0;
        y = (y + 1) % 8;
      } else if (line.includes('OLED_DrawPixel(')) {
        const match = line.match(/OLED_DrawPixel\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const px = parseInt(match[1]);
          const py = parseInt(match[2]);
          const color = parseInt(match[3]);
          drawPixel(newBuffer, px, py, color);
        }
      } else if (line.includes('OLED_DrawLine(')) {
        const match = line.match(/OLED_DrawLine\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const x0 = parseInt(match[1]);
          const y0 = parseInt(match[2]);
          const x1 = parseInt(match[3]);
          const y1 = parseInt(match[4]);
          const color = parseInt(match[5]);
          drawLine(newBuffer, x0, y0, x1, y1, color);
        }
      } else if (line.includes('OLED_DrawRect(')) {
        const match = line.match(/OLED_DrawRect\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const rx = parseInt(match[1]);
          const ry = parseInt(match[2]);
          const w = parseInt(match[3]);
          const h = parseInt(match[4]);
          const color = parseInt(match[5]);
          drawRect(newBuffer, rx, ry, w, h, color);
        }
      } else if (line.includes('OLED_FillRect(')) {
        const match = line.match(/OLED_FillRect\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const rx = parseInt(match[1]);
          const ry = parseInt(match[2]);
          const w = parseInt(match[3]);
          const h = parseInt(match[4]);
          const color = parseInt(match[5]);
          fillRect(newBuffer, rx, ry, w, h, color);
        }
      }
    }

    setBuffer(newBuffer);
    setCursorX(x);
    setCursorY(y);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertExample = (exampleCode) => {
    setCode(exampleCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-white">SSD1306 OLED Simulator</h1>
        <p className="mb-8 text-slate-400">128x64 Pixel Display Preview</p>

        <div className="grid gap-6 lg:grid-cols-1">
          {/* Display Panel */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-white">Display Output</h2>
            <div className="inline-block overflow-auto rounded-lg bg-black p-4">
              <canvas ref={canvasRef} width={768} height={384} className="border-2 border-slate-700" />
            </div>
            <div className="mt-2 text-xs text-slate-400">128x64 pixels • Grid overlay enabled • Scale: 6x</div>

            {/* Display Controls */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300">Contrast: {contrast}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-48"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setDisplayOn(!displayOn)}
                  className={`rounded px-3 py-1 ${displayOn ? 'bg-green-600' : 'bg-red-600'} text-sm text-white`}
                >
                  {displayOn ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setInverted(!inverted)}
                  className={`rounded px-3 py-1 ${inverted ? 'bg-blue-600' : 'bg-slate-600'} text-sm text-white`}
                >
                  Invert
                </button>
                <button
                  onClick={() => setXFlip(!xFlip)}
                  className={`rounded px-3 py-1 ${xFlip ? 'bg-blue-600' : 'bg-slate-600'} text-sm text-white`}
                >
                  X-Flip
                </button>
                <button
                  onClick={() => setYFlip(!yFlip)}
                  className={`rounded px-3 py-1 ${yFlip ? 'bg-blue-600' : 'bg-slate-600'} text-sm text-white`}
                >
                  Y-Flip
                </button>
                <button
                  onClick={() => setYellowTop(!yellowTop)}
                  className={`rounded px-3 py-1 ${yellowTop ? 'bg-yellow-600' : 'bg-slate-600'} text-sm text-white`}
                >
                  Yellow Top 16px
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Code Editor</h2>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 rounded bg-slate-700 px-3 py-1 text-sm text-white transition-colors hover:bg-slate-600"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-80 w-full resize-none rounded border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-green-400 focus:border-blue-500 focus:outline-none"
              spellCheck={false}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={clearBuffer}
                className="flex items-center gap-2 rounded bg-slate-700 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-600"
              >
                <RotateCcw size={18} />
                Clear Display
              </button>
              <div className="flex items-center text-sm text-slate-400">Updates automatically as you type</div>
            </div>

            {/* Quick Examples */}
            <div className="mt-6 rounded bg-slate-900 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-300">Quick Examples</h3>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_print("Hello World!");\nOLED_newline();\nOLED_print("Line 2");'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Basic Text
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_println("Line 1");\nOLED_println("Line 2");\nOLED_println("Line 3");\nOLED_print("Line 4");'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Multiple Lines
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_print("Temperature: 25C");\nOLED_newline();\nOLED_print("Humidity: 60%");\nOLED_newline();\nOLED_print("Pressure: 1013");'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Sensor Display
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_DrawLine(0, 0, 127, 63, 1);\nOLED_DrawLine(127, 0, 0, 63, 1);\nOLED_DrawLine(0, 31, 127, 31, 1);\nOLED_DrawLine(63, 0, 63, 63, 1);'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Lines (Cross Pattern)
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_DrawRect(10, 10, 40, 30, 1);\nOLED_FillRect(60, 10, 40, 30, 1);\nOLED_DrawRect(5, 45, 118, 15, 1);'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Rectangles
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_DrawPixel(20, 20, 1);\nOLED_DrawPixel(30, 20, 1);\nOLED_DrawPixel(40, 20, 1);\nOLED_DrawLine(20, 30, 40, 30, 1);\nOLED_DrawLine(25, 35, 35, 35, 1);'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Pixels & Smiley Face
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_print("Status: OK");\nOLED_newline();\nOLED_DrawLine(0, 15, 127, 15, 1);\nOLED_FillRect(5, 20, 30, 8, 1);\nOLED_print("  Bar Chart");\nOLED_newline();\nOLED_FillRect(5, 35, 50, 8, 1);\nOLED_FillRect(5, 48, 80, 8, 1);'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Mixed: Text + Graphics
                </button>
                <button
                  onClick={() =>
                    insertExample(
                      'OLED_init();\nOLED_clear();\nOLED_DrawRect(0, 0, 128, 64, 1);\nOLED_DrawRect(5, 5, 118, 54, 1);\nOLED_print("  Frame Design");\nOLED_newline();\nOLED_newline();\nOLED_print("   Double Border");'
                    )
                  }
                  className="w-full rounded bg-slate-800 p-2 text-left font-mono text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
                >
                  Frame with Border
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OLEDSimulator;
