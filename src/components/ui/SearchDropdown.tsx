import React from 'react';
import { BlogPost } from '@/services/api';

interface SearchDropdownProps {
  results: BlogPost[];
  isLoading: boolean;
  onPostClick: (postId: number) => void;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ 
  results, 
  isLoading, 
  onPostClick, 
  onClose 
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-brown-200 max-h-80 overflow-y-auto z-50">
        <div className="p-4 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brown-600"></div>
            <p className="text-brown-600 text-body-sm">Searching...</p>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-brown-200 max-h-80 overflow-y-auto z-50">
      {results.map((post, index) => (
        <div
          key={post.id}
          className="px-4 py-3 hover:bg-brown-200 cursor-pointer border-b border-brown-100 last:border-b-0 transition-colors"
          onClick={() => {
            onPostClick(post.id);
            onClose();
          }}
        >
          <h3 className="text-brown-600 font-medium text-body-md line-clamp-2 hover:text-brown-700">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-brown-400 text-body-sm mt-1 line-clamp-1">
              {post.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
