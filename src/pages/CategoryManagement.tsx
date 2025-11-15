import React, { useState, useEffect } from "react";
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
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
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
      setAlertConfig({
        title: "Error",
        message: "Failed to load categories",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
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
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error("Error creating category:", error);
      setAlertConfig({
        title: "Error",
        message: error.response?.data?.error || "Failed to create category",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
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
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error("Error updating category:", error);
      setAlertConfig({
        title: "Error",
        message: error.response?.data?.error || "Failed to update category",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
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
      setAlertConfig({
        title: "Delete category",
        message: "Category has been successfully deleted",
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error("Error deleting category:", error);
      setAlertConfig({
        title: "Error",
        message: error.response?.data?.error || "Failed to delete category",
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
      <div className="ml-[260px] px-[60px]">
        {/* Header */}
        <div className="flex justify-between items-center py-[32px]">
          <h1 className="text-h3 text-brown-600 font-medium m-0">Category management</h1>
          <Button
            onClick={handleCreateCategory}
            variant="default"
            size="lg"
            className="!bg-brown-600 hover:!bg-brown-500"
          >
            <AddRoundLight className="w-[24px] h-[24px]" />
            Create category
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-[40px] mx-[-60px]"></div>

          {/* Search */}
          <div className="mb-6">
            <div className="flex-1 max-w-[360px]">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                showSearchIcon={true}
                showClearButton={false}
                className="h-[48px] !rounded-lg text-body-lg font-medium"
              />
            </div>
          </div>

        {/* Categories Table */}
        <div className="bg-brown-50 rounded-lg border border-brown-300 overflow-hidden" style={{ borderRadius: '8px' }}>
          <table className="article-table w-full border-collapse border-spacing-0" style={{ borderSpacing: 0, borderCollapse: 'collapse' }}>
            <thead className="bg-brown-100" style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.035)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.03))' }}>
              <tr>
                <th className="text-left px-6 py-[12px] text-body-lg font-medium text-brown-400 border-b border-brown-300">
                  Category
                </th>
                <th className="text-right px-6 py-[12px] text-body-lg font-medium text-brown-400 w-[100px] border-b border-brown-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}>
                  <td colSpan={2} className="px-[24px] py-[20px] text-center text-brown-400 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    Loading...
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}>
                  <td colSpan={2} className="px-[24px] py-[20px] text-center text-brown-400 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                    No categories found
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className={`
                      ${index % 2 === 0 ? 'bg-brown-100' : 'bg-brown-200'}
                      hover:bg-brown-100/50
                      m-0
                    `}
                    style={{ margin: 0, marginBottom: 0, padding: 0, lineHeight: 0 }}
                  >
                    <td className="px-[24px] py-[20px] m-0 text-body-lg font-medium text-brown-600 leading-none" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                      {category.name}
                    </td>
                    <td className="px-[24px] py-[20px] m-0" style={{ margin: 0, marginBottom: 0, lineHeight: '14px', verticalAlign: 'middle', fontSize: '14px' }}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 hover:bg-brown-200 rounded-md transition-colors"
                          title="Edit"
                        >
                          <EditLight className="w-[24px] h-[24px] text-brown-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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

