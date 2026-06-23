// components/blogs/CommentSection.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Heart,
  Reply,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { useBlogComments, useAddComment } from "../../hooks/useBlog";

// ─── Safe date formatter ─────────────────────────────
const formatCommentDate = (dateValue) => {
  if (!dateValue) return "Just now";
  try {
    const parsed = typeof dateValue === "string" ? parseISO(dateValue) : new Date(dateValue);
    if (!isValid(parsed)) return "Just now";

    const now = new Date();
    const diff = now - parsed;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return format(parsed, "MMM dd, yyyy");
  } catch {
    return "Just now";
  }
};

// ─── Single Comment ──────────────────────────────────
const Comment = ({ comment, onReply, depth = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const name = comment.name || "Anonymous";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=10b981&color=fff&size=40`;

  const replies = comment.replies || [];
  const likeCount = 0; // You can add likes functionality later
  const maxDepth = 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${depth > 0 ? "ml-6 sm:ml-10 pl-4 sm:pl-6 border-l-2 border-emerald-100" : ""}`}
    >
      <div className="flex gap-3 sm:gap-4 py-4 sm:py-5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={avatarFallback}
            alt={name}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
              <span className="text-xs text-gray-400">
                {formatCommentDate(comment.createdAt)}
              </span>
            </div>
            <button className="p-1 text-gray-300 hover:text-gray-500 rounded transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Comment Body */}
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 transition-colors ${
                liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${liked ? "fill-current" : ""}`} />
              <span>{likeCount + (liked ? 1 : 0)}</span>
            </button>

            {depth < maxDepth && (
              <button
                onClick={() => onReply(comment._id, name)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Reply className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Reply</span>
              </button>
            )}

            {/* Toggle Replies */}
            {replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                {showReplies ? (
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
                <span>
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      <AnimatePresence>
        {showReplies && replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Comment Input Form ──────────────────────────────
const CommentInput = ({ onSubmit, isSubmitting, replyTo, onCancelReply }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!content.trim()) newErrors.content = "Comment cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      content: content.trim(),
      parentComment: replyTo?.id || null,
    });

    setContent("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Reply indicator */}
      {replyTo && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-2.5 border border-emerald-100"
        >
          <p className="text-sm text-emerald-700">
            Replying to <span className="font-semibold">{replyTo.name}</span>
          </p>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Cancel
          </button>
        </motion.div>
      )}

      {/* Name Input */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: "" }));
          }}
          placeholder="Your name *"
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200 focus:ring-emerald-500 focus:border-transparent"
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
      </div>

      {/* Comment Textarea */}
      <div>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errors.content) setErrors((p) => ({ ...p, content: "" }));
          }}
          placeholder={replyTo ? `Reply to ${replyTo.name}...` : "Write your comment..."}
          rows={4}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 transition-all ${
            errors.content
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200 focus:ring-emerald-500 focus:border-transparent"
          }`}
        />
        {errors.content && <p className="text-xs text-red-500 mt-1 ml-1">{errors.content}</p>}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Your name will be displayed publicly.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {replyTo ? "Post Reply" : "Post Comment"}
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

// ─── Main CommentSection ─────────────────────────────
const CommentSection = ({ postId, onCountChange }) => {
  const [replyTo, setReplyTo] = useState(null);

  // Fetch comments
  const { data, isLoading, isError, error, refetch } = useBlogComments(postId);

  // Add comment mutation
  const { mutate: addComment, isPending: isSubmitting } = useAddComment();

  // Extract comments from response
  const comments = data?.comments || [];

  useEffect(() => {
    onCountChange?.(comments.length);
  }, [comments.length, onCountChange]);

  const handleReply = (commentId, authorName) => {
    setReplyTo({ id: commentId, name: authorName });
    document.getElementById("comment-input")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = (commentData) => {
    addComment(
      {
        blogId: postId,
        ...commentData,
      },
      {
        onSuccess: () => {
          setReplyTo(null);
          refetch();
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 sm:mb-12"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl text-white">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          Comments
          {!isLoading && comments.length > 0 && (
            <span className="text-sm sm:text-base font-normal text-gray-400">
              ({comments.length})
            </span>
          )}
        </h3>
      </div>

      {/* Comment Input */}
      <div
        id="comment-input"
        className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100 mb-8 sm:mb-10"
      >
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">
          {replyTo ? "Post a Reply" : "Leave a Comment"}
        </h4>
        <CommentInput
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>

      {/* Comments List */}
      <div>
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
            <p className="text-sm text-gray-500">Loading comments...</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-10 bg-red-50 rounded-2xl border border-red-100">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-sm text-red-600 mb-4">
              {error?.message || "Failed to load comments."}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Comments */}
        {!isLoading && !isError && comments.length > 0 && (
          <div className="divide-y divide-gray-100">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onReply={handleReply} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && comments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              No comments yet
            </h4>
            <p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CommentSection;
