import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { ImgBoxLight, TrashLight } from "@/icon/IconsAll";

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

  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // Load article data
  useEffect(() => {
    // TODO: Fetch article data from API using id
    // Mock data for now
    const mockArticle = {
      thumbnailImage: null,
      category: "Cat",
      authorName: "Thompson P.",
      title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      introduction:
        "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let's dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating.",
      content: `1. Independent Yet Affectionate

One of the most remarkable traits of cats is their balance between independence and affection. Unlike dogs, who are often eager for constant attention, cats enjoy their alone time. They can spend hours grooming themselves, exploring the house, or napping in quiet corners. However, when they do want to seek it out with a soft purr, a gentle nuzzle, or by curling up on your lap.

This quality makes cats appealing to many people who appreciate the fact that their feline companions are low-maintenance but still loving. It's like having a roommate who enjoys your company but doesn't demand too much of your time!

2. Playful Personalities

Cats are naturally curious and playful. From kittens to adults, they enjoy engaging with toys, climbing furniture, or chasing after imaginary prey. Their play often mimics hunting behavior, which is a nod to their wild ancestors. Whether they're pouncing on a feather toy or darting across a room, their agility and precision are less lethal. It's important for their mental health too.

This playfulness also serves as mental stimulation for cats. Providing toys and opportunities to climb or explore helps them stay active and prevents boredom, which is important for indoor cats.

3. Communication Through Body Language

Cats are master communicators, though they do so in subtle ways. Understanding a cat's body language can deepen the bond between you and your pet. Here are some common signals:

Purring: Usually a sign of contentment, though cats may also purr when anxious or in pain.`,
    };
    
    setArticleData(mockArticle);
    // Mock thumbnail preview (in real app, you'd fetch the image URL)
    setThumbnailPreview("https://images.unsplash.com/photo-1574158622682-e40e69881006");
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

  const handleSaveAsDraft = () => {
    if (!articleData.title.trim()) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please enter article title",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    if (!articleData.category) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please select a category",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    console.log("Saving as draft:", articleData);
    setAlertConfig({
      title: "Article saved as draft",
      message: "You can publish article later",
      variant: "success",
    });
    setShowAlert(true);

    setTimeout(() => {
      navigate("/admin/articles");
    }, 2000);
  };

  const handleSave = () => {
    if (!articleData.title.trim()) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please enter article title",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    if (!articleData.category) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please select a category",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    if (!articleData.introduction.trim()) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please enter introduction",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    if (!articleData.content.trim()) {
      setAlertConfig({
        title: "Validation Error",
        message: "Please enter content",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    console.log("Saving article:", articleData);
    setAlertConfig({
      title: "Article updated successfully!",
      message: "Your changes have been saved",
      variant: "success",
    });
    setShowAlert(true);

    setTimeout(() => {
      navigate("/admin/articles");
    }, 2000);
  };

  const handleDeleteArticle = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting article:", id);
    // TODO: API call to delete article
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
              <Button onClick={handleSaveAsDraft} variant="secondary" size="default">
                Save as draft
              </Button>
              <Button
                onClick={handleSave}
                variant="default"
                size="default"
                className="!bg-brown-600 hover:!bg-brown-500"
              >
                Save
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

