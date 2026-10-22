import React, { useEffect, useState } from "react";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Binary,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Code,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Eye,
  GitFork,
  Globe,
  Info,
  Keyboard,
  Layers,
  Monitor,
  Play,
  ShieldCheck,
  Shapes,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";

const repositoryUrl = "https://github.com/roboter/OpenSharpCAD";
const releasesUrl = `${repositoryUrl}/releases`;
const videoUrl = "https://youtu.be/dlQ3HhHRtSU";

const initialRelease = {
  version: "0.0.1",
  publishedAt: "October 20, 2026",
  releaseUrl: `${releasesUrl}/tag/0.0.1`,
  assets: [
    {
      id: "windows",
      matchName: "win-x64",
      name: "OpenSharpCAD-win-x64.zip",
      platform: "Windows",
      architecture: "x64",
      size: "57.8 MB",
      description:
        "Packaged 64-bit Windows desktop build from the current GitHub release.",
      url: "https://github.com/roboter/OpenSharpCAD/releases/download/0.0.1/OpenSharpCAD-win-x64.zip",
      icon: Monitor,
    },
    {
      id: "mac-arm",
      matchName: "osx-arm64",
      name: "OpenSharpCAD-osx-arm64.zip",
      platform: "macOS",
      architecture: "Apple Silicon",
      size: "43.4 MB",
      description:
        "Packaged desktop build for Apple Silicon Macs, including M-series processors.",
      url: "https://github.com/roboter/OpenSharpCAD/releases/download/0.0.1/OpenSharpCAD-osx-arm64.zip",
      icon: Apple,
    },
    {
      id: "mac-intel",
      matchName: "osx-x64",
      name: "OpenSharpCAD-osx-x64.zip",
      platform: "macOS",
      architecture: "Intel",
      size: "45.2 MB",
      description: "Packaged desktop build for Intel-based Macs.",
      url: "https://github.com/roboter/OpenSharpCAD/releases/download/0.0.1/OpenSharpCAD-osx-x64.zip",
      icon: Apple,
    },
  ],
};

const readmeBadges = [
  {
    label: "Build & Publish workflow",
    href: `${repositoryUrl}/actions/workflows/publish.yml`,
    image: `${repositoryUrl}/actions/workflows/publish.yml/badge.svg`,
  },
  {
    label: ".NET 10",
    href: "https://dotnet.microsoft.com/download/dotnet/10.0",
    image:
      "https://img.shields.io/badge/.NET-10.0-512BD4?style=flat&logo=dotnet&logoColor=white",
  },
  {
    label: "C# 13",
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    image:
      "https://img.shields.io/badge/C%23-13.0-239120?style=flat&logo=csharp&logoColor=white",
  },
  {
    label: "Windows, macOS, and Linux",
    href: repositoryUrl,
    image:
      "https://img.shields.io/badge/Platforms-macOS%20%7C%20Windows%20%7C%20Linux-blue?style=flat&logo=apple&logoColor=white",
  },
  {
    label: "GitHub stars",
    href: repositoryUrl,
    image:
      "https://img.shields.io/github/stars/roboter/OpenSharpCAD?style=flat&logo=github",
  },
  {
    label: "GitHub forks",
    href: repositoryUrl,
    image:
      "https://img.shields.io/github/forks/roboter/OpenSharpCAD?style=flat&logo=github",
  },
];

const featureCards = [
  {
    icon: Layers,
    title: "CSG that reads like algebra",
    description:
      "Build forms with natural C# operators: + for union, - for difference, and * for intersection.",
  },
  {
    icon: Box,
    title: "Solids, sketches, and extrusions",
    description:
      "Work from Box, Cylinder, Sphere, Torus, and Cone primitives, then create 3D bodies from 2D shapes with linear and rotational extrusions.",
  },
  {
    icon: Workflow,
    title: "Parametric transformations",
    description:
      "Translate, rotate, scale, and mirror geometry with constructor wrappers or fluent C# extension methods.",
  },
  {
    icon: Cpu,
    title: "Live Roslyn compilation",
    description:
      "Edit code and receive instant 3D preview updates, compiler diagnostics, and familiar C# tooling in the desktop IDE.",
  },
  {
    icon: Binary,
    title: "Topology-aware models",
    description:
      "Use vertices, edges, corners, bounds, and anchor points to attach parts without manually calculating every coordinate.",
  },
  {
    icon: Play,
    title: "Parametric animation",
    description:
      "Animate models with the OpenSCAD-compatible $t variable, plus playback controls, FPS, and step settings.",
  },
];

