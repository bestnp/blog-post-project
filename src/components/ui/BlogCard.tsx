import React from "react";
import { BlogPost } from "@/services/api";
import { formatDate } from "@/services/api";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cat':
        return 'bg-green-light text-green rounded-full px-3 py-1 text-sm font-semibold';
      case 'general':
        return 'bg-brown-200 text-brown-600 rounded-full px-3 py-1 text-sm font-semibold';
      case 'inspiration':
        return 'bg-orange text-white rounded-full px-3 py-1 text-sm font-semibold';
      default:
        return 'bg-brown-200 text-brown-600 rounded-full px-3 py-1 text-sm font-semibold';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img 
          className="w-full h-full object-cover rounded-md" 
          src={post.image} 
          alt={post.title}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className={`${getCategoryColor(post.category)} mb-2`}>
            {post.category}
          </span>
        </div>
        <a href="#">
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline text-brown-600">
            {post.title}
          </h2>
        </a>
        <p className="text-brown-400 text-sm mb-4 flex-grow line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center text-sm text-brown-500">
          <span>{post.author}</span>
          <span className="mx-2 text-brown-300">|</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;