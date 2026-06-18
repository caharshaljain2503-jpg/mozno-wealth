import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";

const MotionArticle = motion.article;

// ─── Safe date formatter ─────────────────────────────
const formatDate = (dateValue) => {
  if (!dateValue) return "Recently published";

  try {
    let parsed;

    if (dateValue instanceof Date) {
      parsed = dateValue;
    } else if (typeof dateValue === "string") {
      // Try ISO parse first, then fallback to Date constructor
      parsed = parseISO(dateValue);
      if (!isValid(parsed)) {
        parsed = new Date(dateValue);
      }
    } else if (typeof dateValue === "number") {
      parsed = new Date(dateValue);
    } else {
      return "Recently published";
    }

    return isValid(parsed)
      ? format(parsed, "MMM dd, yyyy")
      : "Recently published";
  } catch {
    return "Recently published";
  }
};

const toPlainText = (value = "") =>
  String(value)
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (value, maxLength = 150) => {
  const text = toPlainText(value);
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}...` : text;
};

const BlogCard = ({ post, index }) => {
  // ─── Normalize fields (API vs static data) ──────────
  const id = post._id || post.id;
  const slug = post.slug || id;
  const title = post.title || "Untitled";
  const excerpt = truncateText(
    post.subTitle || post.excerpt || post.paragraph || post.description,
  );
  const category = post.category || "General";
  const image = post.image || post.coverImage || post.thumbnail || "";
  const readTime = post.readTime || "5 min read";
  const views = post.views || 0;
  const likes = post.likes || 0;
  const comments = post.comments || 0;
  const tags = post.tags || [];
  const featured = post.featured || false;

  // ✅ Safe date — tries all possible field names
  const displayDate = formatDate(
    post.date || post.createdAt || post.publishedAt || post.updatedAt,
  );

  // Author can be string or object from API
  const authorName =
    typeof post.author === "object"
      ? [post.author?.firstName, post.author?.lastName].filter(Boolean).join(" ") ||
        post.author?.name ||
        "Mozno Team"
      : post.author || "Mozno Team";

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
    >
      {/* Image Container */}
      {image && (
        <div className="relative overflow-hidden h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Blog";
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4">
            <span className="px-2 py-0.5 xs:px-2.5 xs:py-1 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] xs:text-xs font-semibold rounded-full shadow-sm">
              {category}
            </span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4">
              <span className="px-2 py-0.5 xs:px-2.5 xs:py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] xs:text-xs font-bold rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}

          {/* Read Time Badge - Mobile */}
          <div className="absolute bottom-2 xs:bottom-3 right-2 xs:right-3 sm:hidden">
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 text-[10px] xs:text-xs sm:text-sm text-gray-500 mb-2 xs:mb-3 sm:mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
            {/* ✅ FIXED: Safe date formatting */}
            <span>{displayDate}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
            <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
              {authorName}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 xs:mb-2.5 sm:mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
          <Link
            to={`/blogs/${slug}`}
            className="hover:underline decoration-emerald-500 underline-offset-2"
          >
            {title}
          </Link>
        </h3>

        
        <p className="text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
          <span className="text-[10px] min-[375px]:text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-2 lg:line-clamp-3 leading-relaxed">
            {excerpt ||
              "Explore this insightful article about financial planning and wealth management."}
          </span>
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-3 xs:mb-4 sm:mb-6">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 xs:px-2 xs:py-1 bg-gray-100 text-gray-600 text-[10px] xs:text-xs rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-1.5 py-0.5 xs:px-2 xs:py-1 text-gray-400 text-[10px] xs:text-xs">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer Stats & Actions */}
        <div className="flex items-center justify-between pt-3 xs:pt-4 border-t border-gray-100">
          {/* Stats */}
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 text-[10px] xs:text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-0.5 xs:gap-1">
              <Eye className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
              <span>
                {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
              </span>
            </div>
            <div className="flex items-center gap-0.5 xs:gap-1">
              <Heart className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-0.5 xs:gap-1">
              <MessageCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
              <span>{comments}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
            <button
              className="p-1.5 xs:p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label="Save article"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <Link
              to={`/blogs/${slug}`}
              className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-emerald-600 font-semibold text-[10px] xs:text-xs sm:text-sm hover:gap-2 xs:hover:gap-2.5 sm:hover:gap-3 transition-all group/link"
            >
              <span className="hidden xs:inline">Read More</span>
              <span className="xs:hidden">Read</span>
              <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
};

export default BlogCard;
