import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import TextAreaInput from "@/components/ui/TextAreaInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/context/authentication";
import { blogApi } from "@/services/api";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const { state, fetchUser } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    username: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
  const [isSaving, setIsSaving] = useState(false);
  const MAX_BIO_LENGTH = 120;

  // Load profile data
  useEffect(() => {
    if (state.user) {
      setProfileData({
        name: state.user.name || "",
        username: state.user.username || "",
        email: state.user.email || "",
        bio: state.user.bio || "",
        avatar: state.user.avatar || "",
      });
      setLoading(false);
    }
  }, [state.user]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    // Limit bio to MAX_BIO_LENGTH characters
    if (field === "bio" && value.length > MAX_BIO_LENGTH) {
      return;
    }
    
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Update avatar first if file is selected (separate API call)
      if (avatarFile) {
        try {
          await blogApi.updateUserAvatar(avatarFile);
          console.log('✅ Avatar uploaded successfully');
        } catch (avatarError: any) {
          console.error('❌ Avatar upload error:', avatarError);
          const avatarErrorMessage = avatarError.response?.data?.error || avatarError.response?.data?.message || avatarError.message || "Failed to upload avatar";
          throw new Error(avatarErrorMessage);
        }
      }

      // Update profile data (name, username) - separate API call
      try {
        await blogApi.updateUserProfile({
          name: profileData.name,
          username: profileData.username,
        });
        console.log('✅ Profile updated successfully');
      } catch (profileError: any) {
        console.error('❌ Profile update error:', profileError);
        // If avatar was uploaded successfully but profile update failed, still show error
        const profileErrorMessage = profileError.response?.data?.error || profileError.response?.data?.message || profileError.message || "Failed to update profile";
        throw new Error(profileErrorMessage);
      }

      // Refresh user data
      await fetchUser();
      
      setAlertConfig({
        title: "Saved profile",
        message: "Your profile has been successfully updated",
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      const errorMessage = error.message || error.response?.data?.error || error.response?.data?.message || "Failed to update profile";
      setAlertConfig({
        title: "Error",
        message: errorMessage,
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadPicture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          setAlertConfig({
            title: "Invalid file type",
            message: "Please upload a valid image file (JPEG, PNG, GIF, WebP).",
            variant: "error",
          });
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          setAlertConfig({
            title: "File too large",
            message: "The file is too large. Please upload an image smaller than 5MB.",
            variant: "error",
          });
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          return;
        }

        setAvatarFile(file);
        
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
    <div className="min-h-screen bg-brown-100">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="ml-[260px] px-[60px]">
        {/* Header */}
        <div className="flex justify-between items-center py-[32px]">
          <h1 className="text-h3 text-brown-600 font-medium m-0">Profile</h1>
          <Button
            onClick={handleSave}
            variant="default"
            size="lg"
            className="!bg-brown-600 hover:!bg-brown-500"
            disabled={isSaving || loading}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 mb-[40px] mx-[-60px]"></div>

        {/* Content */}
        <div>
          {/* Profile Picture Section */}
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={profileData.avatar}
              alt={profileData.name}
              className="w-[60px] h-[60px] rounded-full object-cover border-2 border-brown-200"
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
          <div className="space-y-6 max-w-[600px]">
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
              />

              <div>
                <TextAreaInput
                  label={`Bio (max ${MAX_BIO_LENGTH} letters)`}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-[200px]"
                />
                <div className="mt-1 text-right text-body-sm text-brown-400">
                  {profileData.bio.length}/{MAX_BIO_LENGTH}
                </div>
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
    </div>
  );
};

export default Profile;

