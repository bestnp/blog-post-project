import React from 'react';
import CommentCard from '@/components/ui/CommentCard';

const ColorTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Color Test</h1>
        
        {/* Test Default Colors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Default Colors</h2>
          <CommentCard
            userProfile={{
              name: "Test User",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Test User's profile picture"
            }}
            comment={{
              id: "test-1",
              text: "This is a test comment to check default colors.",
              createdAt: "2024-09-12T18:30:00Z"
            }}
          />
        </div>

        {/* Test Custom Colors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
          <CommentCard
            userProfile={{
              name: "Custom User",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Custom User's profile picture"
            }}
            comment={{
              id: "test-2",
              text: "This is a test comment with custom colors.",
              createdAt: "2024-09-12T18:30:00Z"
            }}
            nameClassName="text-red-600"
            timestampClassName="text-blue-500"
            textClassName="text-green-600"
          />
        </div>

        {/* Test Tailwind Config Colors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tailwind Config Colors</h2>
          <CommentCard
            userProfile={{
              name: "Config User",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Config User's profile picture"
            }}
            comment={{
              id: "test-3",
              text: "This is a test comment using tailwind config colors.",
              createdAt: "2024-09-12T18:30:00Z"
            }}
            nameClassName="text-brown-600"
            timestampClassName="text-brown-400"
            textClassName="text-brown-500"
          />
        </div>

        {/* Test Font Sizes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Font Sizes</h2>
          <CommentCard
            userProfile={{
              name: "Size User",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              avatarAlt: "Size User's profile picture"
            }}
            comment={{
              id: "test-4",
              text: "This is a test comment to check font sizes.",
              createdAt: "2024-09-12T18:30:00Z"
            }}
            nameClassName="text-body-lg text-brown-600"
            timestampClassName="text-body-sm text-brown-400"
            textClassName="text-body-md text-brown-500"
          />
        </div>

        {/* Test Direct Tailwind Classes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Direct Tailwind Classes Test</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Test 1: Color only</p>
              <p className="text-brown-600">text-brown-600 (should be dark brown)</p>
              <p className="text-brown-400">text-brown-400 (should be medium brown)</p>
              <p className="text-brown-500">text-brown-500 (should be brown between 400 and 600)</p>
            </div>
            
            <div>
              <p className="font-semibold mb-2">Test 2: Font size only</p>
              <p className="text-body-lg">text-body-lg (should be 16px)</p>
              <p className="text-body-md">text-body-md (should be 14px)</p>
              <p className="text-body-sm">text-body-sm (should be 12px)</p>
            </div>
            
            <div>
              <p className="font-semibold mb-2">Test 3: Color + Font size (color first)</p>
              <p className="text-brown-600 text-body-md">text-brown-600 text-body-md</p>
              <p className="text-brown-400 text-body-sm">text-brown-400 text-body-sm</p>
              <p className="text-brown-500 text-body-md">text-brown-500 text-body-md</p>
            </div>
            
            <div>
              <p className="font-semibold mb-2">Test 4: Font size + Color (size first)</p>
              <p className="text-body-md text-brown-600">text-body-md text-brown-600</p>
              <p className="text-body-sm text-brown-400">text-body-sm text-brown-400</p>
              <p className="text-body-md text-brown-500">text-body-md text-brown-500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTest;
