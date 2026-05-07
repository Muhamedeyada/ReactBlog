import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteComponent from "./delete.jsx";
import UpdateComponent from "./update.jsx";
import { ToastContainer } from "react-toastify";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const fetchedPosts = response.data;
      setPosts(fetchedPosts.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600">Stories</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-slate-900/50 rounded-[2rem] overflow-hidden border border-white/5 blog-card-hover flex flex-col h-full backdrop-blur-sm"
          >
            {/* Post Image with Overlay */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                 <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center shadow-lg shadow-indigo-500/40">
                   READ MORE <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                 </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                Featured Story
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed line-clamp-3 mb-8 text-sm">
                {post.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 border border-white/5">
                    <FontAwesomeIcon icon={faUser} size="sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Published by</p>
                    <p className="text-sm font-bold text-slate-300">{post.user_email?.split('@')[0]}</p>
                  </div>
                </div>

                {localStorage.getItem("email") === post.user_email && (
                  <div className="flex items-center space-x-1">
                    <UpdateComponent postId={post.id} />
                    <DeleteComponent postId={post.id} onDelete={handleDelete} />
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
