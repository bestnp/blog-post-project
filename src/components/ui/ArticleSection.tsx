import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import AppButton from "@/components/ui/AppButton";
import { SearchLight } from "@/icon/IconsAll";
import BlogCard from "@/components/ui/BlogCard";
import { blogApi, BlogPost, formatDate } from "@/services/api";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export default function ArticleSection() {
  const [selected, setSelected] = useState("Highlight");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchPosts = async (page: number = 1, category?: string, keyword?: string, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const params = {
        page,
        limit: 6,
        ...(category && category !== "Highlight" && { category }),
        ...(keyword && { keyword }),
      };

      const response = await blogApi.getPosts(params);
      
      if (append) {
        // ป้องกันข้อมูลซ้ำโดยใช้ unique key (id)
        setPosts(prev => {
          const existingIds = new Set(prev.map(post => post.id));
          const newPosts = response.posts.filter(post => !existingIds.has(post.id));
          return [...prev, ...newPosts];
        });
      } else {
        setPosts(response.posts);
      }
      
      const hasNext = response.nextPage !== undefined && response.posts.length > 0;
      setHasNextPage(hasNext);
      setTotalPosts(response.totalPosts);
      setCurrentPage(response.currentPage);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  // ดึงข้อมูลครั้งแรกเมื่อ component mount
  useEffect(() => {
    fetchPosts(1, selected, searchTerm);
  }, []);

  // ดึงข้อมูลใหม่เมื่อเปลี่ยน category
  useEffect(() => {
    setCurrentPage(1);
    setPosts([]); // Clear posts array ก่อนดึงข้อมูลใหม่
    setHasNextPage(false); // Reset pagination state
    setTotalPosts(0);
    fetchPosts(1, selected, searchTerm);
  }, [selected]);

  // ดึงข้อมูลใหม่เมื่อเปลี่ยน search term (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      setPosts([]); // Clear posts array ก่อนดึงข้อมูลใหม่
      setHasNextPage(false); // Reset pagination state
      setTotalPosts(0);
      fetchPosts(1, selected, searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // ฟังก์ชันสำหรับ View More
  const handleViewMore = (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันการเด้งหน้า
    e.stopPropagation(); // ป้องกัน event bubbling
    
    if (hasNextPage && !loadingMore && !loading) {
      fetchPosts(currentPage + 1, selected, searchTerm, true);
    }
  };

  return (
    <section className="w-full px-4 pt-6 pb-3 max-w-[1200px] mx-auto">
      <h3 className="text-h3 font-bold mb-4 text-brown-600">Latest articles</h3>
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Search bar - Mobile */}
        <div className="w-full relative">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-[8px] bg-white text-sm pr-10 border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[40px] w-full"
          />
          <span className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-brown-400 pointer-events-none">
            <SearchLight width={18} height={18} />
          </span>
        </div>
        
        {/* Category Filter - Mobile */}
        <div className="space-y-2">
          <p className="text-brown-600 text-body-sm font-medium">Category</p>
          <div className="relative">
            <select 
              value={selected} 
              onChange={(e) => setSelected(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-brown-300 bg-white text-brown-600 text-body-sm focus:ring-brown-200 focus:ring-2 focus:border-brown-300 appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex bg-brown-200 flex-row items-center justify-between rounded-[16px] py-4 px-8 lg:px-12 w-full min-h-[60px]">
        {/* Tabs Filter */}
        <div className="flex flex-row gap-6">
          {categories.map((cat) => (
            <AppButton
              key={cat}
              variant={selected === cat ? "selected" : "ghost"}
              onClick={() => setSelected(cat)}
              className="px-4 py-2"
            >
              {cat}
            </AppButton>
          ))}
        </div>
        {/* Search bar */}
        <div className="flex items-center w-[350px] relative">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-[8px] bg-white text-body-lg pr-10 border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[40px] w-full"
          />
          <span className="absolute right-[12px] text-brown-400 pointer-events-none">
            <SearchLight width={20} height={20} />
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && posts.length === 0 && (
        <div className="mt-8 text-center py-12">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brown-600"></div>
            <p className="text-brown-600 text-body-lg">Loading...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-8 text-center py-12">
          <p className="text-red-500 text-body-lg mb-4">{error}</p>
          <AppButton 
            onClick={() => fetchPosts(1, selected, searchTerm)}
            variant="default"
            className="px-6 py-2"
          >
            Try Again
          </AppButton>
        </div>
      )}

      {/* Blog Posts Grid */}
      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* No results message */}
      {!loading && !error && posts.length === 0 && (
        <div className="mt-8 text-center py-12">
          <p className="text-brown-400 text-body-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}

      {/* View More Button */}
      {!loading && !error && posts.length > 0 && hasNextPage && !loadingMore && (
        <div className="text-center pt-12 pb-10 md:pt-[80px] md:pb-[120px]">
          <AppButton
            onClick={handleViewMore}
            disabled={loadingMore}
            variant="ghost"
            className="px-8 py-3 text-brown-600 text-body-lg underline hover:no-underline transition-all duration-200 hover:text-brown-500 disabled:opacity-50"
          >
            View More
          </AppButton>
        </div>
      )}


      {/* Loading indicator for View More */}
      {loadingMore && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brown-600"></div>
            <p className="text-brown-600 text-body-lg">Loading more posts...</p>
          </div>
        </div>
      )}

      {/* Bottom spacing when no View More button */}
      {!loading && !error && posts.length > 0 && !hasNextPage && (
        <div className="pb-10 md:pb-[120px]"></div>
      )}
    </section>
  );
}
