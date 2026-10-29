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
    isBanned: false
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
  
  const filteredProviders = selectedType === 'all' 
    ? providers 
    : providers.filter(p => p.type === selectedType);
    
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
      { name: 'Tokyo Neon Cyberpunk Rain', res: '3840 x 2160', prov: 'Wallhaven API v1' }
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(prev => ({
      ...prev,
      currentImage: randomImage.name,
      resolution: randomImage.res,
      provider: randomImage.prov,
      lastAction: `Switched wallpaper to: ${randomImage.name}`,
      actionCount: prev.actionCount + 1,
      isBanned: false
    }));
  };
  
  const handleBanImage = () => {
    setCurrentImage(prev => ({
      ...prev,
      lastAction: `Banned "${prev.currentImage}". Immediately fetching new wallpaper...`,
      currentImage: 'NASA APOD: Carina Nebula Panoramic',
      provider: 'NASA APOD Scraper',
      actionCount: prev.actionCount + 1,
      isBanned: true
    }));
  };
  
  // Mock data for release info
  const mockRelease = {
    version: 'v0.0.1',
    size: '2.4 MB',
    publishedAt: new Date('2026-09-25').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    downloadUrl: 'https://github.com/roboter/pulse/releases/download/v0.0.1/Pulse-v0.0.1.zip',
    releaseUrl: 'https://github.com/roboter/pulse/releases/tag/v0.0.1',
    assetName: 'Pulse-v0.0.1.zip',
    sha256: 'd3b70c0892a35b1eb4b76df7268ec4faca068ddaff180e88b9bb587caa0da1b0',
    downloadCount: 1247
  };
  
  return (
    <div className="w-full text-zinc-800 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white relative">
      {/* GitHub fork banner */}
      <div className="fixed top-0 right-0 z-50 overflow-hidden w-36 h-36 pointer-events-none">
        <a 
          href="https://github.com/roboter/pulse" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pointer-events-auto block absolute top-7 -right-10 w-44 py-1.5 text-center text-[10px] font-bold font-mono tracking-wider uppercase text-white bg-zinc-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xl rotate-45 border-y border-white/20 transition-all hover:scale-105"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </a>
      </div>
      
      {/* Back to software catalog */}
      <div className="mb-6">
        <a 
          href="/software" 
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Back to Software Catalog</span>
        </a>
      </div>
      
      {/* Main content */}
      <div className="relative overflow-hidden pt-2 pb-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono font-medium rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm backdrop-blur-sm">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span>Pulse • Automated Wallpaper Engine</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-500">
              .NET 4.8 Maintained Fork
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
            Fresh, High-Resolution Wallpapers
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 bg-clip-text text-transparent"> On Your Own Terms</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-6">
            An open-source Windows application that automatically fetches and cycles gorgeous desktop backgrounds matching your screen resolution from 
            <span className="font-semibold text-zinc-900 dark:text-white"> Wallhaven</span>, 
            <span className="font-semibold text-zinc-900 dark:text-white"> NASA APOD</span>, 
            <span className="font-semibold text-zinc-900 dark:text-white"> Media RSS</span>, 
            and local folders.
          </p>
          
          {/* Key features */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs font-mono">
            <a 
              href={mockRelease.releaseUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1.5 transition-colors group"
              title={`${mockRelease.downloadCount} downloads on GitHub`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{mockRelease.version} Release</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
                {mockRelease.downloadCount.toLocaleString()} {mockRelease.downloadCount === 1 ? 'download' : 'downloads'}
              </span>
            </a>
            
            <a 
              href="https://github.com/roboter/pulse/fork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500/50 flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-500" />
              <span>Fork on GitHub</span>
            </a>
            
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Archive className="w-3.5 h-3.5 text-emerald-500" />
              Windows 7 / 8 / 10 / 11
            </span>
            
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-sky-500" />
              C# & WinForms (.NET 4.8)
            </span>
            
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-purple-500" />
              Extensible Plugin Providers
            </span>
          </div>
          
          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <a 
              href={mockRelease.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2.5 group"
            >
              <Download className="w-4 h-4" />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold text-sm">Download {mockRelease.version}</span>
                <span className="text-[11px] text-emerald-100 opacity-90 font-mono">
                  {mockRelease.size} • {mockRelease.downloadCount.toLocaleString()} {mockRelease.downloadCount === 1 ? 'download' : 'downloads'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <a 
              href="https://github.com/roboter/pulse/fork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow transition-all flex items-center gap-2 group"
            >
              <GitBranch className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Fork me on GitHub</span>
            </a>
            
            <a 
              href="https://github.com/roboter/pulse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-300 dark:border-zinc-600 shadow transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Source</span>
            </a>
          </div>
          
          {/* Current image display */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Current Wallpaper Preview</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1 text-left">
                <p className="mb-2"><span className="font-semibold">Name:</span> {currentImage.name}</p>
                <p className="mb-2"><span className="font-semibold">Resolution:</span> {currentImage.resolution}</p>
                <p className="mb-2"><span className="font-semibold">Source:</span> {currentImage.provider}</p>
                <p><span className="font-semibold">Last Action:</span> {currentImage.lastAction}</p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleRandomImage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Random Image
                </button>
                <button 
                  onClick={handleBanImage}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Ban Current Image
                </button>
              </div>
            </div>
          </div>
          
          {/* Architecture diagram */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Software Architecture</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <p className="mb-4">Pulse follows a modular architecture with:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-semibold">Input Providers</span> - Fetch images from various sources (Wallhaven, NASA APOD, local directories)</li>
                <li><span className="font-semibold">Processing Engine</span> - Handles image filtering and resolution matching</li>
                <li><span className="font-semibold">Output Modules</span> - Apply wallpapers to desktop with multi-monitor support</li>
                <li><span className="font-semibold">Configuration Manager</span> - Store user preferences and settings</li>
              </ul>
            </div>
          </div>
          
          {/* Providers section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Supported Providers</h2>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <button 
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-full text-sm ${selectedType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedType('input')}
                className={`px-3 py-1 rounded-full text-sm ${selectedType === 'input' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Input Providers
              </button>
              <button 
                onClick={() => setSelectedType('output')}
                className={`px-3 py-1 rounded-full text-sm ${selectedType === 'output' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Output Modules
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders.map(provider => (
                <div key={provider.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{provider.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${provider.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : provider.status === 'legacy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {provider.status}
                    </span>
                  </div>
                  <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">{provider.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {provider.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
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