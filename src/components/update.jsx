import React from "react";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateComponent({ postId }) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState({
    title: "",
    image: "",
    description: "",
  });

  const handleOpen = () => {
    getPost(postId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      const fetchedPost = response.data;
      setPost({
        title: fetchedPost.title,
        image: fetchedPost.image,
        description: fetchedPost.description,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/posts/${postId}`, {
        ...post,
        user_email: localStorage.getItem("email"),
      });
      toast.success("Story updated successfully ✨");
      handleClose();
      // Optional: window.location.reload() or a more React-way to refresh
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Failed to update story.");
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
        title="Edit Story"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative border border-gray-100">
          <div className="absolute top-6 right-6">
            <IconButton onClick={handleClose} className="hover:bg-red-50 hover:text-red-600 transition-colors">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="p-10 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-green-100 p-3 rounded-2xl text-green-700">
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Story</h2>
                <p className="text-sm text-gray-500 font-medium">Refine your masterpiece</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Story Title</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <input
                    type="text"
                    name="title"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none"
                    placeholder="Enter a catchy title..."
                    value={post.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Cover Image URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600">
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                  <input
                    type="text"
                    name="image"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={post.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400 group-focus-within:text-green-600">
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  <textarea
                    name="description"
                    rows="4"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none resize-none"
                    placeholder="Tell your story..."
                    value={post.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 hover:shadow-lg transition-all flex items-center justify-center space-x-3 transform active:scale-[0.98]"
              >
                <span>Save Changes</span>
                <FontAwesomeIcon icon={faSave} />
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
