import { getCollection } from 'astro:content';
import youtubeData from '@config/youtube.json';
import { softwareProjects, type SoftwareProject } from '../data/software';
import { tools, type ToolItem } from '../data/tools';

export interface TagItem {
  type: 'article' | 'video' | 'software' | 'tool';
  id: string;
  title: string;
  description?: string;
  url: string;
  date?: Date | string;
  badge?: string;
  tags: string[];
  extra?: {
    videoId?: string;
    duration?: string;
    views?: string;
    techStack?: string[];
    category?: string;
    platforms?: string[];
    previewImage?: string;
    accentColor?: string;
    githubUrl?: string;
    downloadUrl?: string;
  };
}

export interface UnifiedTag {
  slug: string;
  name: string;
  totalCount: number;
  articleCount: number;
  videoCount: number;
  softwareCount: number;
  toolCount: number;
  items: TagItem[];
}

const SPECIAL_NAMES: Record<string, string> = {
  'c-sharp': 'C#',
  dotnet: '.NET',
  cpp: 'C++',
  i2c: 'I2C',
  spi: 'SPI',
  stm32: 'STM32',
  wch: 'WCH',
  gd32: 'GD32',
  gd32vf103: 'GD32VF103',
  ch32: 'CH32',
  ch32v003: 'CH32V003',
  lcd: 'LCD',
  oled: 'OLED',
  ssd1306: 'SSD1306',
  hd44780: 'HD44780',
  pcf8564: 'PCF8564',
  chx711: 'CHX711',
  ds1302: 'DS1302',
  rtc: 'RTC',
  dht11: 'DHT11',
  rp2040: 'RP2040',
  nrf: 'nRF',
  sbc: 'SBC',
  'risc-v': 'RISC-V',
  ide: 'IDE',
  cad: 'CAD',
  csg: 'CSG',
  pcb: 'PCB',
  pcbx: 'PCBX',
  smd: 'SMD',
  tht: 'THT',
  'qr-code': 'QR Code',
  mp3: 'MP3',
  iot: 'IoT',
  ai: 'AI',
  chatgpt: 'ChatGPT',
  ttgo: 'TTGO',
  esp32: 'ESP32',
  'e-ink': 'E-Ink',
  lilygo: 'LilyGO',
  hal: 'HAL',
  avr: 'AVR',
  atmega328: 'ATmega328',
  openscad: 'OpenSCAD',
  skiasharp: 'SkiaSharp',
  'adafruit-gfx': 'Adafruit_GFX',
  simulide: 'SimulIDE',
  embeetle: 'Embeetle',
  gigadevice: 'GigaDevice',
  diy: 'DIY',
  'diy-electronics': 'DIY Electronics',
  'rabbit-2000': 'Rabbit 2000',
  '8-bit': '8-Bit',
  z80: 'Z80',
};

export function tagToSlug(tag: string): string {
  if (!tag) return '';
  let s = String(tag).trim();
  s = s.replace(/^#/, '');
  s = s.replace(/\.NET/gi, 'dotnet');
  s = s.replace(/C#/gi, 'c-sharp');
  s = s.replace(/C\+\+/gi, 'cpp');
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]+/g, '-');
  s = s.replace(/^-+|-+$/g, '');
  return s;
}

