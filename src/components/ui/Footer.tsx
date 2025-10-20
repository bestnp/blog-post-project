import React from "react";
import { FacebookIcon, GithubIcon, GoogleIcon, TwitterIcon } from "@/icon/IconsAll";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-100 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Mobile Layout */}
        <div className="lg:hidden text-center space-y-6">
          {/* Get in touch section */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-brown-600 text-body-lg font-medium">Get in touch</span>
            <div className="flex space-x-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <span className="text-white text-xs font-bold">in</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-white" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <span className="text-white text-xs font-bold">G</span>
              </a>
            </div>
          </div>

          {/* Home page link */}
          <div>
            <a 
              href="/" 
              className="text-brown-600 text-body-lg underline hover:text-brown-500 transition-colors"
            >
              Home page
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-brown-600 text-body-lg font-medium">Get in touch</span>
            <div className="flex space-x-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <span className="text-white text-xs font-bold">in</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-white" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                <span className="text-white text-xs font-bold">G</span>
              </a>
            </div>
          </div>
          
          <a 
            href="/" 
            className="text-brown-600 text-body-lg underline hover:text-brown-500 transition-colors"
          >
            Home page
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;