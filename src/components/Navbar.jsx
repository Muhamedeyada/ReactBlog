import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const userImage = localStorage.getItem("userImage");

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-green-950 text-white shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faBlog} className="text-white text-3xl" />
          <a className="text-2xl font-semibold">BLOG</a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-64 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* User Avatar and Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-green-700 focus:outline-none"
            aria-label="User Menu"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
              <img
                src={userImage || "/path/to/default/avatar.png"}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </button>
          <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
            <li>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