export function getCanonicalTagName(slug: string, rawNames: Set<string>): string {
  if (SPECIAL_NAMES[slug]) return SPECIAL_NAMES[slug];
  const list = [...rawNames].filter(Boolean);
  list.sort((a, b) => {
    const score = (str: string) => {
      if (/^[A-Z][a-z0-9]+(?:[A-Z\s_-][a-z0-9]+)*$/.test(str)) return 3; // TitleCase
      if (/[A-Z]/.test(str) && !/^[A-Z0-9_-]+$/.test(str)) return 2; // Mixed case
      if (/^[A-Z0-9_-]+$/.test(str) && str.length <= 4) return 2.5; // Short acronym
      if (/^[A-Z0-9_-]+$/.test(str)) return 1.5; // Long all caps
      return 1;
    };
    return score(b) - score(a);
  });
  const best = list[0];
  if (!best || best.toLowerCase() === best) {
    return (best || slug)
      .split(/[-_\s]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return best;
}

export async function getAllUnifiedTags(): Promise<UnifiedTag[]> {
  const allItems: TagItem[] = [];

  // 1. Articles (Blog)
  try {
    const blogPosts = await getCollection('blog');
    for (const post of blogPosts) {
      if (post.data.draft) continue;
      if (!post.id.match(/^(?!-)/)) continue;
      const tags = (post.data.tags || []).map((t) => String(t).trim()).filter(Boolean);
      allItems.push({
        type: 'article',
        id: post.id || post.slug,
        title: post.data.title,
        description: post.data.description,
        url: `/blog/${post.id || post.slug}/`,
        date: post.data.pubDate,
        badge: 'Article',
        tags,
        extra: {
          category: post.data.categories?.[0] || 'Blog',
        },
      });
    }
  } catch (e) {
    console.error('Error loading blog posts for tags:', e);
  }

  // 2. Videos (YouTube)
  try {
    const videos = Array.isArray(youtubeData) ? youtubeData : [];
    for (const v of videos) {
      const tags = (v.tags || []).map((t: string) => String(t).trim()).filter(Boolean);
      allItems.push({
        type: 'video',
        id: v.videoId,
        title: v.title,
        description: v.description,
        url: `https://www.youtube.com/watch?v=${v.videoId}`,
        date: v.published,
        badge: 'Video',
        tags,
        extra: {
          videoId: v.videoId,
          duration: v.duration,
          views: v.views,
        },
      });
    }
  } catch (e) {
    console.error('Error loading youtube data for tags:', e);
  }

  // 3. Software
  for (const s of softwareProjects) {
    const tags = (s.tags || []).map((t) => String(t).trim()).filter(Boolean);
    allItems.push({
      type: 'software',
      id: s.id,
      title: s.title,
      description: s.shortDescription,
      url: s.fullPageUrl,
      badge: 'Software',
      tags,
      extra: {
        category: s.category,
        techStack: s.techStack,
        platforms: s.platforms,
        previewImage: s.previewImage,
        accentColor: s.accentColor,
        githubUrl: s.githubUrl,
        downloadUrl: s.downloadUrl,
      },
    });
  }

  // 4. Tools
  for (const t of tools) {
    const tags = (t.tags || []).map((tag) => String(tag).trim()).filter(Boolean);
    allItems.push({
      type: 'tool',
      id: t.id,
      title: t.title,
      description: t.shortDescription,
      url: t.toolUrl,
      badge: 'Tool',
      tags,
      extra: {
        category: t.category,
        techStack: t.techStack,
        platforms: t.platforms,
        previewImage: t.previewImage,
        accentColor: t.accentColor,
      },
    });
  }

  // Build tag map
  const tagMap = new Map<string, { rawNames: Set<string>; items: TagItem[] }>();

  for (const item of allItems) {
    // Collect slugs for this item, avoiding duplicate slugs within the same item
    const itemSlugs = new Set<string>();
    for (const rawTag of item.tags) {
      const slug = tagToSlug(rawTag);
      if (!slug) continue;
      itemSlugs.add(slug);

      if (!tagMap.has(slug)) {
        tagMap.set(slug, { rawNames: new Set(), items: [] });
      }
      const entry = tagMap.get(slug)!;
      entry.rawNames.add(rawTag);
    }

    for (const slug of itemSlugs) {
      tagMap.get(slug)!.items.push(item);
    }
  }

  // Build UnifiedTag array (strictly excluding empty tags)
  const unifiedTags: UnifiedTag[] = [];

  for (const [slug, { rawNames, items }] of tagMap.entries()) {
    if (!slug || items.length === 0) continue;

    const articleCount = items.filter((i) => i.type === 'article').length;
    const videoCount = items.filter((i) => i.type === 'video').length;
    const softwareCount = items.filter((i) => i.type === 'software').length;
    const toolCount = items.filter((i) => i.type === 'tool').length;
    const totalCount = items.length;

    if (totalCount === 0) continue; // Guarantee no empty tags

    unifiedTags.push({
      slug,
      name: getCanonicalTagName(slug, rawNames),
      totalCount,
      articleCount,
      videoCount,
      softwareCount,
      toolCount,
      items,
    });
  }

  // Sort by count descending, then alphabetically by name
  unifiedTags.sort((a, b) => b.totalCount - a.totalCount || a.name.localeCompare(b.name));

  return unifiedTags;
}

export async function getUnifiedTagBySlug(slug: string): Promise<UnifiedTag | undefined> {
  const allTags = await getAllUnifiedTags();
  const normalized = tagToSlug(slug);
  return allTags.find((t) => t.slug === normalized);
}
