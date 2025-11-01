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
  category?: string; // Legacy field (from category_name)
  category_id?: number;
  category_name?: string;
  title: string;
  description: string;
  author?: string; // May not be in backend response
  authorDetails?: Author;
  date: string;
  likes?: number;
  likes_count?: number; // Backend uses likes_count
  content: string;
  status?: string; // Legacy field
  status_id?: number;
  status_name?: string;
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

// Backend response format
interface BackendPostResponse {
  data: BlogPost[];
}

interface BackendSinglePostResponse {
  data: BlogPost;
}

export interface BlogPostParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}

// Authentication API functions
export const authApi = {
  // POST /auth/logout - Logout current user
  logout: async (): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.error('Error logging out:', error);
      // Even if logout fails, clear token locally
      throw error;
    }
  },

  // POST /auth/refresh - Refresh access token
  refreshToken: async (refreshToken: string): Promise<{ access_token: string; refresh_token: string; expires_at: number }> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken
      });
      return response.data.session;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },

  // POST /auth/forgot-password - Request password reset email
  forgotPassword: async (email: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },

  // POST /auth/reset-password - Reset password with token from email
  resetPassword: async (password: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { password });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // PUT /auth/reset-password - Change password when logged in
  changePassword: async (oldPassword: string, newPassword: string): Promise<any> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/reset-password`, {
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
};

export const blogApi = {
  // ดึงข้อมูล blog posts จาก API
  getPosts: async (params: BlogPostParams = {}): Promise<ApiResponse> => {
    try {
      // Backend uses /assignments and returns { data: [...] }
      const response = await axios.get<any>(`${API_BASE_URL}/assignments`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 6,
          ...(params.category && { category: params.category }),
          ...(params.keyword && { keyword: params.keyword }),
        },
      });
      
      // Handle error message from backend (e.g., database connection error)
      if (response.data.message && !response.data.data) {
        console.error('Backend error message:', response.data.message);
        throw new Error(response.data.message || 'Failed to fetch posts');
      }
      
      // Transform backend response to frontend format
      const backendPosts = response.data.data || [];
      
      // Handle case where backend returns empty array or null
      if (!Array.isArray(backendPosts)) {
        console.warn('Backend did not return an array:', response.data);
        return {
          posts: [],
          totalPosts: 0,
          currentPage: params.page || 1,
          totalPages: 0,
          limit: params.limit || 6,
        };
      }
      
      // Map backend format to frontend format
      const posts: BlogPost[] = backendPosts.map((post: any) => ({
        ...post,
        category: post.category_name || post.category || '',
        likes: post.likes_count || post.likes || 0,
        status: post.status_name || post.status || '',
        author: post.author || 'Unknown', // Default author if not provided
      }));
      
      return {
        posts,
        totalPosts: posts.length,
        currentPage: params.page || 1,
        totalPages: Math.ceil(posts.length / (params.limit || 6)),
        limit: params.limit || 6,
      };
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      
      // Extract error message from response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch posts';
      
      // Create a more informative error
      const enhancedError = new Error(errorMessage);
      (enhancedError as any).response = error.response;
      throw enhancedError;
    }
  },

  // ดึงข้อมูล blog post ตาม ID
  getPostById: async (id: number): Promise<BlogPost> => {
    try {
      const response = await axios.get<BackendSinglePostResponse>(`${API_BASE_URL}/assignments/${id}`);
      // Backend returns { data: {...} }
      const post = response.data.data;
      // Map backend format to frontend format
      return {
        ...post,
        category: post.category_name || post.category || '',
        likes: post.likes_count || post.likes || 0,
        status: post.status_name || post.status || '',
        author: post.author || 'Unknown',
      };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  // ⚠️ NOTE: These endpoints are not available in the backend API
  // Commenting out for now - may need to be implemented in backend
  
  // ดึงข้อมูล author details
  // getAuthorByName: async (name: string): Promise<Author> => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/authors`, {
  //       params: { name }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching author:', error);
  //     throw error;
  //   }
  // },

  // ดึงข้อมูล comments ของบทความ
  getComments: async (postId: number): Promise<Comment[]> => {
    // ⚠️ Endpoint not available in backend - returning empty array
    console.warn('Comments endpoint not available in backend API');
    return [];
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/assignments/${postId}/comments`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching comments:', error);
    //   return [];
    // }
  },

  // ส่ง comment ใหม่
  postComment: async (postId: number, content: string): Promise<Comment> => {
    // ⚠️ Endpoint not available in backend - throwing error
    throw new Error('Comments endpoint not available in backend API');
    // try {
    //   const response = await axios.post(`${API_BASE_URL}/assignments/${postId}/comments`, {
    //     content
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error posting comment:', error);
    //   throw error;
    // }
  },

  // ดึงข้อมูล notifications
  getNotifications: async (): Promise<Notification[]> => {
    // ⚠️ Endpoint not available in backend - returning empty array
    console.warn('Notifications endpoint not available in backend API');
    return [];
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/notifications`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching notifications:', error);
    //   return [];
    // }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    // ⚠️ Endpoint not available in backend
    console.warn('Mark notification as read endpoint not available in backend API');
    // try {
    //   await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
    // } catch (error) {
    //   console.error('Error marking notification as read:', error);
    //   throw error;
    // }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (): Promise<void> => {
    // ⚠️ Endpoint not available in backend
    console.warn('Mark all notifications as read endpoint not available in backend API');
    // try {
    //   await axios.patch(`${API_BASE_URL}/notifications/read-all`);
    // } catch (error) {
    //   console.error('Error marking all notifications as read:', error);
    //   throw error;
    // }
  },

  // สร้างบทความใหม่ (ใช้ /assignments/upload สำหรับ file upload)
  createPost: async (formData: FormData): Promise<BlogPost> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/assignments/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Backend returns { message: "Created post successfully", imageUrl: "..." }
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // สร้างบทความใหม่ด้วย JSON (POST /assignments) - สำหรับกรณีที่มี image URL แล้ว
  createPostWithUrl: async (data: {
    title: string;
    image: string;
    category_id: number;
    description: string;
    content: string;
    status_id: number;
  }): Promise<void> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/assignments`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Backend returns { message: "Created post successfully" }
      return response.data;
    } catch (error) {
      console.error('Error creating post with URL:', error);
      throw error;
    }
  },

  // อัพเดทบทความ
  updatePost: async (id: number, formData: FormData): Promise<BlogPost> => {
    try {
      // Backend PUT /assignments/:id accepts JSON only (not multipart)
      // Convert FormData to JSON format
      const jsonData: any = {};
      
      // Extract all form data fields
      formData.forEach((value, key) => {
        // Skip imageFile - backend PUT endpoint doesn't support file upload
        // For file upload, would need separate endpoint like POST /assignments/upload
        if (key !== 'imageFile') {
          jsonData[key] = value;
        }
      });
      
      // If imageFile exists, use the image URL from FormData (if provided) or keep existing
      // Note: Backend PUT /assignments/:id expects 'image' field (URL string), not file
      if (formData.has('image')) {
        jsonData.image = formData.get('image');
      }
      
      const response = await axios.put(`${API_BASE_URL}/assignments/${id}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Backend returns { message: "..." }
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // ลบบทความ
  deletePost: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/assignments/${id}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // ดึงข้อมูลบทความทั้งหมด (สำหรับ admin)
  getAllPosts: async (params?: { status?: string; category?: string; keyword?: string }): Promise<BlogPost[]> => {
    try {
      // Backend uses /assignments (returns all posts)
      const response = await axios.get<BackendPostResponse>(`${API_BASE_URL}/assignments`, {
        params,
      });
      // Backend returns { data: [...] }
      const backendPosts = response.data.data || [];
      // Map backend format to frontend format
      return backendPosts.map((post: any) => ({
        ...post,
        category: post.category_name || post.category || '',
        likes: post.likes_count || post.likes || 0,
        status: post.status_name || post.status || '',
        author: post.author || 'Unknown',
      }));
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  },

  // ⚠️ NOTE: Categories endpoints are not available in the backend API
  // These functions will fail - may need to be implemented in backend
  // For now, returning empty array or throwing error
  
  // ดึงข้อมูล categories
  getCategories: async (): Promise<{ id: number; name: string }[]> => {
    // ⚠️ Endpoint not available in backend
    console.warn('Categories endpoint not available in backend API');
    // Return empty array or throw error based on your needs
    return [];
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/categories`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching categories:', error);
    //   throw error;
    // }
  },

  // สร้าง category
  createCategory: async (name: string): Promise<{ id: number; name: string }> => {
    // ⚠️ Endpoint not available in backend
    throw new Error('Create category endpoint not available in backend API');
    // try {
    //   const response = await axios.post(`${API_BASE_URL}/categories`, { name });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error creating category:', error);
    //   throw error;
    // }
  },

  // อัพเดท category
  updateCategory: async (id: number, name: string): Promise<{ id: number; name: string }> => {
    // ⚠️ Endpoint not available in backend
    throw new Error('Update category endpoint not available in backend API');
    // try {
    //   const response = await axios.put(`${API_BASE_URL}/categories/${id}`, { name });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error updating category:', error);
    //   throw error;
    // }
  },

  // ลบ category
  deleteCategory: async (id: number): Promise<void> => {
    // ⚠️ Endpoint not available in backend
    throw new Error('Delete category endpoint not available in backend API');
    // try {
    //   await axios.delete(`${API_BASE_URL}/categories/${id}`);
    // } catch (error) {
    //   console.error('Error deleting category:', error);
    //   throw error;
    // }
  },

  // ดึงข้อมูล user profile
  getUserProfile: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      // Backend returns { user: {...} }
      return response.data.user || response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // อัพเดท user profile
  // ⚠️ NOTE: /auth/profile endpoint is not available in backend
  // User profile update might need to be implemented differently
  updateUserProfile: async (formData: FormData): Promise<any> => {
    // ⚠️ Endpoint not available in backend
    throw new Error('Update user profile endpoint not available in backend API');
    // For now, this endpoint doesn't exist - may need backend implementation
    // try {
    //   const response = await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error updating user profile:', error);
    //   throw error;
    // }
  },

  // GET /profiles - Get user profile (public endpoint)
  getProfiles: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profiles`);
      // Backend returns { data: { name: "john", age: 20 } }
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

  // GET /health - Health check endpoint
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      // Backend returns { status: "OK", message: "Server is running" }
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
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
