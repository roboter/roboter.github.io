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
  Workflow
} from 'lucide-react';

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
    version: '0.9.5',
    releaseUrl: 'https://github.com/roboter/antimony/releases/tag/0.9.5',
    windows: {
      name: 'antimony-windows.zip',
      size: '41.4 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.5/antimony-windows.zip',
      desc: 'Native Windows portable build with bundled Qt5, Python 3 runtime, and required dynamic libraries. Extract and double-click antimony.exe.'
    },
    macDmg: {
      name: 'antimony-mac.dmg',
      size: '37.9 MB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.5/antimony-mac.dmg',
      desc: 'Standard macOS Disk Image bundle. Open the DMG and drag Antimony.app into your Applications folder.'
    },
    macZip: {
      name: 'antimony-mac.zip',
      size: '704 KB',
      url: 'https://github.com/roboter/antimony/releases/download/0.9.5/antimony-mac.zip',
      desc: 'Compressed archive containing the macOS application bundle.'
    }
  };

  const videoSteps = [
    {
      time: '00:00',
      seconds: 0,
      label: 'Intro & Workspace Setup',
      desc: 'Initializing the Antimony node canvas, loading screwdriver.sb, and overviewing the 3D viewport.'
    },
    {
      time: '00:15',
      seconds: 15,
      label: '2D Sketch & Constraints',
      desc: 'Defining primitive parametric circles and rectangles with direct node parameter inputs.'
    },
    {
      time: '01:20',
      seconds: 80,
      label: 'Revolve & Extrude 3D',
      desc: 'Converting 2D distance fields into 3D bodies via functional revolution and linear extrusion.'
    },
    {
      time: '02:45',
      seconds: 165,
      label: 'Polar Array Fluting',
      desc: 'Arranging 6 radial grip flutes around the cylinder using the Iterate (polar) transformation node.'
    },
    {
      time: '03:40',
      seconds: 220,
      label: 'CSG Difference Boolean',
      desc: 'Subtracting flutes from the main screwdriver handle with instantaneous exact boolean operations.'
    },
    {
      time: '04:25',
      seconds: 265,
      label: 'Mesh Export & Verification',
      desc: 'Exporting the resulting solid geometry directly to an STL mesh and opening in fstl viewer.'
    }
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
          index: i
        };
      }
    }
    return {
      ...videoSteps[0],
      index: 0
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
    <div className="w-full text-zinc-800 dark:text-zinc-100 selection:bg-amber-500 selection:text-white relative">
      {/* GITHUB RIBBON */}
      <div className="fixed top-0 right-0 z-50 overflow-hidden w-36 h-36 pointer-events-none">
        <a
          href="https://github.com/roboter/antimony"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto block absolute top-7 -right-10 w-44 py-1.5 text-center text-[10px] font-bold font-mono tracking-wider uppercase text-white bg-zinc-900 dark:bg-amber-600 hover:bg-amber-500 shadow-xl rotate-45 border-y border-white/20 transition-all hover:scale-105"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </a>
      </div>

      {/* BREADCRUMB / BACK LINK */}
      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-600 dark:text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Software Catalog</span>
        </a>
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-2 pb-8">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono font-medium rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Antimony • Parametric Graph CAD</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold">
              Fork of mkeeter/antimony • Added Windows Build
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            CAD From A{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Parallel Universe
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-6">
            A computer-aided design (CAD) tool from a parallel universe in which CAD software evolved from <span className="font-semibold text-zinc-900 dark:text-white">Lisp machines rather than drafting tables</span>. Built on <span className="font-semibold text-zinc-900 dark:text-white">functional representations (Signed Distance Fields / F-Reps)</span> and <span className="font-semibold text-zinc-900 dark:text-white">Python 3 scripting</span>.
          </p>

          {/* BADGES & LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs font-mono">
            <a
              href="#downloads"
              className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>v{releases.version} Release</span>
            </a>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-sky-500" />
              <span>Windows (.zip)</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Apple className="w-3.5 h-3.5 text-zinc-400" />
              <span>macOS (.dmg)</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-amber-500" />
              <span>Signed Distance Fields</span>
            </span>
            <a
              href="https://github.com/roboter/antimony"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-1.5 transition-colors"
            >
              <GitFork className="w-3.5 h-3.5 text-amber-500" />
              <span>roboter/antimony</span>
            </a>
            <a
              href="https://www.mattkeeter.com/projects/antimony/3/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:text-amber-500 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Matt Keeter (Original Author)</span>
            </a>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <a
              href={releases.windows.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 group"
            >
              <Monitor className="w-4 h-4" />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold text-sm">Download for Windows</span>
                <span className="text-[10px] text-emerald-100 opacity-90 font-mono">
                  {releases.windows.name} • {releases.windows.size}
                </span>
              </div>
              <Download className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href={releases.macDmg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow transition-all flex items-center gap-2 group"
            >
              <Apple className="w-4 h-4" />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold text-sm">Download for macOS</span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {releases.macDmg.name} • {releases.macDmg.size}
                </span>
              </div>
              <Download className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/roboter/antimony"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all flex items-center gap-2"
            >
              <GitFork className="w-4 h-4 text-amber-500" />
              <span>GitHub Fork</span>
            </a>
          </div>
        </div>

        {/* FORK NOTICE BANNER */}
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 shadow-sm flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm">
              <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 text-base">
                <span>Fork Notice: Added Windows Build</span>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  v0.9.5 Ready
                </span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                This repository is a fork of Matt Keeter&apos;s <a href="https://github.com/mkeeter/antimony" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-600 dark:text-amber-400 underline hover:no-underline">Antimony</a>. <strong>It is a fork where I added Windows build support</strong>, resolving MSVC/MinGW toolchain dependencies and providing portable pre-compiled Windows zip packages alongside the macOS releases.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
                <a
                  href={releases.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Release v0.9.5 on GitHub</span>
                </a>
                <span className="text-zinc-400">•</span>
                <a
                  href="https://github.com/mkeeter/antimony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:underline"
                >
                  Original Upstream (mkeeter/antimony)
                </a>
                <span className="text-zinc-400">•</span>
                <a
                  href="https://www.mattkeeter.com/projects/antimony/3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Matt Keeter Antimony Part 3 Article
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED DEMO VIDEO */}
        <div id="antimony-video-player" className="max-w-5xl mx-auto px-4 mb-10 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-950">
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 font-medium text-zinc-300">
                  antimony — screwdriver.sb (Modeling Session Demo)
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">1152 x 720 • 4m 44s Demo</span>
            </div>

            {/* Video Player Container */}
            <div className="relative bg-black flex items-center justify-center">
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
                className="w-full h-auto max-h-[720px] object-contain shadow-inner"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>

            {/* Interactive Chapter Timeline Track */}
            <div className="relative w-full bg-zinc-950 px-4 py-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1.5">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>Interactive Chapter Timeline</span>
                </span>
                <span className="text-zinc-400 font-semibold">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Segmented Timeline */}
              <div
                className="relative w-full h-2.5 rounded-full bg-zinc-800 flex overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  handleJumpToStep(pos * (duration || 284));
                }}
                title="Click anywhere to seek on timeline"
              >
                {/* Progress fill */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-400 z-10 transition-all duration-150 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 284)) * 100))}%` }}
                />

                {/* Chapter milestone ticks */}
                {videoSteps.map((step) => {
                  const leftPercent = (step.seconds / (duration || 284)) * 100;
                  return (
                    <div
                      key={step.time}
                      className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-20 hover:bg-white transition-colors"
                      style={{ left: `${leftPercent}%` }}
                      title={`${step.time} • ${step.label}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Video Player Statusbar */}
            <div className="p-3 sm:p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-zinc-400 font-mono">
              {/* Current Section Live Indicator */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    {isPlaying && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isPlaying ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-zinc-500'
                      }`}
                    ></span>
                  </span>
                  <span className="text-zinc-300 text-xs font-sans">
                    Section:{' '}
                    <strong className="text-white font-bold font-sans">
                      {currentStep.label}
                    </strong>
                  </span>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    {currentStep.time}
                  </span>
                </div>

                <span className="text-zinc-500 text-[11px]">
                  (Chapter {currentStep.index + 1} of {videoSteps.length})
                </span>
              </div>

              {/* Quick Jump Chapter Pills in Statusbar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
                  Jump:
                </span>
                {videoSteps.map((step, idx) => {
                  const isCurrent = currentStep.index === idx;
                  return (
                    <button
                      key={step.time}
                      type="button"
                      onClick={() => handleJumpToStep(step.seconds)}
                      className={`px-2 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 ${
                        isCurrent
                          ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                          : 'bg-zinc-800/90 text-zinc-400 hover:text-white hover:bg-zinc-700'
                      }`}
                      title={`Seek to ${step.time} — ${step.label}`}
                    >
                      {isCurrent && <Play className="w-2.5 h-2.5 fill-current" />}
                      <span>{step.time}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handleJumpToStep(0)}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition ml-1"
                  title="Restart from beginning (00:00)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* TIMELINE ANNOTATIONS (CLICKABLE WORKFLOW CARDS) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Screwdriver Modeling Session Workflow</span>
              </h2>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" />
                <span>Click any step below to jump directly to that section in the video</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {videoSteps.map((step, idx) => {
                const isCurrent = currentStep.index === idx;
                return (
                  <button
                    key={step.time}
                    type="button"
                    onClick={() => handleJumpToStep(step.seconds)}
                    className={`p-4 rounded-xl border text-left transition-all group relative cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50 scale-[1.01]'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-amber-500/50 hover:bg-amber-500/5 dark:hover:bg-zinc-800/80 shadow-sm hover:scale-[1.01]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-xs text-zinc-900 dark:text-white flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold transition-colors ${
                            isCurrent
                              ? 'bg-amber-500 text-zinc-950'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-amber-500 group-hover:text-zinc-950'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{step.label}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse"></span>
                              <span>ACTIVE</span>
                            </span>
                          )}
                          <span
                            className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border transition-colors ${
                              isCurrent
                                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:border-amber-500/20'
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {step.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isCurrent ? 'Currently Playing' : `Jump to ${step.time}`}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PRESS & COMMUNITY COVERAGE */}
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                    Press &amp; Community Discussion
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Articles, interviews, and community reactions from Hacker News &amp; Hackaday
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 self-start sm:self-auto">
                Media &amp; Community
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <a
                href="http://hackaday.com/2015/05/29/otherworldy-cad-software-hails-from-a-parallel-universe/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                    HACKADAY
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1 group-hover:text-amber-500 transition">
                  &ldquo;Otherworldly CAD Software Hails From a Parallel Universe&rdquo;
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Hackaday featured Antimony&apos;s node-based modeling paradigm and functional representation approach to CAD.
                </p>
              </a>

              <a
                href="https://librearts.org/2015/05/introducing-antimony-node-based-cad-application/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                    LIBRE GRAPHICS WORLD
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1 group-hover:text-amber-500 transition">
                  &ldquo;Introducing Antimony, Node-Based CAD Application&rdquo;
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Detailed interview with Matt Keeter exploring the intersection of Lisp programming, graph UX, and math solids.
                </p>
              </a>

              <a
                href="https://news.ycombinator.com/item?id=9623609"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:border-amber-500/40 hover:bg-amber-500/5 transition group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400 text-[11px]">
                    HACKER NEWS
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1 group-hover:text-amber-500 transition">
                  Hacker News Discussion (Show HN)
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Discussion of mathematical solid representations, performance comparisons with OpenSCAD, and implicit surface modeling.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DOWNLOADS & RELEASES                                           */}
        {/* ============================================================== */}
        <div id="downloads" className="max-w-5xl mx-auto px-4 mb-12 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-xl text-zinc-900 dark:text-white">
                    Antimony Release {releases.version}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Latest Release
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                  Official Windows &amp; macOS binaries hosted on GitHub Releases
                </p>
              </div>

              <a
                href={releases.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs font-mono font-medium flex items-center gap-1.5 transition text-zinc-700 dark:text-zinc-300 self-start sm:self-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* DOWNLOAD CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {/* WINDOWS CARD */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                        <Monitor className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                          Windows Build
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {releases.windows.name} • {releases.windows.size}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                      Added in Fork
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {releases.windows.desc}
                  </p>
                </div>

                <a
                  href={releases.windows.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {releases.windows.name} ({releases.windows.size})</span>
                </a>
              </div>

              {/* MACOS CARD */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                        <Apple className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                          macOS Disk Image (DMG)
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {releases.macDmg.name} • {releases.macDmg.size}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      Apple DMG
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {releases.macDmg.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={releases.macDmg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .DMG ({releases.macDmg.size})</span>
                  </a>
                  <a
                    href={releases.macZip.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition"
                    title="Download as ZIP (704 KB)"
                  >
                    <span>.ZIP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* QUICK INSTRUCTIONS */}
            <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs">
              <span className="font-bold text-zinc-900 dark:text-white block mb-1">
                💡 Running Antimony on Windows:
              </span>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Extract <code className="font-mono text-amber-600 dark:text-amber-400">antimony-windows.zip</code> to any directory. No registry installation required. Double click <code className="font-mono text-amber-600 dark:text-amber-400">antimony.exe</code> to start modeling. If you encounter any missing runtime dependencies, you can also build from source using the scripts in the automated build section below.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CORE FOUNDATIONS (FROM MATT KEETER'S ANTIMONY 3 ARTICLE)       */}
        {/* ============================================================== */}
        <div id="foundations" className="max-w-5xl mx-auto px-4 mb-12 space-y-10">
          {/* INTRO QUOTE */}
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <blockquote className="text-base sm:text-lg italic font-medium text-zinc-900 dark:text-white leading-relaxed">
                  &ldquo;Antimony is a computer-aided design (CAD) tool from a parallel universe in which CAD software evolved from Lisp machines rather than drafting tables.&rdquo;
                </blockquote>
                <div className="mt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <span>— Matthew Keeter</span>
                  <span>•</span>
                  <a
                    href="https://www.mattkeeter.com/projects/antimony/3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read original project writeup (Antimony 3)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* THREE FOUNDATIONS OVERVIEW */}
          <div>
            <div className="mb-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                Architectural Pillars
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                The Three Mostly-Orthogonal Axes
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Unlike traditional monolithic CAD programs, Antimony is decomposed cleanly into three decoupled subsystems:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                    <Network className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                    1. Directed Acyclic Graph
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Information flow engine tracking dependencies, parameter inputs, and propagating edits downstream automatically.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 mt-3 block">
                  Graph Engine &rarr;
                </span>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                    <Box className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                    2. Geometry Engine (CSG)
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Solid modeling using functional representations (F-Reps) where boolean unions, intersections, and subtractions are mathematically exact.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-3 block">
                  Functional Math &rarr;
                </span>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                    <Shapes className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                    3. Standard Library &amp; UI
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Rich shapes and spatial transforms with bidirectional 3D UI hooks that allow interactive direct manipulation in viewport.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-3 block">
                  Python + UI Hooks &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* AXIS 1: GRAPH ENGINE */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  1. Graph Engine (DAG &amp; Scripted Nodes)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Directed acyclic graph tracking parameter flow and topological changes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <p>
                  Solid modeling in Antimony is performed by connecting nodes in a graph. Nodes typically represent primitive shapes (circles, cubes, cylinders) or transformations (extrusions, sweeps, rotations, CSG booleans).
                </p>
                <p>
                  Each node is defined by a <strong>customizable Python 3 script</strong> augmented with a few special keywords like <code className="font-mono text-amber-600 dark:text-amber-400">input()</code> and <code className="font-mono text-amber-600 dark:text-amber-400">output()</code> that declare ports and inject variables into the script namespace.
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white block">
                    Automatic Downstream Change Propagation:
                  </span>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    When any port value or node script changes, Antimony tracks the dependency graph and instantly recalculates only the affected downstream nodes, ensuring high performance even in deep DAG trees.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md">
                  <img
                    src="/antimony/docs/graph.png"
                    alt="Antimony Node Graph connections"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="p-2.5 bg-zinc-900/90 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Node graph connecting circle shape and parameters</span>
                    <span className="text-amber-400">Antimony DAG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PYTHON NODE SCRIPT EXAMPLE */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-500" />
                  <span>Circle Node Definition (Python 3.x)</span>
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import fab.shapes\n\n# Define a set of input ports\n# (and inject variables into the local namespace)\ninput('x', float)\ninput('y', float)\ninput('r', float)\n\n# Call the 'circle' function in the standard shapes library\n# using the variables that came in from the input ports\nc = fab.shapes.circle(x, y, r)\n\n# Create an output port that produces the circle shape\noutput('shape', c)`,
                      'py-circle'
                    )
                  }
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px] font-mono"
                >
                  {copiedKey === 'py-circle' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'py-circle' ? 'Copied' : 'Copy Python'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <span className="text-purple-400">import</span> fab.shapes<br /><br />
                <span className="text-zinc-500"># Define a set of input ports</span><br />
                <span className="text-zinc-500"># (and inject variables into the local namespace)</span><br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'x'</span>, <span className="text-amber-400">float</span>)<br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'y'</span>, <span className="text-amber-400">float</span>)<br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'r'</span>, <span className="text-amber-400">float</span>)<br /><br />
                <span className="text-zinc-500"># Call the 'circle' function in the standard shapes library</span><br />
                <span className="text-zinc-500"># using the variables that came in from the input ports</span><br />
                c = fab.shapes.circle(x, y, r)<br /><br />
                <span className="text-zinc-500"># Create an output port that produces the circle shape</span><br />
                <span className="text-sky-400">output</span>(<span className="text-emerald-400">'shape'</span>, c)
              </pre>
            </div>

            {/* TRACKING GIF & COMPLEX ASSEMBLIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 items-start">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Real-time Downstream Propagation</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Dragging sliders or typing new values updates dependent nodes instantly across all links.
                </p>
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <img
                    src="/antimony/docs/tracking.gif"
                    alt="Antimony live change propagation animated demonstration"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Scaling to Complex Assemblies</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The DAG architecture scales seamlessly from single components up to multi-part mechanical assemblies (e.g., the Kelvin clamp assembly).
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                    <img
                      src="/antimony/docs/big.png"
                      alt="Antimony Kelvin assembly graph"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                    <img
                      src="/antimony/docs/bigger.png"
                      alt="Antimony full multi-part assembly viewport"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AXIS 2: GEOMETRY ENGINE (CSG & F-REPS) */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  2. Geometry Engine (Functional Representations &amp; CSG)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Implicit surfaces, pure mathematical booleans, and shaded bitmap viewport blitting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <p>
                  Antimony&apos;s geometry engine uses <a href="http://en.wikipedia.org/wiki/Function_representation" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-600 dark:text-amber-400 underline">functional representations (F-Reps)</a> for solid modeling. Solids are defined by implicit mathematical equations <code className="font-mono">f(x, y, z) &lt; 0</code>.
                </p>
                <p>
                  This representation is uniquely suited for <strong>Constructive Solid Geometry (CSG)</strong> operations:
                </p>
                <ul className="space-y-1.5 list-disc list-inside font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                  <li><strong className="text-amber-600 dark:text-amber-400">Union:</strong> <code>min(A, B)</code></li>
                  <li><strong className="text-amber-600 dark:text-amber-400">Intersection:</strong> <code>max(A, B)</code></li>
                  <li><strong className="text-amber-600 dark:text-amber-400">Difference:</strong> <code>max(A, -B)</code></li>
                </ul>
                <p>
                  In the application, the geometry engine renders shapes as shaded distance bitmaps which are then blitted directly to the interactive 3D viewport.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md">
                  <img
                    src="/antimony/docs/csg.png"
                    alt="CSG Boolean example in Antimony"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="p-2.5 bg-zinc-900/90 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Exact Boolean Union &amp; Difference operations</span>
                    <span className="text-emerald-400">Zero Topological Errors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* APPLICATION VIEWPORT & STL SHARP FEATURE EXPORT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5 text-amber-500" />
                  <span>Real-time Shaded Bitmaps &amp; 3D Viewport</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Shapes are evaluated in parallel on CPU/GPU raymarchers and blitted cleanly as shaded bitmaps.
                </p>
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <img
                    src="/antimony/docs/app.png"
                    alt="Antimony Application UI with shaded viewport"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sharp Feature Detection in .STL Export</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Antimony exports heightmaps for 2.5D CNC machining and watertight <code className="font-mono text-amber-600 dark:text-amber-400">.stl</code> files for 3D printing with feature detection algorithms that keep sharp edges crisp.
                </p>
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <img
                    src="/antimony/docs/export.png"
                    alt="Antimony STL export with sharp crease feature detection"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AXIS 3: STANDARD LIBRARY & BIDIRECTIONAL 3D UI HOOKS */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Shapes className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  3. Standard Library &amp; Bidirectional 3D UI Hooks (<code className="font-mono text-sm text-amber-600 dark:text-amber-400">sb.ui</code>)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Direct on-screen manipulation handles wired back into Python node parameters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <p>
                  Antimony&apos;s standard library defines dozens of shapes and spatial transforms, from standard primitives (cube, cylinder, sphere, circle, rectangle) and booleans to exotic deformations like <span className="font-semibold text-zinc-900 dark:text-white">attract, repel, twist, and bend</span>.
                </p>
                <p>
                  Crucially, node scripts can define <strong>interactive 3D UI features</strong> using the <code className="font-mono text-amber-600 dark:text-amber-400">sb.ui</code> module. Wireframes and draggable control points are drawn directly over the 3D model.
                </p>
                <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <span className="font-bold text-zinc-900 dark:text-white block">
                    Bidirectional Viewport Dragging:
                  </span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                    These UI features are hooked back into the graph: dragging corner points or handles in the 3D viewport pushes coordinate updates back into the node&apos;s Python input ports in real time!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md">
                  <img
                    src="/antimony/docs/dragging.gif"
                    alt="Interactive 3D UI handle dragging pushing changes back into node graph"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="p-2.5 bg-zinc-900/90 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Dragging 3D viewport handles updates node inputs</span>
                    <span className="text-amber-400">sb.ui Hooks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RECTANGLE SCRIPT WITH UI HOOKS */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rectangle Node with Viewport UI Handles (Python 3.x)</span>
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import fab\n\ntitle('Rectangle')\n\ninput('xmin', float)\ninput('ymin', float)\ninput('xmax', float, 1)\ninput('ymax', float, 1)\n\noutput('shape', fab.shapes.rectangle(xmin, xmax, ymin, ymax))\n\n# UI: Wireframe boundary and interactive corner handles\nsb.ui.wireframe([(xmin, ymin, 0), (xmax, ymin, 0),\n                 (xmax, ymax, 0), (xmin, ymax, 0)], close=True)\nsb.ui.point(xmin, ymin, 0)\nsb.ui.point(xmax, ymax, 0)`,
                      'py-ui'
                    )
                  }
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px] font-mono"
                >
                  {copiedKey === 'py-ui' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'py-ui' ? 'Copied' : 'Copy Python'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <span className="text-purple-400">import</span> fab<br /><br />
                <span className="text-sky-400">title</span>(<span className="text-emerald-400">'Rectangle'</span>)<br /><br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'xmin'</span>, <span className="text-amber-400">float</span>)<br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'ymin'</span>, <span className="text-amber-400">float</span>)<br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'xmax'</span>, <span className="text-amber-400">float</span>, <span className="text-orange-400">1</span>)<br />
                <span className="text-sky-400">input</span>(<span className="text-emerald-400">'ymax'</span>, <span className="text-amber-400">float</span>, <span className="text-orange-400">1</span>)<br /><br />
                <span className="text-sky-400">output</span>(<span className="text-emerald-400">'shape'</span>, fab.shapes.rectangle(xmin, xmax, ymin, ymax))<br /><br />
                <span className="text-zinc-500"># Interactive 3D Viewport UI Handles (sb.ui)</span><br />
                sb.ui.wireframe([<br />
                &nbsp;&nbsp;(xmin, ymin, <span className="text-orange-400">0</span>), (xmax, ymin, <span className="text-orange-400">0</span>),<br />
                &nbsp;&nbsp;(xmax, ymax, <span className="text-orange-400">0</span>), (xmin, ymax, <span className="text-orange-400">0</span>)<br />
                ], close=<span className="text-purple-400">True</span>)<br />
                sb.ui.point(xmin, ymin, <span className="text-orange-400">0</span>)<br />
                sb.ui.point(xmax, ymax, <span className="text-orange-400">0</span>)
              </pre>
            </div>
          </div>

          {/* UNDER THE HOOD: PREFIX STRING DISTANCE FIELD MATH */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Under the Hood: Prefix String Distance Fields
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Prefix string serialization for lightning-fast parsing and AST evaluation
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                While most users will work with high-level shapes, custom shapes in Antimony can be defined through a <strong>prefix string syntax</strong> that is easy to parse, serializable without paren ambiguities, and fast for machine code generation.
              </p>
              <p>
                Here is the internal shape definition for the <code className="font-mono text-amber-600 dark:text-amber-400">circle(x0, y0, r)</code> shape:
              </p>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <span className="text-purple-400">def</span> <span className="text-sky-400">circle</span>(x0, y0, r):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> Shape(<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'-r+q-Xf%gq-Yf%gf%g'</span> % (x0, y0, r), <span className="text-zinc-500"># prefix math string</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x0 - r, y0 - r, x0 + r, y0 + r)     <span className="text-zinc-500"># bounding box</span>
              </pre>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold text-xs font-mono text-zinc-900 dark:text-white block mb-2">
                    Hierarchical Prefix Tree Unpacking:
                  </span>
                  <pre className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300 leading-tight">
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
                  <p className="text-[10px] text-zinc-500 mt-2">
                    Where <code className="font-mono">q</code> is square, <code className="font-mono">r</code> is square root, <code className="font-mono">X, Y</code> are coordinate axes, and <code className="font-mono">f%g</code> is a floating point constant.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-xs font-mono text-amber-600 dark:text-amber-400 block mb-2">
                      Signed Distance Field Formula:
                    </span>
                    <div className="p-3 rounded-lg bg-zinc-900 text-amber-300 font-mono text-xs text-center border border-zinc-800 my-2 shadow-inner">
                      f(x, y) = &radic;((x - x&#8320;)&sup2; + (y - y&#8320;)&sup2;) - r
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      Points where <code className="font-mono">f(x, y) &lt; 0</code> are inside the circle, points where <code className="font-mono">f(x, y) = 0</code> define the exact mathematical boundary, and points with <code className="font-mono">f(x, y) &gt; 0</code> represent Euclidean distance from the boundary.
                    </p>
                  </div>

                  <a
                    href="https://www.mattkeeter.com/research/thesis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[11px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
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
        <div id="build" className="max-w-5xl mx-auto px-4 mb-12 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-amber-500" />
                  <span>Automated Build &amp; Launch Scripts</span>
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  The repository includes turn-key automation scripts in the <code className="font-mono text-amber-600 dark:text-amber-400">scripts/</code> folder for automated dependency installation, compilation, packaging, and execution.
                </p>
              </div>

              <a
                href="https://github.com/roboter/antimony/tree/master/scripts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs font-mono font-medium flex items-center gap-1.5 transition text-zinc-700 dark:text-zinc-300 self-start sm:self-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Browse scripts/ on GitHub</span>
              </a>
            </div>

            <div className="space-y-6 pt-4 text-xs font-mono">
              {/* WINDOWS SCRIPTS */}
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans block">
                        Windows: build-windows.ps1 &amp; run-windows.ps1
                      </span>
                      <span className="text-[11px] text-zinc-500 font-sans">
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
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px] self-start sm:self-auto"
                  >
                    {copiedKey === 'win-scripts' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'win-scripts' ? 'Copied' : 'Copy PowerShell'}</span>
                  </button>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed mb-3">
                  Requires <a href="https://www.msys2.org/" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 underline">MSYS2</a> installed at <code className="font-mono text-zinc-800 dark:text-zinc-200">C:\msys64</code>. The script automatically installs <code className="font-mono">mingw-w64-ucrt-x86_64</code> toolchain packages (Qt5, Python, Boost, Libpng, CMake, Ninja, flex, lemon), configures with CMake, and builds the executable.
                </p>

                <div className="rounded-lg bg-zinc-950 p-3.5 text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                  <span className="text-zinc-500"># 1. Clone repository</span><br />
                  git clone --recursive https://github.com/roboter/antimony.git<br />
                  cd antimony<br /><br />
                  <span className="text-zinc-500"># 2. Run automated build script</span><br />
                  .\scripts\build-windows.ps1<br /><br />
                  <span className="text-zinc-500"># 3. Run Antimony with runtime DLL PATH injected</span><br />
                  .\scripts\run-windows.ps1
                </div>
              </div>

              {/* MACOS SCRIPTS */}
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-bold">
                      <Apple className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans block">
                        macOS: build-mac.sh &amp; bundle-mac.sh
                      </span>
                      <span className="text-[11px] text-zinc-500 font-sans">
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
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px] self-start sm:self-auto"
                  >
                    {copiedKey === 'mac-scripts' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'mac-scripts' ? 'Copied' : 'Copy Bash'}</span>
                  </button>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed mb-3">
                  Requires <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 underline">Homebrew</a>. The script installs required formulas (<code className="font-mono">libpng boost-python3 qt@5 lemon flex ninja cmake dylibbundler</code>) and supports <code className="font-mono">--bundle</code> and <code className="font-mono">--dmg</code> flags.
                </p>

                <div className="rounded-lg bg-zinc-950 p-3.5 text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                  <span className="text-zinc-500"># 1. Clone repository</span><br />
                  git clone --recursive https://github.com/roboter/antimony.git<br />
                  cd antimony<br /><br />
                  <span className="text-zinc-500"># 2. Make scripts executable and compile</span><br />
                  chmod +x scripts/*.sh<br />
                  ./scripts/build-mac.sh<br /><br />
                  <span className="text-zinc-500"># Or build and create antimony-mac.dmg:</span><br />
                  ./scripts/build-mac.sh --dmg<br /><br />
                  <span className="text-zinc-500"># 3. Launch application bundle</span><br />
                  open build/app/Antimony.app
                </div>
              </div>

              {/* RUN CI LOCALLY SCRIPT */}
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans block">
                        Local CI Verification: run-ci-locally.ps1
                      </span>
                      <span className="text-[11px] text-zinc-500 font-sans">
                        Executes full continuous integration pipeline locally
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      copyToClipboard(`.\\scripts\\run-ci-locally.ps1`, 'ci-script')
                    }
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px] self-start sm:self-auto"
                  >
                    {copiedKey === 'ci-script' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ci-script' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed mb-3">
                  Validates the build and test suites locally using the same script that executes in the GitHub Actions CI environment.
                </p>

                <div className="rounded-lg bg-zinc-950 p-3.5 text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                  .\scripts\run-ci-locally.ps1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MIT CBA HERITAGE & LINEAGE                                     */}
        {/* ============================================================== */}
        <div id="heritage" className="max-w-5xl mx-auto px-4 mb-12 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  MIT Center for Bits and Atoms (CBA) Heritage
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Lineage from personal-scale digital fabrication workflows to mathematical CAD
                </p>
              </div>
            </div>

            <div className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-3">
              <p>
                Antimony grew out of Matt Keeter&apos;s research on powerful personal-scale CAD/CAM workflows at the <a href="http://cba.mit.edu" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-600 dark:text-amber-400 underline">MIT Center for Bits and Atoms (CBA)</a> under Prof. Neil Gershenfeld.
              </p>
              <p>
                It represents the culmination of a sequence of experimental digital fabrication CAD tools:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 block mb-1">
                    1. cad_ui (2012)
                  </span>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Initial experimental geometric solver exploring non-traditional boundary representations.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 block mb-1">
                    2. kokopelli (2013)
                  </span>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Pure Python text-to-F-Rep CAD tool used extensively in MIT MAS.863 &ldquo;How to Make Almost Anything&rdquo;.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="font-mono font-bold text-xs text-amber-700 dark:text-amber-300 block mb-1">
                    3. Antimony &rarr; libfive
                  </span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-normal">
                    Visual DAG UI combined with Python node scripts, later evolving into the modern <code className="font-mono">libfive</code> geometric kernel.
                  </p>
                </div>
              </div>

              <p>
                Antimony was featured in the 2015 edition of <a href="http://fabacademy.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 underline">Fab Academy</a>, demonstrating how makers and engineers can design complex parametric geometries without commercial CAD licenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
