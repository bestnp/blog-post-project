import React, { useState } from 'react';
import { Tab, TabGroup } from '@/components/ui/Tab';

const TabTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Tab Component Test</h1>
        
        {/* Basic Tab Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Basic Tab Example</h2>
          <TabGroup>
            <Tab 
              isActive={activeTab === 'tab1'} 
              value="tab1"
              onClick={() => handleTabChange('tab1')}
            >
              Tab 1
            </Tab>
            <Tab 
              isActive={activeTab === 'tab2'} 
              value="tab2"
              onClick={() => handleTabChange('tab2')}
            >
              Tab 2
            </Tab>
            <Tab 
              isActive={activeTab === 'tab3'} 
              value="tab3"
              onClick={() => handleTabChange('tab3')}
            >
              Tab 3
            </Tab>
          </TabGroup>
          <div className="mt-4 p-4 bg-brown-100 rounded-lg">
            <p className="text-brown-600">
              Active tab: <strong>{activeTab}</strong>
            </p>
          </div>
        </section>

        {/* Static Tab States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Tab States</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Inactive State</h3>
              <TabGroup>
                <Tab>Inactive Tab</Tab>
                <Tab>Another Inactive Tab</Tab>
              </TabGroup>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Active State</h3>
              <TabGroup>
                <Tab isActive>Active Tab</Tab>
                <Tab>Inactive Tab</Tab>
              </TabGroup>
            </div>
          </div>
        </section>

        {/* Different Content Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Tab with Content</h2>
          <TabGroup>
            <Tab 
              isActive={activeTab === 'home'} 
              value="home"
              onClick={() => handleTabChange('home')}
            >
              Home
            </Tab>
            <Tab 
              isActive={activeTab === 'about'} 
              value="about"
              onClick={() => handleTabChange('about')}
            >
              About
            </Tab>
            <Tab 
              isActive={activeTab === 'contact'} 
              value="contact"
              onClick={() => handleTabChange('contact')}
            >
              Contact
            </Tab>
          </TabGroup>
          
          <div className="mt-6 p-6 bg-brown-100 rounded-lg min-h-[200px]">
            {activeTab === 'home' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-brown-800">Home Content</h3>
                <p className="text-brown-600">
                  This is the home page content. You can put any content here when the Home tab is active.
                </p>
              </div>
            )}
            {activeTab === 'about' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-brown-800">About Content</h3>
                <p className="text-brown-600">
                  This is the about page content. Here you can describe your company, team, or project.
                </p>
              </div>
            )}
            {activeTab === 'contact' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-brown-800">Contact Content</h3>
                <p className="text-brown-600">
                  This is the contact page content. You can include contact information, forms, or other details here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Vertical Tabs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Vertical Tabs</h2>
          <div className="flex gap-8">
            <TabGroup orientation="vertical">
              <Tab 
                isActive={activeTab === 'settings'} 
                value="settings"
                onClick={() => handleTabChange('settings')}
              >
                Settings
              </Tab>
              <Tab 
                isActive={activeTab === 'profile'} 
                value="profile"
                onClick={() => handleTabChange('profile')}
              >
                Profile
              </Tab>
              <Tab 
                isActive={activeTab === 'notifications'} 
                value="notifications"
                onClick={() => handleTabChange('notifications')}
              >
                Notifications
              </Tab>
            </TabGroup>
            
            <div className="flex-1 p-4 bg-brown-100 rounded-lg">
              <p className="text-brown-600">
                Vertical tab content for: <strong>{activeTab}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Hover and Focus States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Interactive States</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 text-brown-600">Hover State</h3>
              <TabGroup>
                <Tab>Hover over me</Tab>
                <Tab>Hover over me too</Tab>
              </TabGroup>
              <p className="text-sm text-brown-500 mt-2">Hover over the tabs to see the color change effect</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-brown-600">Focus State</h3>
              <TabGroup>
                <Tab tabIndex={0}>Focus me with Tab key</Tab>
                <Tab tabIndex={0}>Focus me too</Tab>
              </TabGroup>
              <p className="text-sm text-brown-500 mt-2">Use Tab key to focus on the tabs and see the focus ring</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TabTest;
