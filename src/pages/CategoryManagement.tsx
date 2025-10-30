import React, { useState } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Modal from "@/components/ui/Modal";
import { Alert } from "@/components/ui/Alert";
import { AddRoundLight, EditLight, TrashLight } from "@/icon/IconsAll";

interface Category {
  id: number;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Cat" },
    { id: 2, name: "General" },
    { id: 3, name: "Inspiration" },
  ]);

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

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    setShowCreateModal(true);
    setCategoryName("");
  };

  const handleConfirmCreate = () => {
    if (categoryName.trim()) {
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: categoryName.trim(),
      };
      setCategories([...categories, newCategory]);
      setShowCreateModal(false);
      setCategoryName("");
      
      // Show success alert
      setAlertConfig({
        title: "Create category",
        message: "Category has been successfully created",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setCategoryName(category.name);
    setShowEditModal(true);
  };

  const handleConfirmEdit = () => {
    if (categoryToEdit && categoryName.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === categoryToEdit.id ? { ...cat, name: categoryName.trim() } : cat
        )
      );
      setShowEditModal(false);
      setCategoryToEdit(null);
      setCategoryName("");
      
      // Show success alert
      setAlertConfig({
        title: "Edit category",
        message: "Category has been successfully updated",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDelete = (id: number) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete !== null) {
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
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
                {filteredCategories.length === 0 ? (
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

