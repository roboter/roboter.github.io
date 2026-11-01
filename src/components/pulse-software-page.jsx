import React, { useState, useEffect } from 'react';
import { Download, Star, GitBranch, Package, Archive, ExternalLink, Copy, Check, ChevronRight } from 'lucide-react';

const PulseSoftwarePage = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState({
    name: 'Cosmic Nebula (Wallhaven #4k-9821)',
    resolution: '3840 x 2160',
    provider: 'Wallhaven API v1',
    interval: '30 minutes',
    lastAction: 'Wallpaper updated automatically.',
    actionCount: 14,
    isBanned: false,
  });

  const [selectedType, setSelectedType] = useState('all');

  // Mock data for providers
  const providers = [
    {
      id: 'wallhaven',
      name: 'Wallhaven',
      type: 'input',
      source: 'wallhaven.cc',
      status: 'active',
      desc: 'Official REST API v1 integration supporting search keywords, categories (General/Anime/People), purity ratings, color filtering, and minimum screen resolutions.',
      tags: ['API v1', '4K / 8K', 'Color Filter', 'Tags Search'],
    },
    {
      id: 'local',
      name: 'Local Directory',
      type: 'input',
      source: 'Local Filesystem',
      status: 'active',
      desc: 'Recursively scans user-designated folders for JPG, PNG, and BMP images, rotating through local collections without requiring internet connectivity.',
      tags: ['Offline', 'Recursive', 'Zero-Latency'],
    },
    {
      id: 'apod',
      name: 'NASA APOD',
      type: 'input',
      source: 'apod.nasa.gov',
      status: 'active',
      desc: 'Scrapes the daily Astronomy Picture of the Day and its archive, parsing high-resolution cosmic imagery and metadata descriptions.',
      tags: ['Astrophotography', 'Deep Space', 'Archive Scraping'],
    },
    {
      id: 'mrss',
      name: 'Media RSS (MRSS)',
      type: 'input',
      source: 'DeviantArt & Custom RSS',
      status: 'active',
      desc: 'Consumes standard MediaRSS XML feeds from art communities and photo feeds, extracting full-size media enclosure tags.',
      tags: ['RSS / XML', 'DeviantArt', 'Syndication'],
    },
    {
      id: 'wallpaper-setter',
      name: 'Wallpaper Setter',
      type: 'output',
      source: 'Windows WinAPI',
      status: 'active',
      desc: 'Calls native SystemParametersInfo and IActiveDesktop interfaces via P/Invoke to instantly apply new backgrounds across single or multi-monitor setups.',
      tags: ['WinAPI P/Invoke', 'Multi-Monitor', 'Native'],
    },
    {
      id: 'piler',
      name: 'Piler Archiver',
      type: 'output',
      source: 'Local Storage',
      status: 'active',
      desc: 'Automatically archives downloaded wallpapers into organized folders so favorite images are saved permanently for future offline use.',
      tags: ['Auto-Archive', 'Storage Organiser'],
    },
    {
      id: 'logon',
      name: 'Logon Background',
      type: 'output',
      source: 'OEMBackground API',
      status: 'legacy',
      desc: 'Synchronizes the Windows 7 logon background screen with the current wallpaper using the OEMBackground registry mechanism.',
      tags: ['Windows 7', 'System Logon'],
    },
    {
      id: 'aero',
      name: 'Aero Glass Changer',
      type: 'output',
      source: 'DwmSetColorizationColor',
      status: 'legacy',
      desc: 'Dynamically samples the dominant color of the active wallpaper and tints Windows 7/8 Aero Glass window borders to match.',
      tags: ['Aero Glass', 'DWM Colorization'],
    },
    {
      id: 'google',
      name: 'Google Images',
      type: 'input',
      source: 'images.google.com',
      status: 'archived',
      desc: 'Legacy image scraper from original CodePlex release. Modern Google anti-bot and reCAPTCHA endpoints block automated scraping.',
      tags: ['Archived', 'Scraper'],
    },
    {
      id: 'natgeo',
      name: 'National Geographic',
      type: 'input',
      source: 'ngm.nationalgeographic.com',
      status: 'archived',
      desc: 'Legacy photo-of-the-day provider. Original NatGeo RSS endpoints were retired and return HTTP 403.',
      tags: ['Archived', 'Legacy Feed'],
    },
  ];

  const filteredProviders = selectedType === 'all' ? providers : providers.filter((p) => p.type === selectedType);

  const handleCopyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRandomImage = () => {
    const images = [
      { name: 'Aurora Borealis over Lofoten', res: '3840 x 2160', prov: 'Wallhaven API v1' },
      { name: 'NASA APOD: Pillars of Creation', res: '4096 x 2880', prov: 'NASA APOD Scraper' },
      { name: 'Mist over Alpine Ridge', res: '2560 x 1440', prov: 'Local Directory' },
      { name: 'Deep Space Infrared Webb', res: '3840 x 2160', prov: 'NASA APOD Scraper' },
      { name: 'Tokyo Neon Cyberpunk Rain', res: '3840 x 2160', prov: 'Wallhaven API v1' },
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage((prev) => ({
      ...prev,
      currentImage: randomImage.name,
      resolution: randomImage.res,
      provider: randomImage.prov,
      lastAction: `Switched wallpaper to: ${randomImage.name}`,
      actionCount: prev.actionCount + 1,
      isBanned: false,
    }));
  };

  const handleBanImage = () => {
    setCurrentImage((prev) => ({
      ...prev,
      lastAction: `Banned "${prev.currentImage}". Immediately fetching new wallpaper...`,
      currentImage: 'NASA APOD: Carina Nebula Panoramic',
      provider: 'NASA APOD Scraper',
      actionCount: prev.actionCount + 1,
      isBanned: true,
    }));
  };

  // Mock data for release info
  const mockRelease = {
    version: 'v0.0.1',
    size: '2.4 MB',
    publishedAt: new Date('2026-09-25').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    downloadUrl: 'https://github.com/roboter/pulse/releases/download/v0.0.1/Pulse-v0.0.1.zip',
    releaseUrl: 'https://github.com/roboter/pulse/releases/tag/v0.0.1',
    assetName: 'Pulse-v0.0.1.zip',
    sha256: 'd3b70c0892a35b1eb4b76df7268ec4faca068ddaff180e88b9bb587caa0da1b0',
    downloadCount: 1247,
  };

  return (
    <div className="relative w-full text-zinc-800 selection:bg-indigo-500 selection:text-white dark:text-zinc-100">
      {/* GitHub fork banner */}
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-36 w-36 overflow-hidden">
        <a
          href="https://github.com/roboter/pulse"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto absolute -right-10 top-7 block w-44 rotate-45 border-y border-white/20 bg-zinc-900 py-1.5 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:scale-105 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </a>
      </div>

      {/* Back to software catalog */}
      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Back to Software Catalog</span>
        </a>
      </div>

      {/* Main content */}
      <div className="relative overflow-hidden pb-10 pt-2">
        <div className="mx-auto max-w-4xl px-4 text-center">
          {/* Status badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-xs font-medium text-indigo-600 shadow-sm backdrop-blur-sm dark:text-indigo-400">
            <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-indigo-500"></div>
            <span>Pulse • Automated Wallpaper Engine</span>
            <span className="hidden rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-500 sm:inline-block">
              .NET 4.8 Maintained Fork
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            Fresh, High-Resolution Wallpapers
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 bg-clip-text text-transparent">
              {' '}
              On Your Own Terms
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            An open-source Windows application that automatically fetches and cycles gorgeous desktop backgrounds
            matching your screen resolution from
            <span className="font-semibold text-zinc-900 dark:text-white"> Wallhaven</span>,
            <span className="font-semibold text-zinc-900 dark:text-white"> NASA APOD</span>,
            <span className="font-semibold text-zinc-900 dark:text-white"> Media RSS</span>, and local folders.
          </p>

          {/* Key features */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <a
              href={mockRelease.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
              title={`${mockRelease.downloadCount} downloads on GitHub`}
            >
              <Download className="h-3.5 w-3.5" />
              <span>{mockRelease.version} Release</span>
              <span className="py-0.2 rounded-full bg-emerald-600/20 px-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                {mockRelease.downloadCount.toLocaleString('en-US')}{' '}
                {mockRelease.downloadCount === 1 ? 'download' : 'downloads'}
              </span>
            </a>

            <a
              href="https://github.com/roboter/pulse/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-zinc-700 transition-colors hover:border-indigo-500/50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <GitBranch className="h-3.5 w-3.5 text-amber-500" />
              <span>Fork on GitHub</span>
            </a>

            <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Archive className="h-3.5 w-3.5 text-emerald-500" />
              Windows 7 / 8 / 10 / 11
            </span>

            <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Package className="h-3.5 w-3.5 text-sky-500" />
              C# & WinForms (.NET 4.8)
            </span>

            <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Star className="h-3.5 w-3.5 text-purple-500" />
              Extensible Plugin Providers
            </span>
          </div>

          {/* Call to action buttons */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={mockRelease.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500"
            >
              <Download className="h-4 w-4" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-semibold">Download {mockRelease.version}</span>
                <span className="font-mono text-[11px] text-emerald-100 opacity-90">
                  {mockRelease.size} • {mockRelease.downloadCount.toLocaleString('en-US')}{' '}
                  {mockRelease.downloadCount === 1 ? 'download' : 'downloads'}
                </span>
              </div>
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href="https://github.com/roboter/pulse/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 font-medium text-white shadow transition-all hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <GitBranch className="h-4 w-4 text-amber-400 transition-transform group-hover:rotate-12" />
              <span>Fork me on GitHub</span>
            </a>

            <a
              href="https://github.com/roboter/pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-5 py-3 font-medium text-zinc-700 shadow transition-all hover:text-zinc-950 dark:border-zinc-600 dark:text-zinc-300 dark:hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Source</span>
            </a>
          </div>

          {/* Current image display */}
          <div className="mb-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Current Wallpaper Preview</h2>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex-1 text-left">
                <p className="mb-2">
                  <span className="font-semibold">Name:</span> {currentImage.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Resolution:</span> {currentImage.resolution}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Source:</span> {currentImage.provider}
                </p>
                <p>
                  <span className="font-semibold">Last Action:</span> {currentImage.lastAction}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleRandomImage}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Random Image
                </button>
                <button
                  onClick={handleBanImage}
                  className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  Ban Current Image
                </button>
              </div>
            </div>
          </div>

          {/* Architecture diagram */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Software Architecture</h2>
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <p className="mb-4">Pulse follows a modular architecture with:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <span className="font-semibold">Input Providers</span> - Fetch images from various sources (Wallhaven,
                  NASA APOD, local directories)
                </li>
                <li>
                  <span className="font-semibold">Processing Engine</span> - Handles image filtering and resolution
                  matching
                </li>
                <li>
                  <span className="font-semibold">Output Modules</span> - Apply wallpapers to desktop with multi-monitor
                  support
                </li>
                <li>
                  <span className="font-semibold">Configuration Manager</span> - Store user preferences and settings
                </li>
              </ul>
            </div>
          </div>

          {/* Providers section */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Supported Providers</h2>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`rounded-full px-3 py-1 text-sm ${selectedType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('input')}
                className={`rounded-full px-3 py-1 text-sm ${selectedType === 'input' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Input Providers
              </button>
              <button
                onClick={() => setSelectedType('output')}
                className={`rounded-full px-3 py-1 text-sm ${selectedType === 'output' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Output Modules
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-bold">{provider.name}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${provider.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : provider.status === 'legacy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                    >
                      {provider.status}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{provider.desc}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {provider.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Source: {provider.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseSoftwarePage;
