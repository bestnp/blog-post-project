import React, { useState } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Alert } from "@/components/ui/Alert";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetPassword = () => {
    // Validate fields
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // TODO: Show error
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmReset = () => {
    console.log("Resetting password:", passwordData);
    setShowConfirmModal(false);
    
    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Show success alert
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
            <h1 className="text-h3 font-bold text-brown-600">Reset password</h1>
            <Button
              onClick={handleResetPassword}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500 min-w-[160px]"
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              Reset password
            </Button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

          {/* Content */}
          <div>
            {/* Form Fields */}
            <div className="space-y-6 max-w-[600px]">
              <Input
                label="Current password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                placeholder="Current password"
                showSearchIcon={false}
                showClearButton={false}
              />

              <Input
                label="New password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                placeholder="New password"
                showSearchIcon={false}
                showClearButton={false}
              />

              <Input
                label="Confirm new password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
                showSearchIcon={false}
                showClearButton={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Reset Password Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmReset}
        title="Reset password"
        message="Do you want to reset your password?"
        confirmText="Reset"
        cancelText="Cancel"
        backdropOpacity={40}
      />

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant="success"
            title="Password reset"
            message="Your password has been successfully reset"
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

