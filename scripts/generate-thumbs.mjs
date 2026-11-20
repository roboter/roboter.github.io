import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const THUMBS_ROOT = path.join(PUBLIC_DIR, 'images', '_thumbs');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const TOOLS_DATA = path.join(ROOT, 'src', 'data', 'tools.ts');

const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function collectImagePaths() {
  const paths = new Set();

  if (fs.existsSync(BLOG_DIR)) {
    for (const file of fs.readdirSync(BLOG_DIR)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const m = content.match(/^heroImage:\s*['"]([^'"]+)['"]/m);
      if (m && m[1].startsWith('/images/')) paths.add(m[1]);
    }
  }

  if (fs.existsSync(TOOLS_DATA)) {
    const content = fs.readFileSync(TOOLS_DATA, 'utf8');
    const re = /previewImage:\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      if (m[1].startsWith('/images/')) paths.add(m[1]);
    }
  }

  return [...paths];
}

async function optimizeNewHeroIfHuge() {
  const heroPath = path.join(PUBLIC_DIR, 'images', '20261120-CH32V003-Si5351A-Signal-Generator', 'hero.jpg');
  if (!fs.existsSync(heroPath)) return;
  const stat = fs.statSync(heroPath);
  if (stat.size > 600_000) {
    const tmpPath = heroPath + '.opt.jpg';
    await sharp(heroPath)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(tmpPath);
    fs.renameSync(tmpPath, heroPath);
    const newStat = fs.statSync(heroPath);
    console.log(`Optimized hero.jpg: ${(stat.size / 1024).toFixed(0)} KB -> ${(newStat.size / 1024).toFixed(0)} KB`);
  }
}

async function main() {
  await optimizeNewHeroIfHuge();

  const imgPaths = collectImagePaths();
  let totalOrig = 0;
  let totalThumb = 0;
  let count = 0;

  for (const webPath of imgPaths) {
    const relFromImages = webPath.replace(/^\/images\//, '');
    const srcFile = path.join(PUBLIC_DIR, 'images', relFromImages);
    if (!fs.existsSync(srcFile)) continue;

    const ext = path.extname(srcFile).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;

    const thumbRel = relFromImages.replace(/\.[^.]+$/, '.webp');
    const outFile = path.join(THUMBS_ROOT, thumbRel);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });

    const origSize = fs.statSync(srcFile).size;
    await sharp(srcFile)
      .rotate()
      .resize(480, 270, { fit: 'cover', position: 'attention' })
      .webp({ quality: 78, effort: 5 })
      .toFile(outFile);

    const thumbSize = fs.statSync(outFile).size;
    totalOrig += origSize;
    totalThumb += thumbSize;
    count++;
    console.log(
      `[thumb] ${relFromImages} (${(origSize / 1024).toFixed(0)} KB) -> _thumbs/${thumbRel} (${(thumbSize / 1024).toFixed(1)} KB)`
    );
  }

  const savedPct = totalOrig > 0 ? ((1 - totalThumb / totalOrig) * 100).toFixed(1) : '0';
  console.log(
    `\nGenerated ${count} WebP previews: ${(totalOrig / 1024 / 1024).toFixed(2)} MB -> ${(totalThumb / 1024).toFixed(1)} KB (${savedPct}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
