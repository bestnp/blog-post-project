import axios from 'axios';

const API_BASE_URL = 'https://blog-post-project-api-five.vercel.app';

export interface Author {
  id: number;
  name: string;
  avatar: string;
  bio: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export interface Notification {
  id: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type?: 'comment' | 'like' | 'follow' | 'publish';
  postId?: number;
}

export interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorDetails?: Author;
  date: string;
  likes: number;
  content: string;
}

export interface ApiResponse {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
  limit: number;
}

export interface BlogPostParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}

export const blogApi = {
  // ดึงข้อมูล blog posts จาก API
  getPosts: async (params: BlogPostParams = {}): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 6,
          ...(params.category && { category: params.category }),
          ...(params.keyword && { keyword: params.keyword }),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // ดึงข้อมูล blog post ตาม ID
  getPostById: async (id: number): Promise<BlogPost> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  // ดึงข้อมูล author details
  getAuthorByName: async (name: string): Promise<Author> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`, {
        params: { name }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching author:', error);
      throw error;
    }
  },

  // ดึงข้อมูล comments ของบทความ
  getComments: async (postId: number): Promise<Comment[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Return empty array if API fails
      return [];
    }
  },

  // ส่ง comment ใหม่
  postComment: async (postId: number, content: string): Promise<Comment> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, {
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  },

  // ดึงข้อมูล notifications
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Return mock data if API fails (for development)
      return [
        {
          id: '1',
          userName: 'Thompson P.',
          userAvatar: 'https://i.pravatar.cc/150?img=33',
          message: 'Published new article.',
          timestamp: '2 hours ago',
          isRead: false,
          type: 'publish',
        },
        {
          id: '2',
          userName: 'Jacob Lash',
          userAvatar: 'https://i.pravatar.cc/150?img=14',
          message: 'Comment on the article you have read.',
          timestamp: '4 hours ago',
          isRead: false,
          type: 'comment',
        },
      ];
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    try {
      await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (): Promise<void> => {
    try {
      await axios.patch(`${API_BASE_URL}/notifications/read-all`);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // สร้างบทความใหม่
  createPost: async (formData: FormData): Promise<BlogPost> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // อัพเดทบทความ
  updatePost: async (id: number, formData: FormData): Promise<BlogPost> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },
};

// ฟังก์ชันแปลง ISO date เป็น readable format
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
