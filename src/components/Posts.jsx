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
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Stories</h2>
        <div className="h-1.5 w-20 bg-green-600 rounded-full"></div>
      </div>
      
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 blog-card-hover flex flex-col h-full"
          >
            {/* Post Image with Overlay */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                 <span className="text-white text-sm font-medium flex items-center">
                   Read Story <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-xs" />
                 </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <FontAwesomeIcon icon={faClock} className="mr-2" /> 5 min read
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-green-700 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                {post.description}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <FontAwesomeIcon icon={faUser} size="xs" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">{post.user_email?.split('@')[0]}</span>
                </div>

                {localStorage.getItem("email") === post.user_email && (
                  <div className="flex items-center space-x-2">
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
