import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Alert } from '@/components/ui/Alert';
import { blogApi, BlogPost, Author, Comment, formatDate } from '@/services/api';
import { ArrowLeft, Heart, Copy, MessageCircle, Send } from 'lucide-react';
import { HappyLight, CopyLight, FileLight, FacebookIcon, LinkedInIcon, TwitterIcon } from '@/icon/IconsAll';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';
import LoginDialog from '@/components/ui/LoginDialog';
import { Button } from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import CommentCard from '@/components/ui/CommentCard';
import { useAuth } from '@/context/authentication';

const ArticleDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false); // Login dialog state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
  });

  // Scroll to top when component mounts or postId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // ใช้ getPostById เพื่อดึงข้อมูลจาก server โดยตรง
        const fetchedPost = await blogApi.getPostById(parseInt(postId));
        setPost(fetchedPost);

        // ⚠️ Author endpoint not available in backend - using post data
        // Create author object from post data if needed
        if (fetchedPost.author) {
          setAuthor({
            id: 0,
            name: fetchedPost.author,
            avatar: "",
            bio: "",
          });
        }

        // ⚠️ Comments endpoint not available in backend
        // Comments will remain empty array
        setComments([]);
      } catch (err) {
        setError('Failed to load article');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyAlert(true);
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowCopyAlert(false);
    }, 3000);
  };

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    // Handle like functionality for logged in users
    console.log('Like clicked');
  };

  const handleSendComment = async () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    
    if (comment.trim() && postId) {
      try {
        setCommentsLoading(true);
        const newComment = await blogApi.postComment(parseInt(postId), comment.trim());
        setComments([...comments, newComment]);
        setComment('');
        setAlertConfig({
          title: "Comment posted",
          message: "Your comment has been posted successfully",
          variant: "success",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      } catch (error) {
        console.error('Error posting comment:', error);
        setAlertConfig({
          title: "Error",
          message: "Failed to post comment. Please try again.",
          variant: "error",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      } finally {
        setCommentsLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown-600"></div>
              <p className="text-brown-600 text-body-lg">Loading article...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-brown-600 mb-4">Article Not Found</h1>
            <p className="text-brown-400 mb-6">{error || 'The article you are looking for does not exist.'}</p>
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-100">
      <NavBar />
      <div className="max-w-[1200px] mx-auto px-4 py-8 pt-0">

        {/* Article Image */}
        <div className="article-image-container">
          <img
            src={post.image}
            alt={post.title}
            className="article-image"
          />
        </div>

        {/* Article Metadata */}
        <div className="article-metadata mb-6">
          <span className={`category-tag ${
            post.category.toLowerCase() === 'cat' 
              ? 'category-cat' 
              : post.category.toLowerCase() === 'general'
              ? 'category-general'
              : post.category.toLowerCase() === 'inspiration'
              ? 'category-inspiration'
              : 'category-general'
          }`}>
            {post.category}
          </span>
          <span className="text-brown-500">{formatDate(post.date)}</span>
        </div>

        {/* Article Title and Author Blog */}
        <div className="article-title-layout">
          {/* Left Column: Title + Content */}
          <div className="article-left-column">
            {/* Article Title */}
            <h1 className="text-left text-h2 font-bold text-brown-600 leading-tight mb-4">
              {post.title}
            </h1>

            {/* Article Description */}
            {post.description && (
              <p className="text-brown-400 text-body-lg mb-8 leading-relaxed">
                {post.description}
              </p>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <div className="markdown">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>

            {/* Social Sharing Section */}
            <div className="bg-brown-200 rounded-[16px] px-6 py-4 mb-8">
              <div className="flex items-center justify-between">
                {/* Likes */}
                <button 
                  onClick={handleLikeClick}
                  className="flex items-center gap-2 px-[40px] py-[12px] bg-white border border-brown-400 rounded-full text-brown-600 hover:bg-brown-50 transition-colors"
                >
                  <HappyLight className="w-6 h-6 text-brown-600" />
                  <span className="text-brown-600 font-medium text-body-lg">{post.likes_count || post.likes || 0}</span>
                </button>
                
                {/* Copy Link Button and Social Icons */}
                <div className="flex items-center gap-3">
                  {/* Copy Link Button */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-[40px] py-[12px] bg-white border border-brown-400 rounded-full text-brown-600 hover:bg-brown-50 hover:border-brown-500 transition-colors cursor-pointer"
                  >
                    <FileLight className="w-5 h-5" />
                    <span className="text-body-lg font-medium">Copy link</span>
                  </button>
                  
                  {/* Social Media Icons */}
                  <button className="hover:opacity-80 transition-opacity">
                    <FacebookIcon className="w-[48px] h-[48px] text-[#1877F2]" />
                  </button>
                  <button className="hover:opacity-80 transition-opacity">
                    <LinkedInIcon className="w-[48px] h-[48px] text-[#0077B5]" />
                  </button>
                  <button className="hover:opacity-80 transition-opacity">
                    <TwitterIcon className="w-[48px] h-[48px] text-[#55ACEE]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <section className="mb-12">
              <h2 className="text-body-lg text-brown-400 mb-2">
                Comment
              </h2>
              
              {/* Comment Input */}
              <div className="mb-8">
                <TextArea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  state="default"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleSendComment}
                    disabled={commentsLoading}
                    variant="default"
                    size="lg"
                    className="!text-white"
                  >
                    {commentsLoading ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((commentItem) => (
                  <CommentCard
                    key={commentItem.id}
                    userProfile={{
                      name: commentItem.author,
                      avatar: commentItem.avatar,
                      avatarAlt: commentItem.author
                    }}
                    comment={{
                      id: commentItem.id.toString(),
                      text: commentItem.content,
                      createdAt: commentItem.date
                    }}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Author Blog Sidebar */}
          <aside className="author-blog-sidebar">
            <div className="bg-brown-200 px-6 py-6 rounded-[16px] w-full lg:w-[305px] h-auto lg:h-auto shadow-md">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                  alt={post.author}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <div>
                  <h3 className="text-body-sm text-brown-400 mb-1">Author</h3>
                  <h4 className="text-h4 font-bold text-brown-500">{author?.name || post.author}</h4>
                </div>
              </div>
              <hr className="border-brown-300 mb-4" />
              <div className="text-brown-400 text-body-lg leading-relaxed whitespace-pre-line">
                {author?.bio || 'No bio available'}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Login Dialog */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
      />

      {/* Copy Link Alert */}
      {showCopyAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert
            variant="success"
            title="Copied!"
            message="This article has been copied to your clipboard."
            onClose={() => setShowCopyAlert(false)}
          />
        </div>
      )}

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant={alertConfig.variant}
            title={alertConfig.title}
            message={alertConfig.message}
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};
 
export default ArticleDetail;
