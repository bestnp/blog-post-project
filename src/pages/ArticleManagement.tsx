import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { AddRoundLight, EditLight, TrashLight } from "@/icon/IconsAll";
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
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles from API
  useEffect(() => {
    fetchArticles();
  }, [statusFilter, categoryFilter, searchQuery]);

  const handleEdit = (id: number) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete !== null) {
      try {
        await blogApi.deletePost(articleToDelete);
        toast.success("Article deleted successfully");
        setArticles(articles.filter(article => article.id !== articleToDelete));
        setShowDeleteModal(false);
        setArticleToDelete(null);
      } catch (error) {
        console.error("Error deleting article:", error);
        toast.error("Failed to delete article");
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
    switch (status) {
      case "Published":
        return "text-green-600";
      case "Draft":
        return "text-orange-500";
      case "Archived":
        return "text-gray-500";
      default:
        return "text-brown-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-h3 font-bold text-brown-600">Article management</h1>
          <Button
            onClick={handleCreateArticle}
            variant="default"
            size="default"
            className="!bg-brown-600 hover:!bg-brown-500"
          >
            <AddRoundLight className="w-5 h-5" />
            Create article
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 max-w-[300px]">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              showSearchIcon={true}
              showClearButton={true}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 rounded-md border border-brown-300 bg-white text-brown-600 text-body-md focus:outline-none focus:ring-2 focus:ring-brown-200"
          >
            <option value="all">Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-4 rounded-md border border-brown-300 bg-white text-brown-600 text-body-md focus:outline-none focus:ring-2 focus:ring-brown-200"
          >
            <option value="all">Category</option>
            <option value="cat">Cat</option>
            <option value="general">General</option>
            <option value="inspiration">Inspiration</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-brown-50 rounded-lg border border-brown-300 overflow-hidden">
          <table className="w-full">
            <thead className="bg-brown-100">
              <tr>
                <th className="text-left px-6 py-4 text-body-md font-medium text-brown-500">
                  Article title
                </th>
                <th className="text-left px-6 py-4 text-body-md font-medium text-brown-500 w-[200px]">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-body-md font-medium text-brown-500 w-[150px]">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-body-md font-medium text-brown-500 w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brown-400">
                    Loading...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brown-400">
                    No articles found
                  </td>
                </tr>
              ) : (
                articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`
                    border-t border-brown-300 hover:bg-brown-100/50 transition-colors
                  `}
                >
                  <td className="px-6 py-4 text-body-md text-brown-600">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-body-md text-brown-600">
                    {article.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-body-md font-medium flex items-center gap-1 ${getStatusColor(article.status)}`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="p-2 hover:bg-brown-200 rounded-md transition-colors"
                        title="Edit"
                      >
                        <EditLight className="w-5 h-5 text-brown-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete"
                      >
                        <TrashLight className="w-5 h-5 text-brown-400 hover:text-red-500" />
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
    </div>
  );
};

export default ArticleManagement;



