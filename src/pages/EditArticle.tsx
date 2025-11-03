import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { ImgBoxLight, TrashLight } from "@/icon/IconsAll";
import { blogApi } from "@/services/api";

interface ArticleData {
  thumbnailImage: File | null;
  category: string;
  authorName: string;
  title: string;
  introduction: string;
  content: string;
}

const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Category mapping (hardcoded since backend doesn't have categories endpoint)
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

  // Load article data
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

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArticleData((prev) => ({
        ...prev,
        thumbnailImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (statusId: number) => {
    if (!id) return;
    
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

    setIsSaving(true);

    try {
      // Get category_id from category name
      const categoryId = categoryMapping[articleData.category] || 1;
      
      const formData = new FormData();
      formData.append("title", articleData.title);
      formData.append("category_id", categoryId.toString()); // Backend expects category_id
      formData.append("description", articleData.introduction || "");
      formData.append("content", articleData.content || "");
      formData.append("status_id", statusId.toString());

      // Backend PUT /assignments/:id expects image as URL string, not file
      // If there's a new image file, we'd need to upload it first or use upload endpoint
      // For now, send the existing image URL if available
      if (thumbnailPreview && !thumbnailPreview.startsWith('blob:')) {
        // Only send if it's not a blob URL (means it's an existing URL)
        formData.append("image", thumbnailPreview);
      }
      
      // TODO: Handle new image upload - might need separate upload endpoint
      // For now, new image uploads in edit mode are not fully supported
      // (Backend PUT endpoint doesn't accept multipart/form-data)

      await blogApi.updatePost(parseInt(id), formData);

      setAlertConfig({
        title: statusId === 1 ? "Article saved as draft" : "Article updated successfully!",
        message: statusId === 1 ? "You can publish article later" : "Your changes have been saved",
        variant: "success",
      });
      setShowAlert(true);

      setTimeout(() => {
        navigate("/admin/articles");
      }, 2000);
    } catch (error: any) {
      console.error("Error updating article:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to update article. Please try again.";
      setAlertConfig({
        title: "Error",
        message: errorMessage,
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setIsSaving(false);
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
    <div className="flex min-h-screen bg-white">
      <AdminSidebar userName="Admin" />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[800px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-h3 font-bold text-brown-600">Edit article</h1>
            <div className="flex gap-3">
              <Button 
                onClick={handleSaveAsDraft} 
                variant="secondary" 
                size="default"
                disabled={isSaving || loading}
              >
                {isSaving ? "Saving..." : "Save as draft"}
              </Button>
              <Button
                onClick={handleSaveAndPublish}
                variant="default"
                size="default"
                className="!bg-brown-600 hover:!bg-brown-500"
                disabled={isSaving || loading}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

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
              <label className="block text-body-md font-medium text-brown-600 mb-2">
                Thumbnail Image
              </label>
              <div className="relative">
                {thumbnailPreview ? (
                  <div className="relative w-full h-[300px] bg-brown-100 rounded-lg border border-brown-300 overflow-hidden">
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
                  <div className="w-full h-[300px] bg-brown-100 rounded-lg border border-brown-300 flex flex-col items-center justify-center">
                    <ImgBoxLight className="w-16 h-16 text-brown-400 mb-4" />
                    <p className="text-body-md text-brown-400 mb-4">Upload thumbnail image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
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
              <label className="block text-body-md font-medium text-brown-600 mb-2">
                Category
              </label>
              <select
                value={articleData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full h-[48px] px-4 rounded-lg border border-brown-300 bg-white text-brown-600 text-body-md focus:ring-brown-200 focus:ring-2 focus:border-brown-300 appearance-none cursor-pointer"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Author name */}
            <Input
              label="Author name"
              value={articleData.authorName}
              onChange={(e) => handleInputChange("authorName", e.target.value)}
              placeholder="Thompson P."
              state="disabled"
              disabled
              showSearchIcon={false}
              showClearButton={false}
            />

            {/* Title */}
            <Input
              label="Title"
              value={articleData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Article title"
              showSearchIcon={false}
              showClearButton={false}
            />

            {/* Introduction */}
            <div>
              <label className="block text-body-md font-medium text-brown-600 mb-2">
                Introduction (max 120 letters)
              </label>
              <textarea
                value={articleData.introduction}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 120);
                  handleInputChange("introduction", value);
                }}
                placeholder="Introduction"
                maxLength={120}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 text-body-md focus:ring-brown-200 focus:ring-2 focus:border-brown-300 resize-none"
              />
              <div className="text-right text-body-sm text-brown-400 mt-1">
                {articleData.introduction.length}/120
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-body-md font-medium text-brown-600 mb-2">
                Content
              </label>
              <textarea
                value={articleData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Content"
                rows={15}
                className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 text-body-md focus:ring-brown-200 focus:ring-2 focus:border-brown-300 resize-none"
              />
            </div>

            {/* Delete Article Button */}
            <div className="pt-4 border-t border-brown-300">
              <button
                onClick={handleDeleteArticle}
                className="flex items-center gap-2 text-body-md text-brown-400 hover:text-red-500 transition-colors"
              >
                <TrashLight className="w-5 h-5" />
                <span>Delete article</span>
              </button>
            </div>
          </div>
          )}
        </div>
      </div>

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

export default EditArticle;

