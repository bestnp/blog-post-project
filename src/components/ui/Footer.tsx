import React from "react";
import { LinkedInIcon, GithubIcon, GoogleIcon } from "@/icon/IconsAll";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-200 py-8">
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
                className="hover:opacity-80 transition-opacity"
              >
                <LinkedInIcon className="w-6 h-6 text-brown-500" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <GithubIcon className="w-6 h-6 text-brown-500" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <GoogleIcon className="w-6 h-6 text-brown-500" />
              </a>
            </div>
          </div>

          {/* Home page link */}
          <div>
            <a 
              href="/" 
              className="text-brown-500 text-body-lg underline hover:text-brown-400 transition-colors"
            >
              Home page
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-brown-500 text-body-lg ">Get in touch</span>
            <div className="flex space-x-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <LinkedInIcon className="w-6 h-6 text-brown-500" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <GithubIcon className="w-6 h-6 text-brown-500" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <GoogleIcon className="w-6 h-6 text-brown-500" />
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