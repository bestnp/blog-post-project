import React, { useState } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Alert } from "@/components/ui/Alert";
import { authApi } from "@/services/api";

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
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "success",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetPassword = () => {
    // Validate fields
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setAlertConfig({
        title: "Validation error",
        message: "Please fill in all fields",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setAlertConfig({
        title: "Validation error",
        message: "New password must be at least 6 characters",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertConfig({
        title: "Validation error",
        message: "New password and confirm password do not match",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmReset = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      // Use PUT /auth/reset-password for changing password when logged in
      await authApi.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Show success alert
      setAlertConfig({
        title: "Password reset",
        message: "Your password has been successfully reset",
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to reset password';
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

  return (
    <div className="min-h-screen bg-brown-100">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="ml-[260px] px-[60px]">
        {/* Header */}
        <div className="flex justify-between items-center py-[32px]">
          <h1 className="text-h3 text-brown-600 font-medium m-0">Reset password</h1>
          <Button
            onClick={handleResetPassword}
            variant="default"
            size="lg"
            className="!bg-brown-600 hover:!bg-brown-500"
            disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            {isLoading ? 'Resetting...' : 'Reset password'}
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-[40px] mx-[-60px]"></div>

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

export default ResetPassword;

