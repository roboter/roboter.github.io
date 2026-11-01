export interface ToolItem {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  category: string;
  statusBadge: string;
  statusColor: string;
  platforms: string[];
  techStack: string[];
  tags: string[];
  features: string[];
  toolUrl: string;
  previewImage: string;
  accentColor: string;
  buttonBg: string;
}

export const tools: ToolItem[] = [
  {
    id: 'lcd-character-generator',
    title: 'LCD Custom Character Generator',
    tagline: '5x8 Pixel Matrix Designer for HD44780 Character Displays',
    shortDescription:
      'Interactive pixel matrix designer for 5x8 character LCD modules. Draw custom icons, symbols, and glyphs by clicking or dragging across pixels, and generate production-ready Arduino & C binary byte arrays in real-time.',
    category: 'Embedded Displays',
    statusBadge: 'Interactive Web Tool',
    statusColor: 'emerald',
    platforms: ['Browser / Canvas', 'Arduino & C/C++'],
    techStack: ['React', 'HTML5 Canvas', 'C/C++ CodeGen', 'HD44780', 'Arduino'],
    tags: ['LCD', 'HD44780', 'Arduino', 'Displays', 'Embedded', 'Tools'],
    features: [
      'Interactive 5x8 pixel grid toggling with click-and-drag drawing',
      'Real-time Arduino byte customChar[8] code array generation',
      'Live preview rendered on a simulated 16x2 green LCD display',
      'One-click copy, clear, invert, and shift controls',
    ],
    toolUrl: '/tools/lcd-character-generator',
    previewImage: '/images/tools/lcd-generator.jpg',
    accentColor: 'from-emerald-500 to-teal-500',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500',
  },
  {
    id: 'oled-simulator',
    title: 'SSD1306 OLED Simulator',
    tagline: '128x64 Monochrome I2C/SPI OLED Simulator & Code Runner',
    shortDescription:
      'Simulate Adafruit SSD1306 and U8g2 commands directly in your browser. Render text, lines, geometric primitives, and bitmap graphics on a virtual 128x64 pixel display with live JavaScript execution.',
    category: 'Display Emulation',
    statusBadge: 'Live Emulator',
    statusColor: 'sky',
    platforms: ['Browser Virtual Screen', 'Adafruit_GFX / U8g2'],
    techStack: ['JavaScript', 'Canvas 2D', 'SSD1306', 'I2C / SPI', 'Adafruit_GFX'],
    tags: ['OLED', 'SSD1306', 'Simulator', 'I2C', 'SPI', 'Adafruit_GFX', 'Displays', 'Embedded', 'Tools'],
    features: [
      'Real-time 128x64 monochrome pixel buffer rendering with glow effect',
      'Text, line, circle, rectangle, and bitmap draw primitives',
      'Interactive code runner with built-in graphic demo presets',
      'Export rendered frame to C byte array (XBM / PROGMEM)',
    ],
    toolUrl: '/tools/oled-simulator',
    previewImage: '/images/tools/oled-simulator.jpg',
    accentColor: 'from-sky-500 to-cyan-500',
    buttonBg: 'bg-sky-600 hover:bg-sky-500',
  },
  {
    id: 'label-generator',
    title: 'Component Label Generator',
    tagline: 'SMD & Through-Hole Drawer Labels with Dynamic QR Codes',
    shortDescription:
      'Design and export clean, printable storage labels for electronic component drawers and organizers. Generates dynamic QR codes linked to datasheets or inventory, package footprint previews, and high-DPI SVG export.',
    category: 'Workshop & Lab',
    statusBadge: 'Vector SVG Export',
    statusColor: 'amber',
    platforms: ['Print Ready', 'SVG Vector'],
    techStack: ['SVG Vector', 'QRCode Generator', 'Print Ready', 'SMD / THT', 'CSS Grid'],
    tags: ['Labels', 'QR Code', 'SMD', 'THT', 'Workshop', 'Hardware', 'Tools'],
    features: [
      'Dynamic QR code generation for part URLs and specs',
      'Preset dimensions for popular organizer drawers (Raaco, Akro-Mils)',
      'High-resolution SVG vector output for direct printing',
      'Customizable package outlines (0805, SOIC, TO-220, DIP)',
    ],
    toolUrl: '/tools/label-generator',
    previewImage: '/images/tools/label-generator.jpg',
    accentColor: 'from-amber-500 to-orange-500',
    buttonBg: 'bg-amber-600 hover:bg-amber-500',
  },
];
