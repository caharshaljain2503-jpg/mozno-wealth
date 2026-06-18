import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import CommentSection from "../blogs/CommentSection";
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUp,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import RecentPosts from "../blogs/RecentPosts";
import { useBlog } from "../../hooks/useBlog";

const MotionDiv = motion.div;
const MotionNav = motion.nav;
const MotionButton = motion.button;
const MotionFigure = motion.figure;
const MotionSection = motion.section;
const MotionArticle = motion.article;

/* ───── optimized spring configs ───── */
const smooth = { stiffness: 100, damping: 30, mass: 0.8, restDelta: 0.001 };
const snappy = { stiffness: 400, damping: 35, restDelta: 0.001 };

/* ───── simple fade variant ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const PLACEHOLDER_COVER =
  "https://via.placeholder.com/1200x630/f1f5f9/64748b?text=Mozno+Wealth+Blog";

const staggerHeader = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Isolated so `heroLoaded` resets via remount (`key`); layout effect only handles cached (already-complete) images. */
function BlogHeroImage({ displayCoverSrc }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroImgRef = useRef(null);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      const img = heroImgRef.current;
      if (img?.complete && img.naturalHeight > 0) setHeroLoaded(true);
    });
    return () => cancelAnimationFrame(id);
  }, [displayCoverSrc]);

  return (
    <div className="relative aspect-video w-full bg-stone-200">
      {!heroLoaded && (
        <div
          className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-emerald-50/90 via-stone-100 to-teal-50/80"
          aria-hidden
        />
      )}
      <img
        ref={heroImgRef}
        src={displayCoverSrc}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 z-20 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        onLoad={() => setHeroLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER_COVER;
          setHeroLoaded(true);
        }}
      />
    </div>
  );
}

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef(null);

  const { data: response, isLoading, isError, error, refetch } = useBlog(slug);
  const post = response;

  const coverSrc = useMemo(() => {
    if (!post) return "";
    const u = post.image || post.coverImage || post.thumbnail;
    return u && String(u).trim() ? String(u).trim() : "";
  }, [post]);

  const displayCoverSrc = coverSrc || PLACEHOLDER_COVER;

  /* ────── scroll values ────── */
  const { scrollY } = useScroll();
  const { scrollYProgress: pageProgress } = useScroll();

  const smoothPage = useSpring(pageProgress, smooth);

  /* floating header */
  const headerOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const headerY = useTransform(scrollY, [0, 200], [-50, 0]);
  const springHeaderY = useSpring(headerY, snappy);

  /* reading progress */
  const progressWidth = useTransform(smoothPage, [0, 1], ["0%", "100%"]);

  /* show scroll-to-top – throttled */
  useMotionValueEvent(scrollY, "change", (v) => {
    const should = v > 500;
    if (should !== showScrollTop) setShowScrollTop(should);
  });

  /* redirect if not found */
  useEffect(() => {
    if (!isLoading && !isError && !post) {
      const t = setTimeout(() => navigate("/blogs"), 3000);
      return () => clearTimeout(t);
    }
  }, [isLoading, isError, post, navigate]);

  /* ────── memoized handlers ────── */
  const handleLike = useCallback(() => setLiked((p) => !p), []);
  const handleSave = useCallback(() => setSaved((p) => !p), []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(
    (platform) => {
      const url = window.location.href;
      const title = post?.title || "";
      const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out: ${url}`)}`,
      };
      if (platform === "email") {
        window.location.href = urls[platform];
      } else {
        window.open(urls[platform], "_blank");
      }
      setShowShareMenu(false);
    },
    [post?.title]
  );

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );

  const toggleShareMenu = useCallback(
    () => setShowShareMenu((p) => !p),
    []
  );

  const closeShareMenu = useCallback(() => setShowShareMenu(false), []);

  /* ────── memoized date ────── */
  const postCreatedAt = post?.createdAt;
  const formattedDate = useMemo(() => {
    if (postCreatedAt) return format(new Date(postCreatedAt), "MMM dd, yyyy");
    return format(new Date(), "MMM dd, yyyy");
  }, [postCreatedAt]);

  /* ────── share menu items ────── */
  const shareItems = useMemo(
    () => [
      {
        action: handleCopyLink,
        icon: copied ? Check : Copy,
        label: copied ? "Copied!" : "Copy Link",
        color: copied ? "text-green-500" : "text-gray-700",
      },
      { action: () => handleShare("facebook"), icon: Facebook, label: "Facebook", color: "text-blue-600" },
      { action: () => handleShare("twitter"), icon: Twitter, label: "Twitter", color: "text-blue-400" },
      { action: () => handleShare("linkedin"), icon: Linkedin, label: "LinkedIn", color: "text-blue-700" },
      { action: () => handleShare("email"), icon: Mail, label: "Email", color: "text-gray-600" },
    ],
    [copied, handleCopyLink, handleShare]
  );

  const summaryLine = useMemo(() => {
    if (!post) return "";
    if (post.subTitle?.trim()) return post.subTitle.trim();
    if (post.paragraph?.trim()) return post.paragraph.trim();
    if (!post.description) return "";
    const text = post.description
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return "";
    return text.length > 200 ? `${text.slice(0, 197)}…` : text;
  }, [post]);

  const categoryLabel = (post?.category || "General").trim();
  const openingParagraph = post?.paragraph?.trim() || "";

  /* ────── loading state ────── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-6">
            <MotionDiv
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-500 border-r-emerald-300"
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Loading Article
          </h2>
          <p className="text-sm text-gray-500">Fetching the content…</p>
        </MotionDiv>
      </div>
    );
  }

  /* ────── error state ────── */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <MotionDiv
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Failed to Load
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {error?.message || "Something went wrong."}
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              Try Again
            </button>
            <Link
              to="/blogs"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </MotionDiv>
      </div>
    );
  }

  /* ────── not found ────── */
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-4">Redirecting…</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-x-hidden bg-stone-50 font-blog-sans text-stone-800 antialiased"
    >
      {/* ═══════ READING PROGRESS BAR ═══════ */}
      <MotionDiv className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
        <MotionDiv
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 will-change-[width]"
        />
      </MotionDiv>

      {/* ═══════ FLOATING HEADER ═══════ */}
      <MotionDiv
        style={{ opacity: headerOpacity, y: springHeaderY }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 will-change-transform"
      >
        <div className="bg-white/85 backdrop-blur-xl border-b border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
            <div className="flex items-center justify-between">
              <Link
                to="/blogs"
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm relative z-20"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Back</span>
              </Link>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-md">
                {post.title}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleLike}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    liked
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleSave}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    saved
                      ? "text-amber-500 bg-amber-50"
                      : "text-gray-400 hover:text-amber-500"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      <div className="pt-20 sm:pt-24 pb-16 sm:pb-24">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Intro: breadcrumbs, title, and metadata */}
          <header className="max-w-5xl">
            <MotionDiv
              variants={staggerHeader}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8"
            >
              <MotionNav
                variants={headerItem}
                className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-stone-600 sm:mb-8 sm:text-base"
                aria-label="Breadcrumb"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-medium hover:bg-white hover:text-emerald-800 hover:shadow-sm transition-all"
                >
                  <Home className="h-4 w-4 shrink-0 text-emerald-700/90 sm:h-[1.125rem] sm:w-[1.125rem]" />
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-stone-400" />
                <Link
                  to="/blogs"
                  className="rounded-lg px-2.5 py-1.5 font-medium hover:bg-white hover:text-emerald-800 hover:shadow-sm transition-all"
                >
                  Blogs
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-stone-400" />
                <span className="font-semibold uppercase tracking-wider text-emerald-800 text-xs sm:text-sm">
                  {categoryLabel}
                </span>
              </MotionNav>

              <MotionDiv variants={headerItem} className="space-y-4 sm:space-y-5">
                <span className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm ring-1 ring-emerald-700/30 sm:text-[13px]">
                  {categoryLabel}
                </span>
                <h1 className="font-blog-serif text-4xl font-bold leading-[1.12] tracking-tight text-stone-900 sm:text-5xl lg:text-5xl xl:text-6xl">
                  {post.title}
                </h1>
                {summaryLine && (
                  <p className="line-clamp-2 text-base leading-relaxed text-stone-500 sm:text-lg">
                    {summaryLine}
                  </p>
                )}
              </MotionDiv>

              <MotionDiv
                variants={headerItem}
                className="border-t border-b border-stone-200 py-5 sm:py-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        "Mozno Wealth"
                      )}&background=047857&color=fff&size=96`}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-stone-100 shadow-md sm:h-14 sm:w-14"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-stone-900 sm:text-lg">Mozno Wealth</p>
                      <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
                        <span className="font-medium text-stone-700">By Mozno Wealth</span>
                        <span className="text-stone-300 mx-1.5" aria-hidden>
                          ·
                        </span>
                        <time dateTime={post.createdAt ? new Date(post.createdAt).toISOString() : undefined}>
                          {formattedDate}
                        </time>
                        <span className="text-stone-300 mx-1.5" aria-hidden>
                          ·
                        </span>
                        <span>5 min read</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-end gap-1.5 border-t border-stone-100 pt-4 sm:justify-start sm:border-t-0 sm:pt-0 sm:gap-2">
                    <MotionButton
                      type="button"
                      aria-label="Share on LinkedIn"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleShare("linkedin")}
                      className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-600 shadow-sm transition-colors hover:border-stone-300 hover:text-[#0A66C2] hover:bg-stone-50 sm:p-3"
                    >
                      <Linkedin className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                    </MotionButton>
                    <MotionButton
                      type="button"
                      aria-label="Share on X"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleShare("twitter")}
                      className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-600 shadow-sm transition-colors hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50 sm:p-3"
                    >
                      <Twitter className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                    </MotionButton>
                    <MotionButton
                      type="button"
                      aria-label="Share on Facebook"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleShare("facebook")}
                      className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-600 shadow-sm transition-colors hover:border-stone-300 hover:text-[#1877F2] hover:bg-stone-50 sm:p-3"
                    >
                      <Facebook className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                    </MotionButton>
                    <MotionButton
                      type="button"
                      aria-label="Copy link"
                      whileTap={{ scale: 0.94 }}
                      onClick={handleCopyLink}
                      className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/80 sm:p-3"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-600 sm:h-[1.125rem] sm:w-[1.125rem]" />
                      ) : (
                        <Copy className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                      )}
                    </MotionButton>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </header>

          {/* Featured image + article align with sidebar (sidebar starts here on desktop) */}
          <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
            <div className="min-w-0 w-full max-w-5xl flex-1">
              <MotionFigure
                variants={headerItem}
                initial="hidden"
                animate="visible"
                className="group w-full"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <div className="w-full overflow-hidden rounded-xl bg-stone-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] ring-1 ring-stone-200/90">
                  <BlogHeroImage
                    key={`${slug}-${displayCoverSrc}`}
                    displayCoverSrc={displayCoverSrc}
                  />
                </div>
                <figcaption className="sr-only">Featured image for {post.title}</figcaption>
              </MotionFigure>

              <MotionSection
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="mt-10 sm:mt-12 w-full rounded-2xl border border-stone-200/90 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-9 md:px-10 md:py-11 lg:px-12"
              >
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-6">
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <MotionButton
                      type="button"
                      onClick={handleLike}
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.03 }}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors ${
                        liked ? "text-red-500" : "hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] ${
                          liked ? "fill-current" : ""
                        }`}
                      />
                      <span className="text-xs font-medium">{liked ? 1 : "Like"}</span>
                    </MotionButton>
                    <div className="hidden h-4 w-px bg-stone-200 sm:block" />
                    <div className="flex items-center gap-1.5 px-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">0</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">0</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MotionButton
                      type="button"
                      onClick={handleSave}
                      whileTap={{ scale: 0.92 }}
                      className={`rounded-full p-2.5 transition-colors ${
                        saved
                          ? "bg-amber-50 text-amber-600"
                          : "text-stone-400 hover:bg-amber-50 hover:text-amber-600"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    </MotionButton>
                    <div className="relative">
                      <MotionButton
                        type="button"
                        onClick={toggleShareMenu}
                        whileTap={{ scale: 0.92 }}
                        className="rounded-full p-2.5 text-stone-400 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Share2 className="h-4 w-4" />
                      </MotionButton>
                      <AnimatePresence>
                        {showShareMenu && (
                          <>
                            <MotionDiv
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="fixed inset-0 z-40"
                              onClick={closeShareMenu}
                            />
                            <MotionDiv
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute right-0 top-full z-50 mt-2 min-w-[168px] rounded-xl border border-stone-100 bg-white p-1.5 shadow-2xl"
                            >
                              {shareItems.map((item, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={item.action}
                                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs sm:text-sm ${item.color} hover:bg-stone-50`}
                                >
                                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span>{item.label}</span>
                                </button>
                              ))}
                            </MotionDiv>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <MotionArticle
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  className="mb-12"
                >
                  {openingParagraph && (
                    <p className="mb-8 max-w-none text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">
                      {openingParagraph}
                    </p>
                  )}

                  {post.description && (
                    <div
                      className="prose prose-stone max-w-none
                        prose-headings:font-blog-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900
                        prose-p:text-base prose-p:leading-8 prose-p:text-stone-700 sm:prose-p:text-lg sm:prose-p:leading-9
                        prose-a:font-medium prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
                        prose-strong:font-semibold prose-strong:text-stone-900
                        prose-li:text-stone-700 prose-li:leading-[1.8]
                        prose-img:rounded-xl prose-img:shadow-md
                        prose-table:w-full prose-table:border-collapse prose-table:text-sm
                        prose-th:border prose-th:border-stone-300 prose-th:bg-stone-100 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-stone-900
                        prose-td:border prose-td:border-stone-300 prose-td:px-4 prose-td:py-3 prose-td:align-top
                        prose-h2:text-[1.65rem] prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-[1.35rem] prose-h3:mt-8 prose-h3:mb-3
                        prose-blockquote:border-l-emerald-600 prose-blockquote:bg-emerald-50/40 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  )}
                </MotionArticle>

                <MotionDiv
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 px-8 py-10 text-white shadow-lg sm:px-10 sm:py-11 mb-12"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl"
                    aria-hidden
                  />
                  <h3 className="font-blog-serif text-2xl font-bold tracking-tight sm:text-[1.65rem]">
                    Subscribe for more insights
                  </h3>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed text-stone-300">
                    Wealth, tax, and planning updates from Mozno Wealth—straight to your inbox when you
                    connect with us.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-400"
                  >
                    Request updates
                  </Link>
                </MotionDiv>

                <MotionDiv
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  className="relative overflow-hidden rounded-2xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 p-6 sm:p-7 shadow-sm"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/30 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="relative mx-auto shrink-0 sm:mx-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          "Mozno Wealth"
                        )}&background=047857&color=fff&size=96`}
                        alt=""
                        loading="lazy"
                        className="h-20 w-20 rounded-2xl border-2 border-white object-cover shadow-md sm:h-[5.25rem] sm:w-[5.25rem]"
                      />
                      <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                        Written by
                      </p>
                      <h4 className="font-blog-serif mt-1 text-xl font-bold text-stone-900 sm:text-2xl">
                        Mozno Wealth
                      </h4>
                      <p className="text-xs text-stone-500 sm:text-sm">Contributor</p>
                      <p className="mt-3 text-sm leading-[1.65] text-stone-600">
                        Helping individuals and businesses achieve financial success through wealth
                        management, tax planning, and investment guidance.
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              </MotionSection>

              <div className="mt-12 w-full max-w-5xl lg:hidden">
                <RecentPosts currentPostId={post._id} />
              </div>

              <div className="mt-12 w-full max-w-5xl">
                {post && <CommentSection postId={post._id} />}
              </div>
            </div>

            <aside className="hidden w-full max-w-[20rem] shrink-0 lg:block xl:max-w-[22rem]">
              <div className="flex flex-col gap-8 lg:sticky lg:top-28">
                <MotionDiv
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50/90 to-white p-6 shadow-sm"
                >
                  <h3 className="font-blog-serif text-xl font-bold text-stone-900">
                    Free consultation
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    Discuss your financial goals with our team—wealth, tax, and investments tailored to you.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                  >
                    Book a call
                  </Link>
                </MotionDiv>

                <RecentPosts currentPostId={post._id} variant="sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ═══════ SCROLL TO TOP ═══════ */}
      <AnimatePresence>
        {showScrollTop && (
          <MotionButton
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-4
              bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full
              shadow-xl shadow-emerald-500/25 transition-shadow hover:shadow-emerald-500/40"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </MotionButton>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
