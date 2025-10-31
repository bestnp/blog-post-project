import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ImgBoxLight } from "@/icon/IconsAll";
import { blogApi } from "@/services/api";

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
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
  });

  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const handleInputChange = (field: keyof ArticleData, value: string) => {
    setArticleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // ตรวจสอบประเภทของไฟล์
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    // ตรวจสอบขนาดของไฟล์ (เช่น ขนาดไม่เกิน 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("The file is too large. Please upload an image smaller than 5MB.");
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

  const handleSave = async (statusId: number) => {
    // Validate required fields
    if (!articleData.title.trim()) {
      toast.error("Please enter article title");
      return;
    }
    if (!articleData.category) {
      toast.error("Please select a category");
      return;
    }
    if (statusId === 2 && !articleData.introduction.trim()) {
      toast.error("Please enter introduction for published articles");
      return;
    }
    if (statusId === 2 && !articleData.content.trim()) {
      toast.error("Please enter content for published articles");
      return;
    }

    // Validate image file
    if (!articleData.thumbnailImage) {
      toast.error("Please select an image file.");
      return;
    }

    setIsLoading(true);

    try {
      // สร้าง FormData สำหรับการส่งข้อมูลแบบ multipart/form-data
      const formData = new FormData();

      // เพิ่มข้อมูลทั้งหมดลงใน FormData
      formData.append("title", articleData.title);
      formData.append("category", articleData.category);
      formData.append("description", articleData.introduction || "");
      formData.append("content", articleData.content || "");
      formData.append("status_id", statusId.toString());
      formData.append("imageFile", articleData.thumbnailImage);

      // ส่งข้อมูลไปยัง Backend (JWT interceptor จะเพิ่ม Authorization header อัตโนมัติ)
      await blogApi.createPost(formData);

      // Show success message
      if (statusId === 1) {
        setAlertConfig({
          title: "Create article and saved as draft",
          message: "You can publish article later",
          variant: "success",
        });
      } else {
        setAlertConfig({
          title: "Article published successfully!",
          message: "Your article is now live and visible to readers",
          variant: "success",
        });
      }
      setShowAlert(true);
      toast.success(statusId === 1 ? "Article saved as draft!" : "Article published successfully!");

      // Navigate back to article management
      setTimeout(() => {
        navigate("/admin/articles");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating post:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to create post. Please try again.";
      toast.error(errorMessage);
      setAlertConfig({
        title: "Error",
        message: errorMessage,
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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

  return (
    <div className="flex min-h-screen bg-white">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[800px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-h3 font-bold text-brown-600">Create article</h1>
            <div className="flex gap-3">
              <Button
                onClick={handleSaveAsDraft}
                variant="secondary"
                size="default"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save as draft"}
              </Button>
              <Button
                onClick={handleSaveAndPublish}
                variant="default"
                size="default"
                className="!bg-brown-600 hover:!bg-brown-500"
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "Save and publish"}
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

          {/* Form */}
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
                    <p className="text-body-md text-brown-400 mb-4">
                      Upload thumbnail image
                    </p>
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
          </div>
        </div>
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
    </div>
  );
};

export default CreateArticle;

