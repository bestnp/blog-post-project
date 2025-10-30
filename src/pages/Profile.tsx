import React, { useState } from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Thompson P.",
    username: "thompson",
    email: "thompson.p@gmail.com",
    bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.\n\nWhen I'm not writing, I spendz time volunteering at my local animal shelter, helping cats find loving homes.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  });

  const [showAlert, setShowAlert] = useState(false);
  const MAX_BIO_LENGTH = 120;

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

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
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
    <div className="flex min-h-screen bg-white">
      {/* Admin Sidebar */}
      <AdminSidebar userName="Admin" />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-h3 font-bold text-brown-600">Profile</h1>
            <Button
              onClick={handleSave}
              variant="default"
              size="default"
              className="!bg-brown-600 hover:!bg-brown-500 min-w-[120px]"
            >
              Save
            </Button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brown-300 mb-6 -mx-8"></div>

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
                <TextArea
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
      </div>

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant="success"
            title="Saved profile"
            message="Your profile has been successfully updated"
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

