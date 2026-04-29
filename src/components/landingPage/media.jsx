import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Youtube,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import apiClient from "../../api/axios.instance";

const TAB_ORDER = ["youtube", "linkedin", "instagram", "twitter", "facebook", "reddit"];

const defaultLink = () => ({ enabled: false, url: "" });

const mergeLinks = (raw = {}) => ({
  youtube: { ...defaultLink(), ...raw.youtube },
  linkedin: { ...defaultLink(), ...raw.linkedin },
  instagram: { ...defaultLink(), ...raw.instagram },
  twitter: { ...defaultLink(), ...raw.twitter },
  facebook: { ...defaultLink(), ...raw.facebook },
  reddit: { ...defaultLink(), ...raw.reddit },
});

/** Extract YouTube video id from watch / Shorts / embed / youtu.be links. */
const youtubeUrlToVideoId = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  const s = raw.trim();
  if (!s) return "";
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, "");
    const v = u.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v)) return v;
    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0] || "";
      return id.slice(0, 11);
    }
    if (host.includes("youtube.com")) {
      const shorts = u.pathname.match(/\/shorts\/([\w-]{11})/);
      if (shorts) return shorts[1];
      const embed = u.pathname.match(/\/embed\/([\w-]{11})/);
      if (embed) return embed[1];
      const live = u.pathname.match(/\/live\/([\w-]{11})/);
      if (live) return live[1];
    }
  } catch {
    /* ignore */
  }
  return "";
};

const resolveYouTubeVideoId = (post) => {
  const idField = post.videoId?.trim();
  if (idField) {
    const fromField = youtubeUrlToVideoId(idField);
    if (fromField) return fromField;
    if (/^[\w-]{11}$/.test(idField)) return idField.slice(0, 11);
  }
  return youtubeUrlToVideoId(post.url) || youtubeUrlToVideoId(post.embedUrl);
};

const youtubeOpenUrl = (post) => {
  const vid = resolveYouTubeVideoId(post);
  const u = post.url?.trim() || post.embedUrl?.trim();
  if (u) {
    try {
      return new URL(u).href.split("#")[0];
    } catch {
      return u.split("?")[0];
    }
  }
  return vid ? `https://www.youtube.com/watch?v=${vid}` : "";
};

const toInstagramEmbedUrl = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  const cleaned = raw.trim().split("#")[0];
  if (!cleaned) return "";
  if (cleaned.includes("instagram.com") && cleaned.includes("/embed")) {
    try {
      const u = new URL(cleaned);
      return `https://www.instagram.com${u.pathname}`;
    } catch {
      return cleaned;
    }
  }
  try {
    const u = new URL(cleaned);
    if (!u.hostname.replace(/^www\./, "").includes("instagram.com")) return "";
    let path = u.pathname.replace(/\/$/, "");
    if (path.endsWith("/embed")) return `https://www.instagram.com${path}`;
    return `https://www.instagram.com${path}/embed/`;
  } catch {
    const base = cleaned.replace(/\/$/, "");
    return base.includes("/embed") ? base : `${base}/embed/`;
  }
};

const resolveInstagramIframeSrc = (post) => {
  const e = post.embedUrl?.trim();
  const u = post.url?.trim();
  if (e && e.includes("instagram.com/embed")) return e.split("?")[0];
  return toInstagramEmbedUrl(u) || toInstagramEmbedUrl(e);
};

const instagramOpenUrl = (post) => {
  for (const pick of [post.url?.trim(), post.embedUrl?.trim()]) {
    if (!pick || !pick.includes("instagram.com")) continue;
    if (pick.includes("/embed")) continue;
    try {
      const url = new URL(pick);
      return `${url.origin}${url.pathname}`;
    } catch {
      return pick.split("?")[0];
    }
  }
  return "";
};

