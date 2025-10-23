import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CommentCard, { CommentCardProps } from "./CommentCard";

export interface Comment {
  id: string;
  text: string;
  createdAt: string | Date;
  userProfile: {
    name: string;
    avatar?: string;
    avatarAlt?: string;
  };
}

export interface CommentListProps {
  // Data source
  comments?: Comment[];
  fetchComments?: () => Promise<Comment[]>;
  
  // Loading state
  loading?: boolean;
  error?: string;
  
  // Styling
  className?: string;
  containerClassName?: string;
  
  // Event handlers
  onUserClick?: (userId: string) => void;
  onCommentClick?: (commentId: string) => void;
  
  // Empty state
  emptyMessage?: string;
}

const CommentList: React.FC<CommentListProps> = ({
  comments: initialComments,
  fetchComments,
  loading: externalLoading,
  error: externalError,
  className,
  containerClassName,
  onUserClick,
  onCommentClick,
  emptyMessage = "No comments yet. Be the first to comment!",
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [loading, setLoading] = useState(externalLoading || false);
  const [error, setError] = useState(externalError || null);

  // Fetch comments on mount if fetchComments is provided
  useEffect(() => {
    if (fetchComments && !initialComments) {
      setLoading(true);
      fetchComments()
        .then((data) => {
          setComments(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch comments");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [fetchComments, initialComments]);

  // Update comments when initialComments changes
  useEffect(() => {
    if (initialComments) {
      setComments(initialComments);
    }
  }, [initialComments]);

  // Update loading state when externalLoading changes
  useEffect(() => {
    if (externalLoading !== undefined) {
      setLoading(externalLoading);
    }
  }, [externalLoading]);

  // Update error state when externalError changes
  useEffect(() => {
    if (externalError !== undefined) {
      setError(externalError);
    }
  }, [externalError]);

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="text-red-500 mb-2">Error loading comments</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          userProfile={comment.userProfile}
          comment={comment}
          containerClassName={containerClassName}
          onUserClick={onUserClick}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
};

// Helper function to create mock comments for testing
export const createMockComments = (count: number = 5): Comment[] => {
  const mockComments: Comment[] = [];
  const names = ["Jacob Lash", "Sarah Johnson", "Mike Chen", "Emma Wilson", "Alex Brown"];
  const avatars = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  ];
  
  const sampleComments = [
    "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
    "Great insights! I've been wondering about this topic for a while. Thanks for sharing your research.",
    "This is exactly what I needed to read today. Very well written and informative.",
    "I disagree with some points, but overall it's a solid piece. The examples really helped clarify things.",
    "Amazing work! I've bookmarked this for future reference. Keep up the great content!",
  ];

  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
    
    mockComments.push({
      id: `comment-${i + 1}`,
      text: randomComment,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
      userProfile: {
        name: randomName,
        avatar: randomAvatar,
        avatarAlt: `${randomName}'s profile picture`,
      },
    });
  }

  return mockComments;
};

export default CommentList;
