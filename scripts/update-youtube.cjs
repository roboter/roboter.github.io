/**
 * Update YouTube Videos, Tags & Categories Script
 * Run with: npm run update
 *
 * Capabilities:
 * 1. Checks for YouTube Data API v3 key (if configured in .env).
 * 2. If no API key or on quota limit, automatically fetches the channel's
 *    public YouTube Atom RSS feed to discover new uploads without any API key.
 * 3. Intelligently inspects video titles, descriptions, and hashtags to
 *    auto-generate and normalize relevant topic tags and site categories.
 * 4. Merges and updates src/config/youtube.json with clean, enriched metadata.
 */

const fs = require('fs');
const path = require('path');

// Try loading dotenv if present
try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional
}

const CHANNEL_ID = process.env.CHANNEL_ID || 'UCBHWZ3DA4f7c1eKFUC4f1cA';
const API_KEY = process.env.API_KEY || '';
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'config', 'youtube.json');

// Taxonomy rules for auto-tagging and category assignment
const KEYWORD_RULES = [
  { pattern: /\barduino\b/i, tag: 'Arduino', category: 'arduino' },
  { pattern: /\bstm32\b/i, tag: 'STM32', category: 'stm32' },
  { pattern: /\b(esp32|esp8266|nodemcu)\b/i, tag: 'ESP32', category: 'esp32' },
  { pattern: /\b(wch|ch32|ch32v\d+|ch32x\d+)\b/i, tag: 'WCH', category: 'wch' },
  { pattern: /\b(gigadevice|gd32|gd32vf\d*)\b/i, tag: 'GigaDevice', category: 'gigadevice' },
  { pattern: /\b(geehy|apm32|apm32f\d*)\b/i, tag: 'Geehy', category: 'geehy' },
  { pattern: /\b(pcb|gerber|kicad|pcbx|soldering|traces)\b/i, tag: 'PCB', category: 'pcb' },
  { pattern: /\b(openscad|freecad|antimony|cad|3d printing|3d model|3d modeling)\b/i, tag: 'CAD', category: 'electronics' },
  { pattern: /\bopenscad\b/i, tag: 'OpenSCAD', category: 'electronics' },
  { pattern: /\b(oled|ssd1306|sh1106)\b/i, tag: 'OLED', category: 'electronics' },
  { pattern: /\b(lcd|hd44780|character lcd|1602|2004)\b/i, tag: 'LCD', category: 'electronics' },
  { pattern: /\b(epaper|e-ink|t5 epaper|lilygo)\b/i, tag: 'E-Ink', category: 'embedded' },
  { pattern: /\b(ds1302|ds3231|pcf8564|rtc|real-time clock)\b/i, tag: 'RTC', category: 'electronics' },
  { pattern: /\b(pcf8574|i2c|i2c expander)\b/i, tag: 'I2C', category: 'electronics' },
  { pattern: /\b(hx711|chx711|load cell|strain gauge|scale)\b/i, tag: 'HX711', category: 'electronics' },
  { pattern: /\b(rp2040|raspberry pi pico|pico)\b/i, tag: 'RP2040', category: 'embedded' },
  { pattern: /\b(nrf|nrf52|nrf24)\b/i, tag: 'nRF', category: 'embedded' },
  { pattern: /\b(risc-v|riscv)\b/i, tag: 'RISC-V', category: 'embedded' },
  { pattern: /\b(dev board|dev boards|development board|mcu|microcontroller)\b/i, tag: 'Dev Boards', category: 'embedded' },
  { pattern: /\b(rabbit|rabbit 2000)\b/i, tag: 'Rabbit 2000', category: 'rabbit-2000' },
  { pattern: /\b(shield|joystick)\b/i, tag: 'Shield', category: 'arduino' },
  { pattern: /\b(linux)\b/i, tag: 'Linux', category: 'embedded' },
  { pattern: /\b(neopixel|ws2812|ws2812b|led|leds)\b/i, tag: 'NeoPixel', category: 'electronics' },
  { pattern: /\b(diy|maker|hardware)\b/i, tag: 'DIY', category: 'electronics' },
  { pattern: /\b(review)\b/i, tag: 'Review', category: 'electronics' },
  { pattern: /\b(tutorial|guide|how-to)\b/i, tag: 'Tutorial', category: 'electronics' },
];

