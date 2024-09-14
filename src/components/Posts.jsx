import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteComponent from "./delete";
import UpdateComponent from "./update";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* User Info */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-gray-500 text-xl"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 text-sm">{post.user_email}</p>
                </div>
              </div>

              {/* Post Title */}
              <div className="p-4">
                <h1 className="text-2xl font-semibold text-green-900 hover:text-green-700 transition-colors">
                  {post.title}
                </h1>
              </div>

              {/* Post Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform transform hover:scale-105"
                />
              </div>

              {/* Post Description */}
              <div className="p-4">
                <p className="text-gray-600">{post.description}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between p-4 border-t border-gray-200 bg-gray-50">
                {localStorage.getItem("email") === post.user_email && (
                  <div className="flex space-x-2">
                    <DeleteComponent postId={post.id} onDelete={handleDelete} />
                    <UpdateComponent postId={post.id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
