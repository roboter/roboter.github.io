export interface SoftwareProject {
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
  fullPageUrl: string;
  githubUrl?: string;
  downloadUrl?: string;
  previewImage: string;
  previewVideo?: string;
  accentColor: string;
  buttonBg: string;
}

export const softwareProjects: SoftwareProject[] = [
  {
    id: "circuitflow",
    title: "CircuitFlow.NET",
    tagline: "Modern Cross-Platform PCB Layout CAD Editor",
    shortDescription:
      "A lightweight, high-performance PCB layout editor powered by SkiaSharp and .NET 10. Engineered with interactive vector routing, real-time Design Rule Checking (DRC), transparent JSON project files, and manufacturing-grade Gerber & GRBL exports.",
    category: "Electronics CAD",
    statusBadge: "v1.0.3 Release",
    statusColor: "emerald",
    platforms: ["Windows (WinUI 3)", "macOS (Mac Catalyst)", "iPad (TestFlight)"],
    techStack: [".NET 10", "SkiaSharp", ".NET MAUI", "C#", "Gerber RS-274X", "GRBL"],
    tags: ["PCB", "CAD", "C#", ".NET", "SkiaSharp", "Electronics", "Gerber", "GRBL"],
    features: [
      "Hardware-accelerated SkiaSharp 2D vector canvas",
      "Real-time DRC clearance verification engine",
      "Interactive component & footprint geometry designer",
      "One-click Gerber RS-274X & CNC GRBL milling exports",
    ],
    fullPageUrl: "/software/circuitflow",
    previewImage: "/circuitflow/images/mainwindow.png",
    accentColor: "from-emerald-500 to-teal-500",
    buttonBg: "bg-emerald-600 hover:bg-emerald-500",
  },
  {
    id: "pulse",
    title: "Pulse",
    tagline: "Automated Desktop Wallpaper Changer",
    shortDescription:
      "An automated Windows system tray application that pulls and cycles stunning, high-resolution wallpapers matching your display dimensions from Wallhaven, NASA APOD, Media RSS feeds, and local folders.",
    category: "Desktop Utility",
    statusBadge: ".NET 4.8 • Maintained Fork",
    statusColor: "indigo",
    platforms: ["Windows 7 / 8 / 10 / 11"],
    techStack: [".NET Framework 4.8", "WinForms", "WinAPI P/Invoke", "CsQuery", "MSTest v3"],
    tags: ["Windows", "Wallpaper", "Desktop", ".NET", "C#", "Utility"],
    features: [
      "Intelligent screen aspect ratio & resolution matching",
      "Instant wallpaper banning with automated replacement",
      "Extensible input & output plugin architecture",
      "Multi-threaded background pre-fetch & image caching",
    ],
    fullPageUrl: "/software/pulse",
    githubUrl: "https://github.com/roboter/pulse",
    downloadUrl: "https://github.com/roboter/pulse/releases/tag/v0.0.1",
    previewImage: "/images/pulse/ui.png",
    accentColor: "from-indigo-500 to-sky-500",
    buttonBg: "bg-indigo-600 hover:bg-indigo-500",
  },
  {
    id: "antimony",
    title: "Antimony",
    tagline: "Graph-Based Parametric CAD Engine",
    shortDescription:
      "A CAD tool from a parallel universe, built around signed distance functions (F-Reps) and Python scripts. Forked from Matt Keeter's project — this fork adds native Windows and Linux build support with pre-compiled releases for Windows (.zip), Linux (.deb / .tar.gz), and macOS (.dmg).",
    category: "Parametric 3D CAD",
    statusBadge: "v0.9.7 • Win, Linux & Mac Release",
    statusColor: "emerald",
    platforms: ["Windows (.zip)", "Linux (.deb / .tar.gz)", "macOS (.dmg)"],
    techStack: ["C++11", "Qt5", "Python 3", "OpenGL", "Boost", "libantimony", "Signed Distance Functions"],
    tags: ["CAD", "3D Modeling", "Python", "C++", "Qt", "Open Source"],
    features: [
      "Node-based parametric modeling graph with real-time 3D viewport",
      "Pre-compiled Windows (.zip), Linux (.deb/.tar.gz), and macOS DMG releases",
      "Geometry represented by functional signed distance fields (F-Reps)",
      "Custom Python-scripted shapes, math expressions & functional transforms",
    ],
    fullPageUrl: "/software/antimony",
    githubUrl: "https://github.com/roboter/antimony",
    downloadUrl: "https://github.com/roboter/antimony/releases/tag/0.9.7",
    previewImage: "/antimony/preview.png",
    accentColor: "from-amber-500 to-orange-500",
    buttonBg: "bg-amber-600 hover:bg-amber-500",
  },
  {
    id: "opensharpcad",
    title: "OpenSharpCAD",
    tagline: "Parametric 3D CAD with C#",
    shortDescription:
      "An OpenSCAD-inspired parametric CAD IDE for designing 3D parts with C#. Write geometry with natural CSG operators, get instant Roslyn-powered previews, and build for Windows, macOS, or Linux with .NET 10.",
    category: "Parametric 3D CAD",
    statusBadge: "v0.0.1 Release",
    statusColor: "emerald",
    platforms: ["Windows x64", "macOS Intel", "Apple Silicon"],
    techStack: ["C# 13", ".NET 10", "Roslyn", "OpenGL / WebGL", "GLFW"],
    tags: ["CAD", "3D Modeling", "OpenSCAD", "C#", ".NET", "Roslyn", "CSG"],
    features: [
      "Live C# editing with Roslyn compilation and hardware-accelerated 3D previews",
      "Natural CSG boolean math, primitives, extrusions, transforms, and animation",
      "Release downloads for Windows x64 and macOS on Intel or Apple Silicon",
    ],
    fullPageUrl: "/software/opensharpcad",
    githubUrl: "https://github.com/roboter/OpenSharpCAD",
    downloadUrl: "https://github.com/roboter/OpenSharpCAD/releases/tag/0.0.1",
    previewImage: "/opensharpcad/main-ide.png",
    accentColor: "from-sky-500 to-indigo-500",
    buttonBg: "bg-sky-600 hover:bg-sky-500",
  },
  {
    id: "avrsimulator",
    title: "AVR Simulator",
    tagline: "ATmega328 Emulator in C#",
    shortDescription:
      "A lightweight AVR microcontroller emulator built with C# and WPF. Load firmware compiled into Intel HEX format, step through the disassembly, and watch GPIO, ADC, and DAC state update in real time on the desktop.",
    category: "Embedded Simulator",
    statusBadge: "v0.1 Release",
    statusColor: "emerald",
    platforms: ["Windows (.zip)"],
    techStack: ["C#", ".NET 10", "WPF", "Intel HEX", "ATmega328"],
    tags: ["AVR", "ATmega328", "Arduino", "Emulator", "Simulator", "C#", ".NET", "Embedded"],
    features: [
      "AVR instruction emulation with a live disassembly and program counter view",
      "Intel HEX firmware loading from AVR-GCC / avrdude output",
      "Real-time PORTB, PORTC, and PORTD pin state indicators",
      "Interactive ADC voltage control and virtual DAC output readout",
    ],
    fullPageUrl: "/software/avrsimulator",
    githubUrl: "https://github.com/roboter/AVR-Simulator",
    downloadUrl: "https://github.com/roboter/AVR-Simulator/releases/tag/v0.1",
    previewImage: "/avrsimulator/main-window.png",
    accentColor: "from-rose-500 to-orange-400",
    buttonBg: "bg-rose-600 hover:bg-rose-500",
  },
];

