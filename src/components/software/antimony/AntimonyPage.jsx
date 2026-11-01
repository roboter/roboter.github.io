import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ExternalLink,
  GitFork,
  Terminal,
  Layers,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Play,
  RotateCcw,
  Clock,
  Box,
  Download,
  Monitor,
  Apple,
  Info,
  Network,
  Code,
  Shapes,
  History,
  Newspaper,
  Binary,
  Workflow,
} from 'lucide-react';

function LinuxIcon({ className = 'w-4 h-4' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
    </svg>
  );
}

const readmeBadges = [
  {
    label: 'C++11',
    href: 'https://isocpp.org/',
    image: 'https://img.shields.io/badge/C%2B%2B-11-00599C?style=flat&logo=cplusplus&logoColor=white',
  },
  {
    label: 'Qt 5',
    href: 'https://www.qt.io/',
    image: 'https://img.shields.io/badge/UI-Qt_5-41CD52?style=flat&logo=qt&logoColor=white',
  },
  {
    label: 'Python 3',
    href: 'https://www.python.org/',
    image: 'https://img.shields.io/badge/Scripting-Python_3-3776AB?style=flat&logo=python&logoColor=white',
  },
  {
    label: 'OpenGL',
    href: 'https://www.opengl.org/',
    image: 'https://img.shields.io/badge/3D-OpenGL-5586A4?style=flat&logo=opengl&logoColor=white',
  },
  {
    label: 'Boost',
    href: 'https://www.boost.org/',
    image: 'https://img.shields.io/badge/Lib-Boost-orange?style=flat',
  },
  {
    label: 'License: MIT',
    href: 'https://github.com/roboter/antimony/blob/master/LICENSE',
    image: 'https://img.shields.io/badge/license-MIT-blue?style=flat',
  },
];

