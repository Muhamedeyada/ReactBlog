import React, { useState } from "react";
import NavBar from "../components/Navbar.jsx";
import Posts from "../components/Posts.jsx";
import Dial from "../components/speedDial.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/pagination.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handlePostSuccess = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <ToastContainer theme="dark" />
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-600/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-8">
             <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
             <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">Nexus Version 2.0 Live</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Discover. Write.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-500 to-indigo-400 animate-gradient-x">Transcend.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Welcome to the digital frontier of storytelling. Share your signals with the world and explore the collective consciousness of the nexus.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
             <button 
                onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
             >
                Begin Exploration
             </button>
             <button className="text-white border border-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                The Protocol
             </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
           <FontAwesomeIcon icon={faChevronDown} size="lg" />
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10">
        <Posts posts={posts} />
        <Pagination />
        <Footer />
      </div>

      <Dial onPostSuccess={handlePostSuccess} />
    </div>
  );
}
