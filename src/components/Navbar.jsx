import { faBlog, faSignOutAlt, faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const userImage = localStorage.getItem("userImage");
  const userName = localStorage.getItem("userName");

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full glass z-50 border-b border-white/20">
      <div className="container mx-auto flex items-center justify-between p-4 px-6">
        {/* Logo and Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => navigate("/Home")}
        >
          <div className="bg-green-700 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <FontAwesomeIcon icon={faBlog} className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-green-900">
            BLOG<span className="text-green-600">.</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            placeholder="Search stories, topics..."
            className="w-full bg-gray-100/50 border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-600 focus:bg-white transition-all"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-white/50 p-1 pr-4 rounded-full border border-green-100">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200">
              {userImage ? (
                <img
                  src={userImage}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                   <FontAwesomeIcon icon={faUserCircle} />
                </div>
              )}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">{userName || "User"}</span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
            title="Sign Out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
}
