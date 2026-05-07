import React, { useState } from "react";
import NavBar from "../components/Navbar.jsx";
import Posts from "../components/Posts.jsx";
import Dial from "../components/speedDial.jsx";
import Footer from "../components/Footer.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/pagination.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handlePostSuccess = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div>
          <NavBar />
          <Posts posts={posts} />
          <Pagination />
          <Footer />
        </div>
        <Dial onPostSuccess={handlePostSuccess} />
      </div>
    </>
  );
}
