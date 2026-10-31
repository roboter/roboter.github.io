import youtubeData from "@config/youtube.json";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  description?: string;
  duration?: string;
  published?: string;
  views?: string;
  tags?: string[];
  channelId?: string;
  channelTitle?: string;
  channelUrl?: string;
  thumbnails?: {
    default?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    high?: { url: string; width: number; height: number };
  };
}

export const allVideos: YouTubeVideo[] = Array.isArray(youtubeData)
  ? (youtubeData as YouTubeVideo[])
  : [];

const STOPWORDS = new Set([
  "this",
  "that",
  "with",
  "from",
  "your",
  "more",
  "video",
  "review",
  "project",
  "getting",
  "better",
  "easier",
  "than",
  "think",
  "what",
  "should",
  "about",
  "just",
  "whole",
  "ready",
  "fast",
  "another",
  "firsthand",
]);

/**
 * Returns `limit` similar videos based on shared tags and title keywords.
 * If fewer than `limit` similar videos exist, fills remaining slots with
 * pseudo-randomly selected videos from the library (excluding current).
 */
export function getSimilarVideos(
  currentVideo: YouTubeVideo,
  videosList: YouTubeVideo[] = allVideos,
  limit = 3
): YouTubeVideo[] {
  const currentTags = (currentVideo.tags || []).map((t) => t.toLowerCase());
  const currentWords = currentVideo.title
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));

  const scored = videosList
    .filter((v) => v.videoId !== currentVideo.videoId)
    .map((candidate) => {
      const cTags = (candidate.tags || []).map((t) => t.toLowerCase());
      const sharedTags = cTags.filter((t) => currentTags.includes(t));
      let score = sharedTags.length * 3;

      currentWords.forEach((word) => {
        if (candidate.title.toLowerCase().includes(word)) {
          score += 1;
        }
      });

      return { video: candidate, score };
    });

  // Candidates with at least one matching tag or title keyword
  const similar = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.video);

  // Candidates with 0 score (fallback pool)
  const others = scored
    .filter((s) => s.score === 0)
    .map((s) => s.video);

  // Deterministic shuffle for fallback pool using videoId characters
  others.sort((a, b) => {
    const hashA = (a.videoId + currentVideo.videoId)
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const hashB = (b.videoId + currentVideo.videoId)
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return (hashA % 19) - (hashB % 19);
  });

  const result: YouTubeVideo[] = [...similar.slice(0, limit)];

  if (result.length < limit) {
    const needed = limit - result.length;
    result.push(...others.slice(0, needed));
  }

  return result.slice(0, limit);
}

