import { faBlog, faSignOutAlt, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const userImage = localStorage.getItem("userImage");
  const userName = localStorage.getItem("userName");
  const [imgError, setImgError] = useState(false);

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full glass z-50 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between p-4 px-6">
        {/* Logo and Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => navigate("/Home")}
        >
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-all group-hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">
            <FontAwesomeIcon icon={faBlog} className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            BLOG<span className="text-indigo-500">.</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            placeholder="Search stories, topics..."
            className="w-full bg-slate-800/30 border border-white/5 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-600/50 focus:bg-slate-800/80 transition-all outline-none"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-slate-800/50 p-1.5 pr-4 rounded-full border border-white/10 hover:border-indigo-500/30 transition-all">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-sm bg-slate-700 flex items-center justify-center">
              {userImage && !imgError ? (
                <img
                  src={userImage}
                  alt="User"
                  className="object-cover w-full h-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-slate-400 text-sm" />
              )}
            </div>
            <span className="hidden sm:inline text-sm font-bold text-slate-200 tracking-wide uppercase">{userName || "Explorer"}</span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
            title="Sign Out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
}
