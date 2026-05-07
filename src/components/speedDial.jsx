import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Modal, Typography, IconButton } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function OpenIconSpeedDial({ onPostSuccess }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBlogTitle("");
    setBlogImg("");
    setDescription("");
  };

  const [blogTitle, setBlogTitle] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!blogTitle || !blogImg || !description) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/posts", {
        title: blogTitle,
        image: blogImg,
        description: description,
        user_email: localStorage.getItem("email"),
      });

      const blog = response.data;
      toast.success("Story published successfully! ✨");
      handleClose();

      if (onPostSuccess) {
        onPostSuccess(blog);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish story.");
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <SpeedDial
          ariaLabel="Add story"
          sx={{ '& .MuiFab-primary': { bgcolor: '#15803d', '&:hover': { bgcolor: '#14532d' }, width: 64, height: 64 } }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={handleOpen}
        />
      </div>

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
                <FontAwesomeIcon icon={faPen} size="lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Share Your Story</h2>
                <p className="text-sm text-gray-500 font-medium">Draft your next masterpiece</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Story Title</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none"
                    placeholder="Enter a catchy title..."
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
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
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={blogImg}
                    onChange={(e) => setBlogImg(e.target.value)}
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
                    rows="4"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none resize-none"
                    placeholder="Tell your story..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 hover:shadow-lg transition-all flex items-center justify-center space-x-3 transform active:scale-[0.98]"
              >
                <span>Publish Story</span>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
