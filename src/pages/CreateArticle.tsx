import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ImgBoxLight, ExpandDownLight, TrashLight } from "@/icon/IconsAll";
import TextAreaInput from "@/components/ui/TextAreaInput";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { blogApi } from "@/services/api";

const API_BASE_URL = 'https://blog-post-project-api-five.vercel.app';

interface ArticleData {
  thumbnailImage: File | null;
  category: string;
  authorName: string;
  title: string;
  introduction: string;
  content: string;
}

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [articleData, setArticleData] = useState<ArticleData>({
    thumbnailImage: null,
    category: "",
    authorName: "Thompson P.",
    title: "",
    introduction: "",
    content: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
  });

  // Category mapping (hardcoded since backend doesn't have categories endpoint)
  // TODO: Implement categories endpoint in backend or use database query
  const categoryMapping: { [key: string]: number } = {
    "Cat": 1,
    "General": 2,
    "Inspiration": 3,
    "Highlight": 4,
  };
  
  const reverseCategoryMapping: { [key: number]: string } = {
    1: "Cat",
    2: "General",
    3: "Inspiration",
    4: "Highlight",
  };
  
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // Load article data if editing
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const post = await blogApi.getPostById(parseInt(id));
        
        // Map category_id back to category name for display
        const categoryName = post.category_name || post.category || reverseCategoryMapping[post.category_id || 1] || "General";
        
        setArticleData({
          thumbnailImage: null,
          category: categoryName,
          authorName: post.author || "Thompson P.",
          title: post.title,
          introduction: post.description || "",
          content: post.content || "",
        });
        
        if (post.image) {
          setThumbnailPreview(post.image);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setAlertConfig({
          title: "Error",
          message: "Failed to load article",
          variant: "error",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleInputChange = (field: keyof ArticleData, value: string) => {
    setArticleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเลือกไฟล์
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // ตรวจสอบประเภทของไฟล์
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    // ตรวจสอบขนาดของไฟล์ (เช่น ขนาดไม่เกิน 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    // เก็บข้อมูลไฟล์
    setArticleData((prev) => ({
      ...prev,
      thumbnailImage: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูลโพสต์
  const handleSave = async (statusId: number) => {
    // Validate required fields
    if (!articleData.title.trim()) {
      setAlertConfig({
        title: "Validation error",
        message: "Please enter article title",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    if (!articleData.category) {
      setAlertConfig({
        title: "Validation error",
        message: "Please select a category",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    if (statusId === 2 && !articleData.introduction.trim()) {
      setAlertConfig({
        title: "Validation error",
        message: "Please enter introduction for published articles",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    if (statusId === 2 && !articleData.content.trim()) {
      setAlertConfig({
        title: "Validation error",
        message: "Please enter content for published articles",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    // Validate image file (only required for new articles)
    if (!id && !articleData.thumbnailImage) {
      setAlertConfig({
        title: "Validation error",
        message: "Please select an image file",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    setIsLoading(true);

    try {
      // Get category_id from category name
      const categoryId = categoryMapping[articleData.category] || 1;

      if (id) {
        // Update existing article
        const formData = new FormData();
        formData.append("title", articleData.title);
        formData.append("category_id", categoryId.toString());
        formData.append("description", articleData.introduction || "");
        formData.append("content", articleData.content || "");
        formData.append("status_id", statusId.toString());

        // If there's a new image file, append it
        if (articleData.thumbnailImage) {
          formData.append("imageFile", articleData.thumbnailImage);
        } else if (thumbnailPreview && !thumbnailPreview.startsWith('blob:')) {
          // Use existing image URL if no new image is uploaded
          formData.append("image", thumbnailPreview);
        }

        await blogApi.updatePost(parseInt(id), formData);

        setAlertConfig({
          title: statusId === 1 ? "Article saved as draft" : "Article updated successfully!",
          message: statusId === 1 ? "You can publish article later" : "Your changes have been saved",
          variant: "success",
        });
      } else {
        // Create new article
        const formData = new FormData();
        formData.append("title", articleData.title);
        formData.append("category_id", categoryId.toString());
        formData.append("description", articleData.introduction || "");
        formData.append("content", articleData.content || "");
        formData.append("status_id", statusId.toString());
        formData.append("imageFile", articleData.thumbnailImage!);

        const token = localStorage.getItem("token");
        await axios.post(
          `${API_BASE_URL}/assignments/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        setAlertConfig({
          title: statusId === 1 ? "Create article and saved as draft" : "Article published successfully!",
          message: statusId === 1 ? "You can publish article later" : "Your article is now live and visible to readers",
          variant: "success",
        });
      }

      setShowAlert(true);

      // Navigate back to article management
      setTimeout(() => {
        navigate("/admin/articles");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving post:", error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to save post. Please try again.";
      setAlertConfig({
        title: "Error",
        message: errorMessage,
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAsDraft = () => {
    handleSave(1); // status_id = 1 for draft
  };

  const handleSaveAndPublish = () => {
    handleSave(2); // status_id = 2 for published
  };

  const handleDeleteArticle = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    
    try {
      await blogApi.deletePost(parseInt(id));
      setShowDeleteModal(false);
      setAlertConfig({
        title: "Article deleted",
        message: "Article has been permanently deleted",
        variant: "success",
      });
      setShowAlert(true);

      setTimeout(() => {
        navigate("/admin/articles");
      }, 2000);
    } catch (error: any) {
      console.error("Error deleting article:", error);
      setAlertConfig({
        title: "Error",
        message: "Failed to delete article",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-brown-100">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="ml-[260px] px-[60px] pb-[120px]">
        {/* Header */}
        <div className="flex justify-between items-center py-[32px]">
          <h1 className="text-h3 text-brown-600 font-medium m-0">{id ? "Edit article" : "Create article"}</h1>
          <div className="flex gap-3">
            <Button
              onClick={handleSaveAsDraft}
              variant="secondary"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save as draft"}
            </Button>
            <Button
              onClick={handleSaveAndPublish}
              variant="default"
              size="lg"
              className="!bg-brown-600 hover:!bg-brown-500"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Save and publish"}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-[40px] mx-[-60px]"></div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brown-600"></div>
              <p className="text-brown-600 text-body-lg">Loading article...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Thumbnail Image */}
            <div>
              <label className="block text-body-lg font-regular text-brown-400 mb-2">
                Thumbnail Image
              </label>
              <div className="relative">
                {thumbnailPreview ? (
                  <div 
                    className="relative w-full h-[300px] bg-brown-100 rounded-lg border-2 border-dashed border-brown-300 overflow-hidden"
                  >
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setThumbnailPreview(null);
                        setArticleData((prev) => ({
                          ...prev,
                          thumbnailImage: null,
                        }));
                      }}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white px-3 py-1 rounded text-body-sm text-brown-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div 
                    className="w-full h-[300px] bg-brown-200 rounded-lg border-2 border-dashed border-brown-300 flex flex-col items-center justify-center"
                  >
                    <ImgBoxLight className="w-16 h-16 text-brown-400 mb-4" />
                    <p className="text-body-md text-brown-400 mb-4">
                      Upload thumbnail image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {!thumbnailPreview && (
                <div className="mt-3 flex justify-end">
                  <Button
                    onClick={() => document.querySelector('input[type="file"]')?.click()}
                    variant="secondary"
                    size="default"
                  >
                    Upload thumbnail image
                  </Button>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-body-lg font-regular text-brown-400 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={articleData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full h-[48px] pl-4 pr-8 rounded-lg border border-brown-300 bg-white text-brown-400 text-body-lg focus:ring-brown-200 focus:ring-2 focus:border-brown-300 appearance-none cursor-pointer"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ExpandDownLight className="w-4 h-4 text-brown-400" />
                </div>
              </div>
            </div>

            {/* Author name */}
            <div className="opacity-40">
              <label className="block text-body-lg font-regular text-brown-400 mb-1">
                Author name
              </label>
              <Input
                value={articleData.authorName}
                onChange={(e) => handleInputChange("authorName", e.target.value)}
                placeholder="Thompson P."
                state="disabled"
                disabled
                showSearchIcon={false}
                showClearButton={false}
                containerClassName="space-y-0"
                className="h-[48px] pl-4 pr-4"
              />
            </div>

            {/* Title */}
            <div>
            <label className="block text-body-lg font-regular text-brown-400 mb-1">
            Title
              </label>
            <Input
              value={articleData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Article title"
              showSearchIcon={false}
              showClearButton={false}
              containerClassName="space-y-0"
              className="h-[48px] pl-4 pr-4"
            />
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-body-lg font-regular text-brown-400 mb-1">
                Introduction (max 120 letters)
              </label>
              <TextAreaInput
                value={articleData.introduction}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 120);
                  handleInputChange("introduction", value);
                }}
                placeholder="Introduction"
                maxLength={120}
                rows={4}
                state="default"
                containerClassName="space-y-0"
              />
              <div className="text-right text-body-sm text-brown-400 mt-1">
                {articleData.introduction.length}/120
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-body-lg font-regular text-brown-400 mb-1">
                Content
              </label>
              <TextAreaInput
                value={articleData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Content"
                rows={15}
                state="default"
                containerClassName="space-y-0"
              />
            </div>

            {/* Delete Article Button - Only show when editing */}
            {id && (
              <div>
                <button
                  onClick={handleDeleteArticle}
                  className="flex items-center gap-2 text-body-md text-brown-400 hover:text-red-500 transition-colors"
                >
                  <TrashLight className="w-5 h-5" />
                  <span>Delete article</span>
                </button>
              </div>
            )}
          </div>
          )}
      </div>

      {/* Alert Notification - Fixed at bottom right */}
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete article"
        message="Do you want to delete this article?"
        confirmText="Delete"
        cancelText="Cancel"
        backdropOpacity={40}
      />
    </div>
  );
};

export default CreateArticle;