/** Regular LinkedIn post URLs cannot be used as iframe src; convert to official embed path. */
const linkedInPostUrlToEmbedUrl = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  const s = raw.trim();
  if (!s) return "";
  if (s.includes("linkedin.com/embed/")) return s;
  const activityUrn = s.match(/urn:li:activity:(\d+)/);
  if (activityUrn) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityUrn[1]}`;
  }
  const shareUrn = s.match(/urn:li:share:(\d+)/);
  if (shareUrn) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareUrn[1]}`;
  }
  const activityId = s.match(/activity-(\d+)/);
  if (activityId) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId[1]}`;
  }
  return "";
};

const resolveLinkedInIframeSrc = (post) => {
  const e = post.embedUrl?.trim();
  const u = post.url?.trim();
  if (e && e.includes("linkedin.com/embed/")) return e;
  return linkedInPostUrlToEmbedUrl(e) || linkedInPostUrlToEmbedUrl(u);
};

const linkedInOpenUrl = (post) => {
  const u = post.url?.trim();
  const e = post.embedUrl?.trim();
  for (const pick of [u, e]) {
    if (!pick || !pick.includes("linkedin.com")) continue;
    if (pick.includes("linkedin.com/embed/")) continue;
    try {
      const url = new URL(pick);
      return `${url.origin}${url.pathname}`;
    } catch {
      return pick.split("?")[0];
    }
  }
  return "";
};

const twitterPostUrlToEmbedUrl = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim();
  if (!s) return "";
  s = s.replace(/mobile\.twitter\.com/gi, "twitter.com");
  if (s.includes("platform.twitter.com/embed") || s.includes("twitter.com/embed")) return s;
  const m = s.match(/(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/i);
  if (m) return `https://platform.twitter.com/embed/Tweet.html?id=${m[1]}`;
  const web = s.match(/\/status\/(\d{10,})/);
  if (web) return `https://platform.twitter.com/embed/Tweet.html?id=${web[1]}`;
  return "";
};

const facebookPostUrlToEmbedUrl = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim().split("#")[0];
  if (!s) return "";
  s = s.replace(/^https?:\/\/m\.facebook\.com/i, "https://www.facebook.com");
  if (s.includes("facebook.com/plugins/")) return s;
  if (!s.includes("facebook.com") && !s.includes("fb.watch")) return "";
  const href = encodeURIComponent(s);
  return `https://www.facebook.com/plugins/post.php?href=${href}&show_text=true&width=500`;
};

const redditPostUrlToEmbedUrl = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim().split("#")[0];
  if (!s) return "";
  s = s.replace(/^https?:\/\/old\.reddit\.com/i, "https://www.reddit.com");
  if (s.includes("redditmedia.com")) return s;
  if (!s.includes("reddit.com")) return "";
  if (s.includes("embed=true")) return s;
  return s.includes("?") ? `${s}&embed=true` : `${s}?embed=true`;
};

const resolvePlatformIframeSrc = (platform, post) => {
  const e = post.embedUrl?.trim();
  const u = post.url?.trim();
  switch (platform) {
    case "twitter":
      return (
        twitterPostUrlToEmbedUrl(e) ||
        twitterPostUrlToEmbedUrl(u) ||
        (e && e.includes("platform.twitter.com") ? e : "")
      );
    case "facebook":
      return facebookPostUrlToEmbedUrl(e) || facebookPostUrlToEmbedUrl(u) || (e && e.includes("facebook.com/plugins/") ? e : "");
    case "reddit":
      return (
        redditPostUrlToEmbedUrl(e) ||
        redditPostUrlToEmbedUrl(u) ||
        (e && (e.includes("redditmedia.com") || e.includes("embed=true")) ? e : "")
      );
    default:
      return e || "";
  }
};

