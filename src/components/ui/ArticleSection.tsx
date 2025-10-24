import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import { Tab, TabGroup } from "@/components/ui/Tab";
import { Button } from "@/components/ui/Button";
import { SearchLight } from "@/icon/IconsAll";
import BlogCard from "@/components/ui/BlogCard";
import SearchDropdown from "@/components/ui/SearchDropdown";
import { blogApi, BlogPost, formatDate } from "@/services/api";

// Categories - สามารถดึงจาก API ได้ในอนาคต
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
  
  // Search dropdown states
  const [searchDropdownResults, setSearchDropdownResults] = useState<BlogPost[]>([]);
  const [isSearchDropdownLoading, setIsSearchDropdownLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<number | undefined>(undefined);

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

  // ฟังก์ชันสำหรับจัดการ search dropdown
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length >= 2) {
      // Debounce search for dropdown
      searchTimeoutRef.current = window.setTimeout(async () => {
        setIsSearchDropdownLoading(true);
        try {
          const response = await blogApi.getPosts({
            keyword: value.trim(),
            limit: 6
          });
          setSearchDropdownResults(response.posts);
          setShowSearchDropdown(true);
        } catch (error) {
          console.error('Search dropdown error:', error);
          setSearchDropdownResults([]);
        } finally {
          setIsSearchDropdownLoading(false);
        }
      }, 300);
    } else {
      setSearchDropdownResults([]);
      setShowSearchDropdown(false);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
    setSearchTerm('');
    setShowSearchDropdown(false);
  };

  const handleSearchBlur = () => {
    // Delay hiding dropdown to allow clicking on results
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchDropdownResults.length > 0) {
      setShowSearchDropdown(true);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            showSearchIcon={true}
            showClearButton={false}
            className="rounded-[8px] bg-white text-body-sm border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[40px] w-full"
          />
          
          {/* Mobile Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 z-50">
              <SearchDropdown
                results={searchDropdownResults}
                isLoading={isSearchDropdownLoading}
                onPostClick={handlePostClick}
                onClose={() => setShowSearchDropdown(false)}
              />
            </div>
          )}
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
      <div className="hidden lg:flex bg-brown-200 flex-row items-center justify-between rounded-[16px] py-[16px] px-[24px] gap-6">
        {/* Tabs Filter */}
        <TabGroup className="gap-2">
          {categories.map((cat) => (
            <Tab
              key={cat}
              isActive={selected === cat}
              onClick={() => setSelected(cat)}
              className="px-5 py-3"
            >
              {cat}
            </Tab>
          ))}
        </TabGroup>
        {/* Search bar */}
        <div className="relative w-[360px]">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            showSearchIcon={true}
            showClearButton={false}
            className="rounded-[8px] bg-white text-body-lg border-brown-300 focus:ring-brown-200 focus:ring-2 transition h-[48px] w-full"
          />
          
          {/* Desktop Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 z-50">
              <SearchDropdown
                results={searchDropdownResults}
                isLoading={isSearchDropdownLoading}
                onPostClick={handlePostClick}
                onClose={() => setShowSearchDropdown(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Area with min-height to prevent jumping */}
      <div className="mt-8 min-h-[600px] relative">
        {/* Loading State */}
        {loading && posts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brown-600"></div>
              <p className="text-brown-600 text-body-lg">Loading...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-body-lg mb-4">{error}</p>
              <Button 
                onClick={() => fetchPosts(1, selected, searchTerm)}
                variant="default"
                size="default"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {posts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && !error && posts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-brown-400 text-body-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* View More Button */}
      {!loading && !error && posts.length > 0 && hasNextPage && !loadingMore && (
        <div className="text-center pt-12 pb-10 md:pt-[80px] md:pb-[120px]">
          <Button
            onClick={handleViewMore}
            disabled={loadingMore}
            variant="text"
            size="lg"
            className="underline hover:no-underline"
          >
            View More
          </Button>
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
