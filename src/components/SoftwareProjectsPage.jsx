import { Cpu, ArrowRight, CheckCircle2, Download, ExternalLink } from 'lucide-react';

const softwareProjects = [
  {
    id: 'pulse',
    title: 'Pulse',
    tagline: '3D CAD & Engineering Tool',
    shortDescription:
      'A high-performance 3D CAD application designed for engineers and makers. Built with modern C++ and Qt, featuring real-time viewport, parametric modeling, and advanced mesh editing capabilities.',
    category: 'Parametric 3D CAD',
    statusBadge: 'v0.0.1 • Win & Mac Release',
    statusColor: 'emerald',
    platforms: ['Windows (.zip)', 'macOS (.dmg)'],
    techStack: ['C++17', 'Qt6', 'OpenGL', 'Boost', 'Vulkan'],
    features: [
      'Real-time 3D viewport with hardware-accelerated rendering',
      'Parametric modeling with constraints and relationships',
      'Advanced mesh editing tools and topology manipulation',
      'Native Windows (.zip) and macOS DMG releases',
    ],
    fullPageUrl: '/software/pulse',
    githubUrl: 'https://github.com/roboter/pulse',
    downloadUrl: 'https://github.com/roboter/pulse/releases/tag/v0.0.1',
    previewImage: '/images/pulse/ui.png',
    accentColor: 'from-indigo-500 to-sky-500',
    buttonBg: 'bg-indigo-600 hover:bg-indigo-500',
  },
  {
    id: 'antimony',
    title: 'Antimony',
    tagline: 'Graph-Based Parametric CAD Engine',
    shortDescription:
      "A CAD tool from a parallel universe, built around signed distance functions (F-Reps) and Python scripts. Forked from Matt Keeter's project — this fork adds native Windows and Linux build support with pre-compiled releases for Windows (.zip), Linux (.deb / .tar.gz), and macOS (.dmg).",
    category: 'Parametric 3D CAD',
    statusBadge: 'v0.9.7 • Win, Linux & Mac Release',
    statusColor: 'emerald',
    platforms: ['Windows (.zip)', 'Linux (.deb / .tar.gz)', 'macOS (.dmg)'],
    techStack: ['C++11', 'Qt5', 'Python 3', 'OpenGL', 'Boost', 'libantimony', 'Signed Distance Functions'],
    features: [
      'Node-based parametric modeling graph with real-time 3D viewport',
      'Pre-compiled Windows (.zip), Linux (.deb/.tar.gz), and macOS DMG releases',
      'Geometry represented by functional signed distance fields (F-Reps)',
      'Custom Python-scripted shapes, math expressions & functional transforms',
    ],
    fullPageUrl: '/software/antimony',
    githubUrl: 'https://github.com/roboter/antimony',
    downloadUrl: 'https://github.com/roboter/antimony/releases/tag/0.9.7',
    previewImage: '/images/antimony/preview.png',
    accentColor: 'from-amber-500 to-orange-500',
    buttonBg: 'bg-amber-600 hover:bg-amber-500',
  },
  {
    id: 'opensharpcad',
    title: 'OpenSharpCAD',
    tagline: 'Parametric 3D CAD with C#',
    shortDescription:
      'An OpenSCAD-inspired parametric CAD IDE for designing 3D parts with C#. Write geometry with natural CSG operators, get instant Roslyn-powered previews, and build for Windows, macOS, or Linux with .NET 10.',
    category: 'Parametric 3D CAD',
    statusBadge: 'v0.0.1 Release',
    statusColor: 'emerald',
    platforms: ['Windows x64', 'macOS Intel', 'Apple Silicon'],
    techStack: ['C# 13', '.NET 10', 'Roslyn', 'OpenGL / WebGL', 'GLFW'],
    features: [
      'Live C# editing with Roslyn compilation and hardware-accelerated 3D previews',
      'Natural CSG boolean math, primitives, extrusions, transforms, and animation',
      'Release downloads for Windows x64 and macOS on Intel or Apple Silicon',
    ],
    fullPageUrl: '/software/opensharpcad',
    githubUrl: 'https://github.com/roboter/OpenSharpCAD',
    downloadUrl: 'https://github.com/roboter/OpenSharpCAD/releases/tag/0.0.1',
    previewImage: '/images/opensharpcad/main-ide.png',
    accentColor: 'from-sky-500 to-indigo-500',
    buttonBg: 'bg-sky-600 hover:bg-sky-500',
  },
];

