import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, SearchLight } from "@/icon/IconsAll";
import SearchDropdown from "./SearchDropdown";
import { blogApi, BlogPost } from "@/services/api";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<number | undefined>(undefined);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length >= 2) {
      // Debounce search
      searchTimeoutRef.current = window.setTimeout(async () => {
        setIsSearchLoading(true);
        try {
          const response = await blogApi.getPosts({
            keyword: value.trim(),
            limit: 6
          });
          setSearchResults(response.posts);
          setShowDropdown(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearchLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleSearchBlur = () => {
    // Delay hiding dropdown to allow clicking on results
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowDropdown(true);
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
    <nav className="bg-white border-b border-brown-300">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="text-xl font-semibold text-brown-500 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LogoIcon className="w-[44px] h-[44px]" />
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search articles..."
                className="w-full px-4 py-2 pl-10 border border-brown-300 rounded-full focus:ring-2 focus:ring-brown-200 focus:border-brown-300 outline-none text-body-md"
              />
              <SearchLight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
              
              {/* Search Dropdown */}
              {showDropdown && (
                <SearchDropdown
                  results={searchResults}
                  isLoading={isSearchLoading}
                  onPostClick={handlePostClick}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
          </form>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <button className="h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full border border-brown-400 bg-white shadow-sm">
              Log in
            </button>
            <button className="h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full bg-brown-600 text-white shadow-sm">
              Sign up
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-brown-300 bg-white px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 pl-10 border border-brown-300 rounded-full focus:ring-2 focus:ring-brown-200 focus:border-brown-300 outline-none text-body-md"
                />
                <SearchLight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
                
                {/* Mobile Search Dropdown */}
                {showDropdown && (
                  <SearchDropdown
                    results={searchResults}
                    isLoading={isSearchLoading}
                    onPostClick={handlePostClick}
                    onClose={() => setShowDropdown(false)}
                  />
                )}
              </div>
            </form>
            <button className="w-full h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full border border-brown-400 bg-white shadow-sm">
              Log in
            </button>
            <button className="w-full h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full bg-brown-600 text-white shadow-sm">
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