const sourceBuilds = [
  {
    id: "windows",
    title: "Windows",
    badge: "NuGet GLFW · Visual Studio 2022",
    icon: Monitor,
    description:
      "Use the .NET CLI, or open OpenSharpCAD.sln in Visual Studio 2022, select OpenSharpCAD as the startup project, and press F5.",
    command: `dotnet build OpenSharpCAD/OpenSharpCAD.csproj\ndotnet run --project OpenSharpCAD/OpenSharpCAD.csproj`,
  },
  {
    id: "macos",
    title: "macOS",
    badge: "Intel & Apple Silicon",
    icon: Apple,
    description:
      "Build with the .NET CLI. The repository includes GLFW binaries, or you can install GLFW with Homebrew if needed.",
    command: `# Optional: brew install glfw\ndotnet build OpenSharpCAD/OpenSharpCAD.csproj\ndotnet run --project OpenSharpCAD/OpenSharpCAD.csproj`,
  },
  {
    id: "linux",
    title: "Linux",
    badge: "GLFW source build",
    icon: Terminal,
    description:
      "Build with the .NET CLI using the bundled GLFW binaries, or install the GLFW development package from your distribution.",
    command: `# Optional: sudo apt install libglfw3-dev\ndotnet build OpenSharpCAD/OpenSharpCAD.csproj\ndotnet run --project OpenSharpCAD/OpenSharpCAD.csproj`,
  },
];

const csgExample = `var holesize = 4;

var box = new Box(12, 20, 20);
var rotated = new Rotate(box, x: MathHelper.DegreesToRadians(45));
var cylinder = new Cylinder(6, 20, 60);

Draw(box + rotated - cylinder);

var translated = new Translate(new Box(40, 10, 10), 0, holesize, holesize);
Draw(translated, RGB(80, 180, 255));`;