// Normalize tag name casing
const TAG_CANONICAL = {
  'arduino': 'Arduino',
  'stm32': 'STM32',
  'esp32': 'ESP32',
  'wch': 'WCH',
  'ch32': 'CH32',
  'ch32v003': 'CH32V003',
  'pcb': 'PCB',
  'cad': 'CAD',
  'openscad': 'OpenSCAD',
  'oled': 'OLED',
  'lcd': 'LCD',
  'rtc': 'RTC',
  'ds1302': 'DS1302',
  'pcf8574': 'PCF8574',
  'i2c': 'I2C',
  'spi': 'SPI',
  'hx711': 'HX711',
  'rp2040': 'RP2040',
  'nrf': 'nRF',
  'risc-v': 'RISC-V',
  'geehy': 'Geehy',
  'gigadevice': 'GigaDevice',
  'gd32': 'GD32',
  'apm32': 'APM32',
  'rabbit-2000': 'Rabbit 2000',
  'rabbit': 'Rabbit 2000',
  'dev boards': 'Dev Boards',
  'diy': 'DIY',
  'linux': 'Linux',
  'neopixel': 'NeoPixel',
  'shield': 'Shield',
  'joystick': 'Joystick',
  'review': 'Review',
  'collection': 'Collection',
  '3d printing': '3D Printing',
};

function normalizeTag(tag) {
  if (!tag) return '';
  const clean = String(tag).trim().replace(/^#/, '');
  const lower = clean.toLowerCase();
  return TAG_CANONICAL[lower] || clean.charAt(0).toUpperCase() + clean.slice(1);
}

// Extract hashtags from title and description
function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#([a-zA-Z0-9_\-]+)/g) || [];
  return matches.map((m) => normalizeTag(m));
}

// Infer tags and categories for a video
function enrichVideoTagsAndCategories(video) {
  const fullText = `${video.title || ''} ${video.description || ''}`;
  const existingTags = (video.tags || []).map(normalizeTag).filter(Boolean);
  const tagSet = new Set(existingTags);
  const catSet = new Set(video.categories || []);

  // 1. Extract embedded hashtags
  const hashtags = extractHashtags(fullText);
  for (const h of hashtags) {
    tagSet.add(h);
  }

  // 2. Keyword rules matching
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(fullText)) {
      tagSet.add(rule.tag);
      if (rule.category) {
        catSet.add(rule.category);
      }
    }
  }

  // Ensure every video has at least 'DIY' or 'Electronics' if empty
  if (catSet.size === 0) {
    catSet.add('electronics');
  }
  if (tagSet.size === 0) {
    tagSet.add('Electronics');
  }

  const updatedTags = Array.from(tagSet);
  const updatedCategories = Array.from(catSet);

  return {
    ...video,
    tags: updatedTags,
    categories: updatedCategories,
  };
}

// Fetch channel videos via public YouTube RSS feed (no API key needed)
async function fetchVideosFromRss(channelId) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[WARN] RSS fetch failed with status ${res.status}`);
      return [];
    }
    const xml = await res.text();

    const entries = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
      const entryXml = match[1];

      const videoIdMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
      const descMatch = entryXml.match(/<media:description>([\s\S]*?)<\/media:description>/);
      const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);
      const viewsMatch = entryXml.match(/<media:statistics views="(\d+)"/);
      const thumbMatch = entryXml.match(/<media:thumbnail url="([^"]+)"/);

      if (videoIdMatch && titleMatch) {
        const videoId = videoIdMatch[1].trim();
        const title = titleMatch[1].trim();
        const description = descMatch ? descMatch[1].trim() : title;
        const publishedDate = publishedMatch ? publishedMatch[1].trim() : '';
        const viewCount = viewsMatch ? parseInt(viewsMatch[1], 10) : null;
        const thumbUrl = thumbMatch ? thumbMatch[1].trim() : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        entries.push({
          title,
          description,
          videoId,
          channelId,
          channelTitle: 'Robby roboter',
          channelUrl: `https://www.youtube.com/channel/${channelId}`,
          published: publishedDate ? new Date(publishedDate).toLocaleDateString() : 'Recently',
          views: viewCount !== null ? `${viewCount.toLocaleString()} views` : undefined,
          thumbnails: {
            default: { url: `https://i.ytimg.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
            medium: { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
            high: { url: thumbUrl, width: 480, height: 360 },
          },
        });
      }
    }

    return entries;
  } catch (err) {
    console.warn('[WARN] RSS fetch error:', err.message);
    return [];
  }
}

// Fetch channel videos via YouTube Data API v3 (if API_KEY configured)
async function fetchVideosFromApi(apiKey, channelId) {
  try {
    const { google } = require('googleapis');
    const youtube = google.youtube({ version: 'v3', auth: apiKey });

    console.log(`[API] Fetching videos via YouTube Data API v3 for channel: ${channelId}...`);

    // Get channel uploads playlist ID
    const chRes = await youtube.channels.list({
      part: 'contentDetails',
      id: channelId,
    });

    const uploadsPlaylistId = chRes.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      console.warn('[API] Could not retrieve uploads playlist ID.');
      return [];
    }

    // Retrieve up to 50 playlist items
    const playlistRes = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: uploadsPlaylistId,
      maxResults: 50,
    });

    const items = playlistRes.data.items || [];
    const videoIds = items.map((i) => i.snippet?.resourceId?.videoId).filter(Boolean);

    if (videoIds.length === 0) return [];

    // Retrieve detailed statistics & contentDetails (duration, views, tags)
    const detailRes = await youtube.videos.list({
      part: 'snippet,contentDetails,statistics',
      id: videoIds.join(','),
    });

    return (detailRes.data.items || []).map((v) => {
      // Parse ISO 8601 duration (e.g. PT8M31S -> 8:31)
      let formattedDuration = undefined;
      const iso = v.contentDetails?.duration;
      if (iso) {
        const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (m) {
          const h = m[1] ? `${m[1]}:` : '';
          const mins = m[2] ? (m[1] ? m[2].padStart(2, '0') : m[2]) : '0';
          const secs = (m[3] || '0').padStart(2, '0');
          formattedDuration = `${h}${mins}:${secs}`;
        }
      }

      const viewCount = v.statistics?.viewCount ? parseInt(v.statistics.viewCount, 10) : null;

      return {
        title: v.snippet?.title || '',
        description: v.snippet?.description || '',
        tags: v.snippet?.tags || [],
        channelId,
        channelTitle: v.snippet?.channelTitle || 'Robby roboter',
        channelUrl: `https://www.youtube.com/channel/${channelId}`,
        videoId: v.id,
        views: viewCount !== null ? `${viewCount.toLocaleString()} views` : undefined,
        duration: formattedDuration,
        published: v.snippet?.publishedAt ? new Date(v.snippet.publishedAt).toLocaleDateString() : undefined,
        thumbnails: v.snippet?.thumbnails || {
          high: { url: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, width: 480, height: 360 },
        },
      };
    });
  } catch (err) {
    console.warn('[API] YouTube Data API failed:', err.message);
    return [];
  }
}