export default function SoftwareProjectsPage() {
  const pageTitle = 'Software & Desktop Projects';
  const pageDescription =
    'High-performance native utilities, CAD layout tools, and desktop applications built for engineers, makers, and enthusiasts.';

  return (
    <Base
      title={pageTitle}
      meta_title={pageTitle}
      description={pageDescription}
      hideHero={true}
      hideVideos={true}
      fullWidth={false}
    >
      <div class="py-4">
        {/* HEADER SECTION */}
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-xs font-medium text-indigo-600 shadow-sm backdrop-blur-sm dark:text-indigo-400">
            <Cpu className="h-3.5 w-3.5" />
            <span>Native Desktop &amp; Engineering Software</span>
          </div>

          <h1 class="mb-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            Software &amp; Desktop Projects
          </h1>

          <p class="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
            High-performance native utilities, CAD layout tools, and desktop applications built for engineers, makers,
            and enthusiasts.
          </p>
        </div>

        {/* SOFTWARE CARDS GRID */}
        <div class="mx-auto max-w-4xl space-y-10">
          {softwareProjects.map((software) => (
            <article
              key={software.id}
              class="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/80 md:flex-row"
            >
              {/* LEFT: PREVIEW IMAGE OR VIDEO */}
              <div class="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-zinc-950 md:min-h-[280px] md:w-5/12">
                <a href={software.fullPageUrl} class="group/img relative block h-full w-full overflow-hidden">
                  <img
                    src={software.previewImage}
                    alt={`${software.title} interface preview`}
                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900/40"></div>
                  <div class="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded border border-white/10 bg-zinc-900/90 px-2.5 py-1 font-mono text-[11px] text-white opacity-0 backdrop-blur-md transition-opacity group-hover/img:opacity-100">
                    <span>View Full Page</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </a>
              </div>

              {/* RIGHT: DETAILS */}
              <div class="flex flex-col justify-between p-6 sm:p-8 md:w-7/12">
                <div>
                  {/* TOP TAGS */}
                  <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span class="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {software.category}
                    </span>

                    <span
                      class={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                        software.statusColor === 'emerald'
                          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : software.statusColor === 'amber'
                            ? 'border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      {software.statusBadge}
                    </span>
                  </div>

                  {/* TITLE & TAGLINE */}
                  <h2 class="mb-1 text-2xl font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    <a href={software.fullPageUrl}>{software.title}</a>
                  </h2>

                  <p class="mb-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">{software.tagline}</p>

                  {/* SHORT DESCRIPTION */}
                  <p class="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {software.shortDescription}
                  </p>

                  {/* HIGHLIGHTED FEATURES */}
                  <ul class="mb-5 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {software.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} class="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* TECH PILLS */}
                  <div class="mb-6 flex flex-wrap gap-1.5">
                    {software.techStack.map((tech) => (
                      <span
                        key={tech}
                        class="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div class="flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <a
                    href={software.fullPageUrl}
                    class={`group/btn flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-md transition-all ${software.buttonBg}`}
                  >
                    <span>Full Page Overview</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>

                  {software.downloadUrl && (
                    <a
                      href={software.downloadUrl}
                      target={software.downloadUrl.startsWith('http') ? '_blank' : undefined}
                      rel={software.downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      class="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-500/20 dark:text-emerald-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  )}

                  {software.githubUrl && (
                    <a
                      href={software.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  <span class="ml-auto font-mono text-[11px] text-zinc-400">{software.platforms.join(' • ')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Base>
  );
}