const logoExample = `CsgObject Logo(double size = 50.0, int fn = 100)
{
    double holeRadius = size / 4.0;
    var sphere = new Sphere(radius: size / 2.0);
    var cylZ = new Cylinder(radius: holeRadius, height: size * 1.25, sides: fn);
    var cylX = new Rotate(cylZ, y: MathHelper.DegreesToRadians(90));
    var cylY = new Rotate(cylZ, x: MathHelper.DegreesToRadians(90));

    return sphere - cylZ - cylX - cylY;
}

Draw(Logo(50), RGB(255, 170, 50));`;

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(date) {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function CopyButton({ content, copyKey, copiedKey, onCopy }) {
  const copied = copiedKey === copyKey;

  return (
    <button
      type="button"
      onClick={() => onCopy(content, copyKey)}
      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:border-sky-400/60 hover:text-white"
      aria-label="Copy code to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function OpenSharpCADPage() {
  const [release, setRelease] = useState(initialRelease);
  const [activeBuild, setActiveBuild] = useState("windows");
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("https://api.github.com/repos/roboter/OpenSharpCAD/releases/latest")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((latest) => {
        if (!isMounted || !latest?.tag_name) return;

        const latestAssets = Array.isArray(latest.assets) ? latest.assets : [];
        const assets = initialRelease.assets.map((fallback) => {
          const current = latestAssets.find((asset) =>
            asset.name?.toLowerCase().includes(fallback.matchName),
          );

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
        // The bundled release data remains usable if GitHub is unavailable.
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

  const activeBuildDetails = sourceBuilds.find((build) => build.id === activeBuild);

  return (
    <main className="relative pb-16 text-zinc-800 selection:bg-sky-500 selection:text-white dark:text-zinc-100">
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-36 w-36 overflow-hidden">
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto absolute -right-10 top-7 block w-44 rotate-45 border-y border-white/20 bg-zinc-900 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition hover:scale-105 hover:bg-sky-600"
        >
          View on GitHub
        </a>
      </div>

      <div className="mb-6">
        <a
          href="/software"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Software Catalog
        </a>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-5 py-12 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-mono font-medium text-sky-700 shadow-sm backdrop-blur-sm dark:text-sky-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>OpenSharpCAD • Parametric C# CAD</span>
            <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:text-sky-200">
              v{release.version}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            Parametric CAD,{' '}
            <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              written in C#
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            Design 3D printable parts, mechanical assemblies, and parametric models
            with familiar C# and .NET. OpenSharpCAD pairs the code-first workflow of
            OpenSCAD with Roslyn compilation and a hardware-accelerated 3D viewport.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-1.5">
            {readmeBadges.map((badge) => (
              <a
                key={badge.label}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                title={badge.label}
              >
                <img src={badge.image} alt={badge.label} className="h-5" loading="lazy" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#downloads"
              className="group inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-500"
            >
              <Download className="h-4 w-4" />
              Download v{release.version}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-sky-400 hover:text-sky-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-sky-500 dark:hover:text-sky-300"
            >
              <GitFork className="h-4 w-4" />
              Source on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:text-sky-600 dark:text-zinc-300 dark:hover:text-sky-300"
            >
              <Play className="h-4 w-4" />
              Watch demo
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12" id="screenshots">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Eye className="h-3.5 w-3.5" />
              Application screenshots
            </div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Code and geometry, side by side
            </h2>
          </div>
          <a
            href={`${repositoryUrl}/blob/master/Screenshot.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
          >
            View original assets
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-lg dark:border-zinc-800 lg:col-span-3">
            <img
              src="/opensharpcad/main-ide.png"
              alt="OpenSharpCAD main IDE with a C# editor, 3D viewport, and Problems panel"
              className="block h-full w-full object-cover object-top"
              loading="eager"
            />
            <figcaption className="border-t border-white/10 bg-zinc-900 px-5 py-4 text-sm leading-relaxed text-zinc-300">
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                Main IDE & live viewport
              </span>
              Live C# scripting and Roslyn compilation on the left; an interactive OpenGL 3D viewport, axis gizmo, and compiler status on the right.
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-lg dark:border-zinc-800 lg:col-span-2">
            <img
              src="/opensharpcad/help-reference.png"
              alt="OpenSharpCAD interactive Cheat Sheet and Reference window"
              className="block h-full w-full object-cover object-top"
              loading="lazy"
            />
            <figcaption className="border-t border-white/10 bg-zinc-900 px-5 py-4 text-sm leading-relaxed text-zinc-300">
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                In-app Cheat Sheet & Reference
              </span>
              Press F1 for categorized primitives, signatures, interactive previews, and one-click code insertion.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <Cpu className="h-3.5 w-3.5" />
            Key features
          </div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            A programming language is a capable modeling tool
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            The README’s core CAD workflow, shaped into reusable building blocks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-500/30 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2" id="examples">
        <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <Code className="h-4 w-4 text-sky-400" />
              CSG boolean math
            </div>
            <CopyButton content={csgExample} copyKey="csg" copiedKey={copiedKey} onCopy={copyToClipboard} />
          </div>
          <pre className="overflow-x-auto p-5 text-[12px] leading-6 text-zinc-200 sm:text-sm"><code>{csgExample}</code></pre>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <Shapes className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">C# becomes the CAD language</h2>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            OpenSharpCAD keeps the familiar code-first ideas of OpenSCAD while using C# language features, ordinary methods and classes, and the wider .NET ecosystem.
          </p>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            {[
              "Use type-safe C# methods, classes, records, extension methods, and namespaces.",
              "Compose boolean operations with the +, -, and * operators instead of nested blocks.",
              "Use IntelliSense, parameter information, diagnostics, and a Problems panel while modeling.",
              "Reuse libraries, test dimensional logic, and work with familiar .NET tools.",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-16 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 shadow-xl dark:border-zinc-800">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-400">
              <Code className="h-3.5 w-3.5" />
              From the README
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white">
              Model complex forms from simple solids
            </h2>
            <p className="mb-6 max-w-xl leading-relaxed text-zinc-300">
              This OpenSCAD-logo example uses a sphere and three rotated cylinders. The C# implementation returns their difference as an ordinary function, ready to be reused elsewhere in a design.
            </p>
            <a
              href={`${repositoryUrl}/blob/master/README.md#-code-examples`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition hover:text-sky-300"
            >
              Browse more code examples
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="border-t border-zinc-800 bg-zinc-900/50 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
              <span className="font-mono text-xs text-zinc-400">logo.cs</span>
              <CopyButton content={logoExample} copyKey="logo" copiedKey={copiedKey} onCopy={copyToClipboard} />
            </div>
            <pre className="max-h-[400px] overflow-auto p-5 text-[11px] leading-5 text-zinc-200 sm:text-xs"><code>{logoExample}</code></pre>
          </div>
        </div>
      </section>

      <section className="mt-16 scroll-mt-8" id="downloads">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300">
            <Download className="h-3.5 w-3.5" />
            Current GitHub release
          </div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Download OpenSharpCAD {release.version}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Published {release.publishedAt}. Choose a packaged desktop build, or build from source for Linux and development workflows.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {release.assets.map((asset) => {
            const Icon = asset.icon;
            const isWindows = asset.id === "windows";
            return (
              <article
                key={asset.id}
                className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 ${
                  isWindows
                    ? "border-sky-500/40 dark:border-sky-500/40"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className={`inline-flex rounded-xl p-3 ${isWindows ? "bg-sky-500/10 text-sky-600 dark:text-sky-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {asset.architecture}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-zinc-900 dark:text-white">{asset.platform}</h3>
                <p className="mb-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">{asset.name} · {asset.size}</p>
                <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{asset.description}</p>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    isWindows
                      ? "bg-sky-600 text-white hover:bg-sky-500"
                      : "border border-zinc-300 text-zinc-800 hover:border-sky-400 hover:text-sky-700 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-sky-500 dark:hover:text-sky-300"
                  }`}
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
            <Terminal className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">Linux or development build?</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Clone the repository with submodules, then build with .NET 10 and GLFW.
              </p>
            </div>
          </div>
          <a
            href="#build"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-sky-500/30 px-3.5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/10 dark:text-sky-300"
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
          >
            View all releases on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="mt-16 scroll-mt-8" id="build">
        <div className="mb-7 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <Terminal className="h-3.5 w-3.5" />
            Build from source
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Set up a local development build
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
            {sourceBuilds.map((build) => {
              const Icon = build.icon;
              const isActive = build.id === activeBuild;
              return (
                <button
                  type="button"
                  key={build.id}
                  onClick={() => setActiveBuild(build.id)}
                  className={`flex min-w-[150px] flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                    isActive
                      ? "border-sky-500 bg-sky-500/5 text-sky-700 dark:text-sky-300"
                      : "border-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
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
                <span className="mb-3 inline-flex rounded-md border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-[11px] font-mono font-medium text-sky-700 dark:text-sky-300">
                  {activeBuildDetails.badge}
                </span>
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">{activeBuildDetails.title} setup</h3>
                <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{activeBuildDetails.description}</p>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-100">
                    <Info className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    Prerequisite
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">Install the .NET 10 SDK before building OpenSharpCAD.</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
                  <span className="font-mono text-xs text-zinc-400">terminal</span>
                  <CopyButton content={activeBuildDetails.command} copyKey={activeBuildDetails.id} copiedKey={copiedKey} onCopy={copyToClipboard} />
                </div>
                <pre className="overflow-x-auto p-5 text-xs leading-6 text-zinc-100 sm:text-sm"><code>{`git clone --recursive ${repositoryUrl}.git\ncd OpenSharpCAD\n\n${activeBuildDetails.command}`}</code></pre>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400"><Globe className="h-5 w-5" /></span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Interactive documentation</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Explore the Three.js documentation viewer, web API reference, and the in-app F1 cheat sheet.</p>
          <a href={`${repositoryUrl}/tree/master/doc`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">Open documentation <ArrowRight className="h-4 w-4" /></a>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400"><Keyboard className="h-5 w-5" /></span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Examples and tests</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Browse standalone examples, command-line projects, API tests, and unit tests in the source tree.</p>
          <a href={`${repositoryUrl}/tree/master/Examples`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">Browse examples <ArrowRight className="h-4 w-4" /></a>
        </article>
        <article className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 dark:bg-sky-500/10">
          <span className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400"><ShieldCheck className="h-5 w-5" /></span>
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">Scripts are executable C#</h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">Treat unknown CAD scripts with care. The README documents Roslyn guardrails and recommends isolating completely untrusted automation.</p>
          <a href={`${repositoryUrl}/blob/master/README.md#-security-considerations`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">Read security notes <ArrowRight className="h-4 w-4" /></a>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
          OpenSharpCAD is inspired by MatterCAD and built for a programmable, reusable approach to 3D design.
        </p>
        <a
          href="https://www.matterhackers.com/news/mattercad-design-your-3d-parts-in-csharp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
        >
          Read about the original MatterCAD project
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>
    </main>
  );
}
