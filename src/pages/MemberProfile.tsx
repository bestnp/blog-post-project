import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { UserDuotone, RefreshLight } from "@/icon/IconsAll";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const MemberProfile: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"profile" | "reset-password">("profile");

  // Check URL parameter for tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'reset-password') {
      setActiveTab('reset-password');
    } else if (tab === 'profile') {
      setActiveTab('profile');
    }
  }, [location.search]);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Moodeng ja",
    username: "moodeng.cute",
    email: "moodeng.cute@gmail.com",
    avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleResetPassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return;
    }
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    console.log("Resetting password");
    setShowResetModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleUploadPicture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileData(prev => ({
            ...prev,
            avatar: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-brown-50">
      {/* NavBar */}
      <NavBar 
        notifications={[]}
        isAdmin={false}
      />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-[280px] flex-shrink-0">
            {/* Profile Info */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={profileData.avatar}
                alt={profileData.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-body-lg font-semibold text-brown-600">
                  {profileData.name}
                </h3>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${activeTab === "profile" 
                    ? "bg-white text-brown-600 font-semibold shadow-sm" 
                    : "text-brown-400 hover:bg-brown-100"
                  }
                `}
              >
                <UserDuotone className="w-5 h-5" />
                <span className="text-body-md">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("reset-password")}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${activeTab === "reset-password" 
                    ? "bg-white text-brown-600 font-semibold shadow-sm" 
                    : "text-brown-400 hover:bg-brown-100"
                  }
                `}
              >
                <RefreshLight className="w-5 h-5" />
                <span className="text-body-md">Reset password</span>
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div>
            {activeTab === "profile" ? (
              <div className="bg-brown-200 rounded-[16px] p-[40px] w-fit">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-4 mb-8 w-[480px]">
                  <img 
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-[80px] h-[80px] rounded-full object-cover border-2 border-brown-200"
                  />
                  <Button
                    onClick={handleUploadPicture}
                    variant="secondary"
                    size="default"
                  >
                    Upload profile picture
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 w-[480px]">
                  <Input
                    label="Name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    showSearchIcon={false}
                    showClearButton={false}
                  />

                  <Input
                    label="Username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter your username"
                    showSearchIcon={false}
                    showClearButton={false}
                  />

                  <Input
                    label="Email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    showSearchIcon={false}
                    showClearButton={false}
                    state="disabled"
                    disabled
                  />
                </div>

                {/* Save Button */}
                <div className="mt-8">
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
            ) : (
              <div className="bg-brown-200 rounded-[16px] p-[40px] w-fit">
                {/* Password Form Fields */}
                <div className="space-y-4 w-[480px]">
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

                {/* Reset Password Button */}
                <div className="mt-8">
                  <Button
                    onClick={handleResetPassword}
                    variant="default"
                    size="default"
                    className="!bg-brown-600 hover:!bg-brown-500"
                    disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  >
                    Reset password
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
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
            title={activeTab === "profile" ? "Saved profile" : "Password reset"}
            message={activeTab === "profile" ? "Your profile has been successfully updated" : "Your password has been successfully reset"}
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MemberProfile;