const VideoCard = memo(({ video, index, onPlay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const vid = video.videoId || "";
  const thumbnailUrl = imageError
    ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${vid}/mqdefault.jpg`;

  if (!vid) return null;

  return (
    <div className="group flex-shrink-0 w-[120px] min-[375px]:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
      <div className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-transform duration-300 active:scale-[0.98] sm:group-hover:scale-[1.02]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
        )}
        <img
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
        {video.badge && (
          <div className="absolute top-10 left-1.5 right-1.5 sm:top-12 sm:left-2 sm:right-2 z-[1]">
            <span className="inline-block bg-red-600 text-white text-[7px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded">
              {video.badge}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => onPlay(vid)}
          className="absolute inset-0 flex items-center justify-center touch-manipulation"
          aria-label={`Play ${video.title}`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
          </div>
        </button>
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 bg-red-600 text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
          </svg>
        </div>
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/70 text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full">
          {video.views || "—"}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <p className="text-white font-medium text-[10px] sm:text-xs leading-tight line-clamp-2">
            {video.title}
          </p>
        </div>
        <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/30 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold">
          {index + 1}
        </div>
      </div>
    </div>
  );
});
VideoCard.displayName = "VideoCard";

const platformOpenLabels = {
  twitter: "X (Twitter)",
  facebook: "Facebook",
  reddit: "Reddit",
};

const YouTubeFallbackCard = memo(({ post, index }) => {
  const href = youtubeOpenUrl(post);
  return (
    <div className="group flex-shrink-0 w-[120px] min-[375px]:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
      <div className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg flex flex-col items-center justify-center p-3 text-center gap-2 border border-white/10">
        <Youtube className="w-9 h-9 sm:w-10 sm:h-10 text-red-500 shrink-0" />
        <p className="text-white font-medium text-[10px] sm:text-xs leading-tight line-clamp-3 px-1">
          {post.title || `Video ${index + 1}`}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-red-200 hover:text-white mt-1"
          >
            Open on YouTube <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        ) : (
          <p className="text-white/45 text-[9px] px-2">Add a Shorts/video link or ID in admin</p>
        )}
        <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
          {index + 1}
        </div>
      </div>
    </div>
  );
});
YouTubeFallbackCard.displayName = "YouTubeFallbackCard";

const InstagramCard = memo(({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const iframeSrc = resolveInstagramIframeSrc(post);
  const openHref = instagramOpenUrl(post);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const author = post.authorName?.trim();

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
        <div className="p-2.5 sm:p-3 bg-gradient-to-r from-pink-50 to-violet-50 border-b border-gray-100">
          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
            {post.title || `Instagram Reel #${index + 1}`}
          </h4>
          {author ? (
            <p className="text-gray-500 text-[10px] sm:text-xs truncate mt-0.5">{author}</p>
          ) : (
            <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Instagram</p>
          )}
        </div>
        <div className="bg-gray-100 relative" style={{ height: "420px" }}>
          {isVisible && iframeSrc ? (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              height="420"
              width="100%"
              frameBorder="0"
              loading="lazy"
              title={post.title || `Instagram reel ${index + 1}`}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : isVisible && openHref ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-3">
              <Instagram className="w-10 h-10 text-pink-600" />
              <p className="text-xs text-gray-600">
                Embed not available for this link. Open on Instagram.
              </p>
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-pink-600 text-white text-sm font-medium px-4 py-2 hover:bg-pink-700"
              >
                View on Instagram <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm px-4">
              Add a reel or post URL in admin
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
InstagramCard.displayName = "InstagramCard";

const LinkedInCard = memo(({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const iframeSrc = resolveLinkedInIframeSrc(post);
  const openHref = linkedInOpenUrl(post);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const author = post.authorName?.trim();

  return (
    <div
      ref={cardRef}
      className="group flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 active:scale-[0.99]">
        <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                {post.title || `Post ${index + 1}`}
              </h4>
              {author ? (
                <p className="text-gray-500 text-[10px] sm:text-xs truncate">{author}</p>
              ) : (
                <p className="text-gray-500 text-[10px] sm:text-xs">LinkedIn</p>
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium flex-shrink-0">#{index + 1}</span>
          </div>
        </div>
        <div className="bg-gray-100 relative" style={{ height: "320px" }}>
          {isVisible && iframeSrc ? (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              height="320"
              width="100%"
              frameBorder="0"
              loading="lazy"
              title={post.title || "LinkedIn post"}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : isVisible && openHref ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-3">
              <Linkedin className="w-10 h-10 text-blue-600" />
              <p className="text-xs text-gray-600">
                This link can’t be embedded. Open the post on LinkedIn.
              </p>
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700"
              >
                View on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center px-3">
                <Linkedin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">
                  Add a post URL or embed URL in admin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
LinkedInCard.displayName = "LinkedInCard";

const GenericSocialCard = memo(({ post, index, Icon, accentClass, embedHeight = 320, platform }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const resolvedEmbed = resolvePlatformIframeSrc(platform, post);
  const openHref = post.url?.trim() || post.embedUrl?.trim() || "";
  const thumb = post.thumbnailUrl?.trim();
  const label = platformOpenLabels[platform] || "this platform";
  const author = post.authorName?.trim();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 active:scale-[0.99]">
        <div className={`p-2.5 sm:p-3 border-b border-gray-100 ${accentClass}`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/80 text-slate-800">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                {post.title || `Post ${index + 1}`}
              </h4>
              {author ? (
                <>
                  <p className="text-gray-500 text-[10px] sm:text-xs truncate">{author}</p>
                  {post.views && (
                    <p className="text-gray-400 text-[10px] sm:text-xs">{post.views}</p>
                  )}
                </>
              ) : post.views ? (
                <p className="text-gray-500 text-[10px] sm:text-xs">{post.views}</p>
              ) : (
                <p className="text-gray-500 text-[10px] sm:text-xs">{label}</p>
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium flex-shrink-0">#{index + 1}</span>
          </div>
        </div>
        <div className="bg-gray-100 relative" style={{ height: `${embedHeight}px` }}>
          {isVisible && resolvedEmbed ? (
            <iframe
              key={resolvedEmbed}
              src={resolvedEmbed}
              height={embedHeight}
              width="100%"
              frameBorder="0"
              loading="lazy"
              title={post.title || "Social embed"}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : isVisible && openHref ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-3">
              {thumb ? (
                <img src={thumb} alt="" className="w-full max-h-40 object-cover rounded-lg" />
              ) : (
                <Icon className="w-10 h-10 text-slate-400" />
              )}
              <p className="text-xs text-gray-600 px-2">
                Can’t show an embedded player for this link. Open it on {label}.
              </p>
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 text-white text-sm font-medium px-4 py-2 hover:bg-slate-900"
              >
                View post <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm px-4">
              Add a post URL in admin — we’ll build the embed when possible
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
GenericSocialCard.displayName = "GenericSocialCard";

const NavButton = memo(({ direction, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white transition-all touch-manipulation ${
      disabled ? "opacity-30 cursor-not-allowed" : "active:scale-95 hover:bg-white hover:text-teal-800"
    }`}
    aria-label={`Scroll ${direction}`}
  >
    {direction === "left" ? (
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
    ) : (
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    )}
  </button>
));
NavButton.displayName = "NavButton";

const tabLabels = {
  youtube: "Shorts",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X",
  facebook: "Facebook",
  reddit: "Reddit",
};

const tabStyles = {
  youtube: "from-red-500 to-red-600",
  linkedin: "from-blue-600 to-blue-700",
  instagram: "from-pink-500 to-violet-600",
  twitter: "from-slate-700 to-slate-900",
  facebook: "from-blue-500 to-blue-700",
  reddit: "from-orange-600 to-orange-700",
};

const tabIcons = {
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  reddit: MessageCircle,
};

export default function SocialMediaSection() {
  const [activeTab, setActiveTab] = useState("youtube");
  const [playingVideo, setPlayingVideo] = useState(null);
  const scrollRefs = useRef({});
  const setScrollRef = (id) => (el) => {
    scrollRefs.current[id] = el;
  };

  const [scrollState, setScrollState] = useState(() =>
    Object.fromEntries(TAB_ORDER.map((t) => [t, { left: false, right: true }])),
  );

  const { data: socialSettings } = useQuery({
    queryKey: ["public-settings", "social-media"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/settings/public");
        return (
          response?.socialMedia ||
          response?.siteContent?.socialMedia ||
          response?.website?.socialMedia ||
          {}
        );
      } catch {
        return {};
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const socialLinks = mergeLinks(socialSettings?.links);
  const socialEnabled = socialSettings?.enabled !== false;

  const youtubeVideos = Array.isArray(socialSettings?.youtubeVideos) ? socialSettings.youtubeVideos : [];
  const linkedinFeed = Array.isArray(socialSettings?.linkedinPosts) ? socialSettings.linkedinPosts : [];
  const instagramFeed = Array.isArray(socialSettings?.instagramPosts) ? socialSettings.instagramPosts : [];
  const twitterFeed = Array.isArray(socialSettings?.twitterPosts) ? socialSettings.twitterPosts : [];
  const facebookFeed = Array.isArray(socialSettings?.facebookPosts) ? socialSettings.facebookPosts : [];
  const redditFeed = Array.isArray(socialSettings?.redditPosts) ? socialSettings.redditPosts : [];

  const availableTabs = TAB_ORDER.filter((id) => socialLinks[id]?.enabled);
  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];

  const checkScrollButtons = useCallback((id) => {
    const el = scrollRefs.current[id];
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const canScrollLeft = scrollLeft > 5;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;
    setScrollState((prev) => ({
      ...prev,
      [id]: { left: canScrollLeft, right: canScrollRight },
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentTab) checkScrollButtons(currentTab);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentTab, checkScrollButtons, socialSettings]);

  const handleScroll = useCallback(
    (id, direction) => {
      const el = scrollRefs.current[id];
      if (!el) return;
      const scrollAmount = window.innerWidth < 640 ? 200 : 280;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => checkScrollButtons(id), 350);
    },
    [checkScrollButtons],
  );

  const handlePlayVideo = useCallback((videoId) => {
    setPlayingVideo(videoId);
  }, []);

  const closeModal = useCallback(() => setPlayingVideo(null), []);

  if (!socialEnabled || availableTabs.length === 0) return null;

  const sc = (id) => scrollState[id] || { left: false, right: true };

  const renderTabPanel = () => {
    if (currentTab === "youtube" && socialLinks.youtube?.enabled) {
      return (
        <div className="relative">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-lg">YouTube Shorts</h3>
                <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">
                  Quick financial insights
                </p>
              </div>
            </div>
            <a
              href={socialLinks.youtube?.url || "https://www.youtube.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {youtubeVideos.length === 0 ? (
            <p className="text-white/60 text-sm text-center py-8">No shorts in admin yet.</p>
          ) : (
            <>
              <div
                ref={setScrollRef("youtube")}
                onScroll={() => checkScrollButtons("youtube")}
                className="flex gap-2.5 min-[375px]:gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {youtubeVideos.map((video, index) => {
                  const vid = resolveYouTubeVideoId(video);
                  const key = `${vid || video.url || video.embedUrl || index}-${index}`;
                  if (!vid) {
                    return <YouTubeFallbackCard key={key} post={video} index={index} />;
                  }
                  return (
                    <VideoCard
                      key={key}
                      video={{ ...video, videoId: vid }}
                      index={index}
                      onPlay={handlePlayVideo}
                    />
                  );
                })}
                <a
                  href={socialLinks.youtube?.url || "https://www.youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[120px] min-[375px]:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start"
                >
                  <div className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-red-700 shadow-lg flex flex-col items-center justify-center p-3 text-center active:scale-[0.98] transition-transform">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/25 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                      <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="text-white font-bold text-xs sm:text-sm mb-0.5">View All</p>
                    <p className="text-white/70 text-[10px] sm:text-xs mb-2">Shorts</p>
                    <div className="flex items-center gap-1 bg-white/25 px-2.5 py-1 rounded-full text-white text-[10px] sm:text-xs font-medium">
                      Watch <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll("youtube", "left")}
                  disabled={!sc("youtube").left}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll("youtube", "right")}
                  disabled={!sc("youtube").right}
                />
              </div>
            </>
          )}
        </div>
      );
    }

    if (currentTab === "linkedin" && socialLinks.linkedin?.enabled) {
      return (
        <div className="relative">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-lg">LinkedIn Posts</h3>
                <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">
                  Professional insights
                </p>
              </div>
            </div>
            <a
              href={socialLinks.linkedin?.url || "https://www.linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
            >
              View Profile <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {linkedinFeed.length === 0 ? (
            <p className="text-white/60 text-sm text-center py-8">No LinkedIn posts in admin yet.</p>
          ) : (
            <>
              <div
                ref={setScrollRef("linkedin")}
                onScroll={() => checkScrollButtons("linkedin")}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {linkedinFeed.map((post, index) => (
                  <LinkedInCard
                    key={`${post.url || ""}-${post.embedUrl || ""}-${index}`}
                    post={post}
                    index={index}
                  />
                ))}
                <a
                  href={socialLinks.linkedin?.url || "https://www.linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
                >
                  <div className="h-full min-h-[380px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl sm:rounded-2xl shadow-lg flex flex-col items-center justify-center p-5 text-center active:scale-[0.99] transition-transform">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/25 rounded-full flex items-center justify-center mb-4">
                      <Linkedin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-base sm:text-lg mb-1">View All Posts</p>
                    <p className="text-white/70 text-sm mb-4">See more on LinkedIn</p>
                    <div className="flex items-center gap-1.5 bg-white/25 px-4 py-2 rounded-full text-white text-sm font-medium">
                      Visit Profile <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll("linkedin", "left")}
                  disabled={!sc("linkedin").left}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll("linkedin", "right")}
                  disabled={!sc("linkedin").right}
                />
              </div>
            </>
          )}
        </div>
      );
    }

    if (currentTab === "instagram" && socialLinks.instagram?.enabled) {
      return (
        <div className="relative">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-lg">Instagram Reels</h3>
                <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">
                  Latest reels from your account
                </p>
              </div>
            </div>
            <a
              href={socialLinks.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
            >
              View Profile <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {instagramFeed.length === 0 ? (
            <p className="text-white/60 text-sm text-center py-8">No Instagram reels in admin yet.</p>
          ) : (
            <>
              <div
                ref={setScrollRef("instagram")}
                onScroll={() => checkScrollButtons("instagram")}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {instagramFeed.map((post, index) => (
                  <InstagramCard
                    key={`${post.url || ""}-${post.embedUrl || ""}-${index}`}
                    post={post}
                    index={index}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll("instagram", "left")}
                  disabled={!sc("instagram").left}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll("instagram", "right")}
                  disabled={!sc("instagram").right}
                />
              </div>
            </>
          )}
        </div>
      );
    }

    const genericMap = {
      twitter: {
        feed: twitterFeed,
        Icon: Twitter,
        accent: "bg-gradient-to-r from-slate-100 to-slate-200",
        title: "X (Twitter)",
        subtitle: "Updates and threads",
        profileUrl: socialLinks.twitter?.url,
        embedHeight: 400,
      },
      facebook: {
        feed: facebookFeed,
        Icon: Facebook,
        accent: "bg-gradient-to-r from-blue-50 to-indigo-50",
        title: "Facebook",
        subtitle: "Posts and updates",
        profileUrl: socialLinks.facebook?.url,
        embedHeight: 400,
      },
      reddit: {
        feed: redditFeed,
        Icon: MessageCircle,
        accent: "bg-gradient-to-r from-orange-50 to-amber-50",
        title: "Reddit",
        subtitle: "Discussions",
        profileUrl: socialLinks.reddit?.url,
        embedHeight: 420,
      },
    };

    const g = genericMap[currentTab];
    if (g && socialLinks[currentTab]?.enabled) {
      return (
        <div className="relative">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/15 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <g.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-lg">{g.title}</h3>
                <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">{g.subtitle}</p>
              </div>
            </div>
            {g.profileUrl && (
              <a
                href={g.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
              >
                View profile <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          {g.feed.length === 0 ? (
            <p className="text-white/60 text-sm text-center py-8">No posts in admin yet.</p>
          ) : (
            <>
              <div
                ref={setScrollRef(currentTab)}
                onScroll={() => checkScrollButtons(currentTab)}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {g.feed.map((post, index) => (
                  <GenericSocialCard
                    key={post.url || post.embedUrl || index}
                    post={post}
                    index={index}
                    Icon={g.Icon}
                    accentClass={g.accent}
                    embedHeight={g.embedHeight}
                    platform={currentTab}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll(currentTab, "left")}
                  disabled={!sc(currentTab).left}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll(currentTab, "right")}
                  disabled={!sc(currentTab).right}
                />
              </div>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="relative py-8 min-[375px]:py-10 sm:py-14 md:py-18 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 min-[375px]:mb-8 sm:mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Our Social Presence</span>
          </div>
          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
            Watch & Learn{" "}
            <span
              style={{ fontFamily: "Playfair Display, serif" }}
              className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Shorts & Posts
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-4">
            Get valuable insights on wealth management and financial planning through our content.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 mb-5 min-[375px]:mb-6 sm:mb-8">
          <div className="relative bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-1.5">
            {availableTabs.map((id) => {
              const Icon = tabIcons[id];
              const label = tabLabels[id];
              const active = currentTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 min-[375px]:px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-300 touch-manipulation ${
                    active
                      ? `bg-gradient-to-r ${tabStyles[id]} text-white`
                      : "text-gray-600"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-[#123c42] to-[#0b2428] rounded-2xl sm:rounded-3xl p-3 min-[375px]:p-4 sm:p-6 md:p-8 shadow-xl">
          {renderTabPanel()}
        </div>
      </div>

      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-4"
          onClick={closeModal}
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
          role="presentation"
        >
          <div
            className="relative w-full max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[380px] aspect-[9/16] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube Short"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors touch-manipulation"
              aria-label="Close video"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        div::-webkit-scrollbar { display: none; }
        .touch-manipulation { touch-action: manipulation; }
      `}</style>
    </section>
  );
}