async function main() {
  console.log('⚡ [UPDATE] Starting YouTube Videos, Tags & Categories update...');

  // 1. Load existing data
  let existingVideos = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      existingVideos = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
      console.log(`[INFO] Loaded ${existingVideos.length} existing videos from youtube.json`);
    } catch (e) {
      console.warn('[WARN] Could not parse existing youtube.json');
    }
  }

  const videoMap = new Map();
  for (const v of existingVideos) {
    if (v.videoId) {
      videoMap.set(v.videoId, v);
    }
  }

  // 2. Fetch fresh videos (via API if key available, else via RSS)
  let fetchedVideos = [];
  if (API_KEY) {
    fetchedVideos = await fetchVideosFromApi(API_KEY, CHANNEL_ID);
  }

  if (fetchedVideos.length === 0) {
    console.log('[INFO] Fetching latest videos from public YouTube RSS feed...');
    fetchedVideos = await fetchVideosFromRss(CHANNEL_ID);
  }

  let newVideosCount = 0;
  for (const fresh of fetchedVideos) {
    if (!videoMap.has(fresh.videoId)) {
      videoMap.set(fresh.videoId, fresh);
      newVideosCount++;
    } else {
      // Merge newer details like view counts while preserving custom fields
      const existing = videoMap.get(fresh.videoId);
      videoMap.set(fresh.videoId, {
        ...existing,
        ...fresh,
        duration: existing.duration || fresh.duration,
        tags: [...new Set([...(existing.tags || []), ...(fresh.tags || [])])],
      });
    }
  }

  // 3. Process, enrich tags, and map categories for all videos
  const allUpdatedVideos = Array.from(videoMap.values()).map(enrichVideoTagsAndCategories);

  // 4. Save to src/config/youtube.json
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allUpdatedVideos, null, 2), 'utf-8');

  // 5. Output summary
  const totalTags = new Set(allUpdatedVideos.flatMap((v) => v.tags || []));
  const totalCategories = new Set(allUpdatedVideos.flatMap((v) => v.categories || []));

  console.log('\n✅ [SUCCESS] youtube.json successfully updated!');
  console.log(`   • Total videos:       ${allUpdatedVideos.length}`);
  console.log(`   • New videos added:   ${newVideosCount}`);
  console.log(`   • Unique topic tags:  ${totalTags.size}`);
  console.log(`   • Mapped categories:  ${Array.from(totalCategories).join(', ')}`);
}

main().catch((err) => {
  console.error('[ERROR] Failed to update YouTube videos:', err);
  process.exit(1);
});

