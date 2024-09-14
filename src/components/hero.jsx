import React from "react";

export default function Hero() {
  return (
    <div className="relative w-11/12 mx-auto mt-14 bg-green-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-center h-48 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Our Blog</h1>
          <p className="text-lg mb-4">
            Explore the latest articles and updates
          </p>
          <button className="bg-white text-green-900 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <img
          src="https://via.placeholder.com/1500x600" // Replace with a real image URL
          alt="Hero Background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
