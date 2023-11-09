// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/terms" className="hover:text-gray-400 transition duration-300">
            Terms of Service
          </a>
          <span>|</span>
          <a href="/privacy" className="hover:text-gray-400 transition duration-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
