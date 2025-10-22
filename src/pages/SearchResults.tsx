import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { blogApi, ApiResponse, BlogPost } from '@/services/api';
import { SearchLight } from '@/icon/IconsAll';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const keyword = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await blogApi.getPosts({
          keyword: keyword,
          page: currentPage,
          limit: 6
        });
        setSearchResults(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword, currentPage]);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-100 flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown-600"></div>
              <p className="text-brown-600 text-body-lg">Searching...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!keyword.trim()) {
    return (
      <div className="min-h-screen bg-brown-100 flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <SearchLight className="w-16 h-16 text-brown-400 mx-auto mb-4" />
            <h1 className="text-h2 font-bold text-brown-600 mb-2">Enter a search term</h1>
            <p className="text-brown-400 text-body-lg">Please enter a keyword to search for articles</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brown-100 flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h2 font-bold text-brown-600 mb-2">Search Error</h1>
            <p className="text-brown-400 text-body-lg">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      <NavBar />
      
      <div className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-brown-600 mb-2">Search Results</h1>
          <p className="text-brown-400 text-body-lg">
            Found {searchResults?.totalPosts || 0} results for "{keyword}"
          </p>
        </div>

        {/* Search Results */}
        {searchResults && searchResults.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {searchResults.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brown-200 text-brown-600 rounded-full px-3 py-1 text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-h3 font-bold text-brown-600 mb-2 line-clamp-2 hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-brown-400 text-body-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center text-sm text-brown-500">
                      <span>{post.author}</span>
                      <span className="mx-2 text-brown-300">|</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {searchResults.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-brown-300 rounded-lg text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: searchResults.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-brown-600 text-white'
                          : 'text-brown-600 hover:bg-brown-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === searchResults.totalPages}
                  className="px-4 py-2 border border-brown-300 rounded-lg text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <SearchLight className="w-16 h-16 text-brown-400 mx-auto mb-4" />
            <h2 className="text-h2 font-bold text-brown-600 mb-2">No results found</h2>
            <p className="text-brown-400 text-body-lg">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
