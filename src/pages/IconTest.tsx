import React from 'react';
import * as Icons from '@/icon/IconsAll';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

const IconTest: React.FC = () => {
  // Get all icon components
  const iconComponents = Object.entries(Icons);

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      <NavBar />
      
      <div className="flex-1 max-w-[1200px] mx-auto px-4 py-12 w-full">
        <h1 className="text-h1 font-bold text-brown-600 mb-8 text-center">
          Icon Test Page
        </h1>
        
        <p className="text-center text-brown-400 mb-12 text-body-lg">
          Total Icons: {iconComponents.length}
        </p>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {iconComponents.map(([name, IconComponent]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 p-6 border border-brown-200 rounded-lg hover:bg-brown-50 transition-colors"
            >
              {/* Icon with background */}
              <div className="w-16 h-16 flex items-center justify-center bg-brown-100 rounded-lg">
                <IconComponent className="w-8 h-8 text-brown-600" />
              </div>
              
              {/* Icon name */}
              <span className="text-body-sm text-brown-600 text-center font-medium break-words w-full">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="mt-16">
          <h2 className="text-h2 font-bold text-brown-600 mb-8 text-center">
            Social Media Icons
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {/* Facebook */}
            <div className="flex flex-col items-center gap-3">
              <Icons.FacebookIcon className="w-16 h-16" />
              <span className="text-body-sm text-brown-600">Facebook</span>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center gap-3">
              <Icons.LinkedInIcon className="w-16 h-16" />
              <span className="text-body-sm text-brown-600">LinkedIn</span>
            </div>

            {/* Twitter */}
            <div className="flex flex-col items-center gap-3">
              <Icons.TwitterIcon className="w-16 h-16" />
              <span className="text-body-sm text-brown-600">Twitter</span>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center gap-3">
              <Icons.GoogleIcon className="w-16 h-16" />
              <span className="text-body-sm text-brown-600">Google</span>
            </div>

            {/* Github */}
            <div className="flex flex-col items-center gap-3">
              <Icons.GithubIcon className="w-16 h-16" />
              <span className="text-body-sm text-brown-600">Github</span>
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <div className="mt-16">
          <h2 className="text-h2 font-bold text-brown-600 mb-8 text-center">
            Size Variations
          </h2>
          
          <div className="flex flex-wrap justify-center items-end gap-8">
            <div className="flex flex-col items-center gap-3">
              <Icons.HappyLight className="w-6 h-6 text-brown-600" />
              <span className="text-body-sm text-brown-400">16px</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icons.HappyLight className="w-8 h-8 text-brown-600" />
              <span className="text-body-sm text-brown-400">24px</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icons.HappyLight className="w-12 h-12 text-brown-600" />
              <span className="text-body-sm text-brown-400">32px</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icons.HappyLight className="w-16 h-16 text-brown-600" />
              <span className="text-body-sm text-brown-400">48px</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icons.HappyLight className="w-24 h-24 text-brown-600" />
              <span className="text-body-sm text-brown-400">64px</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IconTest;

