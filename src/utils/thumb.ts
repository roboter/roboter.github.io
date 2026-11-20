import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

/**
 * Resolves a local `/images/...` path to its compact pre-generated WebP thumbnail
 * under `/images/_thumbs/...` when available (used for small card previews).
 * Falls back cleanly to the original path for SVGs, remote URLs, or unindexed images.
 */
export function getThumbSrc(src?: string): string {
  if (!src || !src.startsWith('/images/')) return src || '';
  if (src.endsWith('.svg') || src.startsWith('/images/thumbs/')) return src;

  const rel = src.slice('/images/'.length).replace(/\.[^.]+$/, '.webp');
  const thumbDiskPath = path.join(PUBLIC_IMAGES_DIR, 'thumbs', rel);
  if (fs.existsSync(thumbDiskPath)) {
    return `/images/thumbs/${rel.replace(/\\/g, '/')}`;
  }
  return src;
}
