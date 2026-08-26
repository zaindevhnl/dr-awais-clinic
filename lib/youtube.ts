import "server-only";

/**
 * The practice's YouTube channel, read through the public RSS feed rather than
 * the Data API: no key, no quota, no billing account. The feed carries the most
 * recent 15 uploads, which is what the videos page shows.
 */
export const YOUTUBE = {
  handle: "drawaismalik07",
  channelId: "UC1kdV8Mu0j196FMVw2j60LA",
  channelUrl: "https://www.youtube.com/@drawaismalik07",
} as const;

export type Video = {
  id: string;
  title: string;
  description: string;
  published: string;
  thumbnail: string;
  url: string;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function decode(value: string) {
  return value
    .replace(/&(amp|lt|gt|quot|apos|#39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function field(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1].trim()) : "";
}

/**
 * Latest uploads. Returns an empty list rather than throwing if YouTube is
 * unreachable, so the page degrades to its "watch on YouTube" state instead of
 * failing the render.
 */
export async function getChannelVideos(limit?: number): Promise<Video[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE.channelId}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) throw new Error(`YouTube feed responded ${response.status}`);

    const xml = await response.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    const videos = entries
      .map((entry) => {
        const id = field(entry, "yt:videoId");
        if (!id) return null;
        return {
          id,
          title: field(entry, "title"),
          description: field(entry, "media:description").split("\n")[0] ?? "",
          published: field(entry, "published"),
          // hqdefault exists for every video; maxres does not.
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        } satisfies Video;
      })
      .filter((video): video is Video => video !== null);

    return limit ? videos.slice(0, limit) : videos;
  } catch (error) {
    console.error("[youtube] feed unavailable:", error);
    return [];
  }
}
