import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Binary,
  Boxes,
  Check,
  CircuitBoard,
  Code,
  Cog,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  Gauge,
  GitFork,
  Globe,
  Info,
  Layers,
  MemoryStick,
  Monitor,
  MousePointer2,
  Play,
  ShieldCheck,
  SquareTerminal,
  Terminal,
  Usb,
  Zap,
} from 'lucide-react';

const repositoryUrl = 'https://github.com/roboter/AVR-Simulator';
const releasesUrl = `${repositoryUrl}/releases`;
const upstreamUrl = 'https://github.com/tmthrgd/AVR-Simulator';

const initialRelease = {
  version: 'v0.1',
  publishedAt: 'September 21, 2026',
  releaseUrl: `${releasesUrl}/tag/v0.1`,
  assets: [
    {
      id: 'windows',
      matchName: 'avr',
      name: 'AVR_Simulator.zip',
      platform: 'Windows',
      architecture: 'x86 · .NET 10 WPF',
      size: '135.7 KB',
      description:
        'Portable bundle with the self-contained simulator executable, the Blink sample firmware, and the license.',
      url: `${releasesUrl}/download/v0.1/AVR_Simulator.zip`,
      icon: Monitor,
    },
  ],
};

const readmeBadges = [
  {
    label: 'Test workflow',
    href: `${repositoryUrl}/actions/workflows/test.yml`,
    image: `${repositoryUrl}/actions/workflows/test.yml/badge.svg`,
  },
  {
    label: 'Release workflow',
    href: `${repositoryUrl}/actions/workflows/release.yml`,
    image: `${repositoryUrl}/actions/workflows/release.yml/badge.svg`,
  },
  {
    label: '.NET 10',
    href: 'https://dotnet.microsoft.com/download/dotnet/10.0',
    image: 'https://img.shields.io/badge/.NET-10.0-512BD4?style=flat&logo=dotnet&logoColor=white',
  },
  {
    label: 'C#',
    href: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    image: 'https://img.shields.io/badge/C%23-239120?style=flat&logo=csharp&logoColor=white',
  },
  {
    label: 'WPF',
    href: 'https://learn.microsoft.com/en-us/dotnet/desktop/wpf/',
    image: 'https://img.shields.io/badge/UI-WPF-blueviolet?style=flat&logo=microsoft&logoColor=white',
  },
  {
    label: 'License: Unlicense',
    href: `${repositoryUrl}/blob/master/LICENSE`,
    image: 'https://img.shields.io/badge/license-Unlicense-blue?style=flat',
  },
];

const featureCards = [
  {
    icon: Binary,
    title: 'AVR instruction emulation',
    description:
      'A decoder loop executes the ATmega328 opcode set, keeping program counter, stack, and registers in sync as the firmware runs.',
  },
  {
    icon: FileCode,
    title: 'Intel HEX loader',
    description:
      'Reads the .hex files produced by AVR-GCC and avrdude, decodes the records, and maps the resulting bytes into simulated flash.',
  },
  {
    icon: Zap,
    title: 'Live GPIO monitoring',
    description:
      'PORTB, PORTC, and PORTD are rendered as LED-style pin indicators, so output writes and toggling are visible while the program executes.',
  },
  {
    icon: Activity,
    title: 'ADC & DAC simulation',
    description:
      'Drive analog inputs with the manual voltage slider or a sine wave generator, and watch the DAC output voltage change in real time.',
  },
  {
    icon: Cog,
    title: 'Non-blocking worker',
    description:
      'Emulation runs on a background worker, leaving the WPF interface responsive for run, stop, and single-step control.',
  },
  {
    icon: Layers,
    title: 'Extensible core',
    description:
      'Chip behaviour sits behind the AVRInterpreter base class, so additional AVR variants can be added without touching the UI.',
  },
];

