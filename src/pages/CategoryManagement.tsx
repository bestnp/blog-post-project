import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Modal from "@/components/ui/Modal";
import { Alert } from "@/components/ui/Alert";
import { AddRoundLight, EditLight, TrashLight } from "@/icon/IconsAll";
import { blogApi } from "@/services/api";

interface Category {
  id: number;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
  }>({
    title: "",
    message: "",
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    setShowCreateModal(true);
    setCategoryName("");
  };

  const handleConfirmCreate = async () => {
    if (!categoryName.trim()) return;
    
    try {
      const newCategory = await blogApi.createCategory(categoryName.trim());
      setCategories([...categories, newCategory]);
      setShowCreateModal(false);
      setCategoryName("");
      
      setAlertConfig({
        title: "Create category",
        message: "Category has been successfully created",
      });
      setShowAlert(true);
      toast.success("Category created successfully");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error: any) {
      console.error("Error creating category:", error);
      toast.error(error.response?.data?.error || "Failed to create category");
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setCategoryName(category.name);
    setShowEditModal(true);
  };

  const handleConfirmEdit = async () => {
    if (!categoryToEdit || !categoryName.trim()) return;
    
    try {
      const updatedCategory = await blogApi.updateCategory(categoryToEdit.id, categoryName.trim());
      setCategories(
        categories.map((cat) =>
          cat.id === categoryToEdit.id ? updatedCategory : cat
        )
      );
      setShowEditModal(false);
      setCategoryToEdit(null);
      setCategoryName("");
      
      setAlertConfig({
        title: "Edit category",
        message: "Category has been successfully updated",
      });
      setShowAlert(true);
      toast.success("Category updated successfully");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.error || "Failed to update category");
    }
  };

  const handleDelete = (id: number) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete === null) return;
    
    try {
      await blogApi.deleteCategory(categoryToDelete);
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      toast.success("Category deleted successfully");
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.error || "Failed to delete category");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-h3 font-bold text-brown-600">Category management</h1>
            <Button
              onClick={handleCreateCategory}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500 flex items-center gap-2"
            >
              <AddRoundLight className="w-5 h-5" />
              Create category
            </Button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

          {/* Search */}
          <div className="mb-6">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              showSearchIcon={true}
              showClearButton={false}
            />
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-lg border border-brown-300 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brown-300">
                  <th className="text-left px-6 py-4">
                    <span className="text-body-lg font-semibold text-purple-600 border-b-2 border-purple-600 pb-1">
                      Category
                    </span>
                  </th>
                  <th className="w-[100px]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-brown-400">
                      Loading...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-brown-400">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-brown-200 hover:bg-brown-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-body-md text-brown-600">{category.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="p-2 hover:bg-brown-100 rounded-md transition-colors"
                            title="Edit"
                          >
                            <EditLight className="w-5 h-5 text-brown-400" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
      </div>

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant="success"
            title={alertConfig.title}
            message={alertConfig.message}
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}

      {/* Create Category Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCategoryName("");
        }}
        title="Create category"
        width="500px"
        backdropOpacity={40}
      >
        <div className="space-y-4">
          <Input
            label="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            showSearchIcon={false}
            showClearButton={false}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => {
                setShowCreateModal(false);
                setCategoryName("");
              }}
              variant="secondary"
              size="default"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmCreate}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500"
              disabled={!categoryName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCategoryToEdit(null);
          setCategoryName("");
        }}
        title="Edit category"
        width="500px"
        backdropOpacity={40}
      >
        <div className="space-y-4">
          <Input
            label="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            showSearchIcon={false}
            showClearButton={false}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => {
                setShowEditModal(false);
                setCategoryToEdit(null);
                setCategoryName("");
              }}
              variant="secondary"
              size="default"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmEdit}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500"
              disabled={!categoryName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete category"
        message="Do you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
        backdropOpacity={40}
      />
    </div>
  );
};

export default CategoryManagement;

