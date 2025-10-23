import React, { useState } from 'react';
import CommentCard from '@/components/ui/CommentCard';
import CommentList, { createMockComments } from '@/components/ui/CommentList';

const CommentTest: React.FC = () => {
  const [mockComments] = useState(createMockComments(5));

  // Mock server function
  const fetchCommentsFromServer = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return createMockComments(3);
  };

  const handleUserClick = (userId: string) => {
    console.log('User clicked:', userId);
    alert(`Clicked on user: ${userId}`);
  };

  const handleCommentClick = (commentId: string) => {
    console.log('Comment clicked:', commentId);
    alert(`Clicked on comment: ${commentId}`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Comment Component Test</h1>
        
        {/* Single Comment Card */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Single Comment Card</h2>
          <CommentCard
            userProfile={{
              name: "Jacob Lash",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Jacob Lash's profile picture"
            }}
            comment={{
              id: "comment-1",
              text: "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
              createdAt: "2024-09-12T18:30:00Z"
            }}
            onUserClick={handleUserClick}
            onCommentClick={handleCommentClick}
          />
        </section>

        {/* Comment Card with Default Avatar */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Comment Card with Default Avatar</h2>
          <CommentCard
            userProfile={{
              name: "Sarah Johnson",
              avatarAlt: "Sarah Johnson's profile picture"
            }}
            comment={{
              id: "comment-2",
              text: "Great insights! I've been wondering about this topic for a while. Thanks for sharing your research.",
              createdAt: new Date("2024-09-11T14:20:00Z")
            }}
            onUserClick={handleUserClick}
            onCommentClick={handleCommentClick}
          />
        </section>

        {/* Comment List with Mock Data */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Comment List (Mock Data)</h2>
          <CommentList
            comments={mockComments}
            onUserClick={handleUserClick}
            onCommentClick={handleCommentClick}
          />
        </section>

        {/* Comment List with Server Fetch */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Comment List (Server Fetch)</h2>
          <CommentList
            fetchComments={fetchCommentsFromServer}
            onUserClick={handleUserClick}
            onCommentClick={handleCommentClick}
            emptyMessage="No comments available from server."
          />
        </section>

        {/* Custom Styled Comments */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Custom Styled Comments</h2>
          <div className="space-y-4">
            <CommentCard
              userProfile={{
                name: "Mike Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                avatarAlt: "Mike Chen's profile picture"
              }}
              comment={{
                id: "comment-3",
                text: "This is exactly what I needed to read today. Very well written and informative.",
                createdAt: "2024-09-10T09:15:00Z"
              }}
              containerClassName="bg-gray-50 rounded-lg border border-gray-200"
              nameClassName="text-blue-600"
              timestampClassName="text-blue-400"
              textClassName="text-gray-700"
              onUserClick={handleUserClick}
              onCommentClick={handleCommentClick}
            />
            
            <CommentCard
              userProfile={{
                name: "Emma Wilson",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                avatarAlt: "Emma Wilson's profile picture"
              }}
              comment={{
                id: "comment-4",
                text: "I disagree with some points, but overall it's a solid piece. The examples really helped clarify things.",
                createdAt: "2024-09-09T16:45:00Z"
              }}
              containerClassName="bg-brown-50 rounded-lg border border-brown-200"
              nameClassName="text-brown-700"
              timestampClassName="text-brown-500"
              textClassName="text-brown-600"
              onUserClick={handleUserClick}
              onCommentClick={handleCommentClick}
            />
          </div>
        </section>

        {/* Long Comment */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Long Comment</h2>
          <CommentCard
            userProfile={{
              name: "Alex Brown",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Alex Brown's profile picture"
            }}
            comment={{
              id: "comment-5",
              text: "This is a much longer comment that demonstrates how the component handles text that spans multiple lines. The design should maintain good readability and proper spacing between elements. The comment text should wrap naturally and the overall layout should remain clean and organized. This is particularly important for comments that contain detailed feedback or lengthy discussions about the article content.",
              createdAt: "2024-09-08T11:30:00Z"
            }}
            onUserClick={handleUserClick}
            onCommentClick={handleCommentClick}
          />
        </section>

        {/* Empty State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Empty State</h2>
          <CommentList
            comments={[]}
            emptyMessage="No comments yet. Be the first to share your thoughts!"
          />
        </section>

        {/* Error State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Error State</h2>
          <CommentList
            error="Failed to load comments. Please try again later."
          />
        </section>
      </div>
    </div>
  );
};

export default CommentTest;
