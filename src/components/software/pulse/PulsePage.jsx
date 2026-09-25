import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  ExternalLink,
  Image as ImageIcon,
  RefreshCw,
  Monitor,
  Terminal,
  Layers,
  Folder,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Copy,
  Check,
  Settings,
  Ban,
  ArrowRight,
  ArrowLeft,
  Search,
  Sliders,
  Code,
  Newspaper,
  HardDrive,
  Cpu,
  BookmarkCheck,
  ShieldAlert
} from 'lucide-react';

export default function PulsePage() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'providers' | 'tray' | 'architecture' | 'build'
  const [providerFilter, setProviderFilter] = useState('all'); // 'all' | 'input' | 'output'
  const [activeArchNode, setActiveArchNode] = useState('base');
  const [buildMode, setBuildMode] = useState('cli'); // 'cli' | 'vs'
  const [copiedKey, setCopiedKey] = useState(null);

  // Tray Simulator State
  const [trayStatus, setTrayStatus] = useState({
    currentImage: 'Cosmic Nebula (Wallhaven #4k-9821)',
    resolution: '3840 x 2160',
    provider: 'Wallhaven API v1',
    interval: '30 minutes',
    lastAction: 'Wallpaper updated automatically.',
    actionCount: 14,
    isBanned: false
  });

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleTrayNext = () => {
    const samples = [
      { name: 'Aurora Borealis over Lofoten', res: '3840 x 2160', prov: 'Wallhaven API v1' },
      { name: 'NASA APOD: Pillars of Creation', res: '4096 x 2880', prov: 'NASA APOD Scraper' },
      { name: 'Mist over Alpine Ridge', res: '2560 x 1440', prov: 'Local Directory' },
      { name: 'Deep Space Infrared Webb', res: '3840 x 2160', prov: 'NASA APOD Scraper' },
      { name: 'Tokyo Neon Cyberpunk Rain', res: '3840 x 2160', prov: 'Wallhaven API v1' }
    ];
    const next = samples[Math.floor(Math.random() * samples.length)];
    setTrayStatus((prev) => ({
      ...prev,
      currentImage: next.name,
      resolution: next.res,
      provider: next.prov,
      lastAction: `Switched wallpaper to: ${next.name}`,
      actionCount: prev.actionCount + 1,
      isBanned: false
    }));
  };

  const handleTrayBan = () => {
    setTrayStatus((prev) => ({
      ...prev,
      lastAction: `Banned "${prev.currentImage}". Immediately fetching new wallpaper...`,
      currentImage: 'NASA APOD: Carina Nebula Panoramic',
      provider: 'NASA APOD Scraper',
      actionCount: prev.actionCount + 1,
      isBanned: true
    }));
  };

  const providers = [
    {
      id: 'wallhaven',
      name: 'Wallhaven',
      type: 'input',
      source: 'wallhaven.cc',
      status: 'active',
      desc: 'Official REST API v1 integration supporting search keywords, categories (General/Anime/People), purity ratings, color filtering, and minimum screen resolutions.',
      tags: ['API v1', '4K / 8K', 'Color Filter', 'Tags Search']
    },
    {
      id: 'local',
      name: 'Local Directory',
      type: 'input',
      source: 'Local Filesystem',
      status: 'active',
      desc: 'Recursively scans user-designated folders for JPG, PNG, and BMP images, rotating through local collections without requiring internet connectivity.',
      tags: ['Offline', 'Recursive', 'Zero-Latency']
    },
    {
      id: 'apod',
      name: 'NASA APOD',
      type: 'input',
      source: 'apod.nasa.gov',
      status: 'active',
      desc: 'Scrapes the daily Astronomy Picture of the Day and its archive, parsing high-resolution cosmic imagery and metadata descriptions.',
      tags: ['Astrophotography', 'Deep Space', 'Archive Scraping']
    },
    {
      id: 'mrss',
      name: 'Media RSS (MRSS)',
      type: 'input',
      source: 'DeviantArt & Custom RSS',
      status: 'active',
      desc: 'Consumes standard MediaRSS XML feeds from art communities and photo feeds, extracting full-size media enclosure tags.',
      tags: ['RSS / XML', 'DeviantArt', 'Syndication']
    },
    {
      id: 'wallpaper-setter',
      name: 'Wallpaper Setter',
      type: 'output',
      source: 'Windows WinAPI',
      status: 'active',
      desc: 'Calls native SystemParametersInfo and IActiveDesktop interfaces via P/Invoke to instantly apply new backgrounds across single or multi-monitor setups.',
      tags: ['WinAPI P/Invoke', 'Multi-Monitor', 'Native']
    },
    {
      id: 'piler',
      name: 'Piler Archiver',
      type: 'output',
      source: 'Local Storage',
      status: 'active',
      desc: 'Automatically archives downloaded wallpapers into organized folders so favorite images are saved permanently for future offline use.',
      tags: ['Auto-Archive', 'Storage Organiser']
    },
    {
      id: 'logon',
      name: 'Logon Background',
      type: 'output',
      source: 'OEMBackground API',
      status: 'legacy',
      desc: 'Synchronizes the Windows 7 logon background screen with the current wallpaper using the OEMBackground registry mechanism.',
      tags: ['Windows 7', 'System Logon']
    },
    {
      id: 'aero',
      name: 'Aero Glass Changer',
      type: 'output',
      source: 'DwmSetColorizationColor',
      status: 'legacy',
      desc: 'Dynamically samples the dominant color of the active wallpaper and tints Windows 7/8 Aero Glass window borders to match.',
      tags: ['Aero Glass', 'DWM Colorization']
    },
    {
      id: 'google',
      name: 'Google Images',
      type: 'input',
      source: 'images.google.com',
      status: 'archived',
      desc: 'Legacy image scraper from original CodePlex release. Modern Google anti-bot and reCAPTCHA endpoints block automated scraping.',
      tags: ['Archived', 'Scraper']
    },
    {
      id: 'natgeo',
      name: 'National Geographic',
      type: 'input',
      source: 'ngm.nationalgeographic.com',
      status: 'archived',
      desc: 'Legacy photo-of-the-day provider. Original NatGeo RSS endpoints were retired and return HTTP 403.',
      tags: ['Archived', 'Legacy Feed']
    }
  ];

  const filteredProviders = providers.filter((p) => {
    if (providerFilter === 'all') return true;
    return p.type === providerFilter;
  });

  const archNodes = {
    form: {
      title: 'PulseForm (WinForms Application)',
      file: 'PulseForm/ • Pulse.exe',
      role: 'Entry point for the executable. Manages the Windows notification area system tray icon, context menus, balloon tooltips, options configuration modal, and background timer ticks.',
      deps: ['Pulse.Base', 'Pulse.Forms.UI', 'System.Windows.Forms']
    },
    base: {
      title: 'Pulse.Base (Core Engine)',
      file: 'Pulse.Base/ • Pulse.Base.dll',
      role: 'The heart of Pulse. Implements provider interfaces (IInputProvider, IOutputProvider), dynamic plugin discovery (ProviderManager), wallpaper scheduling loop (PulseRunner), multi-threaded DownloadManager, and XML settings persistence.',
      deps: ['System.Net', 'System.Configuration', 'CsQuery']
    },
    ui: {
      title: 'Pulse.Forms.UI (Controls & Monitors)',
      file: 'Pulse.Forms.UI/ • Pulse.Forms.UI.dll',
      role: 'Reusable Windows Forms custom controls, including the multi-threaded DownloadMonitor window, active download queue list, and per-provider preference panes.',
      deps: ['Pulse.Base', 'System.Drawing', 'System.Windows.Forms']
    },
    providers: {
      title: 'Providers/ (Extensible Plugins)',
      file: 'Providers/* • Compiled into bin/<Config>/Providers/*.dll',
      role: 'Modular DLL plugins loaded dynamically at runtime via reflection. Adding a new image source or desktop effect requires only compiling an IInputProvider or IOutputProvider assembly.',
      deps: ['Pulse.Base', 'WinAPI P/Invoke', 'CsQuery']
    },
    tests: {
      title: 'Pulse.Tests (MSTest Suite)',
      file: 'Pulse.Tests/ • Pulse.Tests.dll',
      role: 'Comprehensive unit and integration test suite targeting .NET 4.8. Validates API response parsing, URL resolution, image caching, and provider manager reflection.',
      deps: ['MSTest.TestFramework', 'Pulse.Base']
    }
  };

  const pressArticles = [
    {
      title: 'Lifehacker',
      headline: 'Pulse Creates Wallpaper Slideshows Based on Keywords',
      url: 'https://lifehacker.com/5799438/pulse-creates-wallpaper-slideshows-based-on-keywords',
      quote: 'If you get bored of your desktop wallpaper quickly, Pulse is a slick Windows utility that periodically pulls high-res wallpapers based on your favorite keywords.'
    },
    {
      title: 'Redmond Pie',
      headline: 'Changes Your Login Screen Background and Desktop Wallpaper Periodically',
      url: 'https://www.redmondpie.com/pulse-for-windows-7-changes-your-login-screen-background-and-desktop-wallpaper-periodically/',
      quote: 'An automated desktop customizer that not only cycles through breathtaking wallpapers, but also syncs your Windows logon background.'
    },
    {
      title: 'TV 2 Nyheder (Denmark)',
      headline: 'Aldrig mere kedeligt Windows',
      url: 'http://nyheder.tv2.dk/article/aldrig-mere-kedeligt-windows',
      quote: 'Danish national media feature on automating desktop customization with online image sources.'
    },
    {
      title: 'Chip.com.tr (Turkey)',
      headline: 'Masaüstü Resimlerini Otomatik Değiştirin',
      url: 'http://www.chip.com.tr/konu/masaustu-resimlerini-otomatik-degistirin_27164.html',
      quote: 'International tech portal review highlighting the intelligent resolution-filtering and multi-provider architecture.'
    }
  ];

  return (
    <div className="w-full text-zinc-800 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* BREADCRUMB / BACK LINK */}
      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Software Catalog</span>
        </a>
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-2 pb-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono font-medium rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Pulse • Automated Wallpaper Engine</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-500">
              .NET 4.8 Maintained Fork
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Fresh, High-Resolution Wallpapers{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 bg-clip-text text-transparent">
              On Your Own Terms
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-6">
            An open-source Windows application that automatically fetches and cycles gorgeous desktop backgrounds matching your screen resolution from <span className="font-semibold text-zinc-900 dark:text-white">Wallhaven</span>, <span className="font-semibold text-zinc-900 dark:text-white">NASA APOD</span>, <span className="font-semibold text-zinc-900 dark:text-white">Media RSS</span>, and local folders.
          </p>

          {/* BADGES & LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Windows 7 / 8 / 10 / 11
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-500" />
              C# &amp; WinForms (.NET 4.8)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              Extensible Plugin Providers
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="https://github.com/RobbyB97/pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 group"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setActiveTab('tray')}
              className="px-6 py-3 rounded-lg font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Try Tray Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('build')}
              className="px-5 py-3 rounded-lg font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Build from Source</span>
            </button>
          </div>
        </div>

        {/* FEATURE HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 mb-12">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <Monitor className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Resolution-Aware</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculates your screen aspect ratio and resolution (e.g. 4K, Ultrawide, QHD) to filter out low-res or stretched images.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <Ban className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">One-Click Ban</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dislike an image? Hit &quot;Ban Picture&quot; in the tray menu. Pulse records the hash and immediately downloads a fresh replacement.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <HardDrive className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Pre-Fetch &amp; Cache</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bulk-download search results in the background with multi-threaded downloads, guaranteeing instantaneous zero-lag wallpaper transitions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Auto-Startup</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Quietly sits in the Windows System Tray, rotating backgrounds on boot and at configurable intervals (from minutes to days).
            </p>
          </div>
        </div>

        {/* SECTION TABS */}
        <div className="max-w-5xl mx-auto px-4 border-b border-zinc-200 dark:border-zinc-800 mb-8">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'App Preview', icon: ImageIcon },
              { id: 'providers', label: 'Plugin Providers', icon: Layers },
              { id: 'tray', label: 'System Tray Simulator', icon: Sliders },
              { id: 'architecture', label: 'Architecture & Code', icon: Code },
              { id: 'build', label: 'Building & Setup', icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* TAB CONTENT: APP PREVIEW */}
        {activeTab === 'overview' && (
          <div className="max-w-5xl mx-auto px-4 space-y-8">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-950">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 font-medium text-zinc-300">Pulse — Modern Wallpaper Manager</span>
                </div>
                <span className="text-[11px] text-zinc-500">Windows 11 Desktop Workspace</span>
              </div>
              <div className="relative group">
                <img
                  src="/images/pulse/ui.jpg"
                  alt="Pulse Wallpaper Manager UI Preview"
                  className="w-full h-auto object-cover max-h-[640px]"
                />
              </div>
            </div>

            {/* PRESS & ARTICLES */}
            <div className="pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
                <Newspaper className="w-5 h-5 text-indigo-500" />
                Featured Articles &amp; Press
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pressArticles.map((article) => (
                  <a
                    key={article.title}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                        {article.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white mb-2">
                      {article.headline}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                      &quot;{article.quote}&quot;
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: PROVIDERS */}
        {activeTab === 'providers' && (
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Extensible Provider System</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Pulse decouples downloading from presentation using dynamic plugin assemblies.
                </p>
              </div>

              {/* FILTER BUTTONS */}
              <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium">
                <button
                  onClick={() => setProviderFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    providerFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  All ({providers.length})
                </button>
                <button
                  onClick={() => setProviderFilter('input')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    providerFilter === 'input'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Input Providers
                </button>
                <button
                  onClick={() => setProviderFilter('output')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    providerFilter === 'output'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Output Providers
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-zinc-900 dark:text-white">{prov.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {prov.type}
                        </span>
                      </div>
                      {prov.status === 'active' && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Working
                        </span>
                      )}
                      {prov.status === 'legacy' && (
                        <span className="text-xs text-amber-500 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Win 7/8
                        </span>
                      )}
                      {prov.status === 'archived' && (
                        <span className="text-xs text-rose-500 font-medium flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> Deprecated
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-zinc-500 mb-3">{prov.source}</div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                      {prov.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    {prov.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: TRAY SIMULATOR */}
        {activeTab === 'tray' && (
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
              <div className="mb-6">
                <span className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Interactive Simulator
                </span>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                  Windows Notification Area &amp; Tray Controls
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Experience how Pulse runs unobtrusively in the background without needing a permanent taskbar window.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* SIMULATED DESKTOP TRAY POPUP */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 font-sans shadow-inner">
                  <div className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                    Simulated Tray Context Menu
                  </div>

                  <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                    <button
                      onClick={handleTrayNext}
                      className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-indigo-500" />
                        Next Picture (Double-Click)
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Ctrl+Alt+N</span>
                    </button>

                    <button
                      onClick={handleTrayBan}
                      className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 transition font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Ban className="w-4 h-4 text-rose-500" />
                        Ban Picture
                      </span>
                      <span className="text-[10px] font-mono text-rose-400">Del</span>
                    </button>

                    <button
                      onClick={() =>
                        setTrayStatus((p) => ({
                          ...p,
                          lastAction: 'Pre-fetch started: downloading 24 wallpapers in the background queue...',
                          actionCount: p.actionCount + 1
                        }))
                      }
                      className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-sky-500" />
                        Pre-Fetch Wallpapers
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Queue: 24</span>
                    </button>

                    <button
                      onClick={() =>
                        setTrayStatus((p) => ({
                          ...p,
                          lastAction: 'Opened Pulse Settings: Keywords ["landscape", "space", "cyberpunk"], Interval: 30m.',
                          actionCount: p.actionCount + 1
                        }))
                      }
                      className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-zinc-500" />
                        Options &amp; Preferences
                      </span>
                    </button>
                  </div>
                </div>

                {/* CURRENT STATE MONITOR */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                    Pulse Engine Status
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-zinc-400 block mb-0.5">Active Wallpaper:</span>
                      <span className="font-semibold text-zinc-900 dark:text-white text-sm">
                        {trayStatus.currentImage}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-zinc-400 block mb-0.5">Resolution:</span>
                        <span className="font-mono text-zinc-700 dark:text-zinc-300">
                          {trayStatus.resolution}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block mb-0.5">Active Provider:</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                          {trayStatus.provider}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-400 block mb-0.5">Engine Event Log:</span>
                      <div className="p-2 rounded bg-white dark:bg-zinc-900 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                        {trayStatus.lastAction}
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                      <span>Total rotation cycles: {trayStatus.actionCount}</span>
                      <span className="text-emerald-500 font-medium">● Runner Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Solution &amp; Project Architecture</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Inspect the visual breakdown of the C# .NET solution structure (`Pulse.sln`).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TREE NAVIGATION */}
              <div className="space-y-2">
                {[
                  { key: 'form', name: 'PulseForm (WinForms UI)', icon: Monitor },
                  { key: 'base', name: 'Pulse.Base (Engine)', icon: Cpu },
                  { key: 'ui', name: 'Pulse.Forms.UI (Controls)', icon: Sliders },
                  { key: 'providers', name: 'Providers/ (Plugins)', icon: Layers },
                  { key: 'tests', name: 'Pulse.Tests (MSTest)', icon: BookmarkCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeArchNode === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveArchNode(item.key)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400'}`} />
                        <span className="text-xs font-semibold">{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>
                  );
                })}
              </div>

              {/* NODE DETAILS INSPECTOR */}
              <div className="md:col-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {archNodes[activeArchNode].title}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {archNodes[activeArchNode].file}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                      Role &amp; Responsibilities
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {archNodes[activeArchNode].role}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block mb-2">
                      Key Assembly Dependencies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {archNodes[activeArchNode].deps.map((dep) => (
                        <span
                          key={dep}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: BUILDING & SETUP */}
        {activeTab === 'build' && (
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Building &amp; Running from Source</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Compiled natively for Windows using .NET Framework 4.8.
                </p>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium">
                <button
                  onClick={() => setBuildMode('cli')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    buildMode === 'cli'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  CLI (MSBuild)
                </button>
                <button
                  onClick={() => setBuildMode('vs')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    buildMode === 'vs'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Visual Studio
                </button>
              </div>
            </div>

            {/* PREREQUISITES */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <h3 className="text-xs font-mono uppercase text-zinc-500 font-bold mb-2">Prerequisites</h3>
              <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 list-disc list-inside">
                <li>Windows 7 / 8 / 10 / 11</li>
                <li>.NET Framework 4.8 Developer Pack or Runtime</li>
                <li>Visual Studio 2019 / 2022 (with .NET desktop workload) or MSBuild Tools</li>
              </ul>
            </div>

            {/* CODE / COMMAND BLOCK */}
            {buildMode === 'cli' ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400">
                    <span>1. Clone Repository &amp; Restore NuGet Packages</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'git clone https://github.com/RobbyB97/pulse.git\ncd pulse\nnuget restore Pulse.sln',
                          'step1'
                        )
                      }
                      className="hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedKey === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'step1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-zinc-200 overflow-x-auto">
{`git clone https://github.com/RobbyB97/pulse.git
cd pulse
nuget restore Pulse.sln`}
                  </pre>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400">
                    <span>2. Compile Release with MSBuild</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'msbuild Pulse.sln /p:Configuration=Release /p:"Platform=Mixed Platforms" /m',
                          'step2'
                        )
                      }
                      className="hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedKey === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'step2' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-zinc-200 overflow-x-auto">
{`msbuild Pulse.sln /p:Configuration=Release /p:"Platform=Mixed Platforms" /m`}
                  </pre>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400">
                    <span>3. Launch Pulse from Output Directory</span>
                    <button
                      onClick={() => copyToClipboard('.\\bin\\Release\\Pulse.exe', 'step3')}
                      className="hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedKey === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'step3' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-zinc-200 overflow-x-auto">
{`cd bin\\Release
.\\Pulse.exe`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
                <ol className="space-y-3 list-decimal list-inside">
                  <li>
                    Clone repository: <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">git clone https://github.com/RobbyB97/pulse.git</code>
                  </li>
                  <li>
                    Open <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">Pulse.sln</code> in Visual Studio 2019 or 2022.
                  </li>
                  <li>
                    Right-click the Solution in Solution Explorer and select <strong>Restore NuGet Packages</strong>.
                  </li>
                  <li>
                    Set Configuration to <strong>Release</strong> and Platform to <strong>Mixed Platforms</strong>.
                  </li>
                  <li>
                    Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">Ctrl + Shift + B</kbd> to build all projects and providers.
                  </li>
                  <li>
                    Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">F5</kbd> to start debugging, or run <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">bin\Release\Pulse.exe</code>.
                  </li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
