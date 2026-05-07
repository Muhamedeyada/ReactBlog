import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-700 p-2 rounded-xl">
              <FontAwesomeIcon icon={faBlog} className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight text-green-900">
              BLOG<span className="text-green-600">.</span>
            </span>
          </div>
          
          <p className="max-w-md text-gray-500 font-medium mb-8">
            A platform for sharing stories, ideas, and experiences with the world. Join our community and start your journey today.
          </p>
          
          <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-sm text-gray-500 font-medium space-y-4 md:space-y-0">
            <p>
              © {new Date().getFullYear()} BLOG. All rights reserved.
            </p>
            <p className="flex items-center">
              Made with <FontAwesomeIcon icon={faHeart} className="mx-1.5 text-red-500" /> by Mohamed Eyada
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