export default function AntimonyPage() {
  const [copiedKey, setCopiedKey] = useState(null);

  // VIDEO PLAYER REF & PLAYBACK STATE
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(284);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const releases = {
    version: '0.9.7',
    releaseUrl: 'https://github.com/roboter/antimony/releases/tag/0.9.7',
    windows: {
      name: 'antimony-windows.zip',
      size: '87.5 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.7/antimony-windows.zip',
      desc: 'Native Windows portable build with bundled Qt5, Python 3 runtime, and required dynamic libraries. Extract and double-click antimony.exe.',
    },
    linuxDeb: {
      name: 'antimony-linux-amd64.deb',
      size: '14.2 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.7/antimony-linux-amd64.deb',
      desc: 'Debian/Ubuntu package with desktop application launcher and icon integration. Install via sudo apt install ./antimony-linux-amd64.deb.',
    },
    linuxTar: {
      name: 'antimony-linux-x86_64.tar.gz',
      size: '21.0 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.7/antimony-linux-x86_64.tar.gz',
      desc: 'Standalone portable tarball for 64-bit Linux distributions. Extract and run ./antimony.sh or bin/antimony directly.',
    },
    macDmg: {
      name: 'antimony-mac.dmg',
      size: '38.6 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.7/antimony-mac.dmg',
      desc: 'Standard macOS Disk Image bundle. Open the DMG and drag Antimony.app into your Applications folder.',
    },
  };

  const videoSteps = [
    {
      time: '00:00',
      seconds: 0,
      label: 'Intro & Workspace Setup',
      desc: 'Initializing the Antimony node canvas, loading screwdriver.sb, and overviewing the 3D viewport.',
    },
    {
      time: '00:15',
      seconds: 15,
      label: '2D Sketch & Constraints',
      desc: 'Defining primitive parametric circles and rectangles with direct node parameter inputs.',
    },
    {
      time: '01:20',
      seconds: 80,
      label: 'Revolve & Extrude 3D',
      desc: 'Converting 2D distance fields into 3D bodies via functional revolution and linear extrusion.',
    },
    {
      time: '02:45',
      seconds: 165,
      label: 'Polar Array Fluting',
      desc: 'Arranging 6 radial grip flutes around the cylinder using the Iterate (polar) transformation node.',
    },
    {
      time: '03:40',
      seconds: 220,
      label: 'CSG Difference Boolean',
      desc: 'Subtracting flutes from the main screwdriver handle with instantaneous exact boolean operations.',
    },
    {
      time: '04:25',
      seconds: 265,
      label: 'Mesh Export & Verification',
      desc: 'Exporting the resulting solid geometry directly to an STL mesh and opening in fstl viewer.',
    },
  ];

  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentStep = () => {
    for (let i = videoSteps.length - 1; i >= 0; i--) {
      if (currentTime >= videoSteps[i].seconds) {
        return {
          ...videoSteps[i],
          index: i,
        };
      }
    }
    return {
      ...videoSteps[0],
      index: 0,
    };
  };

  const currentStep = getCurrentStep();

  const handleJumpToStep = (targetSeconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = targetSeconds;
      videoRef.current.play().catch(() => {});
    }
    const container = document.getElementById('antimony-video-player');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="relative w-full text-zinc-800 selection:bg-amber-500 selection:text-white dark:text-zinc-100">
      {/* GITHUB RIBBON */}
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-36 w-36 overflow-hidden">
        <a
          href="https://github.com/roboter/antimony"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto absolute -right-10 top-7 block w-44 rotate-45 border-y border-white/20 bg-zinc-900 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition hover:scale-105 hover:bg-amber-600"
        >
          Fork on GitHub
        </a>
      </div>

      {/* BREADCRUMB / BACK LINK */}
      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-amber-600 hover:underline dark:text-amber-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Software Catalog</span>
        </a>
      </div>

      {/* HERO SECTION */}
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-zinc-200 bg-white px-5 py-12 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 font-mono text-xs font-medium text-amber-700 shadow-sm backdrop-blur-sm dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Antimony • Parametric Graph CAD</span>
            <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-200">
              v{releases.version} Release
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            CAD From A{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Parallel Universe
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            A computer-aided design (CAD) tool from a parallel universe in which CAD software evolved from{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">
              Lisp machines rather than drafting tables
            </span>
            . Built on{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">
              functional representations (Signed Distance Fields / F-Reps)
            </span>{' '}
            and <span className="font-semibold text-zinc-900 dark:text-white">Python 3 scripting</span>, with native
            Windows and Linux builds added.
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
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/25 transition hover:bg-amber-500"
            >
              <Download className="h-4 w-4" />
              Download Releases
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/roboter/antimony"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-amber-400 hover:text-amber-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-amber-500 dark:hover:text-amber-300"
            >
              <GitFork className="h-4 w-4" />
              Fork on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href="https://github.com/mkeeter/antimony"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-300"
            >
              <ExternalLink className="h-4 w-4" />
              Upstream (mkeeter)
            </a>
          </div>
        </div>
      </section>

      {/* FORK NOTICE BANNER */}
      <div className="mx-auto mb-8 max-w-5xl px-4">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-sm dark:bg-amber-500/10 sm:flex-row sm:p-5">
          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Info className="h-5 w-5" />
          </div>
          <div className="flex-1 text-sm">
            <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-white">
              <span>Fork Notice: Added Windows &amp; Linux Builds</span>
              <span className="rounded border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                v0.9.7 Ready
              </span>
            </h3>
            <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-300">
              This repository is a fork of Matt Keeter&apos;s{' '}
              <a
                href="https://github.com/mkeeter/antimony"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-600 underline hover:no-underline dark:text-amber-400"
              >
                Antimony
              </a>
              . <strong>It is a fork where I added Windows and Linux build support</strong>, resolving toolchain
              dependencies and providing portable pre-compiled Windows zip packages and Linux packages (.deb /
              standalone .tar.gz) alongside the macOS releases.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href={releases.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-amber-600 hover:underline dark:text-amber-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View Release v0.9.7 on GitHub</span>
              </a>
              <span className="text-zinc-400">•</span>
              <a
                href="https://github.com/mkeeter/antimony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-700 hover:underline dark:hover:text-zinc-300"
              >
                Original Upstream (mkeeter/antimony)
              </a>
              <span className="text-zinc-400">•</span>
              <a
                href="https://www.mattkeeter.com/projects/antimony/3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline dark:text-amber-400"
              >
                Matt Keeter Antimony Part 3 Article
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED DEMO VIDEO */}
      <div id="antimony-video-player" className="mx-auto mb-10 max-w-5xl space-y-6 px-4">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-2xl dark:border-zinc-800">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 font-medium text-zinc-300">antimony — screwdriver.sb (Modeling Session Demo)</span>
            </div>
            <span className="text-[11px] text-zinc-500">1152 x 720 • 4m 44s Demo</span>
          </div>

          {/* Video Player Container */}
          <div className="relative flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src="/antimony/screwdriver.mp4"
              poster="/antimony/screwdriver_poster.jpg"
              controls
              playsInline
              preload="metadata"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 284)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="h-auto max-h-[720px] w-full object-contain shadow-inner"
            >
              Your browser does not support HTML5 video playback.
            </video>
          </div>

          {/* Interactive Chapter Timeline Track */}
          <div className="relative w-full border-t border-zinc-800/80 bg-zinc-950 px-4 py-2">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="h-3 w-3 text-amber-500" />
                <span>Interactive Chapter Timeline</span>
              </span>
              <span className="font-semibold text-zinc-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Segmented Timeline */}
            <div
              className="relative flex h-2.5 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-800"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                handleJumpToStep(pos * (duration || 284));
              }}
              title="Click anywhere to seek on timeline"
            >
              {/* Progress fill */}
              <div
                className="absolute bottom-0 left-0 top-0 z-10 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-orange-400 transition-all duration-150"
                style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 284)) * 100))}%` }}
              />

              {/* Chapter milestone ticks */}
              {videoSteps.map((step) => {
                const leftPercent = (step.seconds / (duration || 284)) * 100;
                return (
                  <div
                    key={step.time}
                    className="absolute bottom-0 top-0 z-20 w-0.5 bg-white/40 transition-colors hover:bg-white"
                    style={{ left: `${leftPercent}%` }}
                    title={`${step.time} • ${step.label}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Video Player Statusbar */}
          <div className="flex flex-col gap-3 border-t border-zinc-800 bg-zinc-900 p-3 font-mono text-xs text-zinc-400 sm:p-4 md:flex-row md:items-center md:justify-between">
            {/* Current Section Live Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  {isPlaying && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      isPlaying ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-zinc-500'
                    }`}
                  ></span>
                </span>
                <span className="font-sans text-xs text-zinc-300">
                  Section: <strong className="font-sans font-bold text-white">{currentStep.label}</strong>
                </span>
                <span className="rounded border border-amber-500/30 bg-amber-500/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
                  {currentStep.time}
                </span>
              </div>

              <span className="text-[11px] text-zinc-500">
                (Chapter {currentStep.index + 1} of {videoSteps.length})
              </span>
            </div>

            {/* Quick Jump Chapter Pills in Statusbar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="mr-1 hidden text-[10px] uppercase tracking-wider text-zinc-500 sm:inline">Jump:</span>
              {videoSteps.map((step, idx) => {
                const isCurrent = currentStep.index === idx;
                return (
                  <button
                    key={step.time}
                    type="button"
                    onClick={() => handleJumpToStep(step.seconds)}
                    className={`flex items-center gap-1 rounded px-2 py-1 font-mono text-[11px] transition-all ${
                      isCurrent
                        ? 'scale-105 bg-amber-500 font-bold text-zinc-950 shadow-md shadow-amber-500/20'
                        : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                    title={`Seek to ${step.time} — ${step.label}`}
                  >
                    {isCurrent && <Play className="h-2.5 w-2.5 fill-current" />}
                    <span>{step.time}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handleJumpToStep(0)}
                className="ml-1 rounded p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                title="Restart from beginning (00:00)"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* TIMELINE ANNOTATIONS (CLICKABLE WORKFLOW CARDS) */}
        <div>
          <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Screwdriver Modeling Session Workflow</span>
            </h2>
            <span className="flex items-center gap-1 font-mono text-xs text-amber-600 dark:text-amber-400">
              <Play className="h-3 w-3 fill-current" />
              <span>Click any step below to jump directly to that section in the video</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {videoSteps.map((step, idx) => {
              const isCurrent = currentStep.index === idx;
              return (
                <button
                  key={step.time}
                  type="button"
                  onClick={() => handleJumpToStep(step.seconds)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isCurrent
                      ? 'scale-[1.01] border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50 dark:bg-amber-500/15'
                      : 'border-zinc-200 bg-white shadow-sm hover:scale-[1.01] hover:border-amber-500/50 hover:bg-amber-500/5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:bg-zinc-800/80'
                  }`}
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-colors ${
                            isCurrent
                              ? 'bg-amber-500 text-zinc-950'
                              : 'bg-zinc-100 text-zinc-600 group-hover:bg-amber-500 group-hover:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span>{step.label}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-950 shadow-sm">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-950"></span>
                            <span>ACTIVE</span>
                          </span>
                        )}
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[11px] font-semibold transition-colors ${
                            isCurrent
                              ? 'border-amber-500/30 bg-amber-500/20 text-amber-700 dark:text-amber-300'
                              : 'border-zinc-200 bg-zinc-100 text-zinc-700 group-hover:border-amber-500/20 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:text-amber-400'
                          }`}
                        >
                          {step.time}
                        </span>
                      </div>
                    </div>

                    <p className="mb-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{step.desc}</p>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[11px] font-medium text-amber-600 transition-transform group-hover:translate-x-0.5 dark:text-amber-400">
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isCurrent ? 'Currently Playing' : `Jump to ${step.time}`}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PRESS & COMMUNITY COVERAGE */}
      <div className="mx-auto mb-12 max-w-5xl px-4">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex flex-col gap-2 border-b border-zinc-100 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                  Press &amp; Community Discussion
                </h3>
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  Articles, interviews, and community reactions from Hacker News &amp; Hackaday
                </p>
              </div>
            </div>
            <span className="self-start rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-purple-600 dark:text-purple-400 sm:self-auto">
              Media &amp; Community
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
            <a
              href="http://hackaday.com/2015/05/29/otherworldy-cad-software-hails-from-a-parallel-universe/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-amber-500/40 hover:bg-amber-500/5 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">HACKADAY</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 transition group-hover:text-amber-500" />
              </div>
              <h4 className="mb-1 text-sm font-bold text-zinc-900 transition group-hover:text-amber-500 dark:text-white">
                &ldquo;Otherworldly CAD Software Hails From a Parallel Universe&rdquo;
              </h4>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                Hackaday featured Antimony&apos;s node-based modeling paradigm and functional representation approach to
                CAD.
              </p>
            </a>

            <a
              href="https://librearts.org/2015/05/introducing-antimony-node-based-cad-application/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-amber-500/40 hover:bg-amber-500/5 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  LIBRE GRAPHICS WORLD
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 transition group-hover:text-amber-500" />
              </div>
              <h4 className="mb-1 text-sm font-bold text-zinc-900 transition group-hover:text-amber-500 dark:text-white">
                &ldquo;Introducing Antimony, Node-Based CAD Application&rdquo;
              </h4>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                Detailed interview with Matt Keeter exploring the intersection of Lisp programming, graph UX, and math
                solids.
              </p>
            </a>

            <a
              href="https://news.ycombinator.com/item?id=9623609"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-amber-500/40 hover:bg-amber-500/5 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-orange-600 dark:text-orange-400">
                  HACKER NEWS
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 transition group-hover:text-amber-500" />
              </div>
              <h4 className="mb-1 text-sm font-bold text-zinc-900 transition group-hover:text-amber-500 dark:text-white">
                Hacker News Discussion (Show HN)
              </h4>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                Discussion of mathematical solid representations, performance comparisons with OpenSCAD, and implicit
                surface modeling.
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DOWNLOADS & RELEASES                                           */}
      {/* ============================================================== */}
      <div id="downloads" className="mx-auto mb-12 max-w-5xl space-y-6 px-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Antimony Release {releases.version}</h2>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Latest Release
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Official Windows, Linux &amp; macOS binaries hosted on GitHub Releases
              </p>
            </div>

            <a
              href={releases.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 self-start rounded-lg border border-zinc-300 px-4 py-2 font-mono text-xs font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 sm:self-auto"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* DOWNLOAD CARDS GRID */}
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* WINDOWS CARD */}
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Windows Build</h3>
                      <span className="font-mono text-[11px] text-zinc-500">
                        {releases.windows.name} • {releases.windows.size}
                      </span>
                    </div>
                  </div>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Portable Zip
                  </span>
                </div>

                <p className="mb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{releases.windows.desc}</p>
              </div>

              <a
                href={releases.windows.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
              >
                <Download className="h-4 w-4" />
                <span>Download .ZIP ({releases.windows.size})</span>
              </a>
            </div>

            {/* LINUX CARD */}
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      <LinuxIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Linux Packages</h3>
                      <span className="font-mono text-[11px] text-zinc-500">
                        .deb ({releases.linuxDeb.size}) • .tar.gz ({releases.linuxTar.size})
                      </span>
                    </div>
                  </div>
                  <span className="rounded border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                    Debian &amp; Tarball
                  </span>
                </div>

                <p className="mb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Pre-compiled 64-bit binaries for Linux. Install the Debian package with desktop icon integration, or
                  extract and run the standalone portable tarball.
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <a
                  href={releases.linuxDeb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-orange-500"
                >
                  <Download className="h-4 w-4" />
                  <span>Download .deb ({releases.linuxDeb.size})</span>
                </a>
                <a
                  href={releases.linuxTar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2.5 font-mono text-xs text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  title={`Download portable tarball (${releases.linuxTar.size})`}
                >
                  <span>.tar.gz</span>
                </a>
              </div>
            </div>

            {/* MACOS CARD */}
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-500/10 text-zinc-700 dark:text-zinc-300">
                      <Apple className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">macOS Disk Image</h3>
                      <span className="font-mono text-[11px] text-zinc-500">
                        {releases.macDmg.name} • {releases.macDmg.size}
                      </span>
                    </div>
                  </div>
                  <span className="rounded bg-zinc-200 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Apple DMG
                  </span>
                </div>

                <p className="mb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{releases.macDmg.desc}</p>
              </div>

              <a
                href={releases.macDmg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                <Download className="h-4 w-4" />
                <span>Download .DMG ({releases.macDmg.size})</span>
              </a>
            </div>
          </div>

          {/* QUICK INSTRUCTIONS */}
          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:bg-amber-500/10">
              <span className="mb-1 block font-bold text-zinc-900 dark:text-white">
                💡 Running Antimony on Windows:
              </span>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                Extract <code className="font-mono text-amber-600 dark:text-amber-400">antimony-windows.zip</code> to
                any directory. No registry installation required. Double click{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">antimony.exe</code> to start modeling.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:bg-amber-500/10">
              <span className="mb-1 block font-bold text-zinc-900 dark:text-white">🐧 Running Antimony on Linux:</span>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                For Debian/Ubuntu, install via{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">
                  sudo apt install ./antimony-linux-amd64.deb
                </code>
                . For other distributions, extract{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">antimony-linux-x86_64.tar.gz</code> and
                run <code className="font-mono text-amber-600 dark:text-amber-400">./antimony.sh</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CORE FOUNDATIONS (FROM MATT KEETER'S ANTIMONY 3 ARTICLE)       */}
      {/* ============================================================== */}
      <div id="foundations" className="mx-auto mb-12 max-w-5xl space-y-10 px-4">
        {/* INTRO QUOTE */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <blockquote className="text-base font-medium italic leading-relaxed text-zinc-900 dark:text-white sm:text-lg">
                &ldquo;Antimony is a computer-aided design (CAD) tool from a parallel universe in which CAD software
                evolved from Lisp machines rather than drafting tables.&rdquo;
              </blockquote>
              <div className="mt-2 flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span>— Matthew Keeter</span>
                <span>•</span>
                <a
                  href="https://www.mattkeeter.com/projects/antimony/3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-600 hover:underline dark:text-amber-400"
                >
                  <span>Read original project writeup (Antimony 3)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* THREE FOUNDATIONS OVERVIEW */}
        <div>
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Architectural Pillars
            </span>
            <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">The Three Mostly-Orthogonal Axes</h2>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Unlike traditional monolithic CAD programs, Antimony is decomposed cleanly into three decoupled
              subsystems:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Network className="h-4 w-4" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">1. Directed Acyclic Graph</h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Information flow engine tracking dependencies, parameter inputs, and propagating edits downstream
                  automatically.
                </p>
              </div>
              <span className="mt-3 block font-mono text-[10px] text-sky-600 dark:text-sky-400">
                Graph Engine &rarr;
              </span>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Box className="h-4 w-4" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">2. Geometry Engine (CSG)</h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Solid modeling using functional representations (F-Reps) where boolean unions, intersections, and
                  subtractions are mathematically exact.
                </p>
              </div>
              <span className="mt-3 block font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                Functional Math &rarr;
              </span>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Shapes className="h-4 w-4" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">3. Standard Library &amp; UI</h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Rich shapes and spatial transforms with bidirectional 3D UI hooks that allow interactive direct
                  manipulation in viewport.
                </p>
              </div>
              <span className="mt-3 block font-mono text-[10px] text-amber-600 dark:text-amber-400">
                Python + UI Hooks &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* AXIS 1: GRAPH ENGINE */}
        <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                1. Graph Engine (DAG &amp; Scripted Nodes)
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Directed acyclic graph tracking parameter flow and topological changes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Solid modeling in Antimony is performed by connecting nodes in a graph. Nodes typically represent
                primitive shapes (circles, cubes, cylinders) or transformations (extrusions, sweeps, rotations, CSG
                booleans).
              </p>
              <p>
                Each node is defined by a <strong>customizable Python 3 script</strong> augmented with a few special
                keywords like <code className="font-mono text-amber-600 dark:text-amber-400">input()</code> and{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">output()</code> that declare ports and
                inject variables into the script namespace.
              </p>
              <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/70">
                <span className="block font-mono font-bold text-zinc-900 dark:text-white">
                  Automatic Downstream Change Propagation:
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  When any port value or node script changes, Antimony tracks the dependency graph and instantly
                  recalculates only the affected downstream nodes, ensuring high performance even in deep DAG trees.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-md dark:border-zinc-800">
                <img
                  src="/antimony/docs/graph.png"
                  alt="Antimony Node Graph connections"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/90 p-2.5 font-mono text-[11px] text-zinc-400">
                  <span>Node graph connecting circle shape and parameters</span>
                  <span className="text-amber-400">Antimony DAG</span>
                </div>
              </div>
            </div>
          </div>

          {/* PYTHON NODE SCRIPT EXAMPLE */}
          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-900 dark:text-white">
                <Code className="h-3.5 w-3.5 text-amber-500" />
                <span>Circle Node Definition (Python 3.x)</span>
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `import fab.shapes\n\n# Define a set of input ports\n# (and inject variables into the local namespace)\ninput('x', float)\ninput('y', float)\ninput('r', float)\n\n# Call the 'circle' function in the standard shapes library\n# using the variables that came in from the input ports\nc = fab.shapes.circle(x, y, r)\n\n# Create an output port that produces the circle shape\noutput('shape', c)`,
                    'py-circle'
                  )
                }
                className="flex items-center gap-1 font-mono text-[11px] text-amber-600 hover:underline dark:text-amber-400"
              >
                {copiedKey === 'py-circle' ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedKey === 'py-circle' ? 'Copied' : 'Copy Python'}</span>
              </button>
            </div>

            <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200">
              <span className="text-purple-400">import</span> fab.shapes
              <br />
              <br />
              <span className="text-zinc-500"># Define a set of input ports</span>
              <br />
              <span className="text-zinc-500"># (and inject variables into the local namespace)</span>
              <br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'x'</span>,{' '}
              <span className="text-amber-400">float</span>)<br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'y'</span>,{' '}
              <span className="text-amber-400">float</span>)<br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'r'</span>,{' '}
              <span className="text-amber-400">float</span>)<br />
              <br />
              <span className="text-zinc-500"># Call the 'circle' function in the standard shapes library</span>
              <br />
              <span className="text-zinc-500"># using the variables that came in from the input ports</span>
              <br />
              c = fab.shapes.circle(x, y, r)
              <br />
              <br />
              <span className="text-zinc-500"># Create an output port that produces the circle shape</span>
              <br />
              <span className="text-sky-400">output</span>(<span className="text-emerald-400">'shape'</span>, c)
            </pre>
          </div>

          {/* TRACKING GIF & COMPLEX ASSEMBLIES */}
          <div className="grid grid-cols-1 items-start gap-6 border-t border-zinc-100 pt-4 dark:border-zinc-800 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Real-time Downstream Propagation</span>
              </h4>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Dragging sliders or typing new values updates dependent nodes instantly across all links.
              </p>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                <img
                  src="/antimony/docs/tracking.gif"
                  alt="Antimony live change propagation animated demonstration"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <Layers className="h-3.5 w-3.5 text-amber-500" />
                <span>Scaling to Complex Assemblies</span>
              </h4>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                The DAG architecture scales seamlessly from single components up to multi-part mechanical assemblies
                (e.g., the Kelvin clamp assembly).
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                  <img
                    src="/antimony/docs/big.png"
                    alt="Antimony Kelvin assembly graph"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                  <img
                    src="/antimony/docs/bigger.png"
                    alt="Antimony full multi-part assembly viewport"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AXIS 2: GEOMETRY ENGINE (CSG & F-REPS) */}
        <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                2. Geometry Engine (Functional Representations &amp; CSG)
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Implicit surfaces, pure mathematical booleans, and shaded bitmap viewport blitting
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Antimony&apos;s geometry engine uses{' '}
                <a
                  href="http://en.wikipedia.org/wiki/Function_representation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-600 underline dark:text-amber-400"
                >
                  functional representations (F-Reps)
                </a>{' '}
                for solid modeling. Solids are defined by implicit mathematical equations{' '}
                <code className="font-mono">f(x, y, z) &lt; 0</code>.
              </p>
              <p>
                This representation is uniquely suited for <strong>Constructive Solid Geometry (CSG)</strong>{' '}
                operations:
              </p>
              <ul className="list-inside list-disc space-y-1.5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                <li>
                  <strong className="text-amber-600 dark:text-amber-400">Union:</strong> <code>min(A, B)</code>
                </li>
                <li>
                  <strong className="text-amber-600 dark:text-amber-400">Intersection:</strong> <code>max(A, B)</code>
                </li>
                <li>
                  <strong className="text-amber-600 dark:text-amber-400">Difference:</strong> <code>max(A, -B)</code>
                </li>
              </ul>
              <p>
                In the application, the geometry engine renders shapes as shaded distance bitmaps which are then blitted
                directly to the interactive 3D viewport.
              </p>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-md dark:border-zinc-800">
                <img
                  src="/antimony/docs/csg.png"
                  alt="CSG Boolean example in Antimony"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/90 p-2.5 font-mono text-[11px] text-zinc-400">
                  <span>Exact Boolean Union &amp; Difference operations</span>
                  <span className="text-emerald-400">Zero Topological Errors</span>
                </div>
              </div>
            </div>
          </div>

          {/* APPLICATION VIEWPORT & STL SHARP FEATURE EXPORT */}
          <div className="grid grid-cols-1 gap-6 border-t border-zinc-100 pt-4 dark:border-zinc-800 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <Monitor className="h-3.5 w-3.5 text-amber-500" />
                <span>Real-time Shaded Bitmaps &amp; 3D Viewport</span>
              </h4>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Shapes are evaluated in parallel on CPU/GPU raymarchers and blitted cleanly as shaded bitmaps.
              </p>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                <img
                  src="/antimony/docs/app.png"
                  alt="Antimony Application UI with shaded viewport"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <Cpu className="h-3.5 w-3.5 text-amber-500" />
                <span>Sharp Feature Detection in .STL Export</span>
              </h4>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Antimony exports heightmaps for 2.5D CNC machining and watertight{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">.stl</code> files for 3D printing with
                feature detection algorithms that keep sharp edges crisp.
              </p>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                <img
                  src="/antimony/docs/export.png"
                  alt="Antimony STL export with sharp crease feature detection"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AXIS 3: STANDARD LIBRARY & BIDIRECTIONAL 3D UI HOOKS */}
        <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Shapes className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                3. Standard Library &amp; Bidirectional 3D UI Hooks (
                <code className="font-mono text-sm text-amber-600 dark:text-amber-400">sb.ui</code>)
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Direct on-screen manipulation handles wired back into Python node parameters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Antimony&apos;s standard library defines dozens of shapes and spatial transforms, from standard
                primitives (cube, cylinder, sphere, circle, rectangle) and booleans to exotic deformations like{' '}
                <span className="font-semibold text-zinc-900 dark:text-white">attract, repel, twist, and bend</span>.
              </p>
              <p>
                Crucially, node scripts can define <strong>interactive 3D UI features</strong> using the{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">sb.ui</code> module. Wireframes and
                draggable control points are drawn directly over the 3D model.
              </p>
              <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 dark:bg-amber-500/10">
                <span className="block font-bold text-zinc-900 dark:text-white">Bidirectional Viewport Dragging:</span>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                  These UI features are hooked back into the graph: dragging corner points or handles in the 3D viewport
                  pushes coordinate updates back into the node&apos;s Python input ports in real time!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-md dark:border-zinc-800">
                <img
                  src="/antimony/docs/dragging.gif"
                  alt="Interactive 3D UI handle dragging pushing changes back into node graph"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/90 p-2.5 font-mono text-[11px] text-zinc-400">
                  <span>Dragging 3D viewport handles updates node inputs</span>
                  <span className="text-amber-400">sb.ui Hooks</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECTANGLE SCRIPT WITH UI HOOKS */}
          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-900 dark:text-white">
                <Code className="h-3.5 w-3.5 text-amber-500" />
                <span>Rectangle Node with Viewport UI Handles (Python 3.x)</span>
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `import fab\n\ntitle('Rectangle')\n\ninput('xmin', float)\ninput('ymin', float)\ninput('xmax', float, 1)\ninput('ymax', float, 1)\n\noutput('shape', fab.shapes.rectangle(xmin, xmax, ymin, ymax))\n\n# UI: Wireframe boundary and interactive corner handles\nsb.ui.wireframe([(xmin, ymin, 0), (xmax, ymin, 0),\n                 (xmax, ymax, 0), (xmin, ymax, 0)], close=True)\nsb.ui.point(xmin, ymin, 0)\nsb.ui.point(xmax, ymax, 0)`,
                    'py-ui'
                  )
                }
                className="flex items-center gap-1 font-mono text-[11px] text-amber-600 hover:underline dark:text-amber-400"
              >
                {copiedKey === 'py-ui' ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedKey === 'py-ui' ? 'Copied' : 'Copy Python'}</span>
              </button>
            </div>

            <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200">
              <span className="text-purple-400">import</span> fab
              <br />
              <br />
              <span className="text-sky-400">title</span>(<span className="text-emerald-400">'Rectangle'</span>)<br />
              <br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'xmin'</span>,{' '}
              <span className="text-amber-400">float</span>)<br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'ymin'</span>,{' '}
              <span className="text-amber-400">float</span>)<br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'xmax'</span>,{' '}
              <span className="text-amber-400">float</span>, <span className="text-orange-400">1</span>)<br />
              <span className="text-sky-400">input</span>(<span className="text-emerald-400">'ymax'</span>,{' '}
              <span className="text-amber-400">float</span>, <span className="text-orange-400">1</span>)<br />
              <br />
              <span className="text-sky-400">output</span>(<span className="text-emerald-400">'shape'</span>,
              fab.shapes.rectangle(xmin, xmax, ymin, ymax))
              <br />
              <br />
              <span className="text-zinc-500"># Interactive 3D Viewport UI Handles (sb.ui)</span>
              <br />
              sb.ui.wireframe([
              <br />
              &nbsp;&nbsp;(xmin, ymin, <span className="text-orange-400">0</span>), (xmax, ymin,{' '}
              <span className="text-orange-400">0</span>),
              <br />
              &nbsp;&nbsp;(xmax, ymax, <span className="text-orange-400">0</span>), (xmin, ymax,{' '}
              <span className="text-orange-400">0</span>)<br />
              ], close=<span className="text-purple-400">True</span>)<br />
              sb.ui.point(xmin, ymin, <span className="text-orange-400">0</span>)<br />
              sb.ui.point(xmax, ymax, <span className="text-orange-400">0</span>)
            </pre>
          </div>
        </div>

        {/* UNDER THE HOOD: PREFIX STRING DISTANCE FIELD MATH */}
        <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Binary className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Under the Hood: Prefix String Distance Fields
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Prefix string serialization for lightning-fast parsing and AST evaluation
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              While most users will work with high-level shapes, custom shapes in Antimony can be defined through a{' '}
              <strong>prefix string syntax</strong> that is easy to parse, serializable without paren ambiguities, and
              fast for machine code generation.
            </p>
            <p>
              Here is the internal shape definition for the{' '}
              <code className="font-mono text-amber-600 dark:text-amber-400">circle(x0, y0, r)</code> shape:
            </p>

            <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200">
              <span className="text-purple-400">def</span> <span className="text-sky-400">circle</span>(x0, y0, r):
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> Shape(
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-emerald-400">'-r+q-Xf%gq-Yf%gf%g'</span> % (x0, y0, r),{' '}
              <span className="text-zinc-500"># prefix math string</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x0 - r, y0 - r, x0 + r, y0 + r){' '}
              <span className="text-zinc-500"># bounding box</span>
            </pre>

            <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <span className="mb-2 block font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  Hierarchical Prefix Tree Unpacking:
                </span>
                <pre className="font-mono text-[11px] leading-tight text-zinc-700 dark:text-zinc-300">
                  {`-
  r
    +
      q
        -
          X
          f%g
      q
        -
          Y
          f%g
  f%g
% (x, y, r)`}
                </pre>
                <p className="mt-2 text-[10px] text-zinc-500">
                  Where <code className="font-mono">q</code> is square, <code className="font-mono">r</code> is square
                  root, <code className="font-mono">X, Y</code> are coordinate axes, and{' '}
                  <code className="font-mono">f%g</code> is a floating point constant.
                </p>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:bg-amber-500/10">
                <div>
                  <span className="mb-2 block font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                    Signed Distance Field Formula:
                  </span>
                  <div className="my-2 rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-center font-mono text-xs text-amber-300 shadow-inner">
                    f(x, y) = &radic;((x - x&#8320;)&sup2; + (y - y&#8320;)&sup2;) - r
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Points where <code className="font-mono">f(x, y) &lt; 0</code> are inside the circle, points where{' '}
                    <code className="font-mono">f(x, y) = 0</code> define the exact mathematical boundary, and points
                    with <code className="font-mono">f(x, y) &gt; 0</code> represent Euclidean distance from the
                    boundary.
                  </p>
                </div>

                <a
                  href="https://www.mattkeeter.com/research/thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-amber-600 hover:underline dark:text-amber-400"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Documented in Appendix A of Matt Keeter&apos;s MIT Thesis</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* AUTOMATED BUILD & LAUNCH SCRIPTS                               */}
      {/* ============================================================== */}
      <div id="build" className="mx-auto mb-12 max-w-5xl space-y-6 px-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-3 border-b border-zinc-100 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
                <Terminal className="h-5 w-5 text-amber-500" />
                <span>Automated Build &amp; Launch Scripts</span>
              </h2>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                The repository includes turn-key automation scripts in the{' '}
                <code className="font-mono text-amber-600 dark:text-amber-400">scripts/</code> folder for automated
                dependency installation, compilation, packaging, and execution.
              </p>
            </div>

            <a
              href="https://github.com/roboter/antimony/tree/master/scripts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 self-start rounded-lg border border-zinc-300 px-3.5 py-2 font-mono text-xs font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 sm:self-auto"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Browse scripts/ on GitHub</span>
            </a>
          </div>

          <div className="space-y-6 pt-4 font-mono text-xs">
            {/* WINDOWS SCRIPTS */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 font-bold text-sky-600 dark:text-sky-400">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-sm font-bold text-zinc-900 dark:text-white">
                      Windows: build-windows.ps1 &amp; run-windows.ps1
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500">
                      Automated MSYS2 UCRT64 build &amp; DLL runtime setup
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `# 1. Clone repository\ngit clone --recursive https://github.com/roboter/antimony.git\ncd antimony\n\n# 2. Build Antimony (installs MSYS2 dependencies & compiles with Ninja)\n.\\scripts\\build-windows.ps1\n\n# 3. Launch Antimony (configures MSYS2 runtime PATH & starts antimony.exe)\n.\\scripts\\run-windows.ps1`,
                      'win-scripts'
                    )
                  }
                  className="flex items-center gap-1 self-start text-[11px] text-amber-600 hover:underline dark:text-amber-400 sm:self-auto"
                >
                  {copiedKey === 'win-scripts' ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedKey === 'win-scripts' ? 'Copied' : 'Copy PowerShell'}</span>
                </button>
              </div>

              <p className="mb-3 font-sans text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Requires{' '}
                <a
                  href="https://www.msys2.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline dark:text-sky-400"
                >
                  MSYS2
                </a>{' '}
                installed at <code className="font-mono text-zinc-800 dark:text-zinc-200">C:\msys64</code>. The script
                automatically installs <code className="font-mono">mingw-w64-ucrt-x86_64</code> toolchain packages (Qt5,
                Python, Boost, Libpng, CMake, Ninja, flex, lemon), configures with CMake, and builds the executable.
              </p>

              <div className="overflow-x-auto rounded-lg bg-zinc-950 p-3.5 text-[11px] leading-relaxed text-zinc-300">
                <span className="text-zinc-500"># 1. Clone repository</span>
                <br />
                git clone --recursive https://github.com/roboter/antimony.git
                <br />
                cd antimony
                <br />
                <br />
                <span className="text-zinc-500"># 2. Run automated build script</span>
                <br />
                .\scripts\build-windows.ps1
                <br />
                <br />
                <span className="text-zinc-500"># 3. Run Antimony with runtime DLL PATH injected</span>
                <br />
                .\scripts\run-windows.ps1
              </div>
            </div>

            {/* LINUX SCRIPTS */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 font-bold text-orange-600 dark:text-orange-400">
                    <LinuxIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-sm font-bold text-zinc-900 dark:text-white">
                      Linux: build-linux.sh
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500">
                      CMake &amp; Ninja automated build, Debian (.deb) &amp; standalone (.tar.gz) packaging
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `# 1. Clone repository\ngit clone --recursive https://github.com/roboter/antimony.git\ncd antimony\n\n# 2. Make scripts executable\nchmod +x scripts/*.sh\n\n# 3. Build Antimony (compiles with Ninja & generates packages)\n./scripts/build-linux.sh\n\n# 4. Install Debian package or extract standalone tarball\nsudo apt install ./dist/antimony-linux-amd64.deb`,
                      'linux-scripts'
                    )
                  }
                  className="flex items-center gap-1 self-start text-[11px] text-amber-600 hover:underline dark:text-amber-400 sm:self-auto"
                >
                  {copiedKey === 'linux-scripts' ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedKey === 'linux-scripts' ? 'Copied' : 'Copy Bash'}</span>
                </button>
              </div>

              <p className="mb-3 font-sans text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Requires standard development tools (
                <code className="font-mono">
                  cmake ninja-build g++ libqt5opengl5-dev qtbase5-dev libpng-dev python3-dev libboost-all-dev flex lemon
                </code>
                ). Compiles Antimony, stages runtime node and library assets, creates desktop launcher entries, and
                generates both a native Debian package (<code className="font-mono">antimony-linux-amd64.deb</code>) and
                a standalone tarball (<code className="font-mono">antimony-linux-x86_64.tar.gz</code>) in the{' '}
                <code className="font-mono">dist/</code> directory.
              </p>

              <div className="overflow-x-auto rounded-lg bg-zinc-950 p-3.5 text-[11px] leading-relaxed text-zinc-300">
                <span className="text-zinc-500"># 1. Clone repository</span>
                <br />
                git clone --recursive https://github.com/roboter/antimony.git
                <br />
                cd antimony
                <br />
                <br />
                <span className="text-zinc-500"># 2. Make scripts executable and build</span>
                <br />
                chmod +x scripts/*.sh
                <br />
                ./scripts/build-linux.sh
                <br />
                <br />
                <span className="text-zinc-500"># 3. Install Debian package or run standalone launcher</span>
                <br />
                sudo apt install ./dist/antimony-linux-amd64.deb
              </div>
            </div>

            {/* MACOS SCRIPTS */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-500/10 font-bold text-zinc-700 dark:text-zinc-300">
                    <Apple className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-sm font-bold text-zinc-900 dark:text-white">
                      macOS: build-mac.sh &amp; bundle-mac.sh
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500">
                      Homebrew dependency resolution, compilation &amp; DMG packaging
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `# 1. Clone repository\ngit clone --recursive https://github.com/roboter/antimony.git\ncd antimony\n\n# 2. Make scripts executable\nchmod +x scripts/*.sh\n\n# 3. Build Antimony (installs Homebrew dependencies & builds)\n./scripts/build-mac.sh\n\n# Optional: Build and package into antimony-mac.dmg\n./scripts/build-mac.sh --dmg\n\n# 4. Launch Antimony bundle\nopen build/app/Antimony.app`,
                      'mac-scripts'
                    )
                  }
                  className="flex items-center gap-1 self-start text-[11px] text-amber-600 hover:underline dark:text-amber-400 sm:self-auto"
                >
                  {copiedKey === 'mac-scripts' ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedKey === 'mac-scripts' ? 'Copied' : 'Copy Bash'}</span>
                </button>
              </div>

              <p className="mb-3 font-sans text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Requires{' '}
                <a
                  href="https://brew.sh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline dark:text-sky-400"
                >
                  Homebrew
                </a>
                . The script installs required formulas (
                <code className="font-mono">libpng boost-python3 qt@5 lemon flex ninja cmake dylibbundler</code>) and
                supports <code className="font-mono">--bundle</code> and <code className="font-mono">--dmg</code> flags.
              </p>

              <div className="overflow-x-auto rounded-lg bg-zinc-950 p-3.5 text-[11px] leading-relaxed text-zinc-300">
                <span className="text-zinc-500"># 1. Clone repository</span>
                <br />
                git clone --recursive https://github.com/roboter/antimony.git
                <br />
                cd antimony
                <br />
                <br />
                <span className="text-zinc-500"># 2. Make scripts executable and compile</span>
                <br />
                chmod +x scripts/*.sh
                <br />
                ./scripts/build-mac.sh
                <br />
                <br />
                <span className="text-zinc-500"># Or build and create antimony-mac.dmg:</span>
                <br />
                ./scripts/build-mac.sh --dmg
                <br />
                <br />
                <span className="text-zinc-500"># 3. Launch application bundle</span>
                <br />
                open build/app/Antimony.app
              </div>
            </div>

            {/* RUN CI LOCALLY SCRIPT */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 font-bold text-amber-600 dark:text-amber-400">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-sm font-bold text-zinc-900 dark:text-white">
                      Local CI Verification: run-ci-locally.ps1
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500">
                      Executes full continuous integration pipeline locally
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(`.\\scripts\\run-ci-locally.ps1`, 'ci-script')}
                  className="flex items-center gap-1 self-start text-[11px] text-amber-600 hover:underline dark:text-amber-400 sm:self-auto"
                >
                  {copiedKey === 'ci-script' ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedKey === 'ci-script' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="mb-3 font-sans text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Validates the build and test suites locally using the same script that executes in the GitHub Actions CI
                environment.
              </p>

              <div className="overflow-x-auto rounded-lg bg-zinc-950 p-3.5 text-[11px] leading-relaxed text-zinc-300">
                .\scripts\run-ci-locally.ps1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MIT CBA HERITAGE & LINEAGE                                     */}
      {/* ============================================================== */}
      <div id="heritage" className="mx-auto mb-12 max-w-5xl space-y-6 px-4">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                MIT Center for Bits and Atoms (CBA) Heritage
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Lineage from personal-scale digital fabrication workflows to mathematical CAD
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              Antimony grew out of Matt Keeter&apos;s research on powerful personal-scale CAD/CAM workflows at the{' '}
              <a
                href="http://cba.mit.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-600 underline dark:text-amber-400"
              >
                MIT Center for Bits and Atoms (CBA)
              </a>{' '}
              under Prof. Neil Gershenfeld.
            </p>
            <p>It represents the culmination of a sequence of experimental digital fabrication CAD tools:</p>

            <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="mb-1 block font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  1. cad_ui (2012)
                </span>
                <p className="text-[11px] leading-normal text-zinc-500">
                  Initial experimental geometric solver exploring non-traditional boundary representations.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="mb-1 block font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  2. kokopelli (2013)
                </span>
                <p className="text-[11px] leading-normal text-zinc-500">
                  Pure Python text-to-F-Rep CAD tool used extensively in MIT MAS.863 &ldquo;How to Make Almost
                  Anything&rdquo;.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5">
                <span className="mb-1 block font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                  3. Antimony &rarr; libfive
                </span>
                <p className="text-[11px] leading-normal text-zinc-600 dark:text-zinc-300">
                  Visual DAG UI combined with Python node scripts, later evolving into the modern{' '}
                  <code className="font-mono">libfive</code> geometric kernel.
                </p>
              </div>
            </div>

            <p>
              Antimony was featured in the 2015 edition of{' '}
              <a
                href="http://fabacademy.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 underline dark:text-amber-400"
              >
                Fab Academy
              </a>
              , demonstrating how makers and engineers can design complex parametric geometries without commercial CAD
              licenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
