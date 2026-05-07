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
      const response = await axios.get(`/api/posts/${id}`);
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
      await axios.put(`/api/posts/${postId}`, {
        ...post,
        user_email: localStorage.getItem("email"),
      });
      toast.success("Signal updated successfully ✨");
      handleClose();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Update sequence failed.");
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-2 text-slate-500 hover:text-indigo-400 transition-colors rounded-full hover:bg-white/5"
        title="Edit Transmission"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center p-4 backdrop-blur-md"
      >
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative">
          <div className="absolute top-8 right-8">
            <IconButton onClick={handleClose} className="text-slate-400 hover:bg-white/5 transition-all">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="p-10 md:p-14">
            <div className="flex items-center space-x-5 mb-10">
              <div className="bg-indigo-600/20 p-4 rounded-2xl text-indigo-400 border border-indigo-500/20 shadow-inner">
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Modify Signal</h2>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Calibration Module</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">New Title</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <input
                    type="text"
                    name="title"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Calibrate title..."
                    value={post.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Update Visuals</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                  <input
                    type="text"
                    name="image"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="New visual source..."
                    value={post.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Revised Narrative</label>
                <div className="relative group">
                  <div className="absolute top-5 left-0 pl-5 pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  <textarea
                    name="description"
                    rows="5"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none resize-none"
                    placeholder="Modify narrative flow..."
                    value={post.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-xl hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center space-x-4 transform active:scale-[0.98] uppercase tracking-widest"
              >
                <span>Commit Changes</span>
                <FontAwesomeIcon icon={faSave} className="text-indigo-200" />
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
