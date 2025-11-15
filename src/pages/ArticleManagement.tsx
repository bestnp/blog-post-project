import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { Alert } from "@/components/ui/Alert";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { AddRoundLight, EditLight, TrashLight, ExpandDownLight } from "@/icon/IconsAll";
import { blogApi, BlogPost } from "@/services/api";

interface Article {
  id: number;
  title: string;
  category: string;
  status: "Published" | "Draft" | "Archived";
}

const ArticleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      if (categoryFilter !== "all") {
        params.category = categoryFilter;
      }
      if (searchQuery.trim()) {
        params.keyword = searchQuery.trim();
      }

      const posts = await blogApi.getAllPosts(params);
      // Map BlogPost to Article format
      const mappedArticles: Article[] = posts.map((post: BlogPost) => {
        // Map status_id to status string
        let status: "Published" | "Draft" | "Archived" = "Published";
        if (post.status_id === 1) {
          status = "Draft";
        } else if (post.status_id === 2) {
          status = "Published";
        }
        
        // Use category_name from backend response
        const category = post.category_name || post.category || "General";
        
        return {
          id: post.id,
          title: post.title.length > 60 ? post.title.substring(0, 60) + "..." : post.title,
          category: category,
          status: post.status_name || post.status || status,
        };
      });
      setArticles(mappedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setAlertConfig({
        title: "Error",
        message: "Failed to load articles",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles from API
  useEffect(() => {
    fetchArticles();
  }, [statusFilter, categoryFilter, searchQuery]);

  const handleEdit = (id: number) => {
    navigate(`/admin/articles/create/${id}`);
  };

  const handleDelete = (id: number) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete !== null) {
      try {
        await blogApi.deletePost(articleToDelete);
        setAlertConfig({
          title: "Article deleted",
          message: "Article has been successfully deleted",
          variant: "success",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        setArticles(articles.filter(article => article.id !== articleToDelete));
        setShowDeleteModal(false);
        setArticleToDelete(null);
      } catch (error) {
        console.error("Error deleting article:", error);
        setAlertConfig({
          title: "Error",
          message: "Failed to delete article",
          variant: "error",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setArticleToDelete(null);
  };

  const handleCreateArticle = () => {
    navigate("/admin/articles/create");
  };

  const getStatusColor = (status: string) => {
    if (!status) return { color: "#43403B" };
    const normalizedStatus = status.toLowerCase().trim();
    
    // Check for published (case-insensitive, handles variations)
    if (normalizedStatus.includes("publish")) {
      return { color: "#12B279" }; // green-600 equivalent
    }
    // Check for draft
    if (normalizedStatus.includes("draft")) {
      return { color: "#F2B68C" }; // blue-600
    }
    // Check for archived
    if (normalizedStatus.includes("archived")) {
      return { color: "#6b7280" }; // gray-500
    }
    
    return { color: "#43403B" }; // brown-500 default
  };

  return (
    <div className="min-h-screen bg-brown-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-[260px] px-[60px]">
        {/* Header */}
        <div className="flex justify-between items-center py-[32px]">
          <h1 className="text-h3 text-brown-600 font-medium m-0">Article management</h1>
          <Button
            onClick={handleCreateArticle}
            variant="default"
            size="lg"
            className="!bg-brown-600 hover:!bg-brown-500"
          >
              <AddRoundLight className="w-[24px] h-[24px]" />
              Create article
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-[40px] mx-[-60px]"></div>

        {/* Filters */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex-1 max-w-[360px]">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              showSearchIcon={true}
              showClearButton={true}
              className="h-[48px] !rounded-lg text-body-lg font-medium"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[48px] w-[200px] pl-4 pr-8 rounded-lg border border-brown-300 bg-white text-brown-400 text-body-lg font-medium focus:outline-none focus:ring-2 focus:ring-brown-200 appearance-none cursor-pointer"
              >
                <option value="all">Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ExpandDownLight className="w-4 h-4 text-brown-400" />
              </div>
            </div>

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[48px] w-[200px] pl-4 pr-8 rounded-lg border border-brown-300 bg-white text-brown-400 text-body-lg font-medium focus:outline-none focus:ring-2 focus:ring-brown-200 appearance-none cursor-pointer"
              >
                <option value="all">Category</option>
                <option value="cat">Cat</option>
                <option value="general">General</option>
                <option value="inspiration">Inspiration</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ExpandDownLight className="w-4 h-4 text-brown-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-brown-50 rounded-lg border border-brown-300 overflow-hidden" style={{ borderRadius: '8px' }}>
          <table className="article-table w-full border-collapse border-spacing-0" style={{ borderSpacing: 0, borderCollapse: 'collapse' }}>
            <thead className="bg-brown-100" style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.035)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.03))' }}>
              <tr>
                <th className="text-left px-6 py-[12px] text-body-lg font-medium text-brown-400 border-b border-brown-300">
                  Article title
                </th>
                <th className="text-left px-6 py-[12px] text-body-lg font-medium text-brown-400 w-[200px] border-b border-brown-300">
                  Category
                </th>
                <th className="text-left px-6 py-[12px] text-body-lg font-medium text-brown-400 w-[150px] border-b border-brown-300">
                  Status
                </th>
                <th className="text-right px-6 py-[12px] text-body-lg font-medium text-brown-400 w-[100px] border-b border-brown-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}>
                  <td colSpan={4} className="px-[24px] py-[20px] text-center text-brown-400 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    Loading...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}>
                  <td colSpan={4} className="px-[24px] py-[20px] text-center text-brown-400 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    No articles found
                  </td>
                </tr>
              ) : (
                articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`
                    ${index % 2 === 0 ? 'bg-brown-100' : 'bg-brown-200'}
                    hover:bg-brown-100/50
                    m-0
                  `}
                  style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}
                >
                  <td className="px-[24px] py-[20px] m-0 text-body-lg font-medium text-brown-600 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    {article.title}
                  </td>
                  <td className="px-[24px] py-[20px] m-0 text-body-lg font-medium text-brown-600 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    {article.category}
                  </td>
                  <td className="px-[24px] py-[20px] m-0" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    <span className="flex items-center gap-1 text-body-lg font-medium leading-none" style={{ ...getStatusColor(article.status), lineHeight: '14px', fontSize: '14px' }}>
                      <span className="w-2 h-2 rounded-full bg-current" style={getStatusColor(article.status)}></span>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-[24px] py-[20px] m-0" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="p-2 hover:bg-brown-200 rounded-md transition-colors"
                        title="Edit"
                      >
                        <EditLight className="w-[24px] h-[24px] text-brown-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete"
                      >
                        <TrashLight className="w-[24px] h-[24px] text-brown-400 hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete article"
        message="Do you want to delete this article?"
        confirmText="Delete"
        cancelText="Cancel"
        backdropOpacity={40}
      />

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

export default ArticleManagement;