const pinColumns = [
  {
    port: 'PORTB',
    pins: ['PB0', 'PB1', 'PB2', 'PB3', 'PB4', 'PB5', 'PB6', 'PB7'],
    active: 'PB5',
  },
  {
    port: 'PORTC',
    pins: ['PC0', 'PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'PC6'],
    active: null,
  },
  {
    port: 'PORTD',
    pins: ['PD0', 'PD1', 'PD2', 'PD3', 'PD4', 'PD5', 'PD6', 'PD7'],
    active: null,
  },
];

const blinkSource = `#include <avr/io.h>
#include <util/delay.h>

int main (void)
{
  /* set PORTB for output */
  DDRB = 0xFF;

  while (1)
    {
      /* set PORTB.5 high */
      PORTB = 0x20;

      _delay_ms(1000);

      /* set PORTB.5 low */
      PORTB = 0x00;

      _delay_ms(1000);
    }

  return 1;
}`;

const buildTargets = [
  {
    id: 'visual-studio',
    title: 'Visual Studio',
    badge: 'Visual Studio 2022+',
    icon: Monitor,
    description:
      'Open the solution, switch to the Release configuration, and build. The executable lands in the x86 output folder.',
    command: `# Open AVR Simulator.sln in Visual Studio
# Select the Release configuration
# Build -> Build Solution (Ctrl+Shift+B)`,
  },
  {
    id: 'dotnet-cli',
    title: '.NET CLI',
    badge: 'dotnet build',
    icon: Terminal,
    description:
      'Build the whole solution from a terminal. The WPF project targets Windows and produces an x86 executable.',
    command: `dotnet build -c Release
dotnet run --project AVR-Simulator.UI`,
  },
];

const architectureSteps = [
  {
    icon: FileCode,
    title: 'Load firmware',
    description: 'An Intel HEX file is parsed into the simulated flash address space.',
  },
  {
    icon: Binary,
    title: 'Fetch & decode',
    description: 'The interpreter reads the next opcode at the program counter and decodes it.',
  },
  {
    icon: Cpu,
    title: 'Execute',
    description: 'Registers, SRAM, the stack, and I/O registers are updated like real hardware.',
  },
  {
    icon: CircuitBoard,
    title: 'Observe',
    description: 'Pin, timer, ADC, and DAC state is pushed to the WPF visualisation.',
  },
];

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(date) {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

function CopyButton({ content, copyKey, copiedKey, onCopy }) {
  const copied = copiedKey === copyKey;

  return (
    <button
      type="button"
      onClick={() => onCopy(content, copyKey)}
      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:border-rose-400/60 hover:text-white"
      aria-label="Copy code to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function AVRSimulatorPage() {
  const [release, setRelease] = useState(initialRelease);
  const [activeBuild, setActiveBuild] = useState('visual-studio');
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch('https://api.github.com/repos/roboter/AVR-Simulator/releases/latest')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((latest) => {
        if (!isMounted || !latest?.tag_name) return;

        const latestAssets = Array.isArray(latest.assets) ? latest.assets : [];
        const assets = initialRelease.assets.map((fallback) => {
          const current = latestAssets.find((asset) => asset.name?.toLowerCase().includes(fallback.matchName));

          return current
            ? {
                ...fallback,
                name: current.name || fallback.name,
                size: formatBytes(current.size) || fallback.size,
                url: current.browser_download_url || fallback.url,
              }
            : fallback;
        });

        setRelease({
          version: latest.tag_name,
          publishedAt: formatDate(latest.published_at) || initialRelease.publishedAt,
          releaseUrl: latest.html_url || initialRelease.releaseUrl,
          assets,
        });
      })
      .catch(() => {
        // Keep the bundled release data when GitHub is unreachable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const copyToClipboard = (content, copyKey) => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(content).then(() => {
      setCopiedKey(copyKey);
      window.setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const activeBuildDetails = buildTargets.find((build) => build.id === activeBuild);

  return (
    <main className="relative pb-16 text-zinc-800 selection:bg-rose-500 selection:text-white dark:text-zinc-100">
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-36 w-36 overflow-hidden">
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto absolute -right-10 top-7 block w-44 rotate-45 border-y border-white/20 bg-zinc-900 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition hover:scale-105 hover:bg-rose-600"
        >
          View on GitHub
        </a>
      </div>

      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Software Catalog
        </a>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-5 py-12 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 font-mono text-xs font-medium text-rose-700 shadow-sm backdrop-blur-sm dark:text-rose-300">
            <CircuitBoard className="h-3.5 w-3.5 text-rose-500" />
            <span>AVR Simulator • ATmega328 on your desktop</span>
            <span className="rounded bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:text-rose-200">
              {release.version}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            Run AVR firmware{' '}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              without the hardware
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            A lightweight ATmega328 emulator written in C# and WPF. Load a firmware image compiled into Intel HEX
            format, step through the disassembly, and watch port pins, analog inputs, and DAC output react in real time.
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
              className="group inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500"
            >
              <Download className="h-4 w-4" />
              Download {release.version}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-rose-400 hover:text-rose-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-rose-500 dark:hover:text-rose-300"
            >
              <GitFork className="h-4 w-4" />
              Source on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href="#screenshots"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:text-rose-600 dark:text-zinc-300 dark:hover:text-rose-300"
            >
              <Play className="h-4 w-4" />
              See it running
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12" id="screenshots">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Eye className="h-3.5 w-3.5" />
              Application screenshot
            </div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Firmware, memory, and pins in one window
            </h2>
          </div>
          <a
            href={`${repositoryUrl}/tree/master/screenshots`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            View original assets
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-lg dark:border-zinc-800">
          <img
            src="/avrsimulator/main-window.png"
            alt="AVR Simulator main window with disassembly, hex bytes, ADC controls, DAC output, and GPIO port indicators"
            className="block w-full object-cover object-top"
            loading="eager"
          />
          <figcaption className="border-t border-white/10 bg-zinc-900 px-5 py-4 text-sm leading-relaxed text-zinc-300">
            <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-rose-400">
              Disassembly, HEX bytes & GPIO state
            </span>
            The code panel follows the program counter while decoding instructions, and the ADC, DAC, and port sections
            mirror the simulated peripheral registers. Here PB5 is driven high by the bundled Blink example.
          </figcaption>
        </figure>
      </section>

      <section className="mt-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Cpu className="h-3.5 w-3.5" />
            Key features
          </div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            A small core that behaves like the chip
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Everything in the README, arranged as the workflow you actually use.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-rose-500/30 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2" id="execution">
        <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <Code className="h-4 w-4 text-rose-400" />
              Blink.c · bundled sample
            </div>
            <CopyButton content={blinkSource} copyKey="blink" copiedKey={copiedKey} onCopy={copyToClipboard} />
          </div>
          <pre className="overflow-x-auto p-5 text-[12px] leading-6 text-zinc-200 sm:text-sm">
            <code>{blinkSource}</code>
          </pre>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">The execution loop</h2>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Blink.hex is loaded automatically from the execution directory, so a fresh download starts running
            immediately. Every other firmware image follows the same cycle:
          </p>
          <ol className="space-y-4">
            {architectureSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <a
            href={`${repositoryUrl}/blob/master/AVR-Simulator.UI/Blink.c`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            Browse the sample source
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>
      </section>

      <section className="mt-16">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <CircuitBoard className="h-3.5 w-3.5" />
              Virtual hardware
            </div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Ports, ADC, and DAC you can poke at
            </h2>
          </div>
          <a
            href="#downloads"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            Get the build
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                <MousePointer2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                GPIO port state
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> high
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-600" /> low
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {pinColumns.map((column) => (
                <div key={column.port}>
                  <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    {column.port}
                  </p>
                  <ul className="space-y-2">
                    {column.pins.map((pin) => {
                      const isActive = pin === column.active;
                      return (
                        <li key={pin} className="flex items-center gap-2.5">
                          <span
                            className={`h-2.5 w-2.5 rounded-full transition ${
                              isActive
                                ? 'bg-emerald-500 shadow-[0_0_10px_2px_rgba(16,185,129,0.45)]'
                                : 'bg-zinc-300 dark:bg-zinc-700'
                            }`}
                          />
                          <span
                            className={`font-mono text-xs ${
                              isActive
                                ? 'font-semibold text-zinc-900 dark:text-white'
                                : 'text-zinc-500 dark:text-zinc-400'
                            }`}
                          >
                            {pin}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
                <Activity className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">ADC control</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                A 0–5 V manual slider, frequency and amplitude settings, and an optional sine wave generator feed the
                analog input value the firmware reads.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
                <MemoryStick className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Virtual DAC</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                The output panel reports the DAC voltage as both a decimal value and the raw register code, so
                calibration logic is easy to verify.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-16 scroll-mt-8" id="downloads">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Download className="h-3.5 w-3.5" />
            Current GitHub release
          </div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Download AVR Simulator {release.version}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Published {release.publishedAt}. A portable Windows bundle — unzip it and run the executable, or build the
            solution yourself.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-5">
          {release.assets.map((asset) => {
            const Icon = asset.icon;
            return (
              <article
                key={asset.id}
                className="flex flex-col rounded-2xl border border-rose-500/40 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-xl bg-rose-500/10 p-3 text-rose-600 dark:text-rose-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {asset.architecture}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-zinc-900 dark:text-white">{asset.platform}</h3>
                <p className="mb-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {asset.name} · {asset.size}
                </p>
                <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{asset.description}</p>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  <Download className="h-4 w-4" />
                  Download .zip
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">Windows only</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                The frontend is a WPF application targeting .NET 10 on Windows. The emulation core itself is a
                standalone .NET class library.
              </p>
            </div>
          </div>
          <a
            href="#build"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 px-3.5 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-500/10 dark:text-rose-300"
          >
            Build from source
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-5 text-center">
          <a
            href={release.releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            View all releases on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="mt-16 scroll-mt-8" id="build">
        <div className="mb-7 text-center">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <SquareTerminal className="h-3.5 w-3.5" />
            Build from source
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Set up a local development build
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
            {buildTargets.map((build) => {
              const Icon = build.icon;
              const isActive = build.id === activeBuild;
              return (
                <button
                  type="button"
                  key={build.id}
                  onClick={() => setActiveBuild(build.id)}
                  className={`flex min-w-[150px] flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                    isActive
                      ? 'border-rose-500 bg-rose-500/5 text-rose-700 dark:text-rose-300'
                      : 'border-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {build.title}
                </button>
              );
            })}
          </div>

          {activeBuildDetails && (
            <div className="grid gap-7 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
              <div>
                <span className="mb-3 inline-flex rounded-md border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-rose-700 dark:text-rose-300">
                  {activeBuildDetails.badge}
                </span>
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                  {activeBuildDetails.title} setup
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {activeBuildDetails.description}
                </p>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-100">
                    <Info className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    Prerequisites
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Windows, the .NET 10 SDK (LTS) or newer, and optionally Visual Studio 2022 for the full IDE
                    experience.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
                  <span className="font-mono text-xs text-zinc-400">terminal</span>
                  <CopyButton
                    content={`git clone ${repositoryUrl}.git\ncd AVR-Simulator\n\n${activeBuildDetails.command}`}
                    copyKey={activeBuildDetails.id}
                    copiedKey={copiedKey}
                    onCopy={copyToClipboard}
                  />
                </div>
                <pre className="overflow-x-auto p-5 text-xs leading-6 text-zinc-100 sm:text-sm">
                  <code>{`git clone ${repositoryUrl}.git
cd AVR-Simulator

${activeBuildDetails.command}`}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          The built executable lands in{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            AVR-Simulator.UI\bin\x86\Release\net10.0-windows\
          </code>
          .
        </p>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
            <Boxes className="h-5 w-5" />
          </span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Core and UI separated</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            AVR-Simulator.Core holds the interpreter, memory map, and HEX parser with no GUI dependencies, so the
            emulator can be reused in tests or other frontends.
          </p>
          <a
            href={`${repositoryUrl}/tree/master/AVR-Simulator.Core`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            Browse the core
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Tested in CI</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Instruction execution, memory operations, and HEX decoding are covered by unit tests, and the test workflow
            gates every release.
          </p>
          <a
            href={`${repositoryUrl}/actions`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            View test runs
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>

        <article className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:bg-rose-500/10">
          <span className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
            <Usb className="h-5 w-5" />
          </span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Supported chips</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            ATmega328 is fully supported today. Other AVR variants can be added by deriving from the AVRInterpreter base
            class.
          </p>
          <a
            href={`${repositoryUrl}/blob/master/AVR-Simulator.Core/Atmega328Interpreter.cs`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            See the implementation
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
          AVR Simulator is released into the public domain under the Unlicense. The original proof of concept was
          written by tmthrgd; this fork modernises it for .NET 10 with a restructured solution, tests, and automated
          releases.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href={upstreamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            <GitFork className="h-3.5 w-3.5" />
            Original project
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={`${repositoryUrl}/blob/master/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            <Globe className="h-3.5 w-3.5" />
            Read the license
          </a>
        </div>
      </section>
    </main>
  );
}
