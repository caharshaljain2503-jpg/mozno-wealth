import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Sparkles,
  Loader2,
} from "lucide-react";
import BlogCard from "../components/blogs/BlogCard";
import { useBlogs, useInvalidateBlogs } from "../hooks/useBlog";
import {
  blogPosts as fallbackPosts,
  categories as staticCategories,
  popularTags as staticTags,
} from "../data/blog";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleArticleCount, setVisibleArticleCount] = useState(6);

  const heroRef = useRef(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch blogs with React Query
  const {
    data: blogsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useBlogs({
    page: 1,
    limit: 20,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    tag: selectedTag || undefined,
    search: debouncedSearch || undefined,
  });

  const { invalidateList } = useInvalidateBlogs();

  // Hero parallax effect
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  const blogs = blogsData?.blogs || fallbackPosts;

  // Filter posts
  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      debouncedSearch === "" ||
      post.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
    return matchesCategory && matchesSearch && matchesTag;
  });
  const visiblePosts = filteredPosts.slice(0, visibleArticleCount);
  const hasMorePosts = visibleArticleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleArticleCount(6);
  }, [selectedCategory, selectedTag, debouncedSearch]);

  const featuredPosts = blogs.filter((post) => post.featured);

  // Generate dynamic categories
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    blogs.forEach((post) => {
      if (post.category) {
        categoryMap.set(
          post.category,
          (categoryMap.get(post.category) || 0) + 1
        );
      }
    });

    const dynamicCategories = Array.from(categoryMap.entries()).map(
      ([name, count]) => ({ name, count })
    );

    const allCategories = [...staticCategories];
    dynamicCategories.forEach((dynCat) => {
      const existing = allCategories.find((c) => c.name === dynCat.name);
      if (existing) {
        existing.count = dynCat.count;
      } else {
        allCategories.push(dynCat);
      }
    });

    return allCategories;
  }, [blogs]);

  // Generate dynamic tags
  const popularTags = React.useMemo(() => {
    const tagMap = new Map();
    blogs.forEach((post) => {
      post.tags?.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag]) => tag);
  }, [blogs]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedTag(null);
  };

  const hasActiveFilters =
    selectedCategory !== "All" || searchQuery || selectedTag;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      {/* ============ HERO SECTION ============ */}
      <section
        ref={heroRef}
        className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden"
      >
        {/* Background with Parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 sm:mb-6"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
                <span className="text-[10px] sm:text-xs font-medium text-white/90">
                  Financial Insights & Knowledge
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 text-white">
                Mozno Wealth{" "}
                <span
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                >
                  Insights
                </span>
              </h1>

              {/* Subtitle - Updated as per client */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 max-w-2xl mx-auto">
                Smart strategies, expert insights, and practical financial
                guidance simplified for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CONTENT SECTION ============ */}
      <section className="relative z-10 -mt-4 sm:-mt-6 md:-mt-8">
        <div className="bg-white pt-6 sm:pt-8 md:pt-12 lg:pt-16">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden sticky top-[72px] sm:top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2.5 shadow-sm">
            <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
              <div className="flex-1 min-w-0">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      Loading...
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    <span className="font-bold text-emerald-600">
                      {filteredPosts.length}
                    </span>{" "}
                    articles
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                  hasActiveFilters
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-4 h-4 bg-white text-emerald-600 rounded-full text-[9px] flex items-center justify-center font-bold">
                    {
                      [selectedCategory !== "All", searchQuery, selectedTag].filter(
                        Boolean
                      ).length
                    }
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 overflow-hidden"
              >
                <div className="p-4 space-y-4 max-w-7xl mx-auto">
                  {/* Search */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                      />
                      {searchQuery ? (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      ) : (
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryChange(category.name)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                            selectedCategory === category.name
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                              : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
                          }`}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {popularTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagChange(tag)}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${
                            selectedTag === tag
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 text-xs text-red-500 font-medium bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
              {/* ============ STICKY SIDEBAR ============ */}
              <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-5">
                  {/* Search Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-bl-full opacity-50" />
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 relative text-sm">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg text-white">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      Search Articles
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type to search..."
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                      {searchQuery ? (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      ) : (
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                  </motion.div>

                  {/* Categories Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-bl-full opacity-50" />
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 relative text-sm">
                      <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg text-white">
                        <Filter className="w-3.5 h-3.5" />
                      </div>
                      Categories
                    </h3>
                    <div className="space-y-1.5">
                      {categories.map((category, index) => (
                        <motion.button
                          key={category.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          onClick={() => handleCategoryChange(category.name)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                            selectedCategory === category.name
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                              : "text-gray-600 hover:bg-emerald-50 bg-gray-50"
                          }`}
                        >
                          <span className="font-medium">{category.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              selectedCategory === category.name
                                ? "bg-white/20 text-white"
                                : "bg-white text-gray-500"
                            }`}
                          >
                            {category.count}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Popular Tags Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-bl-full opacity-50" />
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 relative text-sm">
                      <div className="p-1.5 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {popularTags.slice(0, 10).map((tag, index) => (
                        <motion.button
                          key={tag}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.03 }}
                          onClick={() => handleTagChange(tag)}
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-all ${
                            selectedTag === tag
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-emerald-50"
                          }`}
                        >
                          #{tag}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Featured Articles Card */}
                  {featuredPosts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
                      <div className="relative p-4">
                        <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          Featured
                        </h3>
                        <div className="space-y-2">
                          {featuredPosts.slice(0, 3).map((post, index) => (
                            <motion.a
                              key={post.id}
                              href={`/blogs/${post.slug || post.id}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="block bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all border border-white/10"
                            >
                              <h4 className="font-semibold text-white text-[11px] line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-[9px] text-white/70 mt-1.5 flex items-center gap-1.5">
                                <span>{post.views || 0} views</span>
                              </p>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </aside>

              {/* ============ BLOG CARDS ============ */}
              <main className="flex-1 min-w-0">
                {/* Filter Status Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 sm:mb-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        {selectedCategory === "All"
                          ? "All Articles"
                          : selectedCategory}
                      </h2>
                      {isLoading ? (
                        <div className="flex items-center gap-2 mt-0.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                          <p className="text-[10px] sm:text-xs text-gray-600">
                            Loading articles...
                          </p>
                        </div>
                      ) : (
                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                          Showing{" "}
                          <span className="font-semibold text-emerald-600">
                            {visiblePosts.length}
                          </span>{" "}
                          of {filteredPosts.length} article
                          {filteredPosts.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-50 font-medium rounded-lg transition-colors text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Active Filters Pills */}
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hidden lg:flex flex-wrap gap-1.5 mt-3"
                    >
                      {selectedCategory !== "All" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-medium">
                          {selectedCategory}
                          <button
                            onClick={() => handleCategoryChange("All")}
                            className="hover:bg-emerald-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium">
                          "{searchQuery}"
                          <button
                            onClick={() => setSearchQuery("")}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedTag && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-medium">
                          #{selectedTag}
                          <button
                            onClick={() => setSelectedTag(null)}
                            className="hover:bg-purple-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                    <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-emerald-600 mb-4" />
                    <p className="text-xs sm:text-sm text-gray-600">
                      Loading amazing articles...
                    </p>
                  </div>
                )}

                {/* Error State */}
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 sm:py-20"
                  >
                    <div className="max-w-md mx-auto px-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        Failed to load articles
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-5">
                        {error?.message || "Something went wrong. Please try again."}
                      </p>
                      <button
                        onClick={() => refetch()}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Blog Cards Grid */}
                {!isLoading && !isError && filteredPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {visiblePosts.map((post, index) => (
                      <motion.div
                        key={post._id || post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                      >
                        <BlogCard post={post} index={index} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {!isLoading && !isError && hasMorePosts && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setVisibleArticleCount((count) => count + 6)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25"
                    >
                      Show More Articles
                      <span aria-hidden="true">↓</span>
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      Showing {visiblePosts.length} of {filteredPosts.length} articles
                    </p>
                  </motion.div>
                )}

                {/* No Results State */}
                {!isLoading && !isError && filteredPosts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 sm:py-20"
                  >
                    <div className="max-w-md mx-auto px-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        No articles found
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-5">
                        Try adjusting your search or filters.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm"
                      >
                        View All Articles
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Newsletter CTA */}
                {!isLoading && !isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-10 sm:mt-12 md:mt-16 relative rounded-xl sm:rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-cyan-600/20" />

                    <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
                      <div className="max-w-xl mx-auto text-center">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                          Never Miss Financial{" "}
                          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            Insights
                          </span>
                        </h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 mb-4 sm:mb-6">
                          Join 5,000+ subscribers for weekly updates on tax planning,
                          investment strategies, and wealth management.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
                          <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs sm:text-sm"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm whitespace-nowrap"
                          >
                            Subscribe
                          </button>
                        </form>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-3">
                          ✓ No spam &nbsp; ✓ Unsubscribe anytime &nbsp; ✓ Free forever
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
